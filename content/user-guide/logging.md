---

title: 'Logging'
weight: 200

menu:
  main:
    identifier: "user-guide-logging"
    parent: "user-guide"

---

This page provides information about logging in Camunda.

# SLF4J

Most Camunda modules, including the Camunda engine, use [slf4j] as logging "facade". This allows users to direct logging output to the logging "backend" of their choice, such as [logback] or [log4j].

## Preconfigured Logging with a Shared Process Engine

When installing Camunda as a shared process engine in an application server, Camunda logging is pre-configured.

On all application servers except Wildfly, logging is pre-configured using the slf4j-jdk14 bridge.
This means that Camunda effectively re-directs all its logging to Java Util Logging.
Both SLF4J API and the slf4j-jdk14 bridge are available in a shared classpath which means that they are available in the classpath of all applications deployed on these servers.

On Wildfly, logging is directed to the JBoss logging infrastructure. The SLF4J API is not available in the classpath of custom applications by default.

## Adding a Logging Backend for Embedded Use

When using the Camunda Maven modules in a custom application, only the [slf4j] API is pulled in transitively.
If you do not provide any backend, nothing will actually be logged.

In the following, we provide two alternative examples of how to set up logging. See the [SLF4J Documentation][slf4j-backends] for more detailed information on how to add a logging backend.

### Example Using Java Util Logging

If you do not care for a specific logging backend, the simplest option is to direct logging to Java Util Logging by adding the following
maven dependency:

```xml
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-jdk14</artifactId>
  <version>1.7.26</version>
</dependency>
```

### Example Using Logback

For a more sophisticated logging setup we recommend using Logback. To do so, the following steps are necessary:

Add the logback dependency

```xml
<dependency>
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-classic</artifactId>
  <version>1.1.2</version>
</dependency>
```

Add a file named `logback.xml`. Example configuration:

```xml
<configuration>

  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <!-- encoders are assigned the type
         ch.qos.logback.classic.encoder.PatternLayoutEncoder by default -->
    <encoder>
      <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
    </encoder>
  </appender>

  <!-- camunda -->
  <logger name="org.camunda" level="info" />

  <!-- common dependencies -->
  <logger name="org.apache.ibatis" level="info" />
  <logger name="javax.activation" level="info" />
  <logger name="org.springframework" level="info" />

  <root level="debug">
    <appender-ref ref="STDOUT" />
  </root>

</configuration>
```

Also make sure to make mybatis use SLF4J as logger by adding

```java
LogFactory.useSlf4jLogging();
```

somewhere in your setup code.

## Process Data Context

