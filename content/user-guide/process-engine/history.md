---

title: 'History and Audit Event Log'
weight: 140

menu:
  main:
    identifier: "user-guide-process-engine-history"
    parent: "user-guide-process-engine"

---


The History Event Stream provides audit information about executed process instances.

{{< img src="../img/process-engine-history.png" title="Process Engine History" >}}

The process engine maintains the state of running process instances inside the database. This includes *writing* (1.) the state of a process instance to the database as it reaches a wait state and *reading* (2.) the state as process execution continues. We call this database the *runtime database*. In addition to maintaining the runtime state, the process engine creates an audit log providing audit information about executed process instances. We call this event stream the *history event stream* (3.). The individual events which make up this event stream are called *History Events* and contain data about executed process instances, activity instances, changed process variables and so forth. In the default configuration, the process engine will simply write (4.) this event stream to the *history database*. The `HistoryService` API allows querying this database (5.). The history database and the history service are optional components; if the history event stream is not logged to the history database or if the user chooses to log events to a different database, the process engine is still able to work and it is still able to populate the history event stream. This is possible because the BPMN 2.0 Core Engine component does not read state from the history database. It is also possible to configure the amount of data logged, using the `historyLevel` setting in the process engine configuration.

Since the process engine does not rely on the presence of the history database for generating the history event stream, it is possible to provide different backends for storing the history event stream. The default backend is the `DbHistoryEventHandler` which logs the event stream to the history database. It is possible to exchange the backend and provide a custom storage mechanism for the history event log.


# Choose a History Level

The history level controls the amount of data the process engine provides via the history event stream. The following settings are available out of the box:

* `NONE`: no history events are fired.
* `ACTIVITY`: the following events are fired:
    * Process Instance START, UPDATE, END, MIGRATE: fired as process instances are being started, updated, ended and migrated
    * Case Instance CREATE, UPDATE, CLOSE: fired as case instances are being created, updated and closed
    * Activity Instance START, UPDATE, END, MIGRATE: fired as activity instances are being started, updated, ended and migrated
    * Case Activity Instance CREATE, UPDATE, END: fired as case activity instances are being created, updated and ended
    * Task Instance CREATE, UPDATE, COMPLETE, DELETE, MIGRATE: fired as task instances are being created, updated (i.e., re-assigned, delegated etc.), completed, deleted and migrated.
* `AUDIT`: in addition to the events provided by history level `ACTIVITY`, the following events are fired:
    * Variable Instance CREATE, UPDATE, DELETE, MIGRATE: fired as process variables are created, updated, deleted and migrated. The default history backend (DbHistoryEventHandler) writes variable instance events to the historic variable instance database table. Rows in this table are updated as variable instances are updated, meaning that only the last value of a process variable will be available.
* `FULL`: in addition to the events provided by history level `AUDIT`, the following events are fired:
    * Form property UPDATE: fired as form properties are being created and/or updated.
    * The default history backend (DbHistoryEventHandler) writes historic variable updates to the database. This makes it possible to inspect the intermediate values of a process variable using the history service.
    * User Operation Log UPDATE: fired when a user performs an operation like claiming a user task, delegating a user task etc.
    * Incidents CREATE, DELETE, RESOLVE, MIGRATE: fired as incidents are being created, deleted, resolved and migrated
    * Historic Job Log CREATE, FAILED, SUCCESSFUL, DELETED: fired as a job is being created, a job execution failed or was successful or a job was deleted
    * Decision Instance EVALUATE: fired when a decision is evaluated by the DMN engine.
    * Batch START, END: fired as batches are being started and ended
    * Identity links ADD, DELETE: fired when an identity link is being added, deleted or when an assignee of a user task is set or changed and when the owner of a user task is set or changed.
    * Historic External Task Log CREATED, DELETED, FAILED, SUCCESSFUL: fired as an external task has been created, deleted or an external task execution has been reported to fail or succeed.
* `AUTO`: The level `auto` is useful if you are planning to run multiple engines on the same database. In that case, all engines have to use the same history level. Instead of manually keeping your configurations in sync, use the level `auto` and the engine determines the level already configured in the database automatically. If none is found, the default value `audit` is used. Keep in mind: If you are planning to use custom history levels, you have to register the custom levels for every configuration, otherwise an exception is thrown.

If you need to customize the amount of history events logged, you can provide a custom implementation {{< javadocref page="?org/camunda/bpm/engine/impl/history/producer/HistoryEventProducer.html" text="HistoryEventProducer" >}} and wire it in the process engine configuration.


# Set the History Level

The history level can be provided as a property in the process engine configuration. Depending on how the process engine is configured, the property can be set using Java code:

```java
ProcessEngine processEngine = ProcessEngineConfiguration
  .createProcessEngineConfigurationFromResourceDefault()
  .setHistory(ProcessEngineConfiguration.HISTORY_FULL)
  .buildProcessEngine();
```

It can also be set using Spring XML or a deployment descriptor (bpm-platform.xml, processes.xml). When using the Camunda JBoss Subsystem, the property can be set through JBoss configuration (standalone.xml, domain.xml).

```xml
<property name="history">audit</property>
```

Note that when using the default history backend, the history level is stored in the database and cannot be changed later.

{{< note title="History levels and Cockpit" class="info" >}}
[The Camunda Platform Cockpit]({{< ref "/webapps/cockpit/_index.md" >}}) web application works best with History Level set to `FULL`. "Lower" History Levels will disable certain history-related features.
{{< /note >}}

# The Default History Implementation

The default history database writes History Events to the appropriate database tables. The database tables can then be queried using the `HistoryService` or using the REST API.


## History Entities

There are the following History entities, which - in contrast to the runtime data - will also remain present in the DB after process and case instances have been completed:

* `HistoricProcessInstances` containing information about current and past process instances.
* `HistoricVariableInstances` containing information about the latest state a variable held in a process instance.
* `HistoricCaseInstances` containing information about current and past case instances.
* `HistoricActivityInstances` containing information about a single execution of an activity.
* `HistoricCaseActivityInstances` containing information about a single execution of a case activity.
* `HistoricTaskInstances` containing information about current and past (completed and deleted) task instances.
* `HistoricDetails` containing various kinds of information related to either a historic process instances, an activity instance or a task instance.
* `HistoricIncidents` containing information about current and past (i.e., deleted or resolved) incidents.
* `UserOperationLogEntry` log entry containing information about an operation performed by a user. This is used for logging actions such as creating a new task, completing a task, etc.
* `HistoricJobLog` containing information about the job execution. The log provides details about the lifecycle of a job.
* `HistoricDecisionInstance` containing information about a single evaluation of a decision, including the input and output values.
* `HistoricBatch` containing information about current and past batches.
* `HistoricIdentityLinkLog` containing information about current and past (added, deleted, assignee is set or changed and owner is set or changed) identity links.
* `HistoricExternalTaskLog` containing information about the external log. The log provides details about the lifecycle of an external task.


## State of HistoricProcessInstances

For every process instance process engine will create single record in history database and will keep updating this record during process execution. Every HistoricProcessInstance record can get one of the following states assigned:

*  ACTIVE - running process instance
*  SUSPENDED - suspended process instances
*  COMPLETED - completed through normal end event
*  EXTERNALLY_TERMINATED - terminated externally, for instance through REST API
*  INTERNALLY_TERMINATED - terminated internally, for instance by terminating boundary event

Among them following states can be triggered externally, for example through REST API or Cockpit: ACTIVE, SUSPENDED, EXTERNALLY_TERMINATED.

## Query History

