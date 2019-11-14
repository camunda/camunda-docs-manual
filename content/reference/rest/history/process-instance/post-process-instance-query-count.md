---

title: "Get Process Instance Count (POST)"
weight: 50

menu:
  main:
    name: "Get List Count (POST)"
    identifier: "rest-api-history-post-process-instance-query-count"
    parent: "rest-api-history-process-instance"
    pre: "POST `/history/process-instance/count`"

---


Queries for the number of historic process instances that fulfill the given parameters.
This method takes the same message body as the [Get Process Instances (POST)]({{< ref "/reference/rest/history/process-instance/post-process-instance-query.md" >}}) method and therefore it is slightly more powerful than the [Get Process Instance Count]({{< ref "/reference/rest/history/process-instance/get-process-instance-query-count.md" >}}) method.


# Method

POST `/history/process-instance/count`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by process instance id.</td>
  </tr>
  <tr>
    <td>processInstanceIds</td>
    <td>Filter by process instance ids. Must be a comma-separated list of process instance ids.</td>
  </tr>
  <tr>
    <td>processInstanceBusinessKey</td>
    <td>Filter by process instance business key.</td>
  </tr>
  <tr>
    <td>processInstanceBusinessKeyLike</td>
    <td>Filter by process instance business key that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>rootProcessInstances</td>
    <td>Restrict the query to all process instances that are top level process instances.</td>
  </tr>
  <tr>
    <td>superProcessInstanceId</td>
    <td>Restrict query to all process instances that are sub process instances of the given process instance. Takes a process instance id.</td>
  </tr>
  <tr>
    <td>subProcessInstanceId</td>
    <td>Restrict query to one process instance that has a sub process instance with the given id.</td>
  </tr>
  <tr>
    <td>superCaseInstanceId</td>
    <td>Restrict query to all process instances that are sub process instances of the given case instance. Takes a case instance id.</td>
  </tr>
  <tr>
    <td>subCaseInstanceId</td>
    <td>Restrict query to one process instance that has a sub case instance with the given id.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>Restrict query to all process instances that are sub process instances of the given case instance. Takes a case instance id.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Filter by the process definition the instances run on.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Filter by the key of the process definition the instances run on.</td>
  </tr>
  <tr>
    <td>processDefinitionKeyIn</td>
    <td>Filter by a list of process definition keys. A process instance must have one of the given process definition keys. Must be a JSON array of Strings.</td>
  </tr>
  <tr>
    <td>processDefinitionKeyNotIn</td>
    <td>Exclude instances that belong to a set of process definitions. Must be a JSON array of Strings.</td>
  </tr>
  <tr>
    <td>processDefinitionName</td>
    <td>Filter by the name of the process definition the instances run on.</td>
  </tr>
  <tr>
    <td>processDefinitionNameLike</td>
    <td>Filter by process definition names that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>finished</td>
    <td>Only include finished process instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>unfinished</td>
    <td>Only include unfinished process instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>incidentType</td>
    <td>Filter by the incident type. See the <a href="{{< ref "/user-guide/process-engine/incidents.md#incident-types" >}}">User Guide</a> for a list of incident types.</td>
  </tr>
  <tr>
    <td>withIncidents</td>
    <td>Only include process instances which have an incident. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>withRootIncidents</td>
    <td>Only include process instances which have a root incident. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>incidentStatus</td>
	<td>Only include process instances which have an incident in status either <code>open</code> or <code>resolved</code>.
	To get all process instances, use the query parameter <code>withIncidents</code>.</td>
  </tr>
  <tr>
    <td>incidentMessage</td>
    <td>Filter by the incident message. Exact match.</td>
  </tr>
  <tr>
    <td>incidentMessageLike</td>
    <td>Filter by the incident message that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>startedBy</td>
    <td>Only include process instances that were started by the given user.</td>
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
    <td>Filter by a list of tenant ids. A process instance must have one of the given tenant ids. Must be a JSON array of Strings.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include historic process instances which belong to no tenant. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>variables</td>
    <td>A JSON array to only include process instances that have/had variables with certain values. <br/>
    The array consists of objects with the three properties <code>name</code>, <code>operator</code> and <code>value</code>.
    <code>name (String)</code> is the variable name, <code>operator (String)</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <code>value</code> may be <code>String</code>, <code>Number</code> or <code>Boolean</code>.
    <br/>
    Valid operator values are: <code>eq</code> - equal to; <code>neq</code> - not equal to; <code>gt</code> - greater than;
    <code>gteq</code> - greater than or equal to; <code>lt</code> - lower than; <code>lteq</code> - lower than or equal to;
    <code>like</code>.<br/>
    </td>
  </tr>
  <tr>
    <td>variableNamesIgnoreCase</td>
    <td>Match all variable names provided in <code>variables</code> case-insensitively. If set to <code>true</code> <strong>variableName</strong> and <strong>variablename</strong> are treated as equal.</td>
  </tr>
  <tr>
    <td>variableValuesIgnoreCase</td>
    <td>Match all variable values provided in <code>variables</code> case-insensitively. If set to <code>true</code> <strong>variableValue</strong> and <strong>variablevalue</strong> are treated as equal.</td>
  </tr>
  <tr>
    <td>executedActivityBefore</td>
    <td>Restrict to instances that executed an activity before the given date (inclusive). By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>executedActivityAfter</td>
    <td>Restrict to instances that executed an activity after the given date (inclusive). By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>executedActivityIdIn</td>
    <td>Restrict to instances that executed an activity with one of given ids.</td>
  </tr>
  <tr>
    <td>activeActivityIdIn</td>
    <td>Restrict to instances that have an active activity with one of given ids.</td>
  </tr>
  <tr>
    <td>executedJobBefore</td>
    <td>Restrict to instances that executed an job before the given date (inclusive). By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>executedJobAfter</td>
    <td>Restrict to instances that executed an job after the given date (inclusive). By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Restrict to instances that are active</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Restrict to instances that are suspended</td>
  </tr>
  <tr>
    <td>completed</td>
    <td>Restrict to instances that are completed</td>
  </tr>
  <tr>
    <td>externallyTerminated</td>
    <td>Restrict to instances that are externally terminated</td>
  </tr>
  <tr>
    <td>internallyTerminated</td>
    <td>Restrict to instances that are internally terminated</td>
  </tr>
  <tr>
    <td>orQueries</td>
    <td>
    A JSON array of nested historic process instance queries with OR semantics. A process instance matches a nested query if it fulfills <i>at least one</i> of the query's predicates. With multiple nested queries, a process instance must fulfill at least one predicate of <i>each</i> query (<a href="https://en.wikipedia.org/wiki/Conjunctive_normal_form">Conjunctive Normal Form</a>).<br><br>

    All process instance query properties can be used except for: <code>sorting</code><br><br>

    See the <a href="{{< ref "/user-guide/process-engine/process-engine-api.md#or-queries" >}}">user guide</a>
    for more information about OR queries.
    </td>
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
    <td>The number of matching historic process instances.</td>
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

POST `/history/process-instance/count`

Request Body:

```json
{
  "finishedAfter": "2013-01-01T00:00:00.000+0200",
  "finishedBefore": "2013-04-01T23:59:59.000+0200",
  "executedActivityAfter": "2013-03-23T13:42:44.000+0200",
  "variables": [
    {
      "name": "myVariable",
      "operator": "eq",
      "value": "camunda"
    },
    {
      "name": "mySecondVariable",
      "operator": "neq",
      "value": 124
    }
  ]
}
```

## Response

```json
{
  "count": 1
}
```
