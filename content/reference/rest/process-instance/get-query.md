---

title: 'Get Instances'
weight: 50

menu:
  main:
    name: "Get List"
    identifier: "rest-api-process-instance-get-query"
    parent: "rest-api-process-instance"
    pre: "GET `/process-instance`"

---



Queries for process instances that fulfill given parameters.
Parameters may be static as well as dynamic runtime properties of process instances.
The size of the result set can be retrieved by using the [Get Instance Count]({{< ref "/reference/rest/process-instance/get-query-count.md" >}}) method.


# Method

GET `/process-instance`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processInstanceIds</td>
    <td>Filter by a comma-separated list of process instance ids.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>Filter by process instance business key.</td>
  </tr>
  <tr>
    <td>businessKeyLike</td>
    <td>Filter by process instance business key that the parameter is a substring of.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>Filter by case instance id.</td>
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
    <td>Filter by a comma-separated list of process definition keys. A process instance must have one of the given process definition keys.</td>
  </tr>
  <tr>
    <td>processDefinitionKeyNotIn</td>
    <td>Exclude instances by a comma-separated list of process definition keys. A process instance must not have one of the given process definition keys.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>Filter by the deployment the id belongs to.</td>
  </tr>
  <tr>
    <td>superProcessInstance</td>
    <td>Restrict query to all process instances that are sub process instances of the given process instance. Takes a process instance id.</td>
  </tr>
  <tr>
    <td>subProcessInstance</td>
    <td>Restrict query to all process instances that have the given process instance as a sub process instance. Takes a process instance id.</td>
  </tr>
  <tr>
    <td>superCaseInstance</td>
    <td>Restrict query to all process instances that are sub process instances of the given case instance. Takes a case instance id.</td>
  </tr>
  <tr>
    <td>subCaseInstance</td>
    <td>Restrict query to all process instances that have the given case instance as a sub case instance. Takes a case instance id.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Only include active process instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Only include suspended process instances. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>withIncident</td>
    <td>Filter by presence of incidents. Selects only process instances that have an incident.</td>
  </tr>
  <tr>
    <td>incidentId</td>
    <td>Filter by the incident id.</td>
  </tr>
  <tr>
    <td>incidentType</td>
    <td>Filter by the incident type. See the <a href="{{< ref "/user-guide/process-engine/incidents.md#incident-types" >}}">User Guide</a> for a list of incident types.</td>
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
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. A process instance must have one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include process instances which belong to no tenant. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>activityIdIn</td>
    <td>Filter by a comma-separated list of activity ids. A process instance must currently wait in a leaf activity with one of the given activity ids.</td>
  </tr>
  <tr>
    <td>rootProcessInstances</td>
    <td>Restrict the query to all process instances that are top level process instances.</td>
  </tr>
  <tr>
    <td>leafProcessInstances</td>
    <td>Restrict the query to all process instances that are leaf instances. (i.e. don't have any sub instances)</td>
  </tr>
  <tr>
    <td>processDefinitionWithoutTenantId</td>
    <td>Only include process instances which process definition has no tenant id.</td>
  </tr>
  <tr>
    <td>variables</td>
    <td>Only include process instances that have variables with certain values.
    Variable filtering expressions are comma-separated and are structured as follows:<br/>
    A valid parameter value has the form <code>key_operator_value</code>.
    <code>key</code> is the variable name, <code>operator</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <strong>Note:</strong> Values are always treated as <code>String</code> objects on server side.<br/>
    <br/>
    Valid operator values are: <code>eq</code> - equal to; <code>neq</code> - not equal to; <code>gt</code> - greater than;
    <code>gteq</code> - greater than or equal to; <code>lt</code> - lower than; <code>lteq</code> - lower than or equal to;
    <code>like</code>.<br/>
    <code>key</code> and <code>value</code> may not contain underscore or comma characters.
    </td>
  </tr>
  <tr>
    <td>variableNamesIgnoreCase</td>
    <td>Match all variable names in this query case-insensitively. If set to <code>true</code> <strong>variableName</strong> and <strong>variablename</strong> are treated as equal.</td>
  </tr>
  <tr>
    <td>variableValuesIgnoreCase</td>
    <td>Match all variable values in this query case-insensitively. If set to <code>true</code> <strong>variableValue</strong> and <strong>variablevalue</strong> are treated as equal.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>instanceId</code>, <code>definitionKey</code>, <code>definitionId</code>, <code>tenantId</code> and <code>businessKey</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
  </tr>
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.</td>
  </tr>
</table>


# Result

A JSON array of process instance objects.
Each process instance object has the following properties:

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
    <td>definitionId</td>
    <td>String</td>
    <td>The id of the process definition that this process instance belongs to.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>String</td>
    <td>The business key of the process instance.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>String</td>
    <td>The id of the case instance associated with the process instance.</td>
  </tr>
  <tr>
    <td>ended</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the process instance has ended or not.
      <em>Deprecated: will always be false!</em>
    </td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Boolean</td>
    <td>A flag indicating whether the process instance is suspended or not.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the process instance.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>, or if an invalid operator for variable comparison is used. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/process-instance?variables=myVariable_eq_camunda,mySecondVariable_neq_aBadValue`

## Response

    [{"links":[],
     "id":"anId",
     "definitionId":"aProcDefId",
     "businessKey":"aKey",
     "caseInstanceId":"aCaseInstanceId",
     "ended":false,
     "suspended":false,
     "tenantId":null}]
