---

title: "Get Incident Count"
weight: 20

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-history-get-incident-query-count"
    parent: "rest-api-history-incident"
    pre: "GET `/history/incident/count`"

---

Queries for the number of historic incidents that fulfill the given parameters.
Takes the same parameters as the [Get Incidents]({{< ref "/reference/rest/history/incident/get-incident-query.md" >}}) method.


# Method

GET `/history/incident/count`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>incidentId</td>
    <td>Restricts to incidents that have the given id.</td>
  </tr>
  <tr>
    <td>incidentType</td>
    <td>Restricts to incidents that belong to the given incident type. See the <a href="{{< ref "/user-guide/process-engine/incidents.md#incident-types" >}}">User Guide</a> for a list of incident types.</td>
  </tr>
  <tr>
    <td>incidentMessage</td>
    <td>Restricts to incidents that have the given incident message.</td>
  </tr>
  <tr>
    <td>incidentMessageLike</td>
    <td>Restricts to incidents that incidents message is a substring of the given value. 
     The string can include the wildcard character '%' to express 
     like-strategy: starts with (string%), ends with (%string) or contains (%string%).
    </td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Restricts to incidents that belong to a process definition with the given id.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Restricts to incidents that belong to a process instance with the given id.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Restricts to incidents that have the given processDefinitionKey.</td>
  </tr>
  <tr>
    <td>processDefinitionKeyIn</td>
    <td>Restricts to incidents that have one of the given process definition keys.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>Restricts to incidents that belong to an execution with the given id.</td>
  </tr>
  <tr>
    <td>createTimeBefore</td>
    <td>Restricts to incidents that have a createTime date before the given date.
     By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., 
     <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>createTimeAfter</td>
    <td>Restricts to incidents that have a createTime date after the given date. 
     By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., 
     <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>endTimeBefore</td>
    <td>Restricts to incidents that have an endTimeBefore date before the given date. 
     By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., 
     <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>endTimeAfter</td>
    <td>Restricts to incidents that have an endTimeAfter date after the given date. 
     By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., 
     <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>Restricts to incidents that belong to an activity with the given id.</td>
  </tr>
  <tr>
    <td>failedActivityId</td>
    <td>Restricts to incidents that were created due to the failure of an activity with the given id.</td>
  </tr>
  <tr>
    <td>causeIncidentId</td>
    <td>Restricts to incidents that have the given incident id as cause incident.</td>
  </tr>
  <tr>
    <td>rootCauseIncidentId</td>
    <td>Restricts to incidents that have the given incident id as root cause incident.</td>
  </tr>
  <tr>
    <td>configuration</td>
    <td>Restricts to incidents that have the given parameter set as configuration.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Restricts to incidents that have one of the given comma-separated tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include historic incidents that belong to no tenant. Value may only be 
    <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>jobDefinitionIdIn</td>
    <td>Restricts to incidents that have one of the given comma-separated job definition ids.</td>
  </tr>
  <tr>
    <td>open</td>
    <td>Restricts to incidents that are open.</td>
  </tr>
  <tr>
    <td>deleted</td>
    <td>Restricts to incidents that are deleted.</td>
  </tr>
  <tr>
    <td>resolved</td>
    <td>Restricts to incidents that are resolved.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>incidentId</code>, <code>createTime</code>, <code>endTime</code>, <code>incidentType</code>, <code>executionId</code>, <code>activityId</code>, <code>processInstanceId</code>, <code>processDefinitionId</code>, <code>processDefinitionKey</code>, <code>causeIncidentId</code>, <code>rootCauseIncidentId</code>, <code>configuration</code> and <code>tenantId</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
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
    <td>The number of matching executions.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

<!-- TODO: Insert a 'real' example -->
GET `/history/incident/count?processInstanceId=aProcInstId`

## Response

```json
{
  "count": 2
}
```
