---

title: "Get Single Case Instance"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-case-instance-get"
    parent: "rest-api-case-instance"
    pre: "GET `/case-instance/{id}`"

---


Retrieves a single case instance according to the `CaseInstance` interface in the engine.


# Method

GET `/case-instance/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the case instance to be retrieved.</td>
  </tr>
</table>


# Result

A JSON object corresponding to the CaseInstance interface in the engine.
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
    <td>The id of the case instance.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>String</td>
    <td>The id of the case definition this instance belongs to.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>String</td>
    <td>The business key of the case instance.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case instance is active or not.
    </td>
  </tr>
  <tr>
    <td>completed</td>
    <td>Boolean</td>
    <td>
      A flag indicating whether the case instance is completed or not.
    </td>
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
    <td>Case instance with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/case-instance/aCaseInstanceId`

## Response

    {
      "id"               : "aCaseInstanceId",
      "caseDefinitionId" : "aCaseDefId",
      "businessKey"      : "aKey",
      "active"           : true,
      "completed"        : false
    }
