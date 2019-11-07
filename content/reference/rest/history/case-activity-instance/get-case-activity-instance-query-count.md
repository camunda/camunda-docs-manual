---

title: "Get Historic Case Activity Instance Count"
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-history-get-case-activity-instance-query-count"
    parent: "rest-api-history-case-activity-instance"
    pre: "GET `/history/case-activity-instance/count`"

---

Queries for the number of historic case activity instances that fulfill the given parameters. Takes
the same parameters as the [Get Historic Case Activity Instances]({{< ref "/reference/rest/history/case-activity-instance/get-case-activity-instance-query.md" >}}) method.


# Method

GET `/history/case-activity-instance/count`

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
    <td>Filter by a list of tenant ids. A case activity instance must have one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include historic case activity instances that belong to no tenant. Value may only be 
    <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
</table>

\* For further information, please see the <a href="{{< ref "/reference/rest/overview/date-format.md" >}}"> documentation</a>.

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
    <td>The number of matching historic activity instances.</td>
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
    <td>Returned if some of the query parameters are invalid. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  </tr>
</table>


# Example

## Request

GET `/history/case-activity-instance?caseActivityName=aCaseActivityName&completed=false`

## Response

```json
{
  "count": 1
}
```
