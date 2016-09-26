---

title: 'Set External Task Retries'
weight: 100

menu:
  main:
    name: "Set Retries"
    identifier: "rest-api-external-task-put-failure"
    parent: "rest-api-external-task"
    pre: "PUT `/external-task/{id}/retries`"

---


Set the number of retries left to execute an external task. If retries are set to 0, an incident is created.

# Method

PUT `/external-task/{id}/retries`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the external task to set the number of retries for.</td>
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
    <td>retries</td>
    <td>The number of retries to set for the external task.  Must be >= 0. If this is 0, an incident is created and the task cannot be fetched anymore unless the retries are increased again.</td>
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

PUT `/external-task/anId/retries`

Request Body:

    {
      "retries": 123
    }

## Response

Status 204. No content.
