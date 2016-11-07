---

title: "Get Group Count"
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-group-get-query-count"
    parent: "rest-api-group"
    pre: "GET `/group/count`"

---


Queries for groups using a list of parameters and retrieves the count.

# Method

GET `/group/count`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Filter by the id of the group.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Filter by the name of the group.</td>
  </tr>
  <tr>
    <td>nameLike</td>
    <td>Filter by the name that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>Filter by the type of the group.</td>
  </tr>
  <tr>
    <td>member</td>
    <td>Only retrieve groups where the given user id is a member of.</td>
  </tr>
  <tr>
    <td>memberOfTenant</td>
    <td>Only retrieve groups which are members of the given tenant.</td>
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
    <td>The number of matching groups.</td>
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

GET `/group/count?name=Sales`

## Response

Status 200.

    {"count": 1}
