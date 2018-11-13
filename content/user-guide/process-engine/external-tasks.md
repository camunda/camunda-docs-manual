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
* **Independent Maintenance**: Workers can be maintained independently of the process engine without breaking operations. For example, if a worker for a specific topic has a downtime (e.g., due to an upgrade), there is no immediate impact on the process engine. Execution of external tasks for such workers degrades gracefully: They are stored in the external task list until the external worker resumes operation.

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

## Rest API

See the [REST API documentation]({{< ref "/reference/rest/external-task/_index.md" >}}) for how the API operations can be accessed via HTTP.

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
    String topic = task.getTopic();

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

In order to implement a polling worker, a fetching operation by using the method `ExternalTaskService#fetchAndLock` can be executed. This method returns a fluent builder that allows to define a set of topics to fetch tasks for. Consider the following code snippet:

```java
List<LockedExternalTask> tasks = externalTaskService.fetchAndLock(10, "externalWorkerId")
  .topic("AddressValidation", 60L * 1000L)
  .topic("ShipmentScheduling", 120L * 1000L)
  .execute();

for (LockedExternalTask task : tasks) {
  String topic = task.getTopic();

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
  String topic = task.getTopic();
  String address = (String) task.getVariables().get("address");

  // work on task for that topic
  ...
}
```

The resulting tasks then contain the current values of the requested variable. Note that the variable values are the values that are visible in the scope hierarchy from the external task's execution. See the chapter on [Variable Scopes and Variable Visibility]({{< ref "/user-guide/process-engine/variables.md#variable-scopes-and-variable-visibility" >}}) for details.

### Completing Tasks

After fetching and performing the requested work, a worker can complete an external task by calling the `ExternalTaskService#complete` method. A worker can only complete tasks that it fetched and locked before. If the task has been locked by a different worker in the meantime, an exception is raised.

### Reporting Task Failure

A worker may not always be able to complete a task successfully. In this case it can report a failure to the process engine by using `ExternalTaskService#handleFailure`. Like `#complete`, `#handleFailure` can only be invoked by the worker possessing the most recent lock for a task. The `#handleFailure` method takes three additional arguments: `errorMessage`, `retries`, `retryTimeout`. The error message can contain a description of the nature of the problem. It is can be accessed when the task is fetched again or is queried for. With `retries` and `retryTimout`, workers can specify a retry strategy. When setting `retries` to a value > 0, the task can be fetched again after `retryTimeout` expires. When setting retries to 0, a task can no longer be fetched and an incident is created for this task.

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
  1,                                                                    // retries
  10L * 60L * 1000L);                                                   // retryTimeout
```

A failure is reported for the locked task such that it can be retried once more after 10 minutes. The process engine does not decrement retries itself. Instead, such a behavior can be implemented by setting the retries to `task.getRetries() - 1` when reporting a failure.

### Querying Tasks

A query for external tasks can be made via `ExternalTaskService#createExternalTaskQuery`. Opposed to `#fetchAndLock`, this is a reading query that does not set any locks.

### Managing Operations

Additional management operations are `ExternalTaskService#unlock` and `ExternalTaskService#setRetries` to clear the current lock and to reset the retries of an external task. The latter is useful when a task has 0 retries left and must be manually resumed.