The HistoryService exposes the methods `createHistoricProcessInstanceQuery()`,
`createHistoricVariableInstanceQuery()`, `createHistoricCaseInstanceQuery()`,
`createHistoricActivityInstanceQuery()`, `createHistoricCaseActivityInstanceQuery()`,
`createHistoricDetailQuery()`,
`createHistoricTaskInstanceQuery()`,
`createHistoricIncidentQuery()`,
`createUserOperationLogQuery()`,
`createHistoricJobLogQuery()`,
`createHistoricDecisionInstanceQuery()`,
`createHistoricBatchQuery()`,
`createHistoricExternalTaskLogQuery` and `createHistoricIdentityLinkLogQuery()`
which can be used for querying history.

Below are a few examples which show some of the possibilities of the query API for history. Full description of the possibilities can be found in the Javadocs, in the `org.camunda.bpm.engine.history` package.

**HistoricProcessInstanceQuery**

Get the ten `HistoricProcessInstances` that are finished and that took the most time to complete (the longest duration) of all finished processes with definition 'XXX'.

```java
historyService.createHistoricProcessInstanceQuery()
  .finished()
  .processDefinitionId("XXX")
  .orderByProcessInstanceDuration().desc()
  .listPage(0, 10);
```

**HistoricCaseInstanceQuery**

Get the ten `HistoricCaseInstances` that are closed and that took the most time to be closed (the longest duration) of all closed cases with definition 'XXX'.

```java
historyService.createHistoricCaseInstanceQuery()
  .closed()
  .caseDefinitionId("XXX")
  .orderByCaseInstanceDuration().desc()
  .listPage(0, 10);
```


**HistoricActivityInstanceQuery**

Get the last `HistoricActivityInstance` of type 'serviceTask' that has been finished in any process that uses the processDefinition with id 'XXX'.

``` java
historyService.createHistoricActivityInstanceQuery()
  .activityType("serviceTask")
  .processDefinitionId("XXX")
  .finished()
  .orderByHistoricActivityInstanceEndTime().desc()
  .listPage(0, 1);
```

**HistoricCaseActivityInstanceQuery**

Get the last `HistoricCaseActivityInstance` that has been finished in any case that uses the caseDefinition with id 'XXX'.

``` java
historyService.createHistoricCaseActivityInstanceQuery()
  .caseDefinitionId("XXX")
  .finished()
  .orderByHistoricCaseActivityInstanceEndTime().desc()
  .listPage(0, 1);
```

**HistoricVariableInstanceQuery**

Get all HistoricVariableInstances from a finished process instance with id 'XXX', ordered by variable name.

```java
historyService.createHistoricVariableInstanceQuery()
  .processInstanceId("XXX")
  .orderByVariableName().desc()
  .list();
```

**HistoricDetailQuery**

The next example gets all variable-updates that have been done in process with id '123'. Only HistoricVariableUpdates will be returned by this query. Note that it's possible for a certain variable name to have multiple HistoricVariableUpdate entries, one for each time the variable was updated in the process. You can use orderByTime (the time the variable update was done) or orderByVariableRevision (revision of runtime variable at the time of updating) to find out in what order they occurred.

```java
historyService.createHistoricDetailQuery()
  .variableUpdates()
  .processInstanceId("123")
  .orderByVariableName().asc()
  .list()
```

The next example gets all variable updates that were performed on the task with id '123'. This returns all HistoricVariableUpdates for variables that were set on the task (task local variables), and NOT on the process instance.

```java
historyService.createHistoricDetailQuery()
  .variableUpdates()
  .taskId("123")
  .orderByVariableName().asc()
  .list()
```

**HistoricTaskInstanceQuery**

Get the ten HistoricTaskInstances that are finished and that took the most time to complete (the longest duration) of all tasks.

```java
historyService.createHistoricTaskInstanceQuery()
  .finished()
  .orderByHistoricTaskInstanceDuration().desc()
  .listPage(0, 10);
```

Get HistoricTaskInstances that are deleted with a delete reason that contains 'invalid' and that were last assigned to user 'jonny'.

```java
historyService.createHistoricTaskInstanceQuery()
  .finished()
  .taskDeleteReasonLike("%invalid%")
  .taskAssignee("jonny")
  .listPage(0, 10);
```

**HistoricIncidentQuery**

Query for all resolved incidents:

```java
historyService.createHistoricIncidentQuery()
  .resolved()
  .list();
```

**UserOperationLogQuery**

Query for all operations performed by user 'jonny':

```java
historyService.createUserOperationLogQuery()
  .userId("jonny")
  .listPage(0, 10);
```

**HistoricJobLogQuery**

Query for successful historic job logs:

```java
historyService.createHistoricJobLogQuery()
  .successLog()
  .list();
```

**HistoricDecisionInstanceQuery**

Get all HistoricDecisionInstances from a decision with key 'checkOrder' ordered by the time when the decision was evaluated.

```java
historyService.createHistoricDecisionInstanceQuery()
  .decisionDefinitionKey("checkOrder")
  .orderByEvaluationTime()
  .asc()
  .list();
```

Get all HistoricDecisionInstances from decisions that were evaluated during the execution of the process instance with id 'XXX'. The HistoricDecisionInstances contains the input values on which the decision was evaluated and the output values of the matched rules.

```java
historyService.createHistoricDecisionInstanceQuery()
  .processInstanceId("XXX")
  .includeInputs()
  .includeOutputs()
  .list();
```

**HistoricBatchQuery**

Get all historic process instance migration batches ordered by id.

```java
historyService.createHistoricBatchQuery()
  .type(Batch.TYPE_PROCESS_INSTANCE_MIGRATION)
  .orderById().desc()
  .list();
```
**HistoricIdentityLinkLogQuery**

Query for all identity links that are related to the user 'demo'.

```java
historyService.createHistoricIdentityLinkLogQuery()
  .userId("demo")
  .list();
```

**HistoricExternalTaskLogQuery**

Query for failed historic external task logs:

```java
historyService.createHistoricExternalTaskLogQuery()
  .failureLog()
  .list();
```

## History Report

You can use the reports section to retrieve custom statistics and reports. Currently, we support the following kinds of reports:

* [Instance Duration Report]({{< relref "#instance-duration-report" >}})
* [Task Report]({{< relref "#task-report" >}})
* [Finished Instance Report]({{< relref "#finished-instance-report" >}})



### Instance Duration Report

Retrieves a report about the duration of completed process instances, grouped by a specified period. These reports include the maximum, minimum and average duration of all completed process instances, which were started in the specified period. The following code snippet retrieves a report for every month since the engine was started:

```java
historyService
  .createHistoricProcessInstanceReport()
  .duration(PeriodUnit.MONTH);
```

The supported periods so far are `MONTH` and `QUARTER` from `org.camunda.bpm.engine.query.PeriodUnit`.

To narrow down the report query, one can use the following methods from ``HistoricProcessInstanceReport``:

* ``startedBefore``: Only takes historic process instances into account that were started before a given date.
* ``startedAfter``: Only takes historic process instances into account that were started after a given date.
* ``processDefinitionIdIn``: Only takes historic process instances into account for given process definition ids.
* ``processDefinitionKeyIn``: Only takes historic process instances into account for given process definition keys.

where `startedBefore` and `startedAfter` use `java.util.Date` (deprecated) or `java.util.Calendar` objects for the input.

For instance, one could query for all historic process instances which were started before now and get their duration:

 ```java
Calendar calendar = Calendar.getInstance();
historyService.createHistoricProcessInstanceReport()
  .startedBefore(calendar.getTime())
  .duration(PeriodUnit.MONTH);
 ```

### Task Report

Retrieves a report of completed tasks. For the task report there are two possible report types: count and duration.

