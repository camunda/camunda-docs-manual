---

title: "Get Group"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-group-get"
    parent: "rest-api-group"
    pre: "GET `/group/{id}`"

---


Retrieves a group by id.


# Method

GET `/group/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the group to be retrieved.</td>
  </tr>
</table>


# Result

A JSON object with the following properties:

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
    <td>404</td>
    <td>application/json</td>
    <td>Group with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

GET `/group/sales`

## Response

Status 200.

    {"id":"sales",
     "name":"Sales",
     "type":"Organizational Unit"}
