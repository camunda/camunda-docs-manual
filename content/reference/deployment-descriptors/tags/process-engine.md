---

title: 'Process Engine Configuration'
weight: 50

menu:
  main:
    name: "<process-engine />"
    identifier: "descriptor-ref-process-engine"
    parent: "descriptor-ref-tags"
    pre: "Configure a Process Engine."

---


The process engine configuration can be placed in both [processes.xml]({{< ref "/reference/deployment-descriptors/descriptors/processes-xml.md" >}}) and the [bpm-platform.xml]({{< ref "/reference/deployment-descriptors/descriptors/bpm-platform-xml.md" >}}) files. If the process engine is configured in either or both of those files, it will be bootstrapped by the Camunda BPM platform infrastructure and be made available through `BpmPlatform.getProcessEngineService().getProcessEngine("name of process engine")`.


# Example

The following example shows an XML snippet which can be placed in both [processes.xml]({{< ref "/reference/deployment-descriptors/descriptors/processes-xml.md" >}}) and/or [bpm-platform.xml]({{< ref "/reference/deployment-descriptors/descriptors/bpm-platform-xml.md" >}}).

```xml
<process-engine name="default">
  <job-acquisition>default</job-acquisition>
  <configuration>org.camunda.bpm.engine.impl.cfg.StandaloneProcessEngineConfiguration</configuration>
  <datasource>java:jdbc/ProcessEngine</datasource>

  <properties>
    <property name="history">full</property>
    <property name="databaseSchemaUpdate">true</property>
    <property name="authorizationEnabled">true</property>
  </properties>

</process-engine>
```


# Syntax Reference

<table class="table table-striped">
  <tr>
    <th>Tag name </th>
    <th>Parent tag name</th>
    <th>Required?</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>&lt;process-engine&gt;</code></td>
    <td><code>&lt;process-application&gt;</code> or <code>&lt;bpm-platform&gt;</code></td>
    <td>true</td>
    <td>
        Container element for the configuration of a process engine.
      <p>
        <strong>Attributes:</strong>
        <ul>
          <li><code>name</code>: allows you to define the name of the process engine (Required).</li>
        </ul>
      </p>
      <p>
        <strong>Text Content:</strong>
        None.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;job-acquisition&gt;</code></td>
    <td><code>&lt;process-engine&gt;</code></td>
    <td>true</td>
    <td>
        Assign the process engine to a job acquisition.
      <p>
        <strong>Attributes:</strong>
        None.
      </p>
      <p>
        <strong>Text Content:</strong>
        The name of the job acquisition to be used for this process engine. Job acquisitions are configured in the <a href="{{< ref "/reference/deployment-descriptors/descriptors/bpm-platform-xml.md" >}}">bpm-platform.xml</a> file.
      </p>
      <p>
        <strong>Example:</strong>
        <code>&lt;job-acquisition&gt;default&lt;/job-acquisition&gt;</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;configuration&gt;</code></td>
    <td><code>&lt;process-engine&gt;</code></td>
    <td>false</td>
    <td>
        Provide the name of the process engine configuration class.
      <p>
        <strong>Attributes:</strong>
        None.
      </p>
      <p>
        <strong>Text Content:</strong>
        The fully qualified classname of the Process Engine Configuration class to be used for this process engine. The class must be a subclass of {{< javadocref page="?org/camunda/bpm/engine/impl/cfg/ProcessEngineConfigurationImpl.html" text="ProcessEngineConfigurationImpl" >}}".
      </p>
      <p>
        <strong>Default Value:</strong>
        {{< javadocref page="?org/camunda/bpm/engine/impl/cfg/StandaloneProcessEngineConfiguration.html" text="StandaloneProcessEngineConfiguration" >}}
      </p>
      <p>
        <strong>Example:</strong><br/>
        <code>&lt;configuration&gt;<br/>
        &nbsp;&nbsp;my.custom.ProcessEngineConfiguration<br/>
        &lt;/configuration&gt;</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;datasource&gt;</code></td>
    <td><code>&lt;process-engine&gt;</code></td>
    <td>false</td>
    <td>
        Provide the JDBC name of the datasource to use for the process engine.
      <p>
        <strong>Attributes:</strong>
        None.
      </p>
      <p>
        <strong>Text Content:</strong>
        JDBC name of the datasource to use for this process engine.
      </p>
      <p>
        <strong>Default Value:</strong>
        null.
      </p>
      <p>
        <strong>Example:</strong>
        <code>&lt;datasource&gt;java:jdbc/ProcessEngine&lt;/datasource&gt;</code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;properties&gt;</code></td>
    <td><code>&lt;process-engine&gt;</code>, <code>&lt;plugin&gt;</code></td>
    <td>false</td>
    <td>
        Container element for providing a set of process engine configuration (or plugin) properties.
      <p>
        <strong>Attributes:</strong>
        None.
      </p>
      <p>
        <strong>Text Content:</strong>
        None.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;property&gt;</code></td>
    <td><code>&lt;properties&gt;</code></td>
    <td>false</td>
    <td>
        Set value for process engine configuration property or of a process engine plugin.
      <p>
        <strong>Attributes:</strong>
        <ul>
          <li><code>name</code>: The name of the property to be set (Required). The process engine configuration (or plugin) class must provide a setter method setXXX() for the property name.</li>
        </ul>
      </p>
      <p>
        <strong>Text Content:</strong>
        The value of the property to be set. Property values are converted into String, Integer or Boolean values, depending on the type of the setter in the process engine configuration (or plugin) class.
      </p>
      <p>
        <strong>Example:</strong> <br>
        <code><property name="authorizationEnabled">true</property></code>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;plugins&gt;</code></td>
    <td><code>&lt;process-engine&gt;</code></td>
    <td>false</td>
    <td>
        Container element for providing a set of <a href="{{< ref "/user-guide/process-engine/process-engine-plugins.md" >}}">process engine plugin</a> configurations.
      <p>
        <strong>Attributes:</strong>
        None.
      </p>
      <p>
        <strong>Text Content:</strong>
        None.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;plugin&gt;</code></td>
    <td><code>&lt;plugins&gt;</code></td>
    <td>false</td>
    <td>
        Container element for providing an individual <a href="{{< ref "/user-guide/process-engine/process-engine-plugins.md" >}}">process engine plugin</a> configuration.
      <p>
        <strong>Attributes:</strong>
        None.
      </p>
      <p>
        <strong>Text Content:</strong>
        None.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>&lt;class&gt;</code></td>
    <td><code>&lt;plugin&gt;</code></td>
    <td>false</td>
    <td>
        Sets the classname of a <a href="{{< ref "/user-guide/process-engine/process-engine-plugins.md" >}}">process engine plugin</a>.
      <p>
        <strong>Attributes:</strong>
        None.
      </p>
      <p>
        <strong>Text Content:</strong>
        The fully qualified classname of a process engine plugin. Must be an implementation of {{< javadocref page="?org/camunda/bpm/engine/impl/cfg/ProcessEnginePlugin.html" text="ProcessEnginePlugin" >}}
      </p>
    </td>
  </tr>
