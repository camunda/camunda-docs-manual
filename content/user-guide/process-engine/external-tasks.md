---

title: 'External Tasks'
weight: 98

menu:
  main:
    identifier: "user-guide-process-engine-external-tasks"
    parent: "user-guide-process-engine"

---

The process engine supports two ways of executing service tasks:

1. Internal Service tasks: Synchronous invocation of code deployed along with a process application
2. External tasks: Providing a unit of work in a list that can be polled by workers

The first option is used when code is implemented as [Delegation Code]({{< ref "/user-guide/process-engine/delegation-code.md" >}}) or as a [Script]({{< ref "/user-guide/process-engine/scripting.md" >}}). By contrast, external (service) tasks work in a way that the process engine publishes a unit of work to a worker to fetch and complete. We refer to this as the *external task pattern*.

Note that the above distinction does not say whether the actual "business logic" is implemented locally or as a remote service. The Java Delegate invoked by an internal service task may either implement the business logic itself or it may call out to a web/rest service, send a message to another system and so forth. The same is true for an external worker. The worker can implement the business logic directly or again delegate to a remote system.

# The External Task Pattern

The flow of executing external tasks can be conceptually separated into three steps, as depicted in the following image:

{{< img src="../img/external-task-pattern.png" title="External Task Pattern" >}}

1. **Process Engine**: Creation of an external task instance
2. **External Worker**: Fetch and lock external tasks
3. **External Worker & Process Engine**: Complete external task instance

When the process engine encounters a service task that is configured to be externally handled, it creates an external task instance and adds it to a list of external tasks (step 1). The task instance receives a *topic* that identifies the nature of the work to be performed. At a time in the future, an external worker may fetch and lock tasks for a specific set of topics (step 2). To prevent one task being fetched by multiple workers at the same time, a task has a timestamp-based lock that is set when the task is acquired. Only when the lock expires, another worker can fetch the task again. When an external worker has completed the desired work, it can signal the process engine to continue process execution after the service task (step 3).

{{< note class="info" title="The User Task Analogy" >}}
External tasks are conceptually very similar to user tasks. When first trying to understand the external task pattern, it can be helpful to think about it in analogy to user tasks:
User tasks are created by the process engine and added to a task list. The process engine then waits for a human user to query the list, claim a task and then complete it. External tasks are similar: An external task is created and then added to a topic. An external application then queries the topic and locks the task. After the task is locked, the application can work on it and complete it.
{{< /note >}}

The essence of this pattern is that the entities performing the actual work are independent of the process engine and receive work items by polling the process engine's API. This has the following benefits:

* **Crossing System Boundaries**: An external worker does not need to run in the same Java process, on the same machine, in the same cluster or even on the same continent as the process engine. All that is required is that it can access the process engine's API (via REST or Java). Due to the polling pattern, the worker does not need to expose any interface for the process engine to access.
* **Crossing Technology Boundaries**: An external worker does not need to be implemented in Java. Instead, any technology can be used that is most suitable to perform a work item and that can be used to access the process engine's API (via REST or Java).
* **Specialized Workers**: An external worker does not need to be a general purpose application. Each external task instance receives a topic name identifying the nature of the task to perform. Workers can poll tasks for only those topics that they can work on.
* **Fine-Grained Scaling**: If there is high load concentrated on service task processing, the number of external workers for the respective topics can be scaled out independently of the process engine.
* **Independent Maintenance**: Workers can be maintained independently of the process engine without breaking operations. For example, if a worker for a specific topic has a downtime (e.g., due to an update), there is no immediate impact on the process engine. Execution of external tasks for such workers degrades gracefully: They are stored in the external task list until the external worker resumes operation.

# Working with External Tasks

To work with external tasks they have to be declared in the BPMN XML. At runtime, external task instances can be accessed via Java and REST API. The following explains the API concepts and focuses on the Java API. Often the REST API is more suitable in this context, especially when implementing workers running in different environments with different technologies.

## BPMN

In the BPMN XML of a process definition, a service task can be declared to be performed by an external worker by using the attributes `camunda:type` and `camunda:topic`. For example, a service task *Validate Address* can be configured to provide an external task instance for the topic `AddressValidation` as follows:

```xml
<serviceTask id="validateAddressTask"
  name="Validate Address"
  camunda:type="external"
  camunda:topic="AddressValidation" />
```

It is possible to define the topic name by using an [expression]({{< ref "/user-guide/process-engine/expression-language.md" >}}) instead of a constant value.

In addition, other *service-task-like* elements such as send tasks, business rule tasks, and throwing message events can be implemented with the external task pattern. See the [BPMN 2.0 implementation reference]({{< ref "/reference/bpmn20/_index.md" >}}) for details.

