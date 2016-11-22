---

title: 'Batch operations'
weight: 280

menu:
  main:
    identifier: "user-guide-process-engine-batch-operations"
    parent: "user-guide-process-engine-batch"

---

Following operations can be executed asynchronously

- [Process Instance Migration][batch-migration]
- [Cancellation of running Process Instance](#cancellation-of-running-process-instances)
- [Deletion of Historic Process Instances](#deletion-of-historic-process-instances)
- [Set retries of jobs associated with Process Instance](#set-retries-of-jobs-associated-with-process-instance)

All batch operations are relying on corresponding methods that provide possibility to
operate on list of entities synchronously. Please refer to general [Batch][batch] documentation in order to
understand creation process better.

Asynchronous operations can be performed based on list of specific instances as well as result of a query providing
resulting list of instances. If both list of instances and query are provided, resulting set of affected instances
will consist of union of those two subsets.

## Cancellation Of Running Process Instances

Cancellation of running process instances can be performed asynchronously using following Java API method invocation

```java
List<String> processInstanceIds = ...;
runtimeService.deleteProcessInstancesAsync(
        processInstanceIds, null, REASON);
```


## Deletion Of Historic Process Instances

Deletion of historic process instances can be performed asynchronously using following Java API method invocation

```java
List<String> historicProcessInstanceIds = ...;
historyService.deleteHistoricProcessInstancesAsync(
        historicProcessInstanceIds, TEST_REASON);
```

## Set Retries Of Jobs Associated With Process Instance

Set retries of jobs associated with process instance can be performed asynchronously using following Java API method invocation

```java
List<String> historicProcessInstanceIds = ...;
historyService.deleteHistoricProcessInstancesAsync(
        historicProcessInstanceIds, TEST_REASON);
```

[batch-migration]: {{< relref "#cancellation-of-running-process-instances" >}}
[batch]: {{< relref "user-guide/process-engine/batch.md" >}}
