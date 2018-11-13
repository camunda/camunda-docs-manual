---

title: 'Delegate Task'
weight: 110

menu:
  main:
    name: "Delegate"
    identifier: "rest-api-task-post-set-delegate"
    parent: "rest-api-task"
    pre: "POST `/task/{id}/delegate`"

---


Delegate a task to another user.


# Method

POST `/task/{id}/delegate`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to delegate.</td>
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
    <td>userId</td>
    <td>The id of the user that the task should be delegated to.</td>
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
    <td>500</td>
    <td>application/json</td>
    <td>If the task does not exist or delegation was not successful. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>
  

# Example
  
## Request

POST `/task/anId/delegate`

Request Body:

    {"userId": "aUserId"}
  
## Response

Status 204. No content.