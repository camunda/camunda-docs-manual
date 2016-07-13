---

title: "Fetch and Lock External Tasks"
weight: 60

menu:
  main:
    name: "Fetch and Lock"
    identifier: "rest-api-external-task-fetch-lock"
    parent: "rest-api-external-task"
    pre: "POST `/external-task/fetchAndLock`"

---

Fetches and locks a specific number of external tasks for execution by a worker. Query can be restricted to specific task topics and for each task topic an individual lock time can be provided.

# Method

POST `/external-task/fetchAndLock`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>workerId</td>
    <td><b>Mandatory.</b> The id of the worker on which behalf tasks are fetched. The returned tasks are locked for that worker and can only be completed when providing the same worker id.</td>
  </tr>
  <tr>
    <td>maxTasks</td>
    <td><b>Mandatory.</b> The maximum number of tasks to return.</td>
  </tr>
  <tr>
	<td>usePriority</td>
	<td>A boolean value, which indicates whether the task should be fetched based on its priority or arbitrarily.</td>
  </tr>
  <tr>
    <td>topics</td>
    <td>
      <p>
        A JSON array of topic objects for which external tasks should be fetched. The returned tasks may be arbitrarily distributed among these topics. Each topic object has the following properties:
      </p>
      <table class="table table-striped">
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>topicName</td>
          <td><b>Mandatory.</b> The topic's name.</td>
        </tr>
        <tr>
          <td>lockDuration</td>
          <td><b>Mandatory.</b> The duration to lock the external tasks for in milliseconds.</td>
        </tr>
        <tr>
          <td>variables</td>
          <td>A JSON array of <code>String</code> values that represent variable names. For each result task belonging to this topic, the given variables are returned as well if they are accessible from the external task's execution. If not provided - all variables will be fetched.</td>
        </tr>
      </table>
    </td>
  </tr>
</table>


# Result

A JSON array of locked external task objects.
Each locked external task object has the following properties:

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
    <td>The external task's id.</td>
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
    <td>workerId</td>
    <td>String</td>
    <td>The id of the worker that posesses or posessed the most recent lock.</td>
  </tr>
  <tr>
    <td>priority</td>
    <td>Number</td>
    <td>The priority of the external task.</td>
  </tr>
  <tr>
    <td>topicName</td>
    <td>String</td>
    <td>The external task's topic name.</td>
  </tr>
  <tr>
    <td>variables</td>
    <td>Object</td>
    <td><p>A JSON object containing a property for each of the requested variables. The key is the variable name, the value is a JSON object of serialized variable values with the following properties:</p>
      {{< rest-var-response >}}
    </td>
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
    <td>500</td>
    <td>application/json</td>
    <td>Returned if fetching is not successful, for example due to missing parameters. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/external-task/fetchAndLock`

Request Body:

    {
      "workerId":"aWorkerId",
      "maxTasks":2,
	  "usePriority":true,
      "topics":
          [{"topicName": "createOrder",
          "lockDuration": 10000,
          "variables": ["orderId"]
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
      "workerId": "aWorkerId",
      "priority": 4,
      "topicName": "createOrder",
      "variables": {
        "orderId": {
          "type": "String",
          "value": "1234",
          "valueInfo": {}
        }
      }
    },
    {
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
      "workerId": "aWorkerId",
      "priority": 0,
      "topicName": "createOrder",
      "variables": {
        "orderId": {
          "type": "String",
          "value": "3456",
          "valueInfo": {}
        }
      }
    }]

# Example with all variables
 
## Request

POST `/external-task/fetchAndLock`

Request Body:

    {
      "workerId":"aWorkerId",
      "maxTasks":2,
      "usePriority":true,
      "topics":
          [{"topicName": "createOrder",
          "lockDuration": 10000
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
      "workerId": "aWorkerId",
      "priority": 4,
      "topicName": "createOrder",
      "variables": {
        "orderId": {
          "type": "String",
          "value": "1234",
          "valueInfo": {}
        }
      }
    },
    {
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
      "workerId": "aWorkerId",
      "priority": 0,
      "topicName": "createOrder",
      "variables": {
        "orderId": {
          "type": "String",
          "value": "3456",
          "valueInfo": {}
        }
      }
    }]


