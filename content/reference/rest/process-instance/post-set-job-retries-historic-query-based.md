---

title: 'Set Job Retries Async Historic Query Based (POST)'
weight: 110

menu:
  main:
    name: "Set Job Retries Async Historic Query Based (POST)"
    identifier: "rest-api-process-instance-post-set-job-retries-async-historic-query-based"
    parent: "rest-api-process-instance"
    pre: "POST `/process-instance/job-retries-historic-query-based`"

---

Create a batch to set retries of jobs asynchronously based on a historic process instance query.

# Method

POST `/process-instance/job-retries-historic-query-based`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processInstances</td>
    <td>A list of process instance ids to fetch jobs, for which retries will be set.</td>
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
    <td>retries</td>
    <td>An integer representing the number of retries. Please note that the value cannot be negative or null.</td>
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
    <td>Returned if some of the query parameters are invalid, e. g. if neither processInstances, nor processInstanceQuery is present. Or if the retry count is not specified. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/process-instance/job-retries-historic-query-based`

Request Body:

    {
      "historicProcessInstanceQuery": {
        "startedBefore": "2017-04-28T11:24:37.769+0200"
      },
      "processInstances": ["aProcess","secondProcess"],
      "retries" : numberOfRetries
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
  "suspended": false,
  "tenantId": "aTenantId"
}
```