</table>


# Configuration Properties

The following is a list with the most commonly used process engine configuration properties, along with some explanations. The properties can be used in the `<property name="foo">bar</property>` tag, where `foo` is the name of the property and `bar` is the value of the property.

<table class="table table-striped">
  <tr>
    <th>Property name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>authorizationEnabled</code></td>
    <td>Boolean</td>
    <td>Activates <a href="{{< ref "/user-guide/process-engine/authorization-service.md#enable-authorization-checks ">}}">authorization checks</a>.</td>
  </tr>

  <tr>
    <td><code>autoStoreScriptVariables</code></td>
    <td>Boolean</td>
    <td>
        Controls whether all global script variables should be automatically stored as process variables or not.
        Default value is <code>false</code>.
      <p>
        <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
      </p>
    </td>
  </tr>

  <tr>
    <td><code>databaseSchemaUpdate</code></td>
    <td>String</td>
    <td>
        Sets the value for process engine <a href="{{< ref "/user-guide/process-engine/database.md#database-configuration">}}">database schema creation</a>.
      <p>
        <strong>Values:</strong> <code>false</code>, <code>create-drop</code>, <code>true</code>.
      </p>
    </td>
  </tr>

  <tr>
    <td><code>databaseTablePrefix</code></td>
    <td>String</td>
    <td>
        Specifies a prefix for any table name included in SQL statements made by the process engine. Can be used to point the engine to a specific schema by setting the value to <code>MY_SCHEMA.</code> or tables with a naming pattern by setting the value to <code>MY_TABLE_PREFIX_PATTERN_</code>.
    </td>
  </tr>

  <tr>
    <td><code>defaultNumberOfRetries</code></td>
    <td>Integer</td>
    <td>
        Specifies how many times a job will be executed before an incident is raised. Default value: <code>3</code>
    </td>
  </tr>

  <tr>
    <td><code>defaultUserPermissionNameForTask</code></td>
    <td>String</td>
    <td>
        Set the default <a href="{{< ref "/user-guide/process-engine/authorization-service.md#default-task-permissions">}}">permisson to work on a task</a>. Allowed values are <code>UPDATE</code> or <code>TASK_WORK</code>. Default value: <code>UPDATE</code>.
    </td>
  </tr>

  <tr>
    <td><a name="disabledPermissions"></a><code>disabledPermissions</code></td>
    <td>List</td>
    <td>Define a list of Permissions' names. These permissions will be not taken into account whenever authorization check is performed.
    </td>
  </tr>

  <tr>
    <td><code>enableExceptionsAfterUnhandledBpmnError</code></td>
    <td>Boolean</td>
    <td>
        If set to <code>true</code>, Process Engine Exception is thrown when <a href="{{< ref "/reference/bpmn20/events/error-events.md#unhandled-bpmn-error">}}">unhandled BPMN Error</a> occurs. Default value: <code>false</code>
      <p>
        <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
      </p>
    </td>
  </tr>

  <tr>
    <td><code>enableExpressionsInAdhocQueries</code></td>
    <td>Boolean</td>
    <td>
      If set to <code>true</code>, expressions can be used when creating and executing adhoc queries. For details, see the section on <a href="{{< ref "/user-guide/process-engine/securing-custom-code.md">}}">security considerations for custom code</a> in the user guide.
      Default value is <code>false</code>.
      <p>
        <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
      </p>
    </td>
  </tr>

  <tr>
    <td><code>enableExpressionsInStoredQueries</code></td>
    <td>Boolean</td>
    <td>
      If set to <code>true</code>, expressions can be used when creating and executing stored queries. For details, see the section on <a href="{{< ref "/user-guide/process-engine/securing-custom-code.md">}}">security considerations for custom code</a> in the user guide.
      Default value is <code>true</code>.
      <p>
        <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
      </p>
    </td>
  </tr>
  
  <tr>
    <td><code>enableFetchProcessDefinitionDescription</code></td>
    <td>Boolean</td>
    <td>
      If set to false, Bpmn Model Instance is not fetched and cached whenever a process definition query is performed and thus the returned process definition does not contain the description.
      Default value is <code>true</code>.
      <p>
        <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
      </p>
    </td>
  </tr>
  
  <tr>
      <td><code>enableXxeProcessing</code></td>
      <td>Boolean</td>
      <td>
        If set to <code>true</code>, enables XML eXternal Entity (XXE) Processing. When disabled, it provides protection against XXE Processing attacks.
        Default value is <code>false</code>.
        <p>
          <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
        </p>
      </td>
    </tr>

  <tr>
    <td><code>enableScriptCompilation</code></td>
    <td>Boolean</td>
    <td>
        Controls whether the process engine should attempt to compile script sources and cache the compilation result or not. Default value is <code>true</code>.
      <p>
        <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
      </p>
    </td>
  </tr>

  <tr>
    <td><code>forceCloseMybatisConnectionPool</code></td>
    <td>Boolean</td>
    <td>
      Controls whether a Mybatis-managed database connection pool is force closed when the process engine is closed. Closing the pool closes all active and idle database connections.
      <p>
        <strong>Values:</strong> <code>true</code> (default), <code>false</code>.
      </p>
    </td>
  </tr>

  <tr>
    <td><code>failedJobRetryTimeCycle</code></td>
    <td>String</td>
    <td>
     Sets how often a job is retried after a fail and how long the engine should wait until it tries to execute a job again. See the <a href="{{< ref "/user-guide/process-engine/the-job-executor.md#retry-time-cycle-configuration" >}}">user guide</a>
        for more details on this setting.
    </td>
  </tr>

  <tr id="ensureJobDueDateNotNull">
    <td><code>ensureJobDueDateNotNull</code></td>
    <td>Boolean</td>
    <td>
        Ensures that each job has it's <code>DueDate</code> property set. If the Job <code>DueDate</code> property hasn't been explicitly set, the current time is added. Default value is <code>true</code>.
        <p>
            <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
        </p>
    </td>
  </tr>

  <tr id="enable-historic-instance-permissions">
    <td><code>enableHistoricInstancePermissions</code></td>
    <td>Boolean</td>
    <td>
        If the value of this flag is set to <code>true</code>, 
        <a href="{{< ref "/user-guide/process-engine/authorization-service.md#historic-instance-permissions" >}}">Historic Instance Permissions</a>
        are enabled. Default value is <code>false</code>.
        <p>
            <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
        </p>
    </td>
  </tr>

  <tr id="enforceSpecificVariablePermission">
    <td><code>enforceSpecificVariablePermission</code></td>
    <td>Boolean</td>
    <td>
        If the value of this flag is set to <code>true</code>, the <a href="{{< ref "/user-guide/process-engine/authorization-service.md#default-read-variable-permissions" >}}">default permissions</a> to see/read variables are:
        <ul>
          <li>READ_INSTANCE_VARIABLE, READ_HISTORY_VARIABLE, and READ_TASK_VARIABLE on Process Definition resource, and READ_VARIABLE on Task resource</li>
          <li>READ_VARIABLE on Historic Task resource</li>
        </ul>
        
        Default value is <code>false</code>.
        <p>
            <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
        </p>
    </td>
  </tr>

  <tr>
    <td><code>history</code></td>
    <td>String</td>
    <td>
        Sets the <a href="{{< ref "/user-guide/process-engine/history.md#choose-a-history-level">}}">level of the process engine history</a>.
      <p>
        <strong>Values:</strong> <code>none</code>, <code>activity</code>, <code>audit</code>, <code>full</code>.
      </p>
    </td>
  </tr>
  
  <tr id="enableDefaultDbHistoryEventHandler">
    <td><code>enableDefaultDbHistoryEventHandler</code></td>
    <td>Boolean</td>
    <td>
        If the value of this flag is <code>true</code>, an instance of the default
        <code>DbHistoryEventHandler</code> class is included in the collection of History Events
        Handlers. This flag should be used in conjunction with the 
        <code>customHistoryEventHandlers</code> List property when defining custom History Event
        Handlers. The default value is <code>true</code>. 
      <p>
        <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
      </p>
    </td>
  </tr>

  <tr id="historyRemovalTimeStrategy">
    <td><code>historyRemovalTimeStrategy</code></td>
    <td>String</td>
    <td>
      Controls if and when the <a href="{{< ref "/user-guide/process-engine/history.md#removal-time">}}">removal time</a> of an historic instance is set.
      The default value is <code>end</code>.<br>
      Please also see the <a href="{{< ref "/reference/deployment-descriptors/tags/process-engine.md#historyCleanupStrategy">}}"><code>historyCleanupStrategy</code></a>
      configuration parameter.<br><br>
      <strong>Values:</strong> <code>start</code>, <code>end</code>, <code>none</code> (String).
    </td>
  </tr>

  <tr id="hostname">
    <td><code>hostname</code></td>
    <td>String</td>
    <td>
      Sets the name of the host on which the Process Engine will run. The hostname property is also
      used as the Metrics Reporter identifier.
      <br><br>
      A custom hostname can be generated by providing an implementation of the
      {{< javadocref page="?org/camunda/bpm/engine/impl/history/event/HostnameProvider.html" text="HostnameProvider" >}} 
      interface and and setting the engine property `hostnameProvider` to an instance of that class.
      <br><br>
    </td>
  </tr>

  <tr>
    <td><code>jdbcDriver</code></td>
    <td>String</td>
    <td>
        Sets the fully qualified classname of the JDBC driver to use.
      <p>
        This is usually used if the process engine is NOT configured using a <code>&lt;datasource&gt;</code> (see above) but using the built-in mybatis connection pool instead.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>jdbcPassword</code></td>
    <td>String</td>
    <td>
        Sets the password of the JDBC connection.
      <p>
        This is usually used if the process engine is NOT configured using a <code>&lt;datasource&gt;</code> (see above) but using the built-in mybatis connection pool instead.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>jdbcUrl</code></td>
    <td>String</td>
    <td>
        Sets the JDBC url for the database connection.
      <p>
        This is usually used if the process engine is NOT configured using a <code>&lt;datasource&gt;</code> (see above) but using the built-in mybatis connection pool instead.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>jdbcUsername</code></td>
    <td>String</td>
    <td>
        Sets the username of the JDBC connection.
      <p>
        This is usually used if the process engine is NOT configured using a <code>&lt;datasource&gt;</code> (see above) but using the built-in mybatis connection pool instead.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>jdbcBatchProcessing</code></td>
    <td>Boolean</td>
    <td>
        Controls if the engine executes the jdbc statements as Batch or not.
      <p>
        Default is <code><strong>true</strong></code>, but this has to be disabled for some databases. See <a href="{{<ref "/user-guide/process-engine/database.md#jdbc-batch-processing" >}}">the user guide</a> for further details.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>jobExecutorAcquireByDueDate</code></td>
    <td>Boolean</td>
    <td>
        Controls whether the job executor acquires the next jobs to execute ordered by due date. Default value is <code>false</code>. See the
        <a href="{{< ref "/user-guide/process-engine/the-job-executor.md#the-job-order-of-job-acquisition" >}}">user guide</a>
        for more details on this setting.
      <p>
        <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
      </p>
    </td>
  </tr>

  <tr>
    <td><code>jobExecutorActivate</code></td>
    <td>Boolean</td>
    <td>
        Controls whether the process engine starts with an active job executor or not. For a shared process engine configuration, the default value is <code>true</code>. For an embedded process engine configuration, the default value is <code>false</code>. See the
        <a href="{{< ref "/user-guide/process-engine/the-job-executor.md#job-executor-activation" >}}">user guide</a>
        for more details on this setting.
      <p>
        <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
      </p>
    </td>
  </tr>

  <tr>
    <td><code>jobExecutorDeploymentAware</code></td>
    <td>Boolean</td>
    <td>
        Controls whether the job executor is deployment aware or not.
      <p>
        <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
      </p>
    </td>
  </tr>

  <tr>
    <td><code>jobExecutorPreferTimerJobs</code></td>
    <td>Boolean</td>
    <td>
        Controls whether the job executor prefers due timer jobs over other job types. Default value is <code>false</code>. See the
        <a href="{{< ref "/user-guide/process-engine/the-job-executor.md#the-job-order-of-job-acquisition" >}}">user guide</a>
        for more details on this setting.
      <p>
        <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
      </p>
  </td>
  <tr id="skipHistoryOptimisticLockingExceptions">
    <td><code>skipHistoryOptimisticLockingExceptions</code></td>
    <td>Boolean</td>
    <td>
        Controls if the engine will throw <a href="{{< ref "/user-guide/process-engine/transactions-in-processes.md#optimistic-locking-in-camunda" >}}">OptimisticLockingException</a>s on UPDATE or DELETE operations for historical data or not.
        The default is <code><strong>true</strong></code>. To preserve the previous behavior (≤ 7.9), the flag must be set to <code><strong>false</strong></code>.<br><br>
        <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
    </td>
  </tr>
  <tr>
    <td><code>tenantCheckEnabled</code></td>
    <td>Boolean</td>
    <td>
        Controls whether the process engine performs tenant checks to ensure that an authenticated user can only access data that belongs to one of his tenants. Default value is <code>true</code>.
        See the <a href="{{< ref "/user-guide/process-engine/multi-tenancy.md#single-process-engine-with-tenant-identifiers" >}}">user guide</a> for more details.
      <p>
        <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
      </p>
    </td>
  </tr>

  <tr>
    <td><code>batchJobsPerSeed</code></td>
    <td>Integer</td>
    <td>
        Sets the number of batch execution jobs created per batch seed job
        invocation.
        See the <a href="{{< ref "/user-guide/process-engine/batch.md#job-definitions" >}}">
        user guide</a> for more information on batch execution.
        Default value: <code>100</code>
    </td>
  </tr>

  <tr>
    <td><code>invocationsPerBatchJob</code></td>
    <td>Integer</td>
    <td>
        Sets the number of invocations a single batch execution job executes.
        See the <a href="{{< ref "/user-guide/process-engine/batch.md#job-definitions" >}}">
        user guide</a> for more information on batch execution.
        Default value: <code>1</code>
    </td>
  </tr>
  
  <tr id="invocations-per-batch-job-by-batch-type">
    <td><code>invocationsPerBatchJobByBatchType</code></td>
    <td>Map</td>
    <td>
        Defines the invocations per batch job for each individual
        batch type. Unless specified in this map, the value of 
        'invocationsPerBatchJob' is used for batch operations.<br><br>
        Read more in the 
        <a href="{{< ref "/user-guide/process-engine/batch.md#configuration" >}}">User Guide</a>.
    </td>
  </tr>

  <tr>
    <td><code>batchPollTime</code></td>
    <td>Integer</td>
    <td>
        Sets the poll interval of the batch monitor job to check for batch
        completion in seconds.
        See the <a href="{{< ref "/user-guide/process-engine/batch.md#job-definitions" >}}">
        user guide</a> for more information on batch execution.
        Default value: <code>30</code>
    </td>
  </tr>

  <tr>
    <td><code>batchJobPriority</code></td>
    <td>Integer</td>
    <td>
        Sets the default batch job priority.
        See the <a href="{{< ref "/user-guide/process-engine/the-job-executor.md#job-prioritization" >}}">
        user guide</a> for more information on job prioritization.
        Default value: <code>0</code>
    </td>
  </tr>

  <tr>
    <td><code>deploymentLockUsed</code></td>
    <td>Boolean</td>
    <td>
        Sets if the process engine must acquire an <a href="{{< ref "/user-guide/process-engine/deployments.md#deployments-in-a-clustered-scenario" >}}">exclusive lock when creating a deployment</a>.
        Default value: <code>true</code>
    </td>
  </tr>

  <tr>
    <td><code>deploymentSynchronized</code></td>
    <td>Boolean</td>
    <td>
        Sets if processing of the deployment must be synchronized. When <code>true</code> several deployments will be processed sequentially on one process engine node.
        When <code>false</code>, they may be processed in parallel, though depending of value of <code>deploymentLockUsed</code> they may still be synchronized
        using database pessimistic lock.
        Default value: <code>true</code>
    </td>
  </tr>

  <tr>
    <td><a name="javaSerializationFormatEnabled"></a><code>javaSerializationFormatEnabled</code></td>
    <td>Boolean</td>
    <td>
        Sets if Java serialization format can be used, when <a href="{{< ref "/user-guide/process-engine/variables.md#object-values">}}">setting variables by their serialized representation</a>. Default value: <code>false</code>
    </td>
  </tr>
  
  <tr>
    <td><a name="deserializationTypeValidationEnabled"></a><code>deserializationTypeValidationEnabled</code></td>
    <td>Boolean</td>
    <td>
        Sets if validation of types should be performed before JSON and XML deserialization. See <a href="{{< ref "/user-guide/security.md#variable-values-from-untrusted-sources" >}}">Security Instructions</a> for further information. Default value: <code>false</code>
    </td>
  </tr>
  
  <tr>
    <td><code>deserializationAllowedPackages</code></td>
    <td>String</td>
    <td>
        Sets the allowed package names of types that are analyzed before JSON and XML deserialization if <code>deserializationTypeValidationEnabled</code> is set to <code>true</code>. With the default validator, this can be a comma-separated list of allowed package names. Only the defined packages and their sub-packages will be allowed in conjunction with the <code>deserializationAllowedClasses</code>. Also, the default validator always allows types within the package "java.lang" and all sub-packages. See <a href="{{< ref "/user-guide/security.md#variable-values-from-untrusted-sources" >}}">Security Instructions</a> for further information. Default value: <code>null</code>
    </td>
  </tr>
  
  <tr>
    <td><code>deserializationAllowedClasses</code></td>
    <td>String</td>
    <td>
        Sets the allowed class names of types that are analyzed before JSON and XML deserialization if <code>deserializationTypeValidationEnabled</code> is set to <code>true</code>. With the default validator, this can be a comma-separated list of class names. Only the defined class names will be allowed in conjunction with the <code>deserializationAllowedPackages</code>. Also, the default validator always allows the following types: <code>java.util.ArrayList</code>, <code>java.util.Arrays$ArrayList</code>, <code>java.util.HashMap</code>, <code>java.util.HashSet</code>, <code>java.util.LinkedHashMap</code>, <code>java.util.LinkedHashSet</code>, <code>java.util.LinkedList</code>, <code>java.util.Properties</code>, <code>java.util.TreeMap</code>, <code>java.util.TreeSet</code>. See <a href="{{< ref "/user-guide/security.md#variable-values-from-untrusted-sources" >}}">Security Instructions</a> for further information. Default value: <code>null</code>
    </td>
  </tr>

  <tr>
    <td><a name="enablePasswordPolicy"></a><code>enablePasswordPolicy</code></td>
    <td>Boolean</td>
    <td>Set to <code>true</code>, to enable a <a href="{{< ref "/user-guide/process-engine/password-policy">}}">password policy</a> for users that are managed by the engine. If a <a href="https://docs.camunda.org/manual/latest/user-guide/process-engine/password-policy/#customize-the-password-policy">custom password policy</a> is configured, it will be enabled. Otherwise the <a href="https://docs.camunda.org/manual/latest/user-guide/process-engine/password-policy/#default-password-policy">default password policy</a> is activated.
    </td>
  </tr>

  <tr>
    <td><a name="enableCmdExceptionLogging"></a><code>enableCmdExceptionLogging</code></td>
    <td>Boolean</td>
    <td>Set to <code>false</code>, to disable logging of unhandled exceptions that occur during command execution. The default setting for this flag is <code>true</code>. Note: There might be duplicate log entries for command exceptions (e.g. when a job fails).
    </td>
  </tr>

  <tr>
    <td><a name="enableReducedJobExceptionLogging"></a><code>enableReducedJobExceptionLogging</code></td>
    <td>Boolean</td>
    <td>Set to <code>true</code>, to suppress logging of exceptions that occur during the execution of a job that has retries left. If the job does not have any retries left an exception will still be logged.
    </td>
  </tr>

  <tr>
    <td><a name="queryMaxResultsLimit"></a><code>queryMaxResultsLimit</code></td>
    <td>Integer</td>
    <td>
        When defining a limit of maximum results, an authenticated user cannot perform a query 
        with an unbounded number of results or a paginated query that exceeds the limit. 
        Read more about it in the
        <a href="{{< ref "/user-guide/process-engine/process-engine-api.md#query-maximum-results-limit">}}">User Guide</a>.
        <br><br>
        <strong>Note:</strong> To gain the full feature set of the Webapps, and not suffer any UX degradation due to unavailable data, the <code>queryMaxResultsLimit</code> must be set to <code>2000</code>. If you use Optimize it is recommended to set the value to <code>10 000</code>, so the import of the data to Optimize works out of the box.<br><br>
        The default value is 2<sup>31</sup>-1.
    </td>
  </tr>
  
  <tr id="dmnFeelEnableLegacyBehavior">
    <td><code>dmnFeelEnableLegacyBehavior</code></td>
    <td>Boolean</td>
    <td>
      Set to <code>true</code> to restore the legacy FEEL configuration of the DMN Engine. This
      will result in the usage of the old, Java-based FEEL Engine, as well as the usage of JUEL
      in DMN input expressions, output entries and literal expressions. When set to 
      <code>false</code>, the new, Scala-based FEEL Engine is used, and FEEL is used as the
      default language for DMN input expressions, input and output entries, and literal expressions.
      Default value: <code>false</code>
    </td>
  </tr>
  
  <tr id="dmnFeelCustomFunctionProviders">
    <td><code>dmnFeelCustomFunctionProviders</code></td>
    <td>List</td>
    <td>
        Define a list of instances of <code>FeelCustomFunctionProvider</code>.<br><br>
        Read more about it in the <a href="{{< ref "/user-guide/dmn-engine/feel/custom-functions.md" >}}">User Guide</a>.
    </td>
  </tr>

  <tr id="initializeTelemetry">
    <td><code>initializeTelemetry</code></td>
    <td>boolean</td>
    <td>
        <p>Sets the initial property value of telemetry configuration only once when it has never been enabled/disabled before. If enabled, information about the setup and usage of the process engine is sent to remote Camunda servers for the sake of analytical evaluation. It can be enabled/disabled later via Java/<a href="{{< ref "/reference/rest/telemetry/port-telemetry.md" >}}">REST</a> API.
        <p>
          For more information and a complete list of the data that is collected, please check the <a href="{{< ref "/introduction/telemetry.md" >}}">Telemetry</a> page.
        </p>
        <h6>
          <strong>Legal note:</strong>
        </h6>
        <p>
          Before you install a Camunda BPM Runtime version >= 7.14.0-alpha1 (and 7.13.7+, 7.12.12+, 7.11.19+) or activate the telemetric functionality, please make sure that you are authorized to take this step, and that the installation or activation of the telemetric functionality is not in conflict with any internal company policies, compliance guidelines, any contractual or other provisions or obligations of your company.
        </p>
        <p>
          Camunda can not be held responsible in the event of unauthorized installation or activation of this function.
        </p>
        
    </td>
  </tr>
  
  <tr id="telemetryReporterActivate">
    <td><code>telemetryReporterActivate</code></td>
    <td>Boolean</td>
    <td>
        <p>Activates the thread that periodically reports telemetry. Note that the thread only sends telemetry if telemetry is in addition enabled via API or by the <code>initializeTelemetry</code> property.</p>
        <p>The reporter can for example be deactivated in unit testing setups to avoid any threads running besides the test thread.</p>
        Default value: <code>true</code>
    </td>
  </tr>
  
  <tr>
    <td><code>telemetryReportingPeriod</code></td>
    <td>Long</td>
    <td>
        Sets the period in which telemetry requests are sent. Value must be in seconds.
        Default value: <code>86400</code> (one day)
    </td>
  </tr>
  
  <tr id="telemetryRequestRetries">
    <td><code>telemetryRequestRetries</code></td>
    <td>Integer</td>
    <td>
        Sets the number of retries that are performed when a telemetry request fails.
        Default value: <code>2</code>
    </td>
  </tr>
  
  <tr id="telemetryRequestTimeout">
    <td><code>telemetryRequestTimeout</code></td>
    <td>Integer</td>
    <td>
        Sets the request timeout configuration in millisecodns of the telemetry request.
        Default value: <code>15000</code> (15 s)
    </td>
  </tr>


