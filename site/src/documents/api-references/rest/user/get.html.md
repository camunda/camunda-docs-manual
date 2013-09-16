---

title: "Get a User's Profile by ID"
category: 'User'

---


Retrieves a single user's profile.


Method
------

GET `/user/{id}/profile`


Parameters
----------

#### Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the user to be retrieved.</td>
  </tr>
</table>


Result
------

A json array of user objects.
Each user object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the user.</td>
  </tr>
  <tr>
    <td>firstName</td>
    <td>String</td>
    <td>The firstname of the user.</td>
  </tr>
  <tr>
    <td>lastName</td>
    <td>String</td>
    <td>The lastname of the user.</td>
  </tr>
  <tr>
    <td>email</td>
    <td>String</td>
    <td>The email of the user.</td>
  </tr> 
  <tr>
    <td>links</td>
    <td>Object</td>
    <td>A json array containing links to interact with the instance. The links contain only operations that the currently authenticated user is authorized to perform.</td>
  </tr>
</table>


Response codes
--------------

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
    <td>404</td>
    <td>application/json</td>
    <td>Execution with given id does not exist. See the <a href="#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

GET `/user/jonny1/profile`
  
#### Response

Status 200.

    {"id":"jonny1",
      "firstName":"John",
      "lastName":"Doe",
      "email":"anEmailAddress"}