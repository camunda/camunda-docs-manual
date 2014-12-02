---

title: 'Add Identity Link'
category: 'Task'

keywords: 'post identitylink add'

---


Adds an identity link to a task. Can be used to link any user or group to a task and specify and relation.


Method
------

POST `/task/{id}/identity-links`


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
    <td>The id of the task to add a link to.</td>
  </tr>
</table>


#### Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>userId</td>
    <td>The id of the user to link to the task. If you set this parameter, you have to omit <code>groupId</code>.</td>
  </tr>
  <tr>
    <td>groupId</td>
    <td>The id of the group to link to the task. If you set this parameter, you have to omit <code>userId</code>.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>Sets the type of the link. Must be provided.</td>
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
    <td>Task with given id does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

POST `/task/anId/identity-links`

Request body:

    {"groupId": "aNewGroupId", "type": "candidate"}

#### Response

Status 204. No content.
