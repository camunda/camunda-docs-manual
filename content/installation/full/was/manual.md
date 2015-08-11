---

title: 'Install the Full Distribution on an IBM WebSphere Server'
weight: 20

menu:
  main:
    name: "Manual Installation"
    identifier: "installation-guide-full-was-install-manual"
    parent: "installation-guide-full-was"

---


This section will describe how you can install the camunda BPM platform and its components on an IBM WebSphere.

<div class="alert alert-info">
  <p><strong>Reading the Guide</strong></p><br>
  Throughout this guide we will use a number of variables to denote common path names and constants.<br>
  <code>$WAS_HOME</code> points to the IBM WebSphere application server main directory (typically something like <code>/opt/IBM/WebSphere/AppServer</code>). <br>
  <code>$PLATFORM_VERSION</code> denotes the version of the Camunda BPM platform you want to install or already have installed, e.g., <code>7.2.0</code>. <br>
  <code>$WAS_DISTRIBUTION</code> represents the downloaded Camunda BPM distribution for the IBM WebSphere Application Server, e.g., <code>camunda-ee-ibm-was-$PLATFORM_VERSION.zip</code>.
  <p style="margin-top:10px">
    The distribution is available at the <a href="http://camunda.org/enterprise-release/camunda-bpm/ibm-was/">Camunda enterprise release page</a>.
    You will be asked to enter the credentials you received during the trial or subscription process.
  </p>
</div>


# Setup

Before  you can install the Camunda components, you need to perform a number of required setup steps.


## Resource Configuration

The Camunda BPM platform requires a set of resources that need to be configured at the application server level:

* One or multiple datasources to be used by the engine(s).
* A work manager for the job executor.


## Define Resources in the right Scope

In order to perform the steps listed in this guide, make sure you understand the concept of management scopes introduced by the IBM WebSphere Application Server. We assume that resources are defined at the "Node" scope.

{{< img src="scope-highlight.png" title="Scope" >}}


## JDBC/Datasource Configuration

The Camunda BPM engine uses one or multiple process engines. Use your application server management tooling for the configuration of the datasources.
The JNDI name of the datasource must be equal to the name used in the datasource-Element of the process engine(s) configured in the bpm-platform.xml file.

### Default JNDI Name

The default JNDI name used by the process engine is <code>jdbc/ProcessEngine</code>

The following screenshot shows the configuration of an XA datasource:

{{< img src="jdbc.png" title="JDBC Configuration" >}}

Note that you may configure multiple datasources used by different process engine instances. See the [User Guide]({{< relref "user-guide/index.md" >}}) for details.


## Configure a WorkManager

