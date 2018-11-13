---

title: "Delete Single Batch (Historic)"
weight: 40

menu:
  main:
    name: "Delete"
    identifier: "rest-api-history-batch-delete"
    parent: "rest-api-history-batch"
    pre: "DELETE `/history/batch/{id}`"

---

Deletes a historic batch and related historic job logs.


# Method

DELETE `/history/batch/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the batch to be deleted.</td>
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
    <td>Deployment with id 'aDeploymentId' does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

DELETE `/history/batch/aBatch`

## Response

Status 204. No content.
