Get a User's Groups
===================

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

A json object containing groups, the number of members and other users.
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
    <td>A json array of group object. Every group object has a `id` property and a `name` property.</td>
  </tr>
  <tr>
    <td>groupUsers</td>
    <td>Array</td>
    <td>A json array that contains all users that are member in one of the groups.<br/>
    Every user object has four properties: `id`, `firstName`, `lastName` and `displayName`.
    The `displayName` is the `id`, if `firstName` and `lastName` are `null`
    and `firstName lastName` otherwise.</td>
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
    <td>If the `userId` query parameter is missing. See the [Introduction](/api-references/rest/#!/overview/introduction) for the error response format.</td>
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