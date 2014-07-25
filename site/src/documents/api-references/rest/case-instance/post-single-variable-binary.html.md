---

title: 'Post Single Case Instance Variable (Binary)'
category: 'Case Instance'

keywords: 'post update set binary'

---

Sets the value for a binary variable

Method
------

POST `/case-instance/{id}/variables/{varId}/data`


Parameters
----------
  
#### Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the case instance to set the variable for.</td>
  </tr>
  <tr>
    <td>varId</td>
    <td>The name of the variable to set.</td>
  </tr>
</table>

#### Request Body

A multipart form submit with the following parts:

<table class="table table-striped">
  <tr>
    <th>Form Part Name</th>
    <th>Content Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>data</td>
    <td>application/octet-stream</td>
    <td>The binary data to be set.</td>
  </tr>
  <tr>
    <td>data</td>
    <td>application/json</td>
    <td>A JSON representation of a serialized Java Object. Form part <code>type</code> (see below) must be provided.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>text/plain</td>
    <td>The canonical java type name of the case variable to be set. Example: <code>foo.bar.Customer</code>. If this part is provided, <code>data</code> must be a JSON object which can be converted into an instance of the provided class. The content type of the <code>data</code> part must be <code>application/json</code> in that case (see above).</td>
  </tr>  
</table>


Result
------

This method returns no content.

  
Response codes
--------------  

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
    <td>The variable value or type is invalid, for example if the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>    
</table>

  
Example
-------

#### Request

(1) Post the JSON serialization of a Java Class:

POST `/case-instance/aCaseInstanceId/variables/aVarName/data`

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

(2) Post binary content of a byte array variable:

POST `/case-instance/aCaseInstanceId/variables/aVarName/data`

```  
---OSQH1f8lzs83iXFHphqfIuitaQfNKFY74Y
Content-Disposition: form-data; name="data"; filename="unspecified"
Content-Type: application/octet-stream
Content-Transfer-Encoding: binary

<<Byte Stream ommitted>>
---OSQH1f8lzs83iXFHphqfIuitaQfNKFY74Y--
```