---

title: 'Install the Full Distribution on a Tomcat Application Server manually '
weight: 20

menu:
  main:
    name: "Manual Installation"
    identifier: "installation-guide-full-tomcat-install-manual"
    parent: "installation-guide-full-tomcat"
    pre: "Manually install and configure the Full Distribution on a vanilla Apache Tomcat Server."

---


This section describes how you can install the Camunda BPM platform and its components on a vanilla [Apache Tomcat 8](http://tomcat.apache.org/), if you are not able to use the pre-packaged Tomcat distribution. Regardless, we recommend that you [download a Tomcat 8 distribution](http://camunda.org/release/camunda-bpm/tomcat/) to fetch the required Camunda modules.

{{< note title="Reading the Guide" class="info" >}}
Throughout this guide we will use a number of variables to denote common path names and constants:

* `$TOMCAT_HOME` points to the main directory of the tomcat server.
* `$PLATFORM_VERSION` denotes the version of the Camunda BPM platform you want to install or already have installed, e.g. `7.0.0`.
* `$TOMCAT_DISTRIBUTION` represents the downloaded pre-packaged Camunda BPM distribution for Tomcat, e.g. `camunda-bpm-tomcat-$PLATFORM_VERSION.zip` or `camunda-bpm-tomcat-$PLATFORM_VERSION.tar.gz`.

{{< /note >}}


# Setup

Before you can install the Camunda components, you need to perform a number of required setup steps.


## Create the Database Schema and Tables

In the default configuration of the distribution, the database schema and all required tables are automatically created in an H2 database when the engine starts up for the first time. If you do not want to use the H2 database, you have to

* Create a database schema for the Camunda BPM platform yourself.
* Execute the SQL DDL scripts which create all required tables and default indices.

The SQL DDL scripts reside in the `sql/create` folder of the distribution:

`$TOMCAT_DISTRIBUTION/sql/create/*_engine_$PLATFORM_VERSION.sql`
`$TOMCAT_DISTRIBUTION/sql/create/*_identity_$PLATFORM_VERSION.sql`

As an alternative, you can also find a collection of the SQL scripts on our [Nexus](https://app.camunda.com/nexus/content/repositories/camunda-bpm/org/camunda/bpm/distro/camunda-sql-scripts/). Select the respective version and download the scripts as a `zip` or `tar.gz` file, then open the `camunda-sql-scripts-$PLATFORM_VERSION/create` folder.

There is an individual SQL script for each supported database. Select the appropriate script for your database and run it with your database administration tool (e.g., SqlDeveloper for Oracle).

When you create the tables manually, then you have to configure the engine to **not** create tables at startup by setting the `databaseSchemaUpdate` property to `false` (or, in case you are using Oracle, to `noop`). In Tomcat, this is done in the `bpm-platform.xml`, located in the `$TOMCAT_DISTRIBUTION\server\apache-tomcat-$VERSION\conf\` folder.

{{< note title="Heads Up!" class="info" >}}
If you have defined a specific prefix for the entities of your database, then you will have to manually adjust the `create` scripts accordingly so that the tables are created with the prefix.

Please note further that READ COMMITED is the required isolation level for database systems to run Camunda with. You may have to change the default setting on your database when installing Camunda. For more information see the documentation on [isolation levels]({{< relref "user-guide/process-engine/database.md#isolation-level-configuration" >}}).
{{< /note >}}


## Add BPM Bootstrap Server Listener

Add the entry `org.camunda.bpm.container.impl.tomcat.TomcatBpmPlatformBootstrap` as Listener before the `GlobalResourcesLifecycleListener` in your `$TOMCAT_HOME/conf/server.xml`. This class is responsible for starting and stopping the Camunda BPM platform as Tomcat is started and stopped.

```xml
<Server port="8005" shutdown="SHUTDOWN">
  ...
  <Listener className="org.camunda.bpm.container.impl.tomcat.TomcatBpmPlatformBootstrap" />
  ...
```


## Configure a JDBC Resource

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
              maxActive="20"
              minIdle="5" />
  </GlobalNamingResources>
</Server>
```


## Add Required Libraries

Copy all libraries from the `$TOMCAT_DISTRIBUTION/lib/` folder to the Tomcat library folder `$TOMCAT_HOME/lib`:

Furthermore, you have to merge your corresponding JDBC driver into the folder `$TOMCAT_HOME/lib`.


## Add bpm-platform.xml

You have to add the file `bpm-platform.xml` to the folder `$TOMCAT_HOME/conf` or, optionally, you can configure the location through some available mechanisms, see [Configure location of the bpm-platform.xml file]({{< relref "reference/deployment-descriptors/descriptors/bpm-platform-xml.md#configure-location-of-the-bpm-platform-xml-file" >}}):

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
      <property name="jobExecutorDeploymentAware">true</property>
    </properties>

  </process-engine>

</bpm-platform>
```


# Optional Components

This section describes how to install optional Camunda dependencies onto a Tomcat server. None of these are required to work with the core platform.


## Cockpit, Tasklist and Admin

The following steps are required to deploy the applications:

1. Download the Camunda web application that contains both applications from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/webapp/camunda-webapp-tomcat/).
   Or switch to the private repository for the enterprise version (User and password from license required).
   Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-tomcat-$PLATFORM_VERSION.war`.
2. Copy the war file to `$TOMCAT_HOME/webapps/camunda.war`.
   Optionally you may name it differently or extract it to a folder to deploy it to a different context path.
3. Startup Tomcat.
4. Access Cockpit and Tasklist via `/camunda/app/cockpit` and `/camunda/app/tasklist` or under the context path you configured.


## REST API

The following steps are required to deploy the REST API:

1. Download the REST API web application archive from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/).
    Or switch to the private repository for the enterprise version (User and password from license required).
    Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION-tomcat.war`.
2. Copy the war file to `$TOMCAT_HOME/webapps`.
   Optionally you may rename it or extract it to a folder to deploy it to a specific context like `/engine-rest`.
3. Startup Tomcat.
4. Access the REST API on the context you configured.
    For example, http://localhost:8080/engine-rest/engine should return the names of all engines of the platform, provided that you deployed the application in the context `/engine-rest`.


## Camunda Connect

Add the following artifacts (if not existing) from the folder `$TOMCAT_DISTRIBUTION/lib/` to the folder `$TOMCAT_HOME/lib/`:

* `camunda-connect-connectors-all-$CONNECT_VERSION.jar`
* `camunda-connect-core-$CONNECT_VERSION.jar`
* `camunda-engine-plugin-connect-$CAMUNDA_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`

In order to activate Camunda Connect functionality for a process engine, a process engine plugin has to be registered in `$TOMCAT_HOME/conf/bpm-platform.xml` as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ...>
  <process-engine name="default">
    ...
    <plugins>
      ... existing plugins ...
      <plugin>
        <class>org.camunda.connect.plugin.impl.ConnectProcessEnginePlugin</class>
      </plugin>
    </plugins>
    ...
  </process-engine>

</bpm-platform>
```


## Camunda Spin

Add the following artifacts (if not existing) from the folder `$TOMCAT_DISTRIBUTION/lib/` to the folder `$TOMCAT_HOME/lib/`:

* `camunda-spin-dataformat-all-$SPIN_VERSION.jar`
* `camunda-spin-core-$SPIN_VERSION.jar`
* `camunda-engine-plugin-spin-$CAMUNDA_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`

In order to activate Camunda Spin functionality for a process engine, a process engine plugin has to be registered in `$TOMCAT_HOME/conf/bpm-platform.xml` as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ...>
  ...
  <process-engine name="default">
    ...
    <plugins>
      ... existing plugins ...
      <plugin>
        <class>org.camunda.spin.plugin.impl.SpinProcessEnginePlugin</class>
      </plugin>
    </plugins>
    ...
  </process-engine>
  ...
</bpm-platform>
```


## Groovy Scripting

Add the following artifacts (if not existing) from the folder `$TOMCAT_DISTRIBUTION/lib/` to the folder `$TOMCAT_HOME/lib/`:

* `groovy-all-$GROOVY_VERSION.jar`


## Freemarker Integration

Add the following artifacts (if not existing) from the folder `$TOMCAT_DISTRIBUTION/lib/` to the folder `$TOMCAT_HOME/lib/`:

* `camunda-template-engines-freemarker-$TEMPLATE_VERSION.jar`
* `freemarker-2.3.20.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
