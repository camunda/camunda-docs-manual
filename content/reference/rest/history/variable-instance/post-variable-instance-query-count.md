---

title: "Get Variable Instance Count (POST)"
weight: 60

menu:
  main:
    name: "Get List Count (POST)"
    identifier: "rest-api-history-post-variable-instance-query-count"
    parent: "rest-api-history-variable-instance"
    pre: "POST `/history/variable-instance/count`"

---


Queries for historic variable instances that fulfill the given parameters.
This method takes the same message body as the [Get Variable Instances (POST)]({{< relref "reference/rest/history/variable-instance/post-variable-instance-query.md" >}}) method and therefore it is more powerful regarding variable values than the [Get Variable Instance Count]({{< relref "reference/rest/history/variable-instance/get-variable-instance-query-count.md" >}}) method.


# Method

POST `/history/variable-instance/count`


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
    <td>Filter by variable name.</td>
  </tr>
  <tr>
    <td>variableNameLike</td>
    <td>Restrict to variables with a name like the parameter.</td>
  </tr>
  <tr>
    <td>variableValue</td>
    <td>Filter by variable value. May be <code>String</code>, <code>Number</code> or <code>Boolean</code>.</td>
  </tr>
  <tr>
    <td>includeDeleted</td>
    <td>Include variables that has already been deleted during the execution.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by the process instance the variable belongs to.</td>
  </tr>
  <tr>
    <td>processInstanceIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed process instance ids.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Filter by the process definition the variable belongs to.</td>
  </tr>
  <tr>
    <td>executionIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed execution ids.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>Filter by the case instance the variable belongs to.</td>
  </tr>
  <tr>
    <td>caseExecutionIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed case execution ids.</td>
  </tr>
  <tr>
    <td>caseActivityIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed case activity ids.</td>
  </tr>
  <tr>
    <td>taskIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed task ids.</td>
  </tr>
  <tr>
    <td>activityInstanceIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed activity instance ids.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed and comma-separated tenant ids.</td>
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
    <td>The number of matching historic variable instances.</td>
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
    <td>Returned if some of the query parameters are invalid. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/history/variable-instance/count`

Request Body:

```json
{
  "variableName": "someVariable",
  "variableValue": 42
}
```

## Response

```json
{
  "count": 1
}
```
