---

title: 'Get Executions Count (POST)'
category: 'Execution'

---


Query for the number of executions that fulfill given parameters. This method takes the same message body as the [POST query](#executions-get-executions-post) and is thus slightly more powerful than the [GET query count](#executions-get-executions) api.


Method
------

POST `/process-instance/count`


Parameters
----------

#### Request Body

A json object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>Filter by the business key of the process instances the executions belong to.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Filter by the process definition the executions run on.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Filter by the key of the process definition the executions run on.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by the id of the process instance the execution belongs to.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>Filter by the id of the activity the execution currently executes.</td>
  </tr>
  <tr>
    <td>signalEventSubscriptionName</td>
    <td>Select only those executions that expect a signal of the given name.</td>
  </tr>
  <tr>
    <td>messageEventSubscriptionName</td>
    <td>Select only those executions that expect a message of the given name.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Only include active executions. Values may be `true` or `false`.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Only include suspended executions. Values may be `true` or `false`.</td>
  </tr>
  <tr>
    <td>variables</td>
    <td>A json array to only include executions that have variables with certain values. <br/>
    The array consists of objects with the three properties `key`, `operator` and `value`.
    `key (String)` is the variable name, `operator (String)` is the comparison operator to be used and `value` the variable value.<br/>
    `value` may be `String`, `Number` or `Boolean`.
    <br/>
    Valid operator values are: `eq` - equals; `neq` - not equals; `gt` - greater than;
    `gteq` - greater than or equals; `lt` - lower than; `lteq` - lower than or equals;
    `like`.<br/>
    `key` and `value` may not contain underscore characters.      
    </td>
  </tr>
  <tr>
    <td>processVariables</td>
    <td>A json array to only include executions that belong to a process instance with variables with certain values. <br/>
    A valid parameter value has the form `key_operator_value`.
    `key` is the variable name, `op` is the comparison operator to be used and `value` the variable value.<br/>
    <strong>Note:</strong> Values are always treated as `String` objects on server side.<br/>
    <br/>
    Valid operator values are: `eq` - equals; `neq` - not equals.<br/>
    `key` and `value` may not contain underscore characters.      
    </td>
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
    <td>The number of matching executions.</td>
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
    or if an invalid operator for variable comparison is used. See the <a href="#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

POST `/execution/count`

Request body:

    {"variables": 
        [{"name": "myVariable",
         "operator": "eq",
         "value": "camunda"
        },
        {"name": "mySecondVariable",
         "operator": "neq",
         "value": 124}],
    "processDefinitionId":"aProcessDefinitionId"}

#### Response

    {"count": 1}