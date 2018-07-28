---

title: "Get Local Execution Variable"
weight: 70

menu:
  main:
    name: "Get"
    identifier: "rest-api-execution-get-local-variable"
    parent: "rest-api-execution-local-variables"
    pre: "GET `/execution/{id}/localVariables/{varName}`"

---


Retrieves a variable from the context of a given execution by id. Does not traverse the parent execution hierarchy.


# Method

GET `/execution/{id}/localVariables/{varName}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the execution to retrieve the variable from.</td>
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
    <td>Variable with given id does not exist. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example 1

## Request

GET `/execution/anExecutionId/localVariables/aVarName`

## Response

{{< rest-var-response-example-deserialized >}}


# Example 2

## Request

GET `/execution/anExecutionId/localVariables/aVarName?deserializeValue=false`

## Response

{{< rest-var-response-example-serialized >}}
