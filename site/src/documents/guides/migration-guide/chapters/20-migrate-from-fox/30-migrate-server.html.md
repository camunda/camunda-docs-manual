---

title: 'Migrate the Server'
category: 'Migrate from camunda fox'

---

## JBoss AS 7.1.3

### Upgrade the application server modules (JBoss)

* Delete the following folders:
  * `$FOX_HOME/modules/com/camunda/`
  * `$FOX_HOME/modules/org/bouncycastle/`
  * `$FOX_HOME/modules/org/livetribe/`
* Merge all content from `$DISTRIBUTION_PATH/modules` to `$FOX_HOME/modules`

### Adjust the `$FOX_HOME/standalone/configuration/standalone.xml`

Change the camunda jboss subsystem as extension from:

    <extension module="com.camunda.fox.platform.fox-platform-jboss-subsystem"/>

to

    <extension module="org.camunda.bpm.jboss.camunda-jboss-subsystem"/>

Remove the global modules:

    <global-modules>
        <module name="com.camunda.fox.platform.fox-platform-api" />
        <module name="com.camunda.fox.engine.fox-engine" />
    </global-modules>

and add the global module for camunda BPM

    <global-modules>
        <module name="org.camunda.bpm.camunda-engine" slot="main"/>
    </global-modules>

Adjust the camunda jboss subsystem configuration from:

    <subsystem xmlns="urn:com.camunda.fox.fox-platform:1.1">

to

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

Since camunda BPM 7.0 you are able to configure built-in process engine plugins, for more details [see here](ref:/guides/user-guide/#process-engine-process-engine-plugins-list-of-built-in-process-engine-plugins).

### Replace the camunda fox webapps with camunda BPM webapps (JBoss)

* Undeploy the following camunda fox webapps which are in the folder `$FOX_HOME/standalone/deployments`:
  * `fox-cockpit-$FOX_VERSION.war`
  * `fox-cycle-$FOX_VERSION.war`
  * `fox-tasklist-$FOX_VERSION.war`
* Deploy the following camunda BPM webapps from `$DISTRIBUTION_PATH/server/jboss-as-7.1.3.FINAL/standalone/deployments` to `$FOX_HOME/standalone/deployments`:
  * `camunda-cycle-jboss-$PLATFORM_VERSION.war`
  * `camunda-engine-rest-$PLATFORM_VERSION.war`
  * `camunda-webapp-jboss-$PLATFORM_VERSION.war`
* You are able to delete the corresponding Cockpit tables, because they are not needed anymore.

For further details about installing the camunda BPM webapps read the [installation guide](ref:/guides/installation-guide/jboss/).

## GlassFish 3.1

### Cleanup the `$FOX_HOME/glassfish/domains/<domain>/config/domain.xml`

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

To adjust the JDBC Connection Pool and JDBC Resource replace the following JDBC resource

    <jdbc-resource pool-name="FoxEnginePool"
                   jndi-name="jdbc/FoxEngine"
                   enabled="true">
    </jdbc-resource>

with

    <jdbc-resource pool-name="FoxEnginePool"
                   jndi-name="jdbc/ProcessEngine"
                   enabled="true">
    </jdbc-resource>

and

    <resource-ref ref="jdbc/FoxEngine"></resource-ref>

with

    <resource-ref ref="jdbc/ProcessEngine"></resource-ref>

Configure the Thread Pool for the Job Executor from

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

to

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

### Upgrade the application server modules (GlassFish)

* Delete the following modules form the folder `$FOX_HOME/glassfish/lib/`:
  * `fox-engine-$FOX_VERSION.jar`
  * `fox-platform-api-$FOX_VERSION.jar`
* Merge all content from `$DISTRIBUTION_PATH/modules/lib` into `$FOX_HOME/glassfish/lib/`
* Delete the following applications from `$FOX_HOME/glassfish/domains/<domain>/applications/`:
  * `camunda-fox-platform`
  * `fox-cockpit-glassfish-$FOX_VERSION`
  * `fox-cycle-glassfish-$FOX_VERSION`
  * `fox-platform-jobexecutor-rar`
  * `fox-tasklist-$FOX_VERSION`
* Copy the jobexecutor resource adapter `$DISTRIBUTION_PATH/modules/camunda-jobexecutor-rar-$PLATFORM_VERSION.rar` into `$FOX_HOME/glassfish/domains/<domain>/autodeploy`. The jobexecutor recourse adapter has to be deployed first because the artifact `camunda-glassfish-ear-$PLATFORM_VERSION.ear` depends on it and cannot deployed successfully without the resource adapter. If you try to deploy both components with the auto-deploy feature in one step you should be aware that the deployment order is not defined in this case. Due to this we propose to startup the GlassFish to deploy initially the jobexecutor resource adapter. After a successful startup shutdown the GlassFish.
* Copy the artifact `$DISTRIBUTION_PATH/modules/camunda-glassfish-ear-$PLATFORM_VERSION.ear` into `$FOX_HOME/glassfish/domains/<domain>/autodeploy`.
* After a successful startup the camunda BPM platform is installed.

Since camunda BPM 7.0 you are able to configure built-in process engine plugins, for more details [see here](ref:/guides/user-guide/#process-engine-process-engine-plugins-list-of-built-in-process-engine-plugins).

### Replace the camunda fox webapps with camunda BPM webapps (GlassFish)

* The camunda fox webapps has been already deleted in the previous steps. So you can additionally cleanup the `$FOX_HOME/glassfish/domains/<domain>/autodeploy/` folder and delete the following artifacts:
  * `fox-cockpit-glassfish-$FOX_VERSION.war`
  * `fox-cycle-glassfish-$FOX_VERSION.war`
  * `fox-tasklist-$FOX_VERSION.war`
* Deploy the following camunda BPMN webapps from `$DISTRIBUTION_PATH/glassfish3/glassfish/domains/domain1/autodeploy/` to `$FOX_HOME/glassfish/domains/<domain>/autodeploy`:
  * `camunda-cycle-glassfish-$PLATFORM_VERSION.war`
  * `camunda-engine-rest-$PLATFORM_VERSION.war`
  * `camunda-webapp-glassfish-$PLATFORM_VERSION.war`
* You are able to delete the corresponding Cockpit tables, because they are not needed anymore.

## IBM WebSphere Application Server

### Undeploy camunda fox webapps

* Open the WebSphere Integrated Solutions Console.
* Navigate to `Applications / Application Types / WebSphere enterprise applications`
* Select `fox-cockpit-was-$FOX_VERSION.war` and `fox-cycle-was-$FOX_VERSION.war` and uninstall them.

### Upgrade the application server modules (WebSphere)

* Open the WebSphere Integrated Solutions Console.
* Navigate to `Applications / Application Types / WebSphere enterprise applications`
* Uninstall the camunda platform application `camunda-fox-platform`
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
* Now you are able to install camunda BPM 7.0, therefore you have to look in the [installation guide](ref:/guides/installation-guide/was/) and follow the instructions.

Since camunda BPM 7.0 you are able to configure built-in process engine plugins, for more details [see here](ref:/guides/user-guide/#process-engine-process-engine-plugins-list-of-built-in-process-engine-plugins).

### Deploy camunda BPM webapps

* Follow the installation instructions to deploy camunda BPM webapps (like Cycle, Cockpit etc.).
* Furthermore, you are able to delete the corresponding Cockpit tables, because they are not needed anymore.
