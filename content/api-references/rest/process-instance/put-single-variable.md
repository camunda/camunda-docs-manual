---

title: 'Put Single Process Variable'
weight: 180

menu:
  main:
    identifier: "rest-api-process-instance-put-variable"
    parent: "rest-api-process-instance"

---


Sets a variable of a given process instance.


Method
------

PUT `/process-instance/{id}/variables/{varId}`


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
    <td>The id of the process instance to set the variable for.</td>
  </tr>
  <tr>
    <td>varId</td>
    <td>The name of the variable to set.</td>
  </tr>
</table>

#### Request Body

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
</table>


Example 1
---------

#### Request

PUT `/process-instance/aProcessInstanceId/variables/aVarName`
  
    {"value" : "someValue", "type": "String"}
     
#### Response
    
Status 204. No content.

Example 2
---------

#### Request

PUT `/process-instance/aProcessInstanceId/variables/aVarName`
  
<%- @partial('api-references/rest/variables/variable-request-example.md', @, {}) %>
     
#### Response
    
Status 204. No content.