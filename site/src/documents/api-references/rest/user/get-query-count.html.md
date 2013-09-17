---

title: 'Get Users Count'
category: 'User'

keywords: 'get query list'

---


Query for users using a list of parameters and retrieves the count.

Method
------

GET `/user/count`


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
</table>


Result
------

A json object that contains the count as the only property.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>count</td>
    <td>Number</td>
    <td>The number of matching users.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a `sortOrder` parameter is supplied, but no `sortBy` is specified. See the <a href="#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/user/count?firstName=John`
  
#### Response

Status 200.

    {"count": 2}