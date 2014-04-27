---

title: 'Get Task Comments'
category: 'Task'

keywords: 'get task comments'

---


Gets the comments for a task.


Method
------

GET `/task/{id}/comment`


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
    <td>The id of the task to retrieve the comments for.</td>
  </tr>
</table>

Result
------

A json object containing a list of task comments.

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
    <td>400</td>
    <td>application/json</td>
    <td>No comments exist for given task id. See the <a href="#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/task/anId/comment`

#### Response

```json
    [{
        "id": "commentId",
        "userId": userId,
        "taskId": "anId",
		"processInstanceId": "processInstanceId",
		"time": "2013-01-02T21:37:03",
		"message": "message"
    },
    {
        "id": "anotherCommentId",
        "userId": anotherUserId,
        "taskId": "anId",
		"processInstanceId": "processInstanceId",
		"time": "2013-02-23T20:37:43",
		"message": "anotherMessage"
    },
    {
        "id": "yetAnotherCommentId",
        "userId": yetAnotherUserId,
        "taskId": "anId",
		"processInstanceId": "processInstanceId",
		"time": "2013-04-21T10:15:23",
		"message": "yetAnothermMssage"
    }]
```