---

title: 'Get Task (Historic) (POST)'
shortTitle: 'Get Task (POST)'
category: 'History'

keywords: 'historic post query list'

---


Query for historic tasks that fulfill the given parameters.
This method is slightly more powerful than the [GET query](ref:#history-get-task-historic) because it allows
filtering by multiple process or task variables of types `String`, `Number` or `Boolean`.
The size of the result set can be retrieved by using [get tasks count (POST)](ref:#history-get-task-count-post) method.


Method
------

POST `/history/task`


Parameters
----------

#### Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
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

#### Request Body

A JSON object with the following properties:

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
    <td>finished</td>
    <td>Only include finished tasks. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>unfinished</td>
    <td>Only include unfinished tasks. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>processFinished</td>
    <td>Only include tasks of finished processes. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>processUnfinished</td>
    <td>Only include tasks of unfinished processes. Values may be <code>true</code> or <code>false</code>.</td>
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
    <td>taskVariables</td>
    <td>A JSON array to only include tasks that have variables with certain values. <br/>

    The array consists of JSON objects with three properties <code>name</code>, <code>operator</code> and <code>value</code>.
    <code>name</code> is the variable name, <code>operator</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <code>value</code> may be of type <code>String</code>, <code>Number</code> or <code>Boolean</code>.<br/>
    <br/>
    Valid operator values are: <code>eq</code> - equal to; <code>neq</code> - not equal to; <code>gt</code> - greater than;
    <code>gteq</code> - greater than or equal to; <code>lt</code> - lower than; <code>lteq</code> - lower than or equal to;
    <code>like</code>.<br/>
    </td>
  </tr>
  <tr>
    <td>processVariables</td>
    <td>A JSON array to only include tasks that belong to a process instance with variables with certain values.<br/>
    The array consists of JSON objects with three properties <code>name</code>, <code>operator</code> and <code>value</code>.
    <code>name</code> is the variable name, <code>operator</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <code>value</code> may be of type <code>String</code>, <code>Number</code> or <code>Boolean</code>.<br/>
    <br/>
    Valid operator values are: <code>eq</code> - equal to; <code>neq</code> - not equal to; <code>gt</code> - greater than;
    <code>gteq</code> - greater than or equal to; <code>lt</code> - lower than; <code>lteq</code> - lower than or equal to;
    <code>like</code>.<br/>
    </td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results by a given criterion. Valid values are
    <code>taskId</code>, <code>activityInstanceID</code>, <code>processDefinitionId</code>, <code>processInstanceId</code>, <code>executionId</code>,
    <code>duration</code>, <code>endTime</code>, <code>startTime</code>, <code>taskName</code>, <code>taskDescription</code>, <code>assignee</code>, <code>owner</code>, <code>dueDate</code>,
    <code>followUpDate</code>, <code>deleteReason</code>, <code>taskDefinitionKey</code> and <code>priority</code>, <code>caseDefinitionId</code>, <code>caseInstanceId</code>, <code>caseExecutionId</code>
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
  </tr>
</table>


Result
------

A JSON array of historic task objects.
Each historic task object has the following properties:

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
    <td>executionId</td>
    <td>String</td>
    <td>The id of the execution the task belongs to.</td>
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
    <td>caseExecutionId</td>
    <td>String</td>
    <td>The id of the case execution the task belongs to.</td>
  </tr>
  <tr>
    <td>activityInstanceId</td>
    <td>String</td>
    <td>The id of the activity that this object is an instance of.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The task name.</td>
  </tr>
  <tr>
    <td>description</td>
    <td>String</td>
    <td>The task's description.</td>
  </tr>
  <tr>
    <td>deleteReason</td>
    <td>String</td>
    <td>The task's delete reason.</td>
  </tr>
  <tr>
    <td>owner</td>
    <td>String</td>
    <td>The owner's id.</td>
  </tr>
  <tr>
    <td>assignee</td>
    <td>String</td>
    <td>The assignee's id.</td>
  </tr>
  <tr>
    <td>startTime</td>
    <td>String</td>
    <td>The time the task was started. Has the format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
  </tr>
  <tr>
    <td>endTime</td>
    <td>String</td>
    <td>The time the task ended. Has the format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
  </tr>
  <tr>
    <td>duration</td>
    <td>Number</td>
    <td>The time the task took to finish (in milliseconds).</td>
  </tr>
  <tr>
    <td>taskDefinitionKey</td>
    <td>String</td>
    <td>The task's key.</td>
  </tr>
  <tr>
    <td>priority</td>
    <td>Number</td>
    <td>The task's priority.</td>
  </tr>
  <tr>
    <td>due</td>
    <td>String</td>
    <td>The task's due date. Has the format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
  </tr>
  <tr>
    <td>parentTaskId</td>
    <td>String</td>
    <td>The id of the parent task, if this task is a subtask.</td>
  </tr>
  <tr>
    <td>followUp</td>
    <td>String</td>
    <td>The follow-up date for the task. Format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

POST `/history/task`

Request body:

    {"taskVariables":
        [{"name": "varName",
        "value": "varValue",
        "operator": "eq"
        },
        {"name": "anotherVarName",
        "value": 30,
        "operator": "neq"}],
    "priority":10}

Response

    [{"id":"anId",
     "processDefinitionId":"aProcDefId",
     "processInstanceId":"aProcInstId",
     "executionId":"anExecution",
     "caseDefinitionId":"aCaseDefId",
     "caseInstanceId":"aCaseInstId",
     "caseExecutionId":"aCaseExecution",
     "activityInstanceId": "anActInstId",
     "name":"aName",
     "description":"aDescription",
     "deleteReason": "aDeleteReason",
     "owner":"anOwner",
     "assignee":"anAssignee",
     "startTime":"2013-01-23T13:42:42",
     "endTime":"2013-01-23T13:45:42",
     "duration": 2000,
     "taskDefinitionKey":"aTaskDefinitionKey",
     "priority":10,
     "due":"2013-01-23T13:49:42",
     "parentTaskId":"aParentId",
     "followUp:":"2013-01-23T13:44:42"}]

