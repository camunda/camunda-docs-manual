---

title: 'Metrics'
weight: 205

menu:
  main:
    identifier: "user-guide-process-engine-metrics"
    parent: "user-guide-process-engine"

---

The process engine reports runtime metrics to the database that can help draw conclusions about usage, load, and performance of the BPM platform. Metrics are reported in the database table `ACT_RU_METER_LOG` as natural numbers in the Java `long` range and count the occurrence of specific events. Single metric entries consist of a metric identifier, a value that the metric took in a certain timespan and a name identifying the metric reporter. There is a set of built-in metrics that are reported by default.

# Built-in Metrics

The following table describes the built-in metrics. The identifiers of all built-in metrics are available as constants of the class {{< javadocref page="?org/camunda/bpm/engine/management/Metrics.html" text="org.camunda.bpm.engine.management.Metrics" >}}.

<table class="table table-striped">
  <tr>
    <th>Category</th>
    <th>Identifier</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><b>BPMN Execution</b></td>
    <td>root-process-instance-start</td>
    <td>The number of root process instance executions started. This is also known as <b>Root Process Instances (RPI)</b>.
    A root process instance has no parent process instance, i.e. it is a top-level execution.
    </td>
  </tr>
  <tr>
    <td></td>
    <td>activity-instance-start</td>
    <td>The number of activity instances started. This is also known as <b>flow node instances (FNI)</b>.</td>
  </tr>
  <tr>
    <td></td>
    <td>activity-instance-end</td>
    <td>The number of activity instances ended.</td>
  </tr>
  <tr>
    <td><b>DMN Execution</b></td>
    <td>executed-decision-instances</td>
    <td>The number of evaluated decision instances (EDI). A decision instance is a DMN decision table or a DMN Literal Expression.</td>
  </tr>
  <tr>
    <td></td>
    <td>executed-decision-elements</td>
    <td>The number of decision elements executed during evaluation of DMN decision tables. For one table, this is calculated as the number of clauses multiplied by the number of rules.</td>
  </tr>
  <tr>
    <td><b>Job Executor</b></td>
    <td>job-successful</td>
    <td>The number of jobs successfully executed.</td>
  </tr>
  <tr>
    <td></td>
    <td>job-failed</td>
    <td>The number of jobs that failed to execute and that were submitted for retry. Every failed attempt to execute a job is counted.</td>
  </tr>
  <tr>
    <td></td>
    <td>job-acquisition-attempt</td>
    <td>The number of job acquisition cycles performed.</td>
  </tr>
  <tr>
    <td></td>
    <td>job-acquired-success</td>
    <td>The number of jobs that were acquired and successfully locked for execution.</td>
  </tr>
  <tr>
    <td></td>
    <td>job-acquired-failure</td>
    <td>The number of jobs that were acquired but could not be locked for execution due to another job executor locking/executing the jobs in parallel.</td>
  </tr>
  <tr>
    <td></td>
    <td>job-execution-rejected</td>
    <td>The number of successfully acquired jobs submitted for execution that were rejected due to saturated execution resources. This is an indicator that the execution thread pool's job queue is full.</td>
  </tr>
  <tr>
    <td></td>
    <td>job-locked-exclusive</td>
    <td>The number of exclusive jobs that are immediately locked and executed.</td>
  </tr>
  <tr>
    <td><b>History Clean up</b></td>
    <td>history-cleanup-removed-process-instances</td>
    <td>The number of process instances removed by history clean up.</td>
  </tr>
  <tr>
    <td></td>
    <td>history-cleanup-removed-case-instances</td>
    <td>The number of case instances removed by history clean up.</td>
  </tr>
  <tr>
    <td></td>
    <td>history-cleanup-removed-decision-instances</td>
    <td>The number of decision instances removed by history clean up.</td>
  </tr>
  <tr>
    <td></td>
    <td>history-cleanup-removed-batch-operations</td>
    <td>The number of batch operations removed by history clean up.</td>
  </tr>
</table>

# Querying

Metrics can be queried by making a {{< javadocref page="?org/camunda/bpm/engine/management/MetricsQuery.html" text="MetricsQuery" >}} offered by the `ManagementService`. For example, the following query retrieves the number of all executed activity instances throughout the entire history of reporting:

```java
long numCompletedActivityInstances = managementService
  .createMetricsQuery()
  .name(Metrics.ACTIVTY_INSTANCE_START)
  .sum();
```

The metrics query offers filters `#startDate(Date date)` and `#endDate(Date date)` to restrict the collected metrics to a certain timespan. In addition, by using the filter `#reporter(String reporterId)` the results can be restricted to metrics collected by a specific reporter. This option can be useful when configuring more than one engine against the same database, for example in a cluster setup.

# Configuration

## Metrics Reporter

The process engine flushes the collected metrics to the runtime database tables in an interval of 15 minutes. The behavior of metrics reporting can be changed by replacing the `dbMetricsReporter` instance of the process engine configuration. For example, to change the reporting interval, a process engine plugin replacing the reporter can be employed:

```java
public class MetricsConfigurationPlugin implements ProcessEnginePlugin {

  public void preInit(ProcessEngineConfigurationImpl processEngineConfiguration) {
  }

  public void postInit(ProcessEngineConfigurationImpl processEngineConfiguration) {
    DbMetricsReporter metricsReporter = new DbMetricsReporter(processEngineConfiguration.getMetricsRegistry(),
        processEngineConfiguration.getCommandExecutorTxRequired());
    metricsReporter.setReportingIntervalInSeconds(5);

    processEngineConfiguration.setDbMetricsReporter(metricsReporter);
  }

  public void postProcessEngineBuild(ProcessEngine processEngine) {
  }

}
```

## Reporter Identifier

Metrics are reported with an identifier of the reporting party. This identifier allows to attribute 
reports to individual engine instances when making a metrics query. For example in a cluster, load 
metrics can be related to individual cluster nodes. By default the process engine generates a 
reporter id as `<local IP>$<engine name>`. The generation can be customized by implementing the 
interface {{< javadocref page="?org/camunda/bpm/engine/impl/history/event/HostnameProvider.html" text="org.camunda.bpm.engine.impl.history.event.HostnameProvider" >}}
and setting the engine property `hostnameProvider` to an instance of that class.

{{< note title="Heads Up!" class="info" >}}
The 
{{< javadocref page="?org/camunda/bpm/engine/impl/metrics/MetricsReporterIdProvider.html" text="org.camunda.bpm.engine.impl.metrics.MetricsReporterIdProvider" >}}
interface and the corresponding `metricsReporterIdProvider` engine property have been deprecated. 
{{< /note >}}

## Disable Reporting

By default, all built-in metrics are reported. For the configuration via XML file (e.g. standalone.xml or bpm-platform.xml) you can disable reporting by adding the property:
```xml
<property name="metricsEnabled">false</property>
```

If you are directly accessing the Java API, you can disable the metrics reporting by using the engine configuration flag `isMetricsEnabled` and set it to `false`.
