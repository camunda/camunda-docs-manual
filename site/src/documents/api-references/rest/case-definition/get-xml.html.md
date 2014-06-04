---

title: 'Get CMMN 1.0 XML'
category: 'Case Definition'

keywords: 'get'

---


Retrieves the CMMN 1.0 XML of this case definition.


Method
------

GET `/case-definition/{id}/xml`

GET `/case-definition/key/{key}/xml` (returns the XML for the latest version of case definition)


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
    <td>The id of the case definition.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the case definition to be retrieved the latest version.</td>
  </tr>
</table>


Result
------

A json object containing the id of the case definition and the CMMN 1.0 XML.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the case definition.</td>
  </tr>
  <tr>
    <td>cmmnXml</td>
    <td>String</td>
    <td>An escaped XML string containing the XML that this case definition was deployed with. Carriage returns, line feeds and quotation marks are escaped.</td>
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
    <td>Case definition with given id does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Case definition with given key does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

<!-- TODO: Insert a 'real' example -->
GET `/case-definition/aCaseDefinitionId/xml`

GET `/case-definition/key/aCaseDefinitionKey/xml`

#### Response

    {
      "id":"aCaseDefinitionId",
      "cmmnXml":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"
      ...
      <humanTask id=\"aHumanTask\" name=\"A HumanTask\">\r\n
      ..."
    }
