---

title: "Update a JBoss / Wildfly Installation from 7.4 to 7.5"

menu:
  main:
    name: "JBoss AS/Wildfly"
    identifier: "migration-guide-74-jboss"
    parent: "migration-guide-74"

---

The following steps describe how to upgrade the Camunda artifacts on a JBoss AS
7 and Wildfly 8 server in a shared process engine scenario. For the entire
procedure, refer to the [upgrade guide][upgrade-guide]. If not
already done, make sure to download the [Camunda BPM 7.5 JBoss distribution][jboss-distro]
or [Camunda BPM 7.5 Wildfly 8 distribution][wildfly-distro]. In the following instructions
`$APP_SERVER` should be replaced with either `jboss` or `wildfly`, depending on
the used application server.

The upgrade procedure takes the following steps:

1. Upgrade the Camunda BPM Modules
2. Upgrade Optional Camunda BPM Modules
3. Maintain Process Engine Configuration
4. Maintain Process Applications
5. Upgrade Camunda Web Applications

Whenever the instructions are to *replace* a module, make sure to delete the previous version of the module first to avoid orphan jars.

# 1. Upgrade the Camunda BPM Modules

Replace the following modules from the folder `$APP_SERVER_HOME/modules/` with their new versions from the folder `$APP_SERVER_DISTRIBUTION/modules/`:

* `org/camunda/bpm/camunda-engine`
* `org/camunda/bpm/$APP_SERVER/camunda-$APP_SERVER-subsystem`
* `org/camunda/bpm/model/camunda-bpmn-model`
* `org/camunda/bpm/model/camunda-cmmn-model`
* `org/camunda/bpm/model/camunda-xml-model`

Add or replace (if already present) the following modules:

* `org/camunda/bpm/dmn/camunda-engine-dmn`
* `org/camunda/bpm/dmn/camunda-engine-feel-api`
* `org/camunda/bpm/dmn/camunda-engine-feel-juel`
* `org/camunda/bpm/model/camunda-dmn-model`
* `org/camunda/commons/camunda-commons-logging`
* `org/camunda/commons/camunda-commons-typed-values`
* `org/camunda/commons/camunda-commons-utils`

# 2. Upgrade Optional Camunda BPM Modules

In addition to the core modules, there may be optional artifacts in `$APP_SERVER_HOME/modules/` for LDAP integration, Camunda Connect, Camunda Spin, and Groovy scripting.
If you use any of these extensions, the following upgrade steps apply:

## LDAP Integration

Replace the following modules from the folder `$APP_SERVER_HOME/modules/` with their new versions from the folder `$APP_SERVER_DISTRIBUTION/modules/`, if present:

* `org/camunda/bpm/identity/camunda-identity-ldap`

## Camunda Connect

Replace the following modules from the folder `$APP_SERVER_HOME/modules/` with their new versions from the folder `$APP_SERVER_DISTRIBUTION/modules/`, if present:

* `org/camunda/bpm/camunda-engine-plugin-connect`

## Camunda Spin

Replace the following modules from the folder `$APP_SERVER_HOME/modules/` with their new versions from the folder `$APP_SERVER_DISTRIBUTION/modules/`, if present:

* `org/camunda/spin/camunda-spin-core`
* `org/camunda/spin/camunda-spin-dataformat-json-jackson`
* `org/camunda/spin/camunda-spin-dataformat-xml-dom`
* `org/camunda/bpm/camunda-engine-plugin-spin`

## Groovy Scripting

Replace the following modules from the folder `$APP_SERVER_HOME/modules/` with their new versions from the folder `$APP_SERVER_DISTRIBUTION/modules/` if present:

* `org/codehaus/groovy/groovy-all`

# 3. Maintain Process Engine Configuration

This section describes changes in the engine’s default behavior. While the change is reasonable, your implementation may rely on the previous default behavior. Thus, the previous behavior can be restored for shared process engines by explicitly setting a configuration option.

## Configuration of Job Executor Thread Pool in Camunda Wildfly 8 subsystem

