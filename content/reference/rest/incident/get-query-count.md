---

title: "Get Incident Count"
weight: 10

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-incident-get-query-count"
    parent: "rest-api-incident"
    pre: "GET `/incident/count`"

---


Queries for the number of incidents that fulfill given parameters.
Takes the same parameters as the [Get Incidents]({{< ref "/reference/rest/incident/get-query.md" >}}) method.


# Method

GET `/incident/count`


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
    <td>processDefinitionKeyIn</td>
    <td>Restricts to incidents that belong to a process definition with the given keys. Must be a comma-separated list.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Restricts to incidents that belong to a process instance with the given id.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>Restricts to incidents that belong to an execution with the given id.</td>
  </tr>
  <tr>
    <td>incidentTimestampBefore</td>
    <td>Restricts to incidents that have an incidentTimestamp date before the given date. 
     By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., 
     <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>incidentTimestampAfter</td>
    <td>Restricts to incidents that have an incidentTimestamp date after the given date. 
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
    <td>jobDefinitionIdIn</td>
    <td>Restricts to incidents that have one of the given comma-separated job definition ids.</td>
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
GET `/incident/count?processInstanceId=aProcInstId`

## Response

```json
{
  "count": 2
}
```
