---

title: 'Delete a Group Member'
category: 'Group'

keywords: 'delete'

---


Removes a memeber from a group.


Method
------

DELETE `/group/{id}/members/{userId}`


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
    <td>The id of the group</td>
  </tr>
  <tr>
    <td>userId</td>
    <td>The id of user to remove from the group</td>
  </tr>
</table>

#### Request Body

Empty.


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
    <td>200</td>
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>In case an error occurs. See the <a href="#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

DELETE `/group/sales/members/jonny1`

#### Response

Status 204. No content.