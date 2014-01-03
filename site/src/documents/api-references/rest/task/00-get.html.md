---

title: 'Get Single Task'
category: 'Task'

keywords: 'get'

---


Retrieves a single task by its id.


Method
------

GET `/task/{id}`


Parameters
----------

#### Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to be retrieved.</td>
  </tr>
</table>


Result
------

A json object corresponding to the Task interface in the engine.
Its properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the task.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The tasks name.</td>
  </tr>
  <tr>
    <td>assignee</td>
    <td>String</td>
    <td>The user assigned to this task.</td>
  </tr>
  <tr>
    <td>created</td>
    <td>String</td>
    <td>The time the task was created. Format `yyyy-MM-dd'T'HH:mm:ss`.</td>
  </tr>
  <tr>
    <td>due</td>
    <td>String</td>
    <td>The due date for the task. Format `yyyy-MM-dd'T'HH:mm:ss`.</td>
  </tr>
  <tr>
    <td>followUp</td>
    <td>String</td>
    <td>The follow-up date for the task. Format `yyyy-MM-dd'T'HH:mm:ss`.</td>
  </tr>
  <tr>
    <td>delegationState</td>
    <td>String</td>
    <td>The delegation state of the task. Corresponds to the `DelegationState` enum in the engine.
    Possible values are `RESOLVED` and `PENDING`.</td>
  </tr>
  <tr>
    <td>description</td>
    <td>String</td>
    <td>The task description.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>String</td>
    <td>The id of the execution the task belongs to.</td>
  </tr>
  <tr>
    <td>owner</td>
    <td>String</td>
    <td>The owner of the task.</td>
  </tr>
  <tr>
    <td>parentTaskId</td>
    <td>String</td>
    <td>The id of the parent task, if this task is a subtask.</td>
  </tr>
  <tr>
    <td>priority</td>
    <td>Number</td>
    <td>The priority of the task.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition this task belongs to.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance this task belongs to.</td>
  </tr>
  <tr>
    <td>taskDefinitionKey</td>
    <td>String</td>
    <td>The task definition key.</td>
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
    <td>404</td>
    <td>application/json</td>
    <td>Task with given id does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/task/anId`

#### Response

    {"id":"anId",
    "name":"aName",
    "assignee":"anAssignee",
    "created":"2013-01-23T13:42:42",
    "due":"2013-01-23T13:49:42",
    "followUp:":"2013-01-23T13:44:42",
    "delegationState":"RESOLVED",
    "description":"aDescription",
    "executionId":"anExecution",
    "owner":"anOwner",
    "parentTaskId":"aParentId",
    "priority":42,
    "processDefinitionId":"aProcDefId",
    "processInstanceId":"aProcInstId",
    "taskDefinitionKey":"aTaskDefinitionKey"}