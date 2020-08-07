---

title: 'CockroachDB Database Configuration'
weight: 50
menu:
  main:
    identifier: "user-guide-process-engine-database-crdb-configuration"
    parent: "user-guide-process-engine-database"

---

This section of the documentation describes how to use the Camunda process engine with the [CockroachDB
database](https://www.cockroachlabs.com/).

CockroachDB is a highly scalable SQL database that operates as a distributed system. As such, it has
different requirements and behavior compared to the other Camunda-supported databases. For this reason, 
we have adjusted the process engine behavior and added some additional mechanisms in order to make sure 
that the process engine is able to operate correctly on CockroachDB. 

# Communication with CockroachDB

CockroachDB implements the PostgreSQL wire protocol for communication between a Java application, like
the process engine, and the database. It is recommended to use a PostgreSQL JDBC driver version compatible 
with PostgreSQL 9.5+, i.e. versions 42.X.X of the JDBC driver (see [the CockroachDB docs](https://www.cockroachlabs.com/docs/v20.1/install-client-drivers.html#java) 
for more details).  

# Concurrency conflicts in CockroachDB

Whenever the process engine detects a concurrency conflict between transactions, it reports an
`OptimisticLockingException` (for more details please see [this docs section]({{< ref "/user-guide/process-engine/transactions-in-processes.md#the-optimisticlockingexception" >}})), 
which is then handled internally, or reported to the user. Since CockroachDB implements the `SERIALIZABLE`
transaction isolation level, the process engine's optimistic locking mechanism does not apply. When CockroachDB
is not able to serialize a concurrent transaction, it raises an error that causes the transaction to abort.
The process engine converts this error into a `CrdbTransactionRetryException`, a sub-class of the 
`OptimisticLockingException` class.

As the `SERIALIZABLE` transaction isolation level is stricter than the `READ COMMITTED` level that 
the process engine usually operates on, concurrency conflicts may happen in more cases than with the 
other Camunda-supported databases.

These cases are handled in the following ways:

1. Concurrency conflicts that happen during invocations of regular API calls should be handled in
   the same way as handling an `OptimisticLockingException`. Users should catch the exception and
   retry the API invocation.
2. Concurrency conflicts that occur during job execution are handled by the job executor. Since the
   reported exception is an instance of the `OptimisticLockingException`, the job executor will retry 
   the job execution transparently, without consuming the defined job retries.
3. Concurrency conflicts that are detected in a specific set of API calls, where retries made by users
   or the job executor are impossible, or hard to perform, use a CRDB-specific mechanism that makes
   transparent retries of these API calls. The set of API calls, as well as the CRDB-specific mechanism,
   are described in the section below.

## Custom CockroachDB transaction retry mechanism

As mentioned in the section above, when using CockroachDB, a selected set of API calls are transparently
retried using a CRDB-specific mechanism:

* When performing a deployment of BPMN/CMMN/DMN models and associated resources with the following calls:
  * {{< javadocref page="?org/camunda/bpm/engine/repository/DeploymentBuilder.html#deploy--" text="DeploymentBuilder#deploy()" >}}
  * {{< javadocref page="?org/camunda/bpm/engine/repository/DeploymentBuilder.html#deployWithResult--" text="DeploymentBuilder#deployWithResult()" >}}
* By building a process engine with {{< javadocref page="?org/camunda/bpm/engine/ProcessEngineConfiguration.html#buildProcessEngine()" text="ProcessEngineConfiguration#buildProcessEngine--" >}}:
  * When the history level is determined.
  * When the history cleanup job is created.
  * When the installation id is set.
  * When the telemetry is configured.
* When manually triggering history cleanup with {{< javadocref page="?org/camunda/bpm/engine/HistoryService.html#cleanUpHistoryAsync-boolean-" text="HistoryService#cleanUpHistoryAsync(boolean immediatelyDue)" >}}.
* When fetching external tasks:
  * With the External Tasks Rest API [endpoint]({{< ref "/reference/rest/external-task/fetch.md" >}}).
  * With the execution of the {{< javadocref page="??org/camunda/bpm/engine/ExternalTaskService.html" text="ExternalTaskService#fetchAndLock" >}} API calls.
* When [acquiring jobs]({{< ref "/user-guide/process-engine/the-job-executor.md#job-acquisition" >}}) for execution by the job executor.

It is important to note that the CockroachDB retry mechanism is applied to API calls where an 
`OptimisticLockingException` is handled internally in the regular case. The mechanism is also
applied to API calls that utilize a pessimistic lock, which is redundant and disabled when CockroachDB is used
(please see [the section bellow](#pessimistic-locks-replacement-behavior) for more details). 

The number of retries the mechanism is allowed to perform can be configured with the `commandRetries` 
configuration property (more details [here][descriptor-tags]). The default value is 0 and can be set to an 
appropriate value based on the use-case.

When the number of retries is exhausted or is set to 0, a `CrdbTransactionRetryException` will be thrown
to the user. The API call will then need to be manually retried by the user.

# Differences in Process Engine Behavior 

## CockroachDB-specific behaviors with alternatives

This section covers the differences process engine behavior when it is used with CockroachDB 
versus usage with other Camunda-supported databases. It provides descriptions and 
recommendations on how to configure and use the process engine with CockroachDB.

### Un-ignorable historic `OptimisticLockingException`

The process engine may generate large amounts of historical data, and provides the [history cleanup
feature]({{< ref "/user-guide/process-engine/history.md#history-cleanup" >}}) to ensure that "old"
data is removed. The History Cleanup Removal-Time-based Strategy allows for historical data associated
with still running Process Instances to be cleaned up. Since running Process Instances continue
generating historical data, removing the same data in parallel is viewed as an `OptimisticLockingException`.

In the regular case, this historic `OptimisticLockingException` is handled internally and ignored 
since it is expected (and can be controlled by the `skipHistoryOptimisticLockingExceptions` 
[configuration property][descriptor-tags]). However, due to the `SERIALIZABLE` transaction isolation, 
CockroachDB detects this concurrency conflict by itself and requires for a complete transaction 
rollback and retry. 

Consequently, when CockroachDB is used, the process engine will not attempt to ignore the reported 
`CrdbTransactionRetryException`, but will report it to the user so that the associated business 
logic may be retried.  

### Pessimistic locks replacement "behavior"

As mentioned [above](#custom-cockroachdb-transaction-retry-mechanism), the CockroachDB-specific retry
mechanism in the process engine replaces the usage of pessimistic locks in the following API calls:

* When performing a deployment of BPMN/CMMN/DMN models and associated resources with the following calls:
  * {{< javadocref page="?org/camunda/bpm/engine/repository/DeploymentBuilder.html#deploy()" text="DeploymentBuilder#deploy()" >}}
  * {{< javadocref page="?org/camunda/bpm/engine/repository/DeploymentBuilder.html#deployWithResult()" text="DeploymentBuilder#deployWithResult()" >}}
* By building a process engine with {{< javadocref page="?org/camunda/bpm/engine/ProcessEngineConfiguration.html#buildProcessEngine()" text="ProcessEngineConfiguration#buildProcessEngine()" >}}:
  * When the history level is determined.
  * When the history cleanup job is created.
  * When the installation id is set.
  * When the telemetry is configured.
* When manually triggering history cleanup with {{< javadocref page="?org/camunda/bpm/engine/HistoryService.html#cleanUpHistoryAsync-boolean-" text="HistoryService#cleanUpHistoryAsync(boolean immediatelyDue)" >}}.

The role of the pessimistic locks in these API calls is not to prevent concurrent modification on the
locked data, but to serve as barriers (or flags) to ensure the serialized, single execution of a
given action (e.g. multiple deployments, multiple process engine startups, etc). Since CockroachDB
ensures a serialized execution through its implementation of the `SERIALIZABLE` transaction isolation
level, the pessimistic locks are redundant, or even counter-productive, as they introduce an additional
waiting time overhead for each concurrent transaction that attempts to acquire the pessimistic lock.

When a process engine is started, it will invoke the commands to determine the history level, configure the
history cleanup job, as well as set an installation id and telemetry status. All of these invocations
had their pessimistic locks replaced with the CockroachDB-specific retry mechanism.

As a result of this replacement, multiple process engine startups will take longer to finish, as each
concurrent startup may experience a command failure and perform a retry instead of waiting to acquire 
a pessimistic lock. The number of retries is defined by the `commandRetries` configuration property 
described in the [CockroachDB retry mechanism section](#custom-cockroachdb-transaction-retry-mechanism). 
Once the retries are exhausted, the startup will have to be retried manually by the caller (user). The 
same scenario applies when performing multiple concurrent deployments.

### Using External Transaction management with the Spring/Java EE integrations

{{< note title="When to consider the below recommendations" class="info" >}}
This section explains how the process engine can be coupled with CockroachDB using external 
transaction management. The descriptions below can be applied to both the Spring, and Java EE 
Transaction integrations, as they operate on similar concepts.

Note that the configuration described below is only required when transactions involving commands listed
[here](#custom-cockroachdb-transaction-retry-mechanism) are managed by the Spring/Java EE frameworks. 
When the process engine is used inside a Spring/Java EE application but left to manage its own 
transactions, the recommendations from the sections above remain valid.
{{< /note >}}

The [Spring]({{< ref "/user-guide/spring-framework-integration/transactions.md" >}})/[Java EE]({{< ref "/user-guide/cdi-java-ee-integration/jta-transaction-integration.md" >}}) 
Transaction integrations enable developers to manage transactions through the respective framework. 
This means that the process engine doesn't control when transactions are started, committed, 
or rolled back. 

When using CockroachDB, the [retry mechanism](#custom-cockroachdb-transaction-retry-mechanism) works 
[as expected](#concurrency-conflicts-in-cockroachdb) as long as engine-managed transactions are used.
However, in the case of externally managed transactions, this mechanism will not work correctly.

In this case, we suggest to disable the retry mechanism by setting the `commandRetries` configuration property 
(documented [here][descriptor-tags]) to 0. This will allow the `CrdbTransactionRetryException` to bubble up to 
the Spring/Java EE layer, where the transaction rollback and retry can be correctly implemented by the application 
developers.

## CockroachDB-specific behaviors without alternatives

This section covers the differences in behavior between CockroachDB and other Camunda-supported
databases that impact how the process engine operates. As opposed to the differences described in
the [previous section](#differences-in-process-engine-behavior), this section describes more general
CockroachDB characteristics, for which an alternative is not available, or more difficult to 
implement.

### Unsupported Exclusive Message correlation

Exclusive Message correlation (see {{< javadocref page="?org/camunda/bpm/engine/runtime/MessageCorrelationBuilder.html#correlateExclusively()" text="Javadocs" >}}) 
prevents multiple concurrent message correlations to be performed on a single Process execution. 
When using the process engine with CockroachDB, it is not possible to use Exclusive Message correlation.

### Unsupported Engine-side Query timeout

The `jdbcStatementTimeout` configuration property (more details [here][descriptor-tags]) enables users to 
set the amount of time in seconds that the JDBC driver will wait for a response from the database. CockroachDB 
currently doesn't support query cancellation ([CockroachDB issue](https://github.com/cockroachdb/cockroach/issues/41335)), 
so the process engine `jdbcStatementTimeout` property will not have any effect when used on CockroachDB.

### Server-side transaction timeout of 5 minutes

A common feature of databases is to introduce a server-side timeout on long-running transactions. 
In CockroachDB, this timeout is tied to the access time interval (lease) that CockroachDB nodes 
have on the data included in the transaction. Transactions running for more than 5 minutes may experience 
a server-side timeout with the error `RETRY_COMMIT_DEADLINE_EXCEEDED`.

In cases like these, it is advised to shorten the execution time of the business logic associated with
the transaction since setting a custom server-side transaction timeout in CockroachDB is currently not
possible ([CockroachDB issue](https://github.com/cockroachdb/cockroach/issues/51042)).

### Blocking Transactions on Database READ

Due to the `SERIALIZABLE` transaction isolation level, when a transaction attempts to READ data which is 
currently modified by a concurrent transaction, the former will block until the latter is finished (committed). 
In the context of the process engine, certain operations may take longer than expected. For example, attempting 
to view (READ) the runtime state of a Process Instance in Cockpit, while the `JobExecutor` is executing a Job 
associated with that Process Instance, will block the Cockpit transaction until the Job is completed. 

### Concurrency conflicts on unrelated data from the same table

The section on [concurrency conflicts in CockroachDB](#concurrency-conflicts-in-cockroachdb) describes how this 
database handles concurrent conflicts on the same data. In addition, the currently supported CockroachDB
version (v20.1.3), may view concurrent modifications of unrelated data of the same table as a conflict
([CockroachDB issue](https://github.com/cockroachdb/cockroach/issues/51648)).

In the process engine, this may happen when a Process Instance is deleted by one transaction, while a second 
transaction performs a modification on another, unrelated Process Instance. This results in a `CrdbTransactionRetryException` 
, and the modification of the latter Process Instance will have to be retired.

[descriptor-tags]: {{< ref "/reference/deployment-descriptors/tags/process-engine.md#configuration-properties" >}}