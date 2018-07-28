---

title: "Start Case Execution Manually"
weight: 60

menu:
  main:
    name: "Start"
    identifier: "rest-api-case-execution-post-manual-start"
    parent: "rest-api-case-execution"
    pre: "POST `/case-execution/{id}/manual-start`"

---

Performs a transition from <code>ENABLED</code> state to <code>ACTIVE</code> state. In relation to the state transition, it is possible to update or delete case instance variables (please note: deletion precedes update).

# Method

POST `/case-execution/{id}/manual-start`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the case execution to start manually.</td>
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
    <td>An array containg JSON objects. Each JSON object has a property <code>name</code>, which is the name of the variable to delete, and a property <code>local</code>, to indicate whether the variable must be deleted locally or not. If <code>local</code> is set to <code>true</code> the deletion does not propagate upwards in the case execution hierarchy.</td>
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
    <td>The state transition is not allowed to be performed, for example when the case execution is disabled or is already active. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>The case execution cannot be started because of CMMN restrictions. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>The case execution with given id is not found. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

POST `/case-execution/aCaseExecutionId/manual-start`

Request Body:

    {
      "variables":
        {
          "aVariable" : { "value" : "aStringValue", "type": "String" },
          "anotherVariable" : { "value" : true, "type": "Boolean", "local" : true }
        },
      "deletions":
         [
            { "name" : "aVariableToDelete", "local" : true },
            { "name" : "anotherVariableToDelete", "local" : false }
          ]
    }

## Response

Status 204. No content.
