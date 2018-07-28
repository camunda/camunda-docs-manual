---

title: 'Get BPMN 2.0 XML'
weight: 90

menu:
  main:
    name: "Get XML"
    identifier: "rest-api-process-definition-get-bpmn-20-xml"
    parent: "rest-api-process-definition"
    pre: "GET `/process-definition/{id}/xml`
          </br>
          GET `/process-definition/key/{key}/xml`
          </br>
          GET `/process-definition/key/{key}/tenant-id/{tenant-id}/xml`"

---


Retrieves the BPMN 2.0 XML of a process definition.


# Method

GET `/process-definition/{id}/xml`

GET `/process-definition/key/{key}/xml` (returns the XML for the latest version of the process definition which belongs to no tenant)

GET `/process-definition/key/{key}/tenant-id/{tenant-id}/xml` (returns the XML for the latest version of the process definition for tenant)


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

A JSON object containing the id of the definition and the BPMN 2.0 XML.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the process definition.</td>
  </tr>
  <tr>
    <td>bpmn20Xml</td>
    <td>String</td>
    <td>An escaped XML string containing the XML that this definition was deployed with. Carriage returns, line feeds and quotation marks are escaped.</td>
  </tr>
</table>


# Response Codes

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
    <td>Process definition with given key does not exist. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

<!-- TODO: Insert a 'real' example -->
GET `/process-definition/aProcessDefinitionId/xml`

GET `/process-definition/key/aProcessDefinitionKey/xml`

## Response

    {"id":"aProcessDefinitionId",
    "bpmn20Xml":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"
    ...
    <userTask id=\"approveInvoice\" camunda:expression=\"${true}\" name=\"approve invoice\">\r\n
    ..."}
