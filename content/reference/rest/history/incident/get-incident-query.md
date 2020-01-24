---

title: "Get Incidents"
weight: 10

menu:
  main:
    name: "Get List"
    identifier: "rest-api-history-get-incident-query"
    parent: "rest-api-history-incident"
    pre: "GET `/history/incident`"

---


Queries for historic incidents that fulfill given parameters.
The size of the result set can be retrieved by using the [Get Incident Count]({{< ref "/reference/rest/history/incident/get-incident-query-count.md" >}}) method.


# Method

GET `/history/incident`


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
    <td>processDefinitionId</td>
    <td>Restricts to incidents that belong to a process definition with the given id.</td>
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
    <code>incidentId</code>, <code>incidentMessage</code>, <code>createTime</code>, <code>endTime</code>, <code>incidentType</code>, <code>executionId</code>, <code>activityId</code>, <code>processInstanceId</code>, <code>processDefinitionId</code>, <code>causeIncidentId</code>, <code>rootCauseIncidentId</code>, <code>configuration</code>, <code>tenantId</code> and <code>incidentState</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
  </tr>
</table>


# Result

A JSON array of historic incident objects.
Each historic incident object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the incident.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>String</td>
    <td>The key of the process definition this incident is associated with.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition this incident is associated with.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The key of the process definition this incident is associated with.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>String</td>
    <td>The id of the execution this incident is associated with.</td>
  </tr>
  <tr>
    <td>createTime</td>
    <td>String</td>
    <td>The time this incident happened. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>endTime</td>
    <td>String</td>
    <td>The time this incident has been deleted or resolved. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>incidentType</td>
    <td>String</td>
    <td>The type of incident, for example: <code>failedJobs</code> will be returned in case of an incident which identified a failed job during the execution of a process instance. See the <a href="{{< ref "/user-guide/process-engine/incidents.md#incident-types" >}}">User Guide</a> for a list of incident types.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>String</td>
    <td>The id of the activity this incident is associated with.</td>
  </tr>
  <tr>
    <td>failedActivityId</td>
    <td>String</td>
    <td>The id of the activity on which the last exception occurred.</td>
  </tr>
  <tr>
    <td>causeIncidentId</td>
    <td>String</td>
    <td>The id of the associated cause incident which has been triggered.</td>
  </tr>
  <tr>
    <td>rootCauseIncidentId</td>
    <td>String</td>
    <td>The id of the associated root cause incident which has been triggered.</td>
  </tr>
  <tr>
    <td>configuration</td>
    <td>String</td>
    <td>The payload of this incident.</td>
  </tr>
  <tr>
    <td>incidentMessage</td>
    <td>String</td>
    <td>The message of this incident.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The id of the tenant this incident is associated with.</td>
  </tr>
  <tr>
    <td>jobDefinitionId</td>
    <td>String</td>
    <td>The job definition id the incident is associated with.</td>
  </tr>
  <tr>
    <td>open</td>
    <td>Boolean</td>
    <td>If true, this incident is open.</td>
  </tr>
  <tr>
    <td>deleted</td>
    <td>Boolean</td>
    <td>If true, this incident has been deleted.</td>
  </tr>
  <tr>
    <td>resolved</td>
    <td>Boolean</td>
    <td>If true, this incident has been resolved.</td>
  </tr>
  <tr>
    <td>removalTime</td>
    <td>String</td>
    <td>The time after which the incident should be removed by the History Cleanup job. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>rootProcessInstanceId</td>
    <td>String</td>
    <td>The process instance id of the root process instance that initiated the process containing this incident.</td>
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

<!-- TODO: Insert a 'real' example -->
GET `/history/incident?processInstanceId=aProcInstId`

## Response

```json
[
  {
    "id": "anIncidentId",
    "processDefinitionId": "aProcDefId",
    "processInstanceId": "aProcInstId",
    "executionId": "anExecutionId",
    "createTime": "2014-03-01T08:00:00.000+0200",
    "endTime": null,
    "incidentType": "failedJob",
    "activityId": "serviceTask",
    "failedActivityId": "serviceTask",
    "causeIncidentId": "aCauseIncidentId",
    "rootCauseIncidentId": "aRootCauseIncidentId",
    "configuration": "aConfiguration",
    "incidentMessage": "anIncidentMessage",
    "tenantId": null,
    "jobDefinitionId": "aJobDefinitionId",
    "open": true,
    "deleted": false,
    "resolved": false,
    "removalTime": null,
    "rootProcessInstanceId": "aRootProcessInstanceId"
  },
  {
    "id": "anIncidentId",
    "processDefinitionId": "aProcDefId",
    "processInstanceId": "aProcInstId",
    "executionId": "anotherExecutionId",
    "createTime": "2014-03-01T08:00:00.000+0200",
    "endTime": "2014-03-10T12:00:00.000+0200",
    "incidentType": "customIncidentType",
    "activityId": "userTask",
    "failedActivityId": "userTask",
    "causeIncidentId": "anotherCauseIncidentId",
    "rootCauseIncidentId": "anotherRootCauseIncidentId",
    "configuration": "anotherConfiguration",
    "incidentMessage": "anotherIncidentMessage",
    "tenantId": null,
    "jobDefinitionId": null,
    "open": false,
    "deleted": false,
    "resolved": true,
    "removalTime": "2018-02-10T14:33:19.000+0200",
    "rootProcessInstanceId": "aRootProcessInstanceId"
  }
]
```
