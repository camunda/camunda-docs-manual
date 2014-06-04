---

title: 'Get Single Case Definition'
category: 'Case Definition'

keywords: 'get'

---


Retrieves a single case definition according to the CaseDefinition interface in the engine.


Method
------

GET `/case-definition/{id}`

GET `/case-definition/key/{key}` (returns the latest version of case definition)


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
    <td>The id of the case definition to be retrieved.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the case definition to be retrieved the latest version.</td>
  </tr>
</table>


Result
------

A json object corresponding to the CaseDefinition interface in the engine.
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
    <td>The id of the case definition.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>String</td>
    <td>The key of the case definition, i.e. the id of the CMMN 2.0 XML case definition.</td>
  </tr>
  <tr>
    <td>category</td>
    <td>String</td>
    <td>The category of the case definition.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the case definition.</td>
  </tr>
  <tr>
    <td>version</td>
    <td>Number</td>
    <td>The version of the case definition that the engine assigned to it.</td>
  </tr>
  <tr>
    <td>resource</td>
    <td>String</td>
    <td>The file name of the case definition.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>String</td>
    <td>The deployment id of the case definition.</td>
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
    <td>404</td>
    <td>application/json</td>
    <td>Case definition with given id or key does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

<!-- TODO: Insert a 'real' example -->
GET `/case-definition/aCaseDefinitionId`

GET `/case-definition/key/aCaseDefinitionKey`

#### Response

    {
      "id":"aCaseDefinitionId",
      "key":"aCaseDefinitionKey",
      "category":"aCategory",
      "name":"aName",
      "version":42,
      "resource":"aResourceName",
      "deploymentId":"aDeploymentId"
    }
