---

title: 'Claim Task'
category: 'Task'

keywords: 'post'

---


Claim a task for a specific user.

**Note:** The difference with [set a assignee](#task-set-assignee) is that here a check is done if the task already has a user assigned to it.

Method
------

POST `/task/{id}/claim`


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
    <td>The id of the task to claim.</td>
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
    <td>userId</td>
    <td>The id of the user that claims the task.</td>
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
    <td>500</td>
    <td>application/json</td>
    <td>Task with given id does not exist or claiming was not successful. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
--------------

#### Request

POST `/task/anId/claim`

Request body:

    {"userId": "aUserId"}

#### Response

Status 204. No content.