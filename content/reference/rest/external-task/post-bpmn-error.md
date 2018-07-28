---

title: 'Handle External Task BPMN Error'
weight: 80

menu:
  main:
    name: "Handle BPMN Error"
    identifier: "rest-api-external-task-post-bpmn-error"
    parent: "rest-api-external-task"
    pre: "POST `/external-task/{id}/bpmnError`"

---


Reports a business error in the context of a running external task by id. The error code must be specified to identify the BPMN error handler.

# Method

POST `/external-task/{id}/bpmnError`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the external task in which context a BPMN error is reported.</td>
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
    <td>errorCode</td>
    <td>A error code that indicates the predefined error. Is used to identify the BPMN error handler.</td>
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

POST `/external-task/anId/bpmnError`

Request Body:

    {
      "workerId": "aWorker",
      "errorCode": "bpmn-error"
    }

## Response

Status 204. No content.
