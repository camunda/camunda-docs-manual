---

title: "Delete Single Case Instance Variable"
weight: 140

menu:
  main:
    name: "Delete"
    identifier: "rest-api-case-instance-delete-single-variable"
    parent: "rest-api-case-instance-variables"
    pre: "DELETE `/case-instance/{id}/variables/{varName}`"

---


Deletes a variable of a given case instance.


# Method


DELETE `/case-instance/{id}/variables/{varName}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the case instance to delete the variable from.</td>
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

DELETE `/case-instance/aCaseInstanceId/variables/aVarName`

## Response

Status 204. No content.
