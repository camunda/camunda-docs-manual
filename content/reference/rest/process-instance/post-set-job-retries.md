---

title: 'Set Job Retries Async (POST)'
weight: 110

menu:
  main:
    name: "Set Job Retries Async (POST)"
    identifier: "rest-api-process-instance-post-set-job-retries-async"
    parent: "rest-api-process-instance"
    pre: "POST `/process-instance/job-retries`"

---

Create a batch to set retries of jobs associated with given processes asynchronously.

# Method

POST `/process-instance/job-retries`


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
    <td>processInstanceQuery</td>
    <td>
      A process instance query like the request body for the
      <a href="{{< ref "/reference/rest/process-instance/post-query.md#request-body" >}}">
        <code>Get Instances (POST)</code>
      </a> method.
    </td>
  </tr>
  <tr>
    <td>retries</td>
    <td>An integer representing the number of retries. Please note that the value cannot be negative or null.</td>
  </tr>
</table>

Please note that if both processInstances and processInstanceQuery are provided, then the resulting execution
will be performed on the union of these sets.

## Response Body

A JSON object corresponding to the Batch interface in the engine. Its properties are as follows:

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
    <td>The type of the batch. See the <a href="{{< ref "/user-guide/process-engine/batch.md#creating-a-batch" >}}">User Guide</a> for more information about batch types.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if neither processInstanceIds, nor processInstanceQuery is present. Or if the retry count is not specified. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/process-instance/job-retries`

Request Body:

    {
      "retries" : numberOfRetries,
      "processInstances": ["aProcess","secondProcess"],
      "processInstanceQuery": {
        "processDefinitionId": "aProcessDefinitionId"
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
