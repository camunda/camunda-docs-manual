---

title: 'Install the platform on a vanilla Tomcat'
shortTitle: 'Install on a vanilla Tomcat'
category: 'BPM Platform'

---


This section will describe how you can install the camunda BPM platform on a [vanilla Tomcat 7](http://tomcat.apache.org/), if you are not able to use the pre-packaged Tomcat distribution. Regardless we recommand you to [download a Tomcat 7 distribution](http://camunda.org/download/) to use the required modules.


## Create the database schema for camunda BPM platform

If you do not want to use the H2 database, you first have to create a database schema for camunda BPM platform. The camunda BPM distribution ships with a set of SQL create scripts that can be executed by a database administrator.

The database creation scripts are reside in the `sql/create` folder:

`$TOMCAT_DISTRIBUTION/sql/create/*_engine_$PLATFORM_VERSION.sql`
`$TOMCAT_DISTRIBUTION/sql/create/*_identity_$PLATFORM_VERSION.sql`

There is an individual SQL script for each supported database. Select the script appropriate for your database and run it with your database administration tool. (e.g. SqlDeveloper for Oracle).


## Configuring JDBC Resource

To configure a JDBC Resource you have to edit the file `$TOMCAT_HOME/conf/server.xml`. This could like the following example for H2 database:

```xml
<Server>
  ...
  <GlobalNamingResources>
    ...
    <Resource name="jdbc/ProcessEngine"
              auth="Container"
              type="javax.sql.DataSource"
              factory="org.apache.tomcat.jdbc.pool.DataSourceFactory"
              uniqueResourceName="process-engine"
              driverClassName="org.h2.Driver"
              url="jdbc:h2:./camunda-h2-dbs/process-engine;MVCC=TRUE;TRACE_LEVEL_FILE=0"
              username="sa"
              password=""
              maxPoolSize="20"
              minPoolSize="5" />
  </GlobalNamingResources>
</Server>
```


## Add necessary libraries to vanilla Tomcat 7

First you have to copy the following libraries into your vanilla Tomcat library folder `$TOMCAT_HOME/lib`:

`$TOMCAT_DISTRIBUTION/lib/camunda-engine-$PLATFORM_VERSION.jar`

`$TOMCAT_DISTRIBUTION/lib/camunda-identity-ldap-$PLATFORM_VERSION.jar` (if you want to use LDAP)

`$TOMCAT_DISTRIBUTION/lib/java-uuid-generator-VERSION.jar`

`$TOMCAT_DISTRIBUTION/lib/joda-time-VERSION.jar`

`$TOMCAT_DISTRIBUTION/lib/mybatis-VERSION.jar`

Furthermore you have to merge your corresponding JDBC driver into the folder `$TOMCAT_HOME/lib`.


## Add bpm-platform.xml

You have to add the file `bpm-platform.xml` into the folder `$TOMCAT_HOME/conf`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform xmlns="http://www.camunda.org/schema/1.0/BpmPlatform"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.camunda.org/schema/1.0/BpmPlatform http://www.camunda.org/schema/1.0/BpmPlatform ">

  <job-executor>
    <job-acquisition name="default" />
  </job-executor>

  <process-engine name="default">
    <job-acquisition>default</job-acquisition>
    <configuration>org.camunda.bpm.engine.impl.cfg.StandaloneProcessEngineConfiguration</configuration>
    <datasource>java:jdbc/ProcessEngine</datasource>

    <properties>
      <property name="history">full</property>
      <property name="databaseSchemaUpdate">true</property>
      <property name="authorizationEnabled">true</property>
    </properties>

  </process-engine>

</bpm-platform>
```