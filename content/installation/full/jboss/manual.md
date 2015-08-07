---

title: 'Install the Full Distribution on a JBoss/Wildfly Application Server manually '
weight: 20

menu:
  main:
    name: "Manual Installation"
    identifier: "installation-guide-full-jboss-install-vanilla"
    parent: "installation-guide-full-jboss"

---


This document describes the installation of Camunda BPM and its components on a vanilla [JBoss Application Server 7/JBoss EAP 6](http://www.jboss.org/products/eap) or vanilla [Wildfly 8 Application Server](http://www.wildfly.org), if you are not able to use the pre-packaged JBoss/Wildfly distribution.

<div class="alert alert-info">
  <strong>Reading the Guide</strong><br>
  Throughout this guide we will use a number of variables to denote common path names and constants:<br>
  <code>$JBOSS_HOME</code>/<code>$WILDFLY_HOME</code> points to the JBoss/Wildfly application server main directory.<br>
  <code>$PLATFORM_VERSION</code> denotes the version of the camunda BPM platform you want to install or already have installed, e.g. <code>7.0.0</code>.
</div>


# Install the Platform on a Vanilla JBoss

1. Download the camunda jboss distro from our [server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/jboss/camunda-bpm-jboss/).
   Choose the correct version named `$PLATFORM_VERSION/camunda-bpm-jboss-$PLATFORM_VERSION.zip` or `$PLATFORM_VERSION/camunda-bpm-jboss-$PLATFORM_VERSION.tar.gz`.
2. Unpack the `modules` folder of the archive.
3. Merge all content into your $JBOSS_HOME/modules/ directory.
4. Adjust your `$JBOSS_HOME/standalone/configuration/standalone.xml` (or the JBoss configuration applicable for your installation) as described below
5. Adjust the datasource to your needs (see below), by default it uses the built in H2 database
6. Startup the server


## Adjust the standalone.xml

Here we describe the changes necessary in the `$JBOSS_HOME/standalone/configuration/standalone.xml`. These are already done in the pre-packaged server.

Add the camunda subsystem as extension:

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

The name of the thread pool is then referenced in the camunda bpm subsystem job executor configuration.
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

**Note**: If you start the script from a different location the database is stored there!

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

*   [How to configure an Oracle database](http://blog.foos-bar.com/2011/08/jboss-as-7-and-oracle-datasource.html)
*   [How to configure a MySQL database](http://www.ironjacamar.org/doc/userguide/1.0/en-US/html_single/#ex_datasources_mysql)


## Use an XA Datasource

We **strongly recommend** to use an XA data-source in production environments.
Since you normally access other transactional resources from within your process, the risk of having inconsistencies is otherwise high.
For H2 it could be done with this configuration:

```xml
<xa-datasource jndi-name="java:jboss/datasource/ProcessEngine" pool-name="ProcessEngine" enabled="true" use-ccm="false">
  <xa-datasource-property name="URL">jdbc:h2:./camunda-h2-dbs/process-engine;DB_CLOSE_DELAY=-1;MVCC=TRUE;DB_CLOSE_ON_EXIT=FALSE</xa-datasource-property>
  <driver>h2</driver>
  <xa-pool>
    <max-pool-size>10</max-pool-size>
    <is-same-rm-override>false</is-same-rm-override>
    <interleaving>false</interleaving>
    <pad-xid>false</pad-xid>
    <wrap-xa-resource>false</wrap-xa-resource>
  </xa-pool>
  <security>
    <user-name>sa</user-name>
    <password>sa</password>
  </security>
  <validation>
    <validate-on-match>false</validate-on-match>
    <background-validation>false</background-validation>
    <background-validation-millis>0</background-validation-millis>
  </validation>
  <statement>
    <prepared-statement-cache-size>0</prepared-statement-cache-size>
    <share-prepared-statements>false</share-prepared-statements>
  </statement>
</xa-datasource>
```

For other databases, confer the following resources:

*   [Oracle XA datasource](http://www.ironjacamar.org/doc/userguide/1.0/en-US/html_single/#ex_datasources_oracle_xa)
*   [MySQL XA datasource](http://www.ironjacamar.org/doc/userguide/1.0/en-US/html_single/#ex_datasources_mysql_xa)
*   [DB2 XA datasource](http://www.ironjacamar.org/doc/userguide/1.0/en-US/html_single/#ex_datasources_db2_xa)


# Install the Platform on a Vanilla Wildfly

1. Download the camunda Wildfly distro from our [server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/wildfly/camunda-bpm-wildfly/).
   Choose the correct version named `$PLATFORM_VERSION/camunda-bpm-wildfly-$PLATFORM_VERSION.zip` or `$PLATFORM_VERSION/camunda-bpm-wildfly-$PLATFORM_VERSION.tar.gz`.
2. Unpack the `modules` folder of the archive.
3. Merge all content into your $WILDFLY_HOME/modules/ directory.
4. Adjust your `$WILDFLY_HOME/standalone/configuration/standalone.xml` (or the Wildfly configuration applicable for your installation) as described below
5. Adjust the datasource to your needs (see below), by default it uses the built in H2 database
6. Startup the server


## Adjust the standalone.xml

Here we describe the changes necessary in the `$WILDFLY_HOME/standalone/configuration/standalone.xml`. These are already done in the pre-packaged server.

Add the camunda subsystem as extension:

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

The name of the thread pool is then referenced in the camunda bpm subsystem job executor configuration.
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

**Note**: If you start the script from a different location the database is stored there!

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

*   [How to configure an Oracle database](http://blog.foos-bar.com/2011/08/jboss-as-7-and-oracle-datasource.html)
*   [How to configure a MySQL database](http://www.ironjacamar.org/doc/userguide/1.0/en-US/html_single/#ex_datasources_mysql)


## Use an XA Datasource

We **strongly recommend** to use an XA data-source in production environments.
Since you normally access other transactional resources from within your process, the risk of having inconsistencies is otherwise high.
For H2 it could be done with this configuration:

```xml
<xa-datasource jndi-name="java:jboss/datasource/ProcessEngine" pool-name="ProcessEngine" enabled="true" use-ccm="false">
  <xa-datasource-property name="URL">jdbc:h2:./camunda-h2-dbs/process-engine;DB_CLOSE_DELAY=-1;MVCC=TRUE;DB_CLOSE_ON_EXIT=FALSE</xa-datasource-property>
  <driver>h2</driver>
  <xa-pool>
    <max-pool-size>10</max-pool-size>
    <is-same-rm-override>false</is-same-rm-override>
    <interleaving>false</interleaving>
    <pad-xid>false</pad-xid>
    <wrap-xa-resource>false</wrap-xa-resource>
  </xa-pool>
  <security>
    <user-name>sa</user-name>
    <password>sa</password>
  </security>
  <validation>
    <validate-on-match>false</validate-on-match>
    <background-validation>false</background-validation>
    <background-validation-millis>0</background-validation-millis>
  </validation>
  <statement>
    <prepared-statement-cache-size>0</prepared-statement-cache-size>
    <share-prepared-statements>false</share-prepared-statements>
  </statement>
</xa-datasource>
```

For other databases, confer the following resources:

*   [Oracle XA datasource](http://www.ironjacamar.org/doc/userguide/1.0/en-US/html_single/#ex_datasources_oracle_xa)
*   [MySQL XA datasource](http://www.ironjacamar.org/doc/userguide/1.0/en-US/html_single/#ex_datasources_mysql_xa)
*   [DB2 XA datasource](http://www.ironjacamar.org/doc/userguide/1.0/en-US/html_single/#ex_datasources_db2_xa)


# Install Optional Components

This section describes how to install optional Camunda dependencies onto a JBoss server. None of these are required to work with the core platform. Before continuing, make sure that the Camunda BPM platform is already installed according to [this step]({{< relref "#setup" >}}).

<div class="alert alert-info">
  <p><strong>Note</strong> </p>
  <p>When using a pre-packaged JBoss/Wildfly distribution, the optional extensions are already installed and activated.</p>
</div>

The following covers the installation of these extensions:

* [Camunda Cockpit]({{< relref "user-guide/cockpit/index.md" >}}) [and Tasklist]({{< relref "user-guide/tasklist/index.md" >}})
* [Camunda REST API]({{< relref "references/rest/index.md" >}})
* [Camunda Connect]({{< relref "user-guide/process-engine/connectors.md" >}})
* [Camunda Spin]({{< relref "user-guide/spin/data-formats-in-processes.md" >}})
* [Freemarker Integration]({{< relref "user-guide/process-engine/templating.md" >}})
* [Groovy Scripting]({{< relref "user-guide/process-engine/scripting.md" >}})


## Install Cockpit and Tasklist

To install Camunda Cockpit and Tasklist, a JBoss/Wildfly installation with the
`org.camunda.bpm.camunda-engine` module is required. See the above section on how to [install the
pre-built distro]({{< relref "installation/full/jboss/pre-packaged.md" >}}) or [install the platform on a
vanilla JBoss]({{< relref "#install-the-platform-on-a-vanilla-jboss" >}})/[vaniall Wildfly]({{< relref "#install-the-platform-on-a-vanilla-wildfly" >}}).

**Note**: The distro already ships the applications. They may be accessed via `/camunda/app/cockpit` and `/camunda/app/tasklist`, respectively.

The following steps are required to deploy the applications on a JBoss/Wildfly instance:

1.  Download the camunda web application that contains both applications from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/webapp/camunda-webapp-jboss/).
    Or switch to the private repository for the enterprise version (User and password from license required).
    Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-jboss-$PLATFORM_VERSION.war`.
2.  Optionally, you may change the context path to which the application will be deployed (default is `/camunda`).
    Edit the file `WEB-INF/jboss-web.xml` in the war file and update the `context-root` element accordingly.
2.  Copy the war file to `$JBOSS_HOME/standalone/deployments`.
3.  Startup JBoss AS / Wildfly.
4.  Access Cockpit and Tasklist via `/camunda/app/cockpit` and `/camunda/app/tasklist` or under the context path you configured.


## Install the REST API

To install the REST API, a JBoss/Wildfly installation with the `org.camunda.bpm.camunda-engine`
module is required. See the above section on how to [install the
pre-built distro]({{< relref "installation/full/jboss/pre-packaged.md" >}}) or [install the platform on a
vanilla JBoss]({{< relref "#install-the-platform-on-a-vanilla-jboss" >}})/[vaniall Wildfly]({{< relref "#install-the-platform-on-a-vanilla-wildfly" >}}).

**Note**: The distro already ships the REST API exposing it on the context path `/engine-rest`.

The following steps are required to deploy the REST API on a JBoss instance:

1. Download the REST API web application archive from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/).
   Or switch to the private repository for the enterprise version (User and password from license required).
   Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which the REST API will be deployed (default is `/engine-rest`).
   Edit the file `WEB-INF/jboss-web.xml` in the war file and update the `context-root` element accordingly.
3. Copy the war file to `$JBOSS_HOME/standalone/deployments`.
4. Startup JBoss AS / Wildfly.
5. Access the REST API on the context path you configured.
   For example, <a href="http://localhost:8080/engine-rest/engine">http://localhost:8080/engine-rest/engine</a> should return the names of all engines of the platform,
   provided that you deployed the application in the context `/engine-rest`.


## Install Camunda Connect

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


## Install Camunda Spin

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


## Install Groovy Scripting

Add the following modules (if not existing) from the folder `$JBOSS_DISTRIBUTION/modules/` to the folder `$JBOSS_HOME/modules/`:

* `org/codehaus/groovy/groovy-all`


## Install Freemarker Integration

Add the following modules (if not existing) from the folder `$JBOSS_DISTRIBUTION/modules/` to the folder `$JBOSS_HOME/modules/`:

* `org/camunda/template-engines/camunda-template-engines-freemarker`
* `org/freemarker/freemarker`
* `org/camunda/commons/camunda-commons-logging`
* `org/camunda/commons/camunda-commons-utils`