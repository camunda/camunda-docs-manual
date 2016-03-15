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


Query for historic incidents that fulfill given parameters.
The size of the result set can be retrieved by using the [get incidents count]({{< relref "reference/rest/history/incident/get-incident-query-count.md" >}}) method.


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
    <td>Restricts to incidents that belong to the given incident type.</td>
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
    <code>incidentId</code>, <code>createTime</code>, <code>endTime</code>, <code>incidentType</code>, <code>executionId</code>, <code>activityId</code>, <code>processInstanceId</code>, <code>processDefinitionId</code>, <code>causeIncidentId</code>, <code>rootCauseIncidentId</code>, <code>configuration</code> and <code>tenantId</code>.
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
    <td>The time this incident happened. Has the format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
  </tr>
  <tr>
    <td>endTime</td>
    <td>String</td>
    <td>The time this incident has been deleted or resolved. Has the format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
  </tr>
  <tr>
    <td>incidentType</td>
    <td>String</td>
    <td>The type of incident, for example: <code>failedJobs</code> will be returned in case of an incident which identified a failed job during the execution of a process instance.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>String</td>
    <td>The id of the activity this incident is associated with.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

<!-- TODO: Insert a 'real' example -->
GET <code>/history/incident?processInstanceId=aProcInstId</code>

## Response

    [
      {
        "id": "anIncidentId",
        "processDefinitionId": "aProcDefId",
        "processInstanceId": "aProcInstId",
        "executionId": "anExecutionId",
        "createTime": "2014-03-01T08:00:00",
        "endTime": null,
        "incidentType": "failedJob",
        "activityId": "serviceTask",
        "causeIncidentId": "aCauseIncidentId",
        "rootCauseIncidentId": "aRootCauseIncidentId",
        "configuration": "aConfiguration",
        "incidentMessage": "anIncidentMessage",
        "tenantId": null,
        "open": true,
        "deleted": false,
        "resolved": false
      },
      {
        "id": "anIncidentId",
        "processDefinitionId": "aProcDefId",
        "processInstanceId": "aProcInstId",
        "executionId": "anotherExecutionId",
        "createTime": "2014-03-01T08:00:00",
        "endTime": "2014-03-10T12:00:00",
        "incidentType": "customIncidentType",
        "activityId": "userTask",
        "causeIncidentId": "anotherCauseIncidentId",
        "rootCauseIncidentId": "anotherRootCauseIncidentId",
        "configuration": "anotherConfiguration",
        "incidentMessage": "anotherIncidentMessage",
        "tenantId": null,
        "open": false,
        "deleted": false,
        "resolved": true
      }
    ]
