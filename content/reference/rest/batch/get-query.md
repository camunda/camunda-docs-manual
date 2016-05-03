---

title: "Get Batches"
weight: 10

menu:
  main:
    name: "Get List"
    identifier: "rest-api-batch-get-query"
    parent: "rest-api-batch"
    pre: "GET `/batch`"

---


Query for batches that fulfill given parameters. Parameters may be
the properties of batches, such as the id or type.  The
size of the result set can be retrieved by using the [GET query count]({{<
relref "reference/rest/batch/get-query-count.md" >}}).


# Method

GET `/batch`


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
    <td>Filter by batch type.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>
      Sort the results lexicographically by a given criterion.
      Valid values are <code>batchId</code>.
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

A JSON array of batch objects.
Each batch object has the following properties:

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
      The batch seed job is invoked until it created all batch execution jobs required by
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

GET `/batch?type=aBatchType&sortBy=batchId&sortOrder=asc`

## Response

Status 200.

```json
[
  {
    "id": "aBatchId",
    "type": "aBatchType",
    "totalJobs": 10,
    "jobsCreated": 10,
    "batchJobsPerSeed": 100,
    "invocationsPerBatchJob": 1,
    "seedJobDefinitionId": "aSeedJobDefinitionId",
    "monitorJobDefinitionId": "aMonitorJobDefinitionId",
    "batchJobDefinitionId": "aBatchJobDefinitionId",
    "tenantId": "aTenantId"
  }
]
```
