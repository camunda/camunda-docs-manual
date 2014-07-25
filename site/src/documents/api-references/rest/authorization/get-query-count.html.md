---

title: 'Get Authorizations Count'
category: 'Authorization'

keywords: 'get'

---


Query for authorizations using a list of parameters and retrieve the count.


Method
------

GET `/authorization/count`


Parameters
----------  
  
#### Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Filter by the id of the authorization.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>Filter by the type of the authorization.</td>
  </tr>
  <tr>
    <td>userIdIn</td>
    <td>Filter by a comma-seperated list of userIds</td>
  </tr>
  <tr>
    <td>groupIdIn</td>
    <td>Filter by a comma-seperated list of groupIds</td>
  </tr>
  <tr>
    <td>resourceType</td>
    <td>Filter by resource type</td>
  </tr> 
  <tr>
    <td>resourceId</td>
    <td>Filter by resource Id.</td>
  </tr>   
</table>


Result
------

A JSON object that contains the count as the only property.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>count</td>
    <td>Number</td>
    <td>The number of matching authorizations.</td>
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
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code> is specified. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/authorization/count?userIdIn=jonny1,jonny2`
  
#### Response

Status 200.

    {"count": 2}
