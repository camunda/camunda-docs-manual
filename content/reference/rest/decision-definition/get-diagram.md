---

title: "Get Decision Diagram"
weight: 50

menu:
  main:
    name: "Get Diagram"
    identifier: "rest-api-decision-definition-get-diagram"
    parent: "rest-api-decision-definition"
    pre: "GET `/decision-definition/{id}/diagram`
          </br>
          GET `/decision-definition/key/{key}/diagram` (returns the diagram for the latest version of the decision definition)"

---


Retrieves the diagram of a decision definition.


# Method

GET `/decision-definition/{id}/diagram`

GET `/decision-definition/key/{key}/diagram` (returns the diagram for the latest version of the decision definition)


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the decision definition.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the decision definition (the latest version thereof) to be retrieved. Cannot be used when more than one tenant has a decision definition with the given key.</td>
  </tr>
</table>

# Result

The image diagram of this decision.

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
    <td>The decision definition doesn't have an associated diagram.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>
      The path parameter "key" has no value or the decision definition with given id does not exist. <br/>
      If more than one tenant has a decision definition with the given key.
      See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>
      Decision definition with given id or key does not exist.
      See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

GET `/decision-definition/invoice:1:9f86d61f-9ee5-11e3-be3b-606720b6f99c/diagram`

GET `/decision-definition/key/invoice/diagram`
