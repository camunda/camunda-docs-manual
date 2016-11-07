---

title: 'Delete Local Task Variable'
weight: 300

menu:
  main:
    name: "Delete"
    identifier: "rest-api-task-delete-local-variable"
    parent: "rest-api-task-local-variables"
    pre: "DELETE `/task/{id}/localVariables/{varName}`"

---


Removes a local variable from a task by id.


# Method

DELETE `/task/{id}/localVariables/{varName}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task.</td>
  </tr>
  <tr>
    <td>varName</td>
    <td>The name of the variable to be removed.</td>
  </tr>
</table>


# Result

This method returns no content.


# Response Codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td></td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>Task id is null or does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

DELETE `/task/aTaskId/localVariables/aVarName`

## Response

Status 204. No content.
