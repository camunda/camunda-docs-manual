---

title: 'Get Tasks'
weight: 20

menu:
  main:
    name: "Get List"
    identifier: "rest-api-task-get-list"
    parent: "rest-api-task"
    pre: "GET `/task`"

---


Queries for tasks that fulfill a given filter.
The size of the result set can be retrieved by using the [Get Task Count]({{< ref "/reference/rest/task/get-query-count.md" >}}) method.

{{< note title="Security Consideration" class="warning" >}}
  There are several query parameters (such as `assigneeExpression`) for specifying an EL expression. These are disabled by default to prevent remote code execution. See the section on <a href="{{< ref "/user-guide/process-engine/securing-custom-code.md">}}">security considerations for custom code</a> in the user guide for details.
{{</note>}}

# Method

GET `/task`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Restrict to tasks that belong to process instances with the given id.</td>
  </tr>
  <tr>
    <td>processInstanceIdIn</td>
    <td>Restrict to tasks that belong to process instances with the given ids.</td>
  </tr>
  <tr>
    <td>processInstanceBusinessKey</td>
    <td>Restrict to tasks that belong to process instances with the given business key.</td>
  </tr>
  <tr>
    <td>processInstanceBusinessKeyExpression</td>
    <td>Restrict to tasks that belong to process instances with the given business key which is described by an expression.
     See the 
     <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">user guide</a>
     for more information on available functions.</td>
  </tr>
  <tr>
    <td>processInstanceBusinessKeyIn</td>
    <td>Restrict to tasks that belong to process instances with one of the give business keys.
        The keys need to be in a comma-separated list.
    </td>
  </tr>
  <tr>
    <td>processInstanceBusinessKeyLike</td>
    <td>Restrict to tasks that have a process instance business key that has the parameter value as a substring.</td>
  </tr>
  <tr>
    <td>processInstanceBusinessKeyLikeExpression</td>
    <td>Restrict to tasks that have a process instance business key that has the parameter value as a substring and is 
    described by an expression. See the 
    <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">user guide</a>
    for more information on available functions.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Restrict to tasks that belong to a process definition with the given id.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Restrict to tasks that belong to a process definition with the given key.</td>
  </tr>
  <tr>
    <td>processDefinitionKeyIn</td>
    <td>Restrict to tasks that belong to a process definition with one of the given keys.
        The keys need to be in a comma-separated list.
    </td>
  </tr>
  <tr>
    <td>processDefinitionName</td>
    <td>Restrict to tasks that belong to a process definition with the given name.</td>
  </tr>
  <tr>
    <td>processDefinitionNameLike</td>
    <td>Restrict to tasks that have a process definition name that has the parameter value as a substring.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>Restrict to tasks that belong to an execution with the given id.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>Restrict to tasks that belong to case instances with the given id.</td>
  </tr>
  <tr>
    <td>caseInstanceBusinessKey</td>
    <td>Restrict to tasks that belong to case instances with the given business key.</td>
  </tr>
  <tr>
    <td>caseInstanceBusinessKeyLike</td>
    <td>Restrict to tasks that have a case instance business key that has the parameter value as a substring.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>Restrict to tasks that belong to a case definition with the given id.</td>
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
    <td>caseDefinitionNameLike</td>
    <td>Restrict to tasks that have a case definition name that has the parameter value as a substring.</td>
  </tr>
  <tr>
    <td>caseExecutionId</td>
    <td>Restrict to tasks that belong to a case execution with the given id.</td>
  </tr>
  <tr>
    <td>activityInstanceIdIn</td>
    <td>Only include tasks which belong to one of the passed and comma-separated activity instance ids.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Only include tasks which belong to one of the passed and comma-separated tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include tasks which belong to no tenant. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>assignee</td>
    <td>Restrict to tasks that the given user is assigned to.</td>
  </tr>
  <tr>
    <td>assigneeExpression</td>
    <td>Restrict to tasks that the user described by the given expression is assigned to. See the
        <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">user guide</a>
        for more information on available functions.</td>
  </tr>
  <tr>
    <td>assigneeLike</td>
    <td>Restrict to tasks that have an assignee that has the parameter value as a substring.</td>
  </tr>
  <tr>
    <td>assigneeLikeExpression</td>
    <td>Restrict to tasks that have an assignee that has the parameter value described by the given
        expression as a substring.
        See the <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">user
        guide</a> for more information on available functions.
    </td>
  </tr>
  <tr>
    <td>assigneeIn</td>
    <td>Only include tasks which are assigned to one of the passed and comma-separated user ids.</td>
  </tr>
  <tr>
    <td>owner</td>
    <td>Restrict to tasks that the given user owns.</td>
  </tr>
  <tr>
    <td>ownerExpression</td>
    <td>Restrict to tasks that the user described by the given expression owns.
        See the <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">user
        guide</a> for more information on available functions.
    </td>
  </tr>
  <tr>
    <td>candidateGroup</td>
    <td>Only include tasks that are offered to the given group.</td>
  </tr>
  <tr>
    <td>candidateGroupExpression</td>
    <td>Only include tasks that are offered to the group described by the given expression.
        See the <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">user
        guide</a> for more information on available functions.
    </td>
  </tr>
  <tr>
    <td>candidateUser</td>
    <td>Only include tasks that are offered to the given user or to one of his groups.</td>
  </tr>
  <tr>
    <td>candidateUserExpression</td>
    <td>Only include tasks that are offered to the user described by the given expression.
        See the <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">user
        guide</a> for more information on available functions.
    </td>
  </tr>
  <tr>
    <td>includeAssignedTasks</td>
    <td>
      Also include tasks that are assigned to users in candidate queries. Default is to only include tasks that are not assigned to any user
      if you query by candidate user or group(s).
    </td>
  </tr>
  <tr>
    <td>involvedUser</td>
    <td>Only include tasks that the given user is involved in.
    A user is involved in a task if an identity link exists between task and user (e.g., the user is the assignee).</td>
  </tr>
  <tr>
    <td>involvedUserExpression</td>
    <td>Only include tasks that the user described by the given expression is involved in.
        A user is involved in a task if an identity link exists between task and user
        (e.g., the user is the assignee).
        See the <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">user
        guide</a> for more information on available functions.
    </td>
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
    <td>taskDefinitionKey</td>
    <td>Restrict to tasks that have the given key.</td>
  </tr>
  <tr>
    <td>taskDefinitionKeyIn</td>
    <td>Restrict to tasks that have one of the given keys.
      The keys need to be in a comma-separated list.
    </td>
  </tr>
  <tr>
    <td>taskDefinitionKeyLike</td>
    <td>Restrict to tasks that have a key that has the parameter value as a substring.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Restrict to tasks that have the given name.</td>
  </tr>
  <tr>
    <td>nameNotEqual</td>
    <td>Restrict to tasks that do not have the given name.</td>
  </tr>
  <tr>
    <td>nameLike</td>
    <td>Restrict to tasks that have a name with the given parameter value as substring.</td>
  </tr>
  <tr>
    <td>nameNotLike</td>
    <td>Restrict to tasks that do not have a name with the given parameter value as substring.</td>
  </tr>
  <tr>
    <td>description</td>
    <td>Restrict to tasks that have the given description.</td>
  </tr>
  <tr>
    <td>descriptionLike</td>
    <td>Restrict to tasks that have a description that has the parameter value as a substring.</td>
  </tr>

  <tr>
    <td>priority</td>
    <td>Restrict to tasks that have the given priority.</td>
  </tr>
  <tr>
    <td>maxPriority</td>
    <td>Restrict to tasks that have a lower or equal priority.</td>
  </tr>
  <tr>
    <td>minPriority</td>
    <td>Restrict to tasks that have a higher or equal priority.</td>
  </tr>
  <tr>
    <td>dueDate</td>
    <td>Restrict to tasks that are due on the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.546+0200</code>.</td>
  </tr>
  <tr>
    <td>dueDateExpression</td>
    <td>Restrict to tasks that are due on the date described by the given expression.
        See the <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">
        user guide</a> for more information on available functions.
        The expression must evaluate to a <code>java.util.Date</code> or <code>org.joda.time.DateTime</code>
        object.
    </td>
  </tr>
  <tr>
    <td>dueAfter</td>
    <td>Restrict to tasks that are due after the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.435+0200</code>.</td>
  </tr>
  <tr>
    <td>dueAfterExpression</td>
    <td>Restrict to tasks that are due after the date described by the given expression.
        See the <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">
        user guide</a> for more information on available functions.
        The expression must evaluate to a <code>java.util.Date</code> or <code>org.joda.time.DateTime</code> object.
    </td>
  </tr>
  <tr>
    <td>dueBefore</td>
    <td>Restrict to tasks that are due before the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.243+0200</code>.</td>
  </tr>
  <tr>
    <td>dueBeforeExpression</td>
    <td>Restrict to tasks that are due before the date described by the given expression.
        See the <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">
        user guide</a> for more information on available functions.
        The expression must evaluate to a <code>java.util.Date</code> or <code>org.joda.time.DateTime</code> object.
    </td>
  </tr>
  <tr>
    <td>followUpDate</td>
    <td>Restrict to tasks that have a followUp date on the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.342+0200</code>.</td>
  </tr>
  <tr>
    <td>followUpDateExpression</td>
    <td>Restrict to tasks that have a followUp date on the date described by the given expression.
        See the <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">
        user guide</a> for more information on available functions.
        The expression must evaluate to a <code>java.util.Date</code> or <code>org.joda.time.DateTime</code> object.
    </td>
  </tr>
  <tr>
    <td>followUpAfter</td>
    <td>Restrict to tasks that have a followUp date after the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.542+0200</code>.</td>
  </tr>
  <tr>
    <td>followUpAfterExpression</td>
    <td>Restrict to tasks that have a followUp date after the date described by the given
        expression.
        See the <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">
        user guide</a> for more information on available functions.
        The expression must evaluate to a <code>java.util.Date</code> or <code>org.joda.time.DateTime</code> object.
    </td>
  </tr>
  <tr>
    <td>followUpBefore</td>
    <td>Restrict to tasks that have a followUp date before the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.234+0200</code>.</td>
  </tr>
  <tr>
    <td>followUpBeforeExpression</td>
    <td>Restrict to tasks that have a followUp date before the date described by the given
        expression.
        See the <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">
        user guide</a> for more information on available functions.
        The expression must evaluate to a <code>java.util.Date</code> or <code>org.joda.time.DateTime</code> object.
    </td>
  </tr>
  <tr>
    <td>followUpBeforeOrNotExistent</td>
    <td>Restrict to tasks that have no followUp date or a followUp date before the given date.
    By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.432+0200</code>.
    The typical use case is to query all "active" tasks for a user for a given date.</td>
  </tr>
  <tr>
    <td>followUpBeforeOrNotExistentExpression</td>
    <td>Restrict to tasks that have no followUp date or a followUp date before the date described by the given
        expression.
        See the <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">
        user guide</a> for more information on available functions.
        The expression must evaluate to a <code>java.util.Date</code> or <code>org.joda.time.DateTime</code> object.
    </td>
  </tr>
  <tr>
    <td>createdOn</td>
    <td>
      Restrict to tasks that were created on the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.324+0200</code>.
    </td>
  </tr>
  <tr>
    <td>createdOnExpression</td>
    <td>Restrict to tasks that were created on the date described by the given expression.
        See the <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">
        user guide</a> for more information on available functions.
        The expression must evaluate to a <code>java.util.Date</code> or <code>org.joda.time.DateTime</code> object.
    </td>
  </tr>
  <tr>
    <td>createdAfter</td>
    <td>Restrict to tasks that were created after the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.342+0200</code>.</td>
  </tr>
  <tr>
    <td>createdAfterExpression</td>
    <td>Restrict to tasks that were created after the date described by the given expression.
        See the <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">
        user guide</a> for more information on available functions.
        The expression must evaluate to a <code>java.util.Date</code> or <code>org.joda.time.DateTime</code> object.
    </td>
  </tr>
  <tr>
    <td>createdBefore</td>
    <td>Restrict to tasks that were created before the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.332+0200</code>.</td>
  </tr>
  <tr>
    <td>createdBeforeExpression</td>
    <td>Restrict to tasks that were created before the date described by the given expression.
        See the <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">
        user guide</a> for more information on available functions.
        The expression must evaluate to a <code>java.util.Date</code> or <code>org.joda.time.DateTime</code> object.
    </td>
  </tr>
  <tr>
    <td>delegationState</td>
    <td>Restrict to tasks that are in the given delegation state. Valid values are <code>PENDING</code> and <code>RESOLVED</code>.</td>
  </tr>
  <tr>
    <td>candidateGroups</td>
    <td>Restrict to tasks that are offered to any of the given candidate groups. Takes a comma-separated list of group names, so for example <code>developers,support,sales</code>.</td>
  </tr>
  <tr>
    <td>candidateGroupsExpression</td>
    <td>Restrict to tasks that are offered to any of the candidate groups described by the given expression.
        See the <a href="{{< ref "/user-guide/process-engine/expression-language.md#internal-context-functions" >}}">user
        guide</a> for more information on available functions.
        The expression must evaluate to <code>java.util.List</code> of Strings.
    </td>
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
  <tr>
    <td>withCandidateUsers</td>
    <td>Only include tasks which have a candidate user. Value may only be <code>true</code>,
    as <code>false</code> is the default behavior.</td>
  </tr>
   <tr>
    <td>withoutCandidateUsers</td>
    <td>Only include tasks which have no candidate users. Value may only be <code>true</code>, 
    as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Only include active tasks. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Only include suspended tasks. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
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
    <td>caseInstanceVariables</td>
    <td>Only include tasks that belong to case instances that have variables with certain values.
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
    <td>variableNamesIgnoreCase</td>
    <td>Match all variable names in this query case-insensitively. If set <code>variableName</code> and <code>variablename</code> are treated as equal.</td>
  </tr>
  <tr>
    <td>variableValuesIgnoreCase</td>
    <td>Match all variable values in this query case-insensitively. If set <code>variableValue</code> and <code>variablevalue</code> are treated as equal.</td>
  </tr>
  <tr>
    <td>parentTaskId</td>
    <td>Restrict query to all tasks that are sub tasks of the given task. Takes a task id.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>instanceId</code>, <code>caseInstanceId</code>, <code>dueDate</code>, <code>executionId</code>, <code>caseExecutionId</code>,<code>assignee</code>, <code>created</code>,
    <code>description</code>, <code>id</code>, <code>name</code>, <code>nameCaseInsensitive</code> and <code>priority</code>.
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