If you use the method `countByProcessDefinitionKey` or `countByTaskName` in the end of your report query, the report contains a list of completed task counts where an entry contains the task name, the definition key of the task, the process definition id, the process definition key, the process definition name and the count of how many tasks were completed for the specified key in a given period. The methods `countByProcessDefinitionKey` and `countByTaskName` then group the count reports according the criterion 'definition key' or 'task name'. To retrieve a task count report grouped by the task name, one could execute the following query:

```java
historyService
  .createHistoricTaskInstanceReport()
  .countByTaskName();
```

If the report type is set to duration, the report contains a minimum, maximum and average duration value of all completed task instances in a given period.

```java
historyService
  .createHistoricTaskInstanceReport()
  .duration(PeriodUnit.MONTH);
```

The supported period times and the confinement of the query works analogously to [Instance Duration Report]({{< relref "#instance-duration-report" >}}).

### Finished Instance Report

Retrieves a report of finished process, decision or case instances. The report helps the user to tune the history time to live for definitions. They can see a summary of the historic data which can be cleaned after history cleanup. The output fields are definition id, key, name, version, count of the finished instances and count of the 'cleanable' instances.

```java
historyService
  .createHistoricFinishedProcessInstanceReport()
  .list();

historyService
  .createHistoricFinishedDecisionInstanceReport()
  .list();

historyService
  .createHistoricFinishedCaseInstanceReport()
  .list();
```

## Partially Sorting History Events by Their Occurrence

Sometimes you want to sort history events in the order in which they
occurred. Please note that timestamps cannot be used for that.

Most history events contain a timestamp which marks the point in time at which the action signified
by the event occurred. However, this timestamp can, in general, not be used for sorting the history
events. The reason is that the process engine can be run on multiple cluster nodes:

* on a single machine, the clock may change due to network sync at runtime,
* in a cluster, events happening in a single process instance may be generated on different nodes
  among which the clock may not be synced accurately down to nanoseconds.

To work around this, the Camunda engine generates sequence numbers which can be used to *partially*
sort history events by their occurrence.

At a BPMN level this means that instances of concurrent activities (example: activities on different
parallel branches after a parallel gateway) cannot be compared to each other. Instances of
activities that are part of happens-before relation at the BPMN level will be ordered in respect to
that relation.

Example:

```java
List<HistoricActivityInstance> result = historyService
  .createHistoricActivityInstanceQuery()
  .processInstanceId("someProcessInstanceId")
  .orderPartiallyByOccurrence()
  .asc()
  .list();
```

Please note the returned list of historic activity instances in the example is
only partially sorted, as explained above. It guarantees that related
activity instances are sorted by their occurrence. The ordering of unrelated
activity instances is arbitrary and is not guaranteed.


# User Operation Log

The user operation log contains entries for many API operations and can be used for auditing purposes. It provides data on what kind of operations are performed as well as details on the changes involved in the operation. Operations are logged when the operation is performed in the context of a logged in user. To use the operation log, the process engine history level must be set to `FULL`.

## Write Log Entries Regardless of User Authentication Context

If it is desired that operations are logged regardless whether they are performed in the context of a logged in user or not, then the process engine configuration flag named `restrictUserOperationLogToAuthenticatedUsers` can be set to `false`.

## Access the User Operation Log

The user operation log can be accessed via the Java API. The history service can be used to execute a `UserOperationLogQuery` by calling `historyService.createUserOperationLogQuery().execute()`. The query can be restricted with various filtering options. The query is also [exposed in the REST API]({{< ref "/reference/rest/history/user-operation-log/get-user-operation-log-query.md" >}}).


## User Operation Log Entries

The log consists of *operations* and *entries*. An operation corresponds to one performed action and consists of multiple entries, at least one. Entries contain the detailed changes being part of the operation. When making a user operation log query, the returned entities are of type `UserOperationLogEntry`, corresponding to entries. All entries of one operation are linked by an operation id.

A user operation log entry has the following properties:

* **Operation ID**: A generated id that uniquely identifies a performed operation. Multiple log entries that are part of one operation reference the same operation ID.
* **Operation Type**: The name of the performed operation. Available operation types are listed in the interface {{< javadocref page="?org/camunda/bpm/engine/history/UserOperationLogEntry.html" text="org.camunda.bpm.engine.history.UserOperationLogEntry" >}}. Note that one operation can consist of multiple types, for example a cascading API operation is one user operation, but is split into multiple types of operations.
* **Entity Type**: An identifier of the type of the entity that was addressed by the operation. Available entity types are listed in the class {{< javadocref page="?org/camunda/bpm/engine/EntityTypes.html" text="org.camunda.bpm.engine.EntityTypes" >}}. Like the operation type, one operation may address more than one type of entity.
* **Category**: The name of the category the operation is associated with. Available categories are listed in the interface {{< javadocref page="?org/camunda/bpm/engine/history/UserOperationLogEntry.html" text="org.camunda.bpm.engine.history.UserOperationLogEntry" >}}. For example, all task related runtime operations like claiming and completing tasks fall into the category {{< javadocref page="?org/camunda/bpm/engine/history/UserOperationLogEntry.html#CATEGORY_TASK_WORKER" text="TaskWorker" >}}.
* **Annotation**: An arbitrary text annotation set by a user for auditing reasons. Multiple log entries that belong to an operation have the same annotation.
* **Entity IDs**: A job log entry contains the entity IDs that serve to identify the entities addressed by the operation. For example, an operation log entry on a task contains the id of the task as well as the id of the process instance the task belongs to. As a second example, a log entry for suspending all process instances of a process definition does not contain individual process instance IDs but only the process definition ID.
* **User ID**: The ID of the user who performed the operation.
* **Timestamp**: The time at which the operation was performed.
* **Changed Property**: A user operation may change multiple properties. For example, suspension of a process instance changes the suspension state property. A log entry is created for each changed property involved in an operation.
* **Old Property Value**: The previous value of the changed property. A  `null` value either indicates that the property was previously `null` or is not known.
* **New Property Value**: The new value of the changed property.

## Annotation of User Operation Logs

User Operation Logs are helpful to audit manual operations. To make it obvious why a certain 
operation was performed, sometimes it is not enough to only log technical information (e. g. 
timestamp, operation type, etc.) but also add an annotation that puts the operation in the right 
business context.

You can directly pass an annotation for the following operations:

* [Process Instance Modification][op-log-set-annotation-instance-mod]

You can also set an annotation to an operation log which is already present:

An annotation can be set and cleared via Java API:

```java
String operationId = historyService.createUserOperationLogQuery()
    .singleResult()
    .getOperationId();

String annotation = "Instances restarted due to wrong turn";
historyService.setAnnotationForOperationLogById(operationId, annotation);

historyService.clearAnnotationForOperationLogById(operationId);
```

**Please note:** Annotations are present on all entries that belong to an operation log.

Please also see the REST API reference for [setting][op-log-set-annotation-rest] and 
[clearing][op-log-clear-annotation-rest] annotations.

## Glossary of Operations Logged in the User Operation Log

The following describes the operations logged in the user operation log and the entries that are created as part of it:

