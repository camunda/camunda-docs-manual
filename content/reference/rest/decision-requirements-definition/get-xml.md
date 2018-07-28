---

title: "Get DMN XML"
weight: 40

menu:
  main:
    name: "Get DMN XML"
    identifier: "rest-api-decision-requirements-definition-get-xml"
    parent: "rest-api-decision-requirements-definition"
    pre: "GET `/decision-requirements-definition/{id}/xml`
          </br>
          GET `/decision-requirements-definition/key/{key}/xml`
          </br>
          GET `/decision-requirements-definition/key/{key}/tenant-id/{tenant-id}/xml`"

---


Retrieves the DMN XML of a decision requirements definition.


# Method

GET `/decision-requirements-definition/{id}/xml`

GET `/decision-requirements-definition/key/{key}/xml` (returns the XML for the latest version of the decision requirements definition which belongs to no tenant)

GET `/decision-requirements-definition/key/{key}/tenant-id/{tenant-id}/xml` (returns the XML of the latest version of the decision requirements definition for tenant)


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

A JSON object containing the id of the decision requirements definition and the DMN 1.1 XML.

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
    <td>dmnXml</td>
    <td>String</td>
    <td>An escaped XML string containing the XML that this decision requirements definition was deployed with. Carriage returns, line feeds and quotation marks are escaped.</td>
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

GET `/decision-requirements-definition/invoice:1:9f86d61f-9ee5-11e3-be3b-606720b6f99c/xml`

GET `/decision-requirements-definition/key/invoiceKey/xml`

## Response

```json
{
  "id":"invoice:1:9f86d61f-9ee5-11e3-be3b-606720b6f99c",
  "dmnXml":"<?xml version=\"1.1\" encoding=\"UTF-8\"?>\r\n
  ...
  <definitions id=\"dish\" name=\"Dish\" namespace=\"test-drg\"
  ...
  "
}
```
