---

title: "Create Tenant Group Membership"
weight: 10

menu:
  main:
    name: "Create"
    identifier: "rest-api-tenant-group-member-put"
    parent: "rest-api-tenant-group-member"
    pre: "PUT `/tenant/{id}/group-members/{groupId}`"

---

Creates a membership between a tenant and a group.

# Method

PUT `/tenant/{id}/group-members/{groupId}`

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
    <td>groupId</td>
    <td>The id of the group.</td>
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
    <td>In case an internal error occurs. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

PUT `/tenant/tenantOne/group-members/sales`


## Response

Status 204. No content.
