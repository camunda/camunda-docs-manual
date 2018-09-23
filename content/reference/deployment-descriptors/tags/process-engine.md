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


The process engine configuration can be placed in both [processes.xml]({{< relref "reference/deployment-descriptors/descriptors/processes-xml.md" >}}) and the [bpm-platform.xml]({{< relref "reference/deployment-descriptors/descriptors/bpm-platform-xml.md" >}}) files. If the process engine is configured in either or both of those files, it will be bootstrapped by the Camunda BPM platform infrastructure and be made available through `BpmPlatform.getProcessEngineService().getProcessEngine("name of process engine")`.


# Example

The following example shows an XML snippet which can be placed in both [processes.xml]({{< relref "reference/deployment-descriptors/descriptors/processes-xml.md" >}}) and/or [bpm-platform.xml]({{< relref "reference/deployment-descriptors/descriptors/bpm-platform-xml.md" >}}).

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
        The name of the job acquisition to be used for this process engine. Job acquisitions are configured in the <a href="{{< relref "reference/deployment-descriptors/descriptors/bpm-platform-xml.md" >}}">bpm-platform.xml</a> file.
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
        Container element for providing a set of <a href="{{< relref "user-guide/process-engine/process-engine-plugins.md" >}}">process engine plugin</a> configurations.
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
        Container element for providing an individual <a href="{{< relref "user-guide/process-engine/process-engine-plugins.md" >}}">process engine plugin</a> configuration.
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
        Sets the classname of a <a href="{{< relref "user-guide/process-engine/process-engine-plugins.md" >}}">process engine plugin</a>.
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
    <td>Activates <a href="{{< relref "user-guide/process-engine/authorization-service.md#enable-authorization-checks ">}}">authorization checks</a>.</td>
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
        Sets the value for process engine <a href="{{< relref "user-guide/process-engine/database.md#database-configuration">}}">database schema creation</a>.
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
        Set the default <a href="{{< relref "process-engine/authorization-service/#default-task-permissions">}}">permisson to work on a task</a>. Allowed values are <code>UPDATE</code> or <code>TASK_WORK</code>. Default value: <code>UPDATE</code>.
    </td>
  </tr>

  <tr>
    <td><code>enableExceptionsAfterUnhandledBpmnError</code></td>
    <td>Boolean</td>
    <td>
        If set to <code>true</code>, Process Engine Exception is thrown when <a href="{{< relref "reference/bpmn20/events/error-events.md#unhandled-bpmn-error">}}">unhandled BPMN Error</a> occurs. Default value: <code>false</code>
      <p>
        <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
      </p>
    </td>
  </tr>

  <tr>
    <td><code>enableExpressionsInAdhocQueries</code></td>
    <td>Boolean</td>
    <td>
      If set to <code>true</code>, expressions can be used when creating and executing adhoc queries. For details, see the section on <a href="{{< relref "user-guide/process-engine/securing-custom-code.md">}}">security considerations for custom code</a> in the user guide.
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
      If set to <code>true</code>, expressions can be used when creating and executing stored queries. For details, see the section on <a href="{{< relref "user-guide/process-engine/securing-custom-code.md">}}">security considerations for custom code</a> in the user guide.
      Default value is <code>true</code>.
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
     Sets how often a job is retried after a fail and how long the engine should wait until it tries to execute a job again. See the <a href="{{< relref "user-guide/process-engine/the-job-executor.md#retry-time-cycle-configuration" >}}">user guide</a>
        for more details on this setting.
    </td>
  </tr>

  <tr>
    <td><code>history</code></td>
    <td>String</td>
    <td>
        Sets the <a href="{{< relref "user-guide/process-engine/history.md#choose-a-history-level">}}">level of the process engine history</a>.
      <p>
        <strong>Values:</strong> <code>none</code>, <code>activity</code>, <code>audit</code>, <code>full</code>.
      </p>
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
        Default is <code><strong>true</strong></code>, but this has to be disabled for some databases. See <a href="{{<relref "user-guide/process-engine/database.md#jdbc-batch-processing" >}}">the user guide</a> for further details.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>jobExecutorAcquireByDueDate</code></td>
    <td>Boolean</td>
    <td>
        Controls whether the job executor acquires the next jobs to execute ordered by due date. Default value is <code>false</code>. See the
        <a href="{{< relref "user-guide/process-engine/the-job-executor.md#the-job-order-of-job-acquisition" >}}">user guide</a>
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
        <a href="{{< relref "user-guide/process-engine/the-job-executor.md#job-executor-activation" >}}">user guide</a>
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
        <a href="{{< relref "user-guide/process-engine/the-job-executor.md#the-job-order-of-job-acquisition" >}}">user guide</a>
        for more details on this setting.
      <p>
        <strong>Values:</strong> <code>true</code>, <code>false</code> (Boolean).
      </p>
  </td>
  <tr id="skipHistoryOptimisticLockingExceptions">
    <td><code>skipHistoryOptimisticLockingExceptions</code></td>
    <td>Boolean</td>
    <td>
        Controls if the engine will throw <a href="{{< relref "user-guide/process-engine/transactions-in-processes.md#optimistic-locking-in-camunda" >}}">OptimisticLockingException</a>s on UPDATE or DELETE operations for historical data or not.
      <p>
        The default is <code><strong>true</strong></code>. To preserve the previous behavior (≤ 7.9), the flag must be set to <code><strong>false</strong></code>.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>tenantCheckEnabled</code></td>
    <td>Boolean</td>
    <td>
        Controls whether the process engine performs tenant checks to ensure that an authenticated user can only access data that belongs to one of his tenants. Default value is <code>true</code>.
        See the <a href="{{< relref "user-guide/process-engine/multi-tenancy.md#single-process-engine-with-tenant-identifiers" >}}">user guide</a> for more details.
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
        See the <a href="{{< relref "user-guide/process-engine/batch.md#job-definitions" >}}">
        user guide</a> for more information on batch execution.
        Default value: <code>100</code>
    </td>
  </tr>

  <tr>
    <td><code>invocationsPerBatchJob</code></td>
    <td>Integer</td>
    <td>
        Sets the number of invocations a single batch execution job executes.
        See the <a href="{{< relref "user-guide/process-engine/batch.md#job-definitions" >}}">
        user guide</a> for more information on batch execution.
        Default value: <code>1</code>
    </td>
  </tr>

  <tr>
    <td><code>batchPollTime</code></td>
    <td>Integer</td>
    <td>
        Sets the poll interval of the batch monitor job to check for batch
        completion in seconds.
        See the <a href="{{< relref "user-guide/process-engine/batch.md#job-definitions" >}}">
        user guide</a> for more information on batch execution.
        Default value: <code>30</code>
    </td>
  </tr>

  <tr>
    <td><code>batchJobPriority</code></td>
    <td>Integer</td>
    <td>
        Sets the default batch job priority.
        See the <a href="{{< relref "user-guide/process-engine/the-job-executor.md#job-prioritization" >}}">
        user guide</a> for more information on job prioritization.
        Default value: <code>0</code>
    </td>
  </tr>

  <tr>
    <td><code>deploymentLockUsed</code></td>
    <td>Boolean</td>
    <td>
        Sets if the process engine must acquire an <a href="{{< relref "user-guide/process-engine/deployments.md#deployments-in-a-clustered-scenario" >}}">exclusive lock when creating a deployment</a>.
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
        Sets if Java serialization format can be used, when <a href="{{< relref "user-guide/process-engine/variables.md#object-values">}}">setting variables by their serialized representation</a>. Default value: <code>false</code>
    </td>
  </tr>

