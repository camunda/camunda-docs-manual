---

title: "Delete Single Batch"
weight: 40

menu:
  main:
    name: "Delete"
    identifier: "rest-api-batch-delete"
    parent: "rest-api-batch"
    pre: "DELETE `/batch/{id}`"

---

Deletes a batch and all related jobs and job definitions. Optionally also
deletes the batch history.


# Method

DELETE `/batch/{id}`


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

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>cascade</td>
    <td><code>true</code>, if also the historic batch and historic job logs for this batch should be deleted.</td>
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
    <td>Deployment with id 'aDeploymentId' does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

Delete a batch with id `aBatch` and cascade deletion to history:

DELETE `/batch/aBatch?cascade=true`

## Response

Status 204. No content.
