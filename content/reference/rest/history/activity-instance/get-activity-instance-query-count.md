---

title: "Get Activity Instances Count"
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-history-get-activity-instance-query-count"
    parent: "rest-api-history-activity-instance"
    pre: "GET `/history/activity-instance/count`"

---


Query for the number of historic activity instances that fulfill the given parameters.
Takes the same parameters as the [get historic activity instances]({{< relref "reference/rest/history/activity-instance/get-activity-instance-query.md" >}}) method.


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
    <td>Only include finished activity instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>unfinished</td>
    <td>Only include unfinished activity instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>canceled</td>
    <td>Only include canceled activity instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>completeScope</td>
    <td>Only include activity instances which completed a scope. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
  <td>startedBefore</td>
    <td>Restrict to instances that were started before the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>startedAfter</td>
    <td>Restrict to instances that were started after the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>finishedBefore</td>
    <td>Restrict to instances that were finished before the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>finishedAfter</td>
    <td>Restrict to instances that were finished after the given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a list of tenant ids. An activity instance must have one of the given tenant ids. Must be a JSON array of Strings.</td>
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
    <td>Returned if some of the query parameters are invalid. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
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
