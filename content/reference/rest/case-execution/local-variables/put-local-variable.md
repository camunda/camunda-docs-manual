---

title: "Put Local Case Execution Variable"
weight: 160

menu:
  main:
    name: "Update"
    identifier: "rest-api-case-execution-put-local-variable"
    parent: "rest-api-case-execution-local-variables"
    pre: "PUT `/case-execution/{id}/localVariables/{varName}`"

---


Sets a variable in the context of a given case execution. Update does not propagate upwards in the case execution hierarchy.


# Method

PUT `/case-execution/{id}/localVariables/{varName}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the case execution to set the variable for.</td>
  </tr>
  <tr>
    <td>varName</td>
    <td>The name of the variable to set.</td>
  </tr>
</table>

## Request Body

A JSON object with the following properties:

{{< rest-var-request transient="true">}}


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
    <td>The variable value or type is invalid, for example if the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example 1

## Request

PUT `/case-execution/aCaseExecutionId/localVariables/aVarName`

    {"value" : "someValue", "type": "String"}

## Response

Status 204. No content.


# Example 2

## Request

PUT `/case-execution/aCaseExecutionId/localVariables/aVarName`

{{< rest-var-request-example >}}

## Response

Status 204. No content.