## Rest API

See the [REST API documentation]({{< ref "/reference/rest/external-task/_index.md" >}}) for how the API operations can be accessed via HTTP.

### Long Polling to Fetch and Lock External Tasks

Ordinary HTTP requests are immediately answered by the server, regardless of whether the requested information 
is available or not. This inevitably leads to a situation where the client has to perform multiple recurring requests until 
the information is available (polling). This approach can obviously be expensive in terms of resources.

{{< img src="../img/external-task-long-polling.png" alt="Long polling to fetch and lock external tasks" >}}

With the aid of long polling, a request is suspended by the server if no external tasks are available. As soon as new 
external tasks occur, the request is reactivated and the response is performed. The suspension is limited to a 
configurable period of time (timeout).

Long polling significantly reduces the number of requests and enables using resources more efficiently on both 
the server and the client side.

Please also see the [REST API documentation]({{< ref "/reference/rest/external-task/fetch.md" >}}).

{{< note title="Heads Up!" class="info" >}}
This feature is based on JAX-RS 2.0 and is therefore not available on **IBM WebSphere Application Server 8.0 / 8.5**.
{{< /note >}}

## Java API

The entry point to the Java API for external tasks is the `ExternalTaskService`. It can be accessed via `processEngine.getExternalTaskService()`.

The following is an example of an interaction which fetches 10 tasks,
works on these tasks in a loop and for each task, either completes the task or marks it as failed.

```java
List<LockedExternalTask> tasks = externalTaskService.fetchAndLock(10, "externalWorkerId")
  .topic("AddressValidation", 60L * 1000L)
  .execute();

for (LockedExternalTask task : tasks) {
  try {
    String topic = task.getTopicName();

    // work on task for that topic
    ...

    // if the work is successful, mark the task as completed
    if(success) {
      externalTaskService.complete(task.getId(), variables);
    }
    else {
      // if the work was not successful, mark it as failed
      externalTaskService.handleFailure(
        task.getId(),
        "externalWorkerId",
        "Address could not be validated: Address database not reachable",
        1, 10L * 60L * 1000L);
    }
  }
  catch(Exception e) {
    //... handle exception
  }
}
```

The following sections address the different interactions with the `ExternalTaskService` in greater detail.

### Fetching Tasks

In order to implement a polling worker, a fetching operation can be executed by using the method `ExternalTaskService#fetchAndLock`. This method returns a fluent builder that allows to define a set of topics to fetch tasks for. Consider the following code snippet:

```java
List<LockedExternalTask> tasks = externalTaskService.fetchAndLock(10, "externalWorkerId")
  .topic("AddressValidation", 60L * 1000L)
  .topic("ShipmentScheduling", 120L * 1000L)
  .execute();

for (LockedExternalTask task : tasks) {
  String topic = task.getTopicName();

  // work on task for that topic
  ...
}
```

This code fetches at most 10 tasks of the topics `AddressValidation` and `ShipmentScheduling`. The result tasks are locked exclusively for the worker with id `externalWorkerId`. Locking means that the task is reserved for this worker for a certain duration beginning with the time of fetching and prevents that another worker can fetch the same task while the lock is valid. If the lock expires and the task has not been completed meanwhile, a different worker can fetch it such that silently failing workers do not block execution indefinitely. The exact duration is given in the single topic fetch instructions: Tasks for `AddressValidation` are locked for 60 seconds (`60L * 1000L` milliseconds) while tasks for `ShipmentScheduling` are locked for 120 seconds (`120L * 1000L` milliseconds). The lock expiration duration should not be shorter than than the expected execution time. It should also not be too high if that implies a too long timeout until the task is retried in case the worker fails silently.

Variables that are required to perform a task can be fetched along with the task. For example, assume that the `AddressValidation` task requires an `address` variable. Fetching tasks with this variable could look like:

```java
List<LockedExternalTask> tasks = externalTaskService.fetchAndLock(10, "externalWorkerId")
  .topic("AddressValidation", 60L * 1000L).variables("address")
  .execute();

for (LockedExternalTask task : tasks) {
  String topic = task.getTopicName();
  String address = (String) task.getVariables().get("address");

  // work on task for that topic
  ...
}
```

The resulting tasks then contain the current values of the requested variable. Note that the variable values are the values that are visible in the scope hierarchy from the external task's execution. See the chapter on [Variable Scopes and Variable Visibility]({{< ref "/user-guide/process-engine/variables.md#variable-scopes-and-variable-visibility" >}}) for details.

In order to fetch all variables, call to `variables()` method should be omitted 

