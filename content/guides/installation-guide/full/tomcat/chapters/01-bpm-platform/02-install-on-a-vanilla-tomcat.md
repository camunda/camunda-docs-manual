---

title: 'Install the platform on a vanilla Tomcat'
weight: 20

menu:
  main:
    identifier: "installation-guide-full-tomcat-install-vanilla"
    parent: "installation-guide-full-tomcat"

---


This section will describe how you can install the camunda BPM platform on a vanilla [Tomcat 7](http://tomcat.apache.org/) server if you are not able to use the pre-packaged Tomcat distribution. Regardless, we recommend that you [download a Tomcat 7 distribution](http://camunda.org/download/) to use the required modules.


## Create the database schema for the camunda BPM platform

If you do not want to use the H2 database, you first have to create a database schema for the camunda BPM platform. The camunda BPM distribution ships with a set of SQL create scripts that can be executed by a database administrator.

The database creation scripts reside in the `sql/create` folder:

`$TOMCAT_DISTRIBUTION/sql/create/*_engine_$PLATFORM_VERSION.sql`
`$TOMCAT_DISTRIBUTION/sql/create/*_identity_$PLATFORM_VERSION.sql`

There is an individual SQL script for each supported database. Select the appropriate script for your database type and run it with your database administration tool. (e.g. SqlDeveloper for Oracle).

## Add BPM Bootstrap Server Listener

Add the entry `org.camunda.bpm.container.impl.tomcat.TomcatBpmPlatformBootstrap` as Listener before the `GlobalResourcesLifecycleListener` in your `$TOMCAT_HOME/conf/server.xml`. This class is responsible for starting and stopping the camunda BPM platform as Tomcat is started and stopped.

```xml
<Server port="8005" shutdown="SHUTDOWN">
  ...
  <Listener className="org.camunda.bpm.container.impl.tomcat.TomcatBpmPlatformBootstrap" />
  ...
```

## Configuring JDBC Resource

To configure a JDBC Resource you have to edit the file `$TOMCAT_HOME/conf/server.xml`. This could look like the following example for an H2 database:

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

Copy all libraries from the `$TOMCAT_DISTRIBUTION/lib/` folder to the Tomcat library folder `$TOMCAT_HOME/lib`:

Furthermore, you have to merge your corresponding JDBC driver into the folder `$TOMCAT_HOME/lib`.


## Add bpm-platform.xml

You have to add the file `bpm-platform.xml` to the folder `$TOMCAT_HOME/conf` or, optionally, you can configure the location through some available mechanisms, see [Configure location of the bpm-platform.xml file](ref:/api-references/deployment-descriptors/#descriptors-bpm-platformxml-configure-location-of-the-bpm-platformxml-file):

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
