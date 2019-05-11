---

title: "Get CMMN XML"
weight: 40

menu:
  main:
    name: "Get XML"
    identifier: "rest-api-case-definition-get-xml"
    parent: "rest-api-case-definition"
    pre: "GET `/case-definition/{id}/xml`
          </br>
          GET `/case-definition/key/{key}/xml`
          </br>
          GET `/case-definition/key/{key}/tenant-id/{tenant-id}/xml`"

---


Retrieves the CMMN XML of a case definition.


# Method

GET `/case-definition/{id}/xml`

GET `/case-definition/key/{key}/xml` (returns the XML for the latest version of the case definition which belongs to no tenant)

GET `/case-definition/key/{key}/tenant-id/{tenant-id}/xml` (returns the XML for the latest version of the case definition for tenant)


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

A JSON object containing the id of the case definition and the CMMN XML.

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
    <td>Case definition with given id or key does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

<!-- TODO: Insert a 'real' example -->
GET `/case-definition/aCaseDefinitionId/xml`

GET `/case-definition/key/aCaseDefinitionKey/xml`

## Response

    {
      "id":"aCaseDefinitionId",
      "cmmnXml":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"
      ...
      <humanTask id=\"aHumanTask\" name=\"A HumanTask\">\r\n
      ..."
    }
