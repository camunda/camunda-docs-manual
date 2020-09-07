---

title: 'Batch operations'
weight: 280

menu:
  main:
    identifier: "user-guide-process-engine-batch-operations"
    parent: "user-guide-process-engine-batch"

---

The following operations can be executed asynchronously

- [Process Instance Migration][batch-migration]
- [Cancellation of running Process Instances](#cancellation-of-running-process-instances)
- [Deletion of Historic Process Instances](#deletion-of-historic-process-instances)
- [Update suspend state of process instances](#update-suspend-state-of-process-instances)
- [Setting retries of jobs associated with Process Instances](#setting-retries-of-jobs-associated-with-process-instances)
- [Process Instance Modification]({{< ref "/user-guide/process-engine/process-instance-modification.md#modification-of-multiple-process-instances" >}})
- [Process Instance Restart]({{< ref "/user-guide/process-engine/process-instance-restart.md#asynchronous-batch-execution" >}})
- [Setting retries of external tasks](#setting-retries-of-external-tasks)
- [Set Variables to Process Instances](#set-variables-to-process-instances)
- [Set a Removal Time to Historic Process Instances](#historic-process-instances)
- [Set a Removal Time to Historic Decision Instances](#historic-decision-instances)
- [Set a Removal Time to Historic Batches](#historic-batches)

All batch operations rely on corresponding methods that provide the possibility to
operate on a list of entities synchronously. Please refer to the general [Batch][batch] documentation to
understand the creation process better.

Asynchronous operations can be performed based on a list of specific instances as well as on the result of a query providing a
resulting list of instances. If both a list of instances and a query are provided, the resulting set of affected instances
will consist of the union of those two subsets.

All listed batch operations, except [Set a Removal Time to Historic Batches](#historic-batches), are deployment-aware.
In particular, this means that the seed job and execution jobs will receive a `deploymentId` so [deployment-aware job executors]({{< ref "/user-guide/process-engine/the-job-executor.md#job-execution-in-heterogeneous-clusters" >}}) can pick up those jobs of a batch that need to be executed on their nodes. The deployment id of the seed job is chosen from the list of involved deployments. This list is derived from the resulting set of affected instances. Execution jobs only contain elements of the same deployment and are bound to that deployment's id.

## Cancellation Of Running Process Instances

Cancellation of running process instances can be performed asynchronously using the following Java API method invocation:

```java
List<String> processInstanceIds = ...;
runtimeService.deleteProcessInstancesAsync(
        processInstanceIds, null, REASON);
```


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

### Known Limitation

Currently, it is not possible to set transient variables via batch operation. However,
you can [set transient variables] synchronously. 

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

[batch-migration]: {{< ref "/user-guide/process-engine/process-instance-migration.md#asynchronous-batch-migration-execution" >}}
[batch]: {{< ref "/user-guide/process-engine/batch.md" >}}
[set transient variables]: {{< ref "/user-guide/process-engine/variables.md#transient-variables" >}}
