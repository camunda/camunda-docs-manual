---

title: 'Batch'
weight: 175

menu:
  main:
    identifier: "user-guide-process-engine-batch"
    parent: "user-guide-process-engine"

---

Batch is a concept to offload workload from the current execution to be
processed in the background. This allows to run a process engine command
asynchronously on a large set of instances without blocking. It also decouples
the separate command invocations from each other.

For example the [process instance migration][migration] command can be
[executed using a batch][batch-migration]. This allows to migrate
process instances asynchronously. In a synchronous process instance migration,
all migrations are executed in a single transaction.  First of all, this
requires all of them to succeed to commit the transaction. For a
large set of process instances, the transaction can also become too large to even be
committed to the database. With batch migration both of these traits change.
A batch executes the migration in smaller chunks, each using a single
transaction.

Benefits:

- asynchronous (non-blocking) execution
- execution can utilize multiple threads and job executors
- decoupling of execution, i.e., every batch execution job uses its own
  transaction

Disadvantages:

- manual polling for completion of the batch
- contention with other jobs executed by the process engine
- a batch can fail partially while a subset was already executed, e.g., some
  process instances were migrated where others failed

Technically, a batch represents a set of jobs which execute a command in the context of the
process engine.

The batch utilizes the [job executor][] of the process engine to execute the
batch jobs. A single batch consists of three job types:

- Seed job: creates all batch execution jobs required to complete the batch
- Execution jobs: the actual execution of the batch command, e.g., the process
  instance migration
- Monitor job: after the seed job finished, it monitors the progress of the
  batch execution and completion

# API

The following gives an overview of the Java API for batches.

## Creating a Batch

A batch is created by executing a process engine command asynchronously.

Currently supported commands:

- [Process Instance Migration][migration]

To start a [batch process instance migration][batch-migration], the Java API can be used.

```java
RuntimeService runtimeService = processEngine.getRuntimeService();
MigrationPlanBuilder migrationPlan = runtimeService.createMigrationPlan(...);
List<String> processInstanceIds = ...

Batch batch = runtimeService
  .newMigration(migrationPlan)
  .processInstanceIds(processInstanceIds)
  .executeAsync();
```

## Query a Batch

You can query a running batch by the id and the type. For example to query
for all running process instance migration batches.

```java
List<Batch> migrationBatches = processEngine.getManagementService()
  .createBatchQuery()
  .type(Batch.TYPE_PROCESS_INSTANCE_MIGRATION)
  .list();
```

## Batch Statistics

You can query for statistics of batches by using the management service.
The batch statistics will contain information about the remaining,
completed and failed batch execution jobs.

```java
List<BatchStatistics> migrationBatches = processEngine.getManagementService()
  .createBatchStatisticsQuery()
  .type(Batch.TYPE_PROCESS_INSTANCE_MIGRATION)
  .list();
```

## History of a Batch

For the [history level][] `FULL` a historic batch entry is created. You
can query it using the history service.

```java
HistoricBatch historicBatch = processEngine.getHistoryService()
  .createHistoricBatchQuery()
  .batchId(batch.getId())
  .singleResult();
```

The history also contains job log entries for the seed, monitor and execution
jobs. You can query the corresponding job log entries by the specific job
definition id.

```java
HistoricBatch historicBatch = ...

List<HistoricJobLog> batchExecutionJobLogs = processEngine.getHistoryService()
  .createHistoricJobLogQuery()
  .jobDefinitionId(historicBatch.getBatchJobDefinitionId())
  .orderByTimestamp()
  .list();
```

## Suspend a Batch

To pause the execution of a batch and all corresponding jobs a batch
can be suspended using the management service.

```java
processEngine.getManagementService()
  .suspendBatchById("myBatch");
```

A suspended batch can then be activated again also using the management
service.

```java
processEngine.getManagementService()
  .activateBatchById("myBatch");
```

## Delete a Batch

A running batch can be deleted using the management service.

```java
// Delete a batch preserving the history of the batch
processEngine.getManagementService()
  .deleteBatch("myBatch", false);

// Delete a batch include history of the batch
processEngine.getManagementService()
  .deleteBatch("myBatch", true);
```

A historic batch can be deleted using the history service.

```java
processEngine.getHistoryService()
  .deleteHistoricBatch("myBatch");
```

