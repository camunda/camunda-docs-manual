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


### Entity Relationship Diagrams

{{< note title="" class="info" >}}
  The database is not part of the **public API**. The database schema may change for MINOR and MAJOR version updates.

  **Please note:**
  The following diagrams are based on the Oracle database schema. For other databases the diagram may be slightly different.
{{< /note >}}


The following Entity Relationship Diagrams visualize the database tables and their explicit foreign key constraints, grouped by Engine with focus on BPMN, Engine with focus on CMMN, the Engine History and the Identity. Please note that the diagrams do not visualize implicit connections between the tables.

*Example*
{{< img src="../img/erd_example.png" title="Entitiy Releationship Diagram" >}}

* foreign keys are displayed as an arrow from one entity to another
* the arrow label describes the name of the foreign key and the database filed name in brackets
* the database filed name is marked with a green arrow in the table box


## Engine BPMN

{{< img src="../img/erd_oracle_74_bpmn.svg" title="BPMN Tables" >}}


## Engine DMN

{{< img src="../img/erd_oracle_74_dmn.svg" title="DMN Tables" >}}


## Engine CMMN

{{< img src="../img/erd_oracle_74_cmmn.svg" title="CMMN Tables" >}}


## History

To allow different configurations and to keep the tables more flexible, the history tables contain no foreign key constraints.

{{< img src="../img/erd_oracle_74_history.svg" title="History Tables" >}}


## Identity

{{< img src="../img/erd_oracle_74_identity.svg" title="Identity Tables" >}}



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

Example database configuration:

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
  <property name="url" value="jdbc:mysql://localhost:3306/camunda" />
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
  * `false` (default): Checks the version of the DB schema against the library when the process engine is being created and throws an exception if the versions don't match.
  * `true`: Upon building the process engine, a check is performed and an update of the schema is performed if necessary. If the schema doesn't exist, it is created.
  * `create-drop`: Creates the schema when the process engine is being created and drops the schema when the process engine is being closed.

{{< note title="Supported Databases" class="info" >}}
  For information on supported databases please refer to [Supported Environments]({{< relref "introduction/supported-environments.md#databases" >}})
{{< /note >}}

Here are some sample JDBC urls:

* H2: `jdbc:h2:tcp://localhost/camunda`
* MySQL: `jdbc:mysql://localhost:3306/camunda?autoReconnect=true`
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

### Custom Configuration for Microsoft SQL Server

Microsoft SQL Server implements the isolation level `READ_COMMITTED` different
than most databases and does not interact well with the process engine's
optimistic locking scheme. As a result you may suffer deadlocks when
putting the process engine under high load.

If you experience deadlocks in your MSSQL installation, you must execute the
following statements in order to enable SNAPSHOT isolation:

```sql
ALTER DATABASE [process-engine]
SET ALLOW_SNAPSHOT_ISOLATION ON

ALTER DATABASE [process-engine]
SET READ_COMMITTED_SNAPSHOT ON
```

where `[process-engine]` contains the name of your database.
