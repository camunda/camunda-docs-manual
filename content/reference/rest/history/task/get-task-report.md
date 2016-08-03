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

Query for a historic task report.


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
    <td>completedBefore</td>
    <td>Restrict to tasks that were completed before the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>completedAfter</td>
    <td>Restrict to tasks that were completed after the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>groupBy</td>
    <td>Groups the tasks report by a given criterion. Valid values are <code>taskDefinition</code> and <code>processDefinition</code>. The default value is <code>taskDefinition</code>.</td>
  </tr>
</table>


# Result

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

GET `/history/task/report`

Response

    [
      {
        "definition" : "aTaskDefinition",
        "count" : 42
      },
      {
        "definition" : "anotherTaskDefinition",
        "count" : 9000
      }
    ]

## Request with groupBy parameter

GET `/history/task/report?groupBy=processDefinition`

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
