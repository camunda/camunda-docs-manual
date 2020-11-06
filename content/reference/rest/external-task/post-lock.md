---

title: 'Lock External Task'
weight: 90

menu:
  main:
    name: "Lock"
    identifier: "rest-api-external-task-post-lock"
    parent: "rest-api-external-task"
    pre: "POST `/external-task/{id}/lock`"

---

Lock an external task by a given id for a specified worker and amount of time.
**Note:** Attempting to lock an already locked external task with the same worker
will succeed and a new lock duration will be set, starting from the current moment.

# Method

POST `/external-task/{id}/lock`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the external task.</td>
  </tr>
</table>

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>lockDuration</td>
    <td>The duration to lock the external task for in milliseconds.</td>
  </tr>
  <tr>
    <td>workerId</td>
    <td>The ID of a worker who is locking the external task.</td>
  </tr>
</table>


# Result

This method returns no content.


# Response Codes

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
   <td>In case the lock duration is negative or the external task is already locked by
       a different worker, an exception of type <code>InvalidRequestException</code> is 
       returned. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> 
       for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Returned if the task does not exist. This could indicate a wrong task id as well 
    as a cancelled task, e.g., due to a caught BPMN boundary event. See the 
    <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> 
    for the error response format.</td>
  </tr>
</table>

# Example

## Request

POST `/external-task/anId/lock`

Request Body:

```json
    {
      "workerId": "anId",
      "lockDuration": 100000
    }
```

## Response

Status 204. No content.
