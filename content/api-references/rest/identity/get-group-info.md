---

title: "Get a User's Groups"
weight: 10

menu:
  main:
    identifier: "rest-api-identity-get-group-info"
    parent: "rest-api-identity"

---


Gets the groups of a user and all users that share a group with the given user.


Method
------

GET `/identity/groups`


Parameters
----------

#### Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>userId</td>
    <td>The id of the user to get the groups for.</td>
  </tr>
</table>


Result
------

A JSON object containing groups, the number of members and other users.
Its properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>groups</td>
    <td>Array</td>
    <td>A JSON array of group object. Every group object has a <code>id</code> property and a <code>name</code> property.</td>
  </tr>
  <tr>
    <td>groupUsers</td>
    <td>Array</td>
    <td>A JSON array that contains all users that are member in one of the groups.<br/>
    Every user object has four properties: <code>id</code>, <code>firstName</code>, <code>lastName</code> and <code>displayName</code>.
    The <code>displayName</code> is the <code>id</code>, if <code>firstName</code> and <code>lastName</code> are <code>null</code>
    and <code>firstName lastName</code> otherwise.</td>
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
    <td>If the <code>userId</code> query parameter is missing. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/identity/groups?userId=aUserId`

#### Response

    {"groups":
      [{"id":"group1Id",
       "name":"group1"}],
    "groupUsers":
      [{"firstName":"firstName",
       "lastName":"lastName",
       "displayName":"firstName lastName",
       "id":"anotherUserId"}]}
