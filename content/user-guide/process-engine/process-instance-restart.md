---

title: 'Process Instance Restart'
weight: 50

menu:
  main:
    identifier: "user-guide-process-engine-process-instance-restart"
    parent: "user-guide-process-engine"

---

After a process instance termination, there are still its historic data that can be accessed to restore a process instance if the full history level has been enabled. For example, this can be useful when the termination did not proceed in a desired way. Use cases for this API may be

* Restoring the last state of process instances that have been canceled by mistake
* Restarting process instances after a termination caused by a wrong decision

To perform such an operation, the process engine offers *the process instance restart API* that is entered via `RuntimeService.restartProcessInstances(...)`. This API allows to specify multiple instantiation instructions in one call by using a fluent builder.

Note that these operations are also available via [REST]({{< relref "reference/rest/process-definition/index.md" >}}).

# Process Instance Restart by Example

As an example, consider the following process model where the red dots mark active tasks:

{{< img src="../img/variables-3.png" title="Running Process Instance" >}}

Let us assume that the process instance has been canceled externally by a worker using following code:

```java
ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().singleResult();
runtimeService.deleteProcessInstance(processInstance.getId(), "any reason");
```

After that, the manager decides to restore the last state of that process instance.

```java
runtimeService.restartProcessInstance(processInstance.getProcessDefinitionId())
	.startBeforeActivity("receivePayment")
	.startBeforeActivity("shipOrder")
	.processInstanceIds(processInstance.getId())
	.execute();
```

The process instance has been restarted with the last set of variables. However, only global variables are set in the restarted process instance. Local variables can be set manually calling for example `RuntimeService.setVariableLocal(...)`.

{{< note title="" class="info" >}}
  Technically, a new process instance has been created.

  **Please note:**
  The ids of the historic and the restarted process instance are different.
{{< /note >}}


# Operational Semantics

In the following, the exact semantics of process instance restart are documented. Reading this section is recommended to fully understand the effects, power, and limitations.

## Instatiation Instruction Types

The fluent process instance restart builder offers the following instructions to be submitted:

* `startBeforeActivity(String activityId)`
* `startAfterActivity(String activityId)`
* `startTransition(String transitionId)`

For information about the instruction types, please refer to the similar
section [modification instruction types]({{< relref "user-guide/process-engine/process-instance-modification.md#modification-instruction-types" >}}).

## Selecting process instances to restart

Process instances can be selected for restart by either providing a set of process instance IDs
or providing a historic process instance query. It is also possible to specify both, a list of process instance IDs and a query.
The process instances to be restarted will then be the union of the resulting sets.

### List of process instances

The process instances which should be restarted can either
be specified as a list of the process instance IDs:

```Java
ProcessDefinition processDefinition = ...;
List<String> processInstanceIds = ...;

runtimeSerivce.restartProcessInstances(processDefinition.getId())
  .startBeforeActivity("activity")
  .processInstanceIds(processInstanceIds)
  .execute();
```

For a static number of process instances, there is a convenience varargs method:

```Java
ProcessDefinition processDefinition = ...;

HistoricProcessInstance instance1 = ...;
HistoricProcessInstance instance2 = ...;

runtimeSerivce.restartProcessInstances(processDefinition.getId())
  .startBeforeActivity("activity")
  .processInstanceIds(instance1.getId(), instance2.getId())
  .execute();
```

### Historic Process Instance Query

If the instances are not known beforehand, the process instances can be selected by a historic process instance query:

```Java
HistoricProcessInstanceQuery historicProcessInstanceQuery = historyService
  .createHistoricProcessInstanceQuery()
  .processDefinitionId(processDefinition.getId())
  .finished();

runtimeSerivce.restartProcessInstances(processDefinition.getId())
  .startBeforeActivity("activity")
  .historicProcessInstanceQuery(historicProcessInstanceQuery)
  .execute();
```

## Skipping Listeners and Input/Output Mappings

