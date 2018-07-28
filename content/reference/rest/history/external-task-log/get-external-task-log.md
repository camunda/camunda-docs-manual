---

title: "Get External Task Log"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-history-get-external-task-log"
    parent: "rest-api-history-external-task-log"
    pre: "GET `/history/external-task-log/{id}`"

---


Retrieves a historic external task log by id.


# Method

GET `/history/external-task-log/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the log entry.</td>
  </tr>
</table>


# Result

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the log entry.</td>
  </tr>
  <tr>
    <td>externalTaskId</td>
    <td>String</td>
    <td>The id of the external task.</td>
  </tr>
  <tr>
    <td>timestamp</td>
    <td>String</td>
    <td>The time when the log entry has been written.</td>
  </tr>
  <tr>
    <td>topicName</td>
    <td>String</td>
    <td>The topic name of the associated external task.</td>
  </tr>
  <tr>
    <td>workerId</td>
    <td>String</td>
    <td>The id of the worker that posessed the most recent lock.</td>
  </tr>
  <tr>
    <td>retries</td>
    <td>Number</td>
    <td>The number of retries the associated external task has left.</td>
  </tr>
  <tr>
    <td>priority</td>
    <td>Number</td>
    <td>The execution priority the external task had when the log entry was created.</td>
  </tr>
  <tr>
    <td>errorMessage</td>
    <td>String</td>
    <td>The message of the error that occurred by executing the associated external task.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>String</td>
    <td>The id of the activity on which the associated external task was created.</td>
  </tr>
  <tr>
    <td>activityInstanceId</td>
    <td>String</td>
    <td>The id of the activity instance on which the associated external task was created.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>String</td>
    <td>The execution id on which the associated external task was created.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance on which the associated external task was created.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition which the associated external task belongs to.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>String</td>
    <td>The key of the process definition which the associated external task belongs to.</td>
  </tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The id of the tenant that this historic external task log entry belongs to.</td>
  </tr>
  <tr>
    <td>creationLog</td>
    <td>boolean</td>
    <td>A flag indicating whether this log represents the creation of the associated external task.</td>
  </tr>
  <tr>
    <td>failureLog</td>
    <td>boolean</td>
    <td>A flag indicating whether this log represents the failed execution of the associated external task.</td>
  </tr>
  <tr>
    <td>successLog</td>
    <td>boolean</td>
    <td>A flag indicating whether this log represents the successful execution of the associated external task.</td>
  </tr>
  <tr>
    <td>deletionLog</td>
    <td>boolean</td>
    <td>A flag indicating whether this log represents the deletion of the associated external task.</td>
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
    <td>Historic external task log with given id does not exist. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/history/external-task-log/someId`

## Response

Status 200.

```json
{
  "id" : "someId",
  "timestamp" : "2017-01-15T15:22:20.000+0200",
  "externalTaskId" : "anExternalTaskId",
  "topicName" : "aTopicName",
  "workerId" : "aWorkerId",
  "retries" : 3,
  "priority": 5,
  "errorMessage" : "An error occured!",
  "activityId" : "externalServiceTask",
  "activityInstanceId" : "externalServiceTask:15",
  "executionId" : "anExecutionId",
  "processInstanceId" : "aProcessInstanceId",
  "processDefinitionId" : "aProcessDefinitionId",
  "processDefinitionKey" : "aProcessDefinitionKey",
  "tenantId": null,
  "creationLog" : false,
  "failureLog" : true,
  "successLog" : false,
  "deletionLog" : false
}
```
