---

title: 'Get Task Comment'
weight: 170

menu:
  main:
    name: "Get"
    identifier: "rest-api-task-get-task-comment"
    parent: "rest-api-task-comment"
    pre: "GET `/task/{id}/comment/{commentId}`"

---


Retrieves a task comment by task id and comment id.


# Method

GET `/task/{id}/comment/{commentId}`


# Parameters

## Path Parameters

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


# Result

A JSON object corresponding to the `Comment` interface in the engine.
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
    <td>The task or comment with given task and comment id do not exist, or the history of the engine is disabled. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/task/aTaskId/comment/aTaskCommentId`

## Response

```json
{
  "id": "aTaskCommentId",
  "userId": "userId",
  "taskId": "aTaskId",
  "time": "2013-01-02T21:37:03.664+0200",
  "message": "comment content"
}
```
