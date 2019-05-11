---

title: "Get Case Executions (POST)"
weight: 40

menu:
  main:
    name: "Get List (POST)"
    identifier: "rest-api-case-execution-post-query"
    parent: "rest-api-case-execution"
    pre: "POST `/case-execution`"

---


Queries for case executions that fulfill given parameters through a JSON object.
This method is slightly more powerful than the [Get Case Executions]({{< ref "/reference/rest/case-execution/get-query.md" >}}) method because it allows
filtering by multiple case variables of types `String`, `Number` or `Boolean`.


# Method

POST `/case-execution`


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
    <td>disabled</td>
    <td>Only include disabled case executions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
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
          <td><b>Mandatory.</b> Sort the results lexicographically by a given criterion. Valid values are <code>caseExecutionId</code>, <code>caseDefinitionKey</code>, <code>caseDefinitionId</code> and <code>tenantId</code>.</td>
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

A JSON array of case execution objects.
Each case execution object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the case execution.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>String</td>
    <td>The id of the case instance this case execution belongs to.</td>
  </tr>
  <tr>
    <td>parentId</td>
    <td>String</td>
    <td>The id of the parent of this case execution belongs to.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>String</td>
    <td>The id of the case definition this case execution belongs to.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>String</td>
    <td>The id of the activity this case execution belongs to.</td>
  </tr>
  <tr>
    <td>activityName</td>
    <td>String</td>
    <td>The name of the activity this case execution belongs to.</td>
  </tr>
  <tr>
    <td>activityType</td>
    <td>String</td>
    <td>The type of the activity this case execution belongs to.</td>
  </tr>
  <tr>
    <td>activityDescription</td>
    <td>String</td>
    <td>The description of the activity this case execution belongs to.</td>
  </tr>
  <tr>
    <td>required</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case execution is required or not.
    </td>
  </tr>
  <tr>
    <td>repeatable</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case execution is repeatable or not.
    </td>
  </tr>
  <tr>
    <td>repetition</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case execution is a repetition or not.
    </td>
  </tr>
  <tr>
    <td>active</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case execution is active or not.
    </td>
  </tr>
  <tr>
    <td>enabled</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case execution is enabled or not.
    </td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case execution is disabled or not.
    </td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the case execution.</td>
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

POST `/case-execution`

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
      "caseDefinitionId" : "aCaseDefinitionId",
      "sorting":
        [
          {
            "sortBy": "caseDefinitionKey",
            "sortOrder": "asc"
          },
          {
            "sortBy": "caseExecutionId",
            "sortOrder": "asc"
          }
        ]
    }

## Response

    [
      {
        "links" : [],
        "id"               : "aCaseExecutionId",
        "caseInstanceId"   : "aCaseInstId",
        "required"         : false,
        "repeatable"       : true,
        "repetition"       : false,
        "active"           : true,
        "enabled"          : false,
        "disabled"         : false,
        "tenantId"         : null
      }
    ]
