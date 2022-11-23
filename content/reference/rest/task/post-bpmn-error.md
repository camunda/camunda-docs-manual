---

title: "Handle Task BPMN Error"
weight: 360

menu:
  main:
    name: "Handle BPMN Error"
    identifier: "rest-api-task-post-bpmn-error"
    parent: "rest-api-task"
    pre: "POST `/task/{id}/bpmnError`"

---

Reports a business error in the context of a running task by id. The error code must be specified to identify the BPMN error handler. See the documentation for [Reporting Bpmn Error]({{< ref "/reference/bpmn20/tasks/user-task.md#reporting-bpmn-error" >}}) in User Tasks.

# Method

POST `/task/{id}/bpmnError`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task a BPMN error is reported for.</td>
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
    <td>errorCode</td>
    <td>An error code that indicates the predefined error. It is used to identify the BPMN error handler.</td>
  </tr>
  <tr>
    <td>errorMessage</td>
    <td>An error message that describes the error.</td>
  </tr>
  <tr>
    <td>variables</td>
    <td>A JSON object containing the variables which will be passed to the execution. Each key corresponds to a variable name and each value to a variable value. A variable value is a JSON object with the following properties:
    {{< rest-var-request transient="true">}}
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
    <td>Returned if the <code>errorCode</code> or <code>id</code> are not present in the request. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>If the authenticated user is unauthorized to update the task. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Returned if the task does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

POST `/task/aTaskId/bpmnError`

Request Body:
```json
    {
      "errorCode": "bpmn-error-543",
      "errorMessage": "anErrorMessage",
      "variables": {
          "aVariable" : {
              "value" : "aStringValue",
              "type": "String"
          },
          "anotherVariable" : {
              "value" : true,
              "type": "Boolean"
          }
      }
    }
```
## Response

Status 204. No content.
