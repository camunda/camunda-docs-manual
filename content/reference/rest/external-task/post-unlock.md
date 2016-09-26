---

title: 'Handle External Task Failure'
weight: 90

menu:
  main:
    name: "Unlock"
    identifier: "rest-api-external-task-post-unlock"
    parent: "rest-api-external-task"
    pre: "POST `/external-task/{id}/unlock`"

---


Unlock an external task. Clears the task's lock expiration time and worker id.

# Method

POST `/external-task/{id}/unlock`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the external task to unlock.</td>
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
    <td>Returned if the task does not exist. This could indicate a wrong task id as well as a cancelled task, e.g., due to a caught BPMN boundary event. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

POST `/external-task/anId/unlock`

## Response

Status 204. No content.
