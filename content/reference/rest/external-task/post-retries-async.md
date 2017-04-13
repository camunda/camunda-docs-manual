---

title: 'Set Retries For Multiple External Tasks Async (Batch)'
weight: 100

menu:
  main:
    name: "Set Retries Async"
    identifier: "rest-api-external-task-post-retries-async"
    parent: "rest-api-external-task"
    pre: "POST `/external-task/retries-async`"

---


Sets the number of retries left to execute external tasks by id asynchronously. If retries are set to 0, an incident is created.
To set retries for multiple external tasks synchronously, use the [Set Retries For Multiple External Tasks]({{< relref "reference/rest/external-task/put-retries-sync.md" >}}) method.

For more information about the difference between synchronous and
asynchronous execution, please refer to the related
section of the [user guide]({{< relref "user-guide/process-engine/process-instance-migration.md#executing-a-migration-plan" >}}).

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
    <td>The number of retries to set for the external task.  Must be >= 0. If this is 0, an incident is created and the task cannot be fetched anymore unless the retries are increased again.</td>
  </tr>
  <tr>
    <td>externalTaskIds</td>
    <td>The ids of the external tasks to set the number of retries for.</td>
  </tr>
  <tr>
    <td>externalTaskQuery</td>
    <td>Query for the external tasks to set the number of retries for.</td>
  </tr>
</table>


# Result

A JSON object corresponding to the `Batch` interface in the engine. Its
properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the created batch.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>The type of the created batch.</td>
  </tr>
  <tr>
    <td>totalJobs</td>
    <td>Number</td>
    <td>
      The total jobs of a batch is the number of batch execution jobs required to
      complete the batch.
    </td>
  </tr>
  <tr>
    <td>batchJobsPerSeed</td>
    <td>Number</td>
    <td>
      The number of batch execution jobs created per seed job invocation.
      The batch seed job is invoked until it has created all batch execution jobs required by
      the batch (see <code>totalJobs</code> property).
    </td>
  </tr>
  <tr>
    <td>invocationsPerBatchJob</td>
    <td>Number</td>
    <td>
      Every batch execution job invokes the command executed by the batch
      <code>invocationsPerBatchJob</code> times. E.g., for a process instance
      migration batch this specifies the number of process instances which
      are migrated per batch execution job.
    </td>
  </tr>
  <tr>
    <td>seedJobDefinitionId</td>
    <td>String</td>
    <td>The job definition id for the seed jobs of this batch.</td>
  </tr>
  <tr>
    <td>monitorJobDefinitionId</td>
    <td>String</td>
    <td>The job definition id for the monitor jobs of this batch.</td>
  </tr>
  <tr>
    <td>batchJobDefinitionId</td>
    <td>String</td>
    <td>The job definition id for the batch execution jobs of this batch.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the batch.</td>
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
    <td>Returned if the task does not exist. This could indicate a wrong task id as well as a cancelled task, e.g., due to a caught BPMN boundary event. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
 <tr>
    <td>400</td>
    <td>application/json</td>
    <td>
      In case externalTaskIds and externalTaskQuery are null at the same time or externalTaskIds contains null value or the number of retries is negative, an exception of type <code>InvalidRequestException</code> is returned. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>

# Example

## Request

POST `/external-task/retries-async`

Request Body:

    {
      "retries": 123
      "externalTaskIds": [
        "anExternalTask",
        "anotherExternalTask"
      ]
    }

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
  "tenantId": "aTenantId"
}
```
