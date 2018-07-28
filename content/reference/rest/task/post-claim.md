---

title: 'Claim Task'
weight: 60

menu:
  main:
    name: "Claim"
    identifier: "rest-api-task-post-claim"
    parent: "rest-api-task"
    pre: "POST `/task/{id}/claim`"

---


Claims a task for a specific user.

**Note:** The difference with the [Set Assignee]({{< ref "/reference/rest/task/post-assignee.md" >}}) method is that here a check is performed to see if the task already has a user assigned to it.

# Method

POST `/task/{id}/claim`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to claim.</td>
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
    <td>The id of the user that claims the task.</td>
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
    <td>Task with given id does not exist or claiming was not successful. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

POST `/task/anId/claim`

Request Body:

    {"userId": "aUserId"}

## Response

Status 204. No content.