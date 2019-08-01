---

title: 'Delete Async (POST)'
weight: 110

menu:
  main:
    name: "Delete Async (POST)"
    identifier: "rest-api-history-delete-process-instance-async"
    parent: "rest-api-history-process-instance"
    pre: "POST `/history/process-instance/delete`"

---


Delete multiple historic process instances asynchronously (batch).
At least _historicProcessInstanceIds_ or _historicProcessInstanceQuery_ has to be provided. If both are provided
then all instances matching query criterion and instances from the list will be deleted.

# Method

POST `/history/process-instance/delete`

# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>historicProcessInstanceIds</td>
    <td>A list historic process instance ids to delete.</td>
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
    <td>failIfNotExists</td>
    <td>If set to <code>false</code>, the request will still be successful if one ore more of the process ids are not found.</td>
  </tr>
</table>

## Response Body

A JSON object corresponding to the Batch interface in the engine. Its properties are as follows:

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
    <td>Returned if some of the query parameters are invalid, i.e. neither historicProcessInstanceIds, nor historicProcessInstanceQuery is present. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/history/process-instance/delete`

Request Body:

    {
      "deleteReason" : "aReason",
      "historicProcessInstanceIds": ["aProcess","secondProcess"],
      "historicProcessInstanceQuery": {
        "startedAfter": "2016-10-11T11:44:13.000+0200",
        "finishedBefore": "2016-10-13T11:44:17.000+0200"
      }
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
