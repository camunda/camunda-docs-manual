---

title: "Get Process Instances (POST)"
weight: 40

menu:
  main:
    name: "Get List (POST)"
    identifier: "rest-api-history-post-process-instance-query"
    parent: "rest-api-history-process-instance"
    pre: "POST `/history/process-instance`"

---


Queries for historic process instances that fulfill the given parameters.
This method is slightly more powerful than the [Get Process Instances]({{< ref "/reference/rest/history/process-instance/get-process-instance-query.md" >}}) method because it allows filtering by multiple process variables of types `String`, `Number` or `Boolean`.


# Method

POST `/history/process-instance`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.</td>
  </tr>
</table>


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
    <td>Filter by process instance ids. Must be a JSON array process instance ids.</td>
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
    <td>Exclude instances that belong to a set of process definitions. Must be a JSON array of process definition keys.</td>
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
    <td>withIncidents</td>
    <td>Only include process instances which have an incident. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>withRootIncidents</td>
    <td>Only include process instances which have a root incident. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
    <tr>
      <td>incidentType</td>
      <td>Filter by the incident type. See the <a href="{{< ref "/user-guide/process-engine/incidents.md#incident-types" >}}">User Guide</a> for a list of incident types.</td>
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
    <td>sorting</td>
    <td>
        A JSON array of criteria to sort the result by. Each element of the array is a JSON object that specifies one ordering. The position in the array identifies the rank of an ordering, i.e., whether it is primary, secondary, etc. The ordering objects have the following properties:
      <table class="table table-striped">
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>sortBy</td>
          <td><b>Mandatory.</b> Sort the results lexicographically by a given criterion. Valid values are
          <code>instanceId</code>, <code>definitionId</code>, <code>definitionKey</code>, <code>definitionName</code>, <code>definitionVersion</code>,
          <code>businessKey</code>, <code>startTime</code>, <code>endTime</code>, <code>duration</code> and <code>tenantId</code>.</td>
        </tr>
        <tr>
          <td>sortOrder</td>
          <td><b>Mandatory.</b> Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
        </tr>
      </table>
    </td>
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

A JSON array of historic process instance objects.
Each historic process instance object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the process instance.</td>
  </tr>
  <tr>
    <td>rootProcessInstanceId</td>
    <td>String</td>
    <td>The process instance id of the root process instance that initiated the process.</td>
  </tr>
  <tr>
    <td>superProcessInstanceId</td>
    <td>String</td>
    <td>The id of the parent process instance, if it exists.</td>
  </tr>
  <tr>
    <td>superCaseInstanceId</td>
    <td>String</td>
    <td>The id of the parent case instance, if it exists.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>String</td>
    <td>The id of the parent case instance, if it exists.</td>
  </tr>
  <tr>
    <td>processDefinitionName</td>
    <td>String</td>
    <td>The name of the process definition that this process instance belongs to.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>String</td>
    <td>The key of the process definition that this process instance belongs to.</td>
  </tr>
  <tr>
    <td>processDefinitionVersion</td>
    <td>Integer</td>
    <td>The version of the process definition that this process instance belongs to.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition that this process instance belongs to.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>String</td>
    <td>The business key of the process instance.</td>
  </tr>
  <tr>
    <td>startTime</td>
    <td>String</td>
    <td>The time the instance was started. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>endTime</td>
    <td>String</td>
    <td>The time the instance ended. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>removalTime</td>
    <td>String</td>
    <td>The time after which the instance should be removed by the History Cleanup job. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>durationInMillis</td>
    <td>Number</td>
    <td>The time the instance took to finish (in milliseconds).</td>
  </tr>
  <tr>
    <td>startUserId</td>
    <td>String</td>
    <td>The id of the user who started the process instance.</td>
  </tr>
  <tr>
    <td>startActivityId</td>
    <td>String</td>
    <td>The id of the initial activity that was executed (e.g., a start event).</td>
  </tr>
  <tr>
    <td>deleteReason</td>
    <td>String</td>
    <td>The provided delete reason in case the process instance was canceled during execution.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the process instance.</td>
  </tr>
  <tr>
    <td>state</td>
    <td>String</td>
    <td>
        last state of the process instance, possible values are:
        <ul style="list-style: none;">
                <li>ACTIVE - running process instance</li>
                <li>SUSPENDED - suspended process instances</li>
                <li>COMPLETED - completed through normal end event</li>
                <li>EXTERNALLY_TERMINATED - terminated externally, for instance through REST API</li>
                <li>INTERNALLY_TERMINATED - terminated internally, for instance by terminating boundary event</li>
        </ul>
    </td>
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

POST `/history/process-instance`

Request Body:

```json
{
  "finishedAfter": "2013-01-01T00:00:00.000+0200",
  "finishedBefore": "2013-04-01T23:59:59.000+0200",
  "executedActivityAfter": "2013-03-23T13:42:44",
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
  ],
  "sorting":[
    {
      "sortBy": "businessKey",
      "sortOrder": "asc"
    },
    {
      "sortBy": "startTime",
      "sortOrder": "desc"
    }
  ]
}
```

## Response

```json
[
  {
    "id":"7c80cc8f-ef95-11e6-b6e6-34f39ab71d4e",
    "businessKey":null,
    "processDefinitionId":"invoice:1:7bf79f13-ef95-11e6-b6e6-34f39ab71d4e",
    "processDefinitionKey":"invoice",
    "processDefinitionName":"Invoice Receipt",
    "processDefinitionVersion":1,
    "startTime":"2017-02-10T14:33:19.000+0200",
    "endTime":null,
    "removalTime": null,
    "durationInMillis":null,
    "startUserId":null,
    "startActivityId":"StartEvent_1",
    "deleteReason":null,
    "rootProcessInstanceId": "f8259e5d-ab9d-11e8-8449-e4a7a094a9d6",
    "superProcessInstanceId":null,
    "superCaseInstanceId":null,
    "caseInstanceId":null,
    "tenantId":null,
    "state":"ACTIVE"
  }
]
```
