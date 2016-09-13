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
      <code>activity-instance-start</code>,
      <code>activity-instance-end</code>,
      <code>job-acquisition-attempt</code>,
      <code>job-acquired-success</code>,
      <code>job-acquired-failure</code>,
      <code>job-execution-rejected</code>,
      <code>job-successful</code>,
      <code>job-failed</code>,
      <code>job-locked-exclusive</code>,
      <code>executed-decision-elements</code>
    </td>
  </tr>
  <tr>
    <td>reporter</td>
    <td>The name of the reporter (host), on which the metrics was logged.</td>
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
</table>

# Result

A JSON array of aggregated metrics. Each aggregated metric has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
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
    <td>The reporter of the metric.</td>
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

GET `/metrics?name=activity-instance-end&startDate='1970-01-01 01:45:00'&endDate='1970-01-01 02:00:00'`

## Response

    [
      {
        "timestamp":"1970-01-01T01:45:00",
        "name":"activity-instance-end",
        "reporter":"REPORTER",
        "value":23
      }
    ]
