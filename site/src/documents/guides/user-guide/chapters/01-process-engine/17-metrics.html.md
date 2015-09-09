---

title: 'Metrics'
category: 'Process Engine'

---

The process engine reports runtime metrics to the database that can help with drawing conclusions about usage, load, and performance of the BPM platform. Metrics are reported in the database table `ACT_RU_METER_LOG` as natural numbers in the Java `long` range and count the occurrence of specific events. Single metric entries consists of a metric identifier, a value that the metric took in a certain timespan, and a name identifying the metric reporter. There is a set of built-in metrics that are reported by default.

# Built-in Metrics

The following table describes the built-in metrics. The identifiers of all built-in metrics are available as constants of the class [org.camunda.bpm.engine.management.Metrics](/reference/javadoc/org/camunda/bpm/engine/management/Metrics.html).

<table class="table table-striped">
  <tr>
    <th>Category</th>
    <th>Identifier</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><b>BPMN Execution</b></td>
    <td>activity-instance-start</td>
    <td>The number of activity instances started.</td>
  </tr>
</table>

# Querying

Metrics can be queried by making a [MetricsQuery](/reference/javadoc/org/camunda/bpm/engine/management/MetricsQuery.html) offered by the `ManagementService`. For example, the following query retrieves the number of all executed activity instances throughout the entire history of reporting:

```java
long numCompletedActivityInstances = managementService
  .createMetricsQuery()
  .name(Metrics.ACTIVTY_INSTANCE_START)
  .sum();
```

The metrics query offers filters `#startDate(Date date)` and `#endDate(Date date)` to restrict the collected metrics to a certain timespan.

# Configuration

## Metrics Reporter

The process engine flushes the collected metrics to the runtime database tables in an interval of 15 minutes. The behavior of metrics reporting can be changed by replacing the `dbMetricsReporter` instance of the process engine configuration. For example, to change the reporting interval a process engine plugin replacing the reporter can be employed:

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

## Disable Reporting

By default, all built-in metrics are reported. Using the engine configuration flag `isMetricsEnabled` metrics reporting can be disabled.