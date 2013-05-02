Start Process
=============

Instantiates a given process definition. Process variables may be supplied in the request body.


Method
------

POST `/process-definition/{id}/start`


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
    Variable names are property keys of this object and variable values are property values.
    Valid variable values are Boolean, Integer and String values.</td>
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
    <td>500</td>
    <td></td>
    <td>The instance could not be created successfully.</td>
  </tr>
</table>

Example
-------

#### Request

<!-- TODO: Insert a 'real' example -->
POST `/process-definition/aProcessDefinitionId/start`

Request body:

    {"variables": 
        {"aVariable": "aStringValue",
         "anotherVariable": true}}

#### Response

    {"links":[{"href":"http://localhost:8080/rest-test/process-instance/anId","rel":"self"}],
    "id":"anId",
    "definitionId":"aProcessDefinitionId",
    "businessKey":null,
    "ended":false,
    "suspended":false}
