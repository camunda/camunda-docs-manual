---

title: 'Delete Identity Link'
weight: 140

menu:
  main:
    name: "Delete"
    identifier: "rest-api-task-post-delete-identity-link"
    parent: "rest-api-task-identity-links"
    pre: "POST `/task/{id}/identity-links/delete`"

---


Removes an identity link from a task by id.


# Method

POST `/task/{id}/identity-links/delete`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to remove a link from.</td>
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
    <td>The id of the user being part of the link. If you set this parameter, you have to omit <code>groupId</code>.</td>
  </tr>
  <tr>
    <td>groupId</td>
    <td>The id of the group being part of the link. If you set this parameter, you have to omit <code>userId</code>.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>Specifies the type of the link. Must be provided.</td>
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
    <td>Task with given id does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/task/anId/identityLinks/delete`

Request body:

    {"groupId": "theOldGroupId", "type": "candidate"}

## Response

Status 204. No content.
