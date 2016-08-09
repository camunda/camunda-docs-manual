---

title: "Get Task Report (Historic)"
weight: 50

menu:
  main:
    name: "Get Task Report"
    identifier: "rest-api-history-get-task-report"
    parent: "rest-api-history-task"
    pre: "GET `/history/task/report`"

---

Retrieves a report of completed tasks. The report contains a list of task/process definition keys and the count of how 
many tasks where completed for the specified key in a given period. When the report type is set to <code>duration</code>
the report contains a minimum, maximum and average duration value of all completed task instances in a given period. 


# Method

GET `/history/task/report`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>reportType</td>
    <td>
      <b>Mandatory.</b> Specifies the kind of the report to execute. In order to retrieve a report about the duration 
      of process instances the value must be set to <code>duration</code>. For a report of the completed tasks in a 
      specific timespan the value must be set to <code>count</code>.
    </td>
  </tr>
  <tr>
    <td>periodUnit</td>
    <td>
      When the report type is set to <code>duration</code>, this parameter is <b>Mandatory</b>. 
      Specifies the granularity of the report. Valid values are <code>month</code> and <code>quarter</code>.
    </td>
  </tr>
  <tr>
    <td>completedBefore</td>
    <td>Restrict to tasks that were completed before the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>completedAfter</td>
    <td>Restrict to tasks that were completed after the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>groupBy</td>
    <td>
      This parameter can only be used in combination with the reportType parameter set to <code>count</code>.
      Groups the tasks report by a given criterion. 
      Valid values are <code>taskDefinition</code> and <code>processDefinition</code>. 
      The default value is <code>taskDefinition</code>.</td>
  </tr>
</table>


# Result for count report type

A JSON array of historic task report objects.
Each historic task report object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>definition</td>
    <td>String</td>
    <td>The task definition or the process definition. The value depends on the <code>groupBy</code>-parameter in the request.</td>
  </tr>
  <tr>
    <td>count</td>
    <td>Long</td>
    <td>The number of tasks which have the given definition.</td>
  </tr>
</table>


# Result for duration report type

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
    <td>Returned if some of the query parameters are invalid, for example if a <code>completedAfter</code> parameter is supplied, but the date format is wrong. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request for completed task report

GET `/history/task/report?reportType=count&groupBy=processDefinition`

Response

    [
      {
        "definition" : "aProcessDefinition",
        "count" : 42
      },
      {
        "definition" : "anotherProcessDefinition",
        "count" : 9000
      }
    ]


## Request for duration report

GET `/history/task/report?reportType=duration&periodUnit=quarter`

Response

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