It is possible to skip invocations of execution and task listeners as well as input/output mappings for the transaction that performs the restart. This can be useful when the restart is executed on a system that has no access to the involved process application deployments and their contained classes.

In the API, the two methods `#skipCustomListeners` and `#skipIoMappings`
can be used for this purpose:

```Java
ProcessDefinition processDefinition = ...;
List<String> processInstanceIds = ...;

runtimeSerivce.restartProcessInstances(processDefinition.getId())
  .startBeforeActivity("activity")
  .processInstanceIds(processInstanceIds)
  .skipCustomListeners()
  .skipIoMappings()
  .execute();
```

## Restartig a Process Instance with initial set of variables

By default, a process instance is restarted with the last set of variables.
To choose alternatively the initial set of variables, the `initialSetOfVariables` method is used.

This feature does not only copy the start variables, but will copy the first version of all process variables that have been set in the start activity of the old process instance.

```Java
ProcessDefinition processDefinition = ...;
List<String> processInstanceIds = ...;

runtimeService.restartProcessInstances(processDefinition.getId())
  .startBeforeActivity("activity")
  .processInstanceIds(processInstanceIds)
  .initialSetOfVariables()
  .execute();
```


The initial set of variables can not be set if the historic process instance has no unique start activity. In that case no variables are taken over.

## Omitting the Business Key of a Historic Process Instance

By default, a process instance is restarted with the same business key as the historic process instance.
By using the method `withoutBusinessKey`, the business key of the restarted process instance is not set.

```Java
ProcessDefinition processDefinition = ...;
List<String> processInstanceIds = ...;

runtimeService.restartProcessInstances(processDefinition.getId())
  .startBeforeActivity("activity")
  .processInstanceIds(processInstanceIds)
  .withoutBusinessKey()
  .execute();
```
## Execution

The restart can either be executed synchronously (blocking) or asynchronously
(non-blocking) using a [batch]({{< relref "user-guide/process-engine/batch.md" >}}) .

The following are some reasons to prefer either one or the other:

- Use synchronous execution if:
  - the number of process instances is small
  - the restart should be atomic, i.e., it should be executed
    immediately and should fail if at least one process instance cannot
    be restarted


- Use asynchronous execution if:
  - the number of process instances is large
  - all process instances should be restarted decoupled from the other
    instances, i.e., every instance is restarted in its own transaction
  - the restart should be executed by another thread, i.e., the job
    executor should handle the execution

### Synchronous execution

To execute the restart synchronously, the `execute` method is used. It will
block until the restart is completed.

```Java
ProcessDefinition processDefinition = ...;
List<String> processInstanceIds = ...;

runtimeSerivce.restartProcessInstances(processDefinition.getId())
  .startBeforeActivity("activity")
  .processInstanceIds(processInstanceIds)
  .execute();
```

Restart is successful if all process instances can be restarted.

### Asynchronous batch execution

To execute the restart asynchronously, the `executeAsync` method is used. It will
return immediately with a reference to the batch which executes the restart.

```Java
ProcessDefinition processDefinition = ...;
List<String> processInstanceIds = ...;

Batch batch = runtimeSerivce.restartProcessInstances(processDefinition.getId())
  .startBeforeActivity("activity")
  .processInstanceIds(processInstanceIds)
  .executeAsync();
```

Using a batch, the process instance restart is split into several jobs which
are executed asynchronously. These batch jobs are executed by the job executor.
See the [batch][] section for more information. A batch is completed if all
batch execution jobs are successfully completed. However, in contrast to the
synchronous execution, it is not guaranteed that either all or no process
instances are restarted. As the restart is split into several independent jobs,
every single job may fail or succeed.

If a restart job fails, it is retried by the job executor
and if no retries are left, an incident is created. In this case, manual action
is necessary to complete the batch restart: The job's retries can be incremented
or the job can be deleted. Deletion cancels restart of the specific instance but
does not affect the batch beyond that.