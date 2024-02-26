---

title: 'Metrics'
weight: 205

menu:
  main:
    identifier: "user-guide-process-engine-metrics"
    parent: "user-guide-process-engine"

---

The process engine reports runtime metrics to the database that can help draw conclusions about usage, load, and performance of Camunda 7. Metrics are reported in the database tables `ACT_RU_METER_LOG` and `ACT_RU_TASK_METER_LOG`. Single metric entries in `ACT_RU_METER_LOG` consist of a metric identifier, a value as natural number in the Java `long` range that the metric took in a certain timespan and a name identifying the metric reporter. Task metric entries in `ACT_RU_TASK_METER_LOG` comprise a fixed-length, pseudonymized assignee value and the point in time it was assigned at. There is a set of built-in metrics that are reported by default.

# Built-in Metrics

The following table describes the built-in metrics. The identifiers of all built-in metrics are available as constants of the class {{< javadocref page="org/camunda/bpm/engine/management/Metrics.html" text="org.camunda.bpm.engine.management.Metrics" >}}.
{{< note title="Heads Up!" class="warning" >}}
If you are an enterprise customer, your license agreement might require you to report some metrics annually. Please store `root-process-instance-start`, `activity-instance-start`, `executed-decision-instances` and `executed-decision-elements` metrics from `ACT_RU_METER_LOG` as well as task metrics from `ACT_RU_TASK_METER_LOG` for at least 18 months until they were reported.
{{< /note >}}

<table class="table table-striped">
  <tr>
    <th>Category</th>
    <th>Identifier</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><b>BPMN Execution</b></td>
    <td>root-process-instance-start*</td>
    <td>The number of root process instance executions started. This is also known as <b>Process Instances (PI)</b>.
    A root process instance has no parent process instance, i.e. it is a top-level execution.
    </td>
  </tr>
  <tr>
    <td></td>
    <td>activity-instance-start*</td>
    <td>The number of flow node instances (activity instances) started (FNI).</td>
  </tr>
  <tr>
    <td></td>
    <td>activity-instance-end</td>
    <td>The number of flow node instances (activity instances) ended.</td>
  </tr>
  <tr>
    <td><b>DMN Execution</b></td>
    <td>executed-decision-instances*</td>
    <td>The number of evaluated decision instances (DI). A decision instance is a DMN decision table or a DMN Literal Expression.</td>
  </tr>
  <tr>
    <td></td>
    <td>executed-decision-elements*</td>
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
    <td><b>Task Metrics</b></td>
    <td>unique-task-workers*</td>
    <td>The number of task users (TU) that have served as assignees.</td>
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
  <tr>
    <td></td>
    <td>history-cleanup-removed-task-metrics</td>
    <td>The number of task metrics removed by history clean up.</td>
  </tr>
</table>

*Some enterprise agreements require annual reports of some metrics. Please store those metrics for at least 18 months.

# Querying

Metrics can be queried by making a {{< javadocref page="org/camunda/bpm/engine/management/MetricsQuery.html" text="MetricsQuery" >}} offered by the `ManagementService`. For example, the following query retrieves the number of all executed activity instances throughout the entire history of reporting:

```java
long numCompletedActivityInstances = managementService
  .createMetricsQuery()
  .name(Metrics.ACTIVTY_INSTANCE_START)
  .sum();
```

The metrics query offers filters `#startDate(Date date)` and `#endDate(Date date)` to restrict the collected metrics to a certain timespan. In addition, by using the filter `#reporter(String reporterId)` the results can be restricted to metrics collected by a specific reporter. This option can be useful when configuring more than one engine against the same database, for example in a cluster setup.

Task metrics can be queried by using the `getUniqueTaskWorkerCount` method offered by the `ManagementService`. This method accepts optional `Date` values for `startTime` and `endTime` to restrict the metric to a certain timespan. For example, the following statement retrieves the number of all unique task workers until now:

```java
long numUniqueTaskWorkers = managementService.getUniqueTaskWorkerCount(null, null);
```

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

{{< note title="Note" class="info" >}}
Task metric entries are created on every assignment of a user task. This behavior cannot be modified and is not in the responsibility of the metrics reporter.
{{< /note >}}

## Reporter Identifier

Metrics are reported with an identifier of the reporting party. This identifier allows to attribute 
reports to individual engine instances when making a metrics query. For example in a cluster, load 
metrics can be related to individual cluster nodes. By default the process engine generates a 
reporter id as `<local IP>$<engine name>`. The generation can be customized by implementing the 
interface {{< javadocref page="org/camunda/bpm/engine/impl/history/event/HostnameProvider.html" text="org.camunda.bpm.engine.impl.history.event.HostnameProvider" >}}
and setting the engine property `hostnameProvider` to an instance of that class.

{{< note title="Heads Up!" class="info" >}}
The 
{{< javadocref page="org/camunda/bpm/engine/impl/metrics/MetricsReporterIdProvider.html" text="org.camunda.bpm.engine.impl.metrics.MetricsReporterIdProvider" >}}
interface and the corresponding `metricsReporterIdProvider` engine property have been deprecated. 
{{< /note >}}

## Disable Reporting

By default, all built-in metrics are reported. For the configuration via XML file (e.g. standalone.xml or bpm-platform.xml) you can disable reporting by adding the properties:
```xml
<property name="metricsEnabled">false</property>
<property name="taskMetricsEnabled">false</property>
```

If you are directly accessing the Java API, you can disable the metrics reporting by using the engine configuration flags `isMetricsEnabled` and `isTaskMetricsEnabled` and set them to `false`.
