---

title: "Get Single Historic Detail"
category: 'History'

keywords: 'get'

---


Retrieves a single historic detail by id.


Method
------

GET `/history/detail/{id}`


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
    <td>The id of the detail.</td>
  </tr>
</table>


Result
------

An object having the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the historic detail.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance the historic detail belongs to.</td>
  </tr>
  <tr>
    <td>activityInstanceId</td>
    <td>String</td>
    <td>The id of the execution the historic detail belongs to.</td>
  </tr>
  <tr>
    <td>taskId</td>
    <td>String</td>
    <td>The id of the task the historic detail belongs to.</td>
  </tr>
  <tr>
    <td>time</td>
    <td>String</td>
    <td>The time when this historic detail occurred, has the format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
  </tr>
</table>

Depending on the concrete instance of the historic detail it contains further properties. In case of a <code>HistoricVariableUpdate</code> the following properties are also provided:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>variableName</td>
    <td>String</td>
    <td>The name of the variable which has been updated.</td>
  </tr>
  <tr>
    <td>variableTypeName</td>
    <td>String</td>
    <td>The type of the variable which has been updated. Refer to the documentation on <a href="ref:/guides/user-guide/#process-engine-process-variables-variable-types">process variable types</a>.</td>
  </tr>
  <tr>
    <td>typeName</td>
    <td>String</td>
    <td>The type of the value which has been updated.</td>
  </tr>
  <tr>
    <td>value</td>
    <td>String/Number/Boolean</td>
<<<<<<< HEAD
    <td><p>The variable's value if it is a primitive variable. The variable's serialized value if it is a custom object variable with a text-based serialization format. <code>null</code> for variable types that serialize as byte array (i.e. variable types <code>bytes</code> and <code>serializable</code>).</p>
    <td><p>The variable's value if it is a primitive variable. The variable's serialized value if it is a custom object variable with a text-based serialization format. <code>null</code> for variable types that serialize as byte array (i.e. variable types <code>bytes</code> and <code>serializable</code>). Refer to the documentation on <a href="ref:/guides/user-guide/#process-engine-process-variables-variable-types">process variable types</a>.</p>
    <p>
    <b>Deprecated</b>: For variables of type <code>serializable</code>, a json object applying Jackson's POJO
    serialization is returned. Note that this is only returned when the involved classes are accessible to the REST resources.
    </p></td>
  </tr>
  <tr>
    <td>serializationConfig</td>
    <td>Object</td>
    <td>A json object containing additional variable meta-data required to interpret the value. Exact properties depend on the variable type. For all primitive variable types this property is <code>null</code>. Refer to the documentation on <a href="ref:/guides/user-guide/#process-engine-process-variables-variable-types">process variable types</a>.
    </td>
  </tr>
  <tr>
    <td>revision</td>
    <td>number</td>
    <td>The revision of the historic variable update.</td>
  </tr>
  <tr>
    <td>errorMessage</td>
    <td>String</td>
    <td>An error message in case a Java Serialized Object could not be de-serialized.</td>
  </tr>
</table>

In case of an <code>HistoricFormField</code> the following properties are also provided:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>fieldId</td>
    <td>String</td>
    <td>The id of the form field.</td>
  </tr>
  <tr>
    <td>fieldValue</td>
    <td>String/Number/Boolean/Object</td>
    <td>The submitted value.</td>
  </tr>
</table>

Response codes
--------------

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
    <td>Variable with given id does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

GET `/history/detail/someId`

#### Response

Status 200.

    {
      "id": "12345",
      "processInstanceId": "aProcInstId",
      "activityInstanceId": "anActInstId",
      "executionId": "anExecutionId",
      "time": "2014-02-28T15:00:00",
      "variableName": "myProcessVariable",
      "variableTypeName": "string",
      "typeName": "String",
      "value": "aVariableValue",
      "serializationConfig": null,
      "revision": 1,
      "errorMessage": null
    }
