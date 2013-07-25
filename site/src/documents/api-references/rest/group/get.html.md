Get Single Group by ID
=====================

Retrieves a single group.


Method
------

GET `/group/{id}`


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
    <td>The id of the group to be retrieved.</td>
  </tr>
</table>


Result
------

A json array of group objects.
Each group object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the group.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the group.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>The type of the group.</td>
  </tr> 
  <tr>
    <td>links</td>
    <td>Object</td>
    <td>A json array containing links to interact with the resource. The links contain only operations that the currently authenticated user would be authorized to perform.</td>
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
    <td>Execution with given id does not exist. See the <a href="/api-references/rest/#!/overview/introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

GET `/group/sales`
  
#### Response

Status 200.

    {"id":"sales",
     "name":"Sales",
     "type":"Organizational Unit",
     "links":[
        {"method": "GET", href":"http://localhost:8080/engine-rest/group/sales", "rel":"self"},
        {"method": "PUT", href":"http://localhost:8080/engine-rest/group/sales", "rel":"update"},
        {"method": "DELETE", href":"http://localhost:8080/engine-rest/group/sales", "rel":"delete"}
      ]}