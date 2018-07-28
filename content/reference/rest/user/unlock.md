---

title: 'Unlock User'
weight: 100

menu:
  main:
    name: "Unlock User"
    identifier: "rest-api-user-unlock"
    parent: "rest-api-user"
    pre: "GET `/user/{id}/unlock`"

---

Unlocks a user by id.


# Method

GET `/user/{id}/unlock`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the user to be unlocked.</td>
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
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>If the user who perform the operation is not a camunda admin user.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>User cannot be found. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/user/jonny1/unlock`

## Response

Status 204. No content.
