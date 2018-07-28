---

title: "Delete Deployment"
weight: 80

menu:
  main:
    name: "Delete"
    identifier: "rest-api-deployment-delete-deployment"
    parent: "rest-api-deployment"
    pre: "DELETE `/deployment/{id}`"

---

Deletes a deployment by id.


# Method

DELETE `/deployment/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the deployment to be deleted.</td>
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
    <td><code>true</code>, if all process instances, historic process instances and jobs for this deployment should be deleted.</td>
  </tr>
  <tr>
    <td>skipCustomListeners</td>
    <td><code>true</code>, if only the built-in ExecutionListeners should be notified with the end event.</td>
  </tr>
  <tr>
    <td>skipIoMappings</td>
    <td><code>true</code>, if all input/output mappings should not be invoked.</td>
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

Delete a deployment with id aDeploymentId and cascade deletion to process instances,
history process instances and jobs:

DELETE `/deployment/aDeploymentId?cascade=true`

## Response

Status 204. No content.
