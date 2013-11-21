---

title: 'Activate/Suspend Jobs By Job Definition Id'
category: 'Job'

keywords: 'put set suspension state'

---


Activate or suspend jobs with the given job definition id.

Method
------

PUT `/job/suspended`

Parameters
----------

#### Request Body

A json object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>jobDefinitionId</td>
    <td>The job definition id of the jobs to activate or suspend.</td>
  </tr>  
  <tr>
    <td>suspended</td>
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend all jobs with the given job definition id. When the value is set to <code>true</code>, then all jobs with the given job definition id will be suspended and when the value is set to <code>false</code>, then all jobs with the given job definition id will be activated.</td>
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
    <td>Returned if some of the request parameters are invalid, for example if the <code>jobDefinitionId</code> parameter is null. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

  
Example
-------

#### Request

PUT `/job/suspended`
  
    {
      "jobDefinitionId" : "aJobDefinitionId",
      "suspended" : true
    }
     
#### Response
    
Status 204. No content.