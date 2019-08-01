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


Queries for batches that fulfill given parameters. Parameters may be
the properties of batches, such as the id or type.  The
size of the result set can be retrieved by using the [Get Batch Count]({{<
ref "/reference/rest/batch/get-query-count.md" >}}) method.


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
    <td>Filter by batch type. See the <a href="{{< ref "/user-guide/process-engine/batch.md#creating-a-batch" >}}">User Guide</a> for more information about batch types.</td>
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

A JSON array of batch objects.
Each batch object has the following properties:

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
    <td>400</td>
    <td>application/json</td>
    <td>
      Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>.
      See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
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
    "suspended": false,
    "tenantId": "aTenantId",
    "createUserId": "aUserId"
  }
]
```
