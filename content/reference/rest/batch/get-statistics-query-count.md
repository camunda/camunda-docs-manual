---

title: "Get Batch Statistics Count"
weight: 70

menu:
  main:
    name: "Get Statistics Count"
    identifier: "rest-api-batch-get-query-statistics-count"
    parent: "rest-api-batch"
    pre: "GET `/batch/statistics/count`"

---


Request the number of batch statistics that fulfill the query criteria.  Takes
the same filtering parameters as the [GET statistics query]({{< ref "/reference/rest/batch/get-statistics-query.md" >}}).


# Method

GET `/batch/statistics/count`


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
    <td>The number of matching batches.</td>
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

GET `/batch/statistics/count?type=aBatchType`

## Response

Status 200.

```json
{
  "count": 1
}
```
