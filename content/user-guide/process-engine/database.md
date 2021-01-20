---

title: 'Database'
weight: 120

menu:
  main:
    identifier: "user-guide-process-engine-database"
    parent: "user-guide-process-engine"

---


# Database Schema

The database schema of the process engine consists of multiple tables.
The table names all start with ACT. The second part is a two-character
identification of the use case of the table. This use case will also roughly
match the service API.

* `ACT_RE_*`: `RE` stands for repository. Tables with this prefix contain 'static' information such as process definitions and process resources (images, rules, etc.).
* `ACT_RU_*`: `RU` stands for runtime. These are the runtime tables that contain the runtime data of process instances, user tasks, variables, jobs, etc. The engine only stores the runtime data during process instance execution and removes the records when a process instance ends. This keeps the runtime tables small and fast.
* `ACT_ID_*`: `ID` stands for identity. These tables contain identity information such as users, groups, etc.
* `ACT_HI_*`: `HI` stands for history. These are the tables that contain historical data such as past process instances, variables, tasks, etc.
* `ACT_GE_*`: General data, which is used in various use cases.

The main tables of the process engines are the entities of process definitions, executions, tasks, variables and
event subscriptions. Their relationship is shown in the following UML model.

{{< img src="../img/database-schema.png" title="Database Schema" >}}


## Process Definitions (`ACT_RE_PROCDEF`)

The `ACT_RE_PROCDEF` table contains all deployed process definitions. It
includes information like the version details, the resource name or the
suspension state.


## Executions (`ACT_RU_EXECUTION`)

The `ACT_RU_EXECUTION` table contains all current executions. It includes
information like the process definition, parent execution, business key, the
current activity and different metadata about the state of the execution.


## Tasks (`ACT_RU_TASK`)

The `ACT_RU_TASK` table contains all open tasks of all running process
instances. It includes information like the corresponding process instance,
execution and also metadata such as creation time, assignee or due date.


## Variables (`ACT_RU_VARIABLE`)

The `ACT_RU_VARIABLE` table contains all currently set process or task
variables. It includes the names, types and values of the variables and
information about the corresponding process instance or task.


## Event Subscriptions (`ACT_RU_EVENT_SUBSCR`)

The `ACT_RU_EVENT_SUBSCR` table contains all currently existing event
subscriptions. It includes the type, name and configuration of the expected
event along with information about the corresponding process instance and
execution.

## Schema Log (`ACT_GE_SCHEMA_LOG`)

The `ACT_GE_SCHEMA_LOG` table contains a history of the database
schema version. New entries to the table are written when changes to
the database schema are made. On database creation the initial entry
is added. Every update script adds a new entry containing an `id`,
the `version` the database was updated to and the date and time 
(`timestamp`) of the update.

To retrieve entries from the schema log, the SchemaLogQuery-API can be
used:
```java
List<SchemaLogEntry> entries = managementService.createSchemaLogQuery().list();
```

## Metrics Log (ACT_RU_METER_LOG)

The `ACT_RU_METER_LOG` table contains a collection of runtime metrics that can help draw conclusions about usage, load
and performance of the BPM platform. Metrics are reported as numbers in the Java `long` range and count the occurrence of
specific events. Please find detailed information about how metrics are collected in the [Metrics User Guide]({{< ref "user-guide/process-engine/metrics.md">}}).

The default configuration of the [MetricsReporter]({{< ref "user-guide/process-engine/metrics.md#metrics-reporter">}}) will create one row per [metric]({{< ref "user-guide/process-engine/metrics.md#built-in-metrics">}}) in `ACT_RU_METER_LOG` every 15 minutes.

{{< note title="Heads Up!" class="warning" >}}
If you are an enterprise customer, your license agreement might require you to report some metrics annually. Please store `root-process-instance-start`, `activity-instance-start`, `executed-decision-instances` and `executed-decision-elements` metrics for at least 15 months until they were reported.
{{< /note >}}

# Entity Relationship Diagrams

{{< note title="" class="info" >}}
  The database is not part of the **public API**. The database schema may change for MINOR and MAJOR version updates.

  **Please note:**
  The following diagrams are based on the MySQL database schema. For other databases the diagram may be slightly different.
{{< /note >}}


