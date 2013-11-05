---

title: 'Process Engine Concepts'
category: 'Process Engine'

---


This section explains some core process engine concepts that are used in both the process engine API and the internal process engine implementation. Understanding these fundamentals makes it easyier to use the process engine API.


## Process Definitions

A process definition defines the structure of a process. You could say that the process definition *is* the process. camunda BPM uses [BPMN 2.0](http://www.camunda.org/design/tutorial.html) as its primary modeling language for modeling process definitions.

<div class="alert alert-info">
  <strong>BPMN 2.0 Reference </strong>
  <p>camunda BPM comes with two BPMN 2.0 References:</p>
  <ul>
    <li>The <a href="http://www.camunda.org/design/reference.html#!/reference">BPMN 2.0 Modeling Reference</a> introduces the fundamentals of BPMN 2.0 and helps you to get started modeling processes. (Make sure to read the <a href="http://www.camunda.org/design/tutorial.html">Tutorial</a> as well.)</li>
    <li>The <a href="ref:/api-references/bpmn20/">BPMN 2.0 Implementation Reference</a> covers the implementation of the individual BPMN 2.0 constructs in camunda BPM. You should consult this reference if you want to implement and execute BPMN processes.</li>
  </ul>
</div>

In camunda BPM you can deploy processes to the process engine in BPMN 2.0 XML format. The XML files are parsed and transformed into a process definition graph structure. This graph structure is executed by the process engine.

### Querying for Process Definitions

You can query for all deployed process definitions using the Java API and the `ProcessDefinitionQuery` made available through the `RepositoryService`. Example:

```java
List<ProcessDefinition> processDefinitions = repositoryService.createProcessDefinitionQuery()
    .processDefinitionKey("invoice")
    .orderByProcessDefinitionVersion()
    .asc()
    .list();
```

The above query returns all deployed process definitions for the key `invoice` ordered by their `version` property.

You can also <a href="ref:/api-references/rest/#process-definition-get-definitions">query for process definitions using the REST API</a>.

### Keys and Versions

The *key* of a process definition (`invoice` in the example above) is the logical identifier of the process. It is used throughout the API, most prominently for starting process instances ([see section on process instances](ref:#process-engine-process-engine-concepts-process-instances)). The key of a process definition is defined using the `id` property of the corresponding `<process ... >` element in the BPMN 2.0 XML file:

```xml
<process id="invoice" name="invoice receipt" isExecutable="true">
  ...
</process>
```

If you deploy multiple processes with the same key, they are treated as individual versions of the same process definition by the process engine.

### Suspending Process Definitions

Suspending a process definition disables it temporarily in that it cannot be instantiated while it is suspended. The `RuntimeService` Java API can be used to suspend a process definition. Similarly, you can activate a process definition to undo this effect.

## Process Instances

A process instance is an individual execution of a process definition. The relation of the process instance to the process definition is the same as the relation between *Object* and *Class* in Object Oriented Programming (the process instance playing the role of the object and the process definition playing the role of the class in this analogy).

The process engine is responsible for creating process instances and managing their state. If you start a process instance which contains a wait state, for example a [user task](ref:/api-references/bpmn20/#tasks-user-task), the process engine must make sure that the state of the process instance is captured and stored inside a database until the wait state is left (the user task is completed).

### Starting a Process Instance

The simplest way to start a process instance is by using the `startProcessInstanceByKey(...)` method offered by the RuntimeService:

    ProcessInstance instance = runtimeService.startProcessInstanceByKey("invoce");

You may optionally pass in a couple of variables:

    Map<String, Object> variables = new HashMap<String,Object>();
    variables.put("creditor", "Nice Pizza Inc.");
    ProcessInstance instance = runtimeService.startProcessInstanceByKey("invoce", variables);

Process variables are available to all tasks in a process instance and are automatically persisted to the database in case the process instance reaches a wait state.

It is also possible to [start a process instance using the REST API](ref:/api-references/rest/#process-definition-start-process-instance).

### Querying for Process Instances

You can query for all currently running process instances using the `ProcessInstanceQuery` offered by the `RuntimeService`:

    runtimeService.createProcessInstanceQuery()
        .processDefinitionKey("invoice")
        .variableValueEquals("creditor", "Nice Pizza Inc.")
        .list();

The above query would select all process instances for the `invoice` process where the `creditor` is `Nice Pizza Inc.`.

You can also [query for process instances using the REST API](ref:/api-references/rest/#process-instance-get-instances).

### Interacting with a Process Instance

Once you have performed a query for a particular process instance (or a list of process instances), you may want to interact with it. There are multiple possibilities to interact with a process instance, most prominently:

  * Triggering it (make it continue execution):
      * Through a [Message Event](ref:/api-references/bpmn20/#events-message-events)
      * Through a [Signal Event](ref:/api-references/bpmn20/#events-signal-events)
  * Canceling it:
      * Using the `RuntimeService.deleteProcessInstance(...)` method.

If your process uses User Task, you can also interact with the process instance using the TaskService API.

### Suspending Process Instances'

Suspending a process instance is helpful, if you want ensure that it is not executed any further. For example, if process variables are in an undesired state, you can suspend the instance and change the variables *safely*.

In detail, suspension means to disallow all actions that change *token* state (i.e. the activities that are currently executed) of the instance. For example, it is not possible to signal an event or complete a user task for a suspended process instance, as these actions will continue the process instance execution subsequently. Nevertheless, actions like setting or removing variables are still allowed, as they do not change token state.

Also, when suspending a process instance, all tasks belonging to it will be suspended. Therefore, it will no longer be possible to invoke actions that have effects on the task's *lifecycle* (i.e. user assignment, task delegation, task completion, ...). However, any actions not touching the lifecycle like setting variables or adding comments will still be allowed.

A process instance can be suspended by using the `suspendProcessInstanceById(...)` method of the `RuntimeService`. Similarly it can be reactivated again.

If you would like to suspend all process instances of a given process definition, you can use the method `suspendProcessDefinitionById(...)` of the`RepositoryService` and specify the `suspendProcessInstances` option.

## Executions

If your process instance contains multiple execution paths (like for instance after a <a href="ref:/api-references/bpmn20/#gateways-parallel-gateway">parallel gateway</a>), you must be able to differentiate the currently active paths inside the process instance. In the following example, two user tasks *receive payment* and *ship order* can be active at the same time.

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/parallel-gw.png"/></center>

Internally the process engine creates two concurrent executions inside the process instance, one for each concurrent path of execution. Executions are also created for scopes, for example if the process engine reaches a <a href="ref:/api-references/bpmn20/#subprocesses-embedded-subprocess">Embedded Sub Process</a> or in case of <a href="ref:/api-references/bpmn20/#tasks-task-markers">Multi Instance</a>.

Executions are hierarchical and all executions inside a process instance span a tree, the process instance being the root-node in the tree. Note: the process instance itself is an execution.

### Local Variables

Executions can have local variables. Local variables are only visible to the execution itself and its children but not to siblings of parents in the execution tree. Local variables are usually used if a part of the process works on some local data object or if an execution works on one item of a collection in case of multi instance.

In order to set a local variable on an execution, use the `setVariableLocal` method provided by the runtime service.

    runtimeService.setVariableLocal(name, value);

### Querying for executions

You can query for executions using the `ExecutionQuery` offered by the `RuntimeService`:

    runtimeService.createProcessInstanceQuery()
        .processInstanceId(someId)
        .list();

The above query returns all executions for a given process instance.

You can also [query for executions using the REST API](ref:/api-references/rest/#execution-get-executions).

## Activity Instances

The activity instance concept is similar to the execution concept but takes a different perspective. While an execution can be imagined as a *token* moving through the process, an activity instance represents an individual instance of an activity (task, subprocess, ...). The concept of the activity instance is thus more *state-oriented*.

Activity instances also span a tree, following the scope structure provided by BPMN 2.0. Activities that are "on the same level of subprocess" (ie. part of the same scope, contained in the same subprocess) will have their activity instances at the same level in the tree

Examples:

  * Process with two parallel user tasks after parallel Gateway: in the activity instance tree you will see two activity instances below the root instance, one for each user task.
  * Process with two parallel Multi Instance user tasks after parallel Gateway: in the activity instance tree, all instances of both user tasks will be listed below the root activity instance. Reason: all activity instances are at the same level of subprocess.
  * Usertask inside embedded subprocess: the activity instance three will have 3 levels: the root instance representing the process instance itself, below it an activity instance representing the instance of the embedded subprocess, and below this one, the activity instance representing the usertask.

### Retrieving an Activity Instance

Currently activity instances can only be retrieved for a process instance:

    ActivityInstance rootActivityInstance = runtimeService.getActivityInstance(processInstance.getProcessInstanceId());

You can <a href="ref:/api-references/rest/#process-instance-get-activity-instance">retrieve the activity instance tree using the REST API</a> as well.

### Identity & Uniqueness

Each activity instance is assigned a unique Id. The id is persistent, if you invoke this method multiple times, the same activity instance ids will be returned for the same activity instances. (However, there might be different executions assigned, see below)

### Relation to Executions

The Execution concept in the process engine is not completely aligned with the activity instance concept because the execution tree is in general not aligned with the activity / scope concept in BPMN. In general, there is a n-1 relationship between Executions and ActivityInstances, ie. at a given point in time, an activity instance can be linked to multiple executions. In addition, it is not guaranteed that the same execution that started a given activity instance will also end it. The process engine performs several internal optimizations concerning the compacting of the execution tree which might lead to executions being reordered and pruned. This can lead to situations where a given execution starts an activity instance but another execution ends it. Another special case is the process instance: if the process instance is executing a non-scope activity (for example a user task) below the process definition scope, it will be referenced by both the root activity instance and the user task activity instance.

Note: If you need to interpret the state of a process instance in terms of a BPMN process model, it is usually easier to use the activity instance tree as opposed to the execution tree.

