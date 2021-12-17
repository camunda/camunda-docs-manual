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
      <ul>
        <li>flow-node-instances-start</li>
        <li>flow-node-instances-end</li>
        <li>job-acquisition-attempt</li>
        <li>job-acquired-success</li>
        <li>job-acquired-failure</li>
        <li>job-execution-rejected</li>
        <li>job-successful</li>
        <li>job-failed</li>
        <li>job-locked-exclusive</li>
        <li>executed-decision-elements</li>
        <li>decision-instances</li>
        <li>history-cleanup-removed-process-instances</li>
        <li>history-cleanup-removed-case-instances</li>
        <li>history-cleanup-removed-decision-instances</li>
        <li>history-cleanup-removed-batch-operations</li>
        <li>history-cleanup-removed-task-metrics</li>
        <li>process-instances</li>
        <li>task-users</li>
      </ul>
      Supported legacy names:
      <ul>
        <li>activity-instance-start (flow-node-instances-start)</li>
        <li>activity-instance-end (flow-node-instances-end)</li>
        <li>executed-decision-instances (decision-instances)</li>
        <li>root-process-instance-start (process-instances)</li>
        <li>unique-task-workers (task-users)</li>
      </ul>
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
    <th>Type</th>
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
