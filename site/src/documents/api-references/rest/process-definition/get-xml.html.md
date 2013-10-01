---

title: 'Get BPMN 2.0 XML'
category: 'Process Definition'

keywords: 'get'

---


Retrieves the BPMN 2.0 XML of this process definition.


Method
------

GET `/process-definition/{id}/xml`


Parameters
----------

#### Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process definition.</td>
  </tr>
</table>


Result
------ 

A json object containing the id of the definition and the BPMN 2.0 XML.

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


Response codes
--------------

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
    <td>400</td>
    <td>application/json</td>
    <td>Process definition with given id does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

<!-- TODO: Insert a 'real' example -->
GET `/process-definition/aProcessDefinitionId/xml`

#### Response

    {"id":"aProcessDefinitionId",
    "bpmn20Xml":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"
    ...
    <userTask id=\"approveInvoice\" camunda:expression=\"${true}\" name=\"approve invoice\">\r\n
    ..."}
