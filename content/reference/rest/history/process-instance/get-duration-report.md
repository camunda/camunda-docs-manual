---

title: "Get Process Instance Duration Report"
weight: 70

menu:
  main:
    name: "Get Duration Report"
    identifier: "rest-api-history-get-duration-report"
    parent: "rest-api-history-process-instance"
    pre: "GET `/history/process-instance/report?reportType=duration&periodUnit=month`"

---

Retrieves a report about the duration of completed process instances, grouped by a period. These reports include the maximum, minimum and average duration of all completed process instances which were started in a given period.

<b>Note:</b> This only includes historic data.

# Method

GET `/history/process-instance/report?reportType=duration`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>reportType</td>
    <td><b>Mandatory.</b> Specifies the type of the report to retrieve. To retrieve a report about the duration of process instances, the value must be set to <code>duration</code>.</td>
  </tr>
  <tr>
    <td>periodUnit</td>
    <td><b>Mandatory.</b> Specifies the granularity of the report. Valid values are <code>month</code> and <code>quarter</code>.</td>
  </tr>
  <tr>
    <td>processDefinitionIdIn</td>
    <td>Filter by process definition ids. Must be a comma-separated list of process definition ids.</td>
  </tr>
  <tr>
    <td>processDefinitionKeyIn</td>
    <td>Filter by process definition keys. Must be a comma-separated list of process definition keys.</td>
  </tr>
  <tr>
    <td>startedBefore</td>
    <td>Restrict to instances that were started before the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2016-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>startedAfter</td>
    <td>Restrict to instances that were started after the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2016-01-23T14:42:45.000+0200</code>.</td>
  </tr>
</table>

\* For further information, please see the <a href="{{< relref "reference/rest/overview/date-format.md" >}}"> documentation</a>.

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
    <td>Specifies a timespan within a year.<br>
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
    <td>The greatest duration in milliseconds of all completed process instances which were started in the given period.</td>
  </tr>
  <tr>
    <td>minimum</td>
    <td>Number</td>
    <td>The smallest duration in milliseconds of all completed process instances which were started in the given period.</td>
  </tr>
  <tr>
    <td>average</td>
    <td>Number</td>
    <td>The average duration in milliseconds of all completed process instances which were started in the given period.</td>
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
    <td>200</td>
    <td>application/csv or text/csv</td>
    <td>Request successful. In case of an expected <code>application/csv</code> or <code>text/csv</code> response to retrieve the result as a csv file.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the query parameters are invalid or mandatory parameters are not supplied. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>If the authenticated user is unauthorized to read the history. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/history/process-instance/report?reportType=duration&periodUnit=quarter&processDefinitionKeyIn=invoice`

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
