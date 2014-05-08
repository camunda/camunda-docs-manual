---

title: 'Delete Local Task Variable'
category: 'Task'

keywords: 'delete local task variable remove delete destroy'

---


Removes a local variable from a task.


Method
------

DELETE `/task/{id}/localVariables/{varId}`


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
    <td>The id of the task.</td>
  </tr>
  <tr>
    <td>varId</td>
    <td>The name of the variable to be retrieved.</td>
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
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>Task id is null or does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>  
</table>


Example
-------

#### Request

DELETE `/task/aTaskId/localVariables/aVarName`

#### Response

Status 204. No content.
