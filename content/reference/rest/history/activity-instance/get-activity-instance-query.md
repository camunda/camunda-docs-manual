---

title: "Get Historic Activity Instances"
weight: 10

menu:
  main:
    name: "Get List"
    identifier: "rest-api-history-get-activity-instance-query"
    parent: "rest-api-history-activity-instance"
    pre: "GET `/history/activity-instance`"

---


Queries for historic activity instances that fulfill the given parameters.
The size of the result set can be retrieved by using the [Get Historic Activity Instance Count]({{< relref "reference/rest/history/activity-instance/get-activity-instance-query-count.md" >}}) method.


# Method

GET `/history/activity-instance`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>activityInstanceId</td>
    <td>Filter by activity instance id.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by process instance id.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Filter by process definition id.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>Filter by the id of the execution that executed the activity instance.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>Filter by the activity id (according to BPMN 2.0 XML).</td>
  </tr>
  <tr>
    <td>activityName</td>
    <td>Filter by the activity name (according to BPMN 2.0 XML).</td>
  </tr>
  <tr>
    <td>activityType</td>
    <td>Filter by activity type.</td>
  </tr>
  <tr>
    <td>taskAssignee</td>
    <td>Only include activity instances that are user tasks and assigned to a given user.</td>
  </tr>
  <tr>
    <td>finished</td>
    <td>Only include finished activity instances. Value may only be <code>true</code>, as <code>false</code> behaves the same as when the property is not set.</td>
  </tr>
  <tr>
    <td>unfinished</td>
    <td>Only include unfinished activity instances. Value may only be <code>true</code>, as <code>false</code>
    behaves the same as when the property is not set.</td>
  </tr>
  <tr>
    <td>canceled</td>
    <td>Only include canceled activity instances. Value may only be <code>true</code>, as <code>false</code> behaves
    the same as when the property is not set.</td>
  </tr>
  <tr>
    <td>completeScope</td>
    <td>Only include activity instances which completed a scope. Value may only be <code>true</code>, as <code>false</code>
    behaves the same as when the property is not set.</td>
  </tr>
  <tr>
    <td>startedBefore</td>
    <td>Restrict to instances that were started before the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>startedAfter</td>
    <td>Restrict to instances that were started after the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>finishedBefore</td>
    <td>Restrict to instances that were finished before the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>finishedAfter</td>
    <td>Restrict to instances that were finished after the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. An activity instance must have one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results by a given criterion. Valid values are
    <code>activityInstanceID</code>, <code>instanceId</code>, <code>executionId</code>, <code>activityId</code>, <code>activityName</code>, <code>activityType</code>, <code>startTime</code>, <code>endTime</code>, <code>duration</code>, <code>definitionId</code>, <code>occurrence</code> and <code>tenantId</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
  </tr>
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.</td>
  </tr>
</table>

\* For further information, please see the <a href="{{< relref "reference/rest/overview/date-format.md" >}}"> documentation</a>.

# Result

A JSON array of historic activity instance objects.
Each historic activity instance object has the following properties:

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
    <td>The time the instance was started. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>endTime</td>
    <td>String</td>
    <td>The time the instance ended. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
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
    <td>If true, this activity instance did complete a BPMN 2.0 scope.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the activity instance.</td>
  </tr>
  <tr>
    <td>removalTime</td>
    <td>String</td>
    <td>The time after which the activity instance should be removed by the History Cleanup job. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>rootProcessInstanceId</td>
    <td>String</td>
    <td>The process instance id of the root process instance that initiated the process containing this activity instance.</td>
  </tr>
</table>

\* For further information, please see the <a href="{{< relref "reference/rest/overview/date-format.md" >}}"> documentation</a>.

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
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/history/activity-instance?activityType=userTask&taskAssignee=peter`

## Response

```json
[
  {
    "activityId": "anActivity",
    "activityName": "anActivityName",
    "activityType": "userTask",
    "assignee": "peter",
    "calledProcessInstanceId": "aHistoricCalledProcessInstanceId",
    "calledCaseInstanceId": null,
    "canceled": true,
    "completeScope": false,
    "durationInMillis": 2000,
    "endTime": "2013-04-23T18:42:43.000+0200",
    "executionId": "anExecutionId",
    "id": "aHistoricActivityInstanceId",
    "parentActivityInstanceId": "aHistoricParentActivityInstanceId",
    "processDefinitionId": "aProcDefId",
    "processInstanceId": "aProcInstId",
    "startTime": "2013-04-23T11:20:43.000+0200",
    "taskId": "aTaskId",
    "tenantId":null,
    "removalTime":"2018-02-10T14:33:19.000+0200",
    "rootProcessInstanceId": "aRootProcessInstanceId"
  }
]
```
