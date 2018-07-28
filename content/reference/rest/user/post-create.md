---

title: 'Create user'
weight: 60

menu:
  main:
    name: "Create"
    identifier: "rest-api-user-create"
    parent: "rest-api-user"
    pre: "POST `/user/create`"

---


Create a new user.


# Method

POST `/user/create`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>profile</td>
    <td>Array</td>
    <td>
      A JSON object containing variable key-value pairs. The object contains the following properties:
      <code>id (String)</code>, <code>firstName (String)</code>, <code>lastName (String)</code> and <code>email (String)</code>.
    </td>
  </tr>
  <tr>
    <td>credentials</td>
    <td>Array</td>
    <td>
      A JSON object containing variable key-value pairs. The object contains the following property:
      <code>password (String)</code>.
    </td>
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
    <td>403</td>
    <td>application/json</td>
    <td>Identity service is read-only (Cannot modify users / groups / memberships).</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The user could not be created due to an internal server error. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/user/create`

Request Body:

    {"profile":
      {"id": "jonny1",
      "firstName":"John",
      "lastName":"Doe",
      "email":"aNewEmailAddress"},
    "credentials":
      {"password":"s3cret"}
    }

## Response

Status 204. No content.
