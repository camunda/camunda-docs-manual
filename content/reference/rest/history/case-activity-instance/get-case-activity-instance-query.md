---

title: "Get Historic Case Activity Instances"
weight: 10

menu:
  main:
    name: "Get List"
    identifier: "rest-api-history-get-case-activity-instance-query"
    parent: "rest-api-history-case-activity-instance"
    pre: "GET `/history/case-activity-instance`"

---

Queries for historic case activity instances that fulfill the given parameters. The size of the
result set can be retrieved by using the [Get Historic Case Activity Instance Count]({{< ref "/reference/rest/history/case-activity-instance/get-case-activity-instance-query-count.md" >}}) method.

# Method

GET `/history/case-activity-instance`

# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>caseActivityInstanceId</td>
    <td>Filter by case activity instance id.</td>
  </tr>
  <tr>
    <td>caseActivityInstanceIdIn</td>
    <td>Only include case activity instances which belong to one of the passed and comma-separated activity instance ids.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>Filter by case instance id.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>Filter by case definition id.</td>
  </tr>
  <tr>
    <td>caseExecutionId</td>
    <td>Filter by the id of the case execution that executed the case activity instance.</td>
  </tr>
  <tr>
    <td>caseActivityId</td>
    <td>Filter by the case activity id (according to CMMN XML).</td>
  </tr>
  <tr>
    <td>caseActivityIdIn</td>
    <td>Only include case activity instances which belong to one of the passed and comma-separated activity ids.</td>
  </tr>
  <tr>
    <td>caseActivityName</td>
    <td>Filter by the case activity name (according to CMMN XML).</td>
  </tr>
  <tr>
    <td>caseActivityType</td>
    <td>Filter by the case activity type (according to CMMN XML).</td>
  </tr>
  <tr>
    <td>createdBefore</td>
    <td>Restrict to instances that were created before the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>createdAfter</td>
    <td>Restrict to instances that were created after the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>endedBefore</td>
    <td>Restrict to instances that ended before the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>endedAfter</td>
    <td>Restrict to instances that ended after the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>finished</td>
    <td>Only include finished case activity instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>unfinished</td>
    <td>Only include unfinished case activity instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>required</td>
    <td>Only include required case activity instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>repeatable</td>
    <td>Only include repeatable case activity instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>repetition</td>
    <td>Only include case activity instances which are repetitions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>available</td>
    <td>Only include available case activity instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>enabled</td>
    <td>Only include enabled case activity instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>Only include disabled case activity instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Only include active case activity instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>completed</td>
    <td>Only include completed case activity instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>terminated</td>
    <td>Only include terminated case activity instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. A case activity instance must have one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include historic case activity instances that belong to no tenant. Value may only be 
    <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results by a given criterion. Valid values are
    <code>caseActivityInstanceID</code>, <code>caseInstanceId</code>, <code>caseExecutionId</code>, <code>caseActivityId</code>, <code>caseActivityName</code>, <code>createTime</code>, <code>endTime</code>, <code>duration</code>, <code>caseDefinitionId</code> and <code>tenantId</code>.
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

\* For further information, please see the <a href="{{< ref "/reference/rest/overview/date-format.md" >}}"> documentation</a>.

# Result

A JSON array of historic case activity instance objects.
Each historic activity instance object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the case activity instance.</td>
  </tr>
  <tr>
    <td>parentCaseActivityInstanceId</td>
    <td>String</td>
    <td>The id of the parent case activity instance.</td>
  </tr>
  <tr>
    <td>caseActivityId</td>
    <td>String</td>
    <td>The id of the case activity that this object is an instance of.</td>
  </tr>
  <tr>
    <td>caseActivityName</td>
    <td>String</td>
    <td>The name of the case activity that this object is an instance of.</td>
  </tr>
  <tr>
    <td>caseActivityType</td>
    <td>String</td>
    <td>The type of the activity this case execution belongs to.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>String</td>
    <td>The id of the case definition that this case activity instance belongs to.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>String</td>
    <td>The id of the case instance that this case activity instance belongs to.</td>
  </tr>
  <tr>
    <td>caseExecutionId</td>
    <td>String</td>
    <td>The id of the case execution that executed this case activity instance.</td>
  </tr>
  <tr>
    <td>taskId</td>
    <td>String</td>
    <td>The id of the task that is associated to this case activity instance. Is only set if the case activity is a human task.</td>
  </tr>
  <tr>
    <td>calledProcessInstanceId</td>
    <td>String</td>
    <td>The id of the called process instance. Is only set if the case activity is a process task.</td>
  </tr>
  <tr>
    <td>calledCaseInstanceId</td>
    <td>String</td>
    <td>The id of the called case instance. Is only set if the case activity is a case task.</td>
  </tr>
  <tr>
    <td>createTime</td>
    <td>String</td>
    <td>The time the instance was created. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>endTime</td>
    <td>String</td>
    <td>The time the instance ended. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>durationInMillis</td>
    <td>Number</td>
    <td>The time the instance took to finish (in milliseconds).</td>
  </tr>
  <tr>
    <td>required</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is required.</td>
  </tr>
  <tr>
    <td>repeatable</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is repeatable.</td>
  </tr>
  <tr>
    <td>repetition</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is a repetition.</td>
  </tr>
  <tr>
    <td>available</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is available.</td>
  </tr>
  <tr>
    <td>enabled</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is enabled.</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is disabled.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is active.</td>
  </tr>
  <tr>
    <td>completed</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is completed.</td>
  </tr>
  <tr>
    <td>terminated</td>
    <td>Boolean</td>
    <td>If true, this case activity instance is terminated.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the case activity instance.</td>
  </tr>
</table>

\* For further information, please see the <a href="{{< ref "/reference/rest/overview/date-format.md" >}}"> documentation</a>.

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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/history/case-activity-instance?caseActivityName=aCaseActivityName&completed=false`

## Response

```json
[
  {
    "active": false,
    "available": true,
    "calledCaseInstanceId": "aHistoricCalledCaseInstanceId",
    "calledProcessInstanceId": "aHistoricCalledProcessInstanceId",
    "caseActivityId": "aCaseActivity",
    "caseActivityName": "aCaseActivityName",
    "caseDefinitionId": "aCaseDefId",
    "caseExecutionId": "aCaseExecutionId",
    "caseInstanceId": "aCaseInstId",
    "completed": false,
    "createTime": "2013-04-23T11:20:43.000+0200",
    "disabled": false,
    "durationInMillis": 2000,
    "enabled": false,
    "endTime": "2013-04-23T18:42:43.000+0200",
    "id": "aCaseActivityInstId",
    "parentCaseActivityInstanceId": "aHistoricParentCaseActivityInstanceId",
    "taskId": "aTaskId",
    "terminated": false,
    "required": false,
    "repeatable": true,
    "repetition": false,
    "tenantId": null
  }
]
```
