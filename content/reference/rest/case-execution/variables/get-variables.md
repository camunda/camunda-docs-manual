---

title: "Get Case Execution Variables"
weight: 130

menu:
  main:
    name: "Get List"
    identifier: "rest-api-case-execution-get-variables"
    parent: "rest-api-case-execution-variables"
    pre: "GET `/case-execution/{id}/variables`"

---


Retrieves all variables of a given case execution.


# Method

GET `/case-execution/{id}/variables`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the case execution to retrieve the variables from.</td>
  </tr>
</table>

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deserializeValues</td>
    <td>
      {{< rest-var-query-param-deserialize-object-value >}}      
    </td>
  </tr>
</table>


# Result

A JSON object of variables key-value pairs.
Each key is a variable name and each value a variable value object that has the following properties:

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
    <td>500</td>
    <td>application/json</td>
    <td>Case execution with given id does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/case-execution/aCaseExecutionId/variables`

## Response

{{< rest-vars-response-example-deserialized >}}


# Example 2

## Request

GET `/case-execution/aCaseExecutionId/variables?deserializeValues=false`

## Response

{{< rest-vars-response-example-serialized >}}