</table>

## History cleanup configuration parameters

<table class="table table-striped">
  <tr id="historyCleanupStrategy">
    <td><code>historyCleanupStrategy</code></td>
    <td>String</td>
    <td>
      Controls which <a href="{{< ref "/user-guide/process-engine/history.md#history-cleanup">}}">History cleanup</a> strategy is used.
      The default value is <code>removalTimeBased</code>.<br>
      Please also see the <a href="{{< ref "/reference/deployment-descriptors/tags/process-engine.md#historyRemovalTimeStrategy">}}"><code>historyRemovalTimeStrategy</code></a> configuration parameter.<br><br>
      <strong>Values:</strong> <code>removalTimeBased</code>, <code>endTimeBased</code>.
    </td>
  </tr>
  <tr>
    <td><code>historyCleanupBatchWindowStartTime</code></td>
    <td>String</td>
    <td><a href="{{< ref "/user-guide/process-engine/history.md#history-cleanup">}}">History cleanup</a> batch window start time in the format <code>HH:mmZ</code> (Z is for RFC 822 time zone) or <code>HH:mm</code>. E.g., <code>20:00+0100</code> or <code>20:00</code>. In case of <code>null</code>, no batch window is considered to be configured
    and history cleanup can only be called manually.</td>
  </tr>
  <tr>
    <td><code>historyCleanupBatchWindowEndTime</code></td>
    <td>String</td>
    <td><a href="{{< ref "/user-guide/process-engine/history.md#history-cleanup">}}">History cleanup</a> batch window end time in the format <code>HH:mmZ</code> (Z is for RFC 822 time zone) or <code>HH:mm</code>. E.g., <code>23:00-0300</code> or <code>23:00</code>. In case <code>batchWindowEndTime</code> exceeds <code>batchWindowStartTime</code> it is considered
    to be on the same date (e.g., cleanup runs each day between 20:00 and 23:00). Otherwise it is considered to be on the next calendar day (e.g., cleanup starts each
    day at 20:00 and finishes the next day at 01:00). Default value is `00:00`.</td>
  </tr>
  <tr>
    <td><code>mondayHistoryCleanupBatchWindowStartTime</code></td>
    <td>String</td>
    <td><a href="{{< ref "/user-guide/process-engine/history.md#history-cleanup">}}">History cleanup</a> batch window start time for Mondays. Requires the same format as <code>historyCleanupBatchWindowStartTime</code>.
    In case it is not configured, batch window configured with <code>historyCleanupBatchWindowStartTime</code> and <code>historyCleanupBatchWindowEndTime</code> will be used for this day of week.
    </td>
  </tr>
  <tr>
    <td><code>mondayHistoryCleanupBatchWindowEndTime</code></td>
    <td>String</td>
    <td><a href="{{< ref "/user-guide/process-engine/history.md#history-cleanup">}}">History cleanup</a> batch window end time for Mondays. Requires the same format and follows the same logic
    as <code>historyCleanupBatchWindowEndTime</code>.
    </td>
  </tr>
  <tr>
    <td><code>tuesdayHistoryCleanupBatchWindowStartTime</code></td>
    <td>String</td>
    <td>Similar to <code>mondayHistoryCleanupBatchWindowStartTime</code>, but for Tuesdays.</td>
  </tr>
  <tr>
    <td><code>tuesdayHistoryCleanupBatchWindowEndTime</code></td>
    <td>String</td>
    <td>Similar to <code>mondayHistoryCleanupBatchWindowEndTime</code>, but for Tuesdays.</td>
  </tr>
  <tr>
    <td><code>wednesdayHistoryCleanupBatchWindowStartTime</code></td>
    <td>String</td>
    <td>Similar to <code>mondayHistoryCleanupBatchWindowStartTime</code>, but for Wednesdays.
    </td>
  </tr>
  <tr>
    <td><code>wednesdayHistoryCleanupBatchWindowEndTime</code></td>
    <td>String</td>
    <td>Similar to <code>mondayHistoryCleanupBatchWindowEndTime</code>, but for Wednesdays.
    </td>
  </tr>
  <tr>
    <td><code>thursdayHistoryCleanupBatchWindowStartTime</code></td>
    <td>String</td>
    <td>Similar to <code>mondayHistoryCleanupBatchWindowStartTime</code>, but for Thursdays.
    </td>
  </tr>
  <tr>
    <td><code>thursdayHistoryCleanupBatchWindowEndTime</code></td>
    <td>String</td>
    <td>Similar to <code>mondayHistoryCleanupBatchWindowEndTime</code>, but for Thursdays.
    </td>
  </tr>
  <tr>
    <td><code>fridayHistoryCleanupBatchWindowStartTime</code></td>
    <td>String</td>
    <td>Similar to <code>mondayHistoryCleanupBatchWindowStartTime</code>, but for Fridays.
    </td>
  </tr>
  <tr>
    <td><code>fridayHistoryCleanupBatchWindowEndTime</code></td>
    <td>String</td>
    <td>Similar to <code>mondayHistoryCleanupBatchWindowEndTime</code>, but for Fridays.
    </td>
  </tr>
  <tr>
    <td><code>saturdayHistoryCleanupBatchWindowStartTime</code></td>
    <td>String</td>
    <td>Similar to <code>mondayHistoryCleanupBatchWindowStartTime</code>, but for Saturdays.
    </td>
  </tr>
  <tr>
    <td><code>saturdayHistoryCleanupBatchWindowEndTime</code></td>
    <td>String</td>
    <td>Similar to <code>mondayHistoryCleanupBatchWindowEndTime</code>, but for Saturdays.
    </td>
  </tr>
  <tr>
    <td><code>sundayHistoryCleanupBatchWindowStartTime</code></td>
    <td>String</td>
    <td>Similar to <code>mondayHistoryCleanupBatchWindowStartTime</code>, but for Sundays.
    </td>
  </tr>
  <tr>
    <td><code>sundayHistoryCleanupBatchWindowEndTime</code></td>
    <td>String</td>
    <td>Similar to <code>mondayHistoryCleanupBatchWindowEndTime</code>, but for Sundays.
    </td>
  </tr>
  <tr>
    <td><code>historyCleanupBatchSize</code></td>
    <td>Integer</td>
    <td>Defines the amount of top-level objects (e.g., historic process instances) to be removed at once. Default and maximum value is 500.</td>
  </tr>
  <tr>
    <td><code>historyCleanupBatchThreshold</code></td>
    <td>Integer</td>
    <td>Defines the minimum amount of top-level objects required for data to be removed. Default value is 10. Hint: if the value is too small and the process
    engine continues to be used during history cleanup, it can happen that real SQL delete statements are called very frequently for small amounts of data.<br><br>
    <strong>Note:</strong> This property cannot be used in conjunction with <code>historyCleanupStrategy</code> set to <code>removalTimeBased</code>.</td>
  </tr>
  <tr>
    <td><code>historyCleanupDegreeOfParallelism</code></td>
    <td>Integer</td>
    <td>Defines the level of parallelism for history cleanup. Default value is 1 (no parallelism). Maximum allowed value is 8.</td>
  </tr>
  <tr>
    <td><code>historyCleanupMetricsEnabled</code></td>
    <td>Boolean</td>
    <td>Activates metrics for history cleanup. Default value is <code>true</code>;.</td>
  </tr>
  <tr id="history-cleanup-enabled">
    <td><code>historyCleanupEnabled</code></td>
    <td>Boolean</td>
    <td>
        Configures whether the engine participates in history cleanup or not. The default value is <code>true</code>.
        For more details, please see <a href="{{<ref "/user-guide/process-engine/history.md#cleanup-execution-participation-per-node" >}}">Cleanup Execution Participation per Node</a>
        in the User Guide.
    </td>
  </tr>
  <tr id="historytimetolive">
    <td><code>historyTimeToLive</code></td>
    <td>String</td>
    <td>Defines history time to live for process definitions if no other value is defined.
