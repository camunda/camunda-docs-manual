---

title: "Get External Tasks (POST)"
weight: 40

menu:
  main:
    name: "Get List (POST)"
    identifier: "rest-api-external-task-post-query"
    parent: "rest-api-external-task"
    pre: "POST `/external-task`"

---


Queries for external tasks that fulfill given parameters in the form of a JSON object.
This method is slightly more powerful than the [Get External Tasks]({{< relref "reference/rest/external-task/get-query.md" >}}) method because it allows to specify a hierarchical result sorting.


# Method

POST `/external-task`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
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

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>externalTaskId</td>
    <td>Filter by an external task's id.</td>
  </tr>
  <tr>
    <td>topicName</td>
    <td>Filter by an external task topic.</td>
  </tr>
  <tr>
    <td>workerId</td>
    <td>Filter by the id of the worker that the task was most recently locked by.</td>
  </tr>
  <tr>
    <td>locked</td>
    <td>Only include external tasks that are currently locked (i.e., they have a lock time and it has not expired). Value may only be <code>true</code>, as <code>false</code> matches any external task.</td>
  </tr>
  <tr>
    <td>notLocked</td>
    <td>Only include external tasks that are currently not locked (i.e., they have no lock or it has expired). Value may only be <code>true</code>, as <code>false</code> matches any external task.</td>
  </tr>
  <tr>
    <td>withRetriesLeft</td>
    <td>Only include external tasks that have a positive (&gt; 0) number of retries (or <code>null</code>). Value may only be <code>true</code>, as <code>false</code> matches any external task.</td>
  </tr>
  <tr>
    <td>noRetriesLeft</td>
    <td>Only include external tasks that have 0 retries. Value may only be <code>true</code>, as <code>false</code> matches any external task.</td>
  </tr>
  <tr>
    <td>lockExpirationAfter</td>
    <td>Restrict to external tasks that have a lock that expires after a given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>lockExpirationBefore</td>
    <td>Restrict to external tasks that have a lock that expires before a given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>Filter by the id of the activity that an external task is created for.</td>
  </tr>
  <tr>
    <td>activityIdIn</td>
    <td>Filter by the comma-separated list of ids of the activities that an external task is created for.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>Filter by the id of the execution that an external task belongs to.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by the id of the process instance that an external task belongs to.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Filter by the id of the process definition that an external task belongs to.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. An external task must have one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Only include active tasks. Value may only be <code>true</code>, as <code>false</code> matches any external task.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Only include suspended tasks. Value may only be <code>true</code>, as <code>false</code> matches any external task.</td>
  </tr>
  <tr>
    <td>priorityHigherThanOrEquals</td>
    <td>Only include jobs with a priority higher than or equal to the given value. Value must be a valid <code>long</code> value.</td>
  </tr>
  <tr>
    <td>priorityLowerThanOrEquals</td>
    <td>Only include jobs with a priority lower than or equal to the given value. Value must be a valid <code>long</code> value.</td>
  </tr>
  <tr>
    <td>sorting</td>
    <td>
      <p>
        A JSON array of criteria to sort the result by. Each element of the array is a JSON object that specifies one ordering. The position in the array identifies the rank of an ordering, i.e., whether it is primary, secondary, etc. The ordering objects have the following properties:
      </p>
      <table>
        <tr>
          <td>sortBy</td>
          <td><b>Mandatory.</b> Sort the results lexicographically by a given criterion. Valid values are <code>id</code>, <code>lockExpirationTime</code>, 
								<code>processInstanceId</code>, <code>processDefinitionId</code>, <code>processDefinitionKey</code>, <code>taskPriority</code> and <code>tenantId</code>.</td>
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

A JSON array of external task objects.
Each external task object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>activityId</td>
    <td>String</td>
    <td>The id of the activity that this external task belongs to.</td>
  </tr>
  <tr>
    <td>activityInstanceId</td>
    <td>String</td>
    <td>The id of the activity instance that the external task belongs to.</td>
  </tr>
  <tr>
    <td>errorMessage</td>
    <td>String</td>
    <td>The error message that was supplied when the last failure of this task was reported.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>String</td>
    <td>The id of the execution that the external task belongs to.</td>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the external task.</td>
  </tr>
  <tr>
    <td>lockExpirationTime</td>
    <td>String</td>
    <td>The date that the task's most recent lock expires or has expired.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition the external task is defined in.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>String</td>
    <td>The key of the process definition the external task is defined in.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance the external task belongs to.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The id of the tenant the external task belongs to.</td>
  </tr>
  <tr>
    <td>retries</td>
    <td>Number</td>
    <td>The number of retries the task currently has left.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Boolean</td>
    <td>A flag indicating whether the external task is suspended or not.</td>
  </tr>
  <tr>
    <td>workerId</td>
    <td>String</td>
    <td>The id of the worker that posesses or posessed the most recent lock.</td>
  </tr>
  <tr>
    <td>topicName</td>
    <td>String</td>
    <td>The topic name of the external task.</td>
  </tr>
  <tr>
    <td>priority</td>
    <td>Number</td>
    <td>The priority of the external task.</td>
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

POST `/external-task`

Request Body:

    {
      "processDefinitionId":"aProcessDefinitionId",
      "sorting":
          [{"sortBy": "processDefinitionKey",
          "sortOrder": "asc"
          },
          {"sortBy": "lockExpirationTime",
          "sortOrder": "desc"
          }]
    }

## Response

Status 200.

    [{
      "activityId": "anActivityId",
      "activityInstanceId": "anActivityInstanceId",
      "errorMessage": "anErrorMessage",
      "executionId": "anExecutionId",
      "id": "anExternalTaskId",
      "lockExpirationTime": "2015-10-06T16:34:42",
      "processDefinitionId": "aProcessDefinitionId",
      "processDefinitionKey": "aProcessDefinitionKey",
      "processInstanceId": "aProcessInstanceId",
      "tenantId": null,
      "retries": 3,
      "suspended": false,
      "workerId": "aWorkerId",
      "topicName": "aTopic",
	  "priority": 9
    },
    {
      "activityId": "anotherActivityId",
      "activityInstanceId": "anotherActivityInstanceId",
      "errorMessage": "anotherErrorMessage",
      "executionId": "anotherExecutionId",
      "id": "anotherExternalTaskId",
      "lockExpirationTime": "2015-10-06T16:34:42",
      "processDefinitionId": "aProcessDefinitionId",
      "processDefinitionKey": "anotherProcessDefinitionKey",
      "processInstanceId": "anotherProcessInstanceId",
      "tenantId": null,
      "retries": 1,
      "suspended": false,
      "workerId": "aWorkerId",
      "topicName": "aTopic",
	  "priority": 3
    }]