Beginning with 7.5, the Thread Pool used by the Job Executor is defined as part of the Camunda BPM Wildfly subsystem instead of the JBoss Threads subsystem.
The reason is the deprecation and removal of the JBoss Threads subsystem since Wildfly 9. 
To be compatible with Wildfly 8-10, Camunda rewrote the existing subsystem.   
This leads to that you must transfer your existing Thread Pool configuration from the JBoss Threads subsystem to the Camunda subsystem using the following steps.

1. First, transfer the JBoss Threads configuration to the Camunda BPM subsystem. Search for the JBoss Threads subsystem configuration in your `standalone.xml` configuration. It looks similiar to this example one:

	 ```xml
   <subsystem xmlns="urn:jboss:domain:threads:1.1">
      <bounded-queue-thread-pool name="job-executor-tp" allow-core-timeout="true">
        <core-threads count="3" />
        <max-threads count="10" />
        <queue-length count="3" />
        <keepalive-time time="10" unit="seconds" />
      </bounded-queue-thread-pool>
   </subsystem>
	 ```
   Search for the configuration responsible for the Job Executor Thread Pool.
   For each of the configuration elements and attributes of the JBoss Threads subsystem Job Executor configuration, a representation in the Camunda subsystem exists under the `job-executor`-element since 7.5.  
   Using the above example snippet of the JBoss Threads configuration and the [`JBoss Threads to Camunda` subsystem mapping table][jboss-threads-to-camunda-mapping-table] at the end of this section, the new Camunda subsystem configuration would look like the following example snippet:

	 ```xml
   <subsystem xmlns="urn:org.camunda.bpm.jboss:1.1">
     <job-executor>
       <thread-pool-name>job-executor-tp</thread-pool-name>
       <core-threads>3</core-threads>
       <max-threads>10</max-threads>
       <queue-length>3</queue-length>
       <keepalive-time>10</keepalive-time>
       <job-acquisitions>
         ...
       </job-acquisitions>
     </job-executor>
     ...
   </subsystem>
	 ```

2. As second step, since now you have configured the Thread Pool in the Camunda subsystem, remove the JBoss Threads subsystem configuration entry related to the Camunda Job Executor Thread Pool. 
   When there is no other thread-pool configuration entry left, you could also delete the JBoss Threads subsystem entirely.
   ```xml
   <subsystem xmlns="urn:jboss:domain:threads:1.1">
     <!-- Hint: START DELETION -->
     <bounded-queue-thread-pool name="job-executor-tp" allow-core-timeout="true">
       <core-threads count="3" />
       <max-threads count="10" />
       <queue-length count="3" />
       <keepalive-time time="10" unit="seconds" />
     </bounded-queue-thread-pool>
     <!-- Hint: END DELETION -->
   </subsystem>
   ```

3. As an optional cleanup step, you can delete the JBoss Threads subsystem entry in the extensions element on top of the `standalone.xml` file, if you no longer need it.   
   ```xml
   <server xmlns="urn:jboss:domain:2.2">
     <extensions>
       ...
       <extension module="org.jboss.as.threads"/> <-- REMOVE THIS LINE
       ...
     </extensions>
     ...
   </server>
   ```

### JBoss Threads to Camunda subsystem mapping table

The following mapping table shows the JBoss Threads properties and their counterpart in the Camunda Subsystem to ease the transition of the Job Executor Thread Pool configuration to the Camunda subsystem. 
		
<table class="table table-striped">
<tr>
  <th>JBoss Threads Property name</th>
  <th>Camunda Subsystem Property name</th>
  <th>Description</th>
</tr>
<tr>
  <td><code>name="job-executor-tp"</code></td>
  <td><code>&lt;thread-pool-name&gt;<br/>job-executor-tp<br/>&lt;/thread-pool-name&gt;</code></td>
  <td>
    Specify the name of the thread pool. Can be discard because it is not longer needed.
    <p><strong>Default Value:</strong> job-executor-tp</p>
  </td>
</tr>
<tr>
  <td><code>&lt;core-threads count="3" /&gt;</code></td>
  <td><code>&lt;core-threads&gt;<br/>3<br/>&lt;/core-threads&gt;</code></td>
  <td>
    Sets the minimum number of threads that are always present in the thread pool.
    <p><strong>Default Value:</strong> 3</p>
  </td>
