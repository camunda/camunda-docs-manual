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
<a href="{{< ref "/user-guide/process-engine/history.md#history-cleanup" >}}">History cleanup</a>).
Takes the same parameters as the [Get Cleanable Batch Report]({{< ref "/reference/rest/history/batch/get-cleanable-batch-report.md" >}}) method.

# Method

GET `/history/batch/cleanable-batch-report/count`

# Parameters

This method takes no parameters.

# Result

A JSON object that contains the count as the only property.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Type</th>
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
    <td>See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
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
