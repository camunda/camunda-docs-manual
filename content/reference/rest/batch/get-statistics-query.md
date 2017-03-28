---

title: "Get Batch Statistics"
weight: 60

menu:
  main:
    name: "Get Statistics"
    identifier: "rest-api-batch-get-statistics-query"
    parent: "rest-api-batch"
    pre: "GET `/batch/statistics`"

---


Queries for batch statistics that fulfill given parameters. Parameters may be the
properties of batches, such as the id or type.  The size of the result set can
be retrieved by using the [Get Batch Statistics Count]({{< relref
"reference/rest/batch/get-statistics-query-count.md" >}}) method.


# Method

GET `/batch/statistics`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>batchId</td>
    <td>Filter by batch id.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>Filter by batch type. See the <a href="{{< relref "user-guide/process-engine/batch.md#creating-a-batch" >}}">User Guide</a> for more information about batch types.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. A batch matches if it has one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include batches which belong to no tenant. Value can effectively only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>
      A <code>Boolean</code> value which indicates whether only active or
      suspended batches should be included. When the value is set to
      <code>true</code>, only suspended batches will be returned and when the
      value is set to <code>false</code>, only active batches will be returned.
    </td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>
      Sort the results lexicographically by a given criterion.
      Valid values are <code>batchId</code> and <code>tenantId</code>.
      Must be used in conjunction with the <code>sortOrder</code> parameter.
    </td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
  </tr>
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.</td>
  </tr>
</table>


# Result

A JSON array of batch statistics objects.
Each batch statistics object has the following properties:

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
    <td>suspended</td>
    <td>Boolean</td>
    <td>Indicates wheter this batch is suspended or not.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the batch.</td>
  </tr>
  <tr>
    <td>remainingJobs</td>
    <td>Number</td>
    <td>
      The number of remaining batch execution jobs. This does include failed
      batch execution jobs and batch execution jobs which still have to be
      created by the seed job.
    </td>
  </tr>
  <tr>
    <td>completedJobs</td>
    <td>Number</td>
    <td>
      The number of completed batch execution jobs. This does include
      aborted/deleted batch execution jobs.
    </td>
  </tr>
  <tr>
    <td>failedJobs</td>
    <td>Number</td>
    <td>
       The number of failed batch execution jobs. This does not include
       aborted or deleted batch execution jobs.
    </td>
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
    <td>400</td>
    <td>application/json</td>
    <td>
      Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>.
      See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

GET `/batch/statistics?type=aBatchType&sortBy=batchId&sortOrder=asc`

## Response

Status 200.

```json
[
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
    "tenantId": "aTenantId",
    "remainingJobs": 3,
    "completedJobs": 7,
    "failedJobs": 1
  }
]
```
