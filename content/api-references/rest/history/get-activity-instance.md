---

title: "Get Single Activity Instance (Historic)"
weight: 30

menu:
  main:
    identifier: "rest-api-history-get-activity-instance"
    parent: "rest-api-history"

---

Retrieves a single historic activity instance according to the `HistoricActivityInstance` interface
in the engine.


Method
------

GET `/history/activity-instance/{id}`

Parameters
----------

#### Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the historic activity instance to be retrieved.</td>
  </tr>
</table>


Result
------

A JSON object corresponding to the `HistoricActivityInstance` interface in the engine.
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
    <td>The id of the activity instance.</td>
  </tr>
  <tr>
    <td>parentActivityInstanceId</td>
    <td>String</td>
    <td>The id of the parent activity instance, for example a sub process instance.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>String</td>
    <td>The id of the activity that this object is an instance of.</td>
  </tr>
  <tr>
    <td>activityName</td>
    <td>String</td>
    <td>The name of the activity that this object is an instance of.</td>
  </tr>
  <tr>
    <td>activityType</td>
    <td>String</td>
    <td>The type of the activity that this object is an instance of.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>String</td>
    <td>The key of the process definition that this activity instance belongs to.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition that this activity instance belongs to.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance that this activity instance belongs to.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>String</td>
    <td>The id of the execution that executed this activity instance.</td>
  </tr>
  <tr>
    <td>taskId</td>
    <td>String</td>
    <td>The id of the task that is associated to this activity instance. Is only set if the activity is a user task.</td>
  </tr>
  <tr>
    <td>assignee</td>
    <td>String</td>
    <td>The assignee of the task that is associated to this activity instance. Is only set if the activity is a user task.</td>
  </tr>
  <tr>
    <td>calledProcessInstanceId</td>
    <td>String</td>
    <td>The id of the called process instance. Is only set if the activity is a call activity and the called instance a process instance.</td>
  </tr>
  <tr>
    <td>calledCaseInstanceId</td>
    <td>String</td>
    <td>The id of the called case instance. Is only set if the activity is a call activity and the called instance a case instance.</td>
  </tr>
  <tr>
    <td>startTime</td>
    <td>String</td>
    <td>The time the instance was started. Has the format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
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
    <td>canceled</td>
    <td>Boolean</td>
    <td>If true, this activity instance is canceled.</td>
  </tr>
  <tr>
    <td>completeScope</td>
    <td>Boolean</td>
    <td>If true, this activity instance did complete a BPMN 2.0 scope </td>
  </tr>
</table>


Response codes
--------------

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
    <td>Historic activity instance with given id does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/history/activity-instance/aActivityInstId`

#### Response

```json
{
  "id": "aActivityInstId",
  "activityId": "anActivity",
  "activityName": "anActivityName",
  "activityType": "userTask",
  "assignee": "peter",
  "calledProcessInstanceId": "aHistoricCalledProcessInstanceId",
  "calledCaseInstanceId": null,
  "canceled": true,
  "completeScope": false,
  "durationInMillis": 2000,
  "endTime": "2013-04-23T18:42:43",
  "executionId": "anExecutionId",
  "parentActivityInstanceId": "aHistoricParentActivityInstanceId",
  "processDefinitionId": "aProcDefId",
  "processInstanceId": "aProcInstId",
  "startTime": "2013-04-23T11:20:43",
  "taskId": "aTaskId"
}
```
