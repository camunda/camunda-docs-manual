---

title: "Get Filters"
weight: 10

menu:
  main:
    name: Get List
    identifier: "rest-api-filter-01-get-query"
    parent: "rest-api-filter"
    pre: "GET `/filter`"

---


Query for a list of filters using a list of parameters. The size of the result set can be retrieved
by using the [get filters count]({{< ref "/reference/rest/filter/get-query-count.md" >}}) method.


# Method

GET `/filter`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>filterId</td>
    <td>Filter by the id of the filter.</td>
  </tr>
  <tr>
    <td>resourceType</td>
    <td>Filter by the resource type of the filter, e.g., <code>Task</code>.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Filter by the name of the filter.</td>
  </tr>
  <tr>
    <td>nameLike</td>
    <td>Filter by the name that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>owner</td>
    <td>Filter by the user id of the owner of the filter.</td>
  </tr>
  <tr>
    <td>itemCount</td>
    <td>
      If set to <code>true</code> each filter result will contain an <code>itemCount</code> property
      with the number of items matched by the filter itself.
    </td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>filterId</code>, <code>firstName</code>, <code>lastName</code> and <code>email</code>.
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

A JSON array of filter objects. Each filter object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the filter.</td>
  </tr>
  <tr>
    <td>resourceType</td>
    <td>String</td>
    <td>The resource type of the filter.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the filter.</td>
  </tr>
  <tr>
    <td>owner</td>
    <td>String</td>
    <td>The user id of the owner of the filter.</td>
  </tr>
  <tr>
    <td>query</td>
    <td>Object</td>
    <td>The query of the filter as a JSON object.</td>
  </tr>
  <tr>
    <td>properties</td>
    <td>Object</td>
    <td>The properties of a filter as a JSON object.</td>
  </tr>
  <tr>
    <td>itemCount</td>
    <td>Long</td>
    <td>
      The number of items matched by the filter itself. Note: Only exists if the query parameter
      <code>itemCount</code> was set to <code>true</code>
    </td>
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
    <td>
      Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code>
      parameter is supplied, but no <code>sortBy</code> is specified. See the
      <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

GET `/filter?resourceType=Task`

## Response

Status 200.

```json
[
  {
    "id": "aFilter",
    "resourceType": "Task",
    "name": "My Filter",
    "owner": "jonny1",
    "query": {
      "assignee": "jonny1"
    },
    "properties": {
      "color": "#58FA58",
      "description": "Filters assigned to me"
    }
  },
  {
    "id": "anotherFilter",
    "resourceType": "Task",
    "name": "Accountants Filter",
    "owner": "demo",
    "query": {
      "candidateGroup": "accountant"
    },
    "properties": {
      "description": "Filters assigned to me",
      "priority": 10
    }
  }
]
```

## Request with ItemCount Enabled

GET `/filter?resourceType=Task&itemCount=true`

## Response with ItemCount

Status 200.

```json
[
  {
    "id": "aFilter",
    "resourceType": "Task",
    "name": "My Filter",
    "owner": "jonny1",
    "query": {
      "assignee": "jonny1"
    },
    "properties": {
      "color": "#58FA58",
      "description": "Filters assigned to me"
    },
    "itemCount": 13
  },
  {
    "id": "anotherFilter",
    "resourceType": "Task",
    "name": "Accountants Filter",
    "owner": "demo",
    "query": {
      "candidateGroup": "accountant"
    },
    "properties": {
      "description": "Filters assigned to me",
      "priority": 10
    },
    "itemCount": 42
  }
]
```
