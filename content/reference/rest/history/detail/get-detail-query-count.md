---

title: "Get Historic Detail Count"
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-history-get-detail-query-count"
    parent: "rest-api-history-detail"
    pre: "GET `/history/detail/count`"

---

Queries for the number of historic details that fulfill the given parameters.
Takes the same parameters as the [Get Historic Details]({{< ref "/reference/rest/history/detail/get-detail-query.md" >}}) method.


# Method

GET `/history/detail/count`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by process instance id.</td>
  </tr>
  <tr>
    <td>processInstanceIdIn</td>
    <td>Only include historic details which belong to one of the passed process instance ids.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>Filter by execution id.</td>
  </tr>
  <tr>
    <td>activityInstanceId</td>
    <td>Filter by activity instance id.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>Filter by case instance id.</td>
  </tr>
  <tr>
    <td>caseExecutionId</td>
    <td>Filter by case execution id.</td>
  </tr>
  <tr>
    <td>variableInstanceId</td>
    <td>Filter by variable instance id.</td>
  </tr>
  <tr>
    <td>variableTypeIn</td>
    <td>Only include historic details where the variable updates belong to one of the passed and comma-separated variable types. A list of all supported variable types can be found <a href="{{< ref "/user-guide/process-engine/variables.md#supported-variable-values" >}}">here</a>. <b>Note:</b> All non-primitive variables are associated with the type "serializable".</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include historic details that belong to no tenant. Value may only be 
    <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>userOperationId</td>
    <td>Filter by a user operation id</td>
  </tr>
    <td>formFields</td>
    <td>Only include <strong>HistoricFormFields</strong>. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>variableUpdates</td>
    <td>Only include <strong>HistoricVariableUpdates</strong>. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>excludeTaskDetails</td>
    <td>Excludes all task-related <strong>HistoricDetails</strong>, so only items which have no task id set will be selected. When this parameter is used together with <code>taskId</code>, this call is ignored and task details are <strong>not</strong> excluded. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>occurredBefore</td>
    <td>Restrict to historic details that occured before the given date (including the date). By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>occurredAfter</td>
    <td>Restrict to historic details that occured after the given date (including the date). By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
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
    <td>The number of matching historic details.</td>
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

GET `/history/detail/count?variableName=my_variable`

## Response

```json
{
  "count": 3
}
```
