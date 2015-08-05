---

title: 'Get Identity Links'
weight: 120

menu:
  main:
    identifier: "rest-api-task-post-get-identity-links"
    parent: "rest-api-task"

---


Gets the identity links for a task, which are the users and groups that are in *some* relation to it (including assignee and owner).


Method
------

GET `/task/{id}/identity-links`


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
    <td>The id of the task to retrieve the identity links for.</td>
  </tr>
</table>

#### Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Filter by the type of links to include.</td>
  </tr>
</table>

Result
------

A JSON object containing the a list of identity links.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>userId</td>
    <td>String</td>
    <td>The id of the user participating in this link.</td>
  </tr>
  <tr>
    <td>groupId</td>
    <td>String</td>
    <td>The id of the group participating in this link. Either <code>groupId</code> or <code>userId</code> is set.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>The type of the identity link. Can be any defined type. <code>assignee</code> and <code>owner</code> are reserved types for the task assignee and owner.</td>
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
    <td>Task with given id does not exist. See the <a href="#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/task/anId/identityLinks`

#### Response

    [{
        "userId": "userId",
        "groupId": null,
        "type": "assignee"
    },
    {
        "userId": null,
        "groupId": "groupId1",
        "type": "candidate"
    },
    {
        "userId": null,
        "groupId": "groupId2",
        "type": "candidate"
    }]
