---

title: "Execute Filter List (POST)"
weight: 100

menu:
  main:
    name: "Execute List (POST)"
    identifier: "rest-api-filter-10-post-execute-list"
    parent: "rest-api-filter"
    pre: "POST `/filter/{id}/list`"

---

Executes the saved query of the filter by id and returns the result list. This method is slightly more
powerful then the [Get Execute Filter List]({{< ref "/reference/rest/filter/get-execute-list.md" >}}) method because it allows to extend the saved
query of the filter.

{{< note title="Security Consideration" class="warning" >}}
  The request body of this method takes a JSON-serialized query. Some query types (e.g., task queries) allow to specify EL expressions in their parameters and may therefore be abused for remote code execution. See the section on <a href="{{< ref "/user-guide/process-engine/securing-custom-code.md">}}">security considerations for custom code</a> in the user guide for details.
{{</note>}}

# Method

POST `/filter/{id}/list`

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

## Request Body

A JSON object which corresponds to the type of the saved query of the filter, i.e., if the
resource type of the filter is `Task` the body should form a valid task query corresponding to
the [Task]({{< ref "/reference/rest/task/get-query.md" >}}) resource.


# Result

A JSON array containing JSON objects corresponding to the matching entity interface in the engine.
This depends on the saved query in the filter. Therefore it is not possible to specify a generic
result format, i.e., if the resource type of the filter is `Task` the result will correspond to the
`Task` interface in the engine.

# Response codes

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
    <td>Request successful. In case of an expected <a href="{{< ref "/reference/rest/overview/hal.md" >}}">HAL</code> response.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>
      The extending query was invalid. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a>
      for the error response format.
    </td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>
       The authenticated user is unauthorized to read this filter.
      See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>
      Filter with given id does not exist. See the
      <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

POST `/filter/aTaskFilterId/list/?firstResult=0&maxResults=2`

Request Body:

<div class="alert alert-warning" role="alert">
  <strong>Note:</strong> The examples show a task filter. So the request body corresponds
  to a task query. For other resource types the request body will differ.
</div>

```json
{
  "assignee": "jonny1",
  "taskDefinitionKey": "aTaskKey"
}

```
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
  }
]
```
