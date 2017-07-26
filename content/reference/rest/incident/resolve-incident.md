---

title: "Resolve Incident"
weight: 10

menu:
  main:
    name: "Resolve Incident"
    identifier: "rest-api-incident-resolve-incident"
    parent: "rest-api-incident"
    pre: "DELETE `/incident/{id}`"

---


Resolves an incident with given id


# Method

DELETE `/incident/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the incident to be resolved.</td>
  </tr>
</table>

# Result

This method returns no content.

# Response Codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Returned if an incident with given id does not exist.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>Returned if an incident is not related to any execution or an incident is of type "failedJob" or "failedExternalTask". To resolve such an incident, please refer to the <a href="{{< relref "user-guide/process-engine/incidents.md#incident-types">}}">Incident Types</a> section.</td>
  </tr>
</table>

# Example

## Request

DELETE `/incident/anIncidentId`

## Response

No content
