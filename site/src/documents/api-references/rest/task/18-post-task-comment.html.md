---

title: 'Post Task Comment'
category: 'Task'

keywords: 'post add task comment'

---

Create a comment for a task.

Method
------

POST `/task/{id}/comment/create`


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
    <td>The id of the task to add the comment to.</td>
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
    <td>message</td>
    <td>The message of the task comment to create. Has to be of type <code>String</code>.</td>
  </tr>
</table>


Result
------

A JSON object representing the newly created comment. Its structure corresponds to the `Comment` interface in the engine.
Its properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the task comment.</td>
  </tr>
  <tr>
    <td>userId</td>
    <td>String</td>
    <td>The id of the user who created the comment.</td>
  </tr>
  <tr>
    <td>taskId</td>
    <td>String</td>
    <td>The id of the task to which the comment belongs.</td>
  </tr>
  <tr>
    <td>time</td>
    <td>Date</td>
    <td>The time when the comment was created.</td>
  </tr>
  <tr>
    <td>message</td>
    <td>String</td>
    <td>The content of the comment.</td>
  </tr>
  <tr>
    <td>links</td>
    <td>List</td>
    <td>Link to the newly created task comment with <code>method</code>, <code>href</code> and <code>rel</code>.</td>
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
    <td>The task does not exist or no comment message was submitted. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>The history of the engine is disabled. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

Post data for a new task comment:

POST `/task/aTaskId/comment/create`

    {"message": "a task comment"}

#### Response

Status 200.

```json
{
  "links": [
    {
      "method": "GET",
      "href": "http://localhost:38080/rest-test/task/aTaskId/comment/aTaskCommentId",
      "rel": "self"
    }
  ],
  "id": "aTaskCommentId",
  "userId": "userId",
  "taskId": "aTaskId",
  "time": "2013-01-02T21:37:03",
  "message": "comment message"
}
```
