Update a user's credentials
===========================

Updates a user's credentials (password).

Method
------

PUT `/user/{id}/credentials`

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
    <td>password</td>
    <td>String</td>
    <td>The user's new password.</td>
  </tr>  
  <tr>
    <td>authenticatedUserPassword</td>
    <td>String</td>
    <td>The password of the authenticated user who changes the password of the user (ie. the user with passed id as path parameter).</td>
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
    <td>400</td>
    <td>Empty</td>
    <td>If the authenticated user password does not match.</td>
  </tr>  
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>If the corresponding user cannot be found</td>
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

PUT `/user/jonny1/credentials`

Request body:

    {"password":"s3cr3t"}

#### Response

None.
