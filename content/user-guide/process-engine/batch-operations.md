---

title: 'Batch operations'
weight: 280

menu:
  main:
    identifier: "user-guide-process-engine-batch-operations"
    parent: "user-guide-process-engine-batch"

---

The following operations can be executed asynchronously

- [Process Instance Migration]({{< ref "/user-guide/process-engine/process-instance-migration.md#asynchronous-batch-migration-execution" >}})
- [Cancellation of running Process Instances](#cancellation-of-running-process-instances)
- [Deletion of Historic Process Instances](#deletion-of-historic-process-instances)
- [Update suspend state of process instances](#update-suspend-state-of-process-instances)
- [Setting retries and due dates of jobs using the builder pattern](#setting-retries-and-due-dates-of-jobs-using-the-builder-pattern)
- [Setting retries of jobs associated with Process Instances](#setting-retries-of-jobs-associated-with-process-instances)
- [Process Instance Modification]({{< ref "/user-guide/process-engine/process-instance-modification.md#modification-of-multiple-process-instances" >}})
- [Process Instance Restart]({{< ref "/user-guide/process-engine/process-instance-restart.md#asynchronous-batch-execution" >}})
- [Setting retries of external tasks](#setting-retries-of-external-tasks)
- [Set Variables to Process Instances](#set-variables-to-process-instances)
- [Correlate Messages to Process Instances](#correlate-messages-to-process-instances)
- [Set a Removal Time to Historic Process Instances](#historic-process-instances)
- [Set a Removal Time to Historic Decision Instances](#historic-decision-instances)
- [Set a Removal Time to Historic Batches](#historic-batches)

All batch operations rely on corresponding methods that provide the possibility to
operate on a list of entities synchronously. Please refer to the general [Batch]({{< ref "/user-guide/process-engine/batch.md" >}}) documentation to
understand the creation process better.

Asynchronous operations can be performed based on a list of specific instances as well as on the result of a query providing a
resulting list of instances. If both a list of instances and a query are provided, the resulting set of affected instances
will consist of the union of those two subsets.

All listed batch operations, except [Set a Removal Time to Historic Batches](#historic-batches), are deployment-aware.
In particular, this means that the seed job and execution jobs will receive a `deploymentId` so 
[deployment-aware job executors]({{< ref "/user-guide/process-engine/the-job-executor.md#job-execution-in-heterogeneous-clusters" >}}) 
can pick up those jobs of a batch that need to be executed on their nodes. 
The deployment id of the seed job is chosen from the list of involved deployments. 
This list is derived from the resulting set of affected instances. 
Execution jobs only contain elements of the same deployment and are bound to that deployment's id.

## Cancellation Of Running Process Instances

Cancellation of running process instances can be performed asynchronously using the following Java API method invocation:

```java
List<String> processInstanceIds = ...;
runtimeService.deleteProcessInstancesAsync(processInstanceIds,null, REASON);
```

There are overloaded methods of the above which allow you to control the following parameters:

- `skipCustomListeners`: Skip execution listener invocation for activities that are started or ended as part of this request.
- `skipSubprocesses`: Skip deletion of the subprocesses related to deleted processes as part of this request.
- `skipIoMappings`: Skip the IO Mappings if the process instance contains any which would prevent the deletion otherwise.


## Deletion Of Historic Process Instances

Deletion of historic process instances can be performed asynchronously using the following Java API method invocation:

```java
List<String> historicProcessInstanceIds = ...;
historyService.deleteHistoricProcessInstancesAsync(
        historicProcessInstanceIds, TEST_REASON);
```

## Update Suspend State Of Process Instances

Update the suspension state of multiple process instances asynchronously using the following Java API method invocation:

```java
List<String> processInstanceIds = ...;
runtimeService.updateProcessInstanceSuspensionState().byProcessInstanceIds(
  processInstanceIds).suspendAsync();
```

## Setting retries and due dates of jobs using the builder pattern

Setting retries of jobs can be performed asynchronously using a builder. There are two general ways to reference jobs: by job ids/job queries or by process.
Here are demonstrations of how to use both APIs:

```java
managementService.setJobRetriesByJobsAsync(retries)
  .jobIds(myJobIdList)
  .jobQuery(myJobQuery)
  .dueDate(myDueDate)
  .executeAsync();
```

```java
managementService.setJobRetriesByProcessAsync(retries)
  .processInstanceIds(myProcessInstanceIdsList)
  .processInstanceQuery(myProcessInstanceQuery)
  .historicProcessInstanceQuery(myHistoricProcessInstanceQuery)
  .dueDate(myDueDate)
  .executeAsync();
```

## Setting Retries Of Jobs Associated With Process Instances

Setting retries of jobs associated with process instances can be performed asynchronously using the following Java API method invocation:

```java
List<String> processInstanceIds = ...;
int retries = ...;
managementService.setJobRetriesAsync(
        processInstanceIds, null, retries);
```

## Setting Retries Of External Tasks

Setting retries of external tasks can be performed asynchronously using the following Java API method invocation:

```java
List<String> externalTaskIds = ...;
externalTaskService.setRetriesAsync(
        externalTaskIds, TEST_REASON);
```

## Set Variables to Process Instances

Sometimes it is necessary to add or update data of an already running process instance. 
For example, when a user entered incorrect data at the beginning of a process, 
the data needs to be corrected on-the-fly. 

This batch operation helps you to set variables to the root scope of process instances asynchronously.

You can either (1) filter for process instances using a `HistoricProcessInstanceQuery` or a `ProcessInstanceQuery`
or (2) pass a set of process instance ids directly.

Please see below how to call the Java API:

```java
List<String> processInstanceIds = ...;
Map<String, Object> variables = Variables.putValue("my-variable", "my-value");
runtimeService.setVariablesAsync(processInstanceIds, variables);
```

{{< note title="Known limitations" class="info" >}}
Currently, it is not possible to set transient variables via batch operation. However,
you can [set transient variables]({{< ref "/user-guide/process-engine/variables.md#transient-variables" >}}) synchronously.

The execution jobs of this batch can be scheduled by the job executor as [exclusive jobs]({{< ref "/user-guide/process-engine/the-job-executor.md#exclusive-jobs" >}}).
As a result, the execution of some of this batch's jobs may be delayed by other exclusive jobs that are related to the same process instance that the variables should be set to.
However, exclusive scheduling only happens when the jobs of this batch relate to exactly one process instance. 
This can be controlled by configuring the [invocationsPerBatchJob]({{< ref "/user-guide/process-engine/batch.md#configuration" >}}) property.
{{< /note >}}

## Correlate Messages to Process Instances

This batch operation helps you to correlate messages to multiple process instances asynchronously.
Furthermore, you can set variables to the root scope of those process instances as well.

You can either (1) filter for process instances using a `HistoricProcessInstanceQuery` or a `ProcessInstanceQuery`
or (2) pass a set of process instance ids directly.

Please see below how to call the Java API:

```java
List<String> processInstanceIds = ...;
Map<String, Object> variables = Variables.putValue("my-variable", "my-value");

Batch batch = runtimeService.createMessageCorrelationAsync("myMessage")
  .setVariables(variables)
  .processInstanceIds(processInstanceIds)
  .correlateAllAsync();
```

{{< note title="Known limitations" class="info" >}}
It is not possible to correlate to process definition-level start message events via this batch operation. However,
you can [correlate to start messages]({{< ref "/reference/bpmn20/events/message-events.md#explicitly-triggering-a-message" >}}) synchronously.

The execution jobs of this batch can be scheduled by the job executor as [exclusive jobs]({{< ref "/user-guide/process-engine/the-job-executor.md#exclusive-jobs" >}}).
As a result, the execution of some of this batch's jobs may be delayed by other exclusive jobs that are related to the same process instance that the message should be correlated to.
However, exclusive scheduling only happens when the jobs of this batch relate to exactly one process instance. 
This can be controlled by configuring the [invocationsPerBatchJob][] property.
{{< /note >}}

## Set a Removal Time

Sometimes it is necessary to postpone or even prevent the deletion of certain historic instances.
A removal time can be set asynchronously to historic processes, decisions and batches.

The following modes can be chosen:

* **Absolute:** Sets the removal time to an arbitrary date
  * `.absoluteRemovalTime(Date removalTime)`
* **Cleared:** Resets the removal time (represented as `null`-value); Instances without a removal time are not cleaned-up
  * `.clearedRemovalTime()`
* **Calculated:** Recalculates the removal time based on the Workflow Engine's settings (base time + TTL)
  * `.calculatedRemovalTime()`

Historic process and decision instances can be part of a hierarchy. To set the same removal time for all instances within
a hierarchy, the method `.hierarchical()` needs to be called.
Setting removal time to running process instances would delete data from historic database tables (i.e. tables starting with `ACT_HI_*`), but not from runtime database tables (i.e. tables starting with `ACT_RU_*`).

### Historic Process Instances

```java
HistoricProcessInstanceQuery query = 
  historyService.createHistoricProcessInstanceQuery();

Batch batch = historyService.setRemovalTimeToHistoricProcessInstances()
  .absoluteRemovalTime(new Date()) // sets an absolute removal time
   // .clearedRemovalTime()        // resets the removal time to null
   // .calculatedRemovalTime()     // calculation based on the engine's configuration
  .byQuery(query)
  .byIds("693206dd-11e9-b7cb-be5e0f7575b7", "...")
   // .hierarchical()              // sets a removal time across the hierarchy
  .executeAsync();
```

### Historic Decision Instances

```java
HistoricDecisionInstanceQuery query = 
  historyService.createHistoricDecisionInstanceQuery();

Batch batch = historyService.setRemovalTimeToHistoricDecisionInstances()
  .absoluteRemovalTime(new Date()) // sets an absolute removal time
   // .clearedRemovalTime()        // resets the removal time to null
   // .calculatedRemovalTime()     // calculation based on the engine's configuration 
  .byQuery(query)
  .byIds("693206dd-11e9-b7cb-be5e0f7575b7", "...")
   // .hierarchical()              // sets a removal time across the hierarchy
  .executeAsync();
```

{{< note title="Known limitation" class="info" >}}
The `.hierarchical()` flag for the decision instances batch operation only sets the removal time within the decision 
hierarchy. If a decision was called by a Business Rule Task, the calling process instances (including other process 
instances that are present in the hierarchy) are not updated. 

To update all child instances along the hierarchy of a root process instance (all process as well as decision instances), 
please use the batch operation for process instances with the `.hierarchical()` flag enabled.
{{< /note >}}

### Historic Batches

```java
HistoricBatchQuery query = historyService.createHistoricBatchQuery();

Batch batch = historyService.setRemovalTimeToHistoricBatches()
  .absoluteRemovalTime(new Date()) // sets an absolute removal time
   // .clearedRemovalTime()        // resets the removal time to null
   // .calculatedRemovalTime()     // calculation based on the engine's configuration
  .byQuery(query)
  .byIds("693206dd-11e9-b7cb-be5e0f7575b7", "...")
  .executeAsync();
```

### Updating in chunks

The batch operations update the removal time of all historic entities related to the respective root element, e.g. a historic process instance.
Those updates are done within one database transaction. For large numbers of related entities, those updates can take too long, the database transactions time out, and the execution jobs of the batch fail. Additionally, this can block the [job executor][], trying to execute these long-running batch execution jobs.

For historic process instances, you can therefore configure the batch operation to update related historic database tables in chunks using `.updateInChunks()`.
This limits the number of rows updated per related table to the defined `removalTimeUpdateChunkSize` in the [process engine configuration][].
You can override this limit per batch execution with the `chunkSize(int chunkSize)` option.

With this configuration, the batch execution jobs handle exactly one historic process instance each, fixing the [invocationsPerBatchJob][] property to `1`.
Furthermore, the batch execution jobs repeat until all related historic tables are updated completely.
This spreads the database updates over multiple transactions and helps keeping them within transaction timeout boundaries.

{{< note title="Performance considerations" class="info" >}}
The `.updateInChunks()` flag for the historic process instances batch operation leads to more complex update queries that contain clauses to limit the number of updated rows.
This can degrade the update performance on some databases.

Only use this option for scenarios with large numbers of historic elements related to the historic process instance that otherwise block the job executor for a long time or run into database transaction timeouts.

Using this chunked update mode on running process instances is possible but can lead to inconsistent history views.
We recommend using this on completed or canceled process instances.
{{< /note >}}

[invocationsPerBatchJob]: {{< ref "/user-guide/process-engine/batch.md#configuration" >}}
[job executor]: {{< ref "/user-guide/process-engine/the-job-executor.md" >}}
[process engine configuration]: {{< ref "/user-guide/process-engine/process-engine-bootstrapping.md" >}}