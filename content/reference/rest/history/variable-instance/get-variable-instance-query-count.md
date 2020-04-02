---

title: "Get Variable Instance Count"
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-history-get-variable-instance-query-count"
    parent: "rest-api-history-variable-instance"
    pre: "GET `/history/variable-instance/count`"

---


Queries for the number of historic variable instances that fulfill the given parameters.
Takes the same parameters as the [Get Variable Instances]({{< ref "/reference/rest/history/variable-instance/get-variable-instance-query.md" >}}) method.


# Method

GET `/history/variable-instance/count`


# Parameters

## Query Parameters

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
    <td>Filter by variable value. Is treated as a <code>String</code> object on server side.</td>
  </tr>
  <tr>
    <td>variableValue</td>
    <td>Filter by variable value. Is treated as a <code>String</code> object on server side.</td>
  </tr>
  </tr>
  <tr>
    <td>variableNamesIgnoreCase</td>
    <td>Match the variable name provided in <code>variableName</code> and <code>variableNameLike</code> case-insensitively. If set to <code>true</code> <strong>variableName</strong> and <strong>variablename</strong> are treated as equal.</td>
  </tr>
  <tr>
    <td>variableValuesIgnoreCase</td>
    <td>Match the variable value provided in <code>variableValue</code> case-insensitively. If set to <code>true</code> <strong>variableValue</strong> and <strong>variablevalue</strong> are treated as equal.</td>
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
    <td>Only include historic variable instances which belong to one of the passed and comma-separated execution ids.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>Filter by the case instance the variable belongs to.</td>
  </tr>
  <tr>
    <td>caseExecutionIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed and comma-separated case execution ids.</td>
  </tr>
  <tr>
    <td>caseActivityIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed and comma-separated case activity ids.</td>
  </tr>
  <tr>
    <td>taskIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed and comma-separated task ids.</td>
  </tr>
  <tr>
    <td>activityInstanceIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed and comma-separated activity instance ids.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed and comma-separated tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include historic variable instances that belong to no tenant. Value may only be 
    <code>true</code>, as <code>false</code> is the default behavior.</td>
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
    <td>Returned if some of the query parameters are invalid.</td>
  </tr>
</table>


# Example

## Request

GET `/history/variable-instance/count?variableName=my_variable`

## Response

```json
{
  "count": 1
}
```
