---

title: 'Delete Task Attachment'
weight: 230

menu:
  main:
    name: "Delete"
    identifier: "rest-api-task-delete-task-attachment"
    parent: "rest-api-task-attachment"
    pre: "DELETE `/task/{id}/attachment/{attachmentId}`"

---


Removes an attachment from a task by id.


# Method

DELETE `/task/{id}/attachment/{attachmentId}`


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
    <td>The id of the attachment to be removed.</td>
  </tr>
</table>


# Result

This method returns no content.


# Response Codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td></td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>The history of the engine is disabled. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Task attachment for given task id and attachment id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

DELETE `/task/aTaskId/attachment/aTaskAttachmentId`

## Response

Status 204. No content.
