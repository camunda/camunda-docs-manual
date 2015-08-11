---

title: 'Submit Start Form'
weight: 120

menu:
  main:
    identifier: "rest-api-process-definition-submit-start-form"
    parent: "rest-api-process-definition"

---


Start a process instance using a set of process variables and the business key. If the start event has Form Field Metadata defined, the process engine will perform backend validation for any form fields which have validators defined. See [Documentation on Generated Task Forms](ref:/guides/user-guide/#task-forms-generated-task-forms).


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
    <td>The key of the process definition (the latest version thereof) to submit the form for.</td>
  </tr>
</table>

#### Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>variables</td>
    <td><p>A JSON object containing the variables the process is to be initialized with. Each key corresponds to a variable name and each value to a variable value. A variable value is a JSON object with the following properties:</p>
    <%- @partial('api-references/rest/variables/variable-request.html.md.eco', @, {}) %></td>
  </tr>
  <tr>
    <td>business key</td>
    <td>A JSON object containing the business key the process is to be initialized with.
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
    <td>The path parameter "key" has no value.<br/>The variable value or type is invalid, for example if the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
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
