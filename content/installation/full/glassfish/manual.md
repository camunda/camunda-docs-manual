---

title: 'Install the Full Distribution on a Glassfish Application Server manually'
weight: 20

menu:
  main:
    name: "Manual Installation"
    identifier: "installation-guide-full-glassfish-install-manually"
    parent: "installation-guide-full-glassfish"

---


This section will describe how you can install the camunda BPM platform and its components on a vanilla [Glassfish 3.1](http://glassfish.java.net/), if you are not able to use the pre-packaged Glassfish distribution. Regardless, we recommend that you [download a Glassfish 3.1 distribution](http://camunda.org/download/) to use the required modules.

<div class="alert alert-info">
  <strong>Reading the Guide</strong> <br>
  Throughout this guide we will use a number of variables to denote common path names and constants.<br>
  <code>$GLASSFISH_HOME</code> points to the glassfish application server main directory (typically <code>glassfish3/glassfish</code> when extracted from a glassfish distribution).<br>
  <code>$PLATFORM_VERSION</code> denotes the version of the camunda BPM platform you want to install or already have installed, e.g. <code>7.0.0</code>.<br>
  <code>$GLASSFISH_DISTRIBUTION</code> represents the downloaded pre-packaged camunda BPM distribution for Glassfish, e.g. <code>camunda-bpm-glassfish-$PLATFORM_VERSION.zip</code> or <code>camunda-bpm-glassfish-$PLATFORM_VERSION.tar.gz</code>.<br>
</div>


# Setup

Before you can install the Camunda components, you need to perform a number of required setup steps.


## Create the Database Schema

If you do not want to use the H2 database, you first have to create a database schema for the camunda BPM platform. The camunda BPM distribution ships with a set of SQL create scripts that can be executed by a database administrator.

The database creation scripts are reside in the `sql/create` folder:

`$GLASSFISH_DISTRIBUTION/sql/create/*_engine_$PLATFORM_VERSION.sql`
`$GLASSFISH_DISTRIBUTION/sql/create/*_identity_$PLATFORM_VERSION.sql`

There is an individual SQL script for each supported database. Select the appropriate script for your database and run it with your database administration tool. (e.g. SqlDeveloper for Oracle).

<!--The next sections describe how to configure the Glassfish and to install the camunda BPM platfrom on Glassfish. If you prefer you can do the following [configurations via Glassfish Administration Console](ref:#configuring-admin-console) and [skip](ref:#configuring-admin-console) the next sections.-->


## Configure a JDBC Connection Pool

The JDBC Connection Pool and the JDBC Resource can be configured by editing the file `domain.xml` inside the folder `$GLASSFISH_HOME/glassfish/domains/<domain>/config/`.

This could look like the following example for an H2 database:

    <domain>
      ...
      <resources>
        ...
        <jdbc-resource pool-name="ProcessEnginePool"
                       jndi-name="jdbc/ProcessEngine"
                       enabled="true">
        </jdbc-resource>

        <jdbc-connection-pool is-isolation-level-guaranteed="false"
                              datasource-classname="org.h2.jdbcx.JdbcDataSource"
                              res-type="javax.sql.DataSource"
                              non-transactional-connections="true"
                              name="ProcessEnginePool">
          <property name="Url"
                    value="jdbc:h2:./camunda-h2-dbs/process-engine;DB_CLOSE_DELAY=-1;MVCC=TRUE;DB_CLOSE_ON_EXIT=FALSE">
          </property>
          <property name="User" value="sa"></property>
          <property name="Password" value="sa"></property>
        </jdbc-connection-pool>
      </resources>

      <servers>
        <server>
          ...
          <resource-ref ref="jdbc/ProcessEngine"></resource-ref>
        </server>
      </servers>
    </domain>

In case another database than H2 is used (i.e., DB2, MySQL etc.), you have to adjust the `datasource-classname` and the `res-type` attributes with the corresponding database classes and set the database specific properties (such as the url, etc.) inside the JDBC Connection Pool. Furthermore, you have to add the corresponding JDBC driver to `$GLASSFISH_HOME/glassfish/lib/`. For example, you can add the H2 JDBC driver which is located at `$GLASSFISH_DISTRIBUTION/server/glassfish3/glassfish/lib/h2-VERSION.jar` to run with the H2 database.


##  Configure a Thread Pool for the Job Executor

To do so, you have to edit the file `$GLASSFISH_HOME/glassfish/domains/<domain>/config/domain.xml` and add the following elements to the `resources` section.

    <domain>
      ...
      <resources>
        ...
        <resource-adapter-config
          enabled="true"
          resource-adapter-name="camunda-jobexecutor-rar"
          thread-pool-ids="platform-jobexecutor-tp" >
        </resource-adapter-config>

        <connector-connection-pool
            enabled="true"
            name="platformJobExecutorPool"
            resource-adapter-name="camunda-jobexecutor-rar"
            connection-definition-name=
                "org.camunda.bpm.container.impl.threading.jca.outbound.JcaExecutorServiceConnectionFactory"
            transaction-support="NoTransaction" />

        <connector-resource
            enabled="true"
            pool-name="platformJobExecutorPool"
            jndi-name="eis/JcaExecutorServiceConnectionFactory" />
      </resources>

      <servers>
        <server>
          ...
          <resource-ref ref="eis/JcaExecutorServiceConnectionFactory"></resource-ref>
        </server>
      </servers>
    </domain>

To configure a thread pool for the job executor you have to add it to the corresponding `config` elements of `domain.xml`.

    <domain>
      ...
      <configs>
        ...
        <config name="server-config">
          ...
          <thread-pools>
            ...
            <thread-pool max-thread-pool-size="6"
                         name="platform-jobexecutor-tp"
                         min-thread-pool-size="3"
                         max-queue-size="10">
            </thread-pool>
          </thread-pools>
        </config>
      </configs>
    </domain>


# Install Required Components

The following steps are required to deploy the camunda BPM platform on a Glassfish instance:

1. Merge the shared libraries from `$GLASSFISH_DISTRIBUTION/modules/lib` into the `GLASSFISH_HOME/glassfish/lib` directory (i.e., copy the content into the Glassfish library directory).
2. Copy the job executor resource adapter `$GLASSFISH_DISTRIBUTION/modules/camunda-jobexecutor-rar-$PLATFORM_VERSION.rar` into `$GLASSFISH_HOME/glassfish/domains/<domain>/autodeploy`. The job executor resource adapter has to be deployed first because the artifact `camunda-glassfish-ear-$PLATFORM_VERSION.ear` depends on it and cannot be deployed successfully without the resource adapter. If you try to deploy both components with the auto-deploy feature in one step you should be aware that the deployment order is not defined in this case. Due to this, we propose to startup the Glassfish application server to initially deploy the job executor resource adapter. After a successful startup, shutdown the Glassfish application server.
3. Copy the artifact `$GLASSFISH_DISTRIBUTION/modules/camunda-glassfish-ear-$PLATFORM_VERSION.ear` into `$GLASSFISH_HOME/glassfish/domains/<domain>/autodeploy`.
4. (optional) [Configure the location of the bpm-platform.xml file]({{< relref "reference/deployment-descriptors/descriptors/bpm-platform-xml.md#configure-location-of-the-bpm-platform-xml-file" >}}).
5. Startup the Glassfish application server.
6. After a successful startup, the camunda BPM platform is installed.


# Install Optional Components

This section describes how to install optional Camunda dependencies onto a Glassfish server. None of these are required to work with the core platform. Before continuing, make sure that the Camunda BPM platform is already installed according to [this step]({{< relref "#setup" >}}).

<div class="alert alert-info">
  <p><strong>Note</strong> </p>
  <p>When using a pre-packaged Glassfish distribution, the optional extensions are already installed and activated.</p>
</div>

The following section covers the installation of these extensions:

* [Camunda Cockpit]({{< relref "user-guide/cockpit/index.md" >}}) [and Tasklist]({{< relref "user-guide/tasklist/index.md" >}})
* [Camunda REST API]({{< relref "reference/rest/index.md" >}})
* [Camunda Connect]({{< relref "user-guide/process-engine/connectors.md" >}})
* [Camunda Spin]({{< relref "user-guide/spin/data-formats-in-processes.md" >}})
* [Freemarker Integration]({{< relref "user-guide/process-engine/templating.md" >}})
* [Groovy Scripting]({{< relref "user-guide/process-engine/scripting.md" >}})


## Install Cockpit and Tasklist

To install Camunda Cockpit and Tasklist, a Glassfish installation with the `org.camunda.bpm.camunda-engine` module is required.
See the above section on how to [install the pre-built distro]({{< relref "installation/full/glassfish/pre-packaged.md" >}}) or [install the platform on a vanilla Glassfish]({{< relref "#setup" >}}).

**Note**: The distro already ships the applications. They may be accessed via `/camunda/app/cockpit` and `/camunda/app/tasklist`, respectively.

The following steps are required to deploy the applications on a Glassfish instance:

1. Download the camunda web application that contains both applications from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/webapp/camunda-webapp-glassfish/).
   Or switch to the private repository for the enterprise version (User and password from license required).
   Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-glassfish-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which the application will be deployed (default is `/camunda`).
   Edit the file `WEB-INF/sun-web.xml` in the war file and update the `context-root` element accordingly.
2. Copy the war file to `$GLASSFISH_HOME/domains/domain1/autodeploy`.
3. Startup the Glassfish Application Server.
4. Access Cockpit and Tasklist via `/camunda/app/cockpit` and `/camunda/app/tasklist` or under the context path you configured.


## Install the REST API

To install the REST API, a Glassfish installation with the `org.camunda.bpm.camunda-engine` module is required.
See the above section on how to [install the pre-built distro]({{< relref "installation/full/glassfish/pre-packaged.md" >}}) or [install the platform on a vanilla Glassfish]({{< relref "#setup" >}}).

**Note**: The distro already ships the REST API exposing it on the context path `/engine-rest`.

The following steps are required to deploy the REST API on a Glassfish instance:

1. Download the REST API web application archive from our [Maven Nexus Server](https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/).
   Or switch to the private repository for the enterprise version (User and password from license required).
   Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION.war`.
2. Optionally, you may change the context path to which the REST API will be deployed (default is `/engine-rest`).
   Edit the file `WEB-INF/sun-web.xml` in the war file and update the `context-root` element accordingly.
3. Copy the war file to `$GLASSFISH_HOME/domains/domain1/autodeploy`.
4. Startup the Glassfish Application Server.
5. Access the REST API on the context path you configured.
   For example, <a href="http://localhost:8080/engine-rest/engine">http://localhost:8080/engine-rest/engine</a> should return the names of all engines of the platform,
   if you deployed the application in the context `/engine-rest`.


## Install Camunda Connect

Add the following artifacts (if not existing) from the folder `$GLASSFISH_DISTRIBUTION/modules/lib/` to the folder `$GLASSFISH_HOME/glassfish/lib/`:

* `camunda-connect-core-$CONNECT_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`
* `slf4j-jdk14-$SLF4J_VERSION.jar`

In order to activate Camunda Connect functionality for a process engine, a process engine plugin has to be registered in the BPM platform configuration as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ... >
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

Add the following artifacts (if not existing) from the folder `$GLASSFISH_DISTRIBUTION/modules/lib/` to the folder `$GLASSFISH_HOME/glassfish/lib/`:

* `camunda-spin-core-$SPIN_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`
* `slf4j-jdk14-$SLF4J_VERSION.jar`

In order to activate Camunda Spin functionality for a process engine, a process engine plugin has to be registered in BPM platform configuration as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ... >
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

Add the following artifacts (if not existing) from the folder `$GLASSFISH_DISTRIBUTION/modules/lib/` to the folder `$GLASSFISH_HOME/glassfish/lib/`:

* `groovy-all-$GROOVY_VERSION.jar`


## Install Freemarker Integration

Add the following artifacts (if not existing) from the folder `$GLASSFISH_DISTRIBUTION/modules/lib/` to the folder `$GLASSFISH_HOME/glassfish/lib/`:

* `camunda-template-engines-freemarker-$TEMPLATE_VERSION.jar`
* `freemarker-2.3.20.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`
* `slf4j-jdk14-$SLF4J_VERSION.jar`
