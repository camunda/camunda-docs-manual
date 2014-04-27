---

title: 'Get Single Task Comment'
category: 'Task'

keywords: 'get single task comment'

---


Retrieves a single task comment by task id and comment id.


Method
------

GET `/task/{id}/comment/{commentId}`


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
    <td>The id of the task.</td>
  </tr>
  <tr>
    <td>commentId</td>
    <td>The id of the comment to be retrieved.</td>
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
    <td>Task comment with given comment id does not exist to given task. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/task/anId/comment/aTaskCommentId`

#### Response

```json
	{
        "id": "aTaskCommentId",
        "userId": userId,
        "taskId": "anId",
		"processInstanceId": "processInstanceId",
		"time": "2013-01-02T21:37:03",
		"message": "message"
    }
```	
