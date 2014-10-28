---

title: 'Get Local Execution Variables'
category: 'Execution'

keywords: 'get'

---


Retrieves all variables of a given execution.


Method
------

GET `/execution/{id}/localVariables`


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
    <td>The id of the execution to retrieve the variables from.</td>
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
    <td>Execution with given id does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example 1
---------

#### Request

GET `/execution/anExecutionId/localVariables`
  
#### Response

<%- @partial('api-references/rest/variables/variables-response-example-deserialized.html', @, {}) %>
    
Example 2
---------

#### Request

GET `/execution/anExecutionId/localVariables?deserializeValues=false`
  
#### Response

<%- @partial('api-references/rest/variables/variables-response-example-serialized.html.md', @, {}) %>