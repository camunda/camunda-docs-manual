---

title: 'Get Single Job Definition'
category: 'Job Definition'

keywords: 'get'

---


Retrieves a single job definition according to the JobDefinition interface in the engine.


Method
------

GET `/job-definition/{id}`


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
    <td>The id of the job definition to be retrieved.</td>
  </tr>
</table>


Result
------

A json object corresponding to the JobDefinition interface in the engine.
Its properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the job definition.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition this job definition is associated with.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>String</td>
    <td>The key of the process definition this job definition is associated with.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>String</td>
    <td>The id of the activity this job definition is associated with.</td>
  </tr>  
  <tr>
    <td>jobType</td>
    <td>String</td>
    <td>The type of the job which are running for this job definition. For example: asynchronous continuation, timer etc.</td>
  </tr>
  <tr>
    <td>jobConfiguration</td>
    <td>String</td>
    <td>The configuration of a job definition provides details about the jobs wicht will be created. For timer jobs it is for example the timer configuration.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Boolean</td>
    <td>Indicates whether this job definition is suspended.</td>
  </tr>
</table>


Response codes
--------------  

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Job definition with given id does not exist.  See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

<!-- TODO: Insert a 'real' example -->
GET `/job-definition/aJobDefinitionId`

#### Response

      {
        "id": "aJobDefId",
        "processDefinitionId": "aProcDefId",
        "processDefinitionKey": "aProcDefKey",
        "activityId": "ServiceTask1",
        "jobType": "asynchronous-continuation",
        "jobConfiguration": "",
        "suspended": false
      }