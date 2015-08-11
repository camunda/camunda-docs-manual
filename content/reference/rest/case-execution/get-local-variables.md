---

title: "Get Local Case Execution Variables"
weight: 220

menu:
  main:
    identifier: "rest-api-case-execution-get-local-variables"
    parent: "rest-api-case-execution"

---


Retrieves all variables of a given case execution.


Method
------

GET `/case-execution/{id}/localVariables`


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
    <td>The id of the case execution to retrieve the variables from.</td>
  </tr>
</table>

#### Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deserializeValues</td>
    <td>
      <%- @partial('api-references/rest/variables/variable-query-param-deserialize-object-value.html.md', @, {}) %>
    </td>
  </tr>
</table>


Result
------

A JSON object of variables key-value pairs.
Each key is a variable name and each value a variable value object that has the following properties:

<%- @partial('api-references/rest/variables/variable-response.html.md.eco', @, {deserializationParameter: 'deserializeValues'}) %>


Response codes
--------------

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
    <td>Case execution with given id does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example 1
---------

#### Request

GET `/case-execution/aCaseExecutionId/localVariables`

#### Response

<%- @partial('api-references/rest/variables/variables-response-example-deserialized.html', @, {}) %>

Example 2
---------

#### Request

GET `/case-execution/aCaseExecutionId/localVariables?deserializeValues=false`

#### Response

<%- @partial('api-references/rest/variables/variables-response-example-serialized.html.md', @, {}) %>
