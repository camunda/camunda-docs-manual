---

title: 'Get Tasks'
category: 'Task'

keywords: 'get query list'

---


Query for tasks that fulfill a given filter.
The size of the result set can be retrieved by using [get tasks count](ref:#task-get-tasks-count) method.


Method
------

GET `/task`


Parameters
----------

#### Query Parameters

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
    <td>processInstanceBusinessKey</td>
    <td>Restrict to tasks that belong to process instances with the given business key.</td>
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
    <td>processDefinitionName</td>
    <td>Restrict to tasks that belong to a process definition with the given name.</td>
  </tr>

  <tr>
    <td>executionId</td>
    <td>Restrict to tasks that belong to an execution with the given id.</td>
  </tr>

  <tr>
    <td>activityInstanceIdIn</td>
    <td>Only include tasks which belongs to one of the passed and comma-separated activity instance ids.</td>
  </tr>

  <tr>
    <td>assignee</td>
    <td>Restrict to tasks that the given user is assigned to.</td>
  </tr>
  <tr>
    <td>owner</td>
    <td>Restrict to tasks that the given user owns.</td>
  </tr>
  <tr>
    <td>candidateGroup</td>
    <td>Only include tasks that are offered to the given group.</td>
  </tr>
  <tr>
    <td>candidateUser</td>
    <td>Only include tasks that are offered to the given user.</td>
  </tr>
  <tr>
    <td>involvedUser</td>
    <td>Only include tasks that the given user is involved in.
    A user is involved in a task if there exists an identity link between task and user (e.g. the user is the assignee).</td>
  </tr>
  <tr>
    <td>unassigned</td>
    <td>If set to `true`, restricts the query to all tasks that are unassigned.</td>
  </tr>

  <tr>
    <td>taskDefinitionKey</td>
    <td>Restrict to tasks that have the given key.</td>
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
    <td>nameLike</td>
    <td>Restrict to tasks that have a name with the given parameter value as substring.</td>
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
    <td>due</td>
    <td>Restrict to tasks that are due on the given date. The date must have the format `yyyy-MM-dd'T'HH:mm:ss`, so for example `2013-01-23T14:42:45` is valid.</td>
  </tr>
  <tr>
    <td>dueAfter</td>
    <td>Restrict to tasks that are due after the given date. The date must have the format `yyyy-MM-dd'T'HH:mm:ss`, so for example `2013-01-23T14:42:45` is valid.</td>
  </tr>
  <tr>
    <td>dueBefore</td>
    <td>Restrict to tasks that are due before the given date. The date must have the format `yyyy-MM-dd'T'HH:mm:ss`, so for example `2013-01-23T14:42:45` is valid.</td>
  </tr>
  <tr>
    <td>followUp</td>
    <td>Restrict to tasks that have a followUp date on the given date. The date must have the format `yyyy-MM-dd'T'HH:mm:ss`, so for example `2013-01-23T14:42:45` is valid.</td>
  </tr>
  <tr>
    <td>followUpAfter</td>
    <td>Restrict to tasks that have a followUp date after the given date. The date must have the format `yyyy-MM-dd'T'HH:mm:ss`, so for example `2013-01-23T14:42:45` is valid.</td>
  </tr>
  <tr>
    <td>followUpBefore</td>
    <td>Restrict to tasks that have a followUp date before the given date. The date must have the format `yyyy-MM-dd'T'HH:mm:ss`, so for example `2013-01-23T14:42:45` is valid.</td>
  </tr>


  <tr>
    <td>created</td>
    <td>Restrict to tasks that were created on the given date. The date must have the format `yyyy-MM-dd'T'HH:mm:ss`, so for example `2013-01-23T14:42:45` is valid.</td>
  </tr>
  <tr>
    <td>createdAfter</td>
    <td>Restrict to tasks that were created after the given date. The date must have the format `yyyy-MM-dd'T'HH:mm:ss`, so for example `2013-01-23T14:42:45` is valid.</td>
  </tr>
  <tr>
    <td>createdBefore</td>
    <td>Restrict to tasks that were created before the given date. The date must have the format `yyyy-MM-dd'T'HH:mm:ss`, so for example `2013-01-23T14:42:45` is valid.</td>
  </tr>
  <tr>
    <td>delegationState</td>
    <td>Restrict to tasks that are in the given delegation state. Valid values are `PENDING` and `RESOLVED`.</td>
  </tr>
  <tr>
    <td>candidateGroups</td>
    <td>Restrict to tasks that are offered to any of the given candidate groups. Takes a comma-separated list of group names, so for example `developers,support,sales`.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Only include active tasks. Values may be `true` or `false`.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Only include suspended tasks. Values may be `true` or `false`.</td>
  </tr>
  <tr>
    <td>taskVariables</td>
    <td>Only include tasks that have variables with certain values.
    Variable filtering expressions are comma-separated and are structured as follows:<br/>
    A valid parameter value has the form `key_operator_value`.
    `key` is the variable name, `op` is the comparison operator to be used and `value` the variable value.<br/>
    <strong>Note:</strong> Values are always treated as `String` objects on server side.<br/>
    <br/>
    Valid operator values are: `eq` - equals; `neq` - not equals; `gt` - greater than;
    `gteq` - greater than or equals; `lt` - lower than; `lteq` - lower than or equals;
    `like`.<br/>
    `key` and `value` may not contain underscore or comma characters.
    </td>
  </tr>
  <tr>
    <td>processVariables</td>
    <td>Only include tasks that belong to process instances that have variables with certain values.
    Variable filtering expressions are comma-separated and are structured as follows:<br/>
    A valid parameter value has the form `key_operator_value`.
    `key` is the variable name, `op` is the comparison operator to be used and `value` the variable value.<br/>
    <strong>Note:</strong> Values are always treated as `String` objects on server side.<br/>
    <br/>
    Valid operator values are: `eq` - equals; `neq` - not equals; `gt` - greater than;
    `gteq` - greater than or equals; `lt` - lower than; `lteq` - lower than or equals;
    `like`.<br/>
    `key` and `value` may not contain underscore or comma characters.
    </td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    `instanceId`, `dueDate`, `executionId`, `assignee`, `created`,
    `description`, `id`, `name` and `priority`.
    Must be used in conjunction with the `sortOrder` parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be `asc` for ascending order or `desc` for descending order.
    Must be used in conjunction with the `sortBy` parameter.</td>
  </tr>
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results, if there are no more results left.</td>
  </tr>
</table>


Result
------

A json array of task objects.
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
    <td>The date the task was created on. Has the format `yyyy-MM-dd'T'HH:mm:ss`.</td>
  </tr>
  <tr>
    <td>due</td>
    <td>String</td>
    <td>The task's due date. Has the format `yyyy-MM-dd'T'HH:mm:ss`.</td>
  </tr>
  <tr>
    <td>followUp</td>
    <td>String</td>
    <td>The follow-up date for the task. Format `yyyy-MM-dd'T'HH:mm:ss`.</td>
  </tr>
  <tr>
    <td>delegationState</td>
    <td>String</td>
    <td>The task's delegation state. Possible values are `PENDING` and `RESOLVED`.</td>
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
    <td>taskDefinitionKey</td>
    <td>String</td>
    <td>The task's key.</td>
  </tr>
</table>


Response codes
--------------

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
    <td>Returned if some of the query parameters are invalid, for example if a `sortOrder` parameter is supplied, but no `sortBy`
    or if an invalid operator for variable comparison is used. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/task?assignee=anAssignee&delegationState=RESOLVED&maxPriority=50`

Response

    [{"id":"anId",
     "name":"aName",
     "assignee":"anAssignee",
     "created":"2013-01-23T13:42:42",
     "due":"2013-01-23T13:42:43",
     "followUp:":"2013-01-23T13:44:42",
     "delegationState":"RESOLVED",
     "description":"aDescription",
     "executionId":"anExecution",
     "owner":"anOwner",
     "parentTaskId":"aParentId",
     "priority":42,
     "processDefinitionId":"aProcDefId",
     "processInstanceId":"aProcInstId",
     "taskDefinitionKey":"aTaskDefinitionKey"}]
