---

title: 'Get Variable Instances (POST)'
category: 'History'

keywords: 'historic post query list'

---


Query for historic variable instances that fulfill the given parameters. 
This method is slightly more powerful than the [GET query](ref:#history-get-variable-instances) because it allows filtering by variable values of the different types `String`, `Number` or `Boolean`.


Method
------

POST `/history/variable-instance`


Parameters
----------  
  
#### Query Parameters

<table class="table table-striped">
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.</td>
  </tr>
</table>


#### Request body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>variableName</td>
    <td>Filter by variable name.</td>
  </tr>
  <tr>
    <td>variableNameLike</td>
    <td>Restrict to variables with a name like the parameter.</td>
  </tr>
  <tr>
    <td>variableValue</td>
    <td>Filter by variable value. May be <code>String</code>, <code>Number</code> or <code>Boolean</code>.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by the process instance the variable belongs to.</td>
  </tr>
  <tr>
    <td>executionIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed execution ids.</td>
  </tr>
  <tr>
    <td>taskIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed task ids.</td>
  </tr>
  <tr>
    <td>activityInstanceIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed activity instance ids.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results by a given criterion. Valid values are <code>instanceId</code>, <code>variableName</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
  </tr>
</table>


Result
------

A JSON array of historic variable instance objects.
Each historic activity instance object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the variable instance.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the variable instance.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>The simple class name of the variable value.</td>
  </tr>
  <tr>
    <td>variableType</td>
    <td>String</td>
    <td>The type of the variable instance. Refer to the documentation on <a href="ref:/guides/user-guide/#process-engine-process-variables-variable-types">process variable types</a>.</td>
  </tr>
  <tr>
    <td>value</td>
    <td>String/Number/Boolean</td>
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
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id the process instance belongs to.</td>
  </tr>
  <tr>
    <td>activityInstanceId</td>
    <td>String</td>
    <td>The id of the activity instance in which the variable is valid.</td>
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
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

POST `/history/variable-instance`

Request body:

    {"variableValue": 42,
    "variableName":"someVariable"}
  
#### Response

    [{"name": "someVariable",
    "type": "Integer",
    "variableType": "integer",
    "value": 42,
    "processInstanceId": "aProcInstId",
    "serializationConfig": null}]