The following Entity Relationship Diagrams visualize the database tables and their explicit foreign key constraints, grouped by Engine with focus on BPMN, Engine with focus on DMN, Engine with focus on CMMN, the Engine History and the Identity. Please note that the diagrams do not visualize implicit connections between the tables.


## Engine BPMN

{{< img src="../img/erd_713_bpmn.svg" title="BPMN Tables" >}}


## Engine DMN

{{< img src="../img/erd_713_dmn.svg" title="DMN Tables" >}}


## Engine CMMN

{{< img src="../img/erd_713_cmmn.svg" title="CMMN Tables" >}}


## History

To allow different configurations and to keep the tables more flexible, the history tables contain no foreign key constraints.

{{< img src="../img/erd_713_history.svg" title="History Tables" >}}


## Identity

{{< img src="../img/erd_713_identity.svg" title="Identity Tables" >}}



# Database Configuration

There are two ways to configure the database that the Camunda engine will use. The first option is to define the JDBC properties of the database:

* `jdbcUrl`: JDBC URL of the database.
* `jdbcDriver`: implementation of the driver for the specific database type.
* `jdbcUsername`: username to connect to the database.
* `jdbcPassword`: password to connect to the database.

Note that the engine uses [Apache MyBatis](http://www.mybatis.org/) internally for persistence.

The data source that is constructed based on the provided JDBC properties will have the default MyBatis connection pool settings. The following attributes can optionally be set to tweak that connection pool (taken from the MyBatis documentation):

* `jdbcMaxActiveConnections`: The maximum number of active connections that the connection pool can contain at any given time. Default is 10.
* `jdbcMaxIdleConnections`: The maximum number of idle connections that the connection pool can contain at any given time.
* `jdbcMaxCheckoutTime`: The amount of time in milliseconds that a connection can be 'checked out' for from the connection pool before it is forcefully returned. Default is 20000 (20 seconds).
* `jdbcMaxWaitTime`: This is a low level setting that gives the pool a chance to print a log status and re-attempt the acquisition of a connection in the case that it takes unusually long (to avoid failing silently forever if the pool is misconfigured). Default is 20000 (20 seconds).
* `jdbcStatementTimeout`: The amount of time in seconds the JDBC driver will wait for a response from the database. Default is null which means that there is no timeout.


## Jdbc Batch Processing

<a name="jdbcBatchProcessing"></a>Another configuration - `jdbcBatchProcessing` - sets if batch processing mode must be used when sending SQL statements to the database. When switched off, statements are executed one by one.
Values: `true` (default), `false`.

Known issues with batch processing:

* batch processing is not working for Oracle versions earlier than 12.
* when using batch processing on MariaDB and DB2, `jdbcStatementTimeout` is being ignored.


## Example database configuration

```xml
<property name="jdbcUrl" value="jdbc:h2:mem:camunda;DB_CLOSE_DELAY=1000" />
<property name="jdbcDriver" value="org.h2.Driver" />
<property name="jdbcUsername" value="sa" />
<property name="jdbcPassword" value="" />
```

Alternatively, a `javax.sql.DataSource` implementation can be used (e.g., DBCP from Apache Commons):

```xml
<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" >
  <property name="driverClassName" value="com.mysql.jdbc.Driver" />
  <property name="url" value="jdbc:mysql://localhost:3306/camunda?sendFractionalSeconds=false" />
  <property name="username" value="camunda" />
  <property name="password" value="camunda" />
  <property name="defaultAutoCommit" value="false" />
</bean>

<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.impl.cfg.StandaloneProcessEngineConfiguration">

    <property name="dataSource" ref="dataSource" />
    ...
```

Note that Camunda does not ship with a library that allows to define such a data source. So you have to make sure that the libraries (e.g., from DBCP) are on your classpath.

The following properties can be set, regardless of whether you are using the JDBC or data source approach:

* `databaseType`: It's normally not necessary to specify this property as it is automatically analyzed from the database connection meta data. Should only be specified in case automatic detection fails. Possible values: {h2, mysql, oracle, postgres, mssql, db2, mariadb}. This setting will determine which create/drop scripts and queries will be used. See the 'supported databases' section for an overview of which types are supported.</li>
* `databaseSchemaUpdate`: Allows to set the strategy to handle the database schema on process engine boot and shutdown.
  * `true` (default): Upon building the process engine, a check is performed whether the Camunda tables exist in the database. If they don't exist, they are created. It must be ensured that the version of the DB schema matches the version of the process engine library, unless performing a [Rolling Update]({{< ref "/update/rolling-update.md" >}}). Updates of the database schema have to be done manually as described in the [Update and Migration Guide]({{< ref "/update/_index.md" >}}).
  * `false`: Does not perform any checks and assumes that the Camunda table exist in the database. It must be ensured that the version of the DB schema matches the version of the process engine library, unless performing a [Rolling Update]({{< ref "/update/rolling-update.md" >}}). Updates of the database schema have to be done manually as described in the [Update and Migration Guide]({{< ref "/update/_index.md" >}}).
  * `create-drop`: Creates the schema when the process engine is being created and drops the schema when the process engine is being closed.

{{< note title="Supported Databases" class="info" >}}
  For information on supported databases please refer to [Supported Environments]({{< ref "/introduction/supported-environments.md#databases" >}})
{{< /note >}}

Here are some sample JDBC urls:

* H2: `jdbc:h2:tcp://localhost/camunda`
* MySQL: `jdbc:mysql://localhost:3306/camunda?autoReconnect=true&sendFractionalSeconds=false`
* Oracle: `jdbc:oracle:thin:@localhost:1521:xe`
* PostgreSQL: `jdbc:postgresql://localhost:5432/camunda`
* DB2: `jdbc:db2://localhost:50000/camunda`
* MSSQL: `jdbc:sqlserver://localhost:1433/camunda`
* MariaDB: `jdbc:mariadb://localhost:3306/camunda`


## Additional Database Schema Configuration

### Business Key

Since the release of Camunda BPM 7.0.0-alpha9, the unique constraint for the business key is removed in the runtime and history tables and the database schema create and drop scripts.
If you rely on the constraint, you can add it manually to your schema by issuing following sql statements:

DB2

```sql
Runtime:
alter table ACT_RU_EXECUTION add UNI_BUSINESS_KEY varchar (255) not null generated always as (case when "BUSINESS_KEY_" is null then "ID_" else "BUSINESS_KEY_" end);
alter table ACT_RU_EXECUTION add UNI_PROC_DEF_ID varchar (64) not null generated always as (case when "PROC_DEF_ID_" is null then "ID_" else "PROC_DEF_ID_" end);
create unique index ACT_UNIQ_RU_BUS_KEY on ACT_RU_EXECUTION(UNI_PROC_DEF_ID, UNI_BUSINESS_KEY);

History:
alter table ACT_HI_PROCINST add UNI_BUSINESS_KEY varchar (255) not null generated always as (case when "BUSINESS_KEY_" is null then "ID_" else "BUSINESS_KEY_" end);
alter table ACT_HI_PROCINST add UNI_PROC_DEF_ID varchar (64) not null generated always as (case when "PROC_DEF_ID_" is null then "ID_" else "PROC_DEF_ID_" end);
create unique index ACT_UNIQ_HI_BUS_KEY on ACT_HI_PROCINST(UNI_PROC_DEF_ID, UNI_BUSINESS_KEY);
```

H2

```sql
Runtime:
alter table ACT_RU_EXECUTION add constraint ACT_UNIQ_RU_BUS_KEY unique(PROC_DEF_ID_, BUSINESS_KEY_);

History:
alter table ACT_HI_PROCINST add constraint ACT_UNIQ_HI_BUS_KEY unique(PROC_DEF_ID_, BUSINESS_KEY_);
```

MSSQL

```sql
Runtime:
create unique index ACT_UNIQ_RU_BUS_KEY on ACT_RU_EXECUTION (PROC_DEF_ID_, BUSINESS_KEY_) where BUSINESS_KEY_ is not null;

History:
create unique index ACT_UNIQ_HI_BUS_KEY on ACT_HI_PROCINST (PROC_DEF_ID_, BUSINESS_KEY_) where BUSINESS_KEY_ is not null;
```

MySQL

```sql
Runtime:
alter table ACT_RU_EXECUTION add constraint ACT_UNIQ_RU_BUS_KEY UNIQUE (PROC_DEF_ID_, BUSINESS_KEY_);

History:
alter table ACT_HI_PROCINST add constraint ACT_UNIQ_HI_BUS_KEY UNIQUE (PROC_DEF_ID_, BUSINESS_KEY_);
```

Oracle

```sql
Runtime:
create unique index ACT_UNIQ_RU_BUS_KEY on ACT_RU_EXECUTION
         (case when BUSINESS_KEY_ is null then null else PROC_DEF_ID_ end,
         case when BUSINESS_KEY_ is null then null else BUSINESS_KEY_ end);

History:
create unique index ACT_UNIQ_HI_BUS_KEY on ACT_HI_PROCINST
         (case when BUSINESS_KEY_ is null then null else PROC_DEF_ID_ end,
         case when BUSINESS_KEY_ is null then null else BUSINESS_KEY_ end);
```

PostgreSQL

```sql
Runtime:
alter table ACT_RU_EXECUTION add constraint ACT_UNIQ_RU_BUS_KEY UNIQUE (PROC_DEF_ID_, BUSINESS_KEY_);

History:
alter table ACT_HI_PROCINST add constraint ACT_UNIQ_HI_BUS_KEY UNIQUE (PROC_DEF_ID_, BUSINESS_KEY_);
```

## Isolation Level Configuration

Most database management systems provide four different isolation levels to be set. For instance the levels defined by ANSI/USO SQL are (from low to high isolation):

* READ UNCOMMITTED 
* READ COMMITTED
* REPEATABLE READS
* SERIALIZABLE 

The required isolation level to run Camunda with is **READ COMMITTED**, which may have a different name according to your database system. Setting the level to REPEATABLE READS is known to cause deadlocks, so one needs to be careful, when changing the isolation level.

## Configuration for Microsoft SQL Server

Microsoft SQL Server implements the isolation level `READ_COMMITTED` different
than most databases and does not interact well with the process engine's
[optimistic locking]({{< ref "/user-guide/process-engine/transactions-in-processes.md#optimistic-locking" >}}) scheme. 
As a result you may suffer deadlocks when putting the process engine under high load.

If you experience deadlocks in your MSSQL installation, you must execute the
following statements in order to enable SNAPSHOT isolation:

```sql
ALTER DATABASE [process-engine]
SET ALLOW_SNAPSHOT_ISOLATION ON

ALTER DATABASE [process-engine]
SET READ_COMMITTED_SNAPSHOT ON
```
where `[process-engine]` contains the name of your database.

## Configuration for MariaDB Galera Cluster

This section documents the supported Galera Cluster configuration for MariaDB. Both server and client need to be configured correctly. Please note that there are some [known limitations](#galera-cluster-known-limitations) which apply when using Galera cluster, see below.

{{< note title="Warning" class="warning" >}}
Please note that server and client configuration settings defined below are the only configuration that is supported for Galera Cluster. Other configurations are not supported.
{{</ note >}}

### Server Configuration

The following configuration needs to go into the `[galera]` configuration section in the `my.cnf.d/server.cnf` on each server:

```
[galera]
binlog_format=row
default_storage_engine=InnoDB
innodb_autoinc_lock_mode=2
transaction-isolation=READ-COMMITTED
wsrep_on=ON
wsrep_causal_reads = 1
wsrep_sync_wait = 7
...
```

Note that other setting may be present in this section but the settings `transaction-isolation`, `wsrep_on`, `wsrep_causal_reads` and `wsrep_sync_wait` need to present and need to have **exactly** the values shown above.

### Client Configuration

Only `failover` and `sequential` configurations are supported. **Other client configuration modes like `replication:`, `loadbalance:`, `aurora:` are not supported.**

The following is the required format of the jdbcUrl property in datasource configurations:

```
jdbc:mariadb:[failover|sequential]://[host1:port],[host2:port],.../[data-base-name]
```

Examples:

```
jdbc:mariadb:failover://192.168.1.1:32980,192.168.1.2:32980,192.168.1.3:32980/process-engine
jdbc:mariadb:sequential://192.168.1.1:32980,192.168.1.2:32980,192.168.1.3:32980/process-engine
```

Important: when running Camunda in a cluster, the client configuration needs to be the same on each node.

### Galera Cluster Known Limitations

The following known limitations apply when using Galera Cluster:

1. APIs requiring Pessimistic read locks in the database do not work correctly. Affected APIs: Exclusive Message correlation (`.correlateExclusively()`). See ({{< javadocref page="?org/camunda/bpm/engine/runtime/MessageCorrelationBuilder.html#correlateExclusively()" text="Javadocs" >}}).
Another possible negative effects:
 * duplication of deployed definitions when deploying the same resources from two threads simultaneously
 * duplication of history cleanup job when calling `HistoryService#cleanUpHistoryAsync` from two threads simultaneously
2. Duplicate checking during deployment does not work if resources are deployed in a cluster concurrently. Concrete impact: suppose there is a Camunda process engine cluster which connects to the same Galera cluster. On deployment of a new process application the process engine nodes will check if the BPMN processes provided by the process application are already deployed, to avoid duplicate deployments. If the deployment is done simultaneously on multiple process engine nodes an exclusive read lock is acquired on the the database (technically, this means that each node performs an SQL `select for update` query.), to do the duplicate checking reliably under concurrency. This does not work on Galera Cluster and may lead to multiple versions of the same process being deployed.
3. The `jdbcStatementTimeout` configuration setting does not work and cannot be used.

## Configuration for MySQL 

This section documents the supported MySQL configuration. 

### Database Schema

The engine's MySQL database schema does not support milliseconds precision for the column types `TIMESTAMP` and `DATETIME`: 
I.e., a to be stored value is rounded to the next or previous second, e.g., `2021-01-01 15:00:46.731` is rounded to `2021-01-01 15:00:47`.

{{< note title="Heads Up!" class="info" >}}
The missing millisecond’s precision for date/time values impacts the process engine's behavior. 
Please read [how to configure the MySQL JDBC Driver]({{< ref "#jdbc-driver-configuration" >}}) 
to ensure that date/time values are handled correctly.
{{< /note >}}

### JDBC Driver Configuration

Here you can find the MySQL JDBC Driver’s configuration prerequisites to ensure a frictionless behavior
of the process engine.

#### Disable sending milliseconds for date/time values

{{< note title="Heads Up!" class="info" >}}
This configuration flag is mandatory to avoid unexpected behavior when operating the process engine with MySQL.
{{< /note >}}

When sending a date/time value as part of any SQL statement to the database, the MySQL JDBC Driver >= 5.1.23 sends milliseconds. 
This behavior is problematic since the engine's MySQL database [schema does not support milliseconds precision for date/time values][mysql-schema-milliseconds].

To ensure correct behavior of the process engine when sending date/time values, make sure to update your MySQL JDBC Driver to a version >= 5.1.37.
You can avoid sending milliseconds to the MySQL Server in these versions by setting [`sendFractionalSeconds=false`][mysql-fract-secs] 
in your JDBC connection URL.

Please find below examples of unwanted behavior that occurs, in case the flag `sendFractionalSeconds=false` is not provided:

* When a user performs a task query with `due date == 2021-01-01 15:00:46.731`, the query returns 
  results equal to `2021-01-01 15:00:46.731`. However, since the engine's [database schema does not store
  milliseconds][mysql-schema-milliseconds], no result is returned.
* When a user sets a due date to a task, the value is rounded to the next or previous second, 
  e.g., `2021-01-01 15:00:46.731` is rounded to `2021-01-01 15:00:47`. Please also see the official [MySQL documentation](https://dev.mysql.com/doc/refman/5.6/en/fractional-seconds.html).

[mysql-schema-milliseconds]: {{< ref "#database-schema-1" >}}
[mysql-fract-secs]: https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-connp-props-datetime-types-processing.html#cj-conn-prop_sendFractionalSeconds

