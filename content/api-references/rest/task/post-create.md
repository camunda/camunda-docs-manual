---

title: 'Create Task'
weight: 320

menu:
  main:
    identifier: "rest-api-task-post-create"
    parent: "rest-api-task"

---


Create a new task.


Method
------

POST `/task/create`


Parameters
----------

#### Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Type</th>
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
    <td>The task name.</td>
  </tr>
  <tr>
    <td>description</td>
    <td>String</td>
    <td>The task description.</td>
  </tr>
  <tr>
    <td>assignee</td>
    <td>String</td>
    <td>The user to assign to this task.</td>
  </tr>
  <tr>
    <td>owner</td>
    <td>String</td>
    <td>The owner of the task.</td>
  </tr>
  <tr>
  <tr>
    <td>delegationState</td>
    <td>String</td>
    <td>The delegation state of the task. Corresponds to the <code>DelegationState</code> enum in the engine.
    Possible values are <code>RESOLVED</code> and <code>PENDING</code>.</td>
  </tr>
    <td>due</td>
    <td>String</td>
    <td>The due date for the task. Format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
  </tr>
  <tr>
    <td>followUp</td>
    <td>String</td>
    <td>The follow-up date for the task. Format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
  </tr>
  <tr>
    <td>priority</td>
    <td>Number</td>
    <td>The priority of the task.</td>
  </tr>
  <tr>
    <td>parentTaskId</td>
    <td>String</td>
    <td>The id of the parent task, if this task is a subtask.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>String</td>
    <td>The id of the case instance the task belongs to.</td>
  </tr>
</table>


Result
------

This method returns no content.


Response codes
--------------  

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td></td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>Returned if a not valid <code>delegationState</code> is supplied. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

POST `/task/create`

Request body:

    {
      "id": "aTaskId",
      "name": "My Task",
      "description": "This have to be done very urgent",
      "priority" : 30,
      "assignee" : "peter",
      "owner" : "mary",
      "delegationState" : "PENDING",
      "due" : "2014-08-30T10:00:00",
      "followUp" : "2014-08-25T10:00:00",
      "parentTaskId" : "aParentTaskId",
      "caseInstanceId" : "aCaseInstanceId"
    }

#### Response

Status 204. No content.