<table class="table table-striped">
  <tr>
    <th>Entity Type</th>
    <th>Operation Type</th>
	<th>Category</th>
    <th>Properties</th>
  </tr>
  <tr>
  <td>Task</td>
    <td>Assign</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>assignee</strong>: The id of the user who was assigned to the task</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Claim</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>assignee</strong>: The id of the user who claimed the task</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Complete</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>delete</strong>: The new delete state, <code>true</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Create</td>
	<td>TaskWorker</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>Delegate</td>
	<td>TaskWorker</td>
    <td>
      When delegating a task, three log entries are created, containing one of the following properties:
      <ul>
        <li><strong>delegation</strong>: The resulting delegation state, <code>PENDING</code></li>
        <li><strong>owner</strong>: The original owner of the task</li>
        <li><strong>assignee</strong>: The user this task has been assigned to</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>TaskWorker</td>
    <td>
      <ul>
      <li><strong>delete</strong>: The new delete state, <code>true</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Resolve</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>delegation</strong>: The resulting delegation state, <code>RESOLVED</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetOwner</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>owner</strong>: The new owner of the task</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetPriority</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>priority</strong>: The new priority of the task</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Update</td>
	<td>TaskWorker</td>
    <td>
      The manually changed property of a task, where manually means that a property got directly changed. Claiming a task via the TaskService wouldn't be logged with an update entry, but setting the assignee directly would be. One of the following is possible:
      <ul>
        <li><strong>description</strong>: The new description of the task</li>
        <li><strong>owner</strong>: The new owner of the task</li>
        <li><strong>assignee</strong>: The new assignee to the task</li>
        <li><strong>dueDate</strong>: The new due date of the task</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>DeleteHistory</td>
    <td>Operator</td>
    <td>
      <ul>
        <li><strong>nrOfInstances</strong>: the amount of decision instances that were deleted</li>
        <li><strong>async</strong>: by default <code>false</code> since the operation can only be performed synchronously</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>ProcessInstance</td>
    <td>Create</td>
	<td>Operator</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>Activate</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: The new suspension state, <code>active</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Operator</td>
    <td>
      In case of regular operation:
      <ul><i>No additional property is logged</i></ul>
      In case of batch operation:
      <ul>
        <li><strong>nrOfInstances</strong>: the amount of process instances that were deleted</li>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch, <code>false</code> if operation was performed synchronously</li>
        <li><strong>deleteReason</strong>: the reason for deletion</li>
        <li><strong>type</strong>: <code>history</code> in case of deletion of historic process instances</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>ModifyProcessInstance</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>nrOfInstances</strong>: The amount of process instances modified</li>
        <li><strong>async</strong>: <code>true</code> if modification was performed asynchronously as a batch, <code>false</code> if modification was performed synchronously</li>
        <li><strong>processDefinitionVersion</strong>: The version of the process definition</li>
      </ul>
	</td>
  </tr>
  <tr>
    <td></td>
    <td>Suspend</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: The new suspension state, <code>suspended</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Migrate</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>processDefinitionId</strong>: The id of the process definition that instances are migrated to</li>
        <li><strong>nrOfInstances</strong>: The amount of process instances migrated</li>
        <li><strong>async</strong>: <code>true</code> if migration was performed asynchronously as a batch, <code>false</code> if migration was performed synchronously</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>RestartProcessInstance</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>nrOfInstances</strong>: The amount of process instances restarted</li>
        <li><strong>async</strong>: <code>true</code> if restart was performed asynchronously as a batch, <code>false</code> if restart was performed synchronously</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>DeleteHistory</td>
  	<td>Operator</td>
    <td>
      <ul>
        <li><strong>nrOfInstances</strong>: the amount of process instances that were deleted</li>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch, <code>false</code> if operation was performed synchronously</li>
        <li><strong>deleteReason</strong>: the reason for deletion. This property exists only if the operation was performed asynchronously</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>CreateIncident</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>incidentType</strong>: The type of incident that was created</li>
		<li><strong>configuration</strong>: The configuration of the incident that was created</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Resolve</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>incidentId</strong>: The id of the incident that was resolved</li>
      </ul>
    </td>
  </tr> 
  <tr>
    <td></td>
    <td>SetRemovalTime</td>
	  <td>Operator</td>
    <td>
      <ul>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch</li>
        <li><strong>nrOfInstances</strong>: The amount of updated instances</li>
        <li><strong>removalTime</strong>: The date of which an instance shall be removed</li>
        <li>
          <strong>mode</strong>: <code>CALCULATED_REMOVAL_TIME</code> if the removal time was calculated,
          <code>ABSOLUTE_REMOVAL_TIME</code> if the removal time was set explicitly,
          <code>CLEARED_REMOVAL_TIME</code> if the removal time was cleared
        </li>
        <li>
          <strong>hierarchical</strong>: <code>true</code> if the removal time was set across the hiearchy,
          <code>false</code> if the hierarchy was neglected
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetVariables</td>
	  <td>Operator</td>
    <td>
      <ul>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch</li>
        <li><strong>nrOfInstances</strong>: The amount of affected instances</li>
        <li><strong>nrOfVariables</strong>: The amount of set variables</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IdentityLink</td>
    <td>AddUserLink</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>candidate</strong>: The new candidate user associated</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>DeleteUserLink</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>candidate</strong>: The previously associated user</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>AddGroupLink</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>candidate</strong>: The new group associated</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>DeleteGroupLink</td>
	<td>TaskWorker</td>
    <td>
      <ul>
      <li><strong>candidate</strong>: The previously associated group</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Attachment</td>
    <td>AddAttachment</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>name</strong>: The name of the added attachment</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>DeleteAttachment</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>name</strong>: The name of the deleted attachment</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>JobDefinition</td>
    <td>ActivateJobDefinition</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>active</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetPriority</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>overridingPriority</strong>: the new overriding job priority. Is <code>null</code>, if the priority was cleared.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SuspendJobDefinition</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>suspended</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>ProcessDefinition</td>
    <td>ActivateProcessDefinition</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>active</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SuspendProcessDefinition</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>suspended</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>cascade</strong>: if the value is set to <code>true</code>, then all instances including history are also deleted.</li>
      </ul>
    </td>
  </tr>
   <tr>
    <td></td>
    <td>UpdateHistoryTimeToLive</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>historyTimeToLive</strong>: the new history time to live.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>DecisionDefinition</td>
    <td>UpdateHistoryTimeToLive</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>historyTimeToLive</strong>: the new history time to live.</li>
        <li><strong>decisionDefinitionId</strong>: the id of the decision definition whose history time to live is updated.</li>
        <li><strong>decisionDefinitionKey</strong>: the key of the decision definition whose history time to live is updated.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Evaluate</td>
    <td>Operator</td>
    <td>
      <ul>
        <li><strong>decisionDefinitionId</strong>: the id of the decision definition that was evaluated.</li>
        <li><strong>decisionDefinitionKey</strong>: the key of the decision definition that was evaluated.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>CaseDefinition</td>
    <td>UpdateHistoryTimeToLive</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>historyTimeToLive</strong>: the new history time to live.</li>
        <li><strong>caseDefinitionKey</strong>: the key of the case definition whose history time to live is updated.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Job</td>
    <td>ActivateJob</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>active</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetPriority</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>priority</strong>: the new priority of the job</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetJobRetries</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>retries</strong>: the new number of retries</li>
        <li><strong>nrOfInstances</strong>: the number of jobs that were updated.</li>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch, <code>false</code> if operation was performed synchronously</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SuspendJob</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>suspended</code></li>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch, <code>false</code> if operation was performed synchronously</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Execute</td>
	<td>Operator</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Operator</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>SetDueDate</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>duedate</strong>: the new due date of the job</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>RecalculateDueDate</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>creationDateBased</strong>: if the value is set to <code>true</code>, the new due date was calculated based on the creation date of the job. Otherwise, it was calculated using the date the recalcuation took place.</li>
		<li><strong>duedate</strong>: the new due date of the job</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>CreateHistoryCleanupJobs</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>immediatelyDue</strong>: <code>true</code> if the operation was performed immediately, <code>false</code> if the operation was scheduled regularly</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Variable</td>
    <td>ModifyVariable</td>
	<td>Operator/<br>TaskWorker</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>RemoveVariable</td>
	<td>Operator/<br>TaskWorker</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>SetVariable</td>
	<td>Operator/<br>TaskWorker</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>DeleteHistory</td>
	<td>Operator</td>
    <td>
      In case of single operation:
      <ul>
        <li><strong>name</strong>: the name of the variable whose history was deleted</li>
      </ul>
      In case of list operation by process instance:
      <ul><i>No additional property is logged</i></ul>
    </td>
  </tr>
  <tr>
    <td>Deployment</td>
    <td>Create</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>duplicateFilterEnabled</strong>: if the value is set to <code>true</code>, then during the creation of the deployment the given resources have been checked for duplicates in the set of previous deployments. Otherwise, the duplicate filtering has been not executed.</li>
        <li><strong>deployChangedOnly</strong>: this property is only logged when <code>duplicateFilterEnabled</code> is set to <code>true</code>. If the property value is set to <code>true</code> then only changed resources have been deployed. Otherwise, all resources are redeployed if any resource has changed.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>cascade</strong>: if the value is set to <code>true</code>, then all instances including history are also deleted.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Batch</td>
    <td>ActivateBatch</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>active</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SuspendBatch</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>suspended</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>cascadeToHistory</strong>: <code>true</code> if historic data related to the batch job is deleted as well, <code>false</code> if only the runtime data is deleted.</li>
      </ul>
    </td>    
  </tr>
  <tr>
    <td></td>
    <td>DeleteHistory</td>
	<td>Operator</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>SetRemovalTime</td>
    <td>Operator</td>
    <td>
      <ul>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch</li>
        <li><strong>nrOfInstances</strong>: The amount of updated instances</li>
        <li><strong>removalTime</strong>: The date of which an instance shall be removed</li>
        <li>
          <strong>mode</strong>: <code>CALCULATED_REMOVAL_TIME</code> if the removal time was calculated,
          <code>ABSOLUTE_REMOVAL_TIME</code> if the removal time was set explicitly,
          <code>CLEARED_REMOVAL_TIME</code> if the removal time was cleared
        </li>
      </ul>
    </td>
    </tr>
  <tr>
    <td>ExternalTask</td>
    <td>SetExternalTaskRetries</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>retries</strong>: the new number of retries</li>
        <li><strong>nrOfInstances</strong>: the amount of external tasks that were updated</li>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch, <code>false</code> if operation was performed synchronously</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetPriority</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>priority</strong>: the new priority</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Unlock</td>
	<td>Operator</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td>DecisionInstance</td>
    <td>DeleteHistory</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>nrOfInstances</strong>: the amount of decision instances that were deleted</li>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch, <code>false</code> if operation was performed synchronously</li>
        <li><strong>deleteReason</strong>: the reason for deletion. This property exists only if operation was performed asynchronously</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetRemovalTime</td>
    <td>Operator</td>
    <td>
      <ul>
        <li><strong>async</strong>: <code>true</code> if operation was performed asynchronously as a batch</li>
        <li><strong>nrOfInstances</strong>: The amount of updated instances</li>
        <li><strong>removalTime</strong>: The date of which an instance shall be removed</li>
        <li>
          <strong>mode</strong>: <code>CALCULATED_REMOVAL_TIME</code> if the removal time was calculated,
          <code>ABSOLUTE_REMOVAL_TIME</code> if the removal time was set explicitly,
          <code>CLEARED_REMOVAL_TIME</code> if the removal time was cleared
        </li>
        <li>
          <strong>hierarchical</strong>: <code>true</code> if the removal time was set across the hiearchy,
          <code>false</code> if the hierarchy was neglected
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>CaseInstance</td>
    <td>DeleteHistory</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>nrOfInstances</strong>: The amount of case instances that were deleted. Only present if executed in bulk delete.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Metrics</td>
    <td>Delete</td>
	<td>Operator</td>
    <td>
      <ul>
        <li><strong>timestamp</strong>: The date for which all metrics older than that have been deleted. Only present if specified by the user.</li>
        <li><strong>reporter</strong>: The reporter for which all metrics reported by it have been deleted. Only present if specified by the user.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>TaskMetrics</td>
    <td>Delete</td>
    <td>Operator</td>
    <td>
      <ul>
        <li><strong>timestamp</strong>: The date for which all task metrics older than that have been deleted. Only present if specified by the user.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>OperationLog</td>
    <td>SetAnnotation</td>
	  <td>Operator</td>
    <td>
      <ul>
        <li><strong>operationId</strong>: the id of the annotated operation log</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>ClearAnnotation</td>
	  <td>Operator</td>
    <td>
      <ul>
        <li><strong>operationId</strong>: the id of the annotated operation log</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Filter</td>
    <td>Create</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>filterId</strong>: the id of the filter that been created</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Update</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>filterId</strong>: the id of the filter that been updated</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>TaskWorker</td>
    <td>
      <ul>
        <li><strong>filterId</strong>: the id of the filter that been deleted</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>User</td>
    <td>Create</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>userId</strong>: the id of the user that has been created</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Update</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>userId</strong>: the id of the user that has been updated</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>userId</strong>: the id of the user that has been deleted</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Unlock</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>userId</strong>: the id of the user that has been unlocked</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Group</td>
    <td>Create</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>groupId</strong>: the id of the group that has been created</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Update</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>groupId</strong>: the id of the group that has been updated</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>groupId</strong>: the id of the group that has been deleted</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tenant</td>
    <td>Create</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>tenantId</strong>: the id of the tenant that has been created</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Update</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>tenantId</strong>: the id of the tenant that has been updated</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>tenantId</strong>: the id of the tenant that has been deleted</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Group membership</td>
    <td>Create</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>userId</strong>: the id of the user that has been added to the group</li>
		<li><strong>groupId</strong>: the id of the group that the user has been added to</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>userId</strong>: the id of the user that has been deleted from the group</li>
		<li><strong>groupId</strong>: the id of the group that the user has been deleted from</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>TenantMembership</td>
    <td>Create</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>tenantId</strong>: the id of the tenant that the group or user was associated with</li>
		<li><strong>userId</strong>: the id of the user that has been associated with the tenant. Is not present if the <code>groupId</code> is set</li>
		<li><strong>groupId</strong>: the id of the group that has been associated with the tenant. Is not present if the <code>userId</code> is set</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>tenantId</strong>: the id of the tenant that the group or user has been deleted from</li>
		<li><strong>userId</strong>: the id of the user that has been deleted from the tenant. Is not present if the <code>groupId</code> is set</li>
		<li><strong>groupId</strong>: the id of the group that has been deleted from the tenant. Is not present if the <code>userId</code> is set</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Authorization</td>
    <td>Create</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>permissions</strong>: the list of permissions that has been granted or revoked</li>
		<li><strong>permissionBits</strong>: the permissions bit mask that is persisted with the authorization</li>
		<li><strong>type</strong>: the type of authorization, can be either 0 (GLOBAL), 1 (GRANT) or 2 (REVOKE)</li>
		<li><strong>resource</strong>: the name of the resource type</li>
		<li><strong>resourceId</strong>: The id of the resource. Can be <code>'*'</code> if granted or revoked for all instances of the resource type.</li>
		<li><strong>userId</strong>: The id of the user the authorization is bound to. Can be <code>'*'</code> if granted or revoked for all users. Is not present when <code>groupId</code> is set.</li>
		<li><strong>groupId</strong>: The id of the group the authorization is bound to. Is not present when <code>userId</code> is set.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Update</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>permissions</strong>: the list of permissions that has been granted or revoked</li>
		<li><strong>permissionBits</strong>: the permissions bit mask that is persisted with the authorization</li>
		<li><strong>type</strong>: the type of authorization, can be either 0 (GLOBAL), 1 (GRANT) or 2 (REVOKE)</li>
		<li><strong>resource</strong>: the name of the resource type</li>
		<li><strong>resourceId</strong>: The id of the resource. Can be <code>'*'</code> if granted or revoked for all instances of the resource type.</li>
		<li><strong>userId</strong>: The id of the user the authorization is bound to. Can be <code>'*'</code> if granted or revoked for all users. Is not present when <code>groupId</code> is set.</li>
		<li><strong>groupId</strong>: The id of the group the authorization is bound to. Is not present when <code>userId</code> is set.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>permissions</strong>: the list of permissions that has been granted or revoked</li>
		<li><strong>permissionBits</strong>: the permissions bit mask that is persisted with the authorization</li>
		<li><strong>type</strong>: the type of authorization, can be either 0 (GLOBAL), 1 (GRANT) or 2 (REVOKE)</li>
		<li><strong>resource</strong>: the name of the resource type</li>
		<li><strong>resourceId</strong>: The id of the resource. Can be <code>'*'</code> if granted or revoked for all instances of the resource type.</li>
		<li><strong>userId</strong>: The id of the user the authorization is bound to. Can be <code>'*'</code> if granted or revoked for all users. Is not present when <code>groupId</code> is set.</li>
		<li><strong>groupId</strong>: The id of the group the authorization is bound to. Is not present when <code>userId</code> is set.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Property</td>
    <td>Create</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>name</strong>: the name of the property that was created</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Update</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>name</strong>: the name of the property that was updated</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
	<td>Admin</td>
    <td>
      <ul>
        <li><strong>name</strong>: the name of the property that was deleted</li>
      </ul>
    </td>
  </tr>
