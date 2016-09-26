---

title: "Get User Operation Log (Historic)"
weight: 10

menu:
  main:
    name: "Get List"
    identifier: "rest-api-history-get-user-operation-log-query"
    parent: "rest-api-history-user-operation-log"
    pre: "GET `/history/user-operation`"

---


Query for user operation log entries that fulfill the given parameters.
The size of the result set can be retrieved by using the [count]({{< relref "reference/rest/history/user-operation-log/get-user-operation-log-query-count.md" >}}) method.

Note that the properties of operation log entries are interpreted as restrictions on the entities they apply to. That means, if a single process instance is updated, the field `processInstanceId` is populated. If a single operation updates all process instances of the same process definition, the field `processInstanceId` is `null` (a `null` restriction is viewed as a wildcard, i.e., matches a process instance with any id) and the field `processDefinitionId` is populated. This way, which entities were changed by a user operation can easily be reconstructed.


# Method

GET `/history/user-operation`


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
    <td>Filter by the type of the operation like <code>Claim</code> or <code>Delegate</code>.</td>
  </tr>
  <tr>
    <td>entityType</td>
    <td>Filter by the type of the entity that was affected by this operation, possible values are <code>Task</code>, <code>Attachment</code> or <code>IdentityLink</code>.</td>
  </tr>
  <tr>
    <td>property</td>
    <td>Only include operations that changed this property, e.g., <code>owner</code> or <code>assignee</code>.</td>
  </tr>
  <tr>
    <td>afterTimestamp</td>
    <td>Restrict to entries that were created after the given timestamp. The timestamp must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2014-02-25T14:58:37</code>.</td>
  </tr>
  <tr>
    <td>beforeTimestamp</td>
    <td>Restrict to entries that were created before the given timestamp. The timestamp must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2014-02-25T14:58:37</code>.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results by a given criterion. At the moment the query only supports sorting based on the <code>timestamp</code>.
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

A JSON array of user operation log entries.
Each log entry has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The unique identifier of this log entry.</td>
  </tr>
  <tr>
    <td>userId</td>
    <td>String</td>
    <td>The user who performed this operation.</td>
  </tr>
  <tr>
    <td>timestamp</td>
    <td>String</td>
    <td>Timestamp of this operation.</td>
  </tr>
  <tr>
    <td>operationId</td>
    <td>String</td>
    <td>The unique identifier of this operation. A composite operation that changes multiple properties has a common <code>operationId</code>.</td>
  </tr>
  <tr>
    <td>operationType</td>
    <td>String</td>
    <td>The type of this operation, e.g., <code>Assign</code>, <code>Claim</code> and so on.</td>
  </tr>
  <tr>
    <td>entityType</td>
    <td>String</td>
    <td>The type of the entity on which this operation was executed, e.g., <code>Task</code> or <code>Attachment</code>.</td>
  </tr>
  <tr>
    <td>property</td>
    <td>String</td>
    <td>The property changed by this operation.</td>
  </tr>
  <tr>
    <td>orgValue</td>
    <td>String</td>
    <td>The original value of the changed property.</td>
  </tr>
  <tr>
    <td>newValue</td>
    <td>String</td>
    <td>The new value of the changed property.</td>
  </tr>

  <tr>
    <td>deploymentId</td>
    <td>String</td>
    <td>If not null, the operation is restricted to entities in relation to this deployment.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>If not null, the operation is restricted to entities in relation to this process definition.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>String</td>
    <td>If not null, the operation is restricted to entities in relation to process definitions with this key.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>If not null, the operation is restricted to entities in relation to this process instance.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>String</td>
    <td>If not null, the operation is restricted to entities in relation to this execution.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>String</td>
    <td>If not null, the operation is restricted to entities in relation to this case definition.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>String</td>
    <td>If not null, the operation is restricted to entities in relation to this case instance.</td>
  </tr>
  <tr>
    <td>caseExecutionId</td>
    <td>String</td>
    <td>If not null, the operation is restricted to entities in relation to this case execution.</td>
  </tr>
  <tr>
    <td>taskId</td>
    <td>String</td>
    <td>If not null, the operation is restricted to entities in relation to this task.</td>
  </tr>
  <tr>
    <td>jobId</td>
    <td></td>
    <td>If not null, the operation is restricted to entities in relation to this job.</td>
  </tr>
  <tr>
    <td>jobDefinitionId</td>
    <td></td>
    <td>If not null, the operation is restricted to entities in relation to this job definition.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Examples

## (1) Request

Gets an operation that updates a single task.

GET `/history/user-operation?operationType=Claim&userId=demo&sortBy=timestamp&sortOrder=asc`

## Response

    [{"id": "anUserOperationLogEntryId",
    "deploymentId": "aDeploymentId",
    "processDefinitionId": "aProcessDefinitionId",
    "processDefinitionKey": null,
    "processInstanceId": "aProcessInstanceId",
    "executionId": "anExecutionId",
    "taskId": "aTaskId",
    "jobId": "aJobId",
    "jobDefinitionId": "aJobDefinitionId",
    "userId": "demo",
    "timestamp": "2014-02-25T14:58:37",
    "operationId": "anOperationId",
    "operationType": "Claim",
    "entityType": "Task",
    "property": "assignee",
    "orgValue": null,
    "newValue": "demo"}]

## (2) Request

Gets an operation that updates a multiple process instances with the same key.

GET `/history/user-operation?operationType=Suspend&userId=demo`

## Response

    [{"id": "anUserOperationLogEntryId",
    "deploymentId": "aDeploymentId",
    "processDefinitionId": "aProcessDefinitionId",
    "processDefinitionKey": "aProcessDefinitionKey",
    "processInstanceId": null,
    "executionId": null,
    "taskId": null,
    "jobId": null,
    "jobDefinitionId": null,
    "userId": "demo",
    "timestamp": "2014-02-25T14:58:37",
    "operationId": "anOperationId",
    "operationType": "Suspend",
    "entityType": "ProcessInstance",
    "property": "suspensionState",
    "orgValue": null,
    "newValue": "suspended"}]
