---

title: 'Get Variable Instances Count'
category: 'History'

keywords: 'historic get query list'

---


Query for the number of historic variable instances that fulfill the given parameters. 
Takes the same parameters as the [get historic variable instances](ref:#history-get-variable-instances) method.


Method
------

GET `/history/variable-instance/count`


Parameters
----------  
  
#### Query Parameters

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
    <td>Filter by variable value. Is treated as a `String` object on server side.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by the process instance the variable belongs to. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
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
    <td>Returned if some of the query parameters are invalid.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/history/variable-instance/count?variableName=my_variable`
  
#### Response

    {"count": 1}
