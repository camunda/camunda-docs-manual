---

title: 'Delete Task Variable'
weight: 300

menu:
  main:
    name: "Delete"
    identifier: "rest-api-task-delete-variable"
    parent: "rest-api-task-variables"
    pre: "DELETE `/task/{id}/variables/{varName}`"

---


Removes a variable that is visible to a task. A variable is visible to a task if it is a local task variable or declared in a parent scope of the task. See documentation on [visiblity of variables]({{< ref "/user-guide/process-engine/variables.md" >}}).


# Method

DELETE `/task/{id}/variables/{varName}`


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
    <td>Task id is null or does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

DELETE `/task/aTaskId/variables/aVarName`

## Response

Status 204. No content.
