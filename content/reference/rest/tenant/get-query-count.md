---

title: "Get Tenants Count"
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-tenant-get-query-count"
    parent: "rest-api-tenant"
    pre: "GET `/tenant/count`"

---


Query for tenants using a list of parameters and retrieves the count.

# Method

GET `/tenant/count`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Filter by the id of the tenant.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Filter by the name of the tenant.</td>
  </tr>
  <tr>
    <td>nameLike</td>
    <td>Filter by the name that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>userMember</td>
    <td>Select only tenants where the given user is a member of.</td>
  </tr>  
  <tr>
    <td>groupMember</td>
    <td>Select only tenants where the given group is a member of.</td>
  </tr>  
  <tr>
    <td>includingGroupsOfUser</td>
    <td>Select only tenants where the user or one of his groups is a member of. Can only be used in combination with the <code>userMember</code> parameter.</td>
  </tr>  
</table>


# Result

A JSON object that contains the count as the only property.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>count</td>
    <td>Number</td>
    <td>The number of matching tenants.</td>
  </tr>
</table>


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
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the query parameters are invalid. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/tenant/count?name=tenantOne`

## Response

Status 200.

    {"count": 1}
