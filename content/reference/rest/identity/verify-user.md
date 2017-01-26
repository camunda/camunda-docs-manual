---

title: "Verify User"
weight: 20

menu:
  main:
    name: "Verify user"
    identifier: "rest-api-identity-verify-user"
    parent: "rest-api-identity"
    pre: "POST `/identity/verify`"

---


Verifies that user credentials are valid


# Method

POST `/identity/verify`


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
    <td>username</td>
    <td>String</td>
    <td>The username of a user.</td>
  </tr>
  <tr>
    <td>password</td>
    <td>String</td>
    <td>A password of a user.</td>
  </tr>
</table>

# Result

A JSON object containing username and current authentication status.
Its properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>authenticatedUser</td>
    <td>String</td>
    <td>An id of authenticated user.</td>
  </tr>
  <tr>
    <td>isAuthenticated</td>
    <td>boolean</td>
    <td>A flag indicating if user is authenticated.</td>
  </tr>
</table>


# Response Codes

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
    <td>400</td>
    <td>application/json</td>
    <td>If body does not contain username or password.</td>
  </tr>
</table>


# Example

## Request

POST `/identity/verify`

## Response

    {
      "username": "testUser",
      "password": "testPassword"
    }
