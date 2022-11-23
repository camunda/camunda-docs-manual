---

title: 'Delete Async Historic Query Based (POST)'
weight: 110

menu:
  main:
    name: "Delete Async Historic Query Based (POST)"
    identifier: "rest-api-process-instance-post-delete-async-historic-query-based"
    parent: "rest-api-process-instance"
    pre: "POST `/process-instance/delete-historic-query-based`"

---

Deletes a set of process instances asynchronously (batch) based on a historic process instance query.

# Method

POST `/process-instance/delete-historic-query-based`


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
    <td>A list of process instance ids to delete.</td>
  </tr>
  <tr>
    <td>historicProcessInstanceQuery</td>
    <td>
      A historic process instance query like the request body described by
      <a href="{{< ref "/reference/rest/history/process-instance/post-process-instance-query.md#request-body" >}}">
        <code>POST /history/process-instance</code>
      </a>.
    </td>
  </tr>
  <tr>
    <td>deleteReason</td>
    <td>A string with delete reason.</td>
  </tr>
  <tr>
    <td>skipCustomListeners</td>
    <td>Skip execution listener invocation for activities that are started or ended as part of this request.</td>
  </tr>
  <tr>
    <td>skipSubprocesses</td>
    <td>Skip deletion of the subprocesses related to deleted processes as part of this request.</td>
  </tr>
</table>

## Response Body

A JSON object corresponding to the `Batch` interface in the engine. Its properties are as follows:

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
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the query parameters are invalid, e. g. neither processInstanceIds, nor historicProcessInstanceQuery is present. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/process-instance/delete-historic-query-based`

Request Body:

    {
      "historicProcessInstanceQuery": {
        "startedBefore": "2017-04-28T11:24:37.765+0200"
      },
      "deleteReason" : "aReason",
      "skipCustomListeners" : true,
      "skipSubprocesses" : true
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
  "suspened": false,
  "tenantId": "aTenantId"
}
```
