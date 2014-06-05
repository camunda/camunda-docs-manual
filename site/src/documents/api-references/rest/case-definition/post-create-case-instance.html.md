---

title: 'Create Case Instance'
category: 'Case Definition'

keywords: 'post'

---


Instantiates a given case definition. Case variables and business key may be supplied in the request body.


Method
------

POST `/case-definition/{id}/create`

POST `/case-definition/key/{key}/create` (creates the latest version of case definition)


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
  

#### Request Body

A json object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>variables</td>
    <td>A json object containing the variables the case instance is to be initialized with.
    Variable names are property keys of this object and variable values are json objects with a <code>value</code> and a <code>type</code> property (see example below).
    Valid variable values are Boolean, Number, String and Date values.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>The business key the case instance is to be initialized with.
	The business key uniquely identifies the case instance in the context of the given case definition.</td>
  </tr>
</table>


Result
------

A json object representing the newly created case instance.
Properties are:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the case instance.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>String</td>
    <td>The id of the case definition this case instance belongs to.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>String</td>
    <td>The business key of the case instance.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case instance is active.
    </td>
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
	<td>The path parameter "key" has no value.<br/>The case instance could not be created due to an invalid variable value. For example the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>  
  <tr>
    <td>404</td>
    <td>application/json</td>
	<td>The case instance could not be created due to a non existing case definition key. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The case instance could not be created successfully. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

POST `/case-definition/aCaseDefinitionId/create`

POST `/case-definition/key/aCaseDefinitionKey/create`

Request body:

    {
      "variables": 
        {
          "aVariable" : {"value" : "aStringValue", "type": "String"},
          "anotherVariable" : {"value" : true, "type": "Boolean"}
        },
	    "businessKey" : "myBusinessKey"
	}

#### Response

    {
      "links":[{"method": "GET", "href":"http://localhost:8080/rest-test/process-instance/anId","rel":"self"}],
      "id":"anId",
      "caseDefinitionId":"aCaseDefinitionId",
      "businessKey":"myBusinessKey",
      "active":true
    }
