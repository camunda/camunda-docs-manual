---

title: 'Install the Full Distribution on Oracle WebLogic Application Server'
weight: 20

menu:
  main:
    name: "Manual Installation"
    identifier: "installation-guide-full-wls-install-manual"
    parent: "installation-guide-full-wls"
    pre: "Install and configure the Full Distribution on Oracle WebLogic Application Server."

---


This section will describe how you can install the Camunda BPM platform and its components on an Oracle WebLogic.

{{< note title="Reading this Guide" class="info" >}}
This guide uses a number of variables to denote common path names and constants.

* `$WLS_DOMAIN_HOME` points to the Oracle WebLogic application server domain directory (typically something like `/opt/oracle/WebLogic/domains/mydomain`).
* `$PLATFORM_VERSION` denotes the version of the Camunda BPM platform you want to or have installed, e.g. `7.0.0`.
* `$WLS_DISTRIBUTION` represents the downloaded Camunda BPM distribution for the Oracle WebLogic Application Server, e.g., `camunda-ee-oracle-wls-$PLATFORM_VERSION.zip`.

The distribution is available at the [Camunda enterprise release page](http://camunda.org/enterprise-release/camunda-bpm/oracle-wls/).
You will be asked to enter the credentials you received during the trial or subscription process.
{{< /note >}}


# Setup

Before you can install the Camunda components, you need to perform a number of required setup steps.


## Resource Configuration

The Camunda BPM platform requires a set of resources that need to be configured at the application server level:

* One or multiple datasources to be used by the engine.
* A work manager for the job executor.


## Create the Database Schema and Tables

In the default configuration of the distribution, the database schema and all required tables are automatically created in an H2 database when the engine starts up for the first time. If you do not want to use the H2 database, you have to 

* Create a database schema for the Camunda BPM platform yourself.
* Execute the SQL DDL scripts which create all required tables and default indices.

The SQL DDL scripts reside in the `sql/create` folder of the distribution:

`$WLS_DISTRIBUTION/sql/create/*_engine_$PLATFORM_VERSION.sql`
`$WLS_DISTRIBUTION/sql/create/*_identity_$PLATFORM_VERSION.sql`

As an alternative, you can also find a collection of the SQL scripts on our [Nexus](https://app.camunda.com/nexus/content/repositories/camunda-bpm/org/camunda/bpm/distro/camunda-sql-scripts/). Select the respective version and download the scripts as a `zip` or `tar.gz` file, then open the `camunda-sql-scripts-$PLATFORM_VERSION/create` folder.

There is an individual SQL script for each supported database. Select the appropriate script for your database and run it with your database administration tool (e.g., SqlDeveloper for Oracle).

When you create the tables manually, then you have to configure the engine to **not** create tables at startup by setting the `databaseSchemaUpdate` property to `false` (or, in case you are using Oracle, to `noop`). In WebLogic, this is done in the `bpm-platform.xml`, located in the `$WLS_HOME\modules\camunda-oracle-weblogic-ear-$VERSION.ear\camunda-oracle-weblogic-service.jar\META-INF\` folder.

{{< note title="Heads Up!" class="info" >}}
If you have defined a specific prefix for the entities of your database, then you will have to manually adjust the `create` scripts accordingly so that the tables are created with the prefix.

Please note further that READ COMMITED is the default isolation level for database systems to run Camunda with. You may have to change the default setting on your database when installing Camunda. For more information see the documentation on [isolation levels]({{< relref "user-guide/process-engine/database.md#isolation-level-configuration" >}}).
{{< /note >}}


## JDBC/Datasource Configuration

The Camunda BPM platform uses one or multiple process engines. Use the Oracle WebLogic Server Administration Console for the configuration of the datasources.
The JNDI name of the datasource must be equal to the name used in the datasource-Element of the process engine(s) configured in the bpm-platform.xml.


### Default JNDI Name

The default JNDI name is `jdbc/ProcessEngine`

The following screenshot shows the mandatory configuration of a datasource for Camunda BPM:

{{< img src="../img/datasource-jndi.png" title="JNDI Name" >}}

In this section we explain how to add a datasource using the Oracle WebLogic Server Administration Console:

1. Open the Oracle WebLogic Server Administration Console.
2. Navigate to the **"Domain Structure / YOUR_DOMAIN / Services / Data Sources"** page.
3. Click the **"New"** Button and select **"Generic Data Source"**.
4. On the next page, enter a name for the datasource.
5. Enter the required JNDI Name **"jdbc/ProcessEngine"**, which is **mandatory** for the Camunda BPM platform.
6. Continue to the next pages and fill in your database credentials.
7. When you finished the creation of the datasource, click the **"Finish"** Button to complete the installation.
8. Check the box in front of your datasource and test if it works.

Note that you can configure multiple datasources used by different process engine instances. See the [User Guide]({{< relref "user-guide/index.md" >}}) for details.


# Required Components

The following steps are required to deploy the Camunda BPM platform onto an Oracle WebLogic server.


## Install the Camunda BPM Platform Shared Libraries

The shared libraries include the Camunda engine and some utility JARs. The shared libraries must be visible to both the Camunda BPM platform as well as all process applications.

The shared libraries can be found in the lib folder of the distribution:

```
camunda-ee-oracle-wls-$PLATFORM_VERSION.zip
|-- modules/
      |-- lib/  <-- The shared libs
           |-- camunda-engine-$PLATFORM_VERSION.jar
           |-- java-uuid-generator-XX.jar
           |-- mybatis-XX.jar
           |-- ...
      |-- camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear
```

The shared libraries must be copied to the `$WLS_DOMAIN_HOME/lib` folder of your Oracle WebLogic Server installation. Do **"NOT"** copy it to your `$WL_HOME/lib` folder.
Restart the Oracle WebLogic Server after this operation.

{{< note title="Shared Libraries" class="info" >}}
  You can optionally create a shared library out of the Camunda BPM platform shared libraries. Then associate it with the `camunda-oracle-weblogic-ear` during installation. Associate the shared library with each deployed process application.

  Have a look at the [Oracle WebLogic documentation](https://docs.oracle.com/cd/E24329_01/web.1211/e24368/libraries.htm#WLPRG325) on how to create the shared library.
{{< /note >}}


## Install the Camunda BPM Platform Modules

The Camunda BPM platform includes one module in the modules folder of the distribution:

```
camunda-ee-oracle-wls-$PLATFORM_VERSION.zip
|-- modules/
      |-- camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear
```

The `camunda-oracle-weblogic-ear` is a Java EE application providing the Camunda BPM platform services. It contains an embedded JCA Resource Adapter, the camunda-oracle-weblogic-rar, which provides the jobexecutor service to the Camunda BPM platform.
It must be installed to your Oracle WebLogic Application Server.


## Install the Camunda BPM Platform Application

In this section, we explain how the camunda-oracle-weblogic-ear module can be installed using the Oracle WebLogic Server Administration Console.
The installation process is composed of two steps:

1. Install the `camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear` EAR file.
2. Configure the deployment order of `camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear` EAR file.


### Install the EAR File

First the `camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear` RAR file must be installed:

1. Open the Oracle WebLogic Server Administration Console.
2. Navigate to the **"Domain structure / YOUR_DOMAIN / Deployments"** page.
3. Select the **"Install"** button.
4. Using the File Browser, select the `camunda-oracle-weblogic-ear-$PLATFORM_VERSION.ear` from the modules folder of the Camunda BPM platform for Oracle WebLogic Application Server distribution and continue to the **"Next"** page.
5. Select **"Install this deployment as an application"** and continue to the **"Next"** page.
6. Fill in `camunda-bpm-platform` as name for the enterprise application deployment. This setting is **mandatory** and **MUST NOT** be changed.

{{< img src="../img/ear-name.png" title="EAR Name" >}}

7. Continue to the **"Next"** page.
8. Select **"Yes, take me to the deployment's configuration screen"** and click the **"Finish"** button to complete the installation.
9. (optional) [Configure location of the bpm-platform.xml file]({{< relref "reference/deployment-descriptors/descriptors/bpm-platform-xml.md#configure-location-of-the-bpm-platform-xml-file" >}}).

### Configure the Deployment Order

1. In the deployment's configuration screen, change the value of the **"Deployment Order"** from **"100"** to **"90"**, so the Enterprise Application starts before process application deployments.
2. Click **"Save"** to persist the change.

Example: Deployment order set to **"90"**.

{{< img src="../img/ear-deploymentorder.png" title="Deployment Order" >}}


### Configure the JCA Work Manager

1. In the EAR's deployment configuration screen under modules, select the `camunda-oracle-weblogic-rar.rar` entry. Click on the **"Configuration"** tab on the following page.
2. Now select the **"Workload"** tab.
3. Here, you see a preconfigured JCA Work Manager named **"wm/camunda-bpm-workmanager"**. Click on it.
4. For **"Minimum Threads Constraint"**, select the preconfigured **"camunda-bpm-workmanager-min-threads"** option. Per default, we configure 2 threads as a minimum. **At least 2 threads are required**, but you can increase them when you think you do a lot of asynchronous work.
5. For **"Maximum Threads Constraint"**, select the preconfigured **"camunda-bpm-workmanager-max-threads"** option. Per default, we configure 5 threads, but you can increase them when you think you do a lot of asynchronous work.
6. For **"Stuck Thread Action"**, select **"Ignore stuck threads"**, because we have a long running daemon thread which acquires the jobs to execute. This forces Oracle WebLogic to skip the Stuck Thread Warning which would otherwise appear in the server log every ten minutes.
7. For **"Capacity Constraint"**, select the preconfigured **"camunda-bpm-workmanager-capacity"** option. Per default, we configure a queue size of 10 for the workmanager, but you can always tune it accordingly to your needs.
8. Click **"Save"** to persist your changes.

Now you can start the camunda-bpm-platform application if it is not already running. If this initially fails, try to restart the server.</p>
Example: Finished configuration of the JCA Work Manager used by the resource adapter.

{{< img src="../img/work-manager.png" title="Work Manager" >}}


# Optional Components

This section describes how to install optional components onto an Oracle WebLogic server. None of these are required to work with the core platform.

## Cockpit, Tasklist and Admin

The web application archive that contains Camunda Cockpit and Tasklist resides under `webapps/camunda-webapp-ee-wls-$PLATFORM_VERSION.war` in the Oracle WebLogic Application Server distribution archive.

In this section we explain how to install the WAR file using the Oracle WebLogic Server Administration Console:

1. Open the Oracle WebLogic Server Administration Console.
2. Navigate to the **Domain Structure / YOUR_DOMAIN / Deployments** page.
3. Click the **Install** button. The first page of the Wizard opens.
4. Using the File Browser, select the `camunda-webapp-ee-wls-$PLATFORM_VERSION.war` file from the distribution and upload it.
5. Continue to the **Next** page.
6. Select **Install this deployment as an application** and continue to the **Next** page.
7. Click the **Finish** button to complete the installation.

After completing the wizard, the Cockpit and Tasklist should be accessible on the default context path **/camunda**.
In some situations, you also have to start the web application manually from the **Domain Structure / YOUR_DOMAIN / Deployments** page.

You can check if everything went well by accessing Cockpit, Tasklist and Admin via `/camunda/app/cockpit`, `/camunda/app/tasklist` and `/camunda/app/admin` or under the context path you configured.


## REST API

The Camunda REST API WAR file resides under `webapps/camunda-engine-rest-$PLATFORM_VERSION-wls.war` in the Oracle WebLogic Application Server distribution archive.

In this section we explain how to install the WAR file using the Oracle WebLogic Server Administration Console:

1. Open the Oracle WebLogic Server Administration Console.
2. Navigate to the **Domain Structure / YOUR_DOMAIN / Deployments** page.
3. Click the **Install** button. The first page of the wizard opens.
4. Using the File Browser, select the `camunda-engine-rest-$PLATFORM_VERSION-wls.war` file from the distribution and upload it.
5. Continue to the **Next** page.
6. Select **Install this deployment as an application** and continue to the **Next** page.
7. Adapt the optional settings to your needs and click the **Finish** button to complete the installation.

After completing the wizard, the REST API should be successfully installed on the application server.
The context root for the REST API is **/engine-rest** by default.
In some situations, you also have to start the web application manually from the **Domain Structure / YOUR_DOMAIN / Deployments** page.
