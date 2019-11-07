---

title: "Get Identity-Link-Logs"
weight: 10

menu:
  main:
    name: "Get List"
    identifier: "rest-api-history-get-identity-link-query"
    parent: "rest-api-history-identity-link-log"
    pre: "GET `/history/identity-link-log`"

---


Queries for historic identity link logs that fulfill given parameters.
The size of the result set can be retrieved by using the [Get Identity-Link-Log Count]({{< ref "/reference/rest/history/identity-links/get-identity-link-query-count.md" >}}) method.


# Method

GET `/history/identity-link-log`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Restricts to identity links that have the given type (candidate/assignee/owner).</td>
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
    <td>Restricts to identity links that have the time after the given time.</td>
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
  <tr>
    <td>withoutTenantId</td>
    <td>Only include historic identity links that belong to no tenant. Value may only be 
    <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>time</code>, <code>type</code>, <code>userId</code>, <code>groupId</code>, <code>taskId</code>, <code>processDefinitionId</code>, <code>processDefinitionKey</code>, <code>operationType</code>, <code>assignerId</code>, <code>tenantId</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
  </tr>
</table>


# Result

A JSON array of historic identity link log objects.
Each historic identity link log object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>Id of the Historic identity link entry.</td>
  </tr>
  <tr>
    <td>time</td>
    <td>String</td>
    <td>The time when the identity link is logged. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
   <tr>
    <td>type</td>
    <td>String</td>
    <td>The type of identity link (candidate/assignee/owner).</td>
  </tr>
  <tr>
    <td>userId</td>
    <td>String</td>
    <td>The id of the user/assignee.</td>
  </tr>
  <tr>
    <td>groupId</td>
    <td>String</td>
    <td>The id of the group.</td>
  </tr>
  <tr>
    <td>taskId</td>
    <td>String</td>
    <td>The id of the task.</td>
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
    <td>operationType</td>
    <td>String</td>
    <td>Type of operation (add/delete).</td>
  </tr>
  <tr>
    <td>assignerId</td>
    <td>String</td>
    <td>The id of the assigner.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The id of the tenant.</td>
  </tr>
  <tr>
    <td>removalTime</td>
    <td>String</td>
    <td>The time after which the identity link should be removed by the History Cleanup job. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>rootProcessInstanceId</td>
    <td>String</td>
    <td>The process instance id of the root process instance that initiated the process containing this identity link.</td>
  </tr>
</table>

\* For further information, please see the <a href="{{< ref "/reference/rest/overview/date-format.md" >}}"> documentation</a>.

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

GET <code>/history/identity-link-log?taskId=aTaskId</code>

## Response

```json
[
  {
    "id": "1",
    "time": "2014-03-01T08:00:00.000+0200",
    "type": "candidate",
    "userId": "aUserId",
    "groupId": "aGroupId",
    "taskId": "aTaskId",
    "processDefinitionId": "12",
    "operationType": "add",
    "assignerId": "aAssignerId",
    "processDefinitionKey": "oneTaskProcess",
    "tenantId": "tenant1",
    "removalTime":"2018-02-10T14:33:19.000+0200",
    "rootProcessInstanceId": "aRootProcessInstanceId"
  },
  {
    "id": "2",
    "time": "2014-03-05T10:00:00.000+0200",
    "type": "candidate",
    "userId": "aUserId",
    "groupId": "aGroupId",
    "taskId": "aTaskId",
    "processDefinitionId": "12",
    "operationType": "delete",
    "assignerId": "aAssignerId"
    "processDefinitionKey": "oneTaskProcess",
    "tenantId": "tenant1",
    "removalTime":"2018-02-10T14:33:19.000+0200",
    "rootProcessInstanceId": "aRootProcessInstanceId"
  }
]
```
