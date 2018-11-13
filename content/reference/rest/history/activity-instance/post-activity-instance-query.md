---

title: "Get Activity Instances (POST)"
weight: 40

menu:
  main:
    name: "Get List (POST)"
    identifier: "rest-api-history-post-activity-instance-query"
    parent: "rest-api-history-activity-instance"
    pre: "POST `/history/activity-instance`"

---


Query for historic activity instances that fulfill the given parameters.


# Method

POST `/history/activity-instance`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.</td>
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
    <td>Only include finished activity instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>unfinished</td>
    <td>Only include unfinished activity instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>canceled</td>
    <td>Only include canceled activity instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>completeScope</td>
    <td>Only include activity instances which completed a scope. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>startedBefore</td>
    <td>Restrict to instances that were started before the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>startedAfter</td>
    <td>Restrict to instances that were started after the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>finishedBefore</td>
    <td>Restrict to instances that were finished before the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>finishedAfter</td>
    <td>Restrict to instances that were finished after the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a list of tenant ids. An activity instance must have one of the given tenant ids. Must be a JSON array of Strings.</td>
  </tr>
  <tr>
    <td>sorting</td>
    <td>
        A JSON array of criteria to sort the result by. Each element of the array is a JSON object that specifies one ordering. The position in the array identifies the rank of an ordering, i.e. whether it is primary, secondary, etc. The ordering objects have the following properties:
      <table>
        <tr>
          <td>sortBy</td>
          <td><b>Mandatory.</b> Sort the results lexicographically by a given criterion. Valid values are <code>activityInstanceID</code>, <code>instanceId</code>, <code>executionId</code>, <code>activityId</code>, <code>activityName</code>, <code>activityType</code>, <code>startTime</code>, <code>endTime</code>, <code>duration</code>, <code>definitionId</code>, <code>occurrence</code> and <code>tenantId</code>.</td>
        </tr>
        <tr>
          <td>sortOrder</td>
          <td><b>Mandatory.</b> Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
        </tr>
      </table>
    </td>
  </tr>
</table>


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
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the activity instance.</td>
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
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/history/activity-instance`

Request Body:

```json
{
  "activityType": "userTask",
  "taskAssignee": "peter",
  "sorting":
    [{"sortBy": "activityId",
    "sortOrder": "asc"
    },
    {"sortBy": "executionId",
    "sortOrder": "desc"
    }]
}
```

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
    "endTime": "2013-04-23T18:42:43",
    "executionId": "anExecutionId",
    "id": "aHistoricActivityInstanceId",
    "parentActivityInstanceId": "aHistoricParentActivityInstanceId",
    "processDefinitionId": "aProcDefId",
    "processInstanceId": "aProcInstId",
    "startTime": "2013-04-23T11:20:43",
    "taskId": "aTaskId",
    "tenantId":null
  }
]
```
