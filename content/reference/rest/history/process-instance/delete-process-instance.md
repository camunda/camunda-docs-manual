---

title: "Delete a single historic Process Instance"
weight: 60

menu:
  main:
    name: "Delete"
    identifier: "rest-api-history-delete-process-instance"
    parent: "rest-api-history-process-instance"
    pre: "DELETE `/history/process-instance/{id}`"

---


Deletes a single process instance from the history.


# Method

DELETE `/history/process-instance/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the historic process instance to be deleted.</td>
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
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Historic process instance with given id does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

DELETE `/history/process-instance/aProcInstId`

## Response

No Content.