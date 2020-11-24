---

title: "Get Group Count (POST)"
weight: 38

menu:
  main:
    name: "Get List Count (POST)"
    identifier: "rest-api-group-post-query-count"
    parent: "rest-api-group"
    pre: "POST `/group/count`"

---


Queries for groups using a list of parameters and retrieves the count.

# Method

POST `/group/count`


# Parameters

## Request Body

A JSON object with the following properties:

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
    <td>idIn</td>
    <td>Filter by a JSON array of group ids.</td>
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
    <td>Only retrieve groups which the given user id is a member of.</td>
  </tr>
  <tr>
    <td>memberOfTenant</td>
    <td>Only retrieve groups which are members of the given tenant.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>id</code>, <code>name</code> and <code>type</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
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
    <td>Returned if some of the query parameters are invalid. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/group/count?name=Sales`

## Response

Status 200.

    {"count": 1}
