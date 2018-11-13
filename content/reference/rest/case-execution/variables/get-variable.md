---

title: "Get Case Execution Variable"
weight: 110

menu:
  main:
    name: "Get"
    identifier: "rest-api-case-execution-get-single-variable"
    parent: "rest-api-case-execution-variables"
    pre: "GET `/case-execution/{id}/variables/{varName}`"

---


Retrieves a variable of a given case execution by id.


# Method

GET `/case-execution/{id}/variables/{varName}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the case execution to retrieve the variable from.</td>
  </tr>
  <tr>
    <td>varName</td>
    <td>The name of the variable to get.</td>
  </tr>
</table>

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deserializeValue</td>
    <td>
      {{< rest-var-query-param-deserialize-object-value >}}
    </td>
  </tr>
</table>

# Result

A JSON object with the following properties:

{{< rest-var-response deserializationParameter="deserializeValues" >}}


# Response Codes

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
    <td>404</td>
    <td>application/json</td>
    <td>Variable with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example 1

## Request

GET `/case-execution/aCaseExecutionId/variables/aVarName`

## Response

{{< rest-var-response-example-deserialized >}}

# Example 2

## Request

GET `/case-execution/aCaseExecutionId/variables/aVarName?deserializeValue=false`

## Response

{{< rest-var-response-example-serialized >}}