</tr>
<tr>
  <td><code>&lt;max-threads count="10" /&gt;</code></td>
  <td><code>&lt;max-threads&gt;<br/>10<br/>&lt;/max-threads&gt;</code></td>
  <td>
    Sets the maximum number of threads that can be present in the thread pool.
    <p><strong>Default Value:</strong> 5</p>
  </td>
</tr>
<tr>
  <td><code>&lt;queue-length count="3" /&gt;</code></td>
  <td><code>&lt;queue-length&gt;<br/>3<br/>&lt;/queue-length&gt;</code></td>
  <td>
    Sets the size of the queue for the thread pool => maximum number of tasks storeable in the queue until it signals it is full.
    <p><strong>Default Value:</strong> 10</p>
  </td>
</tr>
<tr>
  <td><code>&lt;keepalive-time time="10" unit="seconds" /&gt;</code></td>
  <td><code>&lt;keepalive-time&gt;<br/>10<br/>&lt;/keepalive-time&gt;</code></td>
  <td>
    Specify the time in seconds threads will be kept alive when there are no tasks present before threads are terminated until the core-threads number is reached.
    <p><strong>Default Value:</strong> 10</p>
  </td>
</tr>
<tr>
  <td><code>allow-core-timeout="true"</code></td>
  <td><code>&lt;allow-core-timeout&gt;<br/>true<br/>&lt;/allow-core-timeout&gt;</code></td>
  <td>
    Are core threads allowed to timeout and shutdown, when they idle for the amount specified by keepalive-time.
    <p><strong>Default Value:</strong> true</p>
  </td>
</tr>
</table>

For further information on available configuration for the Job Executor Thread Pool, see the docs for [Camunda JBoss/WildFly Subsystem][jboss-container-integration]

# 4. Maintain Process Applications

This section describes changes in behavior of API methods that your process applications may rely on.

## Incident Handler

The interface of an [Incident Handler]({{< relref "user-guide/process-engine/incidents.md" >}}) has changed. Instead of a long parameter list, the methods pass a context object which bundles all required informations, like process definition id, execution id and tenant id. Since the existing methods have been overridden, custom implementations of an incident handler have to be adjusted.

## Correlation Handler

A new method has been added to the interface of a {{< javadocref page="?org/camunda/bpm/engine/impl/runtime/CorrelationHandler.html" text="Correlation Handler" >}}. The new method `correlateStartMessage()` allows to explicit trigger a message start event of a process definition. If the default implementation is replaced by a custom one then it have to be adjusted.

# 5. Upgrade Camunda Web Applications

## Upgrade REST API

The following steps are required to upgrade the Camunda REST API on a JBoss / Wildfly instance:

1. Undeploy an existing web application with a name like `camunda-engine-rest`
2. Download the REST API web application archive from our [Maven Nexus Server][engine-rest]. Alternatively, switch to the private repository for
   the enterprise version (User and password from license required). Choose the correct version named `$PLATFORM_VERSION/camunda-engine-rest-$PLATFORM_VERSION.war`.
3. Deploy the web application archive to your JBoss / Wildfly instance.

## Upgrade Cockpit, Tasklist, and Admin

The following steps are required to upgrade the Camunda web applications Cockpit, Tasklist, and Admin on a JBoss / Wildfly instance:

1. Undeploy an existing web application with a name like `camunda-webapp`
2. Download the Camunda web application archive from our [Maven Nexus Server][webapp-jboss].
   Alternatively, switch to the private repository for the enterprise version (User and password from license required).
   Choose the correct version named `$PLATFORM_VERSION/camunda-webapp-jboss.war`.
3. Deploy the web application archive to your JBoss / Wildfly instance.


[jboss-threads-to-camunda-mapping-table]: {{< relref "update/minor/74-to-75/jboss.md#jboss-threads-to-camunda-subsystem-mapping-table" >}}
[upgrade-guide]: {{< relref "update/minor/74-to-75/index.md" >}}
[jboss-distro]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/jboss/camunda-bpm-jboss/
[wildfly-distro]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/wildfly/camunda-bpm-wildfly/
[engine-rest]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/camunda-engine-rest/
[webapp-jboss]: https://app.camunda.com/nexus/content/groups/public/org/camunda/bpm/webapp/camunda-webapp-jboss/
[jboss-container-integration]: {{< relref "user-guide/runtime-container-integration/jboss.md" >}}
