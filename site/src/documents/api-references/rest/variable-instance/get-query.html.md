---

title: 'Get Variable Instances'
category: 'Variable'

keywords: 'get query list'

---


Query for variable instances that fulfill given parameters. Parameters may be the properties of variable instances, such as the name or type. The size of the result set can be retrieved by using the [get variable instances count](ref:#variable-get-variable-instances-count) method.


Method
------

GET `/variable-instance`


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
    <td>Filter by variable instance name.</td>
  </tr>
  <tr>
    <td>variableNameLike</td>
    <td>Filter by the variable instance name. The parameter can include the wildcard <code>%</code> to express like-strategy such as: starts with (<code>%</code>name), ends with (name<code>%</code>) or contains (<code>%</code>name<code>%</code>).</td>
  </tr>
  <tr>
    <td>processInstanceIdIn</td>
    <td>Only include variable instances which belong to one of the passed and comma-separated process instance ids.</td>
  </tr>
  <tr>
    <td>executionIdIn</td>
    <td>Only include variable instances which belong to one of the passed and comma-separated execution ids.</td>
  </tr>
  <tr>
    <td>caseInstanceIdIn</td>
    <td>Only include variable instances which belong to one of the passed case instance ids.</td>
  </tr>
  <tr>
    <td>caseExecutionIdIn</td>
    <td>Only include variable instances which belong to one of the passed case execution ids.</td>
  </tr>
  <tr>
    <td>taskIdIn</td>
    <td>Only include variable instances which belong to one of the passed and comma-separated task ids.</td>
  </tr>
  <tr>
    <td>activityInstanceIdIn</td>
    <td>Only include variable instances which belong to one of the passed and comma-separated activity instance ids.</td>
  </tr>
  <tr>
    <td>variableValues</td>
    <td>Only include variable instances that have the certain values.
    Value filtering expressions are comma-separated and are structured as follows:<br/>
    A valid parameter value has the form <code>key_operator_value</code>.
    <code>key</code> is the variable name, <code>operator</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <strong>Note:</strong> Values are always treated as <code>String</code> objects on server side.<br/>
    <br/>
    Valid operator values are: <code>eq</code> - equal to; <code>neq</code> - not equal to; <code>gt</code> - greater than;
    <code>gteq</code> - greater than or equal to; <code>lt</code> - lower than; <code>lteq</code> - lower than or equal to;
    <code>like</code>.<br/>
    <code>key</code> and <code>value</code> may not contain underscore or comma characters.      
    </td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>variableName</code>, <code>variableType</code> and <code>activityInstanceId</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
  </tr>
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.</td>
  </tr>
</table>


Result
------

A JSON array of variable instance objects. Each variable instance object has the following properties:

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
    <td>The type of the variable instance.</td>
    <!-- TODO: ref variable docs here -->
  </tr>
  <tr>
    <td>value</td>
    <td>String/Number/Boolean</td>
    <td><p>The variable's value if it is a primitive variable. The variable's serialized value if it is a custom object variable with a text-based serialization format. <code>null</code> for variable types that serialize as byte array (i.e. variable types <code>bytes</code> and <code>serializable</code>).</p>
    <!-- TODO: ref variable docs here -->
    
    <p>
    <b>Deprecated</b>: For variables of type <code>serializable</code>, a json object applying Jackson's POJO
    serialization is returned. Note that this is only returned when the involved classes are accessible to the REST resources.
    </p></td>
  </tr>
  <tr>
    <td>serializationConfig</td>
    <td>Object</td>
    <td>A json object containing additional variable meta-data required to interpret the value. Exact properties depend on the variable type. For all primitive variable types this property is <code>null</code>.
    <!-- TODO: ref variable docs here -->
    </td>
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
    <td>caseInstanceId</td>
    <td>String</td>
    <td>The id of the case instance that this variable instance belongs to.</td>
  </tr>
  <tr>
    <td>caseExecutionId</td>
    <td>String</td>
    <td>The id of the case execution that this variable instance belongs to.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>, or if an invalid operator for variable comparison is used. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/variable-instance?processInstanceIdIn=aProcessInstanceId,anotherProcessInstanceId&variableValues=amount_gteq_5,amount_lteq_200`
  
#### Response

    [
      {
        "id": "someId",
        "name": "amount",
        "type": "Integer",
        "variableType": "integer",
        "value": 5,
        "processInstanceId": "aProcessInstanceId",
        "executionId": "b68b71c9-e310-11e2-beb0-f0def1557726",
        "taskId": null,
        "activityInstanceId": "Task_1:b68b71ca-e310-11e2-beb0-f0def1557726",
        "caseExecutionId": null,
        "caseInstanceId": null,
        "serializationConfig": null
      },
      {
        "id": "someOtherId",
        "name": "amount",
        "type": "Integer",
        "variableType": "integer",
        "value": 15,
        "processInstanceId": "aProcessInstanceId",
        "executionId": "68b71c9-e310-11e2-beb0-f0def1557726",
        "taskId": null,
        "activityInstanceId": "Task_1:b68b71ca-e310-11e2-beb0-f0def1557726",
        "caseExecutionId": null,
        "caseInstanceId": null,
        "serializationConfig": null
      },
      {
        "id": "yetAnotherId",
        "name": "amount",
        "type": "Integer",
        "variableType": "integer",
        "value": 150,
        "processInstanceId": "anotherProcessInstanceId",
        "executionId": "68b71c9-e310-11e2-beb0-f0def1557726",
        "taskId": null,
        "activityInstanceId": "Task_2:b68b71ca-e310-11e2-beb0-f0def1557726",
        "caseExecutionId": null,
        "caseInstanceId": null,
        "serializationConfig": null
      }      
    ]