</table>


# Provide a Custom History Backend

In order to understand how to provide a custom history backend, it is useful to first look at a more detailed view of the history architecture:

{{< img src="../img/process-engine-history-architecture.png" title="History Architecture" >}}

Whenever the state of a runtime entity is changed, the core execution component of the process engine fires History Events. In order to make this flexible, the actual creation of the History Events as well as populating the history events with data from the runtime structures is delegated to the History Event Producer. The producer is handed in the runtime data structures (such as an ExecutionEntity or a TaskEntity), creates a new History Event and populates it with data extracted from the runtime structures.

The event is next delivered to the History Event Handler which constitutes the *History Backend*. The drawing above contains a logical component named *event transport*. This is supposed to represent the channel between the process engine core component producing the events and the History Event Handler. In the default implementation, events are delivered to the History Event Handler synchronously and inside the same JVM. It is however conceptually possible to send the event stream to a different JVM (maybe running on a different machine) and making delivery asynchronous. A good fit might be a transactional message Queue (JMS).

Once the event has reached the History Event Handler, it can be processed and stored in some kind of datastore. The default implementation writes events to the History Database so that they can be queried using the History Service.

Exchanging the History Event Handler with a custom implementation allows users to plug in a custom History Backend. To do so, two main steps are required:

* Provide a custom implementation of the {{< javadocref page="?org/camunda/bpm/engine/impl/history/handler/HistoryEventHandler.html" text="HistoryEventHandler" >}} interface.
* Wire the custom implementation in the process engine configuration.

