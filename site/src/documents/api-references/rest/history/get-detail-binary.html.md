---

title: "Get Single Historic Detail (Binary)"
category: 'History'

keywords: 'get'

---

Retrieves the content of a single historic variable update by id. Applicable for variables that are serialized as binary data.


Method
------

GET `/history/detail/{id}/data`


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
    <td>The id of the historic variable update.</td>
  </tr>
</table>


Result
------

Byte stream.

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
    <td>application/octet-stream</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>Detail with given id exists but is not a binary variable. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Detail with given id does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

GET `/history/detail/someId/data`
  
#### Response

Status 200.

Byte Stream.