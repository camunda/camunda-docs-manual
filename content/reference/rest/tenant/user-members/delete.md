---

title: "Delete a Tenant User Membership"
weight: 20

menu:
  main:
    name: "Delete"
    identifier: "rest-api-tenant-user-member-delete"
    parent: "rest-api-tenant-user-member"
    pre: "DELETE `/tenant/{id}/user-members/{userId}`"

---

Deletes a membership between a tenant and an user.

# Method

DELETE `/tenant/{id}/user-members/{userId}`

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the tenant.</td>
  </tr>
  <tr>
    <td>userId</td>
    <td>The id of the user.</td>
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
    <td>200</td>
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>Identity service is read-only.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>In case an error occurs. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

DELETE `/tenant/tenantOne/user-members/jonny1`

## Response

Status 204. No content.
