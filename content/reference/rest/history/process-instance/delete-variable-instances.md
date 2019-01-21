---

title: "Delete all Historic Variable Instances of a Process Instance"
weight: 120

menu:
  main:
    name: "Delete Variable Instances"
    identifier: "rest-api-history-delete-variable-instances-process-instance"
    parent: "rest-api-history-process-instance"
    pre: "DELETE `/history/process-instance/{id}/variable-instances`"

---


Deletes all variables of a process instance from the history by id.


# Method

DELETE `/history/process-instance/{id}/variable-instances`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process instance for which all historic variables are to be deleted.</td>
  </tr>
</table>


# Result

No content.

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
    <td>Historic process instance with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

DELETE `/history/process-instance/aProcInstId/variable-instances`

## Response

Status 204. No content.