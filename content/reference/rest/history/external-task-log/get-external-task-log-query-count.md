---

title: "Get External Task Log Count"
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-history-get-external-task-log-query-count"
    parent: "rest-api-history-external-task-log"
    pre: "GET `/history/external-task-log/count`"

---


Queries for the number of historic external task logs that fulfill the given parameters.
Takes the same parameters as the [Get External Task Logs]({{< ref "/reference/rest/history/external-task-log/get-external-task-log-query.md" >}}) method.


# Method

GET `/history/external-task-log/count`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>logId</td>
    <td>Filter by historic external task log id.</td>
  </tr>
  <tr>
    <td>externalTaskId</td>
    <td>Filter by external task id.</td>
  </tr>
  <tr>
  <tr>
    <td>topicName</td>
    <td>Filter by an external task topic.</td>
  </tr>
  <tr>
  <tr>
    <td>workerId</td>
    <td>Filter by the id of the worker that the task was most recently locked by.</td>
  </tr>
  <tr>
    <td>errorMessage</td>
    <td>Filter by external task exception message.</td>
  </tr>
  <tr>
    <td>activityIdIn</td>
    <td>Only include historic external task logs which belong to one of the passed activity ids.</td>
  </tr>
  <tr>
    <td>activityInstanceIdIn</td>
    <td>Only include historic external task logs which belong to one of the passed activity instance ids.</td>
  </tr>
  <tr>
    <td>executionIdIn</td>
    <td>Only include historic external task logs which belong to one of the passed execution ids.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by process instance id.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Filter by process definition id.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Filter by process definition key.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Only include historic external task log entries which belong to one of the passed and comma-separated tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include historic external task log entries that belong to no tenant. Value may only be 
    <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>priorityLowerThanOrEquals</td>
    <td>Only include logs for which the associated external task had a priority lower than or equal to the given value. Value must be a valid <code>long</code> value.</td>
  </tr>
  <tr>
    <td>priorityHigherThanOrEquals</td>
    <td>Only include logs for which the associated external task had a priority higher than or equal to the given value. Value must be a valid <code>long</code> value.</td>
  </tr>
  <tr>
    <td>creationLog</td>
    <td>Only include creation logs. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>failureLog</td>
    <td>Only include failure logs. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>successLog</td>
    <td>Only include success logs. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>deletionLog</td>
    <td>Only include deletion logs. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
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
    <td>The number of matching historic external task logs.</td>
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

GET `/history/external-task-log/count?externalTaskId=anExternalTaskId`

## Response

```json
{
  "count": 1
}
```
