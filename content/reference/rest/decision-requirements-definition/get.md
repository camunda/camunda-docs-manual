---

title: "Get Decision Requirements Definition"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-decision-requirements-definition-get"
    parent: "rest-api-decision-requirements-definition"
    pre: "GET `/decision-requirements-definition/{id}`
          </br>
          GET `/decision-requirements-definition/key/{key}`
          </br>
          GET `/decision-requirements-definition/key/{key}/tenant-id/{tenant-id}`"

---


Retrieves a decision requirements definition according to the `DecisionRequirementsDefinition` interface in the engine.


# Method

GET `/decision-requirements-definition/{id}`

GET `/decision-requirements-definition/key/{key}` (returns the latest version of the decision requirements definition which belongs to no tenant)

GET `/decision-requirements-definition/key/{key}/tenant-id/{tenant-id}` (returns the latest version of the decision requirements definition for tenant)


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the decision requirements definition to be retrieved.</td>
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

A JSON object corresponding to the `DecisionRequirementsDefinition` interface in the engine.
Its properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the decision requirements definition.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>String</td>
    <td>The key of the decision requirements definition, i.e., the id of the DMN 1.1 XML decision definition.</td>
  </tr>
  <tr>
    <td>category</td>
    <td>String</td>
    <td>The category of the decision requirements definition.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the decision requirements definition.</td>
  </tr>
  <tr>
    <td>version</td>
    <td>Number</td>
    <td>The version of the decision requirements definition that the engine assigned to it.</td>
  </tr>
  <tr>
    <td>resource</td>
    <td>String</td>
    <td>The file name of the decision requirements definition.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>String</td>
    <td>The deployment id of the decision requirements definition.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the decision requirements definition.</td>
  </tr>
</table>


## Response codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>
      Decision requirements definition with given id or key does not exist.
      See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

GET `/decision-requirements-definition/invoice:1:9f86d61f-9ee5-11e3-be3b-606720b6f99c`

GET `/decision-requirements-definition/key/invoiceKey`

## Response

```json
{
  "id":"invoice:1:9f86d61f-9ee5-11e3-be3b-606720b6f99c",
  "key":"invoiceKey",
  "category":"invoice",
  "name":"receiptInvoice",
  "version":2,
  "resource":"invoice.dmn",
  "deploymentId":"c627175e-41b7-11e6-b0ef-00aa004d0001",
  "tenantId": null
}
```
