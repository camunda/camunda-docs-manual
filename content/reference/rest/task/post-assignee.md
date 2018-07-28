---

title: 'Set Assignee'
weight: 100

menu:
  main:
    identifier: "rest-api-task-post-set-assignee"
    parent: "rest-api-task"
    pre: "POST `/task/{id}/assignee`"

---


Changes the assignee of a task to a specific user.

**Note:** The difference with the [Claim Task]({{< relref "reference/rest/task/post-claim.md" >}}) method is that this method does not check if the task already has a user assigned to it.


# Method

POST `/task/{id}/assignee`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to set the assignee for.</td>
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
    <td>The id of the user that will be the assignee of the task.</td>
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
    <td>Task with given id does not exist or setting the assignee was not successful. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

POST `/task/anId/assignee`

Request Body:

    {"userId": "aUserId"}

## Response

Status 204. No content.