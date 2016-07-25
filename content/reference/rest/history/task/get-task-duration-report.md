---

title: "Get Task Duration Report (Historic)"
weight: 60

menu:
  main:
    name: "Get Task Duration Report"
    identifier: "rest-api-history-get-task-duration-report"
    parent: "rest-api-history-task"
    pre: "GET `/history/task/report/duration`"

---

Query for a historic task duration report.


# Method

GET `/history/task/report/duration`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>reportType</td>
    <td><b>Mandatory.</b> Specifies the kind of the report to execute. In order to retrieve a report about the duration of process instances the value must be set to <code>duration</code>.</td>
  </tr>
  <tr>
    <td>periodUnit</td>
    <td><b>Mandatory.</b> Specifies the granularity of the report. Valid values are <code>month</code> and <code>quarter</code>.</td>
  </tr>
  <tr>
    <td>completedBefore</td>
    <td>Restrict to tasks that were completet before the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>completedAfter</td>
    <td>Restrict to tasks that were completet after the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>periodUnit</td>
    <td>Groups the tasks report by a given criterion. Valid values are <code>taskDefinition</code> and <code>processDefinition</code>. The default value is <code>taskDefinition</code>.</td>
  </tr>
</table>


# Result

A JSON array of duration report result objects.
Each object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>period</td>
    <td>Number</td>
    <td>Specifies a span of time within a year.<br>
        <b>Note:</b> The period must be interpreted in conjunction with the returned <code>periodUnit</code>.</td>
  </tr>
  <tr>
    <td>periodUnit</td>
    <td>String</td>
    <td>The unit of the given period. Possible values are <code>MONTH</code> and <code>QUARTER</code>.</td>
  </tr>
  <tr>
    <td>maximum</td>
    <td>Number</td>
    <td>The greatest duration in milliseconds of all completed task instances, which have been completed in the given period.</td>
  </tr>
  <tr>
    <td>minimum</td>
    <td>Number</td>
    <td>The smallest duration in milliseconds of all completed task instances, which have been completed in the given period.</td>
  </tr>
  <tr>
    <td>average</td>
    <td>Number</td>
    <td>The average duration in milliseconds of all completed task instances, which have been completed in the given period.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>completedAfter</code> parameter is supplied, but the dateformat is wrong. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/history/task/report/duration?reportType=duration&periodUnit=quarter`

## Response

```json
[
  {
    "period": 1,
    "periodUnit": "QUARTER",
    "maximum": 500000,
    "minimum": 250000,
    "average": 375000
  },
  {
    "period": 2,
    "periodUnit": "QUARTER",
    "maximum": 600000,
    "minimum": 300000,
    "average": 450000
  },
  {
    "period": 3,
    "periodUnit": "QUARTER",
    "maximum": 1000000,
    "minimum": 500000,
    "average": 750000
  },
  {
    "period": 4,
    "periodUnit": "QUARTER",
    "maximum": 200000,
    "minimum": 100000,
    "average": 150000
  }
]
```