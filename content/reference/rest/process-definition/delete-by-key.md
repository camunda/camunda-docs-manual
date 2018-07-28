---

title: "Delete Definitions By Key"
weight: 150

menu:
  main:
    name: "Delete By Key"
    identifier: "rest-api-process-definition-delete-by-key"
    parent: "rest-api-process-definition"
    pre: "DELETE `/process-definition/key/{key}/delete`
          </br>
          DELETE `/process-definition/key/{key}/tenant-id/{tenant-id}/delete`"

---

Deletes process definitions by a given key.


# Method

1. DELETE `/process-definition/key/{key}/delete` <br> Deletes process definitions which belong to no tenant id by a given key.

2. DELETE `/process-definition/key/{key}/tenant-id/{tenant-id}/delete` <br> Deletes process definitions which belong to a tenant id by a given key.



# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the process definitions to be deleted.</td>
  </tr>
  <tr>
    <td>tenant-id</td>
    <td>The id of the tenant the process definitions belong to.</td>
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
    <td><code>true</code>, if all process instances, historic process instances and jobs of the process definitions should be deleted.</td>
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
    <td>204</td>
    <td></td>
    <td>Request successful. No content.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>The process definitions with the given key cannot be deleted due to missing permissions.
    See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a>
    for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>No process definition with the given key exists.
    See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a>
    for the error response format.</td>
  </tr>
</table>

# Example

## Request

DELETE `/process-definition/key/invoice/delete?cascade=true&skipCustomListeners=true`

DELETE `/process-definition/key/invoice/tenant-id/tenant1/delete?cascade=true&skipCustomListeners=true`

## Response

Status 204. No content.
