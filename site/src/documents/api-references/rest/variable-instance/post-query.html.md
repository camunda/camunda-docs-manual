---

title: 'Get Variable Instances (POST)'
category: 'Variable'

keywords: 'post query list'

---


Query for variable instances that fulfill given parameters through a json object. This method is slightly more powerful than the 
[GET query](ref:#variable-get-variable-instances), because it allows to filter by multiple variable instances of types `String`, `Number` or `Boolean`.


Method
------

POST `/variable-instance`


Parameters
----------  

#### Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results, if there are no more results left.</td>
  </tr>
</table> 

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

A json array of variable instance objects. Each variable instance object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the variable instance.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>The simple class name of the variable instance.</td>
  </tr>
  <tr>
    <td>value</td>
    <td>String/Number/Boolean/Object</td>
    <td>Object serialization uses <a href="http://jackson.codehaus.org">Jackson's</a> POJO/bean property introspection feature.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance that this variable instance belongs to.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>String</td>
    <td>The id of the execution that this variable instance belongs to.</td>
  </tr>
  <tr>
    <td>taskId</td>
    <td>String</td>
    <td>The id of the task that this variable instance belongs to.</td>
  </tr>
  <tr>
    <td>activityInstanceId</td>
    <td>String</td>
    <td>The id of the activity instance that this variable instance belongs to.</td>
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
    or if an invalid operator for variable comparison is used. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

POST `/variable-instance`

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

    [
      {
        "name": "amount",
        "type": "integer",
        "value": 5,
        "processInstanceId": "aProcessInstanceId",
        "executionId": "b68b71c9-e310-11e2-beb0-f0def1557726",
        "taskId": null,
        "activityInstanceId": "Task_1:b68b71ca-e310-11e2-beb0-f0def1557726"
      },
      {
        "name": "amount",
        "type": "integer",
        "value": 15,
        "processInstanceId": "aProcessInstanceId",
        "executionId": "68b71c9-e310-11e2-beb0-f0def1557726",
        "taskId": null,
        "activityInstanceId": "Task_1:b68b71ca-e310-11e2-beb0-f0def1557726"
      },
      {
        "name": "amount",
        "type": "integer",
        "value": 150,
        "processInstanceId": "anotherProcessInstanceId",
        "executionId": "68b71c9-e310-11e2-beb0-f0def1557726",
        "taskId": null,
        "activityInstanceId": "Task_2:b68b71ca-e310-11e2-beb0-f0def1557726"
      }      
    ]
