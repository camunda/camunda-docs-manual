---

title: 'Put Local Task Variable'
weight: 280

menu:
  main:
    identifier: "rest-api-task-put-local-variable"
    parent: "rest-api-task"

---


Sets a variable in the context of a given task.


Method
------

PUT `/task/{id}/localVariables/{varId}`


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
    <td>The id of the task to set the variable for.</td>
  </tr>
  <tr>
    <td>varId</td>
    <td>The name of the variable to set.</td>
  </tr>
</table>

#### Request Body

A JSON object with the following properties:

<%- @partial('api-references/rest/variables/variable-request.html.md.eco', @, {}) %>


Result
------

This method returns no content.

  
Response codes
--------------  

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
    <td>The variable value or type is invalid, for example if the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The variable name is null. Task id is null or does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>      
</table>

Example 1
---------

#### Request

PUT `/task/aTaskId/localVariables/aVarName`
  
    {"value" : "someValue", "type": "String"}
     
#### Response
    
Status 204. No content.

Example 2
---------

#### Request

PUT `/task/aTaskId/localVariables/aVarName`
  
<%- @partial('api-references/rest/variables/variable-request-example.md', @, {}) %>
     
#### Response
    
Status 204. No content.