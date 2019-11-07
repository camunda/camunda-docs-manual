---

title: "Get Historic Activity Instance Count"
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-history-get-activity-instance-query-count"
    parent: "rest-api-history-activity-instance"
    pre: "GET `/history/activity-instance/count`"

---


Queries for the number of historic activity instances that fulfill the given parameters.
Takes the same parameters as the [Get Historic Activity Instances]({{< ref "/reference/rest/history/activity-instance/get-activity-instance-query.md" >}}) method.


# Method

GET `/history/activity-instance/count`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>activityInstanceId</td>
    <td>Filter by activity instance id.</td>
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
    <td>executionId</td>
    <td>Filter by the id of the execution that executed the activity instance.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>Filter by the activity id (according to BPMN 2.0 XML).</td>
  </tr>
  <tr>
    <td>activityName</td>
    <td>Filter by the activity name (according to BPMN 2.0 XML).</td>
  </tr>
  <tr>
    <td>activityType</td>
    <td>Filter by activity type.</td>
  </tr>
  <tr>
    <td>taskAssignee</td>
    <td>Only include activity instances that are user tasks and assigned to a given user.</td>
  </tr>
  <tr>
    <td>finished</td>
    <td>Only include finished activity instances. Value may only be <code>true</code>, as <code>false</code> behaves the same as when the property is not set.</td>
  </tr>
  <tr>
    <td>unfinished</td>
    <td>Only include unfinished activity instances. Value may only be <code>true</code>, as <code>false</code>
    behaves the same as when the property is not set.</td>
  </tr>
  <tr>
    <td>canceled</td>
    <td>Only include canceled activity instances. Value may only be <code>true</code>, as <code>false</code> behaves
    the same as when the property is not set.</td>
  </tr>
  <tr>
    <td>completeScope</td>
    <td>Only include activity instances which completed a scope. Value may only be <code>true</code>, as <code>false</code>
    behaves the same as when the property is not set.</td>
  </tr>
  <tr>
  <td>startedBefore</td>
    <td>Restrict to instances that were started before the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>startedAfter</td>
    <td>Restrict to instances that were started after the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>finishedBefore</td>
    <td>Restrict to instances that were finished before the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>finishedAfter</td>
    <td>Restrict to instances that were finished after the given date. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a list of tenant ids. An activity instance must have one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include historic activity instances that belong to no tenant. Value may only be 
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
</table>


# Example

## Request

GET `/history/activity-instance/count?activityType=userTask`

## Response

```json
{
  "count": 1
}
```
