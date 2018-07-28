---

title: 'Get Task Attachment'
weight: 200

menu:
  main:
    name: "Get"
    identifier: "rest-api-task-get-task-attachment"
    parent: "rest-api-task-attachment"
    pre: "GET `/task/{id}/attachment/{attachmentId}`"

---


Retrieves a task attachment by task id and attachment id.


# Method

GET `/task/{id}/attachment/{attachmentId}`


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
    <td>attachmentId</td>
    <td>The id of the attachment to be retrieved.</td>
  </tr>
</table>


# Result

A JSON object corresponding to the `Attachment` interface in the engine.
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
    <td>The attachment for given task and attachment id does not exist or the history of the engine is disabled. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/task/aTaskId/attachment/aTaskAttachmentId`

## Response

```json
{
    "id": "attachmentId",
    "name": "attachmentName",
    "taskId": "aTaskId",
    "description": "attachmentDescription",
    "type": "attachmentType",
    "url": "http://my-attachment-content-url.de",
    "createTime":"2017-02-10T14:33:19.000+0200"
}
```
