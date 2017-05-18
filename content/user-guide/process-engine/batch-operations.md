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
- [Setting retries of jobs associated with Process Instances](#setting-retries-of-jobs-associated-with-process-instances)
- [Process Instance Modification]({{< relref "user-guide/process-engine/process-instance-modification.md#modification-of-multiple-process-instances" >}})
- [Process Instance Restart]({{< relref "user-guide/process-engine/process-instance-restart.md#asynchronous-batch-execution" >}})
- [Setting retries of external tasks](#setting-retries-of-external-tasks)

All batch operations rely on corresponding methods that provide the possibility to
operate on a list of entities synchronously. Please refer to the general [Batch][batch] documentation to
understand the creation process better.

Asynchronous operations can be performed based on a list of specific instances as well as on the result of a query providing a
resulting list of instances. If both a list of instances and a query are provided, the resulting set of affected instances
will consist of the union of those two subsets.

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

## Setting Retries Of Jobs Associated With Process Instances

Setting retries of jobs associated with process instances can be performed asynchronously using the following Java API method invocation:

```java
List<String> historicProcessInstanceIds = ...;
historyService.deleteHistoricProcessInstancesAsync(
        historicProcessInstanceIds, TEST_REASON);
```

## Setting Retries Of External Tasks

Setting retries of external tasks can be performed asynchronously using the following Java API method invocation:

```java
List<String> externalTaskIds = ...;
externalTaskService.setRetriesAsync(
        externalTaskIds, TEST_REASON);
```

[batch-migration]: {{< relref "user-guide/process-engine/process-instance-migration.md#asynchronous-batch-migration-execution" >}}
[batch]: {{< relref "user-guide/process-engine/batch.md" >}}
