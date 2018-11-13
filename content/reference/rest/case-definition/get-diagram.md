---

title: "Get Case Diagram"
weight: 50

menu:
  main:
    name: "Get Diagram"
    identifier: "rest-api-case-definition-get-diagram"
    parent: "rest-api-case-definition"
    pre: "GET `/case-definition/{id}/diagram`
          </br>
          GET `/case-definition/key/{key}/diagram`
          </br>
          GET `/case-definition/key/{key}/tenant-id/{tenant-id}/diagram`"

---


Retrieves the diagram of a case definition.


# Method

GET `/case-definition/{id}/diagram`

GET `/case-definition/key/{key}/diagram` (returns the diagram for the latest version of the case definition which belongs to no tenant)

GET `/case-definition/key/{key}/tenant-id/{tenant-id}/diagram` (returns the diagram for the latest version of the case definition for tenant)

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the case definition.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the case definition (the latest version thereof) to be retrieved.</td>
  </tr>
  <tr>
    <td>tenant-id</td>
    <td>The id of the tenant the case definition belongs to.</td>
  </tr>
</table>

# Result

The image diagram of this case.

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
    <td>The case definition doesn't have an associated diagram.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Case definition with given id or key does not exist.
        See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/case-definition/invoice:1:9f86d61f-9ee5-11e3-be3b-606720b6f99c/diagram`

GET `/case-definition/key/invoice/diagram`
