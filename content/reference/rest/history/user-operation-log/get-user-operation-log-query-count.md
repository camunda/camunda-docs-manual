---

title: "Get User Operation Log Count"
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-history-get-user-operation-log-query-count"
    parent: "rest-api-history-user-operation-log"
    pre: "GET `/history/user-operation/count`"

---


Queries for the number of user operation log entries that fulfill the given parameters.
Takes the same parameters as the [Get User Operation Log (Historic)]({{< ref "/reference/rest/history/user-operation-log/get-user-operation-log-query.md" >}}) method.


# Method

GET `/history/user-operation/count`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>Filter by deployment id.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Filter by process definition id.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Filter by process definition key.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by process instance id.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>Filter by execution id.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>Filter by case definition id.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>Filter by case instance id.</td>
  </tr>
  <tr>
    <td>caseExecutionId</td>
    <td>Filter by case execution id.</td>
  </tr>
  <tr>
    <td>taskId</td>
    <td>Only include operations on this task.</td>
  </tr>
  <tr>
    <td>jobId</td>
    <td>Filter by job id.</td>
  </tr>
  <tr>
    <td>jobDefinitionId</td>
    <td>Filter by job definition id.</td>
  </tr>
  <tr>
    <td>userId</td>
    <td>Only include operations of this user.</td>
  </tr>
  <tr>
    <td>operationId</td>
    <td>Filter by the id of the operation. This allows fetching of multiple entries which are part of a composite operation.</td>
  </tr>
  <tr>
    <td>operationType</td>
    <td>Filter by the type of the operation like <code>Claim</code> or <code>Delegate</code>. See the {{< javadocref page="?org/camunda/bpm/engine/history/UserOperationLogEntry.html" text="Javadoc" >}} for a list of available operation types.</td>
  </tr>
  <tr>
    <td>entityType</td>
    <td>Filter by the type of the entity that was affected by this operation, possible values are <code>Task</code>, <code>Attachment</code> or <code>IdentityLink</code>.</td>
  </tr>
  <tr>
    <td>entityTypeIn</td>
    <td>Filter by types of the entities that was affected by this operation, possible values are <code>Task</code>, <code>Attachment</code> or <code>IdentityLink</code>.</td>
  </tr>
  <tr>
    <td>category</td>
    <td>Filter by the category that this operation is associated with, possible values are <code>TaskWorker</code>, <code>Admin</code> or <code>Operator</code>.</td>
  </tr>
  <tr>
    <td>categoryIn</td>
    <td>Filter by the categories that this operation is associated with, possible values are <code>TaskWorker</code>, <code>Admin</code> or <code>Operator</code>.</td>
  </tr>
  <tr>
    <td>property</td>
    <td>Only include operations that changed this property, e.g., <code>owner</code> or <code>assignee</code>.</td>
  </tr>
  <tr>
    <td>afterTimestamp</td>
    <td>Restrict to entries that were created after the given timestamp. By default*, the timestamp must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2014-02-25T14:58:37.000+0200</code>.</td>
  </tr>
  <tr>
    <td>beforeTimestamp</td>
    <td>Restrict to entries that were created before the given timestamp. By default*, the timestamp must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2014-02-25T14:58:37.000+0200</code>.</td>
  </tr>
</table>

\* For further information, please see the <a href="{{< ref "/reference/rest/overview/date-format.md" >}}"> documentation</a>.

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
    <td>The number of matching log entries.</td>
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
    <td>Returned if some of the query parameters are invalid. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/history/user-operation?operationType=Claim&userId=demo`

## Response

    {"count": 1}
