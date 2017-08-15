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


# The Default History Implementation

The default history database writes History Events to the appropriate database tables. The database tables can then be queried using the `HistoryService` or using the REST API.


## History Entities

There are the following History entities, which - in contrast to the runtime data - will also remain present in the DB after process and case instances have been completed:

* `HistoricProcessInstances` containing information about current and past process instances.
* `HistoricProcessVariables` containing information about the latest state a variable held in a process instance.
* `HistoricCaseInstances` containing information about current and past case instances.
* `HistoricActivityInstances` containing information about a single execution of an activity.
* `HistoriCasecActivityInstances` containing information about a single execution of a case activity.
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
`createHistoricProcessVariableQuery()`, `createHistoricCaseInstanceQuery()`,
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

**HistoricProcessVariableQuery**

Get all HistoricProcessVariables from a finished process instance with id 'XXX', ordered by variable name.

```java
historyService.createHistoricProcessVariableQuery()
  .processInstanceId("XXX")
  .orderByVariableName.desc()
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

where `startedBefore` and `startedAfter` use `java.util.Date` (depricated) or `java.util.Calendar` objects for the input. 

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

The user operation log can be accessed via the Java API. The history service can be used to execute a `UserOperationLogQuery` by calling `historyService.createUserOperationLogQuery().execute()`. The query can be restricted with various filtering options. The query is also [exposed in the REST API]({{< relref "reference/rest/history/user-operation-log/get-user-operation-log-query.md" >}}).


## User Operation Log Entries

The log consists of *operations* and *entries*. An operation corresponds to one performed action and consists of multiple entries, at least one. Entries contain the detailed changes being part of the operation. When making a user operation log query, the returned entities are of type `UserOperationLogEntry`, corresponding to entries. All entries of one operation are linked by an operation id.

A user operation log entry has the following properties:

* **Operation ID**: A generated id that uniquely identifies a performed operation. Multiple log entries that are part of one operation reference the same operation ID.
* **Operation Type**: The name of the performed operation. Available operation types are listed in the interface {{< javadocref page="?org/camunda/bpm/engine/history/UserOperationLogEntry.html" text="org.camunda.bpm.engine.history.UserOperationLogEntry" >}}. Note that one operation can consist of multiple types, for example a cascading API operation is one user operation, but is split into multiple types of operations.
* **Entity Type**: An identifier of the type of the entity that was addressed by the operation. Available entity types are listed in the class {{< javadocref page="?org/camunda/bpm/engine/EntityTypes.html" text="org.camunda.bpm.engine.EntityTypes" >}}. Like the operation type, one operation may address more than one type of entity.
* **Entity IDs**: A job log entry contains the entity IDs that serve to identify the entities addressed by the operation. For example, an operation log entry on a task contains the id of the task as well as the id of the process instance the task belongs to. As a second example, a log entry for suspending all process instances of a process definition does not contain individual process instance IDs but only the process definition ID.
* **User ID**: The ID of the user who performed the operation.
* **Timestamp**: The time at which the operation was performed.
* **Changed Property**: A user operation may change multiple properties. For example, suspension of a process instance changes the suspension state property. A log entry is created for each changed property involved in an operation.
* **Old Property Value**: The previous value of the changed property. A  `null` value either indicates that the property was previously `null` or is not known.
* **New Property Value**: The new value of the changed property.


## Glossary of Operations Logged in the User Operation Log

The following describes the operations logged in the user operation log and the entries that are created as part of it:

<table class="table table-striped">
  <tr>
    <th>Entity Type</th>
    <th>Operation Type</th>
    <th>Properties</th>
  </tr>
  <tr>
  <td>Task</td>
    <td>Assign</td>
    <td>
      <ul>
        <li><strong>assignee</strong>: The id of the user who was assigned to the task</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Claim</td>
    <td>
      <ul>
        <li><strong>assignee</strong>: The id of the user who claimed the task</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Complete</td>
    <td>
      <ul>
        <li><strong>delete</strong>: The new delete state, <code>true</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Create</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>Delegate</td>
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
    <td>
      <ul>
      <li><strong>delete</strong>: The new delete state, <code>true</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Resolve</td>
    <td>
      <ul>
        <li><strong>delegation</strong>: The resulting delegation state, <code>RESOLVED</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetOwner</td>
    <td>
      <ul>
        <li><strong>owner</strong>: The new owner of the task</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetPriority</td>
    <td>
      <ul>
        <li><strong>priority</strong>: The new priority of the task</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Update</td>
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
    <td>ProcessInstance</td>
    <td>Activate</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: The new suspension state, <code>active</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>ModifyProcessInstance</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>Suspend</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: The new suspension state, <code>suspended</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Migrate</td>
    <td>
      <ul>
        <li><strong>processDefinitionId</strong>: The id of the process definition that instances are migrated to</li>
        <li><strong>nrOfInstances</strong>: The amount of process instances migrated</li>
        <li><strong>async</strong>: <code>true</code> if migration was performed asynchronously as a batch, <code>false</code> if migration was performed synchronously</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IdentityLink</td>
    <td>AddUserLink</td>
    <td>
      <ul>
        <li><strong>candidate</strong>: The new candidate user associated</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>DeleteUserLink</td>
    <td>
      <ul>
        <li><strong>candidate</strong>: The previously associated user</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>AddGroupLink</td>
    <td>
      <ul>
        <li><strong>candidate</strong>: The new group associated</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>DeleteGroupLink</td>
    <td>
      <ul>
      <li><strong>candidate</strong>: The previously associated group</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Attachment</td>
    <td>AddAttachment</td>
    <td>
      <ul>
        <li><strong>name</strong>: The name of the added attachment</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>DeleteAttachment</td>
    <td>
      <ul>
        <li><strong>name</strong>: The name of the deleted attachment</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>JobDefinition</td>
    <td>ActivateJobDefinition</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>active</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetPriority</td>
    <td>
      <ul>
        <li><strong>overridingPriority</strong>: the new overriding job priority. Is <code>null</code>, if the priority was cleared.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SuspendJobDefinition</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>suspended</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>ProcessDefinition</td>
    <td>ActivateProcessDefinition</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>active</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SuspendProcessDefinition</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>suspended</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>Delete</td>
    <td>
      <ul>
        <li><strong>cascade</strong>: if the value is set to <code>true</code>, then all instances including history are also deleted.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Job</td>
    <td>ActivateJob</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>active</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetPriority</td>
    <td>
      <ul>
        <li><strong>priority</strong>: the new priority of the job</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SetJobRetries</td>
    <td>
      <ul>
        <li><strong>retries</strong>: the new number of retries</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SuspendJob</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>suspended</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Variable</td>
    <td>ModifyVariable</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>RemoveVariable</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td></td>
    <td>SetVariable</td>
    <td><i>No additional property is logged</i></td>
  </tr>
  <tr>
    <td>Deployment</td>
    <td>Create</td>
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
    <td>
      <ul>
        <li><strong>cascade</strong>: if the value is set to <code>true</code>, then all instances including history are also deleted.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Batch</td>
    <td>ActivateBatch</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>active</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>SuspendBatch</td>
    <td>
      <ul>
        <li><strong>suspensionState</strong>: the new suspension state <code>suspended</code></li>
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

# History Cleanup

When used intensively, the process engine can produce a huge amount of historic data. The history cleanup functionality helps to regularly remove "outdated" 
data from history tables. It deletes:

* Historic process instances plus all related historic data (e.g., historic variable instances, historic task instances, all comments and attachments related to them, etc.)
* Historic decision instances plus all related historic data (i.e., historic decision input and output instances)
* Historic case instances plus all related historic data (e.g., historic variable instances, historic task instances, etc.)

History cleanup can be used on a regular basis (automatically) or for a single cleanup (manual call).

## History Time to Live

You must specify "history time to live" for each process definition, decision definition and case definition which should be affected by the cleanup. 
For process and case definitions "history time to live" means the amount of days that pass, after the process/case instance has finished, before its history 
is removed from the database. For decision definitions, evaluation time is taken into account.

Use the ["historyTimeToLive" extension attribute]({{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#historytimetolive">}}) of the process definition:
```xml
<process id="oneTaskProcess" name="The One Task Process" isExecutable="true" camunda:historyTimeToLive="5">
...
</process>
```
You can also update "historyTimeToLive" for already deployed process definitions:
```java
  processEngine.getRepositoryService().updateProcessDefinitionHistoryTimeToLive(processDefinitionId, 5);
