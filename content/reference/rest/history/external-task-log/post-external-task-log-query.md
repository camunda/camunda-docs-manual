---

title: "Get External Task Logs (POST)"
weight: 60

menu:
  main:
    name: "Get List (POST)"
    identifier: "rest-api-history-post-external-task-log-query"
    parent: "rest-api-history-external-task-log"
    pre: "POST `/history/external-task-log`"

---


Queries for historic external task logs that fulfill the given parameters.
This method is slightly more powerful than the [Get External Task Logs]({{< relref "reference/rest/history/external-task-log/get-external-task-log-query.md" >}}) method because it allows filtering by historic external task logs values of the different types `String`, `Number` or `Boolean`.


# Method

POST `/history/external-task-log`


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
    <td>externalTaskId</td>
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
    <td>sorting</td>
    <td>
      <p>
        A JSON array of criteria to sort the result by. Each element of the array is a JSON object that specifies one ordering. The position in the array identifies the rank of an ordering, i.e., whether it is primary, secondary, etc. The ordering objects have the following properties:
      </p>
      <table class="table table-striped">
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>sortBy</td>
          <td><b>Mandatory.</b> Sort the results by a given criterion. Valid values are <code>timestamp</code>, <code>taskId</code>, <code>topicName</code>, <code>workerId</code>, <code>retries</code>, <code>priority</code>, <code>activityId</code>, <code>activityInstanceId</code>, <code>executionId</code>, <code>processInstanceId</code>, <code>processDefinitionId</code>, <code>processDefinitionKey</code> and <code>tenantId</code>.
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
  <tr>
    <td>removalTime</td>
    <td>String</td>
    <td>The time after which this log should be removed by the History Cleanup job. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>rootProcessInstanceId</td>
    <td>String</td>
    <td>The process instance id of the root process instance that initiated the process containing this log.</td>
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

POST `/history/external-task-log`

Request Body:

```json
{
  "externalTaskId": "anExternalTaskId"
}
```

## Response

```json
[
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
]
```