{{< note title="Composite History Handling" class="info" >}}
  Note that if you provide a custom implementation of the HistoryEventHandler and wire it to the process engine, you override the default DbHistoryEventHandler. The consequence is that the process engine will stop writing to the history database and you will not be able to use the history service for querying the audit log. If you do not want to replace the default behavior but only provide an additional event handler, you can use the class `org.camunda.bpm.engine.impl.history.handler.CompositeHistoryEventHandler` that dispatches events to a collection of handlers.
{{< /note >}}
{{< note title="Spring Boot" class="info" >}}

Note that providing your custom `HistoryEventHandler` in a Spring Boot Starter environment works slightly differently. By default, the Camunda Spring Boot starter uses a `CompositeHistoryEventHandler` which wraps a list of HistoryEventHandler implementations that you can provide via the `customHistoryEventHandlers` engine configuration property. If you want to override the default `DbHistoryEventHandler`, you have to explicitly set the `enableDefaultDbHistoryEventHandler` engine configuration property to `false`.
{{< /note >}}


# Implement a Custom History Level

To provide a custom history level the interface `org.camunda.bpm.engine.impl.history.HistoryLevel` has to be implemented. The custom history level implementation
then has to be added to the process engine configuration, either by configuration or a process engine plugin.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

  <bean id="processEngineConfiguration" class="org.camunda.bpm.engine.impl.cfg.StandaloneInMemProcessEngineConfiguration" >

    <property name="customHistoryLevels">
      <list>
        <bean class="org.camunda.bpm.example.CustomHistoryLevel" />
      </list>
    </property>

  </bean>

</beans>
```

The custom history level has to provide a unique id and name for the new history level.

```java
public int getId() {
  return 42;
}

