---

title: 'Get Task Attachments'
weight: 190

menu:
  main:
    name: "Get List"
    identifier: "rest-api-task-get-task-attachments"
    parent: "rest-api-task-attachment"
    pre: "GET `/task/{id}/attachment`"

---


Gets the attachments for a task.


# Method

GET `/task/{id}/attachment`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to retrieve the attachments for.</td>
  </tr>
</table>

# Result

A JSON object containing a list of task attachments.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the task attachment.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the task attachment.</td>
  </tr>
  <tr>
    <td>taskId</td>
    <td>String</td>
    <td>The id of the task to which the attachment belongs.</td>
  </tr>
  <tr>
    <td>description</td>
    <td>String</td>
    <td>The description of the task attachment.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>Indication of the type of content that this attachment refers to. Can be MIME type or any other indication.</td>
  </tr>
  <tr>
    <td>url</td>
    <td>String</td>
    <td>The url to the remote content of the task attachment.</td>
  </tr>
  <tr>
    <td>createTime</td>
    <td>String</td>
    <td>The time the variable was inserted. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>removalTime</td>
    <td>String</td>
    <td>The time after which the attachment should be removed by the History Cleanup job. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>rootProcessInstanceId</td>
    <td>String</td>
    <td>The process instance id of the root process instance that initiated the process containing the task.</td>
  </tr>
</table>

\* For further information, please see the <a href="{{< relref "reference/rest/overview/date-format.md" >}}"> documentation</a>.

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
    <td>No task exists for the given task id. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/task/aTaskId/attachment`

## Response

```json
[
  {
    "id": "attachmentId",
    "name": "attachmentName",
    "taskId": "aTaskId",
    "description": "attachmentDescription",
    "type": "attachmentType",
    "url": "http://my-attachment-content-url.de",
    "createTime":"2017-02-10T14:33:19.000+0200",
    "removalTime":"2018-02-10T14:33:19.000+0200",
    "rootProcessInstanceId": "aRootProcessInstanceId"
  },
  {
    "id": "anotherAttachmentId",
    "name": "anotherAttachmentName",
    "taskId": "aTaskId",
    "description": "anotherAttachmentDescription",
    "type": "anotherAttachmentType",
    "url": "http://my-another-attachment-content-url.de",
    "createTime":"2017-02-10T14:33:19.000+0200",
    "removalTime":"2018-02-10T14:33:19.000+0200",
    "rootProcessInstanceId": "aRootProcessInstanceId"
  },
  {
    "id": "yetAnotherAttachmentId",
    "name": "yetAnotherAttachmentName",
    "taskId": "aTaskId",
    "description": "yetAnotherAttachmentDescription",
    "type": "yetAnotherAttachmentType",
    "url": "http://yet-another-attachment-content-url.de",
    "createTime":"2017-02-10T14:33:19.000+0200",
    "removalTime":"2018-02-10T14:33:19.000+0200",
    "rootProcessInstanceId": "aRootProcessInstanceId"
  }
]
```