This section explains how you can use the WebSphere Integrated Solutions Console to configure a work manager to be used by the Camunda BPM platform jobexecutor. It is recommended to check the [manual of the application server](http://www-01.ibm.com/software/webservers/appserv/was/library/) for additional details.

Go to **Resources / Asynchronous Bean / Work Managers** and select the appropriate scope, for example: <code>Cell=<some_id></code>
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

{{< img src="work-manager.png" title="Work Manager" >}}


# Install Required Components

The following steps are required to deploy the Camunda BPM platform on an IBM WebSphere server.


## Install the Camunda BPM Platform Shared Libraries

The shared libraries include the Camunda engine and some utility JARs. The shared libraries must be visible to both the Camunda BPM platform as well as all process applications.

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
Name it ```Camunda```. This name is **mandatory**, except when you modify the ```deployment.xml``` which is located inside the Camunda BPM platform EAR accordingly.
Enter as classpath the path where you have copied the Camunda shared libraries, e.g., ```/opt/IBM/WebSphere/AppServer/profiles/AppSrv01/camunda-shared-libs```. Enable
the **Use an isolated class loader for this shared library** checkbox. Restart the IBM WebSphere Server after this operation.


## Install the Camunda BPM Platform Modules

The Camunda BPM platform distribution for IBM WebSphere Application Server includes one module in the modules folder:

```
camunda-ee-ibm-was-$PLATFORM_VERSION.zip
|-- modules/
      |-- camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear
```

The camunda-ibm-websphere-ear is a Java EE application enterprise archive (EAR) providing the Camunda BPM platform services. It contains an embedded rar module.
This camunda-ibm-websphere-rar module is a JCA Resource Adapter providing the jobexecutor service to the Camunda BPM platform.

The EAR must be installed to your IBM WebSphere Application Server.


## Install the Camunda BPM Platform Application

In this section, we explain how the camunda-ibm-websphere-ear module can be installed using the WebShere Integrated Solutions Console.

1.  Navigate to the Enterprise Applications page using the navigation path **Applications** / **Application Types** / **WebSphere enterprise applications**.
2.  Click the **"Install"** Button.
3.  Select the <code>camunda-ibm-websphere-ear-$PLATFORM_VERSION.ear</code> file from the modules folder of the Camunda BPM platform for IBM WebSphere Application Server distribution. Click Next.
4.  Select the **"Fast Path"** install option.
5.  In **Step 1**, enter an application-name, eg. **"camunda-bpm-platform"**, customize other settings and click **"Next"**.
6.  Continue through **Steps 2-4**, customize to your liking and finish the installation in **Step 4** by clicking **"Finish"**.
7.  Save the configuration.
8.  (optional) [Configure location of the bpm-platform.xml file]({{< relref "reference/deployment-descriptors/descriptors/bpm-platform-xml.md#configure-location-of-the-bpm-platform-xml-file" >}})
9.  Start the camunda-bpm-platform application. If this initially fails, try to restart the server. Also make sure the EAR does correctly reference the previously created 'Camunda' shared library.
    If it doesn't, make sure you have correctly created the shared library as 'Camunda' or assign the 'Camunda' shared library manually after the EAR installation.


# Install Optional Components

This section describes how to install optional components onto an IBM WebSphere server. None of these are required to work with the core platform.

The following covers the installation of these extensions:

* [Camunda Cockpit]({{< relref "user-guide/cockpit/index.md" >}}) [and Tasklist]({{< relref "user-guide/tasklist/index.md" >}})
* [Camunda REST API]({{< relref "reference/rest/index.md" >}})
* [Camunda Connect]({{< relref "user-guide/process-engine/connectors.md" >}})
* [Camunda Spin]({{< relref "user-guide/spin/data-formats-in-processes.md" >}})
* [Freemarker Integration]({{< relref "user-guide/process-engine/templating.md" >}})
* [Groovy Scripting]({{< relref "user-guide/process-engine/scripting.md" >}})


## Install Camunda Cockpit and Tasklist

The web application archive that contains Camunda Cockpit and Camunda Tasklist resides under <code>webapps/camunda-was-$PLATFORM_VERSION.war</code> in the IBM WebSphere Application Server distribution archive.

In this section we explain how to install the WAR file using the IBM WebSphere enterprise application wizard provided by the WebSphere Integrated Solutions Console:

1.  Open the WebSphere Integrated Solutions Console.
2.  Navigate to the **Applications / Application Types / WebSphere** enterprise applications page.
3.  Click the **Install** Button
4.  The first page of the wizard opens. Using the file browser, select the <code>camunda-was-VERSION.war</code> file from the distribution and upload it.
5.  Continue to the next page.
6.  Select the **"Fast Path"** on the next page.
7.  Step 1. Usually no changes are required.
8.  Step 2. Usually no changes are required.
9.  Step 3. Usually no changes are required.
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


## Install Camunda REST API

The Camunda REST API WAR file resides under <code>webapps/camunda-engine-rest-$PLATFORM_VERSION-was.war</code> in the IBM WebSphere Application Server distribution archive.

In this section we explain how to install the WAR file using the IBM WebSphere enterprise application wizard provided within the WebSphere Integrated Solutions Console:

1.  Open the WebSphere Integrated Solutions Console.
2.  Navigate to the **Applications / Application Types / WebSphere** enterprise applications page.
3.  Click the **Install** Button
4.  The first page of the wizard opens. Using the file browser, select the <code>camunda-engine-rest-VERSION-was.war</code> file from the distribution and upload it.
5.  Continue to the next page.
6.  Select the **"Fast Path"** on the next page.
7.  Step 1. Usually no changes are required.
8.  Step 2. Usually no changes are required.
9.  Step 3. Usually no changes are required.
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


## Install Camunda Connect

Add the following artifacts (if not existing) from the folder `$WAS_DISTRIBUTION/modules/lib` to the `Camunda` shared library folder:

* `camunda-connect-core-$CONNECT_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`

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

Note that this requires a custom `bpm-platform.xml` file.


## Install Camunda Spin

Add the following artifacts (if not existing) from the folder `$WAS_DISTRIBUTION/modules/lib/` to the `Camunda` shared library folder:

* `camunda-spin-core-$SPIN_VERSION.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`

In order to activate Camunda Spin functionality for a process engine, a process engine plugin has to be registered in the BPM platform configuration as follows:

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


## Install Groovy Scripting

Add the following artifacts (if not existing) from the folder `$WAS_DISTRIBUTION/modules/lib/` to the `Camunda` shared library folder:

* `groovy-all-$GROOVY_VERSION.jar`


## Install Freemarker Integration

Add the following artifacts (if not existing) from the folder `$WAS_DISTRIBUTION/modules/lib/` to the `Camunda` shared library folder:

* `camunda-template-engines-freemarker-$TEMPLATE_VERSION.jar`
* `freemarker-2.3.20.jar`
* `camunda-commons-logging-$COMMONS_VERSION.jar`
* `camunda-commons-utils-$COMMONS_VERSION.jar`
* `slf4j-api-$SLF4J_VERSION.jar`


# Install Process Applications

After installing a Process Application (PA) in your IBM WebSphere Application Server, which **does not** include the Camunda BPM dependencies,
you must assign the previously created **"Camunda"** shared library with the Process Application deployment.
This should only be necessary when you use the **"shared"** engine deployment approach and not the **"embedded"** process engine one (aka self-contained Process Application).


# Troubleshooting


## Define IBM WebSphere Resources in the right scope

When installing the Camunda BPM platform application, you may see error messages indicating that you are referencing resources from the wrong scope. Make sure you define the resources in the right scope so all components are visible to each other. Make sure you understand the IBM WebSphere management concepts "Cell", "Node" and "Server".
