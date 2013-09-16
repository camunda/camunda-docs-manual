---

title: 'Create Group Member'
category: 'Group'

---


Add a member to a group.

Method
------

PUT `/group/{id}/members/{userId}`

Parameters
----------

#### Request Body

None.

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
    <td>In case an internal error occurs. See the <a href="#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

PUT `/group/sales/members/jonny1`

Request body:

Empty.

#### Response

None.
