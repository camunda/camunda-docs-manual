---

title: "Get Cleanable Process Instance Report"
weight: 20

menu:
  main:
    identifier: "rest-api-history-get-cleanable-process-instance-report"
    parent: "rest-api-history-process-definition"
    pre: "GET `/history/process-definition/cleanable-process-instance-report`"

---

Retrieves a report about a process definition and finished process instances relevant to history cleanup (see <a href="{{< ref "/user-guide/process-engine/history.md#history-cleanup" >}}">History cleanup</a>) so that you can tune the history time to live.
These reports include the count of the finished historic process instances, cleanable process instances and basic process definition data - id, key, name and version.
The size of the result set can be retrieved by using the [Get Cleanable Process Instance Report Count]({{< ref "/reference/rest/history/process-definition/get-cleanable-process-instance-report-count.md" >}}) method.

# Method

GET `/history/process-definition/cleanable-process-instance-report`

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

A JSON array containing finished process instance information relevant to history cleanup. Each report result has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>String</td>
    <td>The key of the process definition.</td>
  </tr>
  <tr>
    <td>processDefinitionName</td>
    <td>String</td>
    <td>The name of the process definition.</td>
  </tr>
  <tr>
    <td>processDefinitionVersion</td>
    <td>Number</td>
    <td>The version of the process definition.</td>
  </tr>
  <tr>
    <td>historyTimeToLive</td>
    <td>Number</td>
    <td>The history time to live of the process definition.</td>
  </tr>
  <tr>
    <td>finishedProcessInstanceCount</td>
    <td>Number</td>
    <td>The count of the finished historic process instances.</td>
  </tr>
  <tr>
    <td>cleanableProcessInstanceCount</td>
    <td>Number</td>
    <td>The count of the cleanable historic process instances, referring to history time to live.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the process definition.</td>
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

GET `/history/process-definition/cleanable-process-instance-report`

## Response

```json
[
  {
    "processDefinitionId":"invoice:1:7bf79f13-ef95-11e6-b6e6-34f39ab71d4e",
    "processDefinitionKey":"invoice",
    "processDefinitionName":"Invoice Receipt",
    "processDefinitionVersion":1,
    "historyTimeToLive":5,
    "finishedProcessInstanceCount":100,
    "cleanableProcessInstanceCount":53,
    "tenantId":"aTenantId"
  },
  {
    "processDefinitionId":"invoice:2:7bf79f13-ef95-11e6-b6e6-34f39ab71d4e",
    "processDefinitionKey":"invoice",
    "processDefinitionName":"Invoice Receipt v2.0",
    "processDefinitionVersion":2,
    "historyTimeToLive":5,
    "finishedProcessInstanceCount":1000,
    "cleanableProcessInstanceCount":13,
    "tenantId":"aTenantId"
  }
]
```
