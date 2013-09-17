---

title: 'Get Variable Instances Count (POST)'
category: 'History'

keywords: 'historic post query list'

---


Query for historic variable instances that fulfill the given parameters. 
This method takes the same message body as the [POST query](#history-get-variable-instances-post) and is thus more powerful regarding variable values than the [GET query count](#history-get-variable-instances) method.


Method
------

POST `/history/variable-instance/count`


Parameters
----------  
  
#### Request body

A json object with the following properties:

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
    <td>Filter by variable value. May be `String`, `Number` or `Boolean`.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by the process instance the variable belongs to.</td>
  </tr>
</table>


Result
------

A json object that contains the count as the only property.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>count</td>
    <td>Number</td>
    <td>The number of matching historic variable instances.</td>
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
    <td>Returned if some of the query parameters are invalid. See the <a href="#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

POST `/history/variable-instance/count`

Request body:

    {"variableValue": 42,
    "variableName":"someVariable"}
  
#### Response

    {"count" : 1}
