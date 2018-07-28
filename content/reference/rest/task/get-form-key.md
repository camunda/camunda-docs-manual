---

title: 'Get Form Key'
weight: 50

menu:
  main:
    identifier: "rest-api-task-get-form-key"
    parent: "rest-api-task"
    pre: "GET `/task/{id}/form`"

---


Retrieves the form key for a task. The form key corresponds to the `FormData#formKey` property in the engine.
This key can be used to do task-specific form rendering in client applications. Additionally, the context path of the containing process application is returned.


# Method

GET `/task/{id}/form`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to retrieve the form for.</td>
  </tr>
</table>


# Result

A JSON object containing the form key.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>key</td>
    <td>String</td>
    <td>The form key for the task.</td>
  </tr>
  <tr>
    <td>contextPath</td>
    <td>String</td>
    <td>The process application's context path the task belongs to. If the task does not belong to a process application deployment or a process definition at all, this property is not set.</td>
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
    <td>400</td>
    <td>application/json</td>
    <td>Task with given id does not exist. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/task/anId/form`

## Response

    {"key":"aFormKey",
    "contextPath":"http://localhost:8080/my-process-application/"}