\* For further information, please see the <a href="{{< ref "/reference/rest/overview/date-format.md" >}}"> documentation</a>.

# Result

A JSON array of task objects.
Each task object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The task id.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The task name.</td>
  </tr>
  <tr>
    <td>assignee</td>
    <td>String</td>
    <td>The assignee's id.</td>
  </tr>
  <tr>
    <td>owner</td>
    <td>String</td>
    <td>The owner's id.</td>
  </tr>
  <tr>
    <td>created</td>
    <td>String</td>
    <td>The date the task was created on. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>due</td>
    <td>String</td>
    <td>The task's due date. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>followUp</td>
    <td>String</td>
    <td>The follow-up date for the task. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>delegationState</td>
    <td>String</td>
    <td>The task's delegation state. Possible values are <code>PENDING</code> and <code>RESOLVED</code>.</td>
  </tr>
  <tr>
    <td>description</td>
    <td>String</td>
    <td>The task's description.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>String</td>
    <td>The id of the execution the task belongs to.</td>
  </tr>
  <tr>
    <td>parentTaskId</td>
    <td>String</td>
    <td>The id the parent task, if this task is a subtask.</td>
  </tr>
  <tr>
    <td>priority</td>
    <td>Number</td>
    <td>The task's priority.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition the task belongs to.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance the task belongs to.</td>
  </tr>
  <tr>
    <td>caseExecutionId</td>
    <td>String</td>
    <td>The id of the case execution the task belongs to.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>String</td>
    <td>The id of the case definition the task belongs to.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>String</td>
    <td>The id of the case instance the task belongs to.</td>
  </tr>
  <tr>
    <td>taskDefinitionKey</td>
    <td>String</td>
    <td>The task's key.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Boolean</td>
    <td>Whether the task belongs to a process instance that is suspended.</td>
  </tr>
  <tr>
    <td>formKey</td>
    <td>String</td>
    <td>If not null, the form key for the task.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>If not null, the tenant id of the task.</td>
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
    <td>200</td>
    <td>application/hal+json</td>
    <td>Request successful. In case of an expected <a href="{{< ref "/reference/rest/overview/hal.md" >}}">HAL</a> response.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>, or if an invalid operator for variable comparison is used. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/task?assignee=anAssignee&delegationState=RESOLVED&maxPriority=50`

## Response

    [{"id":"anId",
     "name":"aName",
     "assignee":"anAssignee",
     "created":"2013-01-23T13:42:42.657+0200",
     "due":"2013-01-23T13:49:42.323+0200",
     "followUp:":"2013-01-23T13:44:42.987+0200",
     "delegationState":"RESOLVED",
     "description":"aDescription",
     "executionId":"anExecution",
     "owner":"anOwner",
     "parentTaskId":"aParentId",
     "priority":42,
     "processDefinitionId":"aProcDefId",
     "processInstanceId":"aProcInstId",
     "caseDefinitionId":"aCaseDefId",
     "caseInstanceId":"aCaseInstId",
     "caseExecutionId":"aCaseExecution",
     "taskDefinitionKey":"aTaskDefinitionKey",
     "suspended": false,
     "formKey":"aFormKey",
     "tenantId": "aTenantId" }]
