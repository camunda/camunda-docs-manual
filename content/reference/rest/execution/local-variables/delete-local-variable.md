---

title: "Delete Local Execution Variable"
weight: 120

menu:
  main:
    name: "Delete"
    identifier: "rest-api-execution-delete-local-variable"
    parent: "rest-api-execution-local-variables"
    pre: "DELETE `/execution/{id}/localVariables/{varName}`"

---


Deletes a variable in the context of a given execution. Deletion does not propagate upwards in the execution hierarchy.


# Method

DELETE `/execution/{id}/localVariables/{varName}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the execution to delete the variable from.</td>
  </tr>
  <tr>
    <td>varName</td>
    <td>The name of the variable to delete.</td>
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
</table>


# Example

## Request

DELETE `/execution/anExecutionId/localVariables/aVarName`

## Response

Status 204. No content.
