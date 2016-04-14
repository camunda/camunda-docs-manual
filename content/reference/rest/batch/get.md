---

title: "Get Single Batch"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-batch-get"
    parent: "rest-api-batch"
    pre: "GET `/batch/{id}`"

---


Retrieves a single batch according to the Batch interface in the engine.


# Method

GET `/batch/{id}`

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the batch to be retrieved.</td>
  </tr>
</table>

# Result

A JSON object corresponding to the Batch interface in the engine.
Its properties are as follows:

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
    <td>The type of the batch.</td>
  </tr>
  <tr>
    <td>size</td>
    <td>Number</td>
    <td>The size of the batch.</td>
  </tr>
  <tr>
    <td>batchJobsPerSeed</td>
    <td>Number</td>
    <td>The number of batch jobs created per batch seed job invocation.</td>
  </tr>
  <tr>
    <td>invocationsPerBatchJob</td>
    <td>Number</td>
    <td>The number of invocations per batch job.</td>
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


## Response codes

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
    <td>
      Batch with given id does not exist.
      See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

GET `/batch/aBatchId`

## Response

Status 200.

```json
{
  "id": "aBatchId",
  "type": "aBatchType",
  "size": 10,
  "batchJobsPerSeed": 10,
  "invocationsPerBatchJob": 1,
  "seedJobDefinitionId": "aSeedJobDefinitionId",
  "monitorJobDefinitionId": "aMonitorJobDefinitionId",
  "batchJobDefinitionId": "aBatchJobDefinitionId",
  "tenantId": "aTenantId"
}
```
