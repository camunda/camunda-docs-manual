---

title: "Get Cleanable Case Instance Report Count"
weight: 30

menu:
  main:
    identifier: "rest-api-history-get-cleanable-case-instance-report-count"
    parent: "rest-api-history-case-definition"
    pre: "GET `/history/case-definition/cleanable-case-instance-report/count`"

---

Queries for the number of report results about a case definition and finished case instances relevant to history cleanup (see 
<a href="{{< relref "user-guide/process-engine/history.md#history-cleanup" >}}">History cleanup</a>).
Takes the same parameters as the [Get Cleanable Case Instance Report]({{< relref "reference/rest/history/case-definition/get-cleanable-case-instance-report.md" >}}) method.

# Method

GET `/history/case-definition/cleanable-case-instance-report/count`

# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>caseDefinitionIdIn</td>
    <td>Filter by case definition ids. Must be a comma-separated list of case definition ids.</td>
  </tr>
  <tr>
    <td>caseDefinitionKeyIn</td>
    <td>Filter by case definition keys. Must be a comma-separated list of case definition keys.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. A case definition must have one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include case definitions which belong to no tenant. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
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

A JSON array containing finished case instance information relevant to history cleanup. Each report result has the following properties:

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

GET `/history/case-definition/cleanable-case-instance-report/count`

## Response

```json
{
  "count": 1
}
```
