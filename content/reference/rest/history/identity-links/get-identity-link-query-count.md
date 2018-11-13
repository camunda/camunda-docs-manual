---

title: "Get Identity-Link-Logs Count"
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-history-get-identity-link-query-count"
    parent: "rest-api-history-identity-link-log"
    pre: "GET `/history/identity-link-log/count`"

---

Query for the number of historic identity links log that fulfill the given parameters.
Takes the same parameters as the [get identity-links-log]({{< ref "/reference/rest/history/identity-links/get-identity-link-query.md" >}}) method.


# Method

GET `/history/identity-link-log/count`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Restricts to identity links that have the given type(candidate/assignee/owner).</td>
  </tr>
  <tr>
    <td>userId</td>
    <td>Restricts to identity links that have the given user id.</td>
  </tr>
  <tr>
    <td>groupId</td>
    <td>Restricts to identity links that have the given group id.</td>
  </tr>
  <tr>
    <td>dateBefore</td>
    <td>Restricts to identity links that have the time before the given time.</td>
  </tr>
  <tr>
    <td>dateAfter</td>
    <td>Restricts to identity links that have the time after the given time</td>
  </tr>
  <tr>
    <td>taskId</td>
    <td>Restricts to identity links that have the given task id.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Restricts to identity links that have the given process definition id.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Restricts to identity links that have the given process definition key.</td>
  </tr>
  <tr>
    <td>operationType</td>
    <td>Restricts to identity links that have the given operationType (add/delete).</td>
  </tr>
  <tr>
    <td>assignerId</td>
    <td>Restricts to identity links that have the given assigner id.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids.</td>
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
    <td>The number of matching executions.</td>
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
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET <code>/history/identity-link-log/count?taskId=aTaskId</code>

## Response

    {"count": 2}
