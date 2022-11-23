---

title: 'Delete Task'
weight: 370

menu:
  main:
    name: "Delete"
    identifier: "rest-api-task-delete"
    parent: "rest-api-task"
    pre: "DELETE `/task/{id}`"

---

Removes a task by id.  Only tasks that are not part of a running process or case can be deleted; only standalone tasks can be deleted.

# Method

DELETE `/task/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to be removed.</td>
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
    <td>
      Bad Request. The Task with the given id does not exist. See the 
      <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response 
      format.
    </td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>
      The Task with the given id cannot be deleted because it is part of a running process or case instance. See the 
      <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response 
      format.
    </td>
  </tr>
</table>


# Example

## Request

DELETE `/task/anId`

## Response

Status 204. No content.
