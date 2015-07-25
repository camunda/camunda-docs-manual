---

title: 'Database Configuration'
weight: 130

menu:
  main:
    identifier: "user-guide-process-engine-database-configuration"
    parent: "user-guide-process-engine"

---

There are two ways to configure the database that the camunda engine will use. The first option is to define the JDBC properties of the database:

* `jdbcUrl`: JDBC URL of the database.
* `jdbcDriver`: implementation of the driver for the specific database type.
* `jdbcUsername`: username to connect to the database.
* `jdbcPassword`: password to connect to the database.

Note that internally the engine uses <a href="http://www.mybatis.org/">Apache MyBatis</a> for persistence.

The data source that is constructed based on the provided JDBC properties will have the default MyBatis connection pool settings. The following attributes can optionally be set to tweak that connection pool (taken from the MyBatis documentation):

* `jdbcMaxActiveConnections`: The maximum number of active connections that the connection pool can contain at any given time. Default is 10.
* `jdbcMaxIdleConnections`: The maximum number of idle connections that the connection pool can contain at any given time.
* `jdbcMaxCheckoutTime`: The amount of time in milliseconds that a connection can be 'checked out' for from the connection pool before it is forcefully returned. Default is 20000 (20 seconds).
* `jdbcMaxWaitTime`: This is a low level setting that gives the pool a chance to print a log status and re-attempt the acquisition of a connection in the case that it takes unusually long (to avoid failing silently forever if the pool is mis-configured) Default is 20000 (20 seconds).

Example database configuration:

    <property name="jdbcUrl" value="jdbc:h2:mem:camunda;DB_CLOSE_DELAY=1000" />
    <property name="jdbcDriver" value="org.h2.Driver" />
    <property name="jdbcUsername" value="sa" />
    <property name="jdbcPassword" value="" />

Alternatively, a `javax.sql.DataSource` implementation can be used (e.g. DBCP from Apache Commons):

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

Note that camunda does not ship with a library that allows to define such a data source. So you have to make sure that the libraries (e.g. from DBCP) are on your classpath.

The following properties can be set, regardless of whether you are using the JDBC or data source approach:

* `databaseType`: it's normally not necessary to specify this property as it is automatically analyzed from the database connection meta data. Should only be specified in case automatic detection fails. Possible values: {h2, mysql, oracle, postgres, mssql, db2}. This property is required when not using the default H2 database. This setting will determine which create/drop scripts and queries will be used. See the 'supported databases' section for an overview of which types are supported.</li>
* `databaseSchemaUpdate`: allows to set the strategy to handle the database schema on process engine boot and shutdown.
  * `false` (default): Checks the version of the DB schema against the library when the process engine is being created and throws an exception if the versions don't match.
  * `true`: Upon building the process engine, a check is performed and an update of the schema is performed if necessary. If the schema doesn't exist, it is created.
  * `create-drop`: Creates the schema when the process engine is being created and drops the schema when the process engine is being closed.

<div class="alert alert-warning">
  <strong>Supported Databases: </strong>
  <p>For information on supported databases please refer to <a href="ref:#introduction-supported-environments">Supported Environments</a>.</p>
</div>

Here are some sample JDBC urls:

* h2: jdbc:h2:tcp://localhost/camunda
* mysql: jdbc:mysql://localhost:3306/camunda?autoReconnect=true
* oracle: jdbc:oracle:thin:@localhost:1521:xe
* postgres: jdbc:postgresql://localhost:5432/camunda
* db2: jdbc:db2://localhost:50000/camunda
* mssql: jdbc:sqlserver://localhost:1433/camunda

## Additional database schema configuration

### Business Key

Since the release of camunda-bpm 7.0.0-alpha9, the unique constraint for the business key is removed in the runtime and history tables and the database schema create and drop scripts.
If you rely on the constraint, you can add it manually to your schema by issuing following sql statements:

  db2

    Runtime:
    alter table ACT_RU_EXECUTION add UNI_BUSINESS_KEY varchar (255) not null generated always as (case when "BUSINESS_KEY_" is null then "ID_" else "BUSINESS_KEY_" end);
    alter table ACT_RU_EXECUTION add UNI_PROC_DEF_ID varchar (64) not null generated always as (case when "PROC_DEF_ID_" is null then "ID_" else "PROC_DEF_ID_" end);
    create unique index ACT_UNIQ_RU_BUS_KEY on ACT_RU_EXECUTION(UNI_PROC_DEF_ID, UNI_BUSINESS_KEY);

    History:
    alter table ACT_HI_PROCINST add UNI_BUSINESS_KEY varchar (255) not null generated always as (case when "BUSINESS_KEY_" is null then "ID_" else "BUSINESS_KEY_" end);
    alter table ACT_HI_PROCINST add UNI_PROC_DEF_ID varchar (64) not null generated always as (case when "PROC_DEF_ID_" is null then "ID_" else "PROC_DEF_ID_" end);
    create unique index ACT_UNIQ_HI_BUS_KEY on ACT_HI_PROCINST(UNI_PROC_DEF_ID, UNI_BUSINESS_KEY);

  h2

    Runtime:
    alter table ACT_RU_EXECUTION add constraint ACT_UNIQ_RU_BUS_KEY unique(PROC_DEF_ID_, BUSINESS_KEY_);

    History:
    alter table ACT_HI_PROCINST add constraint ACT_UNIQ_HI_BUS_KEY unique(PROC_DEF_ID_, BUSINESS_KEY_);

  mssql

    Runtime:
    create unique index ACT_UNIQ_RU_BUS_KEY on ACT_RU_EXECUTION (PROC_DEF_ID_, BUSINESS_KEY_) where BUSINESS_KEY_ is not null;

    History:
    create unique index ACT_UNIQ_HI_BUS_KEY on ACT_HI_PROCINST (PROC_DEF_ID_, BUSINESS_KEY_) where BUSINESS_KEY_ is not null;

  mysql

    Runtime:
    alter table ACT_RU_EXECUTION add constraint ACT_UNIQ_RU_BUS_KEY UNIQUE (PROC_DEF_ID_, BUSINESS_KEY_);

    History:
    alter table ACT_HI_PROCINST add constraint ACT_UNIQ_HI_BUS_KEY UNIQUE (PROC_DEF_ID_, BUSINESS_KEY_);

  oracle

    Runtime:
    create unique index ACT_UNIQ_RU_BUS_KEY on ACT_RU_EXECUTION
             (case when BUSINESS_KEY_ is null then null else PROC_DEF_ID_ end,
             case when BUSINESS_KEY_ is null then null else BUSINESS_KEY_ end);

    History:
    create unique index ACT_UNIQ_HI_BUS_KEY on ACT_HI_PROCINST
             (case when BUSINESS_KEY_ is null then null else PROC_DEF_ID_ end,
             case when BUSINESS_KEY_ is null then null else BUSINESS_KEY_ end);

  postgres

    Runtime:
    alter table ACT_RU_EXECUTION add constraint ACT_UNIQ_RU_BUS_KEY UNIQUE (PROC_DEF_ID_, BUSINESS_KEY_);

    History:
    alter table ACT_HI_PROCINST add constraint ACT_UNIQ_HI_BUS_KEY UNIQUE (PROC_DEF_ID_, BUSINESS_KEY_);

### Custom Configuration for Microsoft SQL Server

Microsoft SQL Server implements the isolation level `READ_COMMITTED` different
than most databases and does not play together well with the process engine's
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
