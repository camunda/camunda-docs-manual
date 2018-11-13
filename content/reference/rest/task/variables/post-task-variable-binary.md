---

title: 'Post Task Variable (Binary)'
weight: 290

menu:
  main:
    name: "Post (Binary)"
    identifier: "rest-api-task-post-variable-binary"
    parent: "rest-api-task-variables"
    pre: "POST `/task/{id}/variables/{varName}/data`"

---

Sets the serialized value for a binary variable or the binary value for a file variable visible from the task.
A variable is visible from the task if it is a local task variable or declared in a parent scope of the task. See documentation on [visiblity of variables]({{< ref "/user-guide/process-engine/variables.md" >}}).

# Method

POST `/task/{id}/variables/{varName}/data`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to set the variable for.</td>
  </tr>
  <tr>
    <td>varName</td>
    <td>The name of the variable to set.</td>
  </tr>
</table>

## Request Body

For binary variables a multipart form submit with the following parts:

<table class="table table-striped">
  <tr>
    <th>Form Part Name</th>
    <th>Content Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>data</td>
    <td>application/octet-stream</td>
    <td>
      <p>The binary data to be set.</p>
      <p>For <code>File</code> variables, this multipart can contain the filename, binary value and mimetype of the file variable to be set. Only the filename is mandatory.</p>
    </td>
  </tr>
  <tr>
    <td>valueType</td>
    <td>text/plain</td>
    <td>The name of the variable type. Either <code>Bytes</code> for a byte array variable or <code>File</code> for a file variable.</td>
  </tr>
  <tr>
    <td>data</td>
    <td>application/json</td>
    <td>
      <b>Deprecated</b>: This only works if the REST API is aware of the involved Java classes.
      <p>A JSON representation of a serialized Java Object. Form part <code>type</code> (see below) must be provided.</p>
    </td>
  </tr>
  <tr>
    <td>type</td>
    <td>text/plain</td>
    <td>
      <b>Deprecated</b>: This only works if the REST API is aware of the involved Java classes.
      <p>The canonical java type name of the variable to be set. Example: <code>foo.bar.Customer</code>. If this part is provided, <code>data</code> must be a JSON object which can be converted into an instance of the provided class. The content type of the <code>data</code> part must be <code>application/json</code> in that case (see above).</p>
    </td>
  </tr>
</table>

# Result

This method returns no content.


# Response Codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td></td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>The variable value or type is invalid, for example if no filename is set. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>Variable name is null. Task id is null or does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

(1) Post binary content of a byte array variable:

POST `/task/aTaskId/variables/aVarName/data`


```
------------------------------354ddb6baeff
Content-Disposition: form-data; name="data"; filename="image.png"
Content-Type: application/octet-stream
Content-Transfer-Encoding: binary

<<Byte Stream ommitted>>
------------------------------354ddb6baeff
Content-Disposition: form-data; name="valueType"
Content-Type: text/plain; charset=US-ASCII
Content-Transfer-Encoding: 8bit

Bytes
------------------------------1e838f8f632a--
```

(2) Post the JSON serialization of a Java Class (**deprecated**):

POST `/task/aTaskId/variables/aVarName/data`


```
------------------------------1e838f8f632a
Content-Disposition: form-data; name="type"
Content-Type: text/plain; charset=US-ASCII
Content-Transfer-Encoding: 8bit

java.util.ArrayList<java.lang.Object>
------------------------------1e838f8f632a
Content-Disposition: form-data; name="data"
Content-Type: application/json; charset=US-ASCII
Content-Transfer-Encoding: 8bit

["foo","bar"]
------------------------------1e838f8f632a--
```

(3) Post a text file:

POST `/task/aTaskId/variables/aVarName/data`

Request Body:

```
---OSQH1f8lzs83iXFHphqfIuitaQfNKFY74Y
Content-Disposition: form-data; name="data"; filename="myFile.txt"
Content-Type: text/plain; charset=US-ASCII
Content-Transfer-Encoding: binary

<<Byte Stream ommitted>>
---OSQH1f8lzs83iXFHphqfIuitaQfNKFY74Y
Content-Disposition: form-data; name="valueType"
Content-Type: text/plain; charset=US-ASCII
Content-Transfer-Encoding: 8bit

File
------------------------------1e838f8f632a--
```

## Response

Status 204. No content.
