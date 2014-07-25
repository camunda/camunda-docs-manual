---

title: 'Update group'
category: 'Group'

keywords: 'put'

---


Updates a given group.


Method
------

PUT `/group/{id}`


Parameters
----------

#### Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the group.</td>
  </tr>
</table>


#### Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Type</th>
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
    <td>403</td>
    <td>application/json</td>
    <td>Identity service is read-only (Cannot modify users / groups / memberships).</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>If the group with the requested Id cannot be found.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The group could not be updated due to an internal server error. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

PUT `/group/sales`

Request body:

    {"id":"sales",
     "name":"Sales",
     "type":"Organizational Unit"}

#### Response

Status 204. No content.