```java
List<LockedExternalTask> tasks = externalTaskService.fetchAndLock(10, "externalWorkerId")
  .topic("AddressValidation", 60L * 1000L)
  .execute();

for (LockedExternalTask task : tasks) {
  String topic = task.getTopicName();
  String address = (String) task.getVariables().get("address");

  // work on task for that topic
  ...
}
```

In order to enable the deserialization of serialized variables values (typically variables that store custom Java objects), it is necessary to call `enableCustomObjectDeserialization()`. Otherwise an exception, that the object is not deserialized, is thrown once the serialized variable is retrieved from the variables map.

```java
List<LockedExternalTask> tasks = externalTaskService.fetchAndLock(10, "externalWorkerId")
  .topic("AddressValidation", 60L * 1000L)
  .variables("address")
  .enableCustomObjectDeserialization()
  .execute();

for (LockedExternalTask task : tasks) {
  String topic = task.getTopicName();
  MyAddressClass address = (MyAddressClass) task.getVariables().get("address");

  // work on task for that topic
  ...
}
```
 

### External Task Prioritization
External task prioritization is similar to job prioritization. The same problem exists with starvation which should be considered. 
For further details, see the section on [Job Prioritization]({{< ref "/user-guide/process-engine/the-job-executor.md#the-job-priority" >}}).

### Configure the Process Engine for External Task Priorities

This section explains how to enable and disable external task priorities in the configuration. There are two relevant configuration properties which can be set on the process engine configuration:

`producePrioritizedExternalTasks`: Controls whether the process engine assigns priorities to external tasks. The default value is `true`.
If priorities are not needed, the process engine configuration property `producePrioritizedExternalTasks` can be set to `false`. In this case, all external tasks receive a priority of 0.
For details on how to specify external task priorities and how the process engine assigns them, see the following section on [Specifying External Task Priorities]({{< relref "#specify-external-task-priorities" >}}).

### Specify External Task Priorities

External task priorities can be specified in the BPMN model as well as overridden at runtime via API.

#### Priorities in BPMN XML

External task priorities can be assigned at the process or the activity level. To achieve this, the Camunda extension attribute `camunda:taskPriority` can be used.

For specifying the priority, both constant values and [expressions]({{< ref "/user-guide/process-engine/expression-language.md" >}}) are supported. 
When using a constant value, the same priority is assigned to all instances of the process or activity. 
Expressions, on the other hand, allow assigning a different priority to each instance of the process or activity. Expression must evaluate to a number in the Java `long` range.
The concrete value can be the result of a complex calculation and be based on user-provided data (resulting from a task form or other sources).


#### Priorities at the Process Level

When configuring external task priorities at the process instance level, the `camunda:taskPriority` attribute needs to be applied to the bpmn `<process ...>` element:

```xml
<bpmn:process id="Process_1" isExecutable="true" camunda:taskPriority="8">
  ...
</bpmn:process>
```

The effect is that all external tasks inside the process inherit the same priority (unless it is overridden locally).
The above example shows how a constant value can be used for setting the priority. This way the same priority is applied to all instances of the process. 
If different process instances need to be executed with different priorities, an expression can be used:

```xml
<bpmn:process id="Process_1" isExecutable="true" camunda:taskPriority="${order.priority}">
  ...
</bpmn:process>
```

In the above example the priority is determined based on the property `priority` of the variable `order`.

#### Priorities at the Service Task Level

When configuring external task priorities at the service task level, the `camunda:taskPriority` attribute needs to be applied to the bpmn `<serviceTask ...>` element.
The service task must be an external task with the attribute `camunda:type="external"`.

```xml
  ...
  <serviceTask id="externalTaskWithPrio" 
               camunda:type="external" 
			   camunda:topic="externalTaskTopic" 
			   camunda:taskPriority="8"/>
  ...
```

The effect is that the priority is set for the defined external task (overrides the process taskPriority).
The above example shows how a constant value can be used for setting the priority. This way the same priority is applied to the external task in different instances of the process.
If different process instances need to be executed with different external task priorities, an expression can be used:

```xml
  ...
  <serviceTask id="externalTaskWithPrio" 
               camunda:type="external" 
			   camunda:topic="externalTaskTopic" 
			   camunda:taskPriority="${order.priority}"/>
  ...
```

In the above example the priority is determined based on the property `priority` of the variable `order`.



### Fetch External Task with Priority

To fetch external tasks based on their priority, the overloaded method `ExternalTaskService#fetchAndLock` with the parameter `usePriority` can be used.
The method without the boolean parameter returns the external tasks arbitrarily. If the parameter is given, the returned external tasks are ordered descendingly.
See the following example which regards the priority of the external tasks:

