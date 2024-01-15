---

title: 'History configuration'
weight: 10

menu:
  main:
    identifier: "user-guide-process-engine-history-configuration"
    parent: "user-guide-process-engine-history"

---


## Choose a history level

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

If you need to customize the amount of history events logged, you can provide a custom implementation {{< javadocref page="org/camunda/bpm/engine/impl/history/producer/HistoryEventProducer.html" text="HistoryEventProducer" >}} and wire it in the process engine configuration.

In case of specific needs, you can also create a [custom history level]({{< ref "/user-guide/process-engine/history/custom-implementation.md#implement-a-custom-history-level">}}).

## Set the history level

The history level can be provided as a property in the process engine configuration. Depending on how the process engine is configured, the property can be set using Java code:

```java
ProcessEngine processEngine = ProcessEngineConfiguration
  .createProcessEngineConfigurationFromResourceDefault()
  .setHistory(ProcessEngineConfiguration.HISTORY_FULL)
  .buildProcessEngine();
```

It can also be set using Spring XML or a deployment descriptor (bpm-platform.xml, processes.xml). When using the Camunda Wildfly Subsystem, the property can be set through Wildfly configuration (standalone.xml, domain.xml).

```xml
<property name="history">audit</property>
```

Note that when using the default history backend, the history level is stored in the database and cannot be changed later.

{{< note title="History levels and Cockpit" class="info" >}}
[Camunda Cockpit]({{< ref "/webapps/cockpit/_index.md" >}}) web application works best with History Level set to `FULL`. "Lower" History Levels will disable certain history-related features.
{{< /note >}}



## Default history implementation

The default history database writes History Events to the appropriate database tables. The database tables can then be queried using the `HistoryService` or using the REST API.


## History entities

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


### State of HistoricProcessInstances

For every process instance process engine will create single record in history database and will keep updating this record during process execution. Every HistoricProcessInstance record can get one of the following states assigned:

*  ACTIVE - running process instance
*  SUSPENDED - suspended process instances
*  COMPLETED - completed through normal end event
*  EXTERNALLY_TERMINATED - terminated externally, for instance through REST API
*  INTERNALLY_TERMINATED - terminated internally, for instance by terminating boundary event

Among them following states can be triggered externally, for example through REST API or Cockpit: ACTIVE, SUSPENDED, EXTERNALLY_TERMINATED.

### Query history

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

### History report

You can use the reports section to retrieve custom statistics and reports. Currently, we support the following kinds of reports:

* [Instance Duration Report]({{< relref "#instance-duration-report" >}})
* [Task Report]({{< relref "#task-report" >}})
* [Finished Instance Report]({{< relref "#finished-instance-report" >}})



#### Instance duration report

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

#### Task report

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

#### Finished instance report

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

### Partially sorting history events by their occurrence

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



