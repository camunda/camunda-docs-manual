---

title: 'Set Retries For Multiple External Tasks Async (Batch)'
weight: 120

menu:
  main:
    name: "Set Retries Async"
    identifier: "rest-api-external-task-post-retries-async"
    parent: "rest-api-external-task"
    pre: "POST `/external-task/retries-async`"

---


Sets the number of retries left to execute external tasks by id asynchronously. If retries are set to 0, an incident is created.

# Method

POST `/external-task/retries-async`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>retries</td>
    <td>The number of retries to set for the external task.  Must be >= 0. If this is 0, an incident is created and the task cannot be fetched anymore unless the retries are increased again. Can not be null.</td>
  </tr>
  <tr>
    <td>externalTaskIds</td>
    <td>The ids of the external tasks to set the number of retries for.</td>
  </tr>
  <tr>
    <td>processInstanceIds</td>
    <td>The ids of process instances containing the tasks to set the number of retries for.</td>
  </tr>
  <tr>
    <td>externalTaskQuery</td>
    <td>Query for the external tasks to set the number of retries for.</td>
  </tr>
  <tr>
    <td>processInstanceQuery</td>
    <td>Query for the process instances containing the tasks to set the number of retries for.</td>
   </tr>
   <tr>
     <td>historicProcessInstanceQuery</td>
     <td>Query for the historic process instances containing the tasks to set the number of retries for.</td>
   </tr>
</table>

# Result

A JSON object corresponding to the `Batch` interface in the engine. Its
properties are as follows:

{{< rest-batch-response >}}

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
    <td>Returned if the task does not exist. This could indicate a wrong task id as well as a cancelled task, e.g., due to a caught BPMN boundary event. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
 <tr>
    <td>400</td>
    <td>application/json</td>
    <td>
      If neither externalTaskIds nor externalTaskQuery are present or externalTaskIds contains null value or the number of retries is negative or null, an exception of type <code>InvalidRequestException</code> is returned. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>

# Example

## Request

POST `/external-task/retries-async`

Request Body:

```json
    {
      "retries": 123,
      "externalTaskIds": [
        "anExternalTask",
        "anotherExternalTask"
      ]
    }
```

## Response

Status 200.

```json
{
  "id": "aBatchId",
  "type": "aBatchType",
  "totalJobs": 10,
  "batchJobsPerSeed": 100,
  "invocationsPerBatchJob": 1,
  "seedJobDefinitionId": "aSeedJobDefinitionId",
  "monitorJobDefinitionId": "aMonitorJobDefinitionId",
  "batchJobDefinitionId": "aBatchJobDefinitionId",
  "tenantId": "aTenantId",
  "suspended": false,
  "createUserId": "demo"
}
```
