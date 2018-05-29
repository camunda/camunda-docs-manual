---

title: "Get Executions (POST)"
weight: 40

menu:
  main:
    name: "Get (POST)"
    identifier: "rest-api-execution-post-query"
    parent: "rest-api-execution"
    pre: "POST `/execution`"

---


Queries for executions that fulfill given parameters through a JSON object.
This method is slightly more powerful than the [Get Executions]({{< relref "reference/rest/execution/get-query.md" >}}) method because it allows
to filter by multiple instance and execution variables of types `String`, `Number` or `Boolean`.


# Method

POST `/execution`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
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
    <td>Filter by the incident type. See the <a href="{{< relref "user-guide/process-engine/incidents.md#incident-types" >}}">User Guide</a> for a list of incident types.</td>
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
    Valid operator values are: <code>eq</code> - equal to; <code>neq</code> - not equal to.
    </td>
  </tr>
  <tr>
    <td>sorting</td>
    <td>
      <p>
        A JSON array of criteria to sort the result by. Each element of the array is a JSON object that specifies one ordering. The position in the array identifies the rank of an ordering, i.e., whether it is primary, secondary, etc. The ordering objects have the following properties:
      </p>
      <table class="table table-striped">
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>sortBy</td>
          <td><b>Mandatory.</b> Sort the results lexicographically by a given criterion. Valid values are <code>instanceId</code>, <code>definitionKey</code>, <code>definitionId</code> and <code>tenantId</code>.</td>
        </tr>
        <tr>
          <td>sortOrder</td>
          <td><b>Mandatory.</b> Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
        </tr>
      </table>
    </td>
  </tr>
</table>


# Result

A JSON array of execution objects.
Each execution object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the execution.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance that this execution instance belongs to.</td>
  </tr>
  <tr>
    <td>ended</td>
    <td>Boolean</td>
    <td>A flag indicating whether the execution has ended or not.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the execution.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>, or if an invalid operator for variable comparison is used. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/execution`

Request Body:

    {"variables":
        [{"name": "myVariable",
         "operator": "eq",
         "value": "camunda"
        },
        {"name": "mySecondVariable",
         "operator": "neq",
         "value": 124}],
    "processDefinitionId":"aProcessDefinitionId",
    "sorting":
        [{"sortBy": "definitionKey",
        "sortOrder": "asc"
        },
        {"sortBy": "instanceId",
        "sortOrder": "desc"
        }]
    }

## Response

Status 200.

    [{"id":"anId",
     "processInstanceId":"aProcInstId",
     "ended":false,
     "tenantId":null}]
