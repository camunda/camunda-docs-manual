---

title: 'Submit Start Form'
category: 'Process Definition'

keywords: 'post'

---


Start a process instance using a set of process variables. If the start event has Form Field Metadata defined, the process engine will perform backend validation for any form fields which have Validators defined. See [Documentation on Generated Task Forms](ref:/guides/user-guide/#generated-task-forms). 


Method
------

POST `/process-definition/{id}/submit-form`


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
    <td>The variable value or type is invalid. For example the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
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

Request body:

    {"variables": 
        {"aVariable" : {"value" : "aStringValue", "type": "String"},
         "anotherVariable" : {"value" : true, "type": "Boolean"}}}

#### Response

    {"links":[{"method": "GET", "href":"http://localhost:8080/rest-test/process-instance/anId","rel":"self"}],
    "id":"anId",
    "definitionId":"aProcessDefinitionId",
    "businessKey":null,
    "ended":false,
    "suspended":false}