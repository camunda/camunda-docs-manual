---

title: "Get External Task Logs"
weight: 10

menu:
  main:
    name: "Get List"
    identifier: "rest-api-history-get-external-task-log-query"
    parent: "rest-api-history-external-task-log"
    pre: "GET `/history/external-task-log`"

---


Queries for historic external task logs that fulfill the given parameters.
The size of the result set can be retrieved by using the [Get External Task Log Count]({{< relref "reference/rest/history/external-task-log/get-external-task-log-query-count.md" >}}) method.


# Method

GET `/history/external-task-log`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>logId</td>
    <td>Filter by historic external task log id.</td>
  </tr>
  <tr>
    <td>taskId</td>
    <td>Filter by external task id.</td>
  </tr>
  <tr>
  <tr>
    <td>topicName</td>
    <td>Filter by an external task topic.</td>
  </tr>
  <tr>
  <tr>
    <td>workerId</td>
    <td>Filter by the id of the worker that the task was most recently locked by.</td>
  </tr>
  <tr>
    <td>errorMessage</td>
    <td>Filter by external task exception message.</td>
  </tr>
  <tr>
    <td>activityIdIn</td>
    <td>Only include historic external task logs which belong to one of the passed activity ids.</td>
  </tr>
  <tr>
    <td>activityInstanceIdIn</td>
    <td>Only include historic external task logs which belong to one of the passed activity instance ids.</td>
  </tr>
  <tr>
    <td>executionIdIn</td>
    <td>Only include historic external task logs which belong to one of the passed execution ids.</td>
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
    <td>processDefinitionKey</td>
    <td>Filter by process definition key.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Only include historic external task log entries which belong to one of the passed and comma-separated tenant ids.</td>
  </tr>
  <tr>
    <td>priorityLowerThanOrEquals</td>
    <td>Only include logs for which the associated external task had a priority lower than or equal to the given value. Value must be a valid <code>long</code> value.</td>
  </tr>
  <tr>
    <td>priorityHigherThanOrEquals</td>
    <td>Only include logs for which the associated external task had a priority higher than or equal to the given value. Value must be a valid <code>long</code> value.</td>
  </tr>
  <tr>
    <td>creationLog</td>
    <td>Only include creation logs. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>failureLog</td>
    <td>Only include failure logs. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>successLog</td>
    <td>Only include success logs. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>deletionLog</td>
    <td>Only include deletion logs. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results by a given criterion. Valid values are
    <code>timestamp</code>, <code>taskId</code>, <code>topicName</code>, <code>workerId</code>, <code>retries</code>, <code>priority</code>,
    <code>activityId</code>, <code>activityInstanceId</code>, <code>executionId</code>, <code>processInstanceId</code>, <code>processDefinitionId</code>, <code>processDefinitionKey</code> and <code>tenantId</code>.
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


# Result

A JSON array of historic external task log objects.
Each historic external task log object has the following properties:

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
    <td>taskId</td>
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
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/history/external-task-log?taskId=anExternalTaskId`

## Response

```json
[
	{
	  "id" : "someId",
	  "timestamp" : "2017-01-15T15:22:20",
	  "taskId" : "aTaskId",
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
]
```
