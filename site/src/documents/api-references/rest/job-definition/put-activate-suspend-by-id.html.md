---

title: 'Activate/Suspend Job Definition By Id'
category: 'Job Definition'

keywords: 'put set suspension state'

---


Activate or suspend a given job definition by id.

Method
------

PUT `/job-definition/{id}/suspended`

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
    <td>The id of the job definition to activate or suspend.</td>
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
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend a given job definition. When the value is set to <code>true</code>, then the given job definition will be suspended and when the value is set to <code>false</code>, then the given job definition will be activated.</td>
  </tr>
  <tr>
    <td>includeJobs</td>
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend also all jobs of the given job definition. When the value is set to <code>true</code>, then all jobs of the provided job definition will be activated or suspended and when the value is set to <code>false</code>, then the suspension state of all jobs of the provided job definition will not be updated.</td>
  </tr>
  <tr>
    <td>executionDate</td>
    <td>The date on which the given job definition will be activated or suspended. If null, the suspension state of the given job definition is updated immediately. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, so for example <code>2013-01-23T14:42:45</code> is valid.</td>
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
    <td>Returned if some of the request parameters are invalid, for example if the provided <code>executionDate</code> parameter has not the expected format. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

  
Example
-------

#### Request

PUT `/job-definition/aJobDefinitionId/suspended`
  
    {
      "suspended" : true,
      "includeJobs" : true,
      "executionDate" : "2013-11-21T10:49:45"
    }
     
#### Response
    
Status 204. No content.