```
or via the [REST API]({{< relref "reference/rest/process-definition/put-history-time-to-live.md">}}).


The "historyTimeToLive" field can also define the number of days using a time specified by the ISO-8601 date format. 
The function only accepts the notation to define a number of days.
```xml
<process id="oneTaskProcess" name="The One Task Process" isExecutable="true" camunda:historyTimeToLive="P5D">
...
</process>
```

You can define and update "historyTimeToLive" for decision definitions and case definitions in a similar way.

### History Time to Live for Batch Operations

You must specify "history time to live" for specific batch operations or all of them depends which one should be affected by the cleanup.
"History time to live" for batch operations means the amount of days that pass, after the batch operation has finished,
before its history is removed from the database.
The configuration of the history time to live has to be added to the process engine configuration as follows:

```xml
<property name="batchOperationHistoryTimeToLive" value="P5D" />

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
    <!-- in case of custom batch jobs -->
    <entry key="custom-operation" value="P3D" />
  </map>
</property>
```
If the specific history time to live is not set of the some batch operation type,
the global configuration of the batch operations will be taken into account.

## Periodic Run

To use history cleanup on a regular basis, a batch window must be configured - the period of time during the day when the cleanup job is to run. 
See [Configuration options][configuration-options] for details.

## Manual Run

When you only want to run the cleanup a single time, then use:
```java
  processEngine.getHistoryService().cleanUpHistoryAsync(true);
