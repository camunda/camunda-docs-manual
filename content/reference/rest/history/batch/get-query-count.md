---

title: "Get Historic Batch Count"
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-history-batch-get-query-count"
    parent: "rest-api-history-batch"
    pre: "GET `/history/batch/count`"

---


Requests the number of historic batches that fulfill the query criteria.
Takes the same filtering parameters as the [Get Historic Batches]({{< ref "/reference/rest/history/batch/get-query.md" >}}) method.


# Method

GET `/history/batch/count`


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
    <td>completed</td>
    <td>
      Filter completed or not completed batches. If the value is
      <code>true</code>, only completed batches, i.e., end time is set, are
      counted. Otherwise, if the value is <code>false</code>, only running
      batches, i.e., end time is null, are counted.
    </td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. A batch matches if it has one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include batches which belong to no tenant. Value can effectively only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
</table>


# Result

A JSON object that contains the count as the only property.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>count</td>
    <td>Number</td>
    <td>The number of matching historic batches.</td>
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
      See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

GET `/history/batch/count?type=aBatchType`

## Response

Status 200.

```json
{
  "count": 1
}
```
