---

title: 'Post Task Attachment'
weight: 210

menu:
  main:
    name: "Create"
    identifier: "rest-api-task-post-task-attachments"
    parent: "rest-api-task-attachment"
    pre: "POST `/task/{id}/attachment/create`"

---

Create an attachment for a task.

# Method

POST `/task/{id}/attachment/create`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to add the attachment to.</td>
  </tr>
</table>

## Request Body

A multipart form submit with the following parts:

<table class="table table-striped">
  <tr>
    <th>Form Part Name</th>
    <th>Content Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>attachment-name</td>
    <td>text/plain</td>
    <td>The name of the attachment.</td>
  </tr>
  <tr>
    <td>attachment-description</td>
    <td>text/plain</td>
    <td>The description of the attachment.</td>
  </tr>
  <tr>
    <td>attachment-type</td>
    <td>text/plain</td>
    <td>The type of the attachment.</td>
  </tr>
  <tr>
    <td>url</td>
    <td>text/plain</td>
    <td>The url to the remote content of the attachment.</td>
  </tr>
  <tr>
    <td>content</td>
    <td>text/plain</td>
    <td>The content of the attachment.</td>
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
</table>


# Response codes

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
    <td>The task does not exists or task id is null. No content or url to remote content exists. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>The history of the engine is disabled. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

Post data for a new task attachment:

POST `/task/aTaskId/attachment/create`


```
------------------------------925df49a954b
Content-Disposition: form-data; name="url"

http://my-attachment-content-url.de
------------------------------925df49a954b
Content-Disposition: form-data; name="attachment-name"

attachmentName
------------------------------925df49a954b
Content-Disposition: form-data; name="attachment-description"

attachmentDescription
------------------------------925df49a954b
Content-Disposition: form-data; name="attachment-type"

attachmentType
------------------------------925df49a954b--
```

## Response

Status 200.

```json
{
  "links": [
    {
      "method": "GET",
      "href": "http://localhost:38080/rest-test/task/aTaskId/attachment/aTaskAttachmentId",
      "rel": "self"
    }
  ],
    "id": "attachmentId",
    "name": "attachmentName",
    "taskId": "aTaskId",
    "description": "attachmentDescription",
    "type": "attachmentType",
	"url": "http://my-attachment-content-url.de"
}
```
