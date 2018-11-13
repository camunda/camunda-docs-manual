---

title: "Get DMN 1.0 XML"
weight: 40

menu:
  main:
    name: "Get XML"
    identifier: "rest-api-decision-definition-get-xml"
    parent: "rest-api-decision-definition"
    pre: "GET `/decision-definition/{id}/xml`
          </br>
          GET `/decision-definition/key/{key}/xml` (returns the XML for the latest version of decision definition)"

---


Retrieves the DMN 1.0 XML of this decision definition.


# Method

GET `/decision-definition/{id}/xml`

GET `/decision-definition/key/{key}/xml` (returns the XML for the latest version of decision definition)


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
    <td>The key of the decision definition (the latest version thereof) to be retrieved.</td>
  </tr>
</table>


# Result

A JSON object containing the id of the decision definition and the DMN 1.0 XML.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the decision definition.</td>
  </tr>
  <tr>
    <td>dmnXml</td>
    <td>String</td>
    <td>An escaped XML string containing the XML that this decision definition was deployed with. Carriage returns, line feeds and quotation marks are escaped.</td>
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
    <td>400</td>
    <td>application/json</td>
    <td>
      The path parameter "key" has no value.
      See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>
      Decision definition with given id or key does not exist.
      See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

GET `/decision-definition/aDecisionDefinitionId/xml`

GET `/decision-definition/key/aDecisionDefinitionKey/xml`

## Response

```json
{
  "id":"aDecisionDefinitionId",
  "dmnXml":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<Definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"
  ...
  <Decision id=\"aDecisionDefinitionKey\" name=\"My Decision\">\r\n
  ..."
}
```
