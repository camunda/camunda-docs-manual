---

title: 'Process Engine Concepts'
weight: 30

menu:
  main:
    identifier: "user-guide-process-engine-concepts"
    parent: "user-guide-process-engine"

---


This section explains some core process engine concepts that are used in both the process engine API and the internal process engine implementation. Understanding these fundamentals makes it easier to use the process engine API.


# Process Definitions

A process definition defines the structure of a process. You could say that the process definition *is* the process. Camunda BPM uses [BPMN 2.0](http://camunda.org/bpmn/tutorial.html) as its primary modeling language for modeling process definitions.

{{< note title="BPMN 2.0 Reference" class="info" >}}
  Camunda BPM comes with two BPMN 2.0 References:

* The [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html#!/reference) introduces the fundamentals of BPMN 2.0 and helps you to get started modeling processes. (Make sure to read the [Tutorial](http://camunda.org/bpmn/tutorial.html) as well.)
* The [BPMN 2.0 Implementation Reference]({{< relref "reference/bpmn20/index.md" >}}) covers the implementation of the individual BPMN 2.0 constructs in Camunda BPM. You should consult this reference if you want to implement and execute BPMN processes.
{{< /note >}}


In Camunda BPM you can deploy processes to the process engine in BPMN 2.0 XML format. The XML files are parsed and transformed into a process definition graph structure. This graph structure is executed by the process engine.


## Query for Process Definitions

You can query for all deployed process definitions using the Java API and the `ProcessDefinitionQuery` made available through the `RepositoryService`. Example:

```java
List<ProcessDefinition> processDefinitions = repositoryService.createProcessDefinitionQuery()
    .processDefinitionKey("invoice")
    .orderByProcessDefinitionVersion()
    .asc()
    .list();
```

The above query returns all deployed process definitions for the key `invoice` ordered by their `version` property.

You can also [query for process definitions using the REST API]({{< relref "reference/rest/process-definition/get-query.md" >}}).


## Keys and Versions

The *key* of a process definition (`invoice` in the example above) is the logical identifier of the process. It is used throughout the API, most prominently for starting process instances ([see section on process instances]({{< relref "#process-instances" >}})). The key of a process definition is defined using the `id` property of the corresponding `<process ... >` element in the BPMN 2.0 XML file:

```xml
<process id="invoice" name="invoice receipt" isExecutable="true">
  ...
</process>
```

If you deploy multiple processes with the same key, they are treated as individual versions of the same process definition by the process engine.


## Suspend Process Definitions

Suspending a process definition disables it temporarily, i.e., it cannot be instantiated while it is suspended. The `RuntimeService` Java API can be used to suspend a process definition. Similarly, you can activate a process definition to undo this effect.


# Process Instances

A process instance is an individual execution of a process definition. The relation of the process instance to the process definition is the same as the relation between *Object* and *Class* in Object Oriented Programming (the process instance playing the role of the object and the process definition playing the role of the class in this analogy).

The process engine is responsible for creating process instances and managing their state. If you start a process instance which contains a wait state, for example a [user task]({{< relref "reference/bpmn20/tasks/user-task.md" >}}), the process engine must make sure that the state of the process instance is captured and stored inside a database until the wait state is left (the user task is completed).


## Start a Process Instance

The simplest way to start a process instance is by using the `startProcessInstanceByKey(...)` method offered by the RuntimeService:

    ProcessInstance instance = runtimeService.startProcessInstanceByKey("invoice");

You may optionally pass in a couple of variables:

    Map<String, Object> variables = new HashMap<String,Object>();
    variables.put("creditor", "Nice Pizza Inc.");
    ProcessInstance instance = runtimeService.startProcessInstanceByKey("invoice", variables);

Process variables are available to all tasks in a process instance and are automatically persisted to the database in case the process instance reaches a wait state.

It is also possible to [start a process instance using the REST API]({{< relref "reference/rest/process-definition/post-start-process-instance.md" >}}).


## Start a Process Instance at Any Set of Activities

The `startProcessInstanceByKey` and `startProcessInstanceById` methods start the process instance at their default initial activity, which is typically the single blank start event of the process definition. It is also possible to start anywhere in a process instance by using the *fluent builder* for process instances. The fluent builder can be accessed via the RuntimeService methods `createProcessInstanceByKey` and `createProcessInstanceById`.

The following starts a process instance before the activity `SendInvoiceReceiptTask` and the embedded sub process `DeliverPizzaSubProcess`:

```java
ProcessInstance instance = runtimeService.createProcessInstanceByKey("invoice")
  .startBeforeActivity("SendInvoiceReceiptTask")
  .setVariable("creditor", "Nice Pizza Inc.")
  .startBeforeActivity("DeliverPizzaSubProcess")
  .setVariableLocal("destination", "12 High Street")
  .execute();
```

The fluent builder allows to submit any number of so-called instantiation instructions. When calling `execute`, the process engine performs these instructions in the order they are specified. In the above example, the engine first starts the task *SendInvoiceReceiptTask* and executes the process until it reaches a wait state and then starts *DeliverPizzaTask* and does the same. After these two instructions, the `execute` call returns.


## Query for Process Instances

You can query for all currently running process instances using the `ProcessInstanceQuery` offered by the `RuntimeService`:

    runtimeService.createProcessInstanceQuery()
        .processDefinitionKey("invoice")
        .variableValueEquals("creditor", "Nice Pizza Inc.")
        .list();

The above query would select all process instances for the `invoice` process where the `creditor` is `Nice Pizza Inc.`.

You can also [query for process instances using the REST API]({{< relref "reference/rest/process-instance/get-query.md" >}}).


## Interact With a Process Instance

Once you have performed a query for a particular process instance (or a list of process instances), you may want to interact with it. There are multiple possibilities to interact with a process instance, most prominently:

  * Triggering it (make it continue execution):
      * Through a [Message Event]({{< relref "reference/bpmn20/events/message-events.md" >}})
      * Through a [Signal Event]({{< relref "reference/bpmn20/events/signal-events.md" >}})
  * Canceling it:
      * Using the `RuntimeService.deleteProcessInstance(...)` method.
  * Starting/Canceling any activity:
      * Using the [process instance modification feature]({{< relref "user-guide/process-engine/process-instance-modification.md" >}})

If your process uses at least one User Task, you can also interact with the process instance using the TaskService API.


## Suspend Process Instances

Suspending a process instance is helpful, if you want ensure that it is not executed any further. For example, if process variables are in an undesired state, you can suspend the instance and change the variables *safely*.

In detail, suspension means to disallow all actions that change *token* state (i.e., the activities that are currently executed) of the instance. For example, it is not possible to signal an event or complete a user task for a suspended process instance, as these actions will continue the process instance execution subsequently. Nevertheless, actions like setting or removing variables are still allowed, as they do not change the token state.

Also, when suspending a process instance, all tasks belonging to it will be suspended. Therefore, it will no longer be possible to invoke actions that have effects on the task's *lifecycle* (i.e., user assignment, task delegation, task completion, ...). However, any actions not touching the lifecycle like setting variables or adding comments will still be allowed.

A process instance can be suspended by using the `suspendProcessInstanceById(...)` method of the `RuntimeService`. Similarly it can be reactivated again.

If you would like to suspend all process instances of a given process definition, you can use the method `suspendProcessDefinitionById(...)` of the`RepositoryService` and specify the `suspendProcessInstances` option.


# Executions

If your process instance contains multiple execution paths (like for instance after a [parallel gateway]({{< relref "reference/bpmn20/gateways/parallel-gateway.md" >}}), you must be able to differentiate the currently active paths inside the process instance. In the following example, two user tasks *receive payment* and *ship order* can be active at the same time.

{{< img src="../img/parallel-gw.png" title="Parallel Gateway" >}}

Internally, the process engine creates two concurrent executions inside the process instance, one for each concurrent path of execution. Executions are also created for scopes, for example if the process engine reaches a [Embedded Sub Process]({{< relref "reference/bpmn20/subprocesses/embedded-subprocess.md" >}}) or in case of [Multi Instance]({{< relref "reference/bpmn20/tasks/task-markers.md" >}}).

Executions are hierarchical and all executions inside a process instance span a tree, the process instance being the root-node in the tree. Note: the process instance itself is an execution. Executions are [variable scopes]({{< relref "user-guide/process-engine/variables.md" >}}), meaning that dynamic data can be associated with them.


## Query for Executions

You can query for executions using the `ExecutionQuery` offered by the `RuntimeService`:

```java
runtimeService.createExecutionQuery()
    .processInstanceId(someId)
    .list();
```

The above query returns all executions for a given process instance.

You can also [query for executions using the REST API]({{< relref "reference/rest/execution/get.md" >}}).


# Activity Instances

The activity instance concept is similar to the execution concept but takes a different perspective. While an execution can be imagined as a *token* moving through the process, an activity instance represents an individual instance of an activity (task, subprocess, ...). The concept of the activity instance is thus more *state-oriented*.

Activity instances also span a tree, following the scope structure provided by BPMN 2.0. Activities that are "on the same level of subprocess" (i.e., part of the same scope, contained in the same subprocess) will have their activity instances at the same level in the tree.

For example, Activity Instances are used for [Process Instance Modification]({{< relref "user-guide/process-engine/process-instance-modification.md" >}}) and the [Activity Instance Tree in Cockpit]({{< relref "webapps/cockpit/bpmn/process-instance-view.md#activity-instance-tree" >}}).

Examples:

* Process with two parallel user tasks after parallel Gateway:

<div data-bpmn-diagram="guides/user-guide/process-engine/activity-instances/parallelGateway_two_userTasks"></div>

```
ProcessInstance
  receive payment
  ship order
```

* Process with two parallel Multi-Instance user tasks after parallel Gateway:

<div data-bpmn-diagram="guides/user-guide/process-engine/activity-instances/parallelGateway_two_multiInstance_userTasks"></div>

```
ProcessInstance
  receive payment - Multi-Instance Body
    receive payment
    receive payment
  ship order - Multi-Instance Body
    ship order
```

Note: A multi-instance activity consists of a multi-instance body and an inner activity. The multi-instance body is a scope around the inner activity and collect the activity instances of the inner activity.

* User Task inside an embedded subprocess:

<div data-bpmn-diagram="guides/user-guide/process-engine/activity-instances/userTask_inside_embeddedSubprocess"></div>

```
ProcessInstance
  Subprocess
    receive payment
```

* Process with thrown compensation event after user task:

<div data-bpmn-diagram="guides/user-guide/process-engine/activity-instances/compensation_userTask"></div>

```
ProcessInstance
  cancel order
  cancel shipping
```

## Retrieve an Activity Instance

Currently activity instances can only be retrieved for a process instance:

```java
ActivityInstance rootActivityInstance = runtimeService.getActivityInstance(processInstance.getProcessInstanceId());
```

You can [retrieve the activity instance tree using the REST API]({{< relref "reference/rest/process-instance/get-activity-instances.md" >}}) as well.


## Identity & Uniqueness

Each activity instance is assigned a unique ID. The ID is persistent, if you invoke this method multiple times, the same activity instance IDs will be returned for the same activity instances. (However, there might be different executions assigned, see below)


## Relation to Executions

The Execution concept in the process engine is not completely aligned with the activity instance concept because the execution tree is generally not aligned with the activity / scope concept in BPMN. In general, there is a n-1 relationship between Executions and ActivityInstances, i.e., at a given point in time, an activity instance can be linked to multiple executions. In addition, it is not guaranteed that the same execution that started a given activity instance will also end it. The process engine performs several internal optimizations concerning the compacting of the execution tree which might lead to executions being reordered and pruned. This can lead to situations where a given execution starts an activity instance but another execution ends it. Another special case is the process instance: if the process instance is executing a non-scope activity (for example a user task) below the process definition scope, it will be referenced by both the root activity instance and the user task activity instance.

Note: If you need to interpret the state of a process instance in terms of a BPMN process model, it is usually easier to use the activity instance tree as opposed to the execution tree.


# Jobs and Job Definitions

The Camunda process engine includes a component named the *Job Executor*. The Job Executor is a scheduling component, responsible for performing asynchronous background work. Consider the example of a Timer Event: whenever the process engine reaches the timer event, it will stop execution, persist the current state to the database and create a job to resume execution in the future. A job has a due date which is calculated using the timer expression provided in the BPMN XML.

When a process is deployed, the process engine creates a Job Definition for each activity in the process which will create jobs at runtime. This allows you to query information about timers and asynchronous continuations in your processes.


## Query for jobs

Using the management service, you can query for jobs. The following selects all jobs which are due after a certain date:

```java
managementService.createJobQuery()
  .duedateHigherThan(someDate)
  .list()
```

It is possible to query for jobs using the REST API.


## Query for Job Definitions

Using the management service, you can also query for job definitions. The following selects all job definitions from a specific process definition:

```java
managementService.createJobDefinitionQuery()
  .processDefinitionKey("orderProcess")
  .list()
```
The result will contain information about all timers and asynchronous continuations in the order process.

It is also possible to query for job definitions using the REST API.


## Suspend and Activate Job Execution

Job suspension prevents jobs from being executed. Suspension of job execution can be controlled on different levels:

* Job Instance Level: individual Jobs can be suspended either directly through the `managementService.suspendJob(...)` API or transitively when suspending a Process Instance or a Job Definition.
* Job Definition Level: all instances of a certain Timer or Activity can be suspended.

Job suspension by Job Definition allows you to suspend all instances of a certain timer or an asynchronous continuation. Intuitively, this allows you to suspend a certain activity in a process in a way that all process instances will advance until they have reached this activity and then not continue since the activity is suspended.

Let's assume there is a process deployed with key `orderProcess`, which contains a service task named `processPayment`. The service task has an asynchronous continuation configured which causes it to be executed by the job executor. The following example shows how you can prevent the `processPayment` service from being executed:

```java
List<JobDefinition> jobDefinitions = managementService.createJobDefinitionQuery()
        .processDefinitionKey("orderProcess")
        .activityIdIn("processPayment")
        .list();

for (JobDefinition jobDefinition : jobDefinitions) {
  managementService.suspendJobDefinitionById(jobDefinition.getId(), true);
}
```
