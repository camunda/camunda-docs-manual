---

title: "Close Case Instance"
weight: 70

menu:
  main:
    name: "Close"
    identifier: "rest-api-case-instance-post-close"
    parent: "rest-api-case-instance"
    pre: "POST `/case-instance/{id}/close`"

---

Performs a transition from <code>COMPLETED</code> state to <code>CLOSED</code> state. In relation to the state transition, it is possible to update or delete case instance variables (please note: deletion precedes update).


# Method

POST `/case-instance/{id}/close`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the case instance to close.</td>
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
      {{< rest-var-request transient="true" local="Indicates whether the variable must be created and/or update locally or not. If set to `true`, the creation or update happens locally and will not be propagated upwards in the execution hierarchy." >}}
  </tr>
  <tr>
    <td>deletions</td>
    <td>An array containing JSON objects. Each JSON object has a property <code>name</code>, which is the name of the variable to delete.</td>
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
    <td>The state transition is not allowed to be performed, for example when the case instance is active. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>The case instance cannot be closed because of CMMN restrictions. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>The case instance with given id is not found. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/case-instance/aCaseInstanceId/close`

Request Body:

    {
      "variables":
        {
          "aVariable" : { "value" : "aStringValue", "type": "String" },
          "anotherVariable" : { "value" : true, "type": "Boolean" }
        },
      "deletions":
         [
            { "name" : "aVariableToDelete" },
            { "name" : "anotherVariableToDelete" }
          ]
    }

## Response

Status 204. No content.
