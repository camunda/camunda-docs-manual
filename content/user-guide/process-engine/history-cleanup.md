---

title: 'History cleanup'
weight: 280

menu:
  main:
    identifier: "user-guide-process-engine-history-celanup"
    parent: "user-guide-process-engine"

---

When used intensively process engine can produce huge amount of history data. History cleanup functionality helps to regularly remove "outdated" 
data from history tables. Though intended to be used on regular basis, it can as well be used to one-run "manual" cleanup.

## Batch window
To use history cleanup on regular basis batch window must be configured - the period of time during the day when the cleanup job must be run. 
See [Configuration options][configuration-options] for details.

## Time to live
You must also specify "time to live" for each process definition which you wish to be affected by cleanup. "Time to live" means the amount of time to pass after 
the process instance has finished, before its history will be removed from database.

Time to live is currently fixed to 5 days for all process definitions. (will be configurable after CAM-7542)

## Run cleanup manually
When you want to run cleanup only once then just use:
```java
processEngine.getHistoryService().cleanUpHistoryAsync();
```
Also available via [REST API]({{< relref "reference/rest/history/post-history-cleanup.md">}}).

# How it works inside?

History cleanup is implemented as a job. The cleanup job runs in background each day at batch window time or at once when called manually from REST API. 
It removes all history data for process instances that were finished "time to live" days ago. The data is removed in batches, batch size can be configured 
(See [Configuration options][configuration-options]). The job won't remove the data if its quantity is less than threshold 
(See [Configuration options][configuration-options]). Only top-level objects (e.g. historic process instances) are being counted when finding 
batch of data to be deleted.

In case when job can't find anything to delete (or not enough data to overpass the threshold), it will be rescheduled to the later time until 
it reaches the end time of batch window. The delay between such runs increases twice each time unless it reaches maximum value (1 hour).

# What happens in case of failure?

If the job execution fails for some reason, execution will be retried several time similar to any other job. When still failing after several retires, 
the incident will be created. After this the job won't be triggered unless history cleanup is called via API again 
(or on engine restart after CAM-7541). When the incident is resolved, just call the history cleanup as described above.

# How to monitor job progress?

History cleanup is performed within one and the same job that runs several times. This job has unique id which can be found in response of history cleanup call. 
This `jobId` can be used to request job logs:
```java
List<HistoricJobLog> historicJobLogs = processEngine.getHistoryService()
        .createHistoricJobLogQuery().jobId(jobId).list();
```

You can also check incidents and historic incidents, `jobId` is stored in `configuration` field of the incident:
```java
List<Incident> incidents = engineRule.getRuntimeService()
        .createIncidentQuery().configuration(jobId).list();

List<HistoricIncident> historicIncidents = engineRule.getHistoryService()
        .createHistoricIncidentQuery().configuration(jobId).list();
```

# Configuration options

<table class="table table-striped">
  <tr>
    <th>Process engine configuration parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>batchWindowStartTime</td>
    <td>Batch window start time in the format `HH:mm`. E.g. `20:00`. In case of `null`, no batch window is considered to be configured 
    and history cleanup can be called only manually.</td>
  </tr>
  <tr>
    <td>batchWindowEndTime</td>
    <td>Batch window end time in the format `HH:mm`. E.g. `23:00`. In case when batchWindowEndTime exceeds batchWindowStartTime it is considered 
    to be in the same date (e.g. history runs each day between 20:00 and 23:00). Otherwise it is considered to be in the next calendar day (e.g. history starts each 
    day at 20:00 and finishes next day at 01:00).</td>
  </tr>
  <tr>
    <td>historyCleanupBatchSize</td>
    <td>Defines the quantity of top-level objects (e.g. historic process instances) to be removed at once. Default and maximum value is 500. 
    When the configured value exceeds maximum, maximum value is used implicitely.</td>
  </tr>
  <tr>
    <td>historyCleanupBatchThreshold</td>
    <td>Defines the minimal quantity of top-level objects required for data to be removed. Default value is 10. Hint: if the value is too small 
    and process engine continues to be used during history cleanup, it can happen that real SQL deletes will be called very frequiently for small amounts of data.</td>
  </tr>
</table>

[configuration-options]: #configuration-options