---

title: "Post Local Case Execution Variable (Binary)"
weight: 170

menu:
  main:
    name: "Update (Binary)"
    identifier: "rest-api-case-execution-put-local-varibale-binary"
    parent: "rest-api-case-execution-local-variables"
    pre: "POST `/case-execution/{id}/localVariables/{varName}/data`"

---

Sets the serialized value for a binary variable or the binary value for a file variable.

# Method

POST `/case-execution/{id}/localVariables/{varName}/data`

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the case execution to set the variable for.</td>
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
      <p>For <code>File</code> variables, this multipart can contain the filename, binary value and MIME type of the file variable to be set. Only the filename is mandatory.</p>
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
    <td>The variable value or type is invalid, for example if no filename is set. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request


(1) Post binary content of a byte array variable:

POST `/case-execution/aCaseExecutionId/localVariables/aVarName/data`

```
---OSQH1f8lzs83iXFHphqfIuitaQfNKFY74Y
Content-Disposition: form-data; name="data"; filename="unspecified"
Content-Type: application/octet-stream
Content-Transfer-Encoding: binary

<<Byte Stream ommitted>>
---OSQH1f8lzs83iXFHphqfIuitaQfNKFY74Y
Content-Disposition: form-data; name="valueType"
Content-Type: text/plain; charset=US-ASCII
Content-Transfer-Encoding: 8bit

Bytes
---OSQH1f8lzs83iXFHphqfIuitaQfNKFY74Y--
```

(2) Post the JSON serialization of a Java Class (**deprecated**):

POST `/case-execution/aCaseExecutionId/localVariables/aVarName/data`

```
---OSQH1f8lzs83iXFHphqfIuitaQfNKFY74Y
Content-Disposition: form-data; name="data"
Content-Type: application/json; charset=US-ASCII
Content-Transfer-Encoding: 8bit

["foo", "bar"]
---OSQH1f8lzs83iXFHphqfIuitaQfNKFY74Y
Content-Disposition: form-data; name="type"
Content-Type: text/plain; charset=US-ASCII
Content-Transfer-Encoding: 8bit

java.util.ArrayList<java.lang.Object>
---OSQH1f8lzs83iXFHphqfIuitaQfNKFY74Y--
```

(3) Post a text file:

POST `/case-execution/aCaseExecutionId/localVariables/aVarName/data`

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
---OSQH1f8lzs83iXFHphqfIuitaQfNKFY74Y--
```