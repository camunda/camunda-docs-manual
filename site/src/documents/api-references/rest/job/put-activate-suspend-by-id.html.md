---

title: 'Activate/Suspend Job By Id'
category: 'Job'

keywords: 'put set suspension state'

---


Activate or suspend a given job by id.

Method
------

PUT `/job/{id}/suspended`

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
    <td>The id of the job to activate or suspend.</td>
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
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend a given job. When the value is set to <code>true</code>, then the given job will be suspended and when the value is set to <code>false</code>, then the given job will be activated.</td>
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

PUT `/job/aJobId/suspended`
  
    {
      "suspended" : true
    }
     
#### Response
    
Status 204. No content.