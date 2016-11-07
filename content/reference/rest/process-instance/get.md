---

title: 'Get Instance'
weight: 90

menu:
  main:
    name: "Get"
    identifier: "rest-api-process-instance-get"
    parent: "rest-api-process-instance"
    pre: "GET `/process-instance/{id}`"

---


Retrieves a process instance by id, according to the `ProcessInstance` interface in the engine.


# Method

GET `/process-instance/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process instance to be retrieved.</td>
  </tr>
</table>


# Result

A JSON object corresponding to the `ProcessInstance` interface in the engine.
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
    <td>The id of the process instance.</td>
  </tr>
  <tr>
    <td>definitionId</td>
    <td>String</td>
    <td>The id of the process definition this instance belongs to.</td>
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
    <td>404</td>
    <td>application/json</td>
    <td>Process instance with given id does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/process-instance/aProcessInstanceId`

## Response

    {"id":"aProcessInstanceId",
    "definitionId":"aProcDefId",
    "businessKey":"aKey",
    "caseInstanceId":"aCaseInstanceId",
    "ended":false,
    "suspended":false,
    "tenantId":null}
