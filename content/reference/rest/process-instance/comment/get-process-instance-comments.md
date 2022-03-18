---

title: 'Get Process Instance Comments'
weight: 160

menu:
  main:
    name: "Get List"
    identifier: "rest-api-process-instance-get-process-instance-comments"
    parent: "rest-api-process-instance-comment"
    pre: "GET `/process-instance/{id}/comment`"

---


Gets the comments for a process instance by id.


# Method

GET `/process-instance/{id}/comment`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process instance to retrieve the comments for.</td>
  </tr>
</table>

# Result

A JSON object containing a list of task comments.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Type</th>
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
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance the comment is related to.</td>
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
    <td>removalTime</td>
    <td>String</td>
    <td>The time after which the comment should be removed by the History Cleanup job. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>rootProcessInstanceId</td>
    <td>String</td>
    <td>The process instance id of the root process instance that initiated the process containing the task.</td>
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
    <td>No process instance exists for the given process instance id. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/process-instance/aProcessInstanceId/comment`

## Response

```json
[
  {
    "id": "commentId",
    "userId": "userId",
    "taskId": "aTaskId",
    "processInstanceId": "aProcessInstanceId",
    "time": "2013-01-02T21:37:03.764+0200",
    "message": "message",
    "removalTime":"2018-02-10T14:33:19.000+0200",
    "rootProcessInstanceId": "aRootProcessInstanceId"
  },
  {
    "id": "anotherCommentId",
    "userId": "anotherUserId",
    "taskId": "aTaskId",
    "processInstanceId": "aProcessInstanceId",
    "time": "2013-02-23T20:37:43.975+0200",
    "message": "anotherMessage",
    "removalTime":"2018-02-10T14:33:19.000+0200",
    "rootProcessInstanceId": "aRootProcessInstanceId"
  },
  {
    "id": "yetAnotherCommentId",
    "userId": "yetAnotherUserId",
    "taskId": "aTaskId",
    "processInstanceId": "aProcessInstanceId",
    "time": "2013-04-21T10:15:23.764+0200",
    "message": "yetAnotherMessage",
    "removalTime":"2018-02-10T14:33:19.000+0200",
    "rootProcessInstanceId": "aRootProcessInstanceId"
  }
]
```