The history time to live defines the number of days using a time specified by the ISO-8601 date format. The function only accepts the notation to define a number of days.
    </td>
  </tr>
  <tr>
    <td><code>batchOperationHistoryTimeToLive</code></td>
    <td>String</td>
    <td>Defines history time to live for historic batch operations.
The history time to live defines the number of days using a time specified by the ISO-8601 date format. The function only accepts the notation to define a number of days.
    </td>
  </tr>
  <tr>
    <td><code>batchOperationsForHistoryCleanup</code></td>
    <td>Map</td>
    <td>Defines history time to live for each specific historic batch operation.
The history time to live defines the number of days using a time specified by the ISO-8601 date format. The function only accepts the notation to define a number of days.
    </td>
  </tr>
</table>

## Login parameters

<table class="table table-striped">
  <tr>
    <td><code>loginMaxAttempts</code></td>
    <td>Integer</td>
    <td>Defines the maximum number of attempts a user can try to login before this user is locked. Default value: 10
    </td>
  </tr>
  <tr>
    <td><code>loginDelayMaxTime</code></td>
    <td>Integer</td>
    <td>Defines the maximum amount of time (in seconds) for which a user must wait until they are able to try to login again. Default value: 60 seconds
    </td>
  </tr>
  <tr>
    <td><code>loginDelayFactor</code></td>
    <td>Integer</td>
    <td>Defines the factor by which the delay is calculated after an unsuccessful login attempt. Default value: 2
    </td>
  </tr>
  </tr>
  <tr>
    <td><code>loginDelayBase</code></td>
    <td>Integer</td>
    <td>Defines the base by which the delay is calculated after an unsuccessful login attempt. Default value: 3
    </td>
  </tr>
