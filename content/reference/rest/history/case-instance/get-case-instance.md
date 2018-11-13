---

title: "Get Single Case Instance"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-history-get-case-instance"
    parent: "rest-api-history-case-instance"
    pre: "GET `/history/case-instance/{id}`"

---


Retrieves a single historic case instance according to the `HistoricCaseInstance` interface in the engine.


# Method

GET `/history/case-instance/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the historic case instance to be retrieved.</td>
  </tr>
</table>


# Result

A JSON object corresponding to the `HistoricCaseInstance` interface in the engine.
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
    <td>businessKey</td>
    <td>String</td>
    <td>The business key of the case instance.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>String</td>
    <td>The id of the case definition that this case instance belongs to.</td>
  </tr>
  <tr>
    <td>createTime</td>
    <td>String</td>
    <td>The time the instance was created. Has the format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
  </tr>
  <tr>
    <td>closeTime</td>
    <td>String</td>
    <td>The time the instance was closed. Has the format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
  </tr>
  <tr>
    <td>durationInMillis</td>
    <td>Number</td>
    <td>The time the instance took to finish (in milliseconds).</td>
  </tr>
  <tr>
    <td>createUserId</td>
    <td>String</td>
    <td>The id of the user who created the case instance.</td>
  </tr>
  <tr>
    <td>superCaseInstanceId</td>
    <td>String</td>
    <td>The id of the parent case instance, if it exists.</td>
  </tr>
  <tr>
    <td>superProcessInstanceId</td>
    <td>String</td>
    <td>The id of the parent parent instance, if it exists.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Boolean</td>
    <td>If true, this case instance is active.</td>
  </tr>
  <tr>
    <td>completed</td>
    <td>Boolean</td>
    <td>If true, this case instance is completed.</td>
  </tr>
  <tr>
    <td>terminated</td>
    <td>Boolean</td>
    <td>If true, this case instance is terminated.</td>
  </tr>
  <tr>
    <td>failed</td>
    <td>Boolean</td>
    <td>If true, this case instance is failed.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Boolean</td>
    <td>If true, this case instance is suspended.</td>
  </tr>
  <tr>
    <td>closed</td>
    <td>Boolean</td>
    <td>If true, this case instance is closed.</td>
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
    <td>Historic case instance with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/history/case-instance/aCaseInstId`

## Response

```json
{
  "id": "aCaseInstId",
  "businessKey": "aKey",
  "caseDefinitionId": "aCaseDefId",
  "createTime": "2013-03-23T13:42:43",
  "closeTime": "2013-03-23T13:42:45",
  "durationInMillis": 2000,
  "createUserId": "aStartUserId",
  "superCaseInstanceId": "aSuperCaseInstanceId",
  "superProcessInstanceId": null,
  "active": true,
  "completed": false,
  "terminated": false,
  "failed": false,
  "suspended": false,
  "closed": false
}
```
