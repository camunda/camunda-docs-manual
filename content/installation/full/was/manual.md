---

title: 'Install the Full Distribution on an IBM WebSphere Server'
weight: 20

menu:
  main:
    name: "Manual Installation"
    identifier: "installation-guide-full-was-install-manual"
    parent: "installation-guide-full-was"
    pre: "Install and configure the Full Distribution on IBM WebSphere Application Server."

---


This section will describe how you can install the Camunda Platform and its components on an IBM WebSphere 
Application Server. The section provides different steps for [traditional WebSphere 9][was9] and 
[WebSphere Liberty][liberty].

{{< note title="Reading this Guide" class="info" >}}
Throughout this section we will use a number of variables to denote common path names and constants.
You don't have to create these variables in your environment.
They are just used in this guide to make it more readable.

* `$WAS_HOME`: points to the IBM WebSphere application server main directory (typically something like `/opt/IBM/WebSphere/AppServer`).
* `$PLATFORM_VERSION` denotes the version of the Camunda Platform you want to install or already have installed, e.g., `7.15.6-ee`.
* `$WAS_DISTRIBUTION` represents the downloaded Camunda Platform distribution for the IBM WebSphere Application Server, e.g., `camunda-ee-ibm-was-$PLATFORM_VERSION.zip`.
* `$SERVER_CONFIG_DIR` points to the IBM WebSphere Liberty server configuration directory like `wlp/usr/servers/camundaServer`.

