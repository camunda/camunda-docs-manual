---

title: "Get Single Case Execution"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-case-execution-get"
    parent: "rest-api-case-execution"
    pre: "GET `/case-execution/{id}`"

---


Retrieves a single case execution according to the `CaseExecution` interface in the engine.


# Method

GET `/case-execution/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the case execution to be retrieved.</td>
  </tr>
</table>


# Result

A JSON object corresponding to the CaseExecution interface in the engine.
Its properties are as follows:

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
    <td>404</td>
    <td>application/json</td>
    <td>Case execution with given id does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

GET `/case-execution/aCaseExecutionId`

## Response

    {
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
