---

title: 'Get Task Count By Candidate Group'
weight: 50

menu:
  main:
    identifier: "rest-api-task-get-candidate-group-count"
    parent: "rest-api-task-report"
    pre: "GET `/task/report/candidate-group-count`"

---


Retrieves the number of tasks for each candidate group.

# Method

GET `/task/report/candidate-group-count`

# Result

A JSON array of task counts grouped by candidate groups.
Each object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>groupName</td>
    <td>String</td>
    <td>The name of the candidate group. If there are tasks without a group name, the value will be <code>null</code></td>
  </tr>
  <tr>
    <td>taskCount</td>
    <td>Number</td>
    <td>The number of tasks which have the group name as candidate group.</td>
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

GET `/task/report/candidate-group-count` with media type `application/json`

## Response

```json
[
  {
    "groupName": null,
    "taskCount": 1
  },
  {
    "groupName": "aGroupName",
    "taskCount": 2
  },
  {
    "groupName": "anotherGroupName",
    "taskCount": 3
  },
]
```