---

title: "Get Cleanable Batch Report"
weight: 50

menu:
  main:
    identifier: "rest-api-history-get-cleanable-batch-report"
    parent: "rest-api-history-batch"
    pre: "GET `/history/batch/cleanable-batch-report`"

---

Retrieves a report about a historic batch operations relevant to history cleanup (see <a href="{{< relref "user-guide/process-engine/history.md#history-cleanup" >}}">History cleanup</a>) so that you can tune the history time to live.
These reports include the count of the finished batches, cleanable batches and type of the batch.
The size of the result set can be retrieved by using the [Get Cleanable Batch Report Count]({{< relref "reference/rest/history/batch/get-cleanable-batch-report-count.md" >}}) method.

{{< note title="" class="info" >}}
  **Please note:**
  The history time to live for batch operations does not support [Multi-Tenancy]({{< relref "user-guide/process-engine/multi-tenancy/multi-tenancy.md" >}}).
The report will return an information for all batch operations (for all tenants) if you have permissions to see the history.
{{< /note >}}

# Method

GET `/history/batch/cleanable-batch-report`

# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
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

A JSON array containing finished batches information relevant to history cleanup. Each report result has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>batchType</td>
    <td>String</td>
    <td>The type of the batch operation.</td>
  </tr>
  <tr>
    <td>historyTimeToLive</td>
    <td>Number</td>
    <td>The history time to live of the process definition.</td>
  </tr>
  <tr>
    <td>finishedBatchCount</td>
    <td>Number</td>
    <td>The count of the finished batch operations.</td>
  </tr>
  <tr>
    <td>cleanableBatchCount</td>
    <td>Number</td>
    <td>The count of the cleanable historic batch operations, referring to history time to live.</td>
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
    <td>500</td>
    <td>application/json</td>
    <td>See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Examples

## Request

GET `/history/batch/cleanable-batch-report`

## Response

```json
[
  {
    "batchType":"instance-modification",
    "historyTimeToLive":5,
    "finishedBatchCount":100
    "cleanableBatchCount":53
  },
  {
    "batchType":"instance-deletion",
    "historyTimeToLive":5,
    "finishedBatchCount":1000
    "cleanableBatchCount":13
  }
]
```
