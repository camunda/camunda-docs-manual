---

title: "Get Cleanable Decision Instance Report Count"
weight: 20

menu:
  main:
    identifier: "rest-api-history-get-cleanable-decision-instance-report-count"
    parent: "rest-api-history-decision-definition"
    pre: "GET `/history/decision-definition/cleanable-decision-instance-report/count`"

---

Queries for the number of report results about a decision definition and finished decision instances relevant to history cleanup (see
<a href="{{< relref "user-guide/process-engine/history.md#history-cleanup" >}}">History cleanup</a>).
Takes the same parameters as the [Get Cleanable Decision Instance Report]({{< relref "reference/rest/history/decision-definition/get-cleanable-decision-instance-report.md" >}}) method.

# Method

GET `/history/decision-definition/cleanable-decision-instance-report/count`

# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>decisionDefinitionIdIn</td>
    <td>Filter by decision definition ids. Must be a comma-separated list of decision definition ids.</td>
  </tr>
  <tr>
    <td>decisionDefinitionKeyIn</td>
    <td>Filter by decision definition keys. Must be a comma-separated list of decision definition keys.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. A decision definition must have one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include decision definitions which belong to no tenant. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>compact</td>
    <td>Only include decision instances which have more than zero finished instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
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

A JSON array containing finished decision instance information relevant to history cleanup. Each report result has the following properties:

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

GET `/history/decision-definition/cleanable-decision-instance-report/count`

## Response

```json
{
  "count": 1
}
```