{{< note title="" class="info" >}}
For a running batch which still executes jobs it is recommend
to suspend the batch before deleting it.
See section [Suspend a Batch](#suspend-a-batch) for more information.
{{< /note >}}

## Priority of a Batch

As all batch jobs are executed using the job executor it is possible to use the
[job prioritization][] feature to adjust the importance of batch jobs.  The
default batch job priority is set by the process engine configuration
`batchJobPriority`.

It is possible to adjust the priority of a specific batch [job
definition][job-definition-priority] or even a single batch [job][job-priority]
using the management service.

```java
Batch batch = ...;

String batchJobDefinitionId = batch.getBatchJobDefinitionId();

processEngine.getManagementService()
  .setOverridingJobPriorityForJobDefinition(batchJobDefinitionId, 100, true);
```


# Job Definitions

## Seed Job

A batch initially creates a seed job. This seed will be repeatedly executed to
create all batch execution jobs. For example if a user starts a [process
instance migration batch][batch-migration] for 1000 process instances. With the
default process engine configuration the seed job will create 10 batch
execution jobs on every invocation. Every execution job will migrate 1 process
instance. In sum the seed job will be invoked 100 times, until it has created the
1000 execution jobs required to complete the batch.

The number of jobs created by every seed job invocation `batchJobsPerSeed`
(default: 100) and the number of invocations per batch execution job
`invocationsPerBatchJob` (default: 1) can be configured on the [process engine
configuration][].

The Java API can be used to get the job definition for the seed job of a batch:

```java
Batch batch = ...;

JobDefinition seedJobDefinition = processEngine.getManagementService()
  .createJobDefinitionQuery()
  .jobDefinitionId(batch.getSeedJobDefinitionId())
  .singleResult();
```

To pause the creation of further batch execution jobs, the seed job definition
can be suspended with the management service:

```java
processEngine.getManagementService()
  .suspendJobByJobDefinitionId(seedJobDefinition.getId());
```

## Execution Jobs

The execution of a batch is split into several execution jobs. The specific
number of jobs depends on the total jobs of the batch and the process engine
configuration (see [seed job][]). Every execution job executes the actual batch
command for a given number of invocations, e.g., migrate a number of process
instances. The execution jobs will be executed by the [job executor][].  They
behave like other jobs which means they can fail and the job executor will
[retry][] failed batch execution jobs. Also, there will be [incidents][]
for failed batch execution jobs with no retries left.

The Java API can be used to get the job definition for the execution jobs of a
batch, e.g., for a [process instance migration batch][batch-migration]:

```java
Batch batch = ...;

JobDefinition executionJobDefinition = processEngine.getManagementService()
  .createJobDefinitionQuery()
  .jobDefinitionId(batch.getBatchJobDefinitionId())
  .singleResult();
```

To pause the execution of further batch execution jobs, the batch job definition
can be suspended with the management service:

```java
processEngine.getManagementService()
  .suspendJobByJobDefinitionId(executionJobDefinition.getId());
```

## Monitor Job

After all batch execution jobs were created by the [seed job][] a monitor job
is created for the batch. This job regularly polls if the batch has been completed,
i.e., all batch execution jobs were completed. The polling interval
can be configured by the `batchPollTime` (default: 30 seconds) property of the [process engine configuration][].

The Java API can be used to get the job definition for the monitor job of a
batch:

```java
Batch batch = ...;

JobDefinition monitorJobDefinition = processEngine.getManagementService()
  .createJobDefinitionQuery()
  .jobDefinitionId(batch.getMonitorJobDefinitionId())
  .singleResult();
```

To prevent the completion of the batch, i.e., deletion of the runtime data, the
monitor job definition can be suspended with the management service:

```java
processEngine.getManagementService()
  .suspendJobByJobDefinitionId(monitorJobDefinition.getId());
```

[migration]: {{< relref "user-guide/process-engine/process-instance-migration.md" >}}
[batch-migration]: {{< relref "user-guide/process-engine/process-instance-migration.md#asynchronous-batch-migration-execution" >}}
[job executor]: {{< relref "user-guide/process-engine/the-job-executor.md" >}}
[process engine configuration]: {{< relref "user-guide/process-engine/process-engine-bootstrapping.md" >}}
[seed job]: #seed-job
[retry]: {{< relref "user-guide/process-engine/the-job-executor.md#failed-jobs" >}}
[incidents]: {{< relref "user-guide/process-engine/incidents.md" >}}
[history level]: {{< relref "user-guide/process-engine/history.md#choose-a-history-level" >}}
[job prioritization]: {{< relref "user-guide/process-engine/the-job-executor.md#job-prioritization" >}}
[job-definition-priority]: {{< relref "user-guide/process-engine/the-job-executor.md#override-priority-by-job-definition" >}}
[job-priority]: {{< relref "user-guide/process-engine/the-job-executor.md#set-job-priorities-via-managementservice-api" >}}
