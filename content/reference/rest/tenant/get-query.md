---

title: "Get Tenants"
weight: 10

menu:
  main:
    name: "Get List"
    identifier: "rest-api-tenant-get-query"
    parent: "rest-api-tenant"
    pre: "GET `/tenant`"

---


Query for a list of tenants using a list of parameters.
The size of the result set can be retrieved by using the [get tenants count]({{< relref "reference/rest/tenant/get-query-count.md" >}}) method.


# Method

GET `/tenant`


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
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>id</code> and <code>name</code>.
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


# Result

A JSON array of tenant objects.
Each tenant object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the tenant.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the tenant.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code> is specified. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/tenant?name=tenantOne`

## Response

Status 200.

    [{
      "id":"tenantOne",
      "name":"Tenant One"
    }]
