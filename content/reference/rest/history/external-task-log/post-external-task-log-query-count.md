---

title: "Get External Task Log Count (POST)"
weight: 50

menu:
  main:
    name: "Get List Count (POST)"
    identifier: "rest-api-history-post-external-task-log-query-count"
    parent: "rest-api-history-external-task-log"
    pre: "POST `/history/external-task-log/count`"

---


Queries for the number of historic external task logs that fulfill the given parameters.
This method takes the same message body as the [Get External Task Logs (POST)]({{< relref "reference/rest/history/external-task-log/post-external-task-log-query.md" >}}) method and therefore it is slightly more powerful than the [Get External Task Log Count]({{< relref "reference/rest/history/external-task-log/get-external-task-log-query-count.md" >}}) method.


# Method

POST `/history/external-task-log/count`


# Parameters

## Request Body

A JSON object with the following properties:

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
    <td>taskId</td>
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
    <td>Returned if some of the query parameters are invalid. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/history/external-task-log/count`

Request Body:

```json
{
  "taskId": "anExternalTaskId"
}
```

## Response

```json
{
  "count": 1
}
```
