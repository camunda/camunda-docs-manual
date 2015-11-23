---

title: "Camunda Fox Migration"
weight: 40

menu:
  main:
    identifier: "migration-guide-fox"
    parent: "migration-guide"
    pre: "Guides you through the migration from Camunda Fox `6.x` to Camunda BPM Platform `7.x`."

---

As Camunda fox included the Activiti engine you have to perform the [activit migration]({{< relref "activiti.md" >}}) as well.

{{< note title="Reading this Guide" class="info" >}}
This guide uses a  number of variables to denote common path names and constants:

*  `$DATABASE` expresses the target database platform, e.g., DB2, MySql, etc.
* `$DISTRIBUTION_PATH` represents the path of the downloaded pre-packaged Camunda BPM distribution, e.g., `camunda-bpm-tomcat-$PLATFORM_VERSION.zip` or `camunda-bpm-tomcat-$PLATFORM_VERSION.tar.gz` for Tomcat, etc.
* `$PLATFORM_VERSION` denotes the version of the Camunda BPM platform you want to install, e.g., `7.0.0`.
* `$FOX_HOME` points to the Camunda fox server main directory.
* `$FOX_VERSION` denotes the version of the Camunda fox platform you have installed, e.g., `6.2.4`.

{{< /note >}}

Before you can start with the migration from Camunda fox to Camunda BPM, we recommend that you [download](http://camunda.org/download) the pre-packaged distribution corresponding to your Camunda fox server.


# Migrate Your Process Application

To migrate your process application from Camunda fox to Camunda BPM, you need to follow these steps:

*   Do the Activiti migration as [described]({{< relref "activiti.md" >}}), as Camunda fox included the Activiti engine.
*   Remove the `fox-platform-client.x.jar` from your deployment - it is not needed anymore.
*   Add a Process Application Class, see [Process Applications]({{< relref "user-guide/process-applications/index.md" >}}).
*   If you don't use our engine as embedded jar, you should set your maven-dependency for it to **provided-scope**
*   Adjust the `processes.xml` to the new format, see [Process Applications]({{< relref "user-guide/process-applications/index.md" >}}).
*   If you completely migrate to our new distribution, you have to adjust your `persistence.xml` from **FoxEngineDS** to **ProcessEngine**
*   If you use the new Camunda Tasklist component, you have to adjust the `formKey`, as described in the [Getting Started](http://camunda.org/implement/getting-started.html) section. We will provide more information soon. For JSF-Formkeys, your formkey should have the following format: `/<application-context-path>/<form>.jsf`. E.g., `/loan-approval/request-loan.jsf`
*   If you use the `fox.taskForm` bean, make sure you have the `camunda-engine-cdi` dependency on your classpath:

    <%- @partial('camunda-bom.html.eco', @, {}) %>

    ```xml
    <dependency>
      <groupId>org.camunda.bpm</groupId>
      <artifactId>camunda-engine-cdi</artifactId>
    </dependency>
    ```
*   If you use `@Inject` with TaskForm, you have to add a `@Named("...")` annotation to the `@Inject` annotation due to backward-compatibility of `fox.taskForm`. There you have two choices: If you are using `fox.taskForm` in your process application and don't want to update all your jsf pages and beans you should use `@Named("fox.taskForm")`, otherwise you should use `@Named("camundaTaskForm")`. Your application server should write an error or a warning if you use the wrong one. So be careful! However, we recommend that you use the annotation `@Named("camundaTaskForm")`.
*   Since Camunda BPM 7.0, the unique constraint for the business key has been removed in the runtime and history tables and the database schema create and drop scripts. The [migration scripts](https://app.camunda.com/nexus/index.html#view-repositories;camunda-bpm~browsestorage~/org/camunda/bpm/distro/camunda-sql-scripts/) do not include the drop statements of the unique constraint for the business key. So if you do not rely on the unique constraint for the business key, you can delete the unique constraint yourself. See the following documentation about the [Business Key]({{< relref "user-guide/process-engine/database.md#business-key" >}}) to delete the unique constraint corresponding to your database.
*   If you do a JNDI lookup to get one of the Platform Services (i.e., `ProcessArchiveService` or `ProcessEngineService`), you have to adjust the JNDI name to do the lookup as follows:
    *   ProcessArchiveService:
        *   Old JNDI name: `java:global/camunda-fox-platform/process-engine/PlatformService!com.camunda.fox.platform.api.ProcessArchiveService`
        *   New JNDI name: `java:global/camunda-bpm-platform/process-engine/ProcessApplicationService!org.camunda.bpm.ProcessApplicationService`
        *   **Note:** The name of `ProcessArchiveService` has changed to `ProcessApplicationService`.
    *   ProcessEngineService:
        *   Old JNDI name: `java:global/camunda-fox-platform/process-engine/PlatformService!com.camunda.fox.platform.api.ProcessEngineService`
        *   New JNDI name: `java:global/camunda-bpm-platform/process-engine/ProcessEngineService!org.camunda.bpm.ProcessEngineService`

## Which Camunda fox Class Names Have Changed?

<table class="table table-striped">
  <thead>
    <tr>
      <th>component</th>
      <th>Camunda fox class name</th>
      <th>Camunda BPM class name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>fox-platform-api</td>
      <td>ProcessArchiveService</td>
      <td>ProcessApplicationService</td>
    </tr>
    <tr>
      <td>fox-platform-client</td>
      <td>ProcessArchiveSupport</td>
      <td>DefaultEjbProcessApplication</td>
    </tr>
  </tbody>
</table>


# Migrate Your Database

Be aware that there were major changes in our database structure. For migration from **Camunda fox EE 6.2** and **Camunda fox CE 1.34** we recommend to take a look at our migration scripts. These are located in the following folder of your downloaded pre-packaged distribution: `$DISTRIBUTION_PATH/sql/upgrade`. To perform the migration of your database, choose the corresponding upgrade script `$DATABASE_engine_6.2_to_7.0` according to your database platform and run it.


# Migrate the Server

## JBoss AS 7.1.3

### Upgrade the Application Server Modules (JBoss)

* Delete the following folders:
  * `$FOX_HOME/modules/com/camunda/`
  * `$FOX_HOME/modules/org/bouncycastle/`
  * `$FOX_HOME/modules/org/livetribe/`
* Merge all content from `$DISTRIBUTION_PATH/modules` to `$FOX_HOME/modules`

### Adjust the `$FOX_HOME/standalone/configuration/standalone.xml`

Change the Camunda JBoss subsystem as extension from:

    <extension module="com.camunda.fox.platform.fox-platform-jboss-subsystem"/>

to:

    <extension module="org.camunda.bpm.jboss.camunda-jboss-subsystem"/>

Remove the global modules:

    <global-modules>
        <module name="com.camunda.fox.platform.fox-platform-api" />
        <module name="com.camunda.fox.engine.fox-engine" />
    </global-modules>

and add the global module for Camunda BPM:

    <global-modules>
        <module name="org.camunda.bpm.camunda-engine" slot="main"/>
    </global-modules>

Adjust the Camunda JBoss subsystem configuration from:

    <subsystem xmlns="urn:com.camunda.fox.fox-platform:1.1">

to:

    <subsystem xmlns="urn:org.camunda.bpm.jboss:1.1">

Add `authorizationEnabled` and `jobExecutorDeploymentAware` properties to the configured process engines:

    <process-engines>
      ...
      <process-engine name="${YOUR_PROCESS_ENGINE_NAME}">
        ...
        <properties>
          ...
          <property name="authorizationEnabled">true</property>
          <property name="jobExecutorDeploymentAware">true</property>
        </properties>
      </process-engine>
      ...
    </process-engines>

Since Camunda BPM 7.0, you can configure built-in process engine plugins.

### Replace the Camunda fox Webapps With Camunda BPM Webapps (JBoss)

* Undeploy the following Camunda fox webapps which are in the folder `$FOX_HOME/standalone/deployments`:
  * `fox-cockpit-$FOX_VERSION.war`
  * `fox-cycle-$FOX_VERSION.war`
  * `fox-tasklist-$FOX_VERSION.war`
* Deploy the following Camunda BPM webapps from `$DISTRIBUTION_PATH/server/jboss-as-7.1.3.FINAL/standalone/deployments` to `$FOX_HOME/standalone/deployments`:
  * `camunda-cycle-jboss-$PLATFORM_VERSION.war`
  * `camunda-engine-rest-$PLATFORM_VERSION.war`
  * `camunda-webapp-jboss-$PLATFORM_VERSION.war`
* You can delete the corresponding Cockpit tables because they are not needed anymore.

For more details about installing the Camunda BPM webapps read the [installation guide]({{< relref "installation/full/jboss/index.md" >}}).

## GlassFish 3.1

### Clean Up the `$FOX_HOME/glassfish/domains/<domain>/config/domain.xml`

Remove the following applications:

    <application
      location="${com.sun.aas.instanceRootURI}/applications/fox-platform-jobexecutor-rar/"
      name="fox-platform-jobexecutor-rar" object-type="user">
      ...
    </application>

    <application
      context-root="/cockpit"
      location="${com.sun.aas.instanceRootURI}/applications/fox-cockpit-glassfish-$FOX_VERSION/"
      name="fox-cockpit-glassfish-$FOX_VERSION" object-type="user">
      ...
    </application>

    <application
      context-root="/cycle"
      location="${com.sun.aas.instanceRootURI}/applications/fox-cycle-glassfish-$FOX_VERSION/"
      name="fox-cycle-glassfish-$FOX_VERSION" object-type="user">
      ...
    </application>

    <application
      context-root="/tasklist"
      location="${com.sun.aas.instanceRootURI}/applications/fox-tasklist-$FOX_VERSION/"
      name="fox-tasklist-$FOX_VERSION" object-type="user">
      ...
    </application>

and the corresponding application references:

    <application-ref ref="fox-platform-jobexecutor-rar" virtual-servers="server"></application-ref>

    <application-ref ref="camunda-fox-platform" virtual-servers="server"></application-ref>

    <application-ref ref="fox-cockpit-glassfish-$FOX_VERSION" virtual-servers="server"></application-ref>

    <application-ref ref="fox-cycle-glassfish-$FOX_VERSION" virtual-servers="server"></application-ref>

    <application-ref ref="fox-tasklist-$FOX_VERSION" virtual-servers="server"></application-ref>

To adjust the JDBC Connection Pool and JDBC Resources, replace the following JDBC resource:

    <jdbc-resource pool-name="FoxEnginePool"
                   jndi-name="jdbc/FoxEngine"
                   enabled="true">
    </jdbc-resource>

with:

    <jdbc-resource pool-name="FoxEnginePool"
                   jndi-name="jdbc/ProcessEngine"
                   enabled="true">
    </jdbc-resource>

and replace the following JDBC resource:

    <resource-ref ref="jdbc/FoxEngine"></resource-ref>

with:

    <resource-ref ref="jdbc/ProcessEngine"></resource-ref>

Adjust the configuration of the Thread Pool for the Job Executor from:

    <resources>
      ...
      <resource-adapter-config
        thread-pool-ids="platform-jobexecutor-tp"
        resource-adapter-name="fox-platform-jobexecutor-rar">
      </resource-adapter-config>

      <connector-connection-pool
        name="platformJobExecutorPool"
        resource-adapter-name="fox-platform-jobexecutor-rar"
        connection-definition-name="com.camunda.fox.platform.jobexecutor.impl.ra.outbound.PlatformJobExecutorConnectionFactory"
        transaction-support="NoTransaction">
      </connector-connection-pool>

      <connector-resource
          enabled="true"
          pool-name="platformJobExecutorPool"
          jndi-name="eis/PlatformJobExecutorConnectionFactory" />
      ...
    </resources>
    ...
    <servers>
      <server>
        ...
        <resource-ref ref="eis/PlatformJobExecutorConnectionFactory"></resource-ref>
        ...
      </server>
    </servers>

to:

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
      ...
    </resources>
    ...
    <servers>
      <server>
        ...
        <resource-ref ref="eis/JcaExecutorServiceConnectionFactory"></resource-ref>
        ...
      </server>
    </servers>

### Upgrade the Application Server Modules (GlassFish)

* Delete the following modules from the folder `$FOX_HOME/glassfish/lib/`:
  * `fox-engine-$FOX_VERSION.jar`
  * `fox-platform-api-$FOX_VERSION.jar`
* Merge all content from `$DISTRIBUTION_PATH/modules/lib` into `$FOX_HOME/glassfish/lib/`
* Delete the following applications from `$FOX_HOME/glassfish/domains/<domain>/applications/`:
  * `camunda-fox-platform`
  * `fox-cockpit-glassfish-$FOX_VERSION`
  * `fox-cycle-glassfish-$FOX_VERSION`
  * `fox-platform-jobexecutor-rar`
  * `fox-tasklist-$FOX_VERSION`
* Copy the jobexecutor resource adapter `$DISTRIBUTION_PATH/modules/camunda-jobexecutor-rar-$PLATFORM_VERSION.rar` to `$FOX_HOME/glassfish/domains/<domain>/autodeploy`. The jobexecutor resource adapter has to be deployed first because the artifact `camunda-glassfish-ear-$PLATFORM_VERSION.ear` depends on it and cannot be deployed successfully without the resource adapter. If you try to deploy both components with the auto-deploy feature in one step, you should be aware that in that case the deployment order is not defined. Due to this, we propose to startup the GlassFish to initially deploy the jobexecutor resource adapter. After a successful startup, shutdown the GlassFish application server.
* Copy the artifact `$DISTRIBUTION_PATH/modules/camunda-glassfish-ear-$PLATFORM_VERSION.ear` to `$FOX_HOME/glassfish/domains/<domain>/autodeploy`.
* After a successful startup, the Camunda BPM platform is installed.

Since Camunda BPM 7.0, you can configure built-in process engine plugins.

### Replace the Camunda fox Webapps With Camunda BPM Webapps (GlassFish)

* The Camunda fox webapps have been already deleted in the previous steps. So you can additionally clean up the `$FOX_HOME/glassfish/domains/<domain>/autodeploy/` folder and delete the following artifacts:
  * `fox-cockpit-glassfish-$FOX_VERSION.war`
  * `fox-cycle-glassfish-$FOX_VERSION.war`
  * `fox-tasklist-$FOX_VERSION.war`
* Deploy the following Camunda BPMN webapps from `$DISTRIBUTION_PATH/glassfish3/glassfish/domains/domain1/autodeploy/` to `$FOX_HOME/glassfish/domains/<domain>/autodeploy`:
  * `camunda-cycle-glassfish-$PLATFORM_VERSION.war`
  * `camunda-engine-rest-$PLATFORM_VERSION.war`
  * `camunda-webapp-glassfish-$PLATFORM_VERSION.war`
* You can delete the corresponding Cockpit tables because they are not needed anymore.

## IBM WebSphere Application Server

### Undeploy Camunda fox Webapps

* Open the WebSphere Integrated Solutions Console.
* Navigate to `Applications / Application Types / WebSphere enterprise applications`
* Select `fox-cockpit-was-$FOX_VERSION.war` and `fox-cycle-was-$FOX_VERSION.war` and uninstall them.

### Upgrade the Application Server Modules (IBM WebSphere Applicaton Server)

* Open the WebSphere Integrated Solutions Console.
* Navigate to `Applications / Application Types / WebSphere enterprise applications`
* Uninstall the Camunda platform application `camunda-fox-platform`
* Navigate to `Resources / Resource Adapters / Resource Adapters`
* Delete the `camunda-fox-platform-jobexecutor-RAR` resource adapter
* Navigate to `Resources / Asynchronous Beans / Work Managers`
* Delete the `camunda-fox-platform-jobexecutor-WM` work manager
* Navigate to `Resources / JDBC / Datasources`
* Select the defined data sources for the fox engine
* Change the JNDI-Name from `jdbc/FoxEngine` to `jdbc/ProcessEngine`
* Shutdown the IBM WebSphere Application Server
* Open the folder `$FOX_HOME/lib/ext/` and delete the following artifacts:
  * `fox-engine-$FOX_VERSION.jar`
  * `fox-platform-api-$FOX_VERSION.jar`
* Now you can install Camunda BPM 7.0, to do so, see the [installation guide]({{< relref "installation/full/index.md" >}}) and follow the instructions.

Since Camunda BPM 7.0, you can configure built-in process engine plugins.

### Deploy Camunda BPM Webapps

* Follow the installation instructions to deploy Camunda BPM webapps (like Cycle, Cockpit, etc.).
* Furthermore, you can delete the corresponding Cockpit tables because they are not needed anymore.