The distribution is available at the [Camunda enterprise release page](https://downloads.camunda.cloud/enterprise-release/camunda-bpm/ibm-was/).
You will be asked to enter the credentials you received during the trial or subscription process.
{{< /note >}}


# Setup for WebSphere Application Server 9

Before  you can install the Camunda components, you need to perform a number of required setup steps.

## Resource configuration

The Camunda Platform requires a set of resources that need to be configured at the application server level:

* One or multiple datasources to be used by the engine(s).
* A work manager for the job executor.

### Define resources in the right scope

In order to perform the steps listed in this guide, make sure you understand the concept of management scopes introduced by the IBM WebSphere Application Server. We assume that resources are defined at the "Node" scope.

{{< img src="../img/scope-highlight.png" title="Scope" >}}

## Configure a datasource

Camunda Platform uses one or multiple process engines which must be connected to a datasource.

### Create the database schema and tables

In the default configuration of the distribution, the database schema and all required tables are automatically created in an H2 database when the engine starts up for the first time. If you do not want to use the H2 database, you have to

* Create a database schema for the Camunda Platform yourself.
* Install the database schema to create all required tables and default indices using our [database schema installation guide][db-schema-install].

When you create the tables manually, then you have to configure the engine to **not** create tables at startup by setting the `databaseSchemaUpdate` property to `false` (or, in case you are using Oracle, to `noop`). In WebSphere, this is done in the `bpm-platform.xml`, located in the `$WAS_HOME\modules\camunda-ibm-websphere-ear-$VERSION.ear\camunda-ibm-websphere-service.jar\META-INF\` folder.

### JDBC/Datasource configuration

Use your application server management tooling for the configuration of the datasources. The JNDI name of the datasource must be equal to the name used in the datasource-Element of the process engine(s) configured in the bpm-platform.xml file.

Related resources:

* [WebSphere 8.5: Configuring a JDBC provider and data source](https://www.ibm.com/support/knowledgecenter/en/SSEQTP_8.5.5/com.ibm.websphere.base.iseries.doc/ae/tdat_tccrtprovds.html)
* [Websphere 9.0: Configuring a JDBC provider and data source](https://www.ibm.com/support/knowledgecenter/en/SSEQTP_9.0.5/com.ibm.websphere.base.doc/ae/tdat_tccrtprovds.html)

#### Default JNDI Name

The default JNDI name used by the process engine is `jdbc/ProcessEngine`

The following screenshot shows the configuration of an XA datasource:

{{< img src="../img/jdbc.png" title="JDBC Configuration" >}}

Note that you may configure multiple datasources used by different process engine instances. See the [User Guide]({{< ref "/user-guide/_index.md" >}}) for details.

## Configure a WorkManager

This section explains how you can use the WebSphere Integrated Solutions Console to configure a work manager to be used by the Camunda Platform jobexecutor. It is recommended to check the [manual of the application server](http://www-01.ibm.com/software/webservers/appserv/was/library/) for additional details.

Go to **Resources / Asynchronous Bean / Work Managers** (Websphere 8) or **Resources / Concurrency / Work Managers** (Websphere 9). Select the appropriate scope, for example: `Cell=<some_id>`.
Create a new work manager in the scope using the Button **New...**.
Configure the new Work Manager. The following is a selection of sensible default values:

### General Properties

<table class="table">
  <tbody>
  <tr>
    <th>Property</th>
    <th>Default Value</th>
    <th>Explanation</th>
  </tr>
  <tr>
    <td >Name</td>
    <td >camunda-platform-jobexecutor-WM</td>
    <td >The name of the Work Manager.
    </td>
  </tr>
  <tr>
    <td >JNDI name</td>
    <td>
      <div>
        <p>wm/camunda-bpm-workmanager</p>
      </div>
    </td>
    <td>
      <p>Default JNDI name for WorkManager.</p>
      <p><strong>This setting value is mandatory and must not be changed.</strong></p>
    </td>
  </tr>
  <tr>
    <td >Description</td>
    <td >"The work manager used by the Camunda platform job executor"</td>
    <td >Describes the work manager. Any value can be used.</td>
  </tr>
  <tr>
    <td >Work Request Queue Size</td>
    <td >5</td>
    <td ><span>Specifies the size of the work request queue. The work request queue is a buffer that holds scheduled work objects and may be a value of 1 or greater. The thread pool pulls work from this queue. If you do not specify a value or the value is 0, the queue size is managed automatically. Large values can consume significant system resources.</span>
    </td>
  </tr>
  <tr>
    <td ><span>Work request queue full action</span></td>
    <td ><span>Fail</span></td>
    <td ><span>Specifies the action that is taken when the thread pool is exhausted, and the work request queue is full. This action starts when you submit non-daemon work to the work manager. The default value is block but should be changed to "<strong>Fail</strong>".</span>
    </td>
  </tr>
  </tbody>
</table>


### Thread Pool Properties

<table class="table">
  <tbody>
  <tr>
    <th>Property</th>
    <th>Default Value</th>
    <th>Explanation</th>
  </tr>
  <tr>
    <td>Number of alarm threads</td>
    <td>2</td>
    <td>Specifies the desired maximum number of threads that are used for alarms. The default value is 2.</td>
  </tr>
  <tr>
    <td>Minimum number of threads</td>
    <td>2</td>
    <td>Specifies the minimum number of threads that are available in this work manager. Should not be below "2" since one thread is blocked by the job acquisition. If you configure multiple job acquisitions, the Minimal Size should not be below Nr. of Acquisitions + 1.</td>
  </tr>
  <tr>
    <td>Maximum number of threads</td>
    <td>4</td>
    <td>Specifies the maximum number of threads that are available in this work manager used by the jobexecutor. Should be greater than "Minimum Size".</td>
  </tr>
  <tr>
    <td>Thread Priority</td>
    <td>5</td>
    <td>Specifies the priority of the threads that are available in this work manager.</td>
  </tr>
  <tr>
    <td>Growable</td>
    <td>False</td>
    <td>Specifies whether the number of threads in this work manager can be increased automatically when the maximum number of threads is reached.The default value is true, but should be changed to "False"</td>
  </tr>
  </tbody>
</table>

The following screenshot shows an example configuration of the work manager and its thread pool properties.

{{< img src="../img/work-manager.png" title="Work Manager" >}}


## Required Components

The following steps are required to deploy the Camunda Platform.

### Camunda Shared Libraries

The shared libraries include the Camunda engine and some utility JARs. The shared libraries must be visible to both the Camunda Platform as well as all process applications.

The shared libraries can be found in the lib folder of the distribution:

```
camunda-ee-ibm-was-$PLATFORM_VERSION.zip
|-- modules/
      |-- lib/  <-- The shared libs
           |-- camunda-engine-$PLATFORM_VERSION.jar
           |-- java-uuid-generator-XX.jar
           |-- mybatis-XX.jar
           |-- joda-time-XX.jar
           |-- ...
      |-- camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear
```

Copy the shared libraries into a folder, where it can be referenced from your IBM WebSphere Server installation.
Next, go to **Environment / Shared libraries**, choose the correct scope in which your EAR and applications will run and define a **new** shared library.
Name it `Camunda`. This name is **mandatory**, except when you modify the `deployment.xml` which is located inside the Camunda Platform EAR accordingly.
Enter as classpath the path where you have copied the Camunda shared libraries, e.g., `/opt/IBM/WebSphere/AppServer/profiles/AppSrv01/camunda-shared-libs`. Enable
the **Use an isolated class loader for this shared library** checkbox. Restart the IBM WebSphere Server after this operation.


### Camunda Platform EAR

The Camunda Platform distribution for IBM WebSphere Application Server includes one module in the modules folder:

```
camunda-ee-ibm-was-$PLATFORM_VERSION.zip
|-- modules/
      |-- camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear
```

The camunda-ibm-websphere-ear is a Java EE application enterprise archive (EAR) providing the Camunda Platform services. It contains an embedded rar module.
This camunda-ibm-websphere-rar module is a JCA Resource Adapter providing the jobexecutor service to the Camunda Platform.

The EAR must be installed to your IBM WebSphere Application Server:

1. Navigate to the Enterprise Applications page using the navigation path **Applications** / **Application Types** / **WebSphere enterprise applications**.
2. Click the **"Install"** Button.
3. Select the `camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear` file from the modules folder of the Camunda Platform for IBM WebSphere Application Server distribution. Click Next.
4. Select the **"Fast Path"** install option.
5. In **Step 1**, enter an application-name, eg. **"camunda-bpm-platform"**, customize other settings and click **"Next"**.
6. Continue through **Steps 2-4**, customize to your liking and finish the installation in **Step 4** by clicking **"Finish"**.
7. Save the configuration.
8. (optional) [Configure location of the bpm-platform.xml file]({{< ref "/reference/deployment-descriptors/descriptors/bpm-platform-xml.md#configure-location-of-the-bpm-platform-xml-file" >}})
9. Start the camunda-bpm-platform application. If this initially fails, try to restart the server. Also make sure the EAR does correctly reference the previously created 'Camunda' shared library.
    If it doesn't, make sure you have correctly created the shared library as 'Camunda' or assign the 'Camunda' shared library manually after the EAR installation.

## Optional Components

This section describes how to install optional components. None of these are required to work with the core platform.

### Cockpit, Tasklist and Admin

The web application archive that contains Camunda Cockpit and Camunda Tasklist resides under `$WAS_DISTRIBUTION/webapps/camunda-webapp-ee-was-$PLATFORM_VERSION.war` in the IBM WebSphere Application Server distribution archive.

In this section we explain how to install the WAR file using the IBM WebSphere enterprise application wizard provided by the WebSphere Integrated Solutions Console:

1. Open the WebSphere Integrated Solutions Console.
2. Navigate to the **Applications / Application Types / WebSphere** enterprise applications page.
3. Click the **Install** Button
4. The first page of the wizard opens. Using the file browser, select the `camunda-webapp-ee-was-$PLATFORM_VERSION.war` file from the distribution and upload it.
5. Continue to the next page.
6. Select the **"Fast Path"** on the next page.
7. Step 1. Usually no changes are required.
8. Step 2. Usually no changes are required.
9. Step 3. Usually no changes are required.
10. Step 4. Define a context root for the applications. We propose to use **/camunda**
11. Step 5. Usually no changes are required.

After completing the wizard, the applications should be successfully installed on the application server. Don't forget to save your changes to the master configuration.

The final step is to reference the shared libraries. To do so, follow these steps:

1. Navigate to the **Applications / Application Types / WebSphere** enterprise applications page.
2. Click on the name of the application (e.g., camunda-webapp-ee-was-7_2_0-ee_war).
3. Click on **Shared library references**.
4. Click on the checkbox next to the application name and click on the **Reference shared libraries** button.
5. Select the shared library **Camunda**.
6. Confirm selection by clicking on **OK**.

In some situations, you have to start the web application manually from the **Applications / Application Types / WebSphere enterprise applications** page.

You can check if everything went well by accessing Cockpit and Tasklist via `/camunda/app/cockpit` and `/camunda/app/tasklist` or under the context path you configured.

### REST API

The Camunda REST API WAR file resides under `$WAS_DISTRIBUTION/webapps/camunda-engine-rest-$PLATFORM_VERSION-was.war` in the IBM WebSphere Application Server distribution archive.

In this section we explain how to install the WAR file using the IBM WebSphere enterprise application wizard provided within the WebSphere Integrated Solutions Console:

1. Open the WebSphere Integrated Solutions Console.
2. Navigate to the **Applications / Application Types / WebSphere** enterprise applications page.
3. Click the **Install** Button
4. The first page of the wizard opens. Using the file browser, select the `camunda-engine-rest-$PLATFORM_VERSION-was.war` file from the distribution and upload it.
5. Continue to the next page.
6. Select the **"Fast Path"** on the next page.
7. Step 1. Usually no changes are required.
8. Step 2. Usually no changes are required.
9. Step 3. Usually no changes are required.
10. Step 4. Define a context root for the REST API. We propose to use **/engine-rest**
11. Step 5. Usually no changes are required.

After completing the wizard, REST API should be successfully installed on the application server. Don't forget to save your changes to the master configuration.

The final step is to reference the shared libraries. To do so, follow these steps:

1. Navigate to the **Applications / Application Types / WebSphere** enterprise applications page.
2. Click on the name of the application (e.g., camunda-engine-rest-7_2_0-ee-was_war).
3. Click on **Shared library references**.
4. Click on the checkbox next to the application name and click on the **Reference shared libraries** button.
5. Select the shared library **Camunda**.
6. Confirm selection by clicking on **OK**.

In some situations, you have to start the web application manually from the **Applications / Application Types / WebSphere enterprise applications** page.

### Camunda Connect plugin

Add the following artifacts (if not existing) from the folder `$WAS_DISTRIBUTION/modules/lib` to the `Camunda` shared library folder:

* `camunda-commons-utils-$COMMONS_VERSION.jar`

In order to activate Camunda Connect functionality for a process engine, a process engine plugin has to be registered in the Camunda Platform configuration as follows:

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

Note that this requires a custom `bpm-platform.xml` file.

### Camunda Spin

Add the following artifacts (if not existing) from the folder `$WAS_DISTRIBUTION/modules/lib/` to the `Camunda` shared library folder:

* `camunda-spin-core-$SPIN_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`

In order to activate Camunda Spin functionality for a process engine, a process engine plugin has to be registered in the Camunda Platform configuration as follows:

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

Note that this requires a custom `bpm-platform.xml` file.

### Groovy scripting

Add the following artifacts (if not existing) from the folder `$WAS_DISTRIBUTION/modules/lib/` to the `Camunda` shared library folder:

* `groovy-all-$GROOVY_VERSION.jar`

### GraalVM JavaScript integration

Add the following artifacts (if not existing) from the folder `$WAS_DISTRIBUTION/modules/lib/` to the `Camunda` shared library folder:

* `graal-sdk-21.1.0.jar`
* `icu4j-68.2.jar`
* `js-21.1.0.jar`
* `js-scriptengine-21.1.0.jar`
* `regex-21.1.0.jar`
* `truffle-api-21.1.0.jar`

## Process Applications

After installing a Process Application (PA) in your IBM WebSphere Application Server, which **does not** include the Camunda Platform dependencies,
you must assign the previously created **"Camunda"** shared library with the Process Application deployment.
This should only be necessary when you use the **"shared"** engine deployment approach and not the **"embedded"** process engine one (aka self-contained Process Application).

## Troubleshooting

### Define IBM WebSphere Resources in the right scope

When installing the Camunda Platform application, you may see error messages indicating that you are referencing resources from the wrong scope. Make sure you define the resources in the right scope so all components are visible to each other. Make sure you understand the IBM WebSphere management concepts "Cell", "Node" and "Server".

# Setup for WebSphere Application Server Liberty

To fully install Camunda Platform 7 on WebSphere Liberty, you need to configure the following components:

* Datasource
* Work Manager
* Camunda EAR and shared libraries
* Optional components - Camunda Webapps, REST API, etc.

## Server configuration

WebSphere Liberty relies on [Liberty features][liberty-features] to make servers lightweight and composable. 
A Liberty server configuration is centralized in a single `server.xml` file that exists in the `$SERVER_CONFIG_DIR` 
folder. 

{{< note title="WebSphere Liberty vs Open Liberty" class="info" >}}
Camunda Platform 7 requires certain Liberty features that are only available in the WebSphere Liberty edition. As a
result, Open Liberty is not supported by Camunda Platform 7.
{{< /note >}}

{{< note title="Java EE Liberty features support" class="info" >}}
Liberty supports multiple Java/Jakarta EE versions through features with multiple versions (ex. `cdi-1.0`, `cdi-1.2`,
`cdi-2.0`, etc.).

Camunda Platform 7 doesn't support Java EE 6, or Jakarta EE 9+ features since they don't provide all the APIs required
to run Camunda Platform 7 correctly.

We recommend using Java EE 8 Liberty features to run Camunda Platform 7 on WebSphere Liberty. Java EE 7 Liberty features
are supported, but not recommended as they use older implementations that are close to end-of-life.

If you decide to mix Liberty features from different Java EE versions, check the 
[Java EE feature combinations page][liberty-java-ee] to ensure that the all the features are inter-compatible. 
{{< /note >}}

This guide will show you what to place in the `$SERVER_CONFIG_DIR` folder, and what to add in the `server.xml` file
to successfully install Camunda Platform 7 on WebSphere Liberty.

At the end of the installation, your Liberty server folder should have the following structure:

```
wlp/usr/servers/
|-- camundaServer/
      |-- lib/  <-- The shared libs
           |-- camunda-engine-$PLATFORM_VERSION.jar
           |-- java-uuid-generator-XX.jar
           |-- mybatis-XX.jar
           |-- joda-time-XX.jar
           |-- ...
           |-- JDBC_DRIVER.jar
      |-- apps/ <-- EAR & WAR applications
           |-- camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear
           |-- ..
      |-- server.xml <-- configuration file
```

Furthermore, when your Liberty server is fully configured for Camunda Platform 7, the `server.xml` file should have the 
following content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<server description="camunda server">

  <!-- Enable features -->
  <featureManager>
    <feature>jdbc-4.2</feature>
    <feature>concurrent-1.0</feature>
    <feature>heritageAPIs-1.1</feature>
    <feature>mdb-3.2</feature>
    <feature>jca-1.7</feature>
    <feature>ejbRemote-3.2</feature>
    <feature>jndi-1.0</feature>
    <feature>servlet-4.0</feature>
    <feature>bells-1.0</feature>
  </featureManager>

  <!-- To access this server from a remote client add a host attribute to the following element, e.g. host="*" -->
  <httpEndpoint id="defaultHttpEndpoint"
                httpPort="9080"
                httpsPort="9443" />

  <!-- Automatically expand WAR and EAR files -->
  <applicationManager autoExpand="true" />

  <!-- Default SSL configuration enables trust for default certificates from the Java runtime -->
  <ssl id="defaultSSLConfig" trustDefaultCerts="true" />

  <!-- JDBC library definition -->
  <library id="camundaJDBCLib">
      <fileset dir="${server.config.dir}/lib" includes="ojdbc8-*.jar" />
  </library>

  <!-- Camunda libraries definition -->
  <library id="Camunda">
    <fileset dir="${server.config.dir}/lib" includes="*.jar" />
  </library>
  <bell libraryRef="Camunda"/> <!-- used to enable SPI detection -->

  <!-- Datasource Configuration -->
  <dataSource
      id="CamundaBpmDataSource"
      jndiName="jdbc/ProcessEngine"
      type="javax.sql.DataSource"
      isolationLevel="TRANSACTION_READ_COMMITTED" >
      <jdbcDriver
          javax.sql.DataSource="oracle.jdbc.pool.OracleDataSource"
          libraryRef="camundaJDBCLib"/> <!-- reference to the JDBC library defined above -->
      <properties.postgresql databaseName="process-engine"
                         URL="${database.url}"
                         user="${database.username}"
                         password="${database.password}"/>
  </dataSource>

  <!-- work manager definition - the jndiName value must remain the same -->
  <managedExecutorService id="camunda-platform-jobexecutor-WM"
                          jndiName="wm/camunda-bpm-workmanager"
                          contextServiceRef="DefaultContextService">
    <concurrencyPolicy max="4" maxQueueSize="5" maxPolicy="strict"/>
  </managedExecutorService>

  <!-- required for correct ExecutorService configuration -->
  <!-- the values of the jndiName and id attributes must have these values  -->
  <connectionFactory jndiName="eis/JcaExecutorServiceConnectionFactory">
    <!-- this element must be added - required for correct classpath scanning -->
    <properties.camunda-bpm-platform.camunda-ibm-websphere-rar />
  </connectionFactory>
  <activationSpec id="eis/PlatformJobExecutorActivation">
    <!-- this element must be added - required for correct classpath scanning -->
    <properties.camunda-bpm-platform.camunda-ibm-websphere-rar />
  </activationSpec>

  <!-- applications definition -->
  <enterpriseApplication id="camundaBpmPlatform"
                         name="camunda-bpm-platform"
                         location="${server.config.dir}apps/camunda-ibm-websphere-ear.ear" >
    <classloader commonLibraryRef="Camunda"/>
  </enterpriseApplication>

</server>
```

The [Liberty directory location][liberty-dirs] documentation provides more details on the file structure of
the WebSphere Liberty application server, and the [Liberty server configuration][liberty-server-opts] section provides 
information on all the possible configuration elements of a `server.xml` file.

The sections below provide more details for each configuration section of the `server.xml`.

## Datasource

Camunda Platform 7 requires a datasource that will be used by the process engine. To provide a datasource in 
WebSphere Liberty, the following steps need to be performed:

* Create the database schema and tables
* Configure a JDBC driver library and a datasource in the `server.xml`

### Create the database schema and tables

In the default Camunda Platform 7 configuration, the database schema and all required tables are automatically 
created when the engine starts up for the first time. If you do not want the database schema and tables to be
automatically created, you have to perform the following:

* Create a database schema for the Camunda Platform yourself.
* Install the database schema to create all required tables and default indices using our
   [database schema installation guide][db-schema-install].

When you create the tables manually, you have to configure the engine to **not** create tables at startup by 
setting the `databaseSchemaUpdate` property to `false` (or, in case you are using Oracle, to `noop`). In WebSphere 
Liberty, this is done in the `bpm-platform.xml`, located in the 
`$WAS_HOME\modules\camunda-ibm-websphere-ear-$VERSION.ear\camunda-ibm-websphere-service.jar\META-INF\` folder.

### Configure a datasource

Camunda Platform uses one or multiple process engines which must be connected to a datasource. To configure a 
datasource in WebSphere Liberty, you need perform the following:

1. Add a JDBC driver library to the `$SERVER_CONFIG_DIR/lib` folder
2. Add the `jdbc-4.2` and `jndi-1.0` Liberty features to the `server.xml`
2. Define a JDBC shared library in the `server.xml`
3. Configure a datasource element in the `server.xml`
4. Set a JNDI name for the datasource element in the `server.xml`

For example, to use an Oracle DB as the datasource, you should first place the Oracle JDBC driver `.jar` archive in
`$SERVER_CONFIG_DIR/lib`. Next, you should add the following to the `server.xml` file:

```xml
<server>

  <!-- Enable features -->
  <featureManager>
    <feature>jdbc-4.2</feature>
    <feature>jndi-1.0</feature>
  </featureManager>

  <!-- Specify JDBC shared library -->
  <library id="camundaJDBCLib">
    <fileset dir="${server.config.dir}/lib" includes="ojdbc8-*.jar" />
  </library>

  <!-- Configure datasource -->
  <dataSource
      id="CamundaBpmDataSource"
      jndiName="jdbc/ProcessEngine"
      type="javax.sql.DataSource"
      isolationLevel="TRANSACTION_READ_COMMITTED" >
    <jdbcDriver
        javax.sql.DataSource="com.ibm.db2.jcc.DB2Driver"
        libraryRef="camundaJDBCLib"/>
    <properties
        URL="${database.url}"
        user="${database.username}"
        password="${database.password}" />
  </dataSource>
...
</server>
```

WebSphere Liberty provides more details on [configuring a datasource][liberty-datasource-conf] and 
[shared library][liberty-lib-conf] definition.

Note that you may configure multiple datasources used by different process engine instances.
See the [User Guide]({{< ref "/user-guide/_index.md" >}}) for details.

#### Datasource JNDI name

In the XML code snippet above, you can see that the datasource JNDI name was set to `jdbc/ProcessEngine`. This is the 
default datasource JNDI name used by the process engine. 

The JNDI name of the datasource must be equal to the name used in the datasource-Element of the process engine(s) 
configured in the bpm-platform.xml file.

## Work manager

Camunda Platform uses a Job Executor to support asynchronous execution. To integrate the Camunda Platform Job Executor
with WebSphere Liberty, Camunda relies on the `CommonJ Work manager`.

The Camunda Platform Job Executor integration with Liberty requires the following Liberty features:

* `concurrent-1.0`
* `heritageAPIs-1.1`
* `mdb-3.2`
* `jca-1.7`
* `ejbRemote-3.2`
* `jndi-1.0`

To correctly configure the Camunda Platfom 7 Job Executor in WebSphere Liberty, you need to define the following
elements in the `server.xml` file:

* `managedExecutorService` - use to configure the thread pool
* `connectionFactory` - used to correctly instantiate a JCA connection factory for the executor service
* `activationSpec` - used to correctly instantiate an MDB activation specification

The `server.xml` should look like the following example:

```xml
<server>
  <featureManager>
    <feature>concurrent-1.0</feature>
    <feature>heritageAPIs-1.1</feature>
    <feature>mdb-3.2</feature>
    <feature>jca-1.7</feature>
    <feature>ejbRemote-3.2</feature>
    <feature>jndi-1.0</feature> <!-- if not already added -->
  </featureManager>

  <!-- work manager definition -->
  <managedExecutorService id="camunda-platform-jobexecutor-WM"
                          jndiName="wm/camunda-bpm-workmanager"
                          contextServiceRef="DefaultContextService">
    <concurrencyPolicy max="4" maxQueueSize="5" maxPolicy="strict" runIfQueueFull="false" />
  </managedExecutorService>

  <!-- required for correct ExecutorService configuration -->
  <connectionFactory jndiName="eis/JcaExecutorServiceConnectionFactory">
    <properties.camunda-bpm-platform.camunda-ibm-websphere-rar />
  </connectionFactory>
  <activationSpec id="eis/PlatformJobExecutorActivation">
    <properties.camunda-bpm-platform.camunda-ibm-websphere-rar />
  </activationSpec>

</server>
```

### Concurrency policy attributes

You can use the following attributes of the `concurrencyPolicy` element to configure the CommonJ Work manager:

<table class="table">
  <tbody>
    <tr>
      <th>Property</th>
      <th>Default Value</th>
      <th>Explanation</th>
    </tr>
    <tr>
      <td>max</td>
      <td>4</td>
      <td>Specifies the desired maximum number of threads that are used for alarms. The default value is 2.</td>
    </tr>
    <tr>
      <td>maxQueueSize</td>
      <td>5</td>
      <td>Specifies the size of the work request queue. The work request queue is a buffer that holds scheduled work 
          objects and may be a value of 1 or greater. The thread pool pulls work from this queue. If you do not specify a 
          value or the value is 0, the queue size is managed automatically. Large values can consume significant system 
          resources.
      </td>
    </tr>
    <tr>
      <td>runIfQueueFull</td>
      <td>false</td>
      <td>Specifies the action that is taken when the thread pool is exhausted, and the work request queue is full. This 
          action starts when you submit non-daemon work to the work manager. The value should be set to <code>false</code>.
      </td>
    </tr>
  </tbody>
</table>


### Required values

The following JNDI names and IDs are mandatory, and shouldn't be changed:

<table class="table">
  <tbody>
    <tr>
      <th>Configuration element</th>
      <th>Required Value</th>
      <th>Explanation</th>
    </tr>
    <tr>
      <td><code>managedExecutorService#jndiName</code></td>
      <td><code>wm/camunda-bpm-workmanager</code></td>
      <td>The JNDI name of the Work Manager.</td>
    </tr>
    <tr>
      <td><code>connectionFactory#jndiName</code></td>
      <td><code>eis/JcaExecutorServiceConnectionFactory</code></td>
      <td>The JNDI name of the JCA ConnectionFactory used by the JobExecutor service.</td>
    </tr>
    <tr>
      <td><code>activationSpec#id</code></td>
      <td><code>eis/PlatformJobExecutorActivation</code></td>
      <td>The ID of the MDB activationSpec used for passing Jobs to the JobExecutor.</td>
    </tr>
  </tbody>
</table>

Furthermore, to correctly activate, the `connectionFactory` and `activationSpec` elements must contain the 
following empty XML sub-element:

```xml
<properties.camunda-bpm-platform.camunda-ibm-websphere-rar />
```

In the code snippet above, the `camunda-bpm-platform` segment of the `properties` element is defined by the `name` 
attribute of the [Camunda Platform EAR application](camunda-platform-ear-1), while the `camunda-ibm-websphere-rar` is 
the name of the EAR JCA Resource Adapter camunda-ibm-websphere-rar module, and shouldn't be changed.

## Required components

To correctly install Camunda Platform 7 process engine, you need to perform the following steps:

1. Configure the Camunda shared library
2. Configure the Camunda Platform EAR deployment

### Camunda shared library

The Camunda shared library is used by all the Camunda Platform EAR and WAR applications, as well as any process 
applications you may deploy. As such, it's one of the core components of the Camunda Platform installation, and it is 
important to configure it correctly.

To configure the Camunda shared library, you need to perform the following steps:

1. Add the `.jar` artifacts from the `$WAS_DISTRIBUTION/modules/lib/` folder to the
   `$SERVER_CONFIG_DIR/lib` folder
2. Add the `bells-1.0` feature to the `server.xml`
3. Define a `library` element in the `server.xml`
  * The `library#id` attribute should be set to `Camunda`
  * All the `.jar` artifacts should be included. See the [Liberty shared lib][liberty-lib-conf] page for more details
4. Define a `bell` element in the `server.xml`
  * The `bell#libraryRef` attribute should be set to the value of the `library#id` attribute, i.e. `Camunda`

Once you perform all the steps, the `server.xml` should have the following content:

```xml
<server>

  <!-- Enable features -->
  <featureManager>
    <feature>bells-1.0</feature> <!-- used to enable SPI  -->
  </featureManager>

  <!-- Camunda libraries definition -->
  <library id="Camunda">
    <fileset dir="${server.config.dir}/lib" includes="*.jar" />
  </library>
  <bell libraryRef="Camunda"/>

</server>
```

{{< note title="WebSphere Liberty SPI discovery" class="info" >}}
WebSphere Liberty doesn't perform SPI discovery by default. Since Camunda Platform 7 uses SPI for certain features,
you need to enable SPI discovery by adding the `bells-1.0` Liberty feature, and use the `bell` element in the 
`server.xml` to specify  any shared libraries that rely on SPI.
{{< /note >}}

### Camunda Platform EAR

The camunda-ibm-websphere-ear is a Java EE application enterprise archive (EAR) providing the Camunda Platform services. 
It contains an embedded rar module. This camunda-ibm-websphere-rar module is a JCA Resource Adapter providing the 
`jobexecutor` service to the Camunda Platform.

You need to perform the following steps to install the EAR archive on WebSphere Liberty:

1. Add the `camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear` from the `$WAS_DISTRIBUTION/modules/lib/` folder to 
   the `$SERVER_CONFIG_DIR/apps` folder
2. Add the `servlet-4.0` Liberty feature to the `server.xml`
3. Define an `enterpriseApplication` element in the `server.xml`
4. Reference the Camunda shared library in the `enterpriseApplication` inside the `server.xml`
  * The Camunda shared library is referenced by adding a `classloader` element.
5. (optional) [Configure location of the bpm-platform.xml file][bpm-platform-xml-config]

After performing the steps above, the `server.xml` should contain the following:

```xml
<server>

  <!-- Enable features -->
  <featureManager>
    <feature>servlet-4.0</feature>
  </featureManager>

  <!-- EAR application definition -->
  <enterpriseApplication id="camundaBpmPlatform"
                         name="camunda-bpm-platform"
                         location="${server.config.dir}/apps/camunda-ibm-websphere-ear.ear" >
    <classloader commonLibraryRef="Camunda"/>
  </enterpriseApplication>

</server>
```

Note that if you decide to change the value of the `enterpriseApplication#name` attribute, you should adjust the
`properties` elements defined in the [Work manager](#work-manager) configuration.

You can check the [Liberty `enterpriseApplication` docs][liberty-ear] for more details on how to configure an EAR
application deployment.

## Optional components

This section describes how to install optional components. None of these are required to work with the core platform.

### Cockpit, Tasklist, and Admin

The web application archive that contains Camunda Cockpit, Camunda Admin, and Camunda Tasklist resides under 
`$WAS_DISTRIBUTION/webapps/camunda-webapp-ee-was-$PLATFORM_VERSION.war` in the IBM WebSphere Application Server 
distribution archive.

You need to perform the following steps to install the WAR archive on WebSphere Liberty:

1. Add the `camunda-webapp-ee-was-$PLATFORM_VERSION.war` from the `$WAS_DISTRIBUTION/webapps/` folder to
   the `$SERVER_CONFIG_DIR/apps` folder
2. Add the `jaxrs-2.1` Liberty feature to the `server.xml`
3. Define a `webApplication` element in the `server.xml`
4. Reference the Camunda shared library in the `webApplication` inside the `server.xml`
  * The Camunda shared library is referenced by adding a `classloader` element.

After performing the steps above, the `server.xml` should contain the following:

```xml
<server>

  <!-- Enable features -->
  <featureManager>
    <feature>jaxrs-2.1</feature>
  </featureManager>

  <!-- applications definition -->
  <webApplication id="camundaBpmPlatformWebapps"
                  name="camunda"
                  startAfterRef="camundaBpmPlatform"
                  location="${server.config.dir}/apps/camunda-webapp-ee-was9.war" >
    <classloader commonLibraryRef="Camunda"/>
  </webApplication>

</server>
```

You can check if everything went well by accessing Cockpit, Admin, and Tasklist via `/camunda/app/cockpit`, 
`/camunda/app/admin`, and `/camunda/app/tasklist` or under the context path you configured.

You can check the [Liberty `webApplication` docs][liberty-webapp] for more details on how to configure a WAR
application deployment.

### REST API

The Camunda REST API WAR file resides under `$WAS_DISTRIBUTION/webapps/camunda-engine-rest-$PLATFORM_VERSION-was.war` 
in the IBM WebSphere Application Server distribution archive.

You need to perform the following steps to install the WAR archive on WebSphere Liberty:

1. Add the `camunda-engine-rest-$PLATFORM_VERSION-was.war` from the `$WAS_DISTRIBUTION/webapps/` folder to
   the `$SERVER_CONFIG_DIR/apps` folder
2. Add the `jaxrs-2.1` Liberty feature to the `server.xml`
3. Define a `webApplication` element in the `server.xml`
4. Reference the Camunda shared library in the `webApplication` inside the `server.xml`
  * The Camunda shared library is referenced by adding a `classloader` element.

After performing the steps above, the `server.xml` should contain the following:

```xml
<server>

  <!-- Enable features -->
  <featureManager>
    <feature>jaxrs-2.1</feature> <!-- if not already added -->
  </featureManager>

  <!-- applications definition -->
  <webApplication id="camundaBpmPlatformRestApi"
                  name="engine-rest"
                  startAfterRef="camundaBpmPlatform"
                  location="${server.config.dir}/apps/camunda-engine-rest.war" >
    <classloader commonLibraryRef="Camunda"/>
  </webApplication>

</server>
```

You can check the [Liberty `webApplication` docs][liberty-webapp] for more details on how to configure a WAR
application deployment.

### Camunda Connect plugin

Add the following artifacts (if not existing) from the folder `$WAS_DISTRIBUTION/modules/lib` to the 
`$SERVER_CONFIG_DIR/lib` folder:

* `camunda-commons-utils-$COMMONS_VERSION.jar`

In order to activate Camunda Connect functionality for a process engine, you need to register a process engine plugin
in the Camunda Platform configuration as follows:

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

Note that this requires a custom `bpm-platform.xml` file.

### Camunda Spin

Add the following artifacts (if not existing) from the folder `$WAS_DISTRIBUTION/modules/lib/` to the 
`$SERVER_CONFIG_DIR/lib` folder:

* `camunda-spin-core-$SPIN_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`

In order to activate Camunda Spin functionality for a process engine, you need to register a process engine plugin 
in the Camunda Platform configuration as follows:

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

Note that this requires a custom `bpm-platform.xml` file.

### Groovy scripting

Add the following artifacts (if not existing) from the folder `$WAS_DISTRIBUTION/modules/lib/` to the 
`$SERVER_CONFIG_DIR/lib` folder:

* `groovy-$GROOVY_VERSION.jar`
* `groovy-jsr223-$GROOVY_VERSION.jar`
* `groovy-json-$GROOVY_VERSION.jar`
* `groovy-xml-$GROOVY_VERSION.jar`
* `groovy-templates-$GROOVY_VERSION.jar`

### GraalVM JavaScript integration

Add the following artifacts (if not existing) from the folder `$WAS_DISTRIBUTION/modules/lib/` to the 
`$SERVER_CONFIG_DIR/lib` folder:

* `graal-sdk-21.1.0.jar`
* `icu4j-68.2.jar`
* `js-21.1.0.jar`
* `js-scriptengine-21.1.0.jar`
* `regex-21.1.0.jar`
* `truffle-api-21.1.0.jar`

## Process Applications

After installing a Process Application (PA) in your IBM WebSphere Liberty Server, which **does not** include the 
Camunda Platform dependencies, you must reference  the previously created [**"Camunda"** shared library](#camunda-shared-library) 
with the Process Application deployment. This should only be necessary when you use the **"shared"** engine deployment 
approach and not the **"embedded"** process engine one (aka self-contained Process Application).

Your Process Application deployment in the `server.xml` file should look like the following example:

```xml
<server>

  <!-- process application definition -->
  <application id="camundaPA"
               type="..."
               name="camunda-process-application"
               location="${server.config.dir}/apps/camunda-process-application.ear" >
    <classloader commonLibraryRef="Camunda"/>
  </application>

</server>
```

You can check the [Liberty `application` docs][liberty-app] for more details on how to configure an application 
deployment.

### Servlet Process Applications

If you decide to use `ServletProcessApplications`, make sure that the Camunda shared library is correctly configured
with the `bells-1.0` Liberty feature as described in the [Camunda shared library section](#camunda-shared-library).

[liberty]: https://www.ibm.com/cloud/websphere-liberty
[liberty-features]: https://www.ibm.com/docs/en/was-liberty/core?topic=management-liberty-features
[liberty-java-ee]: https://www.ibm.com/docs/en/was-liberty/base?topic=architecture-supported-java-ee-7-8-feature-combinations
[liberty-dirs]: https://www.ibm.com/docs/en/was-liberty/base?topic=liberty-directory-locations-properties
[liberty-server-opts]: https://www.ibm.com/docs/en/was-liberty/core?topic=overview-server-configuration
[liberty-ear]: https://www.ibm.com/docs/en/was-liberty/core?topic=configuration-enterpriseapplication
[liberty-webapp]: https://www.ibm.com/docs/en/was-liberty/core?topic=configuration-webapplication
[liberty-app]: https://www.ibm.com/docs/en/was-liberty/base?topic=deploying-applications-in-liberty
[liberty-lib-conf]: https://www.ibm.com/docs/en/was-liberty/base?topic=overview-shared-libraries
[liberty-datasource-opts]: https://www.ibm.com/docs/en/was-liberty/base?topic=SSEQTP_liberty/com.ibm.websphere.liberty.autogen.nd.doc/ae/rwlp_config_dataSource.html
[liberty-datasource-conf]: https://www.ibm.com/docs/en/was-liberty/base?topic=liberty-configuring-default-data-source

[was9]: https://www.ibm.com/docs/en/was/9.0.5?topic=SSEQTP_9.0.5/as_ditamaps/was9_welcome_base.html

[bpm-platform-xml-config]: {{< ref "/reference/deployment-descriptors/descriptors/bpm-platform-xml.md#configure-location-of-the-bpm-platform-xml-file" >}}
[db-schema-install]: {{< ref "/installation/database-schema.md" >}}

