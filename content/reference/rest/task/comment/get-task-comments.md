---

title: 'Get Task Comments'
weight: 160

menu:
  main:
    name: "Get List"
    identifier: "rest-api-task-get-task-comments"
    parent: "rest-api-task-comment"
    pre: "GET `/task/{id}/comment`"

---


Gets the comments for a task.


# Method

GET `/task/{id}/comment`


# Parameters

## Path Parameters

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

# Result

A JSON object containing a list of task comments.

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
</table>


# Response Codes

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
    <td>No task exists for the given task id. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/task/aTaskId/comment`

## Response

```json
[
  {
    "id": "commentId",
    "userId": "userId",
    "taskId": "aTaskId",
    "time": "2013-01-02T21:37:03",
    "message": "message"
  },
  {
    "id": "anotherCommentId",
    "userId": "anotherUserId",
    "taskId": "aTaskId",
    "time": "2013-02-23T20:37:43",
    "message": "anotherMessage"
  },
  {
    "id": "yetAnotherCommentId",
    "userId": "yetAnotherUserId",
    "taskId": "aTaskId",
    "time": "2013-04-21T10:15:23",
    "message": "yetAnotherMessage"
  }
]
```
