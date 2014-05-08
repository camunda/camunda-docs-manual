---

title: 'Put Local Task Variable'
category: 'Task'

keywords: 'put local task variable'

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

A json object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>value</td>
    <td>The value of the variable to set.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>The type of the variable to set. Valid types are Integer, Short, Long, Double, String, Boolean and Date.
    </td>
  </tr>   
</table>


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
    <td>The variable value or type is invalid. For example the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The variable name is null. Task id is null or does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>      
</table>

  
Example
-------

#### Request

PUT `/task/aTaskId/localVariables/aVarName`
  
```json
{
	"value" : "someValue", 
	"type": "String"
}
```
     
#### Response
    
Status 204. No content.