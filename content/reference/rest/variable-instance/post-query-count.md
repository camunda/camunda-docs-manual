---

title: 'Get Variable Instances Count (POST)'
weight: 50

menu:
  main:
    name: "Get List Count (POST)"
    identifier: "rest-api-variable-instance-post-list-count"
    parent: "rest-api-variable-instance"
    pre: "POST `/variable-instance/count`"

---


Query for the number of variable instances that fulfill given parameters. This method takes the same message body as the 
[POST query]({{< relref "reference/rest/variable-instance/post-query.md" >}}) and therefore it is slightly more powerful than the [GET query count]({{< relref "reference/rest/variable-instance/get-query-count.md" >}}).

# Method

POST `/variable-instance/count`


# Parameters

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
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>variableName</code>, <code>variableType</code>, <code>activityInstanceId</code> and <code>tenantId</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
  </tr>
</table>


# Result

A JSON object that contains the count as the only property.

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

POST `/variable-instance/count`

Request Body:

    {"variableValuess": 
        [{"name": "amount",
         "operator": "gteq",
         "value": "5"
        },
        {"name": "amount",
         "operator": "lteq",
         "value": 200}],
    "processInstanceIdIn": [ "aProcessInstanceId", "anotherProcessInstanceId" ]}
  
## Response

    {"count": 3}
