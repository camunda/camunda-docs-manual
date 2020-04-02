---

title: 'Delete Process Instance'
weight: 20

menu:
  main:
    name: "Delete"
    identifier: "rest-api-process-instance-delete"
    parent: "rest-api-process-instance"
    pre: "DELETE `/process-instance/{id}`"

---


Deletes a running process instance by id.


# Method

DELETE `/process-instance/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process instance to be deleted.</td>
  </tr>
</table>

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>skipCustomListeners</td>
    <td>
      If set to <code>true</code>, the custom listeners will be skipped.
    </td>
  </tr>
  <tr>
    <td>skipIoMappings</td>
    <td>
      If set to <code>true</code>, the input/output mappings will be skipped.
    </td>
  </tr>
  <tr>
    <td>skipSubprocesses</td>
    <td>
      If set to <code>true</code>, subprocesses related to deleted processes will be skipped.</td>
  </tr>
  <tr>
    <td>failIfNotExists</td>
    <td>If set to <code>false</code>, the request will still be successful if the process id is not found.</td>
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
    <td>404</td>
    <td>application/json</td>
    <td>Process instance with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

DELETE `/process-instance/aProcessInstanceId`

## Response

Status 204. No content.
