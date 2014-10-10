---

title: 'History and Audit Event Log'
category: 'Process Engine'

---


The History Event Stream provides audit information about executed process instances.

<center>
  <img class="img-responsive" src="ref:asset:/assets/img/user-guide/process-engine-history.png" />
</center>

The process engine maintains the state of running process instances inside the database. This includes *writing* (1.) the state of a process instance to the database as it reaches a wait state and *reading* (2.) the state as process execution continues. We call this database the *runtime database*. In addition to maintaining the runtime state, the process engine creates an audit log providing audit information about executed process instances. We call this event stream the *history event stream* (3.). The individual events which make up this event stream are called *History Events* and contain data about executed process instances, activity instances, changed process variables and so forth. In the default configuration, the process engine will simply write (4.) this event stream to the *history database*. The `HistoryService` API allows querying this database (5.). The history database and the history service are optional components; if the history event stream is not logged to the history database or if the user chooses to log events to a different database, the process engine is still able to work and it is still able to populate the history event stream. This is possible because the BPMN 2.0 Core Engine component does not read state from the history database. It is also possible to configure the amount of data logged, using the `historyLevel` setting in the process engine configuration.

Since the process engine does not rely on the presence of the history database for generating the history event stream, it is possible to provide different backends for storing the history event stream. The default backend is the `DbHistoryEventHandler` which logs the event stream to the history database. It is possible to exchange the backend and provide a custom storage mechanism for the history event log.

## Choosing a History Level

The history level controls the amount of data the process engine provides via the history event stream. The following settings are available out of the box:

* `NONE`: no history events are fired.
* `ACTIVITY`: the following events are fired:
    * Process Instance START, UPDATE, END: fired as process instances are being started, updated and ended
    * Case Instance CREATE, UPDATE, CLOSE: fired as case instances are being created, updated and closed
    * Activity Instance START, UPDATE, END: fired as activity instances are being started, updated and ended
    * Task Instance CREATE, UPDATE, COMPLETE, DELETE: fired as task instances are being created, updated (ie. re-assigned, delegated etc.), completed and deleted.
* `AUDIT`: in addition to the events provided by history level `ACTIVITY`, the following events are fired:
    * Variable Instance CREATE, UPDATE, DELETE, as process variables are created, updated and deleted. The default history backend (DbHistoryEventHandler) writes variable instance events to the historic variable instance database table. Rows in this table are updated as variable instances are updated, meaning that only the last value of a process variable will be available.
* `FULL`: in addition to the events provided by history level `AUDIT`, the following additional events are fired:
    * Form property UPDATE: fired as form properties are being created and/or updated.
    * The default history backend (DbHistoryEventHandler) writes historic variable updates to the database. This makes it possible to inspect the intermediate values of a process variable using the history service.
    * User Operation Log UPDATE: fired when a user performs an operation like claiming a user task, delegating a user task etc.
    * Incidents CREATE, DELETE, RESOLVE: fired as incidents are being created, deleted or resolved

If you need to customize the amount of history events logged, you can provide a custom implementation [HistoryEventProducer](ref:/api-references/javadoc/?org/camunda/bpm/engine/impl/history/producer/HistoryEventProducer.html) and wire it in the process engine configuration.

## Setting the History Level

The history level can be provided as a property in the process engine configuration. Depending on how the process engine is configured, the property can be set using Java Code

```java
ProcessEngine processEngine = ProcessEngineConfiguration
  .createProcessEngineConfigurationFromResourceDefault()
  .setHistory(ProcessEngineConfiguration.HISTORY_FULL)
  .buildProcessEngine();
```

Or it can be set using Spring Xml or a deployment descriptor (bpm-platform.xml, processes.xml). When using the camunda jBoss Subsystem, the property can be set through jBoss configuration (standalone.xml, domain.xml).

```xml
<property name="history">audit</property>
```

Note that when using the default history backend, the history level is stored in the database and cannot be changed later.

## The default History Implementation

The default history database writes History Events to the appropriate database tables. The database tables can then be queried using the `History Service` or using the REST API.

### History Entities

There are eight History entities, which - in contrast to the runtime data - will also remain present in the DB after process and case instances have been completed:

* `HistoricProcessInstances` containing information about current and past process instances.
* `HistoricProcessVariables` containing information about the latest state a variable held in a  process instance.
* `HistoricCaseInstances` containing information about current and past case instances.
* `HistoricActivityInstances` containing information about a single execution of an activity.
* `HistoricTaskInstances` containing information about current and past (completed and deleted) task instances.
* `HistoricDetails` containing various kinds of information related to either a historic process instances, an activity instance or a task instance.
* `HistoricIncidents` containing information about current and past (ie. deleted or resolved) incidents.
* `UserOperationLogEntry` log entry containing information about an operation performed by a user. This is used for logging actions such as creating a new task, completing a task, etc.


### Querying History

The HistoryService exposes the methods `createHistoricProcessInstanceQuery()`,
`createHistoricProcessVariableQuery()`, `createHistoricCaseInstanceQuery()`,
`createHistoricActivityInstanceQuery()`, `createHistoricDetailQuery()`,
`createHistoricTaskInstanceQuery()`, `createHistoricIncidentQuery()` and
`createUserOperationLogQuery()` which can be used for querying history.

