---

title: "Get Case Executions Count (POST)"
weight: 50

menu:
  main:
    name: "Get Count (Post)"
    identifier: "rest-api-case-execution-post-query-count"
    parent: "rest-api-case-execution"
    pre: "POST `/case-instance/count`"

---


Query for the number of case executions that fulfill the given parameters.
This method takes the same message body as the [POST query]({{< ref "/reference/rest/case-execution/post-query.md" >}})
and therefore it is slightly more powerful than the [GET query count]({{< ref "/reference/rest/case-execution/get-query-count.md" >}}).


# Method

POST `/case-instance/count`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>caseExecutionId</td>
    <td>Filter by a case execution id.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>Filter by a case instance id.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>Filter by the business key of the case instances the case executions belong to.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>Filter by the case definition the case executions run on.</td>
  </tr>
  <tr>
    <td>caseDefinitionKey</td>
    <td>Filter by the key of the case definition the case executions run on.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>Filter by the id of the activity the case execution currently executes.</td>
  </tr>
  <tr>
    <td>required</td>
    <td>Only include required case executions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>repeatable</td>
    <td>Only include repeatable case executions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>repetition</td>
    <td>Only include case executions which are repetitions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Only include active case executions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>enabled</td>
    <td>Only include enabled case executions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a list of tenant ids. A case execution must have one of the given tenant ids. Must be a JSON array of Strings.</td>
  </tr>
  <tr>
    <td>variables</td>
    <td>A JSON array to only include case instances that have variables with certain values. <br/>
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
    <td>caseInstanceVariables</td>
    <td>A JSON array to only include case executions that belong to a case instance with variables with certain values.<br/>
    The array consists of objects with the three properties <code>name</code>, <code>operator</code> and <code>value</code>.
    <code>name (String)</code> is the variable name, <code>operator (String)</code> is the comparison operator to be used and <code>value</code> the variable value.<br/>
    <code>value</code> may be <code>String</code>, <code>Number</code> or <code>Boolean</code>.
    <br/>
    Valid operator values are: <code>eq</code> - equal to; <code>neq</code> - not equal to; <code>gt</code> - greater than;
    <code>gteq</code> - greater than or equal to; <code>lt</code> - lower than; <code>lteq</code> - lower than or equal to;
    <code>like</code>.<br/>
    </td>
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
    <td>The number of matching case executions.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if an invalid operator for variable comparison is used. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/case-execution/count`

Request Body:

    {
      "variables":
        [
          {
            "name" : "myVariable",
            "operator" : "eq",
            "value" : "camunda"
          },
          {
            "name" : "mySecondVariable",
            "operator" : "neq",
            "value" : 124
          }
        ],
      "caseDefinitionId" : "aCaseDefinitionId"
    }

## Response

    {
      "count" : 1
    }
