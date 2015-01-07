---

title: 'Execute Filter Single Result'
category: 'Filter'

keywords: 'get'

---

Executes the saved query of the filter and returns the single result.

Method
------

GET `/filter/{id}/singleResult`

Parameters
----------

#### Path Parameters

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


Result
------

A JSON object corresponding to the matching entity interface in the engine.  This depends on the
saved query in the filter. Therefore it is not possible to specify a generic result format, i.e., if
the resource type of the filter is `Task` the result will correspond with the Task interface in the
engine.

Response codes
--------------

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
    <td>Request successful. In case of an expected <a href="ref:#overview-hypertext-application-language-hal">HAL</code> response.</td>
  </tr>
  <tr>
    <td>204</td>
    <td></td>
    <td>Request successful, but the result was empty.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>
      The executed filter returned more than one single result. See the
      <a href="ref:#overview-introduction">Introduction</a> for the error response format.
    </td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>
       The authenticated user is unauthorized to read this filter.
      See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.
    </td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>
      Filter with given id does not exist. See the
      <a href="ref:#overview-introduction">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


Example
-------

#### Request

GET `/filter/aTaskFilterId/singleResult`

#### Response

Status 200.

<div class="alert alert-warning" role="alert">
  <strong>Note:</strong> The examples shows the result of a task filter. So the response corresponds
  to a task, but for other filters the response format will differ.
</div>

```json
{
  "assignee": "jonny1",
  "caseDefinitionId": null,
  "caseExecutionId": null,
  "caseInstanceId": null,
  "created": "2014-09-15T15:45:48",
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
```
