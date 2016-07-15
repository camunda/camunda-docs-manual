---

title: "Get Decision Requirements Diagram"
weight: 50

menu:
  main:
    name: "Get diagram"
    identifier: "rest-api-decision-requirements-definition-get-diagram"
    parent: "rest-api-decision-requirements-definition"
    pre: "GET `/decision-requirements-definition/{id}/diagram`
          </br>
          GET `/decision-requirements-definition/key/{key}/diagram`
          </br>
          GET `/decision-requirements-definition/key/{key}/tenant-id/{tenant-id}/diagram`"

---


Retrieves the diagram of a decision requirements definition.


# Method

GET `/decision-requirements-definition/{id}/diagram`

GET `/decision-requirements-definition/key/{key}/diagram` (returns the diagram for the latest version of the decision requirements definition which belongs to no tenant)

GET `/decision-requirements-definition/key/{key}/tenant-id/{tenant-id}/diagram` (returns the diagram of the latest version of the decision requirements definition for tenant)


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the decision requirements definition.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the decision requirements definition (the latest version thereof) to be retrieved.</td>
  </tr>
  <tr>
    <td>tenant-id</td>
    <td>The id of the tenant to which the decision requirements definition belongs to.</td>
  </tr>
</table>

# Result

The image diagram of the decision requirements definition.

## Response codes

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
    <td>The decision requirements definition doesn't have an associated diagram.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>
      Decision requirements definition with given id or key does not exist.
      See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

GET `/decision-requirements-definition/invoice:1:9f86d61f-9ee5-11e3-be3b-606720b6f99c/diagram`

GET `/decision-requirements-definition/key/invoice/diagram`
