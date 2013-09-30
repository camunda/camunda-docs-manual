---

title: 'Activate/Suspend Process Instance'
category: 'Process Instance'

keywords: 'put set suspension state'

---


Activate or suspend a given process instance.

Method
------

PUT `/process-instance/{id}/suspended`

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
    <td>The id of the process instance to activate or suspend.</td>
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
    <td>A `Boolean` value which indicates whether to activate or suspend a given process instance. When the value is set to `true`, then the given process instance will be suspended and when the value is set to `false`, then the given process instance will be activated.</td>
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
    <td>404</td>
    <td>application/json</td>
    <td>Process instance with given id does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>    
</table>

  
Example
-------

#### Request

PUT `/process-instance/aProcessInstanceId/suspended`
  
    {"suspended" : true}
     
#### Response
    
Status 204. No content.