In order to provide details on the current execution context of log statements,
we set process execution-specific data in the [Mapped Diagnostic Context (MDC)](https://www.slf4j.org/manual.html#mdc).

The process data is held in the MDC for the time of process execution and removed from it after the execution context is successfully left.
In case of arising exceptions upon execution, the data is kept in the MDC until the calling context,
i.e. the [JobExecutor]({{< ref "/user-guide/process-engine/the-job-executor.md" >}}) or the surrounding command, finished its logging.

The keys at which the properties are accessible in the MDC can be defined in the
[process engine configuration]({{< ref "/reference/deployment-descriptors/tags/process-engine.md#logging-context-parameters" >}}).

In order to access the MDC data, you need to adjust the logging pattern of your logging configuration.
An example using Logback could look as follows

```xml
<configuration>
  ...

  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
      <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} context:[%X] - %msg%n</pattern>
    </encoder>
  </appender>

  ...
</configuration>
```

By adding the `context:[%X]` to your configuration, all values that are present in the MDC at the time the log statement is created will be displayed.
Please refer to the manual of your logging framework for further information on how to access the MDC, e.g. the [Logback documentation](http://logback.qos.ch/manual/layouts.html#mdc).


# Logging Categories

## Process Engine

The process engine logs on the following categories

<table class="table table-striped">
  <tr>
    <th>Logger</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.application</code></td>
    <td>logs details for the deployed process application on the engine</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.container</code></td>
    <td>logs container operations in the engine</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.bpmn.behavior</code></td>
    <td>logs operations performed on bpmn activities</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.bpmn.parser</code></td>
    <td>logs events that occur during the parsing of the bpmn models</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.cfg</code></td>
    <td>logs process engine configuration's initialization details</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.cmd</code></td>
    <td>logs the start and end of all commands that the engine performs</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.cmmn.behavior</code></td>
    <td>logs exceptions that occur during cmmn execution for incompatible cmmn behavior</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.cmmn.operation</code></td>
    <td>logs exceptions during execution of cmmn operations</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.cmmn.transformer</code></td>
    <td>logs cmmn transformer operations performed by the engine</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.context</code></td>
    <td>
      command context logs including executing atomic operations and bpmn stack traces during exceptions<br/>
      You can override the default <code>DEBUG</code> log level for bpmn stack traces, see the
      <a href="{{< ref "/reference/deployment-descriptors/tags/process-engine.md#logLevelBpmnStackTrace" >}}">Logging level parameters</a> section.
    </td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.core</code></td>
    <td>logs engine's core operations, e.g. performing atomic operations</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.dmn</code></td>
    <td>logs exceptions that occur during decision evaluation</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.dmn.feel</code></td>
    <td>logs events that occur during decision evaluation with the JUEL FEEL Engine</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.dmn.feel.scala</code></td>
    <td>logs events that occur during decision evaluation with the Scala FEEL Engine</td>
  </tr>
  <tr>
    <td><code>org.camunda.feel.FeelEngine</code></td>
    <td>logs events that occur during expression evaluation with the Scala FEEL Engine</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.externaltask</code></td>
    <td>logger for the external task</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.identity</code></td>
    <td>logger of the <code>IdentityService</code>, for example logs information whether a user is locked</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.incident</code></td>
    <td>logs details during incident processing</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.jobexecutor</code></td>
    <td>logs operations performed by the job executor, such as job acquisition</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.metrics</code></td>
    <td>logs details regarding the engine metrics</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.migration</code></td>
    <td>logs exceptions that occur during process migration</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.persistence</code></td>
    <td>logs the identity of all entities that the engine inserts/deletes/updates in the database</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.plugin.admin</code></td>
    <td>logs authorization details for administrators if <code>AdministratorAuthorizationPlugin</code> is enabled</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.pvm</code></td>
    <td>logs the Process Virtual Machine (PVM) operations, e.g. entering/leaving an activity, creating/destroying a scope</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.rest.exception</code></td>
    <td>logs the exceptions thrown in the REST API</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.script</code></td>
    <td>logs script processing details, e.g. evaluating, compiling</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.security</code></td>
    <td>logs exceptions that occur during password hashing</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.test</code></td>
    <td>logger used in the engine tests</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.tx</code></td>
    <td>logs transaction details, e.g. commits and rollbacks</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.engine.util</code></td>
    <td>logs engine utility operations like xml parsing, reading streams, class loading issues, parsing intervals/duration, etc.</td>
  </tr>
  <tr>
    <td><code>org.camunda.bpm.webapp</code></td>
    <td>logs events from the Camunda web apps (Cockpit, Tasklist, and Admin), like user-initiated log in and log out events and cache validation time information.</td>
  </tr>
</table>

By default, the engine output contains logs with level `ERROR`, `WARNING`, and `INFO`. To enable more log output, e.g. for the purpose of debugging, configure the level of a logger to `DEBUG` or `TRACE`.

{{< note title="Heads Up!" class="warning" >}}
The output of loggers can change with newer Camunda versions.
{{< /note >}}

{{< note title="Heads Up!" class="warning" >}}
In Tomcat, logging is handled by `java.util.logging` via [Tomcat's JULI](https://tomcat.apache.org/tomcat-9.0-doc/logging.html) implementation. Note that the log levels `DEBUG` and `TRACE` are called `FINE` and `FINEST` in this environment.
{{< /note >}}

### When to use engine loggers?

Increasing the level of some engine loggers can provide more insights to analyze the engine behavior.
Please be aware, some of the loggers can create large amounts of output when changing their level to `DEBUG` or `TRACE`.
In this section, common scenarios are listed where increasing the engine log levels can be helpful.

#### Database statements

To check the database statements performed by the engine in most of the cases, it will be sufficient to increase the level of `org.camunda.bpm.engine.persistence` and `org.camunda.bpm.engine.impl.persistence.entity` loggers.
On level `DEBUG`, they log all SQL statements with their parameters. When set to `TRACE`, the results of the statements are logged in addition. Note if a query has many results, the log output will be large.

However, some of the statements are not covered by only these two loggers. The full list to see all of the engine database statements is:

* `org.camunda.bpm.engine.persistence`
* `org.camunda.bpm.engine.impl.persistence.entity`
* `org.camunda.bpm.engine.impl.history.event`
* `org.camunda.bpm.engine.impl.batch`
* `org.camunda.bpm.engine.impl.cmmn.entity`
* `org.camunda.bpm.engine.impl.dmn.entity.repository`
* `org.camunda.bpm.engine.history`

Here is an example of how the server log will look like:

```plaintext
25-Nov-2019 15:15:57.870 FINE [thread-1] o.c.c.l.BaseLogger.logDebug ENGINE-03006 Cache state after flush: [
  PERSISTENT GroupEntity[development]
]
25-Nov-2019 15:15:57.871 FINE [thread-1] o.c.c.l.BaseLogger.logDebug ENGINE-03009 SQL operation: 'INSERT'; Entity: 'AuthorizationEntity[id=19ac0d96-0f8e-11ea-8b01-e4a7a094a9d6]'
25-Nov-2019 15:15:57.871 FINE [thread-1] o.a.i.l.j.BaseJdbcLogger.debug ==>  Preparing: insert into ACT_RU_AUTHORIZATION ( ID_, TYPE_, GROUP_ID_, USER_ID_, RESOURCE_TYPE_, RESOURCE_ID_, PERMS_, REV_ ) values ( ?, ?, ?, ?, ?, ?, ?, 1 )
25-Nov-2019 15:15:57.872 FINE [thread-1] o.a.i.l.j.BaseJdbcLogger.debug ==> Parameters: 19ac0d96-0f8e-11ea-8b01-e4a7a094a9d6(String), 1(Integer), development(String), null, 2(Integer), development(String), 2(Integer)
25-Nov-2019 15:17:17.075 FINE [thread-2] o.a.i.l.j.BaseJdbcLogger.debug ==>  Preparing: update ACT_ID_GROUP set REV_ = ?, NAME_ = ?, TYPE_ = ? where ID_ = ? and REV_ = ?
25-Nov-2019 15:17:17.076 FINE [thread-2] o.a.i.l.j.BaseJdbcLogger.debug ==> Parameters: 2(Integer), Dev-Department(String), DEV(String), development(String), 1(Integer)
```

To enable the logging for a specific database entity, please provide the namespace of the MyBatis mapper ([all mappers](https://github.com/camunda/camunda-bpm-platform/tree/master/engine/src/main/resources/org/camunda/bpm/engine/impl/mapping/entity)). Usually it is the full class name of that entity, e.g.:

* `org.camunda.bpm.engine.impl.batch.BatchEntity`
* `org.camunda.bpm.engine.impl.persistence.entity.JobEntity`
* `org.camunda.bpm.engine.impl.persistence.entity.VariableInstanceEntity`

For further information please visit the [MyBatis documentation](https://mybatis.org/mybatis-3/logging.html) about logging..

#### Diagnosing Job Execution

To investigate the Job Execution behavior, as a start switch the level of the following loggers to `DEBUG`:

* `org.camunda.bpm.engine.impl.persistence.entity.JobEntity` - logs the job execution statements
* `org.camunda.bpm.engine.jobexecutor` - further job execution logs such as job acquisition and execution operations
* `org.camunda.bpm.engine.cmd` - the start/end of commands will help to determinate in which command the job is being executed

The server log will contain logs similar to:

```plaintext
25-Nov-2019 15:45:27.613 INFO [main] o.c.c.l.BaseLogger.logInfo ENGINE-14014 Starting up the JobExecutor[org.camunda.bpm.engine.impl.jobexecutor.RuntimeContainerJobExecutor].
25-Nov-2019 15:45:27.615 INFO [Thread-6] o.c.c.l.BaseLogger.logInfo ENGINE-14018 JobExecutor[org.camunda.bpm.engine.impl.jobexecutor.RuntimeContainerJobExecutor] starting to acquire jobs
25-Nov-2019 15:45:27.619 FINE [Thread-6] o.c.c.l.BaseLogger.logDebug ENGINE-13005 Starting command -------------------- AcquireJobsCmd ----------------------
25-Nov-2019 15:45:27.620 FINE [Thread-6] o.c.c.l.BaseLogger.logDebug ENGINE-13009 opening new command context
25-Nov-2019 15:45:27.689 FINE [Thread-6] o.a.i.l.j.BaseJdbcLogger.debug ==>  Preparing: select RES.ID_, RES.REV_, RES.DUEDATE_, RES.PROCESS_INSTANCE_ID_, RES.EXCLUSIVE_ from ACT_RU_JOB RES where (RES.RETRIES_ > 0) and ( RES.DUEDATE_ is null or RES.DUEDATE_ <= ? ) and (RES.LOCK_OWNER_ is null or RES.LOCK_EXP_TIME_ < ?) and RES.SUSPENSION_STATE_ = 1 and (RES.DEPLOYMENT_ID_ is null ) and ( ( RES.EXCLUSIVE_ = 1 and not exists( select J2.ID_ from ACT_RU_JOB J2 where J2.PROCESS_INSTANCE_ID_ = RES.PROCESS_INSTANCE_ID_ -- from the same proc. inst. and (J2.EXCLUSIVE_ = 1) -- also exclusive and (J2.LOCK_OWNER_ is not null and J2.LOCK_EXP_TIME_ >= ?) -- in progress ) ) or RES.EXCLUSIVE_ = 0 ) LIMIT ? OFFSET ?
25-Nov-2019 15:45:27.692 FINE [Thread-6] o.a.i.l.j.BaseJdbcLogger.debug ==> Parameters: 2019-11-25 15:45:27.621(Timestamp), 2019-11-25 15:45:27.621(Timestamp), 2019-11-25 15:45:27.621(Timestamp), 3(Integer), 0(Integer)
25-Nov-2019 15:45:27.693 FINE [Thread-6] o.a.i.l.j.BaseJdbcLogger.debug <==      Total: 1
25-Nov-2019 15:45:27.695 FINE [Thread-6] o.c.c.l.BaseLogger.logDebug ENGINE-13011 closing existing command context
25-Nov-2019 15:45:27.699 FINE [Thread-6] o.a.i.l.j.BaseJdbcLogger.debug ==>  Preparing: update ACT_RU_JOB SET REV_ = ?, LOCK_EXP_TIME_ = ?, LOCK_OWNER_ = ?, DUEDATE_ = ?, PROCESS_INSTANCE_ID_ = ?, EXCLUSIVE_ = ? where ID_= ? and REV_ = ?
25-Nov-2019 15:45:27.703 FINE [Thread-6] o.a.i.l.j.BaseJdbcLogger.debug ==> Parameters: 90(Integer), 2019-11-25 15:50:27.695(Timestamp), 62eae13f-c636-4a21-a80e-c82fc028a959(String), 2019-11-25 00:01:00.0(Timestamp), null, true(Boolean), 9e1a4275-0c41-11ea-8035-e4a7a094a9d6(String), 89(Integer)
25-Nov-2019 15:45:27.706 FINE [Thread-6] o.c.c.l.BaseLogger.logDebug ENGINE-13006 Finishing command -------------------- AcquireJobsCmd ----------------------
```

Find more information for Diagnosing the Job Executor in this blog post - [The Job Executor: What Is Going on in My Process Engine?](https://blog.camunda.com/post/2019/10/job-executor-what-is-going-on-in-my-process-engine/).

#### Diagnosing Deadlocks

The engine logging will provide further insights in case of deadlock issues by increasing the level of the command and the persistence loggers.
First, determine the resource involved in the deadlock, then try to narrow down, which are the two transactions blocking each other:

* `org.camunda.bpm.engine.persistence` - the persistence logger will log all the identity of engine entities to find the involved resources causing the deadlock
* `org.camunda.bpm.engine.cmd` - the command output will help to determinate the scope of the involved transactions which are causing the deadlock

When the issue occurs for a specific entity (e.g. `VariableInstance`), consider enabling the logger of that entity as well (`org.camunda.bpm.engine.impl.persistence.entity.VariableInstanceEntity`).
Then the output will include the statements of these entities to observe the changes which are performed.
Here is a sample of what traces the server log file will contain when increasing the level of these loggers.

```plaintext
25-Nov-2019 16:00:50.675 FINE [thread-1] o.c.c.l.BaseLogger.logDebug ENGINE-13005 Starting command -------------------- RemoveExecutionVariablesCmd ----------------------
25-Nov-2019 16:00:50.676 FINE [thread-1] o.c.c.l.BaseLogger.logDebug ENGINE-13009 opening new command context
25-Nov-2019 16:00:50.718 FINE [thread-1] o.c.c.l.BaseLogger.logDebug ENGINE-03006 Cache state after flush: [
  PERSISTENT VariableInstanceEntity[0ec1ab1d-0f8d-11ea-8b01-e4a7a094a9d6]
  PERSISTENT ProcessDefinitionEntity[invoice:2:ae69d3b4-0c41-11ea-a8eb-e4a7a094a9d6]
  PERSISTENT HistoricVariableUpdateEventEntity[5eba854e-0f94-11ea-92d9-e4a7a094a9d6]
  PERSISTENT ExecutionEntity[0ec04b8b-0f8d-11ea-8b01-e4a7a094a9d6]
  PERSISTENT UserOperationLogEntryEventEntity[5ebb6faf-0f94-11ea-92d9-e4a7a094a9d6]
  PERSISTENT HistoricVariableInstanceEntity[ddea4bef-0f93-11ea-b2ca-e4a7a094a9d6]
]
25-Nov-2019 16:00:50.722 FINE [thread-1] o.c.c.l.BaseLogger.logDebug ENGINE-03008 Flush Summary: [
  INSERT UserOperationLogEntryEventEntity[5ebb6faf-0f94-11ea-92d9-e4a7a094a9d6]
  INSERT HistoricVariableUpdateEventEntity[5eba854e-0f94-11ea-92d9-e4a7a094a9d6]
  DELETE VariableInstanceEntity[ddea4bef-0f93-11ea-b2ca-e4a7a094a9d6]
  UPDATE HistoricVariableInstanceEntity[ddea4bef-0f93-11ea-b2ca-e4a7a094a9d6]
]
25-Nov-2019 16:00:50.725 FINE [thread-1] o.c.c.l.BaseLogger.logDebug ENGINE-03009 SQL operation: 'INSERT'; Entity: 'HistoricVariableUpdateEventEntity[id=5eba854e-0f94-11ea-92d9-e4a7a094a9d6]'
25-Nov-2019 16:00:50.726 FINE [thread-1] o.c.c.l.BaseLogger.logDebug ENGINE-03009 SQL operation: 'DELETE'; Entity: 'VariableInstanceEntity[id=ddea4bef-0f93-11ea-b2ca-e4a7a094a9d6]'
25-Nov-2019 16:00:50.727 FINE [thread-1] o.a.i.l.j.BaseJdbcLogger.debug ==>  Preparing: delete from ACT_RU_VARIABLE where ID_ = ? and REV_ = ?
25-Nov-2019 16:00:50.728 FINE [thread-1] o.a.i.l.j.BaseJdbcLogger.debug ==> Parameters: ddea4bef-0f93-11ea-b2ca-e4a7a094a9d6(String), 2(Integer)
25-Nov-2019 16:00:50.730 FINE [thread-1] o.c.c.l.BaseLogger.logDebug ENGINE-03009 SQL operation: 'UPDATE'; Entity: 'HistoricVariableInstanceEntity[id=ddea4bef-0f93-11ea-b2ca-e4a7a094a9d6]'
25-Nov-2019 16:00:50.737 FINE [thread-1] o.c.c.l.BaseLogger.logDebug ENGINE-13006 Finishing command -------------------- RemoveExecutionVariablesCmd ----------------------
```

The snippet contains the start and of `RemoveExecutionVariablesCmd`, the flush summary of the operation, and the database statements of the variable instance.

# Legacy: Java Util Logging

Some Camunda modules still use Java Util Logging directly.
The use of Java Util Logging in these modules is considered deprecated and will be gradually migrated to [slf4j] in future releases.

List of modules still using Java Util Logging:

* camunda-ejb-service
* camunda-ejb-client
* camunda-jobexecutor-ra
* camunda-jobexecutor-rar
* camunda-engine-cdi
* camunda-engine-spring
* camunda-engine-rest
* Wildfly Subsystems

[slf4j]: http://www.slf4j.org/
[log4j]: http://logging.apache.org/log4j/
[logback]: http://logback.qos.ch/
[slf4j-backends]: http://www.slf4j.org/manual.html#projectDep
