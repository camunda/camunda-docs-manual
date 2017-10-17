---

title: "Get Cleanable Decision Instance Report"
weight: 10

menu:
  main:
    identifier: "rest-api-history-get-cleanable-decision-instance-report"
    parent: "rest-api-history-decision-definition"
    pre: "GET `/history/decision-definition/cleanable-decision-instance-report`"

---

Retrieves a report about a decision definition and finished decision instances relevant to history cleanup (see 
<a href="{{< relref "user-guide/process-engine/history.md#history-cleanup" >}}">History cleanup</a>), so that you can tune the history time to live.
These reports include the count of the finished historic decision instances, cleanable decision instances and basic decision definition data - id, key, name and version.
The size of the result set can be retrieved by using the [Get Cleanable Decision Instance Report Count]({{< relref "reference/rest/history/decision-definition/get-cleanable-decision-instance-report-count.md" >}}) method.

# Method

GET `/history/decision-definition/cleanable-decision-instance-report`

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
    <td>withoutFinishedZero</td>
    <td>Only include decision instances which have more than zero finished instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
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
    <td>decisionDefinitionId</td>
    <td>String</td>
    <td>The id of the decision definition.</td>
  </tr>
  <tr>
    <td>decisionDefinitionKey</td>
    <td>String</td>
    <td>The key of the decision definition.</td>
  </tr>
  <tr>
    <td>decisionDefinitionName</td>
    <td>String</td>
    <td>The name of the decision definition.</td>
  </tr>
  <tr>
    <td>decisionDefinitionVersion</td>
    <td>Number</td>
    <td>The version of the decision definition.</td>
  </tr>
  <tr>
    <td>historyTimeToLive</td>
    <td>Number</td>
    <td>The history time to live of the decision definition.</td>
  </tr>
  <tr>
    <td>finishedDecisionInstanceCount</td>
    <td>Number</td>
    <td>The count of the finished historic decision instances.</td>
  </tr>
  <tr>
    <td>cleanableDecisionInstanceCount</td>
    <td>Number</td>
    <td>The count of the cleanable historic decision instances, referring to history time to live.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the decision definition.</td>
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

GET `/history/decision-definition/cleanable-decision-instance-report`

## Response

```json
[
  {
    "decisionDefinitionId":"invoice:1:7bf79f13-ef95-11e6-b6e6-34f39ab71d4e",
    "decisionDefinitionKey":"invoice",
    "decisionDefinitionName":"Invoice Receipt",
    "decisionDefinitionVersion":1,
    "historyTimeToLive":5,
    "finishedDecisionInstanceCount":100,
    "cleanableDecisionInstanceCount":53,
    "tenantId":"aTenantId"
  },
  {
    "decisionDefinitionId":"invoice:2:7bf79f13-ef95-11e6-b6e6-34f39ab71d4e",
    "decisionDefinitionKey":"invoice",
    "decisionDefinitionName":"Invoice Receipt v2.0",
    "decisionDefinitionVersion":2,
    "historyTimeToLive":5,
    "finishedDecisionInstanceCount":1000,
    "cleanableDecisionInstanceCount":13,
    "tenantId":"aTenantId"
  }

]
```
