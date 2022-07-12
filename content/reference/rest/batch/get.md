---

title: "Get Batch"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-batch-get"
    parent: "rest-api-batch"
    pre: "GET `/batch/{id}`"

---


Retrieves a batch by id, according to the `Batch` interface in the engine.


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

A JSON object corresponding to the `Batch` interface in the engine.
Its properties are as follows:

{{< rest-batch-response >}}


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
      See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
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
  "totalJobs": 10,
  "batchJobsPerSeed": 100,
  "jobsCreated": 10,
  "invocationsPerBatchJob": 1,
  "seedJobDefinitionId": "aSeedJobDefinitionId",
  "monitorJobDefinitionId": "aMonitorJobDefinitionId",
  "batchJobDefinitionId": "aBatchJobDefinitionId",
  "suspended": false,
  "tenantId": "aTenantId",
  "createUserId": "aUserId",
  "startTime":"2013-01-23T13:42:42.000+0200"
}
```
