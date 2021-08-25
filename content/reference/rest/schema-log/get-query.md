---

title: "Get Schema Log"
weight: 10

menu:
  main:
    name: "Get List"
    identifier: "rest-api-schema-log-get"
    parent: "rest-api-schema-log"
    pre: "GET `/schema/log`"

---

Queries for schema log entries that fulfill given parameters.

# Method

GET `/schema/log`

# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>version</td>
    <td>Only return schema log entries with a specific version.</td>
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

A JSON array of schema log entry objects.
Each schema log entry object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the schema log entry.</td>
  </tr>
  <tr>
    <td>version</td>
    <td>String</td>
    <td>The version of the schema.</td>
  </tr>
  <tr>
    <td>timestamp</td>
    <td>String</td>
    <td>The date and time of the schema update.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>timestamp</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
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
    <td></td>
    <td>Request successful. <b>Note:</b> In order to get any results a user of group <b>camunda-admin</b> must be authenticated.</td>
  </tr>
</table>


# Example

## Request

GET `/schema/log`

## Response

Status 200

```json
[
  {
    "id": "0",
    "version": "7.11.0",
    "timestamp": "2019-05-13T09:07:11.751+0200"
  },
  {
    "id": "1",
    "version": "7.11.1",
    "timestamp": "2019-06-1T17:22:05.123+0200"
  }
]
```
