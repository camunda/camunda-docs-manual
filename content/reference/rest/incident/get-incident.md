---

title: "Get Incident"
weight: 10

menu:
  main:
    name: "Get Incident"
    identifier: "rest-api-incident-get-incident"
    parent: "rest-api-incident"
    pre: "GET `/incident/{id}`"

---


Retrieves an incident by ID


# Method

GET `/incident/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the incident to be retrieved.</td>
  </tr>
</table>

# Result

A JSON object that represents an incident object with the following properties:

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
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition this incident is associated with.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance this incident is associated with.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>String</td>
    <td>The id of the execution this incident is associated with.</td>
  </tr>
  <tr>
    <td>incidentTimestamp</td>
    <td>String</td>
    <td>The time this incident happened. Has the format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
  </tr>
  <tr>
    <td>incidentType</td>
    <td>String</td>
    <td>The type of incident, for example: <code>failedJobs</code> will be returned in case of an incident which identified a failed job during the execution of a process instance. See the <a href="{{< relref "user-guide/process-engine/incidents.md#incident-types" >}}">User Guide</a> for a list of incident types.</td>
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
    <td>tenantId</td>
    <td>String</td>
    <td>The id of the tenant this incident is associated with.</td>
  </tr>
  <tr>
    <td>incidentMessage</td>
    <td>String</td>
    <td>The message of this incident.</td>
  </tr>
  <tr>
    <td>jobDefinitionId</td>
    <td>String</td>
    <td>The job definition id the incident is associated with.</td>
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
    <td>404</td>
    <td>application/json</td>
    <td>Returned if an incident with given id does not exist.</td>
  </tr>
</table>


# Example

## Request

GET `/incident/anIncidentId`

## Response

```json
  {
    "id": "anIncidentId",
    "processDefinitionId": "aProcDefId",
    "processInstanceId": "aProcInstId",
    "executionId": "anExecutionId",
    "incidentTimestamp": "2014-03-01T08:00:00",
    "incidentType": "failedJob",
    "activityId": "serviceTask",
    "causeIncidentId": "aCauseIncidentId",
    "rootCauseIncidentId": "aRootCauseIncidentId",
    "configuration": "aConfiguration",
    "tenantId": null,
    "incidentMessage": "anIncidentMessage",
    "jobDefinitionId": "aJobDefinitionId"
  }
```