</table>

## History cleanup configuration parameters

<table class="table table-striped">
  <tr>
    <td><code>hierarchicalHistoryCleanup</code></td>
    <td>Boolean</td>
    <td><a href="{{< relref "user-guide/process-engine/history.md#internal-implementation">}}">History cleanup implementation</a> flag to determine which mechanism is to be used when performing cleanup. In case of <code>true</code> (default), the Hierarchical History cleanup implementation is used.</td>
  </tr>
  <tr>
    <td><code>historyCleanupBatchWindowStartTime</code></td>
    <td>String</td>
    <td><a href="{{< relref "user-guide/process-engine/history.md#history-cleanup">}}">History cleanup</a> batch window start time in the format <code>HH:mmZ</code> (Z is for RFC 822 time zone) or <code>HH:mm</code>. E.g., <code>20:00+0100</code> or <code>20:00</code>. In case of <code>null</code>, no batch window is considered to be configured 
    and history cleanup can only be called manually.</td>
  </tr>
  <tr>
    <td><code>historyCleanupBatchWindowEndTime</code></td>
    <td>String</td>
    <td><a href="{{< relref "user-guide/process-engine/history.md#history-cleanup">}}">History cleanup</a> batch window end time in the format <code>HH:mmZ</code> (Z is for RFC 822 time zone) or <code>HH:mm</code>. E.g., <code>23:00-0300</code> or <code>23:00</code>. In case <code>batchWindowEndTime</code> exceeds <code>batchWindowStartTime</code> it is considered 
    to be on the same date (e.g., cleanup runs each day between 20:00 and 23:00). Otherwise it is considered to be on the next calendar day (e.g., cleanup starts each 
    day at 20:00 and finishes the next day at 01:00). Default value is `00:00`.</td>
  </tr>
  <tr>
    <td><code>mondayHistoryCleanupBatchWindowStartTime</code></td>
    <td>String</td>
    <td><a href="{{< relref "user-guide/process-engine/history.md#history-cleanup">}}">History cleanup</a> batch window start time for Mondays. Requires the same format as <code>historyCleanupBatchWindowStartTime</code>.
    In case it is not configured, batch window configured with <code>historyCleanupBatchWindowStartTime</code> and <code>historyCleanupBatchWindowEndTime</code> will be used for this day of week.
    </td>
  </tr>
  <tr>
    <td><code>mondayHistoryCleanupBatchWindowEndTime</code></td>
    <td>String</td>
    <td><a href="{{< relref "user-guide/process-engine/history.md#history-cleanup">}}">History cleanup</a> batch window end time for Mondays. Requires the same format and follows the same logic 
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
    engine continues to be used during history cleanup, it can happen that real SQL delete statements are called very frequently for small amounts of data.</td>
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