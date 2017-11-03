---

title: "Execute Filter List"
weight: 90

menu:
  main:
    name: "Execute List"
    identifier: "rest-api-filter-09-get-execute-list"
    parent: "rest-api-filter"
    pre: "GET `/filter/{id}/list`"

---

Executes the saved query of the filter by id and returns the result list.

# Method

GET `/filter/{id}/list`

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the filter to execute.</td>
  </tr>
</table>


## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>
      Pagination of results. Specifies the maximum number of results to return. Will return less
      results if there are no more results left.
    </td>
  </tr>
</table>


# Result

A JSON array containing JSON objects corresponding to the matching entity interface in the engine.
This depends on the saved query in the filter. Therefore it is not possible to specify a generic
result format, i.e., if the resource type of the filter is `Task` the result will correspond to the
`Task` interface in the engine.

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
    <td>application/hal+json</td>
    <td>Request successful. In case of an expected <a href="{{< relref "reference/rest/overview/hal.md" >}}">HAL</a> response.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>
       The authenticated user is unauthorized to read this filter.
      See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>
      Filter with given id does not exist. See the
      <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

GET `/filter/aTaskFilterId/list/?firstResult=0&maxResults=2`

## Response

Status 200.

<div class="alert alert-warning" role="alert">
  <strong>Note:</strong> The examples show the result of a task filter. So the response corresponds
  to a task, but for other filters the response format will differ.
</div>

```json
[
  {
    "assignee": "jonny1",
    "caseDefinitionId": null,
    "caseExecutionId": null,
    "caseInstanceId": null,
    "created": "2014-09-15T15:45:48.000+0200",
    "delegationState": null,
    "description": null,
    "due": null,
    "executionId": "aExecutionId",
    "followUp": null,
    "formKey": null,
    "id": "aTaskId",
    "name": "Task 2",
    "owner": null,
    "parentTaskId": null,
    "priority": 50,
    "processDefinitionId": "aProcessId",
    "processInstanceId": "aProcessInstanceId",
    "suspended": false,
    "taskDefinitionKey": "aTaskKey"
  },
  {
    "assignee": "demo",
    "caseDefinitionId": null,
    "caseExecutionId": null,
    "caseInstanceId": null,
    "created": "2014-09-15T10:42:18.000+0200",
    "delegationState": null,
    "description": null,
    "due": null,
    "executionId": "anotherExecutionId",
    "followUp": null,
    "formKey": null,
    "id": "anotherTaskId",
    "name": "Task 2",
    "owner": null,
    "parentTaskId": null,
    "priority": 50,
    "processDefinitionId": "anotherProcessId",
    "processInstanceId": "anotherProcessInstanceId",
    "suspended": false,
    "taskDefinitionKey": "anotherTaskKey"
  }
]
```
