---

title: 'Update User Profile'
category: 'User'

keywords: 'put'

---


Updates the profile information of an already existing user.


Method
------

PUT `/user/{id}/profile`


Parameters
----------

#### Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the user.</td>
  </tr> 
</table>
  

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
</table>


Result
------

Empty.

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
    <td>None</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>Identity service is read-only (Cannot modify users / groups / memberships).</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>If the user with the requested Id cannot be found.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The user could not be updated due to an internal server error. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

PUT `/user/jonny1/profile`

Request body:

    {"id":"jonny1",
      "firstName":"John",
      "lastName":"Doe",
      "email":"aNewEmailAddress"}

#### Response

Empty.
