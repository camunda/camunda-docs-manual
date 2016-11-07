---

title: "Get Task Count"
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-history-get-task-query-count"
    parent: "rest-api-history-task"
    pre: "GET `/history/task/count`"

---


Queries for the number of historic tasks that fulfill the given parameters.
Takes the same parameters as the [Get Tasks (Historic)]({{< relref "reference/rest/history/task/get-task-query.md" >}}) method.


# Method

GET `/history/task/count`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>taskId</td>
    <td>Filter by task id.</td>
  </tr>
  <tr>
    <td>taskParentTaskId</td>
    <td>Filter by parent task id.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by process instance id.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>Filter by the id of the execution that executed the task.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Filter by process definition id.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Restrict to tasks that belong to a process definition with the given key.</td>
  </tr>
  <tr>
    <td>processDefinitionName</td>
    <td>Restrict to tasks that belong to a process definition with the given name.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>Filter by case instance id.</td>
  </tr>
  <tr>
    <td>caseExecutionId</td>
    <td>Filter by the id of the case execution that executed the task.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>Filter by case definition id.</td>
  </tr>
  <tr>
    <td>caseDefinitionKey</td>
    <td>Restrict to tasks that belong to a case definition with the given key.</td>
  </tr>
  <tr>
    <td>caseDefinitionName</td>
    <td>Restrict to tasks that belong to a case definition with the given name.</td>
  </tr>
  <tr>
    <td>activityInstanceIdIn</td>
    <td>Only include tasks which belong to one of the passed and comma-separated activity instance ids.</td>
  </tr>
  <tr>
    <td>taskName</td>
    <td>Restrict to tasks that have the given name.</td>
  </tr>
  <tr>
    <td>taskNameLike</td>
    <td>Restrict to tasks that have a name with the given parameter value as substring.</td>
  </tr>
  <tr>
    <td>taskDescription</td>
    <td>Restrict to tasks that have the given description.</td>
  </tr>
  <tr>
    <td>taskDescriptionLike</td>
    <td>Restrict to tasks that have a description that has the parameter value as a substring.</td>
  </tr>
  <tr>
    <td>taskDefinitionKey</td>
    <td>Restrict to tasks that have the given key.</td>
  </tr>
  <tr>
    <td>taskDefinitionKeyIn</td>
    <td>Restrict to tasks that have one of the passed and comma-separated task definition keys.</td>
  </tr>
  <tr>
    <td>taskDeleteReason</td>
    <td>Restrict to tasks that have the given delete reason.</td>
  </tr>
  <tr>
    <td>taskDeleteReasonLike</td>
    <td>Restrict to tasks that have a delete reason that has the parameter value as a substring.</td>
  </tr>
  <tr>
    <td>taskAssignee</td>
    <td>Restrict to tasks that the given user is assigned to.</td>
  </tr>
  <tr>
    <td>taskAssigneeLike</td>
    <td>Restrict to tasks that are assigned to users with the parameter value as a substring.</td>
  </tr>
  <tr>
    <td>taskOwner</td>
    <td>Restrict to tasks that the given user owns.</td>
  </tr>
  <tr>
    <td>taskOwnerLike</td>
    <td>Restrict to tasks that are owned by users with the parameter value as a substring.</td>
  </tr>
  <tr>
    <td>taskPriority</td>
    <td>Restrict to tasks that have the given priority.</td>
  </tr>
  <tr>
    <td>assigned</td>
    <td>If set to <code>true</code>, restricts the query to all tasks that are assigned.</td>
  </tr>
  <tr>
    <td>unassigned</td>
    <td>If set to <code>true</code>, restricts the query to all tasks that are unassigned.</td>
  </tr>
  <tr>
    <td>finished</td>
    <td>Only include finished tasks. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>unfinished</td>
    <td>Only include unfinished tasks. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>processFinished</td>
    <td>Only include tasks of finished processes. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>processUnfinished</td>
    <td>Only include tasks of unfinished processes. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>taskDueDate</td>
    <td>Restrict to tasks that are due on the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>taskDueDateBefore</td>
    <td>Restrict to tasks that are due before the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>taskDueDateAfter</td>
    <td>Restrict to tasks that are due after the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>taskFollowUpDate</td>
    <td>Restrict to tasks that have a followUp date on the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>taskFollowUpDateBefore</td>
    <td>Restrict to tasks that have a followUp date before the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>taskFollowUpDateAfter</td>
    <td>Restrict to tasks that have a followUp date after the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. A task instance must have one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>taskVariables</td>
    <td>Only include tasks that have variables with certain values.
    Variable filtering expressions are comma-separated and are structured as follows:<br/>
    A valid parameter value has the form <code>key_operator_value</code>.
    <code>key</code> is the variable name, <code>operator</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <strong>Note:</strong> Values are always treated as <code>String</code> objects on server side.<br/>
    <br/>
    Valid operator values are: <code>eq</code> - equal to; <code>neq</code> - not equal to; <code>gt</code> - greater than;
    <code>gteq</code> - greater than or equal to; <code>lt</code> - lower than; <code>lteq</code> - lower than or equal to;
    <code>like</code>.<br/>
    <code>key</code> and <code>value</code> may not contain underscore or comma characters.
    </td>
  </tr>
  <tr>
    <td>processVariables</td>
    <td>Only include tasks that belong to process instances that have variables with certain values.
    Variable filtering expressions are comma-separated and are structured as follows:<br/>
    A valid parameter value has the form <code>key_operator_value</code>.
    <code>key</code> is the variable name, <code>operator</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <strong>Note:</strong> Values are always treated as <code>String</code> objects on server side.<br/>
    <br/>
    Valid operator values are: <code>eq</code> - equal to; <code>neq</code> - not equal to; <code>gt</code> - greater than;
    <code>gteq</code> - greater than or equal to; <code>lt</code> - lower than; <code>lteq</code> - lower than or equal to;
    <code>like</code>.<br/>
    <code>key</code> and <code>value</code> may not contain underscore or comma characters.
    </td>
  </tr>
   <tr>
    <td>taskInvolvedUser</td>
    <td>Restrict to tasks with a historic identity link to the given user.</td>
  </tr>
  <tr>
    <td>taskInvolvedGroup</td>
    <td>Restrict to tasks with a historic identity link to the given group.</td>
  </tr>
  <tr>
    <td>taskHadCandidateUser</td>
    <td>Restrict to tasks with a historic identity link to the given candidate user.</td>
  </tr>
  <tr>
    <td>taskHadCandidateGroup</td>
    <td>Restrict to tasks with a historic identity link to the given candidate group.</td>
  </tr>
  <tr>
    <td>withCandidateGroups</td>
    <td>Only include tasks which have a candidate group. Value may only be <code>true</code>, 
    as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>withoutCandidateGroups</td>
    <td>Only include tasks which have no candidate group. Value may only be <code>true</code>, 
    as <code>false</code> is the default behavior.</td>
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
    <td>The number of matching historic tasks.</td>
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
    <td>Returned if some of the query parameters are invalid. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/history/task/count?taskAssginee=anAssignee&taskPriority=50`

## Response

    {"count": 1}
