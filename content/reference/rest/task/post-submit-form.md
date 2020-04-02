---

title: 'Submit Task Form'
weight: 90

menu:
  main:
    name: "Submit Form"
    identifier: "rest-api-task-post-submit-form"
    parent: "rest-api-task"
    pre: "POST `/task/{id}/submit-form`"

---


Completes a task and updates process variables using a form submit. There are two difference between this method and the `complete` method:

* If the task is in state `PENDING` - i.e., has been delegated before, it is not completed but resolved. Otherwise it will be completed.
* If the task has Form Field Metadata defined, the process engine will perform backend validation for any form fields which have validators defined. See the [Generated Task Forms]({{< ref "/user-guide/task-forms/_index.md#generated-task-forms" >}}) section of the [User Guide]({{< ref "/user-guide/_index.md" >}}) for more information.


# Method

POST `/task/{id}/submit-form`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to submit the form for.</td>
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
    <td>A JSON object containing variable key-value pairs. Each key is a variable name and each value a JSON variable value object and has the following properties:
    {{< rest-var-request transient="true">}}
  </tr>
  <tr>
    <td>withVariablesInReturn</td>
    <td>Indicates whether the response should contain the process variables or not. The default is false with a response code of 204. If set to true the response contains the process variables and has a response code of 200.
  If the task is not associated with a process instance (e.g. if it's part of a case instance) no variables will be returned.</td>
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
    <td>200</td>
    <td></td>
    <td>Request successful. The response contains the process variables.</td>
  </tr>
  <tr>
    <td>204</td>
    <td>application/json</td>
    <td>Request successful. The response contains no variables.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>The variable value or type is invalid, for example if the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>If the task does not exist or the corresponding process instance could not be resumed successfully. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Submit a task form

### Request

POST `/task/anId/submit-form`

Request Body:

    {
        "variables": {
            "aVariable": {
                "value": "aStringValue"
            },
            "anotherVariable": {
                "value": 42
            },
            "aThirdVariable": {
                "value": true
            },
            "aFileVariable": {
                "value": "TG9yZW0gaXBzdW0=",
                "type": "File",
                "valueInfo": {
                    "filename": "myFile.txt"
                }
            }
        }
    }

### Response

Status 204. No content.

## Submit a task form with variables in return

### Request

POST `/task/anId/submit-form`

Request Body:

    {
        "variables": {
            "aVariable": {
                "value": "aStringValue"
            },
            "anotherVariable": {
                "value": 42
            },
            "aThirdVariable": {
                "value": true
            }
        },
        "withVariablesInReturn": true
    }

### Response
Status 200.

    {
        "aVariable": {"value" : "aStringValue", "type": "String",
                        "valueInfo" : {} },
        "anotherVariable": {"value" : 42, "type": "Integer",
                        "valueInfo" : {} },
        "aThirdVariable": {"value" : true, "type": "Boolean",
                        "valueInfo" : {} }
    }