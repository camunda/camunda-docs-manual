---

title: "Create Tenant User Membership"
weight: 10

menu:
  main:
    name: "Create"
    identifier: "rest-api-tenant-user-member-put"
    parent: "rest-api-tenant-user-member"
    pre: "PUT `/tenant/{id}/user-members/{userId}`"

---

Creates a membership between a tenant and an user.

# Method

PUT `/tenant/{id}/user-members/{userId}`

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
    <td>204</td>
    <td></td>
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
    <td>In case an internal error occurs. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

PUT `/tenant/tenantOne/user-members/jonny1`


## Response

Status 204. No content.