</table>

## Resource whitelist pattern parameters

<table class="table table-striped">
  <tr>
    <td><code>generalResourceWhitelistPattern</code></td>
    <td>String</td>
    <td>Defines acceptable values for the User, Group and Tenant IDs. Can be defined by using the standard <a href="https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html">Java Regular Expression syntax</a>. Default value: <code>[a-zA-Z0-9]+|camunda-admin</code></td>
  </tr>
  <tr>
    <td><code>userResourceWhitelistPattern</code></td>
    <td>String</td>
    <td>Defines acceptable values for the User IDs. Can be defined by using the standard <a href="https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html">Java Regular Expression syntax</a>. Default value: a custom general whitelist pattern or the default <code>[a-zA-Z0-9]+|camunda-admin</code> (if nothing is defined)</td>
  </tr>
  <tr>
    <td><code>groupResourceWhitelistPattern</code></td>
    <td>String</td>
    <td>Defines acceptable values for the Group IDs. Can be defined by using the standard <a href="https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html">Java Regular Expression syntax</a>. Default value: a custom general whitelist pattern or the default <code>[a-zA-Z0-9]+|camunda-admin</code> (if nothing is defined)</td>
  </tr>
  <tr>
    <td><code>tenantResourceWhitelistPattern</code></td>
    <td>String</td>
    <td>Defines acceptable values for the Tenant IDs. Can be defined by using the standard <a href="https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html">Java Regular Expression syntax</a>. Default value: a custom general whitelist pattern or the default <code>[a-zA-Z0-9]+|camunda-admin</code> (if nothing is defined)</td>
  </tr>
