---

title: 'Get Variable Instances Count'
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-variable-instance-get-list-count"
    parent: "rest-api-variable-instance"
    pre: "GET `/variable-instance/count`"

---


Query for the number of variable instances that fulfill given parameters. Takes the same parameters as the [get variable instances]({{< ref "/reference/rest/variable-instance/get-query.md" >}}) method.

# Method

GET `/variable-instance/count`


# Parameters
  
## Query Parameters

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
    <td>tenantIdIn</td>
    <td>Only include variable instances which belong to one of the passed and comma-separated tenant ids.</td>
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
    <code>variableName</code>, <code>variableType</code>, <code>activityInstanceId</code> and <code>tenantId</code>.
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>, or if an invalid operator for variable comparison is used. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

GET `/variable-instance/count?processInstanceIdIn=aProcessInstanceId,anotherProcessInstanceId&variableValues=amount_gteq_5,amount_lteq_200`

## Response

    {"count": 3}    
