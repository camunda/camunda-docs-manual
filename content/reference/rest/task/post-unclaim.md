---

title: 'Unclaim Task'
weight: 70

menu:
  main:
    name: "Unclaim"
    identifier: "rest-api-task-post-unclaim"
    parent: "rest-api-task"
    pre: "POST `/task/{id}/unclaim`"

---


Resets a task's assignee. If successful, the task is not assigned to a user.


# Method

POST `/task/{id}/unclaim`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to unclaim.</td>
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
    <td>400</td>
    <td>application/json</td>
    <td>Task with given id does not exist. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/task/anId/unclaim`

## Response

Status 204. No content.