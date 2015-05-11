---

title: 'Create user'
category: 'User'

keywords: 'post'

---


Create a new user.


Method
------

POST `/user/create`


Parameters
----------

#### Request Body

A json object with the following properties:

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
      A json object containing variable key-value pairs. The object contains the following properties: 
      <code>id (String)</code>, <code>firstName (String)</code>, <code>lastName (String)</code> and <code>email (String)</code>.
    </td>
  </tr>
  <tr>
    <td>credentials</td>
    <td>Array</td>
    <td>
      A json object containing variable key-value pairs. The object contains the following properties:
      <code>password (String)</code>.
    </td>
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
    <td>500</td>
    <td>application/json</td>
    <td>The user could not be created due to an internal server error. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

POST `/user/create`

Request body:

    {"profile": 
      {"id": "jonny1",
      "firstName":"John",
      "lastName":"Doe",
      "email":"aNewEmailAddress"},
    "credentials": 
      {"password":"s3cret"}
    }

#### Response

Status 204. No content.
