---

title: 'Delete Process Variable'
weight: 10

menu:
  main:
    name: "Delete"
    identifier: "rest-api-process-instance-delete-variable"
    parent: "rest-api-process-instance-variables"
    pre: "DELETE `/process-instance/{id}/variables/{varName}`"

---


Deletes a variable of a process instance by id.


# Method

DELETE `/process-instance/{id}/variables/{varName}`


# Parameters
  
## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process instance to delete the variable from.</td>
  </tr>
  <tr>
    <td>varName</td>
    <td>The name of the variable to delete.</td>
  </tr>
</table>


# Result

This method returns no content.

  
# Response Codes

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

  
# Example

## Request

DELETE `/process-instance/aProcessInstanceId/variables/aVarName`

     
## Response
    
Status 204. No content.