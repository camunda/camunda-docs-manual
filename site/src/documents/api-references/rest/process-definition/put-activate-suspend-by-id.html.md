---

title: 'Activate/Suspend Process Definition By Id'
category: 'Process Definition'

keywords: 'put set suspension state'

---


Activate or suspend a given process definition by id or by latest version of process definition key.

Method
------

PUT `/process-definition/{id}/suspended`

PUT `/process-definition/key/{key}/suspended` (suspend latest version of process definition)


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
    <td>The id of the process definition to activate or suspend.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the process definition to be retrieve the latest version to activate or suspend.</td>
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
    <td>suspended</td>
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend a given process definition. When the value is set to <code>true</code>, then the given process definition will be suspended and when the value is set to <code>false</code>, then the given process definition will be activated.</td>
  </tr>
  <tr>
    <td>includeProcessInstances</td>
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend also all process instances of the given process definition. When the value is set to <code>true</code>, then all process instances of the provided process definition will be activated or suspended and when the value is set to <code>false</code>, then the suspension state of all process instances of the provided process definition will not be updated.</td>
  </tr>
  <tr>
    <td>executionDate</td>
    <td>The date on which the given process definition will be activated or suspended. If null, the suspension state of the given process definition is updated immediately. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, so for example <code>2013-01-23T14:42:45</code> is valid.</td>
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
    <td>The path parameter "key" has no value.<br/>Returned if some of the request parameters are invalid, for example if the provided <code>executionDate</code> parameter has not the expected format. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Process definition with given key does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

  
Example
-------

#### Request

PUT `/process-definition/aProcessDefinitionId/suspended`

PUT `/process-definition/key/aProcessDefinitionKey/suspended`
  
    {
      "suspended" : true,
      "includeProcessInstances" : true,
      "executionDate" : "2013-11-21T10:49:45"
    }
     
#### Response
    
Status 204. No content.