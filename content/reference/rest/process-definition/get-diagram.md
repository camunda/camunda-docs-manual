---

title: 'Get Process Diagram'
weight: 20

menu:
  main:
    name: "Get Diagram"
    identifier: "rest-api-process-definition-get-process-diagram"
    parent: "rest-api-process-definition"
    pre: "GET `/process-definition/{id}/diagram`
          </br>
          GET `/process-definition/key/{key}/diagram`
          </br>
          GET `/process-definition/key/{key}/tenant-id/{tenant-id}/diagram`"

---

Retrieves the diagram of a process definition.


# Method

GET `/process-definition/{id}/diagram`

GET `/process-definition/key/{key}/diagram` (returns the diagram for the latest version of the process definition which belongs to no tenant)

GET `/process-definition/key/{key}/tenant-id/{tenant-id}/diagram` (returns the diagram for the latest version of process definition for tenant)


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process definition.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the process definition (the latest version thereof) to be retrieved.</td>
  </tr>
  <tr>
    <td>tenant-id</td>
    <td>The id of the tenant the process definition belongs to.</td>
  </tr>
</table>


# Result

The image diagram of this process.

# Response Codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>image/png, image/gif, ... (defaults to application/octet-stream if the file suffix is unknown</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>204</td>
    <td></td>
    <td>The process definition doesn't have an associated diagram.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Process definition with given id or key does not exist.
        See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/process-definition/invoice:1:9f86d61f-9ee5-11e3-be3b-606720b6f99c/diagram`

GET `/process-definition/key/invoice/diagram`
