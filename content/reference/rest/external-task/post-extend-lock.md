---

title: 'Extend Lock on External Task'
weight: 100

menu:
  main:
    name: "Extend Lock"
    identifier: "rest-api-external-task-post-extend-lock"
    parent: "rest-api-external-task"
    pre: "POST `/external-task/{id}/extendLock`"

---

Extends the timeout of the lock by a given amount of time.

# Method

POST `/external-task/{id}/extendLock`


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
    <td>newDuration</td>
    <td>An amount of time (in milliseconds). This is the new lock duration starting from the current moment.</td>
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
    <td>404</td>
    <td>application/json</td>
    <td>Returned if the task does not exist. This could indicate a wrong task id as well as a cancelled task, e.g., due to a caught BPMN boundary event. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
   <tr>
    <td>400</td>
    <td>application/json</td>
    <td>In case the new lock duration is negative or the external task is not locked by the given worker or not locked at all, an exception of type <code>InvalidRequestException</code> is returned. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

POST `/external-task/anId/extendLock`

Request Body:

    {
      "workerId": "anId",
      "newDuration": 100000
    }

## Response

Status 204. No content.