```java
List<LockedExternalTask> tasks =
  externalTaskService.fetchAndLock(10, "externalWorkerId", true)
  .topic("AddressValidation", 60L * 1000L)
  .topic("ShipmentScheduling", 120L * 1000L)
  .execute();

for (LockedExternalTask task : tasks) {
  String topic = task.getTopicName();

  // work on task for that topic
  ...
}
```


### Completing Tasks

After fetching and performing the requested work, a worker can complete an external task by calling the `ExternalTaskService#complete` method. A worker can only complete tasks that it fetched and locked before. If the task has been locked by a different worker in the meantime, an exception is raised.

### Extending of Locks on External Tasks

When an external task is locked by a worker, the lock duration can be extended by calling the method `ExternalTaskService#extendLock`. A worker can specify the amount of time (in milliseconds) to update the timeout. A lock can only be extended by the worker who owns a lock on the given external task.

### Reporting Task Failure

A worker may not always be able to complete a task successfully. In this case it can report a failure to the process engine by using `ExternalTaskService#handleFailure`. Like `#complete`, `#handleFailure` can only be invoked by the worker possessing the most recent lock for a task. The `#handleFailure` method takes four additional arguments: `errorMessage`,`errorDetails`, `retries`, `retryTimeout`. The error message can contain a description of the nature of the problem and is limited to 666 characters. It can be accessed when the task is fetched again or is queried for. The `errorDetails` can contain the full error description and are unlimited in length. Error details are accessible through the separate method `ExternalTaskService#getExternalTaskErrorDetails`, based on task id parameter. With `retries` and `retryTimout`, workers can specify a retry strategy. When setting `retries` to a value > 0, the task can be fetched again after `retryTimeout` expires. When setting retries to 0, a task can no longer be fetched and an incident is created for this task.

Consider the following code snippet:

```java
List<LockedExternalTask> tasks = externalTaskService.fetchAndLock(10, "externalWorkerId")
  .topic("AddressValidation", 60L * 1000L).variables("address")
  .execute();

LockedExternalTask task = tasks.get(0);

// ... processing the task fails

externalTaskService.handleFailure(
  task.getId(),
  "externalWorkerId",
  "Address could not be validated: Address database not reachable",     // errorMessage
  "Super long error details",                                           // errorDetails
  1,                                                                    // retries
  10L * 60L * 1000L);                                                   // retryTimeout

// ... other activities

externalTaskService.getExternalTaskErrorDetails(task.getId());
```

A failure is reported for the locked task such that it can be retried once more after 10 minutes. The process engine does not decrement retries itself. Instead, such a behavior can be implemented by setting the retries to `task.getRetries() - 1` when reporting a failure.

At the moment when error details are required, they are queried from the service using separate method. 

### Reporting BPMN Error

See the documentation for [Error Boundary Events]({{< ref "/reference/bpmn20/events/error-events.md#error-boundary-event" >}}).

For some reason a business error can appear during execution. In this case, the worker can report a BPMN error to the process engine by using `ExternalTaskService#handleBpmnError`. 
Like `#complete` or `#handleFailure`, it can only be invoked by the worker possessing the most recent lock for a task. 
The `#handleBpmnError` method takes one additional argument: `errorCode`. 
The error code identifies a predefined error. If the given `errorCode` does not exist or there is no boundary event defined,
the current activity instance simply ends and the error is not handled.

See the following example:

```java
List<LockedExternalTask> tasks = externalTaskService.fetchAndLock(10, "externalWorkerId")
  .topic("AddressValidation", 60L * 1000L).variables("address")
  .execute();

LockedExternalTask task = tasks.get(0);

// ... business error appears

externalTaskService.handleBpmnError(
  task.getId(),
  "externalWorkerId",
  "bpmn-error"); //errorCode
```

A BPMN error with the error code `bpmn-error` is propagated. If a boundary event with this error code exists, the BPMN error will be caught and handled.

### Querying Tasks

A query for external tasks can be made via `ExternalTaskService#createExternalTaskQuery`. Contrary to `#fetchAndLock`, this is a reading query that does not set any locks.

### Managing Operations

Additional management operations are `ExternalTaskService#unlock`, `ExternalTaskService#setRetries` and `ExternalTaskService#setPriority` to clear the current lock, to set the retries and to set the priority of an external task. 
Setting the retries is useful when a task has 0 retries left and must be resumed manually. With the last method the priority can 
be set to a higher value for more important or to a lower value for less important external tasks.

There are also operations `ExternalTaskService#setRetriesSync` and `ExternalTaskService#setRetriesAsync` to set retries for multiple external tasks synchronously or asynchronously.
