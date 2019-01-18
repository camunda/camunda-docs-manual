---

title: "Delete Variable Instance"
weight: 70

menu:
  main:
    name: "Delete"
    identifier: "rest-api-history-delete-variable-instance"
    parent: "rest-api-history-variable-instance"
    pre: "DELETE `/history/variable-instance/{id}`"

---


Deletes a historic variable instance by id.


# Method

DELETE `/history/variable-instance/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the variable instance.</td>
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
    <td>404</td>
    <td>application/json</td>
    <td>Variable with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

Delete the history of a variable with id `aHistoricVariableId`:

DELETE `/history/variable-instance/aHistoricVariableId`


## Response

Status 204. No Content.
