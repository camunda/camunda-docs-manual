---

title: 'Install the Full Distribution on a JBoss/Wildfly Application Server manually '
weight: 20

menu:
  main:
    name: "Manual Installation"
    identifier: "installation-guide-full-jboss-install-vanilla"
    parent: "installation-guide-full-jboss"
    pre: "Install and configure the Full Distribution on a vanilla JBoss/Wildfly Application Server."

---


This document describes the installation of Camunda BPM and its components on a vanilla [JBoss EAP 6](https://developers.redhat.com/products/eap/download) or vanilla [Wildfly Application Server / JBoss EAP 7](http://www.wildfly.org).

{{< note title="Reading this Guide" class="info" >}}
This guide uses a number of variables to denote common path names and constants:
`$JBOSS_HOME`/`$WILDFLY_HOME` points to the JBoss/Wildfly application server main directory.
`$PLATFORM_VERSION` denotes the version of the Camunda BPM platform you want to install or already have installed, e.g. `7.0.0`.
{{< /note >}}

# Required Setup for JBoss EAP 6

This section explains how to perform the required setup steps for JBoss Application Server.

First, you need to download the [Camunda JBoss distribution](https://downloads.camunda.cloud/enterprise-release/camunda-bpm/jboss/) (Enterprise version only).

## Copy Modules

Copy the modules from the `modules/` folder of the Camunda distribution, to the `$JBOSS_HOME/modules/` of your JBoss EAP application server.


## Adjust the Configuration

Next, a number of changes need to be performed in the application server's configuration file.
In most cases this is `$JBOSS_HOME/standalone/configuration/standalone.xml`.

Add the Camunda subsystem as extension. Also add the `org.jboss.as.threads` extension if not already present to the `extension` section of the `standalone.xml`:

```xml
<server xmlns="urn:jboss:domain:1.1">
  <extensions>
    ...
    <extension module="org.camunda.bpm.jboss.camunda-jboss-subsystem"/>
    <!-- Add the 'org.jboss.as.threads' extension if not already exists -->
    <extension module="org.jboss.as.threads"/>
```

Add the following elements in order to create a thread pool for the Job Executor in the `<subsystem xmlns="urn:jboss:domain:threads:1.1">` section:

```xml
<subsystem xmlns="urn:jboss:domain:threads:1.1">
  <bounded-queue-thread-pool name="job-executor-tp" allow-core-timeout="true">
    <core-threads count="3" />
    <queue-length count="3" />
    <max-threads count="10" />
    <keepalive-time time="10" unit="seconds" />
  </bounded-queue-thread-pool>
</subsystem>
```

The name of the thread pool is then referenced in the job executor configuration.
This also configures the default process engine.

```xml
<subsystem xmlns="urn:org.camunda.bpm.jboss:1.1">
  <process-engines>
    <process-engine name="default" default="true">
      <datasource>java:jboss/datasources/ProcessEngine</datasource>
      <history-level>full</history-level>
      <properties>
        <property name="jobExecutorAcquisitionName">default</property>
        <property name="isAutoSchemaUpdate">true</property>
        <property name="authorizationEnabled">true</property>
        <property name="jobExecutorDeploymentAware">true</property>
      </properties>
    </process-engine>
  </process-engines>
  <job-executor>
    <thread-pool-name>job-executor-tp</thread-pool-name>
    <job-acquisitions>
      <job-acquisition name="default">
        <acquisition-strategy>SEQUENTIAL</acquisition-strategy>
        <properties>
          <property name="lockTimeInMillis">300000</property>
          <property name="waitTimeInMillis">5000</property>
          <property name="maxJobsPerAcquisition">3</property>
        </properties>
      </job-acquisition>
    </job-acquisitions>
  </job-executor>
</subsystem>
```


## Create the Database Schema and Tables

In the default configuration of the distribution, the database schema and all required tables are automatically created in an H2 database when the engine starts up for the first time. If you do not want to use the H2 database, you have to

* Create a database schema for the Camunda BPM platform yourself.
* Execute the SQL DDL scripts which create all required tables and default indices.

The SQL DDL scripts reside in the `sql/create` folder of the distribution:

`$JBOSS_DISTRIBUTION/sql/create/*_engine_$PLATFORM_VERSION.sql`
`$JBOSS_DISTRIBUTION/sql/create/*_identity_$PLATFORM_VERSION.sql`

As an alternative, you can also find a collection of the SQL scripts on our [Nexus](https://app.camunda.com/nexus/service/rest/repository/browse/camunda-bpm/org/camunda/bpm/distro/camunda-sql-scripts/). Select the respective version and download the scripts as a `zip` or `tar.gz` file, then open the `camunda-sql-scripts-$PLATFORM_VERSION/create` folder.

There is an individual SQL script for each supported database. Select the appropriate script for your database and run it with your database administration tool (e.g., SqlDeveloper for Oracle).

When you create the tables manually, then you have to configure the engine to **not** create tables at startup by setting the `isAutoSchemaUpdate` property to `false` (or, in case you are using Oracle, to `noop`). In JBoss, this is done in the `standalone.xml`, located in the `$JBOSS_DISTRIBUTION\server\jboss-as-$VERSION\standalone\configuration\` folder.

{{< note title="Heads Up!" class="info" >}}
If you have defined a specific prefix for the entities of your database, then you will have to manually adjust the `create` scripts accordingly so that the tables are created with the prefix.

Please note further that READ COMMITED is the required isolation level for database systems to run Camunda with. You may have to change the default setting on your database when installing Camunda. For more information see the documentation on [isolation levels]({{< ref "/user-guide/process-engine/database/database-configuration.md#isolation-level-configuration" >}}).
{{< /note >}}

## Create a Datasource

You need to create a datasource named `java:jboss/datasources/ProcessEngine`.
The following datasource shows an example of using the built in H2 database for this, using a file within the `./` folder,
typically `bin`.

If you start the script from a different location the database is stored there!

```xml
<datasource jta="true" enabled="true" use-java-context="true" use-ccm="true"
            jndi-name="java:jboss/datasources/ProcessEngine"
            pool-name="ProcessEngine">
  <connection-url>jdbc:h2:./camunda-h2-dbs/process-engine;DB_CLOSE_DELAY=-1;MVCC=TRUE;DB_CLOSE_ON_EXIT=FALSE</connection-url>
  <driver>h2</driver>
  <security>
    <user-name>sa</user-name>
    <password>sa</password>
  </security>
</datasource>
```

Using H2 as a database is ideal for development purposes but is not recommended for usage in a productive environment.
These links point you to resources for other databases:

* [How to configure an Oracle database](http://www.ironjacamar.org/doc/userguide/1.0/en-US/html_single/#ex_datasources_oracle)
* [How to configure a MySQL database](http://www.ironjacamar.org/doc/userguide/1.0/en-US/html_single/#ex_datasources_mysql)


# Required Setup for Wildfly / JBoss EAP 7

This section explains how to perform the required setup steps for Wildfly Application Server.

First, you need to download the [Camunda WildFly distribution](https://downloads.camunda.cloud/release/camunda-bpm/wildfly/).

## Copy Modules

Copy the modules from the `modules/` folder of the Camunda distribution, or extract the `camunda-wildfly8-modules` archive, to the `$WILDFLY_HOME/modules/` of your Wildfly application server.

{{< note title="Replace H2 Database" >}}
The WildFly distribution ships a different version of the H2 database than the one that is shipped with Wildfly itself.
The version shipped with Camunda is the version that the process engine is tested on and it is strongly recommended to use Camunda's version.
To do so, **make sure to delete the folder**

```
$WILDFLY_HOME/modules/system/layers/base/com/h2database
```

{{< /note >}}


## Adjust the Configuration

Next, a number of changes need to be performed in the application server's configuration file.
In most cases this is `$JBOSS_HOME/standalone/configuration/standalone.xml`.

Add the Camunda subsystem as extension:

```xml
<server xmlns="urn:jboss:domain:2.1">
  <extensions>
    ...
    <extension module="org.camunda.bpm.wildfly.camunda-wildfly-subsystem"/>
```

Configure the thread pool for the Camunda BPM platform Job Executor:

Since Camunda BPM 7.5, the configuration of the thread pool is done in the Camunda subsystem, not in the JBoss Threads subsystem anymore like it was done before 7.5.
The thread pool creation and shutdown is now controlled through the Camunda subsystem.
You are able to configure it through the following new configuration elements in the `job-executor` element of the subsystem XML configuration.

Mandatory configuration elements are:

* ```<core-threads>3</core-threads>```
* ```<max-threads>5</max-threads>```
* ```<queue-length>10</queue-length>```

Optional configuration elements are:

* ```<keepalive-time>10</keepalive-time>``` (in seconds)
* ```<allow-core-timeout>true</allow-core-timeout>```

Shown values are the default ones.

The below example also configures the default process engine.

```xml
<subsystem xmlns="urn:org.camunda.bpm.jboss:1.1">
  <process-engines>
    <process-engine name="default" default="true">
      <datasource>java:jboss/datasources/ProcessEngine</datasource>
      <history-level>full</history-level>
      <properties>
        <property name="jobExecutorAcquisitionName">default</property>
        <property name="isAutoSchemaUpdate">true</property>
        <property name="authorizationEnabled">true</property>
        <property name="jobExecutorDeploymentAware">true</property>
      </properties>
    </process-engine>
  </process-engines>
  <job-executor>
    <core-threads>3</core-threads>
    <max-threads>5</max-threads>
    <queue-length>10</queue-length>
    <job-acquisitions>
      <job-acquisition name="default">
        <properties>
          <property name="lockTimeInMillis">300000</property>
          <property name="waitTimeInMillis">5000</property>
          <property name="maxJobsPerAcquisition">3</property>
        </properties>
      </job-acquisition>
    </job-acquisitions>
  </job-executor>
</subsystem>
```


## Create the Database Schema

By default, the database schema is automatically created in an H2 database when the engine starts up for the first time. If you do not want to use the H2 database, you first have to create a database schema for the Camunda BPM platform. The Camunda BPM distribution ships with a set of SQL create scripts that can be executed by a database administrator.

The database creation scripts are reside in the `sql/create` folder:

`$WILDFLY_DISTRIBUTION/sql/create/*_engine_$PLATFORM_VERSION.sql`
`$WILDFLY_DISTRIBUTION/sql/create/*_identity_$PLATFORM_VERSION.sql`

There is an individual SQL script for each supported database. Select the appropriate script for your database and run it with your database administration tool. (e.g., SqlDeveloper for Oracle).

When you create the tables manually, then you can also configure the engine to **not** create tables at startup by setting the `isAutoSchemaUpdate` property to `false` (or, in case you are using Oracle, to `noop`). In WildFly, this is done in the `standalone.xml`, located in the `$WildFly_DISTRIBUTION\server\WildFly-$VERSION\standalone\configuration\` folder.

{{< note title="Heads Up!" class="info" >}}
If you have defined a specific prefix for the entities of your database, then you will have to manually adjust the `create` scripts accordingly so that the tables are created with the prefix.
{{< /note >}}


## Create a Datasource

You need to create a datasource named `java:jboss/datasources/ProcessEngine`.
The following datasource shows an example of using the built in H2 database for this, using a file within the `./` folder,
typically `bin`.

```xml
<datasource jta="true" enabled="true" use-java-context="true" use-ccm="true"
            jndi-name="java:jboss/datasources/ProcessEngine"
            pool-name="ProcessEngine">
  <connection-url>jdbc:h2:./camunda-h2-dbs/process-engine;DB_CLOSE_DELAY=-1;MVCC=TRUE;DB_CLOSE_ON_EXIT=FALSE</connection-url>
  <driver>h2</driver>
  <security>
    <user-name>sa</user-name>
    <password>sa</password>
  </security>
</datasource>
```
Using H2 as a database is ideal for development purposes but is not recommended for usage in a productive environment.
These links point you to resources for other databases:

* [How to configure an Oracle database](http://blog.foos-bar.com/2011/08/jboss-as-7-and-oracle-datasource.html)
* [How to configure a MySQL database](http://www.ironjacamar.org/doc/userguide/1.0/en-US/html_single/#ex_datasources_mysql)


# Optional Components

This section describes how to install optional dependencies. None of these are required to work with the core platform. Before continuing, make sure that the Camunda BPM platform is already installed according to [this step]({{< relref "#required-setup-for-jboss-eap-6" >}}) for JBoss EAP 6, respectively [this step]({{< relref "#required-setup-for-wildfly-jboss-eap-7" >}}) for WildFly / JBoss EAP 7.


## Cockpit, Tasklist and Admin

The following steps are required to deploy the web application:

1. Download the Camunda web application that contains both applications from our [Maven Nexus Server](https://app.camunda.com/nexus/service/rest/repository/browse/public/org/camunda/bpm/webapp/camunda-webapp-jboss/).
    Alternatively, switch to the private repository for the enterprise version (credentials from license required).
    Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-jboss-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which the application will be deployed (default is `/camunda`).
    Edit the file `WEB-INF/jboss-web.xml` in the war file and update the `context-root` element accordingly.
3. Copy the war file to `$JBOSS_HOME/standalone/deployments`.
4. Startup JBoss AS/Wildfly.
5. Access Cockpit, Tasklist and Admin via `/camunda/app/cockpit`, `/camunda/app/tasklist` and `/camunda/app/admin`, or under the context path you configured.


## REST API

The following steps are required to deploy the REST API:

1. Download the REST API web application archive from our [Maven Nexus Server](https://app.camunda.com/nexus/service/rest/repository/browse/public/org/camunda/bpm/camunda-engine-rest/).
   Alternatively, switch to the private repository for the enterprise version (credentials from license required).
   Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which the REST API will be deployed (default is `/engine-rest`).
   Edit the file `WEB-INF/jboss-web.xml` in the war file and update the `context-root` element accordingly.
3. Copy the war file to `$JBOSS_HOME/standalone/deployments`.
4. Startup JBoss AS/Wildfly.
5. Access the REST API on the context path you configured.
   For example, <a href="http://localhost:8080/engine-rest/engine">http://localhost:8080/engine-rest/engine</a> should return the names of all engines of the platform,
   provided that you deployed the application in the context `/engine-rest`.


## Camunda Connect Plugin

Add the following modules (if not existing) from the folder `$JBOSS_DISTRIBUTION/modules/` to the folder `$JBOSS_HOME/modules/`:

* `org/camunda/bpm/camunda-engine-plugin-connect`
* `org/camunda/commons/camunda-commons-utils`

To activate Camunda Connect functionality for a process engine, a process engine plugin has to be registered in `$JBOSS_HOME/standalone/configuration/standalone.xml` as follows:

```xml
<subsystem xmlns="urn:org.camunda.bpm.jboss:1.1">
  ...
  <process-engines>
    <process-engine name="default" default="true">
      ...
      <plugins>
        ... existing plugins ...
        <plugin>
          <class>org.camunda.connect.plugin.impl.ConnectProcessEnginePlugin</class>
        </plugin>
      </plugins>
      ...
    </process-engine>
  </process-engines>
  ...
</subsystem>
```


## Camunda Spin

The Camunda Spin plugin can be use to extend the engine functionality to de-/serialize object variables from and to JSON and XML. For more information, see the [Spin Reference]({{< ref "/reference/spin/_index.md" >}}).

### Setup Spin

Add the following modules (if not existing) from the folder `$JBOSS_DISTRIBUTION/modules/` to the folder `$JBOSS_HOME/modules/`:

* `org/camunda/spin/camunda-spin-core`
* `org/camunda/spin/camunda-spin-dataformat-json-jackson`
* `org/camunda/spin/camunda-spin-dataformat-xml-dom`
* `org/camunda/bpm/camunda-engine-plugin-spin`
* `org/camunda/commons/camunda-commons-utils`
* `com/fasterxml/jackson/core/jackson-core`
* `com/fasterxml/jackson/core/jackson-databind`
* `com/fasterxml/jackson/core/jackson-annotations`
* `com/jayway/jsonpath/json-path`

In order to activate Camunda Spin functionality for a process engine, a process engine plugin has to be registered in `$JBOSS_HOME/standalone/configuration/standalone.xml` as follows:

```xml
<subsystem xmlns="urn:org.camunda.bpm.jboss:1.1">
  ...
  <process-engines>
    <process-engine name="default" default="true">
      ...
      <plugins>
        ... existing plugins ...
        <plugin>
          <class>org.camunda.spin.plugin.impl.SpinProcessEnginePlugin</class>
        </plugin>
      </plugins>
      ...
    </process-engine>
  </process-engines>
  ...
</subsystem>
```

### Problems with Jackson Annotations

The usage of Jackson annotations on WildFly together with the Camunda Spin JSON serialization can lead to problems.
WildFly implicitly adds the JAX-RS subsystem to each new deployment, if JAX-RS annotations are present (see the WildFly [documentation](https://docs.jboss.org/author/display/WFLY8/Implicit+module+dependencies+for+deployments) for more information).
This JAX-RS subsystem includes the Jackson library, the version of which does not match with the version used by the Camunda SPIN Plugin.
As a result, Jackson annotations will be ignored. Note that this problem does not necessarily have to emerge upon direct usage of Spin.
The Spin plugin also comes into play when JSON variables are set or read by the Camunda Process Engine.

See one of the following ways to fix this:

1. Change the Jackson `main` slot to the version which is used by the Camunda Spin Plugin.
 * Make sure that Resteasy can work with this Jackson version, as we cannot give any guarantees on this.

2. Exclude implicitly added JAX-RS dependencies.
 * Add a `jboss-deployment-structure.xml` file to you application in the WEB-INF folder.
 * Exclude the JAX-RS subsystem and add the Jackson dependencies, with the version which is used by the Camunda Spin Plugin.
 * This solution is also shown in the [Jackson Annotation Example for WildFly](https://github.com/camunda/camunda-bpm-examples/blob/master/wildfly/jackson-annotations) in the Camunda example repository.

See this [Forum Post](https://forum.camunda.org/t/camunda-json-marshalling-and-jsonignore/271/19) for other approaches and information.

### Problem With Deployments Using the REST API

Camunda Spin is not available in scripts if a process definition is deployed via REST API. Because Wildfly / JBoss handle dependencies using its module system and camunda engine module has no module dependency on the spin module.

## Groovy Scripting

Add the following modules (if not existing) from the folder `$JBOSS_DISTRIBUTION/modules/` to the folder `$JBOSS_HOME/modules/`:

* `org/codehaus/groovy/groovy-all`


## Freemarker Integration

Add the following modules (if not existing) from the folder `$JBOSS_DISTRIBUTION/modules/` to the folder `$JBOSS_HOME/modules/`:

* `org/camunda/template-engines/camunda-template-engines-freemarker`
* `org/freemarker/freemarker`
* `org/camunda/commons/camunda-commons-logging`
* `org/camunda/commons/camunda-commons-utils`
