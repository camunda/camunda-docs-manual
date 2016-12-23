---

title: "Get Authorization Count"
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-authorization-get-query-count"
    parent: "rest-api-authorization"
    pre: "GET `/authorization/count`"

---


Queries for authorizations using a list of parameters and retrieves the count.


# Method

GET `/authorization/count`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Filter by the id of the authorization.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>Filter by authorization type. (0=global, 1=grant, 2=revoke). See the <a href="{{< relref "user-guide/process-engine/authorization-service.md#authorization-type" >}}">User Guide</a> for more information about authorization types.</td>
  </tr>
  <tr>
    <td>userIdIn</td>
    <td>Filter by a comma-seperated list of userIds.</td>
  </tr>
  <tr>
    <td>groupIdIn</td>
    <td>Filter by a comma-seperated list of groupIds.</td>
  </tr>
  <tr>
    <td>resourceType</td>
    <td>Filter by an integer representation of the resource type. See the <a href="{{< relref "user-guide/process-engine/authorization-service.md#resources" >}}">User Guide</a> for a list of integer representations of resource types.</td>
  </tr>
  <tr>
    <td>resourceId</td>
    <td>Filter by resource Id.</td>
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
    <td>The number of matching authorizations.</td>
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

GET `/authorization/count?userIdIn=jonny1,jonny2`

## Response

Status 200.

    {"count": 2}
