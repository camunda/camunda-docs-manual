---

title: 'Get Variable Instances (POST)'
weight: 50

menu:
  main:
    name: "Get List (POST)"
    identifier: "rest-api-variable-instance-post-list"
    parent: "rest-api-variable-instance"
    pre: "POST `/variable-instance`"

---


Query for variable instances that fulfill given parameters through a JSON object. This method is slightly more powerful than the
[GET query]({{< relref "reference/rest/variable-instance/get-query.md" >}}) because it allows filtering by multiple variable instances of types `String`, `Number` or `Boolean`.


# Method

POST `/variable-instance`


# Parameters

## Query Parameters

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
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.</td>
  </tr>
  <tr>
    <td>deserializeValues</td>
    <td>
      {{< rest-var-query-param-deserialize-object-value >}}
    </td>
  </tr>
</table>

## Request Body

A JSON object with the following properties:

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
    <td>Only include variable instances which belong to one of the passed process instance ids.</td>
  </tr>
  <tr>
    <td>executionIdIn</td>
    <td>Only include variable instances which belong to one of the passed execution ids.</td>
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
    <td>Only include variable instances which belong to one of the passed task ids.</td>
  </tr>
  <tr>
    <td>activityInstanceIdIn</td>
    <td>Only include variable instances which belong to one of the passed activity instance ids.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Only include variable instances which belong to one of the passed and comma-separated tenant ids.</td>
  </tr>
  <tr>
    <td>variableValues</td>
    <td>A JSON array to only include variable instances that have the certain values.<br/>
    The array consists of objects with the three properties <code>name</code>, <code>operator</code> and <code>value</code>.
    <code>name (String)</code> is the variable name, <code>operator (String)</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <code>value</code> may be <code>String</code>, <code>Number</code> or <code>Boolean</code>.
    <br/>
    Valid operator values are: <code>eq</code> - equal to; <code>neq</code> - not equal to; <code>gt</code> - greater than;
    <code>gteq</code> - greater than or equal to; <code>lt</code> - lower than; <code>lteq</code> - lower than or equal to;
    <code>like</code>.<br/>
    </td>
  </tr>
  <tr>
    <td>sorting</td>
    <td>
      <p>
        A JSON array of criteria to sort the result by. Each element of the array is a JSON object that specifies one ordering. The position in the array identifies the rank of an ordering, i.e. whether it is primary, secondary, etc. The ordering objects have the following properties:
      </p>
      <table>
        <tr>
          <td>sortBy</td>
          <td><b>Mandatory.</b> Sort the results lexicographically by a given criterion. Valid values are <code>variableName</code>, <code>variableType</code>, <code>activityInstanceId</code> and <code>tenantId</code>.</td>
        </tr>
        <tr>
          <td>sortOrder</td>
          <td><b>Mandatory.</b> Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
        </tr>
      </table>
    </td>
  </tr>
</table>


# Result

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
    <td>{{< rest-var-response-type >}}</td>
  </tr>
  <tr>
    <td>value</td>
    <td>String/Number/Boolean/Object</td>
    <td>{{< rest-var-response deserializationParameter="deserializeValues" >}}</td>
  </tr>
  <tr>
    <td>valueInfo</td>
    <td>Object</td>
    <td>{{< rest-var-response-valueinfo >}}</td>
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
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The id of the tenant that this variable instance belongs to.</td>
  </tr>
</table>


# Response Codes

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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>, or if an invalid operator for variable comparison is used. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/variable-instance`

Request Body:

    {"variableValuess":
        [{"name": "amount",
         "operator": "gteq",
         "value": "5"
        },
        {"name": "amount",
         "operator": "lteq",
         "value": 200}],
    "processInstanceIdIn": [ "aProcessInstanceId", "anotherProcessInstanceId" ]},
    "sorting":
        [{"sortBy": "variableType",
        "sortOrder": "asc"
        }]
    }

## Response

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
        "serializationConfig": null,
        "tenantId": null
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
        "serializationConfig": null,
        "tenantId": null
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
        "serializationConfig": null,
        "tenantId": null
      }
    ]
