---

title: "Get Groups"
weight: 10

menu:
  main:
    name: "Get List"
    identifier: "rest-api-group-get-query"
    parent: "rest-api-group"
    pre: "GET `/group`"

---


Query for a list of groups using a list of parameters.
The size of the result set can be retrieved by using the [get groups count]({{< relref "reference/rest/group/get-query-count.md" >}}) method.


# Method

GET `/group`


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

A JSON array of group objects.
Each group object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the group.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the group.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>The type of the group.</td>
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

GET `/group?name=Sales`

## Response

Status 200.

    [{"id":"sales",
      "name":"Sales",
      "type":"Organizational Unit"}]
