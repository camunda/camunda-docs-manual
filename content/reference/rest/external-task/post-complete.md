---

title: 'Complete External Task'
weight: 70

menu:
  main:
    name: "Complete"
    identifier: "rest-api-external-task-post-complete"
    parent: "rest-api-external-task"
    pre: "POST `/external-task/{id}/complete`"

---


Complete an external task and update process variables.


# Method

POST `/external-task/{id}/complete`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to complete.</td>
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
    <td>workerId</td>
    <td>The id of the worker that completes the task. Must match the id of the worker who has most recently locked the task.</td>
  </tr>
  <tr>
    <td>variables</td>
    <td><p>A JSON object containing variable key-value pairs. Each key is a variable name and each value a JSON variable value object with the following properties:</p>
    {{< rest-var-request >}}
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
    <td>Returned if the task's most recent lock was not acquired by the provided worker. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Returned if the task does not exist. This could indicate a wrong task id as well as a cancelled task, e.g. due to a caught BPMN boundary event. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>Returned if the corresponding process instance could not be resumed successfully. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

POST `/external-task/anId/complete`

Request Body:

    {
      "workerId": "aWorker",
      "variables":
          {"aVariable": {"value": "aStringValue"},
          "anotherVariable": {"value": 42},
          "aThirdVariable": {"value": true}}
    }

## Response

Status 204. No content.