Below are a few examples which show some of the possibilities of the query API for history. Full description of the possibilities can be found in the javadocs, in the `org.camunda.bpm.engine.history` package.

** HistoricProcessInstanceQuery **

Get the ten `HistoricProcessInstances` that are finished and which took the most time to complete (the longest duration) of all finished processes with definition 'XXX'.

```java
historyService.createHistoricProcessInstanceQuery()
  .finished()
  .processDefinitionId("XXX")
  .orderByProcessInstanceDuration().desc()
  .listPage(0, 10);
```

** HistoricCaseInstanceQuery **

Get the ten `HistoricCaseInstances` that are closed and which took the most time to be closed (the longest duration) of all closed cases with definition 'XXX'.

```java
historyService.createHistoricCaseInstanceQuery()
  .closed()
  .caseDefinitionId("XXX")
  .orderByCaseInstanceDuration().desc()
  .listPage(0, 10);
```


** HistoricActivityInstanceQuery **

Get the last `HistoricActivityInstance` of type 'serviceTask' that has been finished in any process that uses the processDefinition with id XXX.

``` java
historyService.createHistoricActivityInstanceQuery()
  .activityType("serviceTask")
  .processDefinitionId("XXX")
  .finished()
  .orderByHistoricActivityInstanceEndTime().desc()
  .listPage(0, 1);
```

** HistoricProcessVariableQuery **

Get all HistoricProcessVariables from a finished process instance with id 'xxx' ordered by variable name.

```java
historyService.createHistoricProcessVariableQuery()
  .processInstanceId("XXX")
  .orderByVariableName.desc()
  .list();
```

** HistoricDetailQuery **

The next example gets all variable-updates that have been done in process with id 123. Only HistoricVariableUpdates will be returned by this query. Note that it's possible for a certain variable name to have multiple HistoricVariableUpdate entries, one for each time the variable was updated in the process. You can use orderByTime (the time the variable update was done) or orderByVariableRevision (revision of runtime variable at the time of updating) to find out in what order they occurred.

```java
historyService.createHistoricDetailQuery()
  .variableUpdates()
  .processInstanceId("123")
  .orderByVariableName().asc()
  .list()
```

The last example gets all variable updates that were performed on the task with id "123". This returns all HistoricVariableUpdates for variables that were set on the task (task local variables), and NOT on the process instance.

```java
historyService.createHistoricDetailQuery()
  .variableUpdates()
  .taskId("123")
  .orderByVariableName().asc()
  .list()
```

** HistoricTaskInstanceQuery **

Get the ten HistoricTaskInstances that are finished and which took the most time to complete (the longest duration) of all tasks.

```java
historyService.createHistoricTaskInstanceQuery()
  .finished()
  .orderByHistoricTaskInstanceDuration().desc()
  .listPage(0, 10);
```

Get HistoricTaskInstances that are deleted with a delete reason that contains "invalid", which were last assigned to user 'jonny'.

```java
historyService.createHistoricTaskInstanceQuery()
  .finished()
  .taskDeleteReasonLike("%invalid%")
  .taskAssignee("jonny")
  .listPage(0, 10);
```

** HistoricIncidentQuery **

Query for all resolved incidents:

```java
historyService.createHistoricIncidentQuery()
  .resolved()
  .list();
```

** UserOperationLogQuery **

Query for all operations performed by user "jonny":

```java
historyService.createUserOperationLogQuery()
  .userId("jonny")  
  .listPage(0, 10);
```

## Providing a custom History Backend

In order to understand how to provide a custom history backend, it is useful to first look at a more detailed view of the history architecture:

<center>
  <img class="img-responsive" src="ref:asset:/assets/img/user-guide/process-engine-history-architecture.png" />
</center>

Whenever the state of a runtime entity is changed, the core execution component of the process engine fires History Events. In order to make this flexible, the actual creation of the History Events as well as populating the history events with data from the runtime structures is delegated to the History Event Producer. The producer is handed in the runtime data structures (such as an ExecutionEntity or a TaskEntity), creates a new History Event and populates it with data extracted from the runtime structures.

The event is next delivered to the History Event Handler which constitutes the *History Backend*. The drawing above contains a logical component named *event transport*. This is supposed to represent the channel between the process engine core component producing the events and the History Event Handler. In the default implementation, events are delivered to the History Event Handler synchronously and inside the same JVM. It is however conceptually possible to send the event stream to a different JVM (maybe running on a different machine) and making delivery asynchronous. A good fit might be a transactional message Queue (JMS).

Once the event has reached the History Event Handler, it can be processed and stored in some kind of datastore. The default implementation writes events to the History Database so that they can be queried using the History Service.

Exchanging the History Event Handler with a custom implementation allows users to plug in a custom History Backend. In order to do so, two main steps are required:

* Provide a custom implementation of the [HistoryEventHandler](ref:/api-references/javadoc/?org/camunda/bpm/engine/impl/history/handler/HistoryEventHandler.html) interface.
* Wire the custom implementation in the process engine configuration.

Note that if you provide a custom implementation of the HistoryEventHandler and wire it with the process engine, you override the default DbHistoryEventHandler. The consequence is that the process engine will stop writing to the history database and you will not be able to use the history service for querying the audit log. If you do not want to replace the default behavior but only provide an additional event handler, you need to write a composite History Event Handler which dispatches events a collection of handlers.
