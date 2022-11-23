---

title: 'Get Task Variable (Binary)'
weight: 250

menu:
  main:
    name: "Get (Binary)"
    identifier: "rest-api-task-get-variable-binary"
    parent: "rest-api-task-variables"
    pre: "GET `/task/{id}/variables/{varName}/data`"

---


Retrieves a binary variable from the context of a given task. Applicable for byte array and file variables.
The variable must be visible from the task. It is visible from the task if it is a local task variable or declared in a parent scope of the task. See documentation on [visiblity of variables]({{< ref "/user-guide/process-engine/variables.md" >}}).

# Method

GET `/task/{id}/variables/{varName}/data`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to retrieve the variable from.</td>
  </tr>
  <tr>
    <td>varName</td>
    <td>The name of the variable to get.</td>
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
    <td>Variable with given id exists but is not a binary variable. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Variable with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/task/aTaskId/variables/aVarName/data`

## Response

binary variable: Status 200. Content-Type: application/octet-stream

file variable: Status 200. Content-Type: text/plain; charset=UTF-8. Content-Disposition: attachment; filename="someFile.txt"
