---

title: 'Get Task Attachment Content (binary)'
weight: 220

menu:
  main:
    name: "Get (Binary)"
    identifier: "rest-api-task-get-task-attachment-data"
    parent: "rest-api-task-attachment"
    pre: "GET `/task/{id}/attachment/{attachmentId}/data`"

---

Retrieves the binary content of a task attachment by task id and attachment id.


# Method

GET `/task/{id}/attachment/{attachmentId}/data`


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

Byte Stream.

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
    <td>The attachment content for given task and attachment id does not exist or the history of the engine is disabled. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/task/aTaskId/attachment/aTaskAttachmentId/data`

## Response

Status 200.
Byte Stream.
