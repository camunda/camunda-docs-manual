---

title: 'Submit Start Form'
weight: 120

menu:
  main:
    identifier: "rest-api-process-definition-submit-start-form"
    parent: "rest-api-process-definition"
    pre: "POST `/process-definition/{id}/submit-form`
          </br>
          POST `/process-definition/key/{key}/submit-form`
          </br>
          POST `/process-definition/key/{key}/tenant-id/{tenant-id}/submit-form`"

---


Starts a process instance using a set of process variables and the business key. If the start event has Form Field Metadata defined, the process engine will perform backend validation for any form fields which have validators defined. See [Documentation on Generated Task Forms]({{< ref "/user-guide/task-forms/_index.md#generated-task-forms" >}}).


# Method

POST `/process-definition/{id}/submit-form`

POST `/process-definition/key/{key}/submit-form` (starts the latest version of the process definition which belongs to no tenant)

POST `/process-definition/key/{key}/tenant-id/{tenant-id}/submit-form` (starts the latest version of the process definition for tenant)


# Parameters

## Path Parameters

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
    <td>The key of the process definition (the latest version thereof) to be retrieved.</td>
  </tr>
  <tr>
    <td>tenant-id</td>
    <td>The id of the tenant the process definition belongs to.</td>
  </tr>
</table>


## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>variables</td>
    <td>A JSON object containing the variables the process is to be initialized with. Each key corresponds to a variable name and each value to a variable value. A variable value is a JSON object with the following properties:
    {{< rest-var-request transient="true">}}
  </tr>
  <tr>
    <td>business key</td>
    <td>A JSON object containing the business key the process is to be initialized with.
	The business key uniquely identifies the process instance in the context of the given process definition.</td>
  </tr>
</table>


# Result

This method returns no content.


# Response Codes

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
    <td>The variable value or type is invalid, for example if the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Process definition with given key does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The instance could not be created successfully. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/process-definition/aProcessDefinitionId/submit-form`

POST `/process-definition/key/aProcessDefinitionKey/submit-form`

Request Body:

    {
      "variables": {
        "aVariable" : {
          "value" : "aStringValue",
          "type": "String",
          "valueInfo" : {
            "transient" : true
          }
        },
        "anotherVariable" : {
          "value" : true,
          "type": "Boolean"
        }
      },
      "businessKey" : "myBusinessKey"
    }

## Response

    {"links":[{"method": "GET", "href":"http://localhost:8080/rest-test/process-instance/anId","rel":"self"}],
    "id":"anId",
    "definitionId":"aProcessDefinitionId",
    "businessKey":"myBusinessKey",
    "ended":false,
    "suspended":false}
