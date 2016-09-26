---

title: "Get Single Filter"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-filter-03-get"
    parent: "rest-api-filter"
    pre: "GET `/filter/{id}`"

---


Retrieves a single filter according to the `Filter` interface in the engine.


# Method

GET `/filter/{id}`

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the filter to be retrieved.</td>
  </tr>
</table>

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>itemCount</td>
    <td>
      If set to <code>true</code>, each filter result will contain an <code>itemCount</code> property
      with the number of items matched by the filter itself.
    </td>
  </tr>
</table>

# Result

A JSON object corresponding to the `Filter` interface in the engine.
Its properties are as follows:

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
    <td>The resource type of the filter, e.g., <code>Task</code>.</td>
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
    <td>The save query of the filter as JSON object.</td>
  </tr>
  <tr>
    <td>properties</td>
    <td>Object</td>
    <td>The properties of the filter as JSON object.</td>
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
    <td>403</td>
    <td>application/json</td>
    <td>
      The authenticated user is unauthorized to read this filter.
      See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>
      Filter with given id does not exist. See the
      <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

GET `/filter/aFilterId`

## Response

Status 200.

```json
{
  "id": "9917d731-3cde-11e4-b704-f0def1e59da8",
  "name": "Accounting Tasks",
  "owner": null,
  "properties": {
    "color": "#3e4d2f",
    "description": "Tasks assigned to group accounting",
    "priority": 5
  },
  "query": {
    "candidateGroup": "accounting"
  },
  "resourceType": "Task"
}
```

## Request with ItemCount Enabled

GET `/filter/aFilterId?itemCount=true`

## Response with ItemCount

Status 200.

```json
{
  "id": "9917d731-3cde-11e4-b704-f0def1e59da8",
  "name": "Accounting Tasks",
  "owner": null,
  "properties": {
    "color": "#3e4d2f",
    "description": "Tasks assigned to group accounting",
    "priority": 5
  },
  "query": {
    "candidateGroup": "accounting"
  },
  "resourceType": "Task",
  "itemCount": 23
}
```
