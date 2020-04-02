---

title: "Get Schema Log (POST)"
weight: 20

menu:
  main:
    name: "Get List (POST)"
    identifier: "rest-api-schema-log-post"
    parent: "rest-api-schema-log"
    pre: "POST `/schema/log`"

---

Queries for schema log entries that fulfill given parameters.

# Method

POST `/schema/log`

# Parameters

## Query Parameter
<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results, if there are no more results left.</td>
  </tr>
</table>

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>version</td>
    <td>Only return schema log entries with a specific version.<br>
  </tr>
  <tr>
    <td>sorting</td>
    <td>
        A JSON array of criteria to sort the result by. Each element of the array is a JSON object that specifies one ordering. The position in the array identifies the rank of an ordering, i.e., whether it is primary, secondary, etc. The ordering objects have the following properties:
      <table class="table table-striped">
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>sortBy</td>
          <td><b>Mandatory.</b> Sort the results lexicographically by a given criterion. The only valid value is <code>timestamp</code>.</td>
        </tr>
        <tr>
          <td>sortOrder</td>
          <td><b>Mandatory.</b> Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
        </tr>
      </table>
    </td>
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
    <td>The date and time of the schame update.</td>
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

POST `/schema/log`

Request Body:

```json
{
  "version": "7.11.0",
  "sortBy": "timestamp",
  "sortOrder": "asc" 
}
```


## Response

Status 200

```json
[
  {
    "id": "0"
    "version": "7.11.0",
    "timestamp": "2019-05-13T09:07:11.751+0200"
  }
]
```