---

title: "Get Historic Detail (Binary)"
weight: 40

menu:
  main:
    name: "Get (Binary)"
    identifier: "rest-api-history-get-detail-binary"
    parent: "rest-api-history-detail"
    pre: "GET `/history/detail/{id}/data`"

---

Retrieves the content of a historic variable update by id. Applicable for byte array and file variables.


# Method

GET `/history/detail/{id}/data`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the historic variable update.</td>
  </tr>
</table>


# Result

For binary variables or files without any MIME type information, a byte stream is returned. File variables with MIME type information are returned as the saved type.
Additionally, for file variables the Content-Disposition header will be set.


# Response Codes

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
    <td>Detail with given id exists but is not a binary variable. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Detail with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/history/detail/someId/data`

## Response

binary variable: Status 200. Content-Type: application/octet-stream

file variable: Status 200. Content-Type: text/plain; charset=UTF-8. Content-Disposition: attachment; filename="someFile.txt"
