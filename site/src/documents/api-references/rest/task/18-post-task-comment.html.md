---

title: 'Post Task Comment'
category: 'Task'

keywords: 'post add task comment'

---

Create a comment to a task.

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
    <td>The id of the task to add the comment.</td>
  </tr>
</table>

#### Request Body

A multipart form submit with the following parts:

<table class="table table-striped">
  <tr>
    <th>Form Part Name</th>
    <th>Content Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>process-instance-id</td>
    <td>text/plain</td>
    <td>The id of the process instance this task belongs to.</td>
  </tr>
  <tr>
    <td>message</td>
    <td>text/plain</td>
    <td>The content of the comment.</td>
  </tr>
</table>


Result
------

A json object corresponding to the `Comment` interface in the engine.
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
    <td>The id of the user which has created the comment.</td>
  </tr>
  <tr>
    <td>taskId</td>
    <td>String</td>
    <td>The id of the task to which the comment belongs.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance this task belongs to.</td>
  </tr>
  <tr>
    <td>time</td>
    <td>Date</td>
    <td>The time when the comment was created.</td>
  </tr>
  <tr>
    <td>fullMessage</td>
    <td>String</td>
    <td>The content of the comment.</td>
  </tr>  
  <tr>
    <td>links</td>
    <td>List</td>
    <td>Link to the new created task comment with <code>method</code>, <code>href</code> and <code>rel</code>.</td>
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
</table>


Example
-------

#### Request

Post data for a new task comment:

POST `/task/anId/comment/create`

#### Response

Status 200.

```json
{
  "links": [
    {
      "method": "GET",
      "href": "http://localhost:38080/rest-test/task/anId/comment/aTaskCommentId",
      "rel": "self"
    }
  ],
  "id": "aTaskCommentId",
  "userId": userId,
  "taskId": "anId",
  "processInstanceId": "processInstanceId",
  "time": "2013-01-02T21:37:03",
  "message": "message"
}
```
