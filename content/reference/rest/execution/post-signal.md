---

title: "Trigger Execution"
weight: 150

menu:
  main:
    name: "Trigger"
    identifier: "rest-api-execution-post-signal"
    parent: "rest-api-execution"
    pre: "POST `/execution/{id}/signal`"

---


Signals an execution by id. Can for example be used to explicitly skip user tasks or signal asynchronous continuations.


# Method

POST `/execution/{id}/signal`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the execution to signal.</td>
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
    <td>A JSON object containing variable key-value pairs. Each key is a variable name and each value a JSON variable value object.
    {{< rest-var-request >}}
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
</table>


# Example

## Request

POST `/execution/{id}/signal`

Request Body:

    {"variables":
        {"myVariable": {"value": "camunda", "type": "String"},
        "mySecondVariable": {"value": 124, "type": "Integer"}}
    }

## Response

Status 204. No content.
