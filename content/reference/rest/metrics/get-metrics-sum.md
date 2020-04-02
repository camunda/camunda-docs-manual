---

title: "Get Sum"
weight: 10

menu:
  main:
    identifier: "rest-api-metrics-get-metrics-sum"
    parent: "rest-api-metrics"
    pre: "GET `/metrics/{metrics-name}/sum`"

---

Retrieves the `sum` (count) for a given metric.

# Method

GET `/metrics/{metrics-name}/sum`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>metrics-name</td>
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
      <code>executed-decision-elements</code>,
      <code>history-cleanup-removed-process-instances</code>,
      <code>history-cleanup-removed-case-instances</code>,
      <code>history-cleanup-removed-decision-instances</code>
      <code>history-cleanup-removed-batch-operations</code>
    </td>
  </tr>
</table>

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>startDate</td>
    <td>The start date</td>
  </tr>
  <tr>
    <td>endDate</td>
    <td>The end date</td>
  </tr>
</table>


# Result

A JSON object providing the result:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>result</td>
    <td>Number</td>
    <td>The current sum (count) for the selected metric.</td>
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
</table>


# Example

## Request

GET `/metrics/activity-instance-end/sum?startDate=2015-01-01T00:00:00.000%2b0200`

## Response

    { "result": 4342343241 }

