Create Group Member
===================

Add a member to a group.


Method
------

POST `/group/{id}/members/create`


Parameters
----------

#### Request Body

A json object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>userId</td>
    <td>String</td>
    <td>The id of the user to add to the group.</td>
  </tr>  
</table>


Result
------

None.

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
    <td>Empty</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>In case an internal error occurs. See the <a href="/api-references/rest/#!/overview/introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

POST `/group/sales/members/create`

Request body:

    {"userId":"jonny1"}

#### Response

None.