public String getName() {
  return "custom-history";
}
```

If the history level is enabled, the method

```java
boolean isHistoryEventProduced(HistoryEventType eventType, Object entity)
```

is called for every history event to determine if the event should be saved to the history. The event types used in the
engine can be found in `org.camunda.bpm.engine.impl.history.event.HistoryEventTypes` (see [Javadocs][1]).

The second argument is the entity for which the event is triggered, e.g., a process instance, activity
instance or variable instance. If the `entity` is null the engine tests if the history level in general
handles such history events. If the method returns `false`, the engine will not generate
any history events of this type again. This means that if your history level only wants to generate the history
event for some instances of an event it must still return `true` if `entity` is `null`.

Please have a look at this [complete example][2] to get a better overview.

## Removal Time Inheritance
Historic instances inherit the [removal time]({{< relref "#removal-time" >}}) from the respective historic top-level
instance. If the custom history level is configured in a way, so that the historic top-level instance is not written,
the removal time is not available.

The following historic instances are considered as top-level instances:

* Batch instance
* Root process instance
* Root decision instance

## User Operation Logs and Custom History Level

The following implementation is required in order to enable User Operation Logs:

```java
public boolean isHistoryEventProduced(HistoryEventType eventType, Object entity) {
  if (eventType.equals(HistoryEventTypes.USER_OPERATION_LOG)){
    return true;
  }
  ...
}
```

# History Cleanup

When used intensively, the process engine can produce a huge amount of historic data. *History Cleanup* is a feature that removes this data based on configurable time-to-live settings.

It deletes:

* Historic process instances plus all related historic data (e.g., historic variable instances, historic task instances, historic instance permissions, all comments and attachments related to them, etc.)
* Historic decision instances plus all related historic data (i.e., historic decision input and output instances)
* Historic case instances plus all related historic data (e.g., historic variable instances, historic task instances, etc.)
* Historic batches plus all related historic data (historic incidents and job logs)

History cleanup can be triggered manually or scheduled on a regular basis. Only [camunda-admins]({{< ref "/user-guide/process-engine/authorization-service.md#the-camunda-admin-group">}}) have permissions to execute history cleanup manually.

## History Cleanup by Example

Assume we have a billing process for which we must keep the history trail for ten years for legal compliance reasons. Then we have a holiday application process for which history data is only relevant for a short time. In order to reduce the amount of data we have to store, we want to quickly remove holiday-related data.

With history cleanup, we can assign the billing process a history time to live of ten years and the holiday process a history time to live of seven days. History cleanup then makes sure that history data is removed when the time to live has expired. This way, we can selectively keep history data based on its importance for our business. At the same time, we only keep what is necessary in the database.

Note: The exact time at which data is removed depends on a couple of configuration settings, for example the selected *history cleanup strategy*. The underlying concepts and settings are explained in the following sections.

## Basic Concepts

### Cleanable Instances

The following elements of Camunda history are cleanable:

* Process Instances
* Decision Instances
* Case Instances
* Batches

Note that cleaning one such instance always removes all dependent history data along with it. For example, cleaning a process instance removes the historic process instance as well as all historic activity instances, historic task instances, etc.

### History Time To Live (TTL)

*History Time To Live* (TTL) defines how long historic data shall remain in the database before it is cleaned up.

* Process, Case and Decision Instances: TTL can be defined in the XML file of the corresponding definition. This value can furthermore be changed after deployment via Java and REST API.
* Batches: TTL can be defined in the process engine configuration.

See the [TTL configuration section](#history-time-to-live) for how to set TTL.

### Instance End Time

*End Time* is the time when an instance is no longer active.

* Process Instances: The time when the instance finishes.
* Decision Instances: The time when the decision is evaluated.
* Case Instances: The time when the instance completes.
* Batches: The time when the batch completes.

The end time is persisted in the corresponding instance tables `ACT_HI_PROCINST`, `ACT_HI_CASEINST`, `ACT_HI_DECINST` and `ACT_HI_BATCH`.

### Instance Removal Time

*Removal Time* is the time after which an instance shall be removed. It is computed as `removal time = base time + TTL`. *Base time* is configurable and can be either the start or the end time of an instance. In particular, this means:

* Process Instances: Base time is either the time when the process instance starts or the time at which it finishes. This is configurable.
* Decision Instances: Base time is the time when the decision is evaluated.
* Case Instances: The removal time concept is not implemented for case instances.
* Batches: Base time is either the time when the batch is created or when the batch is completed. This is configurable.

For process and decision instances in a hierarchy (e.g. a process instance that is started by another process instance via a BPMN Call Activity), the removal time of all instances is always equal to the removal time of the root instance.

{{< img src="../img/history-cleanup-process-hierarchy.png" title="History Cleanup" >}}

The removal time is persisted in *all* history tables. So in case of a process instance, the removal time is present in `ACT_HI_PROCINST` as well as the corresponding secondary entries in `ACT_HI_ACTINST`, `ACT_HI_TASKINST` etc.

See the [Removal Time Strategy configuration section](#removal-time-strategy) for how to configure if the removal time is based on the start or end time of an instance.

## Cleanup Strategies

In order to use history cleanup, you must decide for one of the two avialable history cleanup strategies: *Removal-Time-based* or *End-Time-based* strategy. The *Removal-Time-based* strategy is the default strategy and recommended in most scenarios. The following sections describe the strategies and their differences in detail. See the [Cleanup Strategy configuration section](#cleanup-strategy) for how to configure each of the strategies.

### Removal-Time-based Strategy

The *removal-time-based cleanup strategy* deletes data for which the removal time has expired.

Strengths:

* Since every history table has a removal time attribute, history cleanup can be done with simple `DELETE FROM <TABLE> WHERE REMOVAL_TIME_ < <now>` SQL statements. This is much more efficient than end-time-based cleanup.
* Since removal time is consistent for all instances in a hierarchy, a hierarchy is always cleaned up entirely once the removal time has expired. It cannot happen that instances are removed at different times.

Limitations:

* Can only remove data for which a removal time is set. This is especially not the case for data which has been created with Camunda versions < 7.10.0.
* Changing the TTL of a definition only applies to history data that is created in the future. It does not dynamically update the removal time of already written history data. However, it is possible to [Set a Removal Time via Batch Operations]({{< ref "/user-guide/process-engine/batch-operations.md#set-a-removal-time">}}).
* History data of case instances is not cleaned up.

### End-Time-based Strategy

The *end-time-based cleanup strategy* deletes data whose end time plus TTL has expired. In contrast to the removal-time strategy, this is computed whenever history cleanup is performed.

Strengths:

* Changing the TTL of a definition also affects already written history data.
* Can remove data from any Camunda version.

Limitations:

* End time is only stored in the instances tables (`ACT_HI_PROCINST`, `ACT_HI_CASEINST`, `ACT_HI_DECINST` and `ACT_HI_BATCH`). To delete data from all history tables, the cleanable instances are first fetched via a `SELECT` statement. Based on that, `DELETE` statements are made for each history table. These statements can involve joins. This is less efficient than removal-time-based history cleanup.
* Instance hierarchies are not cleaned up atomically. Since the individual instances have different end times, they are going to be cleaned up at different times. In consequence, hierarchies can appear partially removed.
* [Historic Instance Permissions] are not cleaned up.
* [History Cleanup Jobs]({{< ref "/user-guide/process-engine/history.md#historycleanupjobs-in-the-historic-job-log">}}) are not removed from the historic job log.

## Cleanup Internals

History cleanup is implemented via jobs and performed by the [job executor]({{< ref "/user-guide/process-engine/the-job-executor.md">}}). It therefore competes for execution resources with other jobs, e.g. triggering of BPMN timer events.

Cleanup execution can be controlled in three ways:

* Cleanup Window: Determines a time frame in which history cleanup runs. This allows to use the job executor's resources only when there is little load on your system (e.g. at night time or weekends). Default value: No cleanup window is defined. That means that history cleanup is not performed automatically.
* Batch Size: Determines how many instances are cleaned up in one cleanup transaction. Default: 500.
* Degree of Parallelism: Determines how many cleanup jobs can run in parallel. Default: 1 (no parallel execution).

See the [Cleanup configuration section](#history-cleanup-configuration) for how to set each of these values.

If there is no cleanable data left, the cleanup job performs exponential backoff between runs to reduce system load. This backoff is limited to a maximum of one hour. Backoff does not apply to manual cleanup runs.

If cleanup fails, the job executor's [retry mechanism]({{< ref "/user-guide/process-engine/the-job-executor.md#failed-jobs">}}) applies. Once the cleanup job has run out of retries, it is not executed again until one of the following actions is performed:

* History cleanup is triggered manually
* The process engine is restarted (this resets the number of job retries to the default value)
* The number of job retries is increased manually (e.g. via Java or REST API)

The history cleanup jobs can be found via the API method `HistoryService#findHistoryCleanupJobs`.

## History Cleanup Configuration

### History Time To Live

#### Process/Decision/Case Definitions

