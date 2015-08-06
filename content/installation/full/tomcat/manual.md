---

title: 'Install the Full Distribution on a Tomcat Application Server manually '
weight: 20

menu:
  main:
    name: "Manual Installation"
    identifier: "installation-guide-full-tomcat-install-manual"
    parent: "installation-guide-full-tomcat"

---

This document will guide you through the installation of Camunda BPM and its components on an <a href="http://tomcat.apache.org/">Apache Tomcat 7 Server</a>.

<div class="alert alert-info">
  <strong>Reading the Guide</strong> <br>
  Throughout this guide we will use a number of variables to denote common path names and constants:<br>
  <code>$TOMCAT_HOME</code> points to the main directory of the tomcat server.<br>
  <code>$PLATFORM_VERSION</code> denotes the version of the Camunda BPM platform you want to install or already have installed, e.g. <code>7.0.0</code>.<br>
  <code>$TOMCAT_DISTRIBUTION</code> represents the downloaded pre-packaged Camunda BPM distribution for Tomcat, e.g. <code>camunda-bpm-tomcat-$PLATFORM_VERSION.zip</code> or <code>camunda-bpm-tomcat-$PLATFORM_VERSION.tar.gz</code>.
</div>

This section will describe how you can install the Camunda BPM platform on a vanilla [Tomcat 7](http://tomcat.apache.org/) server if you are not able to use the pre-packaged Tomcat distribution. Regardless, we recommend that you [download a Tomcat 7 distribution](http://camunda.org/download/) to use the required modules.


# Setup

Before you can install the Camunda components, you need to perform a number of required setup steps.

## Create the database schema for the Camunda BPM platform

If you do not want to use the H2 database, you first have to create a database schema for the Camunda BPM platform. The Camunda BPM distribution ships with a set of SQL create scripts that can be executed by a database administrator.

The database creation scripts reside in the `sql/create` folder:

`$TOMCAT_DISTRIBUTION/sql/create/*_engine_$PLATFORM_VERSION.sql`
`$TOMCAT_DISTRIBUTION/sql/create/*_identity_$PLATFORM_VERSION.sql`

There is an individual SQL script for each supported database. Select the appropriate script for your database type and run it with your database administration tool. (e.g. SqlDeveloper for Oracle).

## Add BPM Bootstrap Server Listener

Add the entry `org.camunda.bpm.container.impl.tomcat.TomcatBpmPlatformBootstrap` as Listener before the `GlobalResourcesLifecycleListener` in your `$TOMCAT_HOME/conf/server.xml`. This class is responsible for starting and stopping the Camunda BPM platform as Tomcat is started and stopped.

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


# Install Optional Components

This section describes how to install optional Camunda dependencies onto a Tomcat server. None of these are required to work with the core platform. Before continuing, make sure that the Camunda BPM platform is already installed according to [this step](ref:#bpm-platform-install-the-platform-on-a-vanilla-tomcat).

<div class="alert alert-info">
  <p><strong>Note</strong> </p>
  <p>When using a pre-packaged Tomcat distribution, the optional extensions are already installed and activated.</p>
</div>

The following covers the installation of these extensions:

* [Camunda Connect](ref:/guides/user-guide/#process-engine-connectors)
* [Camunda Spin](ref:/guides/user-guide/#data-formats-xml-json-other)
* [Freemarker Integration](ref:/guides/user-guide/#process-engine-templating-installing-a-template-engine)
* [Groovy Scripting](ref:/guides/user-guide/#process-engine-scripting)

## Install Camunda Cockpit and Tasklist

To install camunda Cockpit and Tasklist, a Tomcat installation with the `org.camunda.bpm.camunda-engine` module is required.
See the above section on how to [install the pre-built distro](ref:#bpm-platform-install-the-pre-built-distro) or [install the platform on a vanilla Tomcat](ref:#bpm-platform-install-the-platform-on-a-vanilla-tomcat).

**Note**: The distro already ships the applications. They may be accessed via `/camunda/app/cockpit` and `/camunda/app/tasklist`, respectively.

The following steps are required to deploy the applications on a Tomcat instance:

1. Download the camunda web application that contains both applications from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/webapp/camunda-webapp-tomcat/).
   Or switch to the private repository for the enterprise version (User and password from license required).
   Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-tomcat-$PLATFORM_VERSION.war`.
2. Copy the war file to `$TOMCAT_HOME/webapps/camunda.war`.
   Optionally you may name it differently or extract it to a folder to deploy it to a different context path.
3. Startup Tomcat.
4. Access Cockpit and Tasklist via `/camunda/app/cockpit` and `/camunda/app/tasklist` or under the context path you configured.

## Install Camunda REST API

To install the REST API, a Tomcat installation with the `org.camunda.bpm.camunda-engine` module is required.
See the above section on how to [install the pre-built distro](ref:#bpm-platform-install-the-pre-built-distro) or [install the platform on a vanilla Tomcat](ref:#bpm-platform-install-the-platform-on-a-vanilla-tomcat).

**Note**: The distro already ships the REST API exposing it on the context path `/engine-rest`.

The following steps are required to deploy the REST API on a Tomcat instance:

1.  Download the REST API web application archive from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/).
    Or switch to the private repository for the enterprise version (User and password from license required).
    Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION-tomcat.war`.
2.  Copy the war file to `$TOMCAT_HOME/webapps`.
   Optionally you may rename it or extract it to a folder to deploy it to a specific context like `/engine-rest`.
3.  Startup Tomcat.
4.  Access the REST API on the context you configured.
    For example, http://localhost:8080/engine-rest/engine should return the names of all engines of the platform, provided that you deployed the application in the context `/engine-rest`.

## Install Camunda Connect

Add the following artifacts (if not existing) from the folder `$TOMCAT_DISTRIBUTION/lib/` to the folder `$TOMCAT_HOME/lib/`:

* `camunda-connect-connectors-all-$CONNECT_VERSION.jar`
* `camunda-connect-core-$CONNECT_VERSION.jar`
* `camunda-engine-plugin-connect-$CAMUNDA_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`

In order to activate Camunda Connect functionality for a process engine, a process engine plugin has to be registered in `$TOMCAT_HOME/conf/bpm-platform.xml` as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ... ">
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

## Install Camunda Spin

Add the following artifacts (if not existing) from the folder `$TOMCAT_DISTRIBUTION/lib/` to the folder `$TOMCAT_HOME/lib/`:

* `camunda-spin-dataformat-all-$SPIN_VERSION.jar`
* `camunda-spin-core-$SPIN_VERSION.jar`
* `camunda-engine-plugin-spin-$CAMUNDA_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`

In order to activate Camunda Spin functionality for a process engine, a process engine plugin has to be registered in `$TOMCAT_HOME/conf/bpm-platform.xml` as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ... ">
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

## Install Groovy Scripting

Add the following artifacts (if not existing) from the folder `$TOMCAT_DISTRIBUTION/lib/` to the folder `$TOMCAT_HOME/lib/`:

* `groovy-all-$GROOVY_VERSION.jar`

## Install Freemarker Integration

Add the following artifacts (if not existing) from the folder `$TOMCAT_DISTRIBUTION/lib/` to the folder `$TOMCAT_HOME/lib/`:

* `camunda-template-engines-freemarker-$TEMPLATE_VERSION.jar`
* `freemarker-2.3.20.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`