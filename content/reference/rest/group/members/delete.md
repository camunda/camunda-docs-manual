---

title: "Delete a Group Member"
weight: 20

menu:
  main:
    name: "Delete"
    identifier: "rest-api-group-member-delete"
    parent: "rest-api-group-member"
    pre: "DELETE `/group/{id}/members/{userId}`"

---


Removes a member from a group.


# Method

DELETE `/group/{id}/members/{userId}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the group</td>
  </tr>
  <tr>
    <td>userId</td>
    <td>The id of user to remove from the group</td>
  </tr>
</table>


# Result

This method returns no content.


# Response Codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>Identity service is read-only (Cannot modify users / groups / memberships).</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>In case an error occurs. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

DELETE `/group/sales/members/jonny1`

## Response

Status 204. No content.
