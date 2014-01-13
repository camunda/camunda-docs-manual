---

title: 'Submit Start Form'
category: 'Process Definition'

keywords: 'post'

---


Start a process instance using a set of process variables and the business key. If the start event has Form Field Metadata defined, the process engine will perform backend validation for any form fields which have Validators defined. See [Documentation on Generated Task Forms](ref:/guides/user-guide/#tasklist-task-forms-generated-task-forms). 


Method
------

POST `/process-definition/{id}/submit-form`

POST `/process-definition/key/{key}/submit-form` (starts the latest version of process definition)


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
    <td>The id of the process definition to submit the form for.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the process definition to be retrieved the latest version to submit the form for.</td>
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

This method returns no content.


Response codes
--------------

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td></td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>The path parameter "key" has no value.<br/>The variable value or type is invalid. For example the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Process definition with given key does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The instance could not be created successfully. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
--------------

#### Request

POST `/process-definition/aProcessDefinitionId/submit-form`

POST `/process-definition/key/aProcessDefinitionKey/submit-form`

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