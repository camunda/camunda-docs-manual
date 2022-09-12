---

title: "Get Metrics in Interval"
weight: 10

menu:
  main:
    identifier: "rest-api-metrics-get-metrics-interval"
    parent: "rest-api-metrics"
    pre: "GET `/metrics`"

---

Retrieves a list of metrics, aggregated for a given interval.

# Method

GET `/metrics`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>name</td>
    <td>The name of the metric. Supported names:
      <ul>
        <li>activity-instance-start (flow-node-instances)</li>
        <li>activity-instance-end</li>
        <li>flow-node-instances</li>
        <li>job-acquisition-attempt</li>
        <li>job-acquired-success</li>
        <li>job-acquired-failure</li>
        <li>job-execution-rejected</li>
        <li>job-successful</li>
        <li>job-failed</li>
        <li>job-locked-exclusive</li>
        <li>executed-decision-elements</li>
        <li>executed-decision-instances (decision-instances)</li>
        <li>decision-instances</li>
        <li>history-cleanup-removed-process-instances</li>
        <li>history-cleanup-removed-case-instances</li>
        <li>history-cleanup-removed-decision-instances</li>
        <li>history-cleanup-removed-batch-operations</li>
        <li>history-cleanup-removed-task-metrics</li>
        <li>process-instances</li>
        <li>root-process-instance-start (process-instances)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>reporter</td>
    <td>The name of the reporter (host), on which the metrics was logged. This will have value
     provided by the <a href="{{< ref "/reference/deployment-descriptors/tags/process-engine.md#hostname" >}}">configuration property</a>.
    </td>
  </tr>
  <tr>
    <td>startDate</td>
    <td>The start date (inclusive).</td>
  </tr>
  <tr>
    <td>endDate</td>
    <td>The end date (exclusive).</td>
  </tr>
  <tr>
    <td>firstResult</td>
    <td>The index of the first result, used for paging.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>The maximum result size of the list which should be returned. The maxResults can't be set larger than 200. Default: 200</td>
  </tr>
  <tr>
    <td>interval</td>
    <td>The interval for which the metrics should be aggregated. Time unit is seconds. 
        Default: The interval is set to 15 minutes (900 seconds).</td>
  </tr>
  <tr>
    <td>aggregateByReporter</td>
    <td>Aggregate metrics by reporter.</td>
  </tr>
</table>

# Result

A JSON array of aggregated metrics. Each aggregated metric has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>timestamp</td>
    <td>Date</td>
    <td>The interval timestamp.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the metric.</td>
  </tr>
  <tr>
    <td>reporter</td>
    <td>String</td>
    <td>The reporter of the metric. <code>null</code> if the metrics are aggregated by reporter.</td>
  </tr>
  <tr>
    <td>value</td>
    <td>Number</td>
    <td>The value of the metric aggregated by the interval.</td>
  </tr>
</table>


# Response Codes


<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the query parameters are invalid.</td>
  </tr>
</table>


# Example

## Request

GET `/metrics?name=activity-instance-end&startDate=1970-01-01T01:45:00.000%2b0200&endDate=1970-01-01T02:00:00.000%2b0200`

## Response

    [
      {
        "timestamp":"1970-01-01T01:45:00.000+0200",
        "name":"activity-instance-end",
        "reporter":"REPORTER",
        "value":23
      }
    ]
