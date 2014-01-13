---

title: 'Start Process Instance'
category: 'Process Definition'

keywords: 'post'

---


Instantiates a given process definition. Process variables and business key may be supplied in the request body.


Method
------

POST `/process-definition/{id}/start`

POST `/process-definition/key/{key}/start` (starts the latest version of process definition)


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
    <td>The id of the process definition to be retrieved.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the process definition to be retrieved the latest version.</td>
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
    <td>A json object containing the variables the process is to be initialized with.
    Variable names are property keys of this object and variable values are json objects with a <code>value</code> and a <code>type</code> property (see example below).
    Valid variable values are Boolean, Number, String and Date values.</td>
  </tr>
  <tr>
    <td>business key</td>
    <td>A json object containing the business key the process is to be initialized with.
	The business key uniquely identifies the process instance in the context of the given process definition.</td>
  </tr>
</table>


Result
------

A json object representing the newly created process instance.
Properties are:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the process instance.</td>
  </tr>
  <tr>
    <td>definitionId</td>
    <td>String</td>
    <td>The id of the process definition.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>String</td>
    <td>The business key of the process instance.</td>
  </tr>
  <tr>
    <td>ended</td>
    <td>Boolean</td>
    <td>A flag indicating whether the instance is still running.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Boolean</td>
    <td>A flag indicating whether the instance is suspended.</td>
  </tr>
  <tr>
    <td>links</td>
    <td>Object</td>
    <td>A json array containing links to interact with the instance.</td>
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
	<td>The path parameter "key" has no value.<br/>The instance could not be created due to an invalid variable value. For example the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>  
  <tr>
    <td>404</td>
    <td>application/json</td>
	<td>The instance could not be created due to a non existing process definition key. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The instance could not be created successfully. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

POST `/process-definition/aProcessDefinitionId/start`

POST `/process-definition/key/aProcessDefinitionKey/start`

Request body:

    {"variables": 
        {"aVariable" : {"value" : "aStringValue", "type": "String"},
         "anotherVariable" : {"value" : true, "type": "Boolean"}},
	 "businessKey" : "myBusinessKey"
	}

#### Response

    {"links":[{"method": "GET", "href":"http://localhost:8080/rest-test/process-instance/anId","rel":"self"}],
    "id":"anId",
    "definitionId":"aProcessDefinitionId",
    "businessKey":"myBusinessKey",
    "ended":false,
    "suspended":false}
