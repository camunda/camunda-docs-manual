Get Variable Instances Count (POST)
===================================

Query for the number of variable instances that fulfill given parameters. This method takes the same message body as the <a href="#!/variable-instance/post-query" doc-location-highlight>POST query</a> and is thus slightly more powerful than the <a href="#!/variable-instance/get-query-count" doc-location-highlight>GET query count</a>.

Method
------

POST `/variable-instance/count`


Parameters
----------  

#### Request Body

<p>
  A json object with the following properties:
</p>
<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>variableName</td>
    <td>Filter by variable instance name.</td>
  </tr>
  <tr>
    <td>variableNameLike</td>
    <td>Filter by the variable instance name. The parameter can include the wildcard `%` to express like-strategy such as: starts with (`%`name), ends with (name`%`) or contains (`%`name`%`).</td>
  </tr>
  <tr>
    <td>processInstanceIdIn</td>
    <td>Only include variable instances which belongs to one of the passed process instance ids.</td>
  </tr>
  <tr>
    <td>executionIdIn</td>
    <td>Only include variable instances which belongs to one of the passed execution ids.</td>
  </tr>
  <tr>
    <td>taskIdIn</td>
    <td>Only include variable instances which belongs to one of the passed task ids.</td>
  </tr>
  <tr>
    <td>activityInstanceIdIn</td>
    <td>Only include variable instances which belongs to one of the passed activity instance ids.</td>
  </tr>
  <tr>
    <td>variableValues</td>
    <td>A json array to only include variable instances that have the certain values.<br/>
    The array consists of objects with the three properties `name`, `operator` and `value`.
    `name (String)` is the variable name, `operator (String)` is the comparison operator to be used and `value` the variable value.<br/>
    `value` may be `String`, `Number` or `Boolean`.
    <br/>
    Valid operator values are: `eq` - equals; `neq` - not equals; `gt` - greater than;
    `gteq` - greater than or equals; `lt` - lower than; `lteq` - lower than or equals;
    `like`.<br/>
    </td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    `variableName`, `variableType` and `activityInstanceId`.
    Must be used in conjunction with the `sortOrder` parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be `asc` for ascending order or `desc` for descending order.
    Must be used in conjunction with the `sortBy` parameter.</td>
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
    <td>The number of matching variable instances.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a `sortOrder` parameter is supplied, but no `sortBy`
    or if an invalid operator for variable comparison is used. See the <a href="/api-references/rest/#!/overview/introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

POST `/variable-instance/count`

Request body:

    {"variableValuess": 
        [{"name": "amount",
         "operator": "gteq",
         "value": "5"
        },
        {"name": "amount",
         "operator": "lteq",
         "value": 200}],
    "processInstanceIdIn": [ "aProcessInstanceId", "anotherProcessInstanceId" ]}
  
#### Response

    {"count": 3}
