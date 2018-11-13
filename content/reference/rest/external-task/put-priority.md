---

title: 'Set External Task Priority'
weight: 100

menu:
  main:
    name: "Set Priority"
    identifier: "rest-api-external-task-put-priority"
    parent: "rest-api-external-task"
    pre: "PUT `/external-task/{id}/priority`"

---


Set the priority of an existing external task. The default value of a priority is 0.


# Method

PUT `/external-task/{id}/priority`

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the external task to set the priority for.</td>
  </tr>
</table>

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>priority</td>
    <td>The priority of the external task.</td>
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
    <td>Returned if the task does not exist. This could indicate a wrong task id as well as a cancelled task, e.g., due to a caught BPMN boundary event. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

PUT `/external-task/{anId}/priority`

Request Body:

    {
      "priority": 5
    }

## Response

Status 204. No content.
