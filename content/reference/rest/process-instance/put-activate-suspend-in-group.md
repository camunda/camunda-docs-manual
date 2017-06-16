---

title: 'Activate/Suspend Process Instance In Group'
weight: 180

menu:
  main:
    name: "Activate/Suspend In Group"
    identifier: "rest-api-process-instance-suspend-in-group"
    parent: "rest-api-process-instance"
    pre: "PUT `/process-instance/suspended`"

---


Activates or suspends process instances synchronously with a list of process 
instance ids, a process instance query, and/or a historical process instance 
query

# Method

PUT `/process-instance/suspended`

# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processInstanceIds</td>
    <td>A list of process instance ids which defines a group of process instances which will be activated or suspened by the operation.</td>
  </tr>
  <tr>
    <td>processInstanceQuery</td>
    <td>A process instance query which defines a group of process instances which will be activated or suspended by the operation.</td>
  </tr>
  <tr>
    <td>historicalProcessInstanceQuery</td>
    <td>A historical process instance query which defines a group of process instances which will be activated or suspended by the operation.</td>
  </tr>   
  <tr>
    <td>suspended</td>
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend all process instances that were defined with the other parameters.  When the value is set to <code>true</code>, all process instances defined will be suspended and when the value is set to <code>false</code>, all process instances defined will be activated.</td>
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
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the request parameters are invalid, for example if <code>processInstanceIds</code>, <code>processInstanceQuery</code>, and <code>historicProcessInstanceQuery</code> parameters are all set to null. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

  
# Example

## Request

PUT `/process-instance/suspended`
  
    {
      "processInstanceIds" : [
                               "processInstanceId1",  
                               "processInstanceId2",  
                               ...
                               "processInstanceIdn"  
                             ],
      "suspended" : true
    }
     
## Response
    
Status 204. No content.