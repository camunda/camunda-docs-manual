---

title: 'Get Executions (POST)'
category: 'Execution'

keywords: 'post query list'

---


Query for executions that fulfill given parameters through a json object.
This method is slightly more powerful than the [GET query](ref:#execution-get-executions), because it allows
to filter by multiple instance and execution variables of types 'String`, 'Number` or 'Boolean'.


Method
------

POST `/execution`


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
    <td>Only include active executions. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Only include suspended executions. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>variables</td>
    <td>A json array to only include executions that have variables with certain values. <br/>
    The array consists of objects with the three properties <code>key</code>, <code>operator</code> and <code>value</code>.
    <code>key (String)</code> is the variable name, <code>operator (String)</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <code>value</code>may be <code>String</code>, <code>Number</code>or <code>Boolean</code>.
    <br/>
    Valid operator values are: <code>eq</code> - equals; <code>neq</code> - not equals; <code>gt</code> - greater than;
    <code>gteq</code> - greater than or equals; <code>lt</code> - lower than; <code>lteq</code> - lower than or equals;
    <code>like</code>.<br/>
    <code>key</code> and <code>value</code> may not contain underscore characters.      
    </td>
  </tr>
  <tr>
    <td>processVariables</td>
    <td>A json array to only include executions that belong to a process instance with variables with certain values. <br/>
    A valid parameter value has the form <code>key_operator_value</code>.
    <code>key</code> is the variable name, <code>op</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <strong>Note:</strong> Values are always treated as <code>String</code> objects on server side.<br/>
    <br/>
    Valid operator values are: <code>eq</code> - equals; <code>neq</code> - not equals.<br/>
    <code>key</code> and <code>value</code> may not contain underscore characters.      
    </td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>instanceId</code>, <code>definitionKey</code> and <code>definitionId</code>.
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

A json array of execution objects.
Each execution object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the execution.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance that this execution instance belongs to.</td>
  </tr>
  <tr>
    <td>ended</td>
    <td>Boolean</td>
    <td>A flag indicating whether the execution has ended.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>
    or if an invalid operator for variable comparison is used. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

POST `/execution`

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

Status 200.

    [{"id":"anId",
     "processInstanceId":"aProcInstId",
     "ended":false}]