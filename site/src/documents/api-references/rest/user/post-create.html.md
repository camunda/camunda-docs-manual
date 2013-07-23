Update user
===========

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
    <td>id</td>
    <td>String</td>
    <td>The user's id.</td>
  </tr>
  <tr>
    <td>firstName</td>
    <td>String</td>
    <td>The user's firstname.</td>
  </tr>
  <tr>
    <td>lastName</td>
    <td>String</td>
    <td>The user's lastname.</td>
  </tr>
  <tr>
    <td>email</td>
    <td>String</td>
    <td>The user's email.</td>
  </tr>   
  <tr>
    <td>password</td>
    <td>String</td>
    <td>The user's password.</td>
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
    <td>The user could not be created due to an internal server error. See the <a href="/api-references/rest/#!/overview/introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

POST `/user/create`

Request body:

    {"id":"jonny1",
      "firstName":"John",
      "lastName":"Doe",
      "email":"aNewEmailAddress",
      "password":"s3cret",}

#### Response

Status 204. No content.
