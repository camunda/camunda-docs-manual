---

title: 'Delete Async (POST)'
weight: 110

menu:
  main:
    name: "Delete Async (POST)"
    identifier: "rest-api-process-instance-post-delete-async"
    parent: "rest-api-process-instance"
    pre: "POST `/process-instance/delete`"

---


Deletes multiple process instances asynchronously (batch).


# Method

POST `/process-instance/delete`


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
    <td>A list process instance ids to delete.</td>
  </tr>
  <tr>
    <td>processInstanceQuery</td>
    <td>
      A process instance query like the request body described by
      <a href="{{< ref "/reference/rest/process-instance/post-query.md#request-body" >}}">
        <code>POST /process-instance</code>
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
  <tr>
    <td>failIfNotExists</td>
    <td>If set to <code>false</code>, the request will still be successful if one ore more of the process ids are not found.</td>
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
    <td>Returned if some of the query parameters are invalid, i.e., neither processInstanceIds, nor processInstanceQuery is present. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/process-instance/delete`

Request Body:

    {
    "deleteReason" : "aReason",
    "processInstanceIds": ["aProcess","secondProcess"],
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
