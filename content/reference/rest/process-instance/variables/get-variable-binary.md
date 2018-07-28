---

title: 'Get Process Variable (Binary)'
weight: 60

menu:
  main:
    name: "Get (Binary)"
    identifier: "rest-api-process-instance-get-variable-binary"
    parent: "rest-api-process-instance-variables"
    pre: "GET `/process-instance/{id}/variables/{varName}/data`"

---


Retrieves the content of a Process Variable by the Process Instance id and the Process Variable name. Applicable for byte array or file Process Variables.

# Method

GET `/process-instance/{id}/variables/{varName}/data`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process instance to retrieve the variable for.</td>
  </tr>
  <tr>
    <td>varName</td>
    <td>The name of the variable to retrieve.</td>
  </tr>
</table>


# Result

For binary variables or files without any MIME type information, a byte stream is returned. File variables with MIME type information are returned as the saved type. Additionally, for file variables the Content-Disposition header will be set.


# Response Codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>application/octet-stream <b>or</b> the saved MIME type</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>A Process Variable with the given id exists but does not serialize as binary data. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>A Process Variable with the given id does not exist. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/process-instance/aProcessInstanceId/variables/aVarName/data`

## Response

binary variable: Status 200. Content-Type: application/octet-stream

file variable: Status 200. Content-Type: text/plain; charset=UTF-8. Content-Disposition: attachment; filename="someFile.txt"
