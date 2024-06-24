---

title: 'Install the Full Distribution on a JBoss EAP/WildFly Application Server manually '
weight: 20

menu:
  main:
    name: "Manual Installation"
    identifier: "installation-guide-full-jboss-install-vanilla"
    parent: "installation-guide-full-jboss"
    pre: "Install and configure the Full Distribution on a vanilla WildFly Application Server."

---


This document describes the installation of Camunda 7 and its components on a vanilla [WildFly Application Server](http://www.wildfly.org) or JBoss EAP 7 / 8.

{{< note title="Reading this Guide" class="info" >}}
This guide uses a number of variables to denote common path names and constants:

* `$WILDFLY_HOME` points to the JBoss EAP/WildFly application server main directory.
* `$WILDFLY_VERSION` denotes the version of WildFly application server.
* `$WILDFLY_DISTRIBUTION` represents the downloaded pre-packaged Camunda 7 distribution for WildFly, e.g. `camunda-bpm-wildfly-$PLATFORM_VERSION.zip` or `camunda-bpm-wildfly-$PLATFORM_VERSION.tar.gz`.
* `$PLATFORM_VERSION` denotes the version of Camunda 7 you want to install or already have installed, e.g. `7.0.0`.
{{< /note >}}

## Setup

* For WildFly ≥27 / JBoss EAP 8, download the [Camunda 7 WildFly distribution](https://downloads.camunda.cloud/release/camunda-bpm/wildfly/).
* For WildFly ≤26 / JBoss EAP 7, download the [`camunda-wildfly26-modules`](https://artifacts.camunda.com/artifactory/camunda-bpm/org/camunda/bpm/wildfly/camunda-wildfly26-modules/).

### Copy Modules

Copy the modules from the `modules/` folder of the Camunda 7 distribution, or extract the `camunda-wildfly-modules` archive, to the `$WILDFLY_HOME/modules/` of your WildFly application server.

{{< note title="Replace H2 Database" >}}
The WildFly distribution ships a different version of the H2 database than the one that is shipped with WildFly itself.
The version shipped with Camunda 7 is the version that the process engine is tested on and it is strongly recommended to use Camunda's version.
To do so, **make sure to delete the folder**

```
$WILDFLY_HOME/modules/system/layers/base/com/h2database
```

{{< /note >}}


### Adjust the Configuration

Next, a number of changes need to be performed in the application server's configuration file.
In most cases this is `$WILDFLY_HOME/standalone/configuration/standalone.xml`.

Add the Camunda 7 subsystem as extension:

```xml
<server xmlns="urn:jboss:domain:20.0">
  <extensions>
    ...
    <extension module="org.camunda.bpm.wildfly.camunda-wildfly-subsystem"/>
```

Configure the thread pool for the Camunda Job Executor:

Since Camunda 7.5, the configuration of the thread pool is done in the Camunda 7 subsystem, not in the JBoss Threads subsystem anymore like it was done before 7.5.
The thread pool creation and shutdown is now controlled through the Camunda 7 subsystem.
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


### Create the Database Schema

By default, the database schema is automatically created in an H2 database when the engine starts up for the first time. If you do not want to use the H2 database, you have to

* Create a database schema for Camunda 7 yourself.
* Install the database schema to create all required tables and default indices using our [database schema installation guide]({{< ref "/installation/database-schema.md" >}}).

When you create the tables manually, then you can also configure the engine to **not** create tables at startup by setting the `isAutoSchemaUpdate` property to `false` (or, in case you are using Oracle, to `noop`). In WildFly, this is done in the `standalone.xml`, located in the `$WILDFLY_DISTRIBUTION\server\wildfly-$WILDFLY_VERSION\standalone\configuration\` folder.

### Create a Datasource

You need to create a datasource named `java:jboss/datasources/ProcessEngine`.
The following datasource shows an example of using the built-in H2 database for this, using a file within the `./` folder,
typically `bin`.

```xml
<datasource jta="true" enabled="true" use-java-context="true" use-ccm="true"
            jndi-name="java:jboss/datasources/ProcessEngine"
            pool-name="ProcessEngine">
  <connection-url>jdbc:h2:./camunda-h2-dbs/process-engine;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE</connection-url>
  <driver>h2</driver>
  <security user-name="sa" password="sa"/> <!-- for WildFly ≥27 / JBoss EAP 8 -->
  <!-- for WildFly ≤26 / JBoss EAP 7
  <security>
    <user-name>sa</user-name>
    <password>sa</password>
  </security> -->
</datasource>
```
Using H2 as a database is ideal for development purposes but is not recommended for usage in a productive environment.
These links point you to resources for other databases:

* [How to configure an Oracle database](http://www.ironjacamar.org/doc/userguide/1.0/en-US/html_single/#ex_datasources_oracle)
* [How to configure a MySQL database](http://www.ironjacamar.org/doc/userguide/1.0/en-US/html_single/#ex_datasources_mysql)

## Optional Components

This section describes how to install optional dependencies. None of these are required to work with the core platform. Before continuing, make sure that Camunda 7 is already installed according to [this step]({{< relref "#setup" >}}) for WildFly / JBoss EAP.


### Cockpit, Tasklist, and Admin

The following steps are required to deploy the web application:

1. Download the Camunda web application that contains the web applications from our Maven Artifactory.
    Alternatively, switch to the private repository for the enterprise version (credentials from license required).
    * For [WildFly ≥27 / JBoss EAP 8](https://artifacts.camunda.com/artifactory/camunda-bpm/org/camunda/bpm/webapp/camunda-webapp-wildfly/), the name of the artifact is `$PLATFORM_VERSION/camunda-webapp-wildfly-$PLATFORM_VERSION.war`.
    * For [WildFly ≤26 / JBoss EAP 7](https://artifacts.camunda.com/artifactory/camunda-bpm/org/camunda/bpm/webapp/camunda-webapp-jboss/), the name of the artifact is `$PLATFORM_VERSION/camunda-webapp-jboss-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which the application will be deployed (default is `/camunda`).
    Edit the file `WEB-INF/jboss-web.xml` in the war file and update the `context-root` element accordingly.
3. Copy the war file to `$WILDFLY_HOME/standalone/deployments`.
4. Startup WildFly.
5. Access Cockpit, Tasklist, and Admin via `/camunda/app/cockpit`, `/camunda/app/tasklist` and `/camunda/app/admin`, or under the context path you configured.


### REST API

The following steps are required to deploy the REST API:

1. Download the REST API web application archive from our Maven Artifactory.
   Alternatively, switch to the private repository for the enterprise version (credentials from license required).
    * For [WildFly ≥27 / JBoss EAP 8](https://artifacts.camunda.com/artifactory/public/org/camunda/bpm/camunda-engine-rest-jakarta/), the name of the artifact is `$PLATFORM_VERSION/camunda-engine-rest-jakarta-$PLATFORM_VERSION-wildfly.war`.
    * For [WildFly ≤26 / JBoss EAP 7](https://artifacts.camunda.com/artifactory/public/org/camunda/bpm/camunda-engine-rest/), the name of the artifact is `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION-wildfly.war`.
2. Optionally, you may change the context path to which the REST API will be deployed (default is `/engine-rest`).
   Edit the file `WEB-INF/jboss-web.xml` in the war file and update the `context-root` element accordingly.
3. Copy the war file to `$WILDFLY_HOME/standalone/deployments`.
4. Startup WildFly.
5. Access the REST API on the context path you configured.
   For example, <a href="http://localhost:8080/engine-rest/engine">http://localhost:8080/engine-rest/engine</a> should return the names of all engines of the platform,
   provided that you deployed the application in the context `/engine-rest`.


### Camunda Connect Plugin

Add the following modules (if not existing) from the folder `$WILDFLY_DISTRIBUTION/modules/` to the folder `$WILDFLY_HOME/modules/`:

* `org/camunda/bpm/camunda-engine-plugin-connect`
* `org/camunda/commons/camunda-commons-utils`

To activate Camunda Connect functionality for a process engine, a process engine plugin has to be registered in `$WILDFLY_HOME/standalone/configuration/standalone.xml` as follows:

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


### Camunda Spin

You can use the Camunda Spin plugin to extend the engine functionality to de-/serialize object variables from and to JSON and XML. For more information, see the [Spin Reference]({{< ref "/reference/spin/_index.md" >}}).

#### Setup Spin

Add the following modules (if not existing) from the folder `$WILDFLY_DISTRIBUTION/modules/` to the folder `$WILDFLY_HOME/modules/`:

* `org/camunda/spin/camunda-spin-core`
* `org/camunda/spin/camunda-spin-dataformat-json-jackson`
* `org/camunda/spin/camunda-spin-dataformat-xml-dom-jakarta`
  * **Heads-up:** add this module only for WildFly ≥27 / JBoss EAP 8.
* `org/camunda/spin/camunda-spin-dataformat-xml-dom`
  * **Heads-up:** add this module only for WildFly ≤26 / JBoss EAP 7.
* `org/camunda/bpm/camunda-engine-plugin-spin`
* `org/camunda/commons/camunda-commons-utils`
* `com/fasterxml/jackson/core/jackson-core`
* `com/fasterxml/jackson/core/jackson-databind`
* `com/fasterxml/jackson/core/jackson-annotations`
* `com/jayway/jsonpath/json-path`

In order to activate Camunda Spin functionality for a process engine, a process engine plugin has to be registered in `$WILDFLY_HOME/standalone/configuration/standalone.xml` as follows:

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

#### Problems with Jackson Annotations

The usage of Jackson annotations on WildFly together with the Camunda Spin JSON serialization can lead to problems.
WildFly implicitly adds the JAX-RS subsystem to each new deployment, if JAX-RS annotations are present (see the WildFly [documentation](https://docs.wildfly.org/23/Developer_Guide.html#Implicit_module_dependencies_for_deployments) for more information).
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

#### Problem With Deployments Using the REST API

Camunda Spin is not available in scripts if a process definition is deployed via REST API. Because WildFly handles dependencies using its module system and Camunda engine module has no module dependency on the spin module.

### Groovy Scripting

Add the following modules (if not existing) from the folder `$WILDFLY_DISTRIBUTION/modules/` to the folder `$WILDFLY_HOME/modules/`:

* `org/codehaus/groovy/groovy-all`


### Freemarker Integration

Add the following modules (if not existing) from the folder `$WILDFLY_DISTRIBUTION/modules/` to the folder `$WILDFLY_HOME/modules/`:

* `org/camunda/template-engines/camunda-template-engines-freemarker`
* `org/freemarker/freemarker`
* `org/camunda/commons/camunda-commons-logging`
* `org/camunda/commons/camunda-commons-utils`

### GraalVM JavaScript Integration

Add the following modules (if not existing) from the folder `$WILDFLY_DISTRIBUTION/modules/` to the folder `$WILDFLY_HOME/modules/`:

* `org/graalvm/js/js`
* `org/graalvm/js/js-scriptengine`
* `org/graalvm/regex/regex`
* `org/graalvm/sdk/graal-sdk`
* `org/graalvm/truffle/truffle-api`
* `com/ibm/icu/icu4j`


