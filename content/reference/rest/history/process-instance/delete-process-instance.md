---

title: "Delete a Historic Process Instance"
weight: 60

menu:
  main:
    name: "Delete"
    identifier: "rest-api-history-delete-process-instance"
    parent: "rest-api-history-process-instance"
    pre: "DELETE `/history/process-instance/{id}`"

---


Deletes a process instance from the history by id.


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

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>failIfNotExists</td>
    <td>If set to <code>false</code>, the request will still be successful if the process id is not found.</td>
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
    <td>Historic process instance with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

DELETE `/history/process-instance/aProcInstId`

## Response

Status 204. No content.