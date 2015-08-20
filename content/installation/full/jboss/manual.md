---

title: 'Install the Full Distribution on a JBoss/Wildfly Application Server manually '
weight: 20

menu:
  main:
    name: "Manual Installation"
    identifier: "installation-guide-full-jboss-install-vanilla"
    parent: "installation-guide-full-jboss"
    pre: "Install and configure the Full Distribution on a vanilla JBoss / Wildfly Application Server."

---


This document describes the installation of Camunda BPM and its components on a vanilla [JBoss Application Server 7/JBoss EAP 6](http://www.jboss.org/products/eap) or vanilla [Wildfly 8 Application Server](http://www.wildfly.org).

{{< note title="Reading this Guide" class="info" >}}
This guide uses a number of variables to denote common path names and constants:
`$JBOSS_HOME`/`$WILDFLY_HOME` points to the JBoss/Wildfly application server main directory.
`$PLATFORM_VERSION` denotes the version of the Camunda BPM platform you want to install or already have installed, e.g. `7.0.0`.
{{< /note >}}


# Required Setup for JBoss

This section explains how to perfom the required setup steps for JBoss Application Server.

First, you need to [download the Camunda jboss distribution](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/jboss/camunda-bpm-jboss/).


## Adjust the Configuration

Next, a number of changes need to be performed in the application server's configuration file.
In most cases this is `$JBOSS_HOME/standalone/configuration/standalone.xml`.

Add the Camunda subsystem as extension:

```xml
<server xmlns="urn:jboss:domain:1.1">
  <extensions>
    ...
    <extension module="org.camunda.bpm.jboss.camunda-jboss-subsystem"/>
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

* [How to configure an Oracle database](http://blog.foos-bar.com/2011/08/jboss-as-7-and-oracle-datasource.html)
* [How to configure a MySQL database](http://www.ironjacamar.org/doc/userguide/1.0/en-US/html_single/#ex_datasources_mysql)


# Required Setup for Wildfly

This section explains how to perfom the required setup steps for Wildfly Application Server.

First, you need to [download the Camunda jboss distribution](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/jboss/camunda-bpm-jboss/).


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

Add the following elements in order to create a thread pool for the Job Executor:

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

The name of the thread pool is then referenced in the Camunda bpm subsystem job executor configuration.
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

This section describes how to install optional dependencies. None of these are required to work with the core platform. Before continuing, make sure that the Camunda BPM platform is already installed according to [this step]({{< relref "#setup" >}}).


## Cockpit, Tasklist and Admin

The following steps are required to deploy the web application:

1. Download the Camunda web application that contains both applications from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/webapp/camunda-webapp-jboss/).
    Or switch to the private repository for the enterprise version (User and password from license required).
    Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-jboss-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which the application will be deployed (default is `/camunda`).
    Edit the file `WEB-INF/jboss-web.xml` in the war file and update the `context-root` element accordingly.
3. Copy the war file to `$JBOSS_HOME/standalone/deployments`.
4. Startup JBoss AS/Wildfly.
5. Access Cockpit and Tasklist via `/camunda/app/cockpit` and `/camunda/app/tasklist` or under the context path you configured.


## REST API

The following steps are required to deploy the REST API:

1. Download the REST API web application archive from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/).
   Or switch to the private repository for the enterprise version (User and password from license required).
   Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which the REST API will be deployed (default is `/engine-rest`).
   Edit the file `WEB-INF/jboss-web.xml` in the war file and update the `context-root` element accordingly.
3. Copy the war file to `$JBOSS_HOME/standalone/deployments`.
4. Startup JBoss AS/Wildfly.
5. Access the REST API on the context path you configured.
   For example, <a href="http://localhost:8080/engine-rest/engine">http://localhost:8080/engine-rest/engine</a> should return the names of all engines of the platform,
   provided that you deployed the application in the context `/engine-rest`.


## Camunda Connect

Add the following modules (if not existing) from the folder `$JBOSS_DISTRIBUTION/modules/` to the folder `$JBOSS_HOME/modules/`:

* `org/camunda/connect/camunda-connect-core`
* `org/camunda/connect/camunda-connect-http-client`
* `org/camunda/connect/camunda-connect-soap-http-client`
* `org/camunda/bpm/camunda-engine-plugin-connect`
* `org/camunda/commons/camunda-commons-logging`
* `org/camunda/commons/camunda-commons-utils`
* `org/apache/httpcomponents/httpclient`
* `org/apache/httpcomponents/httpcore`
* `commons-codec/commons-codec`
* `commons-logging/commons-logging`

In order to activate Camunda Connect functionality for a process engine, a process engine plugin has to be registered in `$JBOSS_HOME/standalone/configuration/standalone.xml` as follows:

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

Add the following modules (if not existing) from the folder `$JBOSS_DISTRIBUTION/modules/` to the folder `$JBOSS_HOME/modules/`:

* `org/camunda/spin/camunda-spin-core`
* `org/camunda/spin/camunda-spin-dataformat-json-jackson`
* `org/camunda/spin/camunda-spin-dataformat-xml-dom`
* `org/camunda/bpm/camunda-engine-plugin-spin`
* `org/camunda/commons/camunda-commons-logging`
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


## Groovy Scripting

Add the following modules (if not existing) from the folder `$JBOSS_DISTRIBUTION/modules/` to the folder `$JBOSS_HOME/modules/`:

* `org/codehaus/groovy/groovy-all`


## Freemarker Integration

Add the following modules (if not existing) from the folder `$JBOSS_DISTRIBUTION/modules/` to the folder `$JBOSS_HOME/modules/`:

* `org/camunda/template-engines/camunda-template-engines-freemarker`
* `org/freemarker/freemarker`
* `org/camunda/commons/camunda-commons-logging`
* `org/camunda/commons/camunda-commons-utils`
