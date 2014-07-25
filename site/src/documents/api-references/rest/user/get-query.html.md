---

title: 'Get Users'
category: 'User'

keywords: 'get query list'

---


Query for a list of users using a list of parameters.
The size of the result set can be retrieved by using the [get users count](ref:#user-get-users-count) method.


Method
------

GET `/user`


Parameters
----------  
  
#### Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Filter by the id of the user.</td>
  </tr>
  <tr>
    <td>firstName</td>
    <td>Filter by the firstname of the user.</td>
  </tr>
  <tr>
    <td>firstNameLike</td>
    <td>Filter by the firstname that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>lastName</td>
    <td>Filter by the lastname of the user.</td>
  </tr>
  <tr>
    <td>lastNameLike</td>
    <td>Filter by the lastname that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>email</td>
    <td>Filter by the email of the user.</td>
  </tr>
  <tr>
    <td>emailLike</td>
    <td>Filter by the email that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>memberOfGroup</td>
    <td>Filter for users which are members of a group.</td>
  </tr> 
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>userId</code>, <code>firstName</code>, <code>lastName</code> and <code>email</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
  </tr>
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.</td>
  </tr>
</table>


Result
------

A JSON array of user objects.
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
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code> is specified. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/user?firstName=John`
  
#### Response

Status 200.

    [{"id":"jonny1",
      "firstName":"John",
      "lastName":"Doe",
      "email":"anEmailAddress"},
     {"id":"jonny2",
      "firstName":"John",
      "lastName":"Smoe",
      "email":"anEmailAddress"}]