```
Also available via [REST API]({{< relref "reference/rest/history/post-history-cleanup.md">}}).

## Internal Implementation

History cleanup is implemented as a job. The cleanup job runs in the background every day at the batch window time or immediately when called manually. 
It removes all historic data for process (or decision or case) instances that finished "history time to live" days ago. The data is removed in batches of 
configurable size (see [Configuration options][configuration-options]). Only top-level objects (e.g., historic process instances) are counted when finding 
a batch of data to be deleted.

In cases when a job can't find anything to delete (or not enough data to surpass the threshold), it is rescheduled for a later time, until it reaches 
the end time of the batch window. The delay between such runs increases twofold, until it reaches the maximum value (1 hour). This backoff behaviour 
only happens in case of regular scheduled runs. In case of a manual run, cleanup stops when there is no more data to be deleted.

If the job execution fails for some reason, execution is retried several times, similar to any other job (see the `defaultNumberOfRetries` configuration 
parameter [here]({{< relref "reference/deployment-descriptors/tags/process-engine.md#configuration-properties">}}) ). When still failing after 
several retries, an incident is created. After this, the job isn't triggered unless one of the following actions is performed:

* History cleanup is called manually
* Engine is restarted (this resets the number of job retries to the default value)
* Manually set the number of retries to >0 for the history cleanup job (e.g., via the [REST API]({{< relref "reference/rest/job/put-set-job-retries.md">}})) 

## Job Progress

History cleanup is performed within a single job that runs several times. This job has a unique id which can be 
found in the response of the history cleanup call. It can also be found with this request:
```java
String historyCleanupJobId = processEngine.getHistoryService()
        .findHistoryCleanupJob().getJobId();
```

The `jobId` can be used to request [job logs]({{< relref "reference/rest/history/job-log/get-job-log-query.md">}}) 
and [information about incidents]({{< relref "user-guide/process-engine/the-job-executor.md#failed-jobs">}}).

[configuration-options]: {{< relref "reference/deployment-descriptors/tags/process-engine.md#history-cleanup-configuration-parameters">}}
[1]: http://docs.camunda.org/latest/api-references/javadoc/org/camunda/bpm/engine/impl/history/event/HistoryEventTypes.html
[2]: https://github.com/camunda/camunda-bpm-examples/tree/master/process-engine-plugin/custom-history-level