Process instances are only cleaned up if their corresponding definition has a valid time to live (TTL).
Use the ["historyTimeToLive" extension attribute]({{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#historytimetolive">}}) of the process definition to define the TTL for all its instances:

```xml
<process id="oneTaskProcess" name="The One Task Process" isExecutable="true" camunda:historyTimeToLive="5">
...
</process>
```

TTL can also be defined in ISO-8601 date format. The function only accepts the notation to define the number of days.

```xml
<process id="oneTaskProcess" name="The One Task Process" isExecutable="true" camunda:historyTimeToLive="P5D">
...
</process>
```

Once deployed, TTL can be updated via Java API:

```java
  processEngine.getRepositoryService().updateProcessDefinitionHistoryTimeToLive(processDefinitionId, 5);
```

Setting the value to `null` clears the TTL. The same can be done via [REST API]({{< ref "/reference/rest/process-definition/put-history-time-to-live.md">}}).

For decision and case definitions, TTL can be defined in a similar way.

In case you want to provide an engine-wide default TTL for all process, decision and case definitions,
use the ["historyTimeToLive" attribute]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#historytimetolive">}})
of the process engine configuration. This value is applied as the default whenever new definitions without TTL are deployed. Note that it therefore does not change the TTL of already deployed definitions. Use the API method given above to change TTL in this case.

#### Batches

TTL for batches can be defined via attribute of the process engine configuration.

```xml
<!-- default setting for all batch operations -->
<property name="batchOperationHistoryTimeToLive">P5D</property>
```

The `batchOperationsForHistoryCleanup` property can be configured in Spring based application or via custom [Process Engine Plugins]({{< ref "/user-guide/process-engine/process-engine-plugins.md">}}). It defines history time to live for each specific historic batch operation.

```xml
<!-- specific TTL for each operation type -->
<property name="batchOperationsForHistoryCleanup">
  <map>
    <entry key="instance-migration" value="P10D" />
    <entry key="instance-modification" value="P7D" />
    <entry key="instance-restart" value="P1D" />
    <entry key="instance-deletion" value="P1D" />
    <entry key="instance-update-suspension-state" value="P20D" />
    <entry key="historic-instance-deletion" value="P4D" />
    <entry key="set-job-retries" value="P5D" />
    <entry key="set-external-task-retries" value="P5D" />
    <entry key="process-set-removal-time" value="P0D" />
    <entry key="decision-set-removal-time" value="P0D" />
    <entry key="batch-set-removal-time" value="P0D" />
    <entry key="set-variables" value="P1D" />
    <!-- in case of custom batch jobs -->
    <entry key="custom-operation" value="P3D" />
  </map>
</property>
```

If the specific TTL is not set for a batch operation type, then the option `batchOperationHistoryTimeToLive` applies.

#### Job Logs

A history cleanup is always performed by executing a history cleanup job. As with all other jobs, the history cleanup job 
will produce events that are logged in the historic job log. By default, those entries will stay in the log indefinitely 
and cleanup must be configured explicitly. Please note that this only works for the [removal-time based history cleanup strategy]({{< ref "/user-guide/process-engine/history.md#removal-time-strategy">}}).

The `historyCleanupJobLogTimeToLive` property can be used to define a TTL for historic job log entries produced by 
history cleanup jobs. The property accepts values in the ISO-8601 date format. Note that only the notation to define a number of days is allowed.

```xml
<property name="historyCleanupJobLogTimeToLive">P5D</property>
```

#### Task Metrics

The process engine reports [runtime metrics]({{< ref "/user-guide/process-engine/metrics.md">}}) to the database that can help draw conclusions about usage, load, and performance of the BPM platform.
With every assignment of a user task, the related task worker is stored as a pseudonymized, fixed-length value in the `ACT_RU_TASK_METER_LOG` table together with a timestamp. Cleanup for this data needs to
be configured explicitly if needed.

The `taskMetricsTimeToLive` property can be used to define a TTL for task metrics entries produced by user task assignments. 
The property accepts values in the ISO-8601 date format. Note that only the notation to define a number of days is allowed.

```xml
<property name="taskMetricsTimeToLive">P540D</property>
```

{{< note title="Heads Up!" class="warning" >}}
If you are an enterprise customer, your license agreement might require you to report some metrics annually. Please store task metrics from `ACT_RU_TASK_METER_LOG` for at least 18 months until they were reported.
{{< /note >}}

### Cleanup Window

For automated history cleanup on a regular basis, a batch window must be configured - the period of time during the day when the cleanup is to run.

Use the following engine configuration properties to define a batch window for every day of the week:

```xml
<property name="historyCleanupBatchWindowStartTime">20:00</property>
<property name="historyCleanupBatchWindowEndTime">06:00</property>
```

Cleanup can also be scheduled individually for each day of the week (e.g. run cleanup only on weekends):

```xml
<!-- default for all weekdays -->
<property name="historyCleanupBatchWindowStartTime">20:00</property>
<property name="historyCleanupBatchWindowEndTime">06:00</property>

<!-- overriding batch window for saturday and sunday -->
<property name="saturdayHistoryCleanupBatchWindowStartTime">06:00</property>
<property name="saturdayHistoryCleanupBatchWindowEndTime">06:00</property>
<property name="sundayHistoryCleanupBatchWindowStartTime">06:00</property>
<property name="sundayHistoryCleanupBatchWindowEndTime">06:00</property>
```

By default, no cleanup window is configured. In that case, history cleanup is not performed automatically.

See the [engine configuration reference][configuration-options] for a complete list of all parameters.

### Cleanup Strategy

Removal-time-based or end-time-based cleanup can be selected as follows:

```xml
<property name="historyCleanupStrategy">removalTimeBased</property>
```

Valid values are `removalTimeBased` and `endTimeBased`. `removalTimeBased` is the default.

### Removal-Time Strategy

Removal time is defined per instance as `removal time = base time + TTL`. `base time` can be either the start or end time of the instance in case of process instances. This can be configured in the process engine configuration as follows:

```xml
<property name="historyRemovalTimeStrategy">end</property>
```

Valid values are `start`, `end` and `none`. `end` is the default value and the recommended option. `start` is a bit more efficient when the process engine populates the history tables, because it does not have to make extra `UPDATE` statements when an instance finishes.

{{< note title="Heads-up!" class="info" >}}
The calculation of the removal time can be enabled independently of the selected cleanup strategy of the process engine.
This allows to perform a custom cleanup procedure outside the process engine by leveraging database capabilities (e.g. via table partitioning by removal time).
{{< /note >}}

### Parallel Execution

The degree of parallel execution for history cleanup can be defined in the engine configuration as follows:

```xml
<property name="historyCleanupDegreeOfParallelism">4</property>
```

Valid values are integers from 1 to 8. 1 is the default value.

This property specifies the number of jobs used for history cleanup. In consequence, this value determines how many job executor threads and database connections may be busy with history cleanup at once. Choosing a high value can make cleanup faster, but may steal resources from other tasks the engine and database have to perform.

### Cleanup Batch Size

The number of instances that are removed in one cleanup transaction can be set as follows:

```xml
<property name="historyCleanupBatchSize">100</property>
```

The default (and maximum) value is 500. Reduce it if you notice transaction timeouts during history cleanup.

### Clustered Cleanup

In a multi-engine setup, you can configure whether a specific engine should participate in history cleanup or not.
Please make sure that the same cleanup execution configuration (window, batch size, degree of parallelism) is present 
on all participating nodes.

#### Cleanup Execution Participation per Node

Sometimes it is necessary to exclude some nodes in a multi-engine setup from performing history cleanup execution, 
e. g. to reduce the load on some nodes.

You can disable the history cleanup execution for each node with the following flag:
```xml
<property name="historyCleanupEnabled">false</property>
```

When you exclude a node from executing history cleanup, you don't need to specify the configuration properties 
related to the cleanup execution since the particular node ignores them. 

**Please Note:** The history cleanup configuration properties that are unrelated to the cleanup execution (e.g., 
time to live, removal time strategy) still need to be defined among all nodes. 

[configuration-options]: {{< ref "/reference/deployment-descriptors/tags/process-engine.md#history-cleanup-configuration-parameters">}}
[1]: http://docs.camunda.org/latest/api-references/javadoc/org/camunda/bpm/engine/impl/history/event/HistoryEventTypes.html
[2]: https://github.com/camunda/camunda-bpm-examples/tree/master/process-engine-plugin/custom-history-level
[op-log-set-annotation-rest]: {{< ref "/reference/rest/history/user-operation-log/set-annotation.md" >}}
[op-log-clear-annotation-rest]: {{< ref "/reference/rest/history/user-operation-log/clear-annotation.md" >}}
[op-log-set-annotation-instance-mod]: {{< ref "/user-guide/process-engine/process-instance-modification.md#annotation" >}}
[Historic Instance Permissions]: {{< ref "/user-guide/process-engine/authorization-service.md#historic-instance-permissions" >}}
