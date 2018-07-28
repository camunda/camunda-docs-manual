---

title: 'Activate/Suspend Process Instance In Batch'
weight: 190

menu:
  main:
    name: "Activate/Suspend In Batch"
    identifier: "rest-api-process-instance-suspend-in-batch"
    parent: "rest-api-process-instance"
    pre: "POST `/process-instance/suspended-async`"

---


Activates or suspends process instances asynchronously with a list of process
instance ids, a process instance query, and/or a historical process instance
query

# Method

POST `/process-instance/suspended-async`

# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processInstanceIds</td>
    <td>A list of process instance ids which defines a group of process instances which will be activated or suspended by the operation.</td>
  </tr>
  <tr>
    <td>processInstanceQuery</td>
<td>A process instance query which defines a group of process instances which will be activated or suspended by the operation.
See <a href="{{< relref "reference/rest/process-instance/get-query.md" >}}">GET /process-instance </a></td>
  </tr>
  <tr>
    <td>historicProcessInstanceQuery</td>
    <td>A historical process instance query which defines a group of process instances which will be activated or suspended by the operation. See <a href="{{< relref "reference/rest/history/process-instance/get-process-instance-query.md" >}}"> GET history/process-instance </a></td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend all process instances that were defined with the other parameters.  When the value is set to <code>true</code>, all process instances defined will be suspended and when the value is set to <code>false</code>, all process instances defined will be activated.</td>
  </tr>
</table>


# Result

A JSON object corresponding to the `Batch` interface in the engine. Its properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the batch.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>The type of the batch. See the <a href="{{< relref "user-guide/process-engine/batch.md#creating-a-batch" >}}">User Guide</a> for more information about batch types.</td>
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
    <td>jobsCreated</td>
    <td>Number</td>
    <td>
      The number of batch execution jobs already created by the seed job.
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
    <td>batchJobDefinitionId</td>
    <td>String</td>
    <td>The job definition id for the batch execution jobs of this batch.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Boolean</td>
    <td>Indicates wheter this batch is suspended or not.</td>
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
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the request parameters are invalid, for example if <code>processInstanceIds</code>, <code>processInstanceQuery</code>, and <code>historicProcessInstanceQuery</code> parameters are all set to null. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/process-instance/suspended-async`

    {
      "processInstanceIds" : [
                               "processInstanceId1",
                               "processInstanceId2",
                               ...
                               "processInstanceIdn"
                             ],
      "suspended" : true
    }

## Response

Status 200 OK

```json
{
  "id": "aBatchId",
  "type": "aBatchType",
  "totalJobs": 10,
  "batchJobsPerSeed": 100,
  "jobsCreated": 10,
  "invocationsPerBatchJob": 1,
  "seedJobDefinitionId": "aSeedJobDefinitionId",
  "monitorJobDefinitionId": "aMonitorJobDefinitionId",
  "batchJobDefinitionId": "aBatchJobDefinitionId",
  "suspended": true,
  "tenantId": "aTenantId"
}
```
