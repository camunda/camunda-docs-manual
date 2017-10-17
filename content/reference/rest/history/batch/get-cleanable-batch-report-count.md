---

title: "Get Cleanable Batch Report Count"
weight: 60

menu:
  main:
    identifier: "rest-api-history-get-cleanable-batch-report-count"
    parent: "rest-api-history-batch"
    pre: "GET `/history/batch/cleanable-batch-report/count`"

---

Queries for the number of report results about a historic batch operations relevant to history cleanup (see
<a href="{{< relref "user-guide/process-engine/history.md#history-cleanup" >}}">History cleanup</a>).
Takes the same parameters as the [Get Cleanable Batch Report]({{< relref "reference/rest/history/batch/get-cleanable-batch-report.md" >}}) method.

# Method

GET `/history/batch/cleanable-batch-report/count`

# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results by a given criterion. Valid value is <code>finished</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
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

A JSON array containing finished batch operations information relevant to history cleanup. Each report result has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>count</td>
    <td>Number</td>
    <td>The number of report results.</td>
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

GET `/history/batch/cleanable-batch-report/count`

## Response

```json
{
  "count": 10
}
```
