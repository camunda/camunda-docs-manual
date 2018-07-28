---

title: 'Handle External Task Failure'
weight: 80

menu:
  main:
    name: "Handle Failure"
    identifier: "rest-api-external-task-post-failure"
    parent: "rest-api-external-task"
    pre: "POST `/external-task/{id}/failure`"

---


Reports a failure to execute an external task by id. A number of retries and a timeout until the task can be retried can be specified. If retries are set to 0, an incident for this task is created.

# Method

POST `/external-task/{id}/failure`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the external task to report a failure for.</td>
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
    <td>The id of the worker that reports the failure. Must match the id of the worker who has most recently locked the task.</td>
  </tr>
  <tr>
    <td>errorMessage</td>
    <td>An message indicating the reason of the failure.</td>
  </tr>
  <tr>
    <td>errorDetails</td>
    <td>A detailed error description.</td>
  </tr>
  <tr>
    <td>retries</td>
    <td>A number of how often the task should be retried. Must be >= 0. If this is 0, an incident is created and the task cannot be fetched anymore unless the retries are increased again. The incident's message is set to the <code>errorMessage</code> parameter.</td>
  </tr>
  <tr>
    <td>retryTimeout</td>
    <td>A timeout in milliseconds before the external task becomes available again for fetching. Must be >= 0.</td>
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
    <td>Returned if the task's most recent lock was not acquired by the provided worker. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Returned if the task does not exist. This could indicate a wrong task id as well as a cancelled task, e.g., due to a caught BPMN boundary event. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>Returned if the corresponding process instance could not be resumed successfully. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

POST `/external-task/anId/failure`

Request Body:

    {
      "workerId": "aWorker",
      "errorMessage": "Does not compute",
      "retries": 3,
      "retryTimeout": 60000
    }

## Response

Status 204. No content.
