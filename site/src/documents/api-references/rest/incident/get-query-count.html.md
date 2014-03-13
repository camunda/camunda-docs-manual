---

title: 'Get Incidents Count'
category: 'Incident'

keywords: 'get query list'

---


Query for the number of incidents that fulfill given parameters.
Takes the same parameters as the [get incidents](ref:#incident-get-incidents) method.


Method
------

GET <code>/incident/count</code>


Parameters
----------  
  
#### Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>incidentId</td>
    <td>Restricts to incidents that has the given id.</td>
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
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>incidentId</code>, <code>incidentTimestamp</code>, <code>incidentType</code>, <code>executionId</code>, <code>activityId</code>, <code>processInstanceId</code>, <code>processDefinitionId</code>, <code>causeIncidentId</code>, <code>rootCauseIncidentId</code> and <code>configuration</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>  
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
  </tr>
</table>

Result
------

A json object that contains the count as the only property.

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

Response codes
--------------  

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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

<!-- TODO: Insert a 'real' example -->
GET <code>/incident/count?processInstanceId=aProcInstId</code>
  
#### Response

    {"count": 2}