</table>

## Logging context parameters

These parameters define the keys at which the specified data can be retrieved from the Mapped Diagnostic Context (MDC). See [Logging]({{< ref "/user-guide/logging.md#process-data-context" >}}) for details.
The specified data will only be put into the MDC if a key is defined. All parameters can be set to <code>null</code> or the empty String in order to disable their logging in the MDC.

<table class="table table-striped">
  <tr>
    <td><code>loggingContextActivityId</code></td>
    <td>String</td>
    <td>Defines the key for the current activity id. Default value: <code>activityId</code></td>
  </tr>
  <tr>
    <td><code>loggingContextApplicationName</code></td>
    <td>String</td>
    <td>Defines the key for the current process application name. Default value: <code>applicationName</code></td>
  </tr>
  <tr>
    <td><code>loggingContextBusinessKey</code></td>
    <td>String</td>
    <td>Defines the key for the current business key. Default value: <code>null</code> (disabled by default since a lookup into the database might be necessary 
	in case the business key needs to be fetched from the process instance)</td>
  </tr>
  <tr>
    <td><code>loggingContextProcessDefinitionId</code></td>
    <td>String</td>
    <td>Defines the key for the current process definition id. Default value: <code>processDefinitionId</code></td>
  </tr>
  <tr>
    <td><code>loggingContextProcessInstanceId</code></td>
    <td>String</td>
    <td>Defines the key for the current process instance id. Default value: <code>processInstanceId</code></td>
  </tr>
  <tr>
    <td><code>loggingContextTenantId</code></td>
    <td>String</td>
    <td>Defines the key for the current tenant id. Default value: <code>tenantId</code></td>
  </tr>
</table>
