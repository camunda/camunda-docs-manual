---

title: 'Database Configuration'
weight: 20
menu:
  main:
    identifier: "user-guide-process-engine-database-configuraton"
    parent: "user-guide-process-engine-database"

---

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
  * `true` (default): Upon building the process engine, a check is performed whether the Camunda tables exist in the database. If they don't exist, they are created. It must be ensured that the version of the DB schema matches the version of the process engine library, unless performing a [Rolling Update]({{< ref "/update/rolling-update.md" >}}). Updates of the database schema have to be done manually as described in the [Update and Migration Guide]({{< ref "/update/_index.md" >}}).
  * `false`: Does not perform any checks and assumes that the Camunda table exist in the database. It must be ensured that the version of the DB schema matches the version of the process engine library, unless performing a [Rolling Update]({{< ref "/update/rolling-update.md" >}}). Updates of the database schema have to be done manually as described in the [Update and Migration Guide]({{< ref "/update/_index.md" >}}).
  * `create-drop`: Creates the schema when the process engine is being created and drops the schema when the process engine is being closed.

{{< note title="Supported Databases" class="info" >}}
  For information on supported databases please refer to [Supported Environments]({{< ref "/introduction/supported-environments.md#databases" >}})
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

## Isolation Level Configuration

Most database management systems provide four different isolation levels to be set. For instance the levels defined by ANSI/USO SQL are (from low to high isolation):

* READ UNCOMMITTED 
* READ COMMITTED
* REPEATABLE READS
* SERIALIZABLE 

The required isolation level to run Camunda with is **READ COMMITTED**, which may have a different name according to your database system. Setting the level to REPEATABLE READS is known to cause deadlocks, so one needs to be careful, when changing the isolation level.
