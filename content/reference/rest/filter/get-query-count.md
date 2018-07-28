---

title: "Get Filter Count"
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-filter-02-get-query-count"
    parent: "rest-api-filter"
    pre: "GET `/filter/count`"

---


Retrieves the number of filters that fulfill a provided query. Corresponds to the size of the result set
when using the [Get Filters]({{< relref "reference/rest/filter/get-query.md" >}}) method.


# Method

GET `/filter/count`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>filterId</td>
    <td>Restrict to filters that have the given id.</td>
  </tr>
  <tr>
    <td>resourceType</td>
    <td>Restrict to filters that have the given resource type, e.g., <code>Task</code>.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Restrict to filters that have the given name.</td>
  </tr>
  <tr>
    <td>nameLike</td>
    <td>Restrict to filters that have a name with the given parameter value as substring.</td>
  </tr>
  <tr>
    <td>owner</td>
    <td>Restrict to filters that the given user owns.</td>
  </tr>
</table>


# Result

A JSON object with a single count property.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>count</td>
    <td>Number</td>
    <td>The number of filters that fulfill the query criteria.</td>
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
      parameter is supplied, but no <code>sortBy</code>, or if an invalid operator for variable
      comparison is used. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the
      error response format.
    </td>
  </tr>
</table>


# Example

## Request


GET `/filter/count?resourceType=Task&owner=aUserId`

## Response

Status 200.

```json
{
  "count": 3
}
```
