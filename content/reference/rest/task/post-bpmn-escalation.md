---

title: "Handle Task BPMN Escalation"
weight: 360

menu:
  main:
    name: "Handle BPMN Escalation"
    identifier: "rest-api-task-post-bpmn-escalation"
    parent: "rest-api-task"
    pre: "POST `/task/{id}/bpmnEscalation`"

---

Reports an escalation in the context of a running task by id. The escalation code must be specified to identify the escalation handler. See the documentation for [Reporting Bpmn Escalation]({{< ref "/reference/bpmn20/tasks/user-task.md#reporting-bpmn-escalation" >}}) in User Tasks.

# Method

POST `/task/{id}/bpmnEscalation`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task in which context a BPMN escalation is reported.</td>
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
    <td>escalationCode</td>
    <td>An escalation code that indicates the predefined escalation. It is used to identify the BPMN escalation handler.</td>
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
    <td>403</td>
    <td>application/json</td>
    <td>If the authenticated user is unauthorized to update the process instance. See the <a href="{{< ref "/reference/rest/overview/_index.md#escalation-handling" >}}">Introduction</a> for the escalation response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Returned if the task does not exist or <code>escalationCode</code> is not presented in the request. See the <a href="{{< ref "/reference/rest/overview/_index.md#escalation-handling" >}}">Introduction</a> for the escalation response format.</td>
  </tr>
</table>

# Example

## Request

POST `/task/aTaskId/bpmnEscalation`

Request Body:
```json
    {
      "escalationCode": "bpmn-escalation-432",
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
