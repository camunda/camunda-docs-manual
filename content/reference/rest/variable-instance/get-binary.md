---

title: "Get Variable Instance (Binary)"
weight: 10

menu:
  main:
    name: "Get (Binary)"
    identifier: "rest-api-variable-instance-get-binary"
    parent: "rest-api-variable-instance"
    pre: "GET `/variable-instance/{id}/data`"

---


Retrieves the content of a variable by id. Applicable for byte array and file variables.


# Method

GET `/variable-instance/{id}/data`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the variable instance.</td>
  </tr>
</table>


# Result

For binary variables or files without any MIME type information, a byte stream is returned. File variables with MIME type information are returned as the saved type.
Additionally, for file variables the Content-Disposition header will be set.

# Response codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>application/octet-stream<br/><b>or</b></br>the saved MIME type</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>Variable with given id exists but does not serialize as binary data. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>

    <td>404</td>
    <td>application/json</td>
    <td>Variable with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/variable-instance/someId/data`

## Response

binary variable: Status 200. Content-Type: application/octet-stream

file variable: Status 200. Content-Type: text/plain; charset=UTF-8. Content-Disposition: attachment; filename="someFile.txt"
