---

title: 'Activate/Suspend Process Instance By Id'
weight: 150

menu:
  main:
    name: "Activate/Suspend By Id"
    identifier: "rest-api-process-instance-suspend-by-id"
    parent: "rest-api-process-instance"
    pre: "PUT `/process-instance/{id}/suspended`"

---


Activate or suspend a given process instance.

# Method

PUT `/process-instance/{id}/suspended`

# Parameters
  
## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process instance to activate or suspend.</td>
  </tr>
</table>

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>suspended</td>
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend a given process instance. When the value is set to <code>true</code>, the given process instance will be suspended and when the value is set to <code>false</code>, the given process instance will be activated.</td>
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

PUT `/process-instance/aProcessInstanceId/suspended`
  
    {
      "suspended" : true
    }
     
## Response
    
Status 204. No content.
