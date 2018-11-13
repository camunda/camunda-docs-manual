---

title: "Delete Process Definition"
weight: 150

menu:
  main:
    name: "Delete"
    identifier: "rest-api-deployment-delete-process-definition"
    parent: "rest-api-process-definition"
    pre: "DELETE `/process-definition/{id}`"

---

Deletes a process definition from a deployment by id.


# Method

DELETE `/process-definition/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process definition to be deleted.</td>
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
    <td><code>true</code>, if all process instances, historic process instances and jobs for this process definition should be deleted.</td>
  </tr>
  <tr>
    <td>skipCustomListeners</td>
    <td><code>true</code>, if only the built-in ExecutionListeners should be notified with the end event.</td>
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
    <td>200</td>
    <td></td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Process definition with id 'aProcessDefinitionId' does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

Delete a process definition with id `aProcessDefinitionId` and cascade deletion to process instances,
history process instances and jobs:

DELETE `/process-definition/aProcessDefinitionId?cascade=true`

## Response

Status 200. OK.
