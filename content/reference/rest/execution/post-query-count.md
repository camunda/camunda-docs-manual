---

title: "Get Execution Count (POST)"
weight: 50

menu:
  main:
    name: "Get List Count (POST)"
    identifier: "rest-api-execution-post-query-count"
    parent: "rest-api-execution"
    pre: "POST `/execution/count`"

---


Queries for the number of executions that fulfill given parameters. This method takes the same message body as the [Get Executions (POST)]({{< ref "/reference/rest/execution/post-query.md" >}}) method and therefore it is slightly more powerful than the [Get Execution Count]({{< ref "/reference/rest/execution/get-query-count.md" >}}) method.


# Method

POST `/execution/count`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>Filter by the business key of the process instances the executions belong to.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Filter by the process definition the executions run on.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Filter by the key of the process definition the executions run on.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by the id of the process instance the execution belongs to.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>Filter by the id of the activity the execution currently executes.</td>
  </tr>
  <tr>
    <td>signalEventSubscriptionName</td>
    <td>Select only those executions that expect a signal of the given name.</td>
  </tr>
  <tr>
    <td>messageEventSubscriptionName</td>
    <td>Select only those executions that expect a message of the given name.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Only include active executions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Only include suspended executions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
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
    <td>Filter by a list of tenant ids. An execution must have one of the given tenant ids. Must be a JSON array of Strings.</td>
  </tr>
  <tr>
    <td>variables</td>
    <td>A JSON array to only include executions that have variables with certain values. <br/>
    The array consists of objects with the three properties <code>name</code>, <code>operator</code> and <code>value</code>.
    <code>name (String)</code> is the variable name, <code>operator (String)</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <code>value</code> may be <code>String</code>, <code>Number</code> or <code>Boolean</code>.
    <br/>
    Valid operator values are: <code>eq</code> - equal to; <code>neq</code> - not equal to; <code>gt</code> - greater than;
    <code>gteq</code> - greater than or equal to; <code>lt</code> - lower than; <code>lteq</code> - lower than or equal to;
    <code>like</code>.
    </td>
  </tr>
  <tr>
    <td>processVariables</td>
    <td>A JSON array to only include executions that belong to a process instance with variables with certain values. <br/>
    The array consists of objects with the three properties <code>name</code>, <code>operator</code> and <code>value</code>.
    <code>name (String)</code> is the variable name, <code>operator (String)</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <code>value</code> may be <code>String</code>, <code>Number</code> or <code>Boolean</code>.
    <br/>
    <strong>Note:</strong> Values are always treated as <code>String</code> objects on server side.<br/>
    <br/>
    Valid operator values are: <code>eq</code> - equal to; <code>neq</code> - not equal to.
    </td>
  </tr>
  <tr>
    <td>variableNamesIgnoreCase</td>
    <td>Match all variable names provided in <code>variables</code> and <code>processVariables</code> case-insensitively. If set to <code>true</code> <strong>variableName</strong> and <strong>variablename</strong> are treated as equal.</td>
  </tr>
  <tr>
    <td>variableValuesIgnoreCase</td>
    <td>Match all variable values provided in <code>variables</code> and <code>processVariables</code> case-insensitively. If set to <code>true</code> <strong>variableValue</strong> and <strong>variablevalue</strong> are treated as equal.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>, or if an invalid operator for variable comparison is used. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/execution/count`

Request Body:

    {"variables":
        [{"name": "myVariable",
         "operator": "eq",
         "value": "camunda"
        },
        {"name": "mySecondVariable",
         "operator": "neq",
         "value": 124}],
    "processDefinitionId":"aProcessDefinitionId"}

## Response

    {"count": 1}
