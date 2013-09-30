---

title: 'Get Activity Instances (Historic)'
shortTitle: 'Get Activity Instances'
category: 'History'

keywords: 'historic get query list'

---


Query for historic activity instances that fulfill the given parameters. 
The size of the result set can be retrieved by using the [count](#history-get-activity-instances-count) method.


Method
------

GET `/history/activity-instance`


Parameters
----------  
  
#### Query Parameters

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
    <td>Only include finished activity instances. Values may be `true` or `false`.</td>
  </tr>
  <tr>
    <td>unfinished</td>
    <td>Only include unfinished activity instances. Values may be `true` or `false`.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results by a given criterion. Valid values are
    `activityInstanceID`, `instanceId`, `executionId`, `activityId`, `activityName`, `activityType`, `startTime`, `endTime`, `duration`, `definitionId`.
    Must be used in conjunction with the `sortOrder` parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be `asc` for ascending order or `desc` for descending order.
    Must be used in conjunction with the `sortBy` parameter.</td>
  </tr>
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results, if there are no more results left.</td>
  </tr>
</table>


Result
------

A json array of historic activity instance objects.
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
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition that this process instance belongs to.</td>
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
    <td>The id of the task that is associated to this activity instance. Is only set, if the activity is a user task.</td>
  </tr>
  <tr>
    <td>assignee</td>
    <td>String</td>
    <td>The assignee of the task that is associated to this activity instance. Is only set, if the activity is a user task.</td>
  </tr>
  <tr>
    <td>calledProcessInstanceId</td>
    <td>String</td>
    <td>The id of the called process instance. Is only set, if the activity is a call activity.</td>
  </tr>
  <tr>
    <td>startTime</td>
    <td>String</td>
    <td>The time the instance was started. Has the format `yyyy-MM-dd'T'HH:mm:ss`.</td>
  </tr>
  <tr>
    <td>endTime</td>
    <td>String</td>
    <td>The time the instance ended. Has the format `yyyy-MM-dd'T'HH:mm:ss`.</td>
  </tr>
  <tr>
    <td>durationInMillis</td>
    <td>Number</td>
    <td>The time the instance took to finish (in milliseconds).</td>
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
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the query parameters are invalid, for example if a `sortOrder` parameter is supplied, but no `sortBy`. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/history/activity-instance?activityType=userTask&taskAssignee=peter`
  
#### Response

    [{"id": "aHistoricActivityInstanceId",
    "parentActivityInstanceId": "aHistoricParentActivityInstanceId",
    "activityId": "anActivity",
    "activityName": "anActivityName",
    "activityType": "userTask",
    "processDefinitionId": "aProcDefId",
    "processInstanceId": "aProcInstId",
    "executionId": "anExecutionId",
    "taskId": "aTaskId",
    "calledProcessInstanceId": "aHistoricCalledProcessInstanceId",
    "assignee": "peter",
    "startTime": "2013-04-23T11:20:43",
    "endTime": "2013-04-23T18:42:43",
    "durationInMillis": 2000}]
