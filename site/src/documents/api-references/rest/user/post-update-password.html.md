Update a user's password
========================

Updates a user's password.


Method
------

POST `/user/{id}/password`


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
    <td>password</td>
    <td>String</td>
    <td>The user's new password.</td>
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
    <td>Empty</td>
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

POST `/user/jonny1/password`

Request body:

    {"id":"jonny1",
     "password":"s3cr3t"}

#### Response

None.
