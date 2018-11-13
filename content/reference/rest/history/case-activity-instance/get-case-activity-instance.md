---

title: "Get Single Case Activity Instance (Historic)"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-history-get-case-activity-instance"
    parent: "rest-api-history-case-activity-instance"
    pre: "GET `/history/case-activity-instance/{id}`"

---

Retrieves a single historic case activity instance according to the `HistoricCaseActivityInstance`
interface in the engine.


# Method

GET `/history/case-activity-instance/{id}`

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the historic case activity instance to be retrieved.</td>
  </tr>
</table>


# Result

A JSON object corresponding to the `HistoricCaseActivityInstance` interface in the engine.
Its properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the case activity instance.</td>
  </tr>
  <tr>
    <td>parentCaseActivityInstanceId</td>
    <td>String</td>
    <td>The id of the parent case activity instance.</td>
  </tr>
  <tr>
    <td>caseActivityId</td>
    <td>String</td>
    <td>The id of the case activity that this object is an instance of.</td>
  </tr>
  <tr>
    <td>caseActivityName</td>
    <td>String</td>
    <td>The name of the case activity that this object is an instance of.</td>
  </tr>
  <tr>
    <td>caseActivityType</td>
    <td>String</td>
    <td>The type of the activity this case execution belongs to.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>String</td>
    <td>The id of the case definition that this case activity instance belongs to.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>String</td>
    <td>The id of the case instance that this case activity instance belongs to.</td>
  </tr>
  <tr>
    <td>caseExecutionId</td>
    <td>String</td>
    <td>The id of the case execution that executed this case activity instance.</td>
  </tr>
  <tr>
    <td>taskId</td>
    <td>String</td>
    <td>The id of the task that is associated to this case activity instance. Is only set if the case activity is a human task.</td>
  </tr>
  <tr>
    <td>calledProcessInstanceId</td>
    <td>String</td>
    <td>The id of the called process instance. Is only set if the case activity is a process task.</td>
  </tr>
  <tr>
    <td>calledCaseInstanceId</td>
    <td>String</td>
    <td>The id of the called case instance. Is only set if the case activity is a case task.</td>
  </tr>
  <tr>
    <td>createTime</td>
    <td>String</td>
    <td>The time the instance was created. Has the format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
  </tr>
  <tr>
    <td>endTime</td>
    <td>String</td>
    <td>The time the instance ended. Has the format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
  </tr>
  <tr>
    <td>durationInMillis</td>
    <td>Number</td>
    <td>The time the instance took to finish (in milliseconds).</td>
  </tr>
  <tr>
    <td>required</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is required.</td>
  </tr>
  <tr>
    <td>repeatable</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is repeatable.</td>
  </tr>
  <tr>
    <td>repetition</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is a repetition.</td>
  </tr>
  <tr>
    <td>available</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is available.</td>
  </tr>
  <tr>
    <td>enabled</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is enabled.</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is disabled.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is active.</td>
  </tr>
  <tr>
    <td>failed</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is failed.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is suspended.</td>
  </tr>
  <tr>
    <td>completed</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is completed.</td>
  </tr>
  <tr>
    <td>terminated</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is terminated.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the case activity instance.</td>
  </tr>
</table>


# Response Codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Historic case activity instance with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/history/case-activity-instance/aCaseActivityInstId`

## Response

```json
{
  "active": false,
  "available": true,
  "calledCaseInstanceId": "aHistoricCalledCaseInstanceId",
  "calledProcessInstanceId": "aHistoricCalledProcessInstanceId",
  "caseActivityId": "aCaseActivity",
  "caseActivityName": "aCaseActivityName",
  "caseDefinitionId": "aCaseDefId",
  "caseExecutionId": "aCaseExecutionId",
  "caseInstanceId": "aCaseInstId",
  "completed": false,
  "createTime": "2013-04-23T11:20:43",
  "disabled": false,
  "durationInMillis": 2000,
  "enabled": false,
  "endTime": "2013-04-23T18:42:43",
  "failed": false,
  "id": "aCaseActivityInstId",
  "parentCaseActivityInstanceId": "aHistoricParentCaseActivityInstanceId",
  "suspended": false,
  "taskId": "aTaskId",
  "terminated": false,
  "required": false,
  "repeatable": true,
  "repetition": false,
  "tenantId": null
}
```
