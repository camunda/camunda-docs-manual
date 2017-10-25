---

title: "Get Cleanable Process Instance Report Count"
weight: 30

menu:
  main:
    identifier: "rest-api-history-get-cleanable-process-instance-report-count"
    parent: "rest-api-history-process-definition"
    pre: "GET `/history/process-definition/cleanable-process-instance-report/count`"

---

Queries for the number of report results about a process definition and finished process instances relevant to history cleanup (see
<a href="{{< relref "user-guide/process-engine/history.md#history-cleanup" >}}">History cleanup</a>).
Takes the same parameters as the [Get Cleanable Process Instance Report]({{< relref "reference/rest/history/process-definition/get-cleanable-process-instance-report.md" >}}) method.

# Method

GET `/history/process-definition/cleanable-process-instance-report/count`

# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processDefinitionIdIn</td>
    <td>Filter by process definition ids. Must be a comma-separated list of process definition ids.</td>
  </tr>
  <tr>
    <td>processDefinitionKeyIn</td>
    <td>Filter by process definition keys. Must be a comma-separated list of process definition keys.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. A process definition must have one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include process definitions which belong to no tenant. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>compact</td>
    <td>Only include process instances which have more than zero finished instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
</table>


# Result

A JSON array containing finished process instance information relevant to history cleanup. Each report result has the following properties:

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

GET `/history/process-definition/cleanable-process-instance-report/count`

## Response

```json
{
  "count": 1
}
```
