Delete Single Execution Variable
================================

Deletes a variable in the context of a given execution.


Method
------

DELETE `/execution/{id}/variable/{varId}`


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
    <td>The id of the execution to delete the variable from.</td>
  </tr>
  <tr>
    <td>varId</td>
    <td>The name of the variable to delete.</td>
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
</table>

  
Example
-------

#### Request

DELETE `/execution/anExecutionId/variable/aVarName`

     
#### Response
    
Status 204. No content.