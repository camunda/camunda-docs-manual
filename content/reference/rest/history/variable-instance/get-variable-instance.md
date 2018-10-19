---

title: "Get Variable Instance"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-history-get-variable-instance"
    parent: "rest-api-history-variable-instance"
    pre: "GET `/history/variable-instance/{id}`"

---


Retrieves a historic variable by id.


# Method

GET `/history/variable-instance/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the variable instance.</td>
  </tr>
</table>

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deserializeValue</td>
    <td>
      {{< rest-var-query-param-deserialize-object-value >}}
    </td>
  </tr>
</table>


# Result

A user object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the variable instance.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the variable instance.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>{{< rest-var-response-type >}}</td>
  </tr>
  <tr>
    <td>value</td>
    <td>String/Number/Boolean/Object</td>
    <td>{{< rest-var-response deserializationParameter="deserializeValue" >}}</td>
  </tr>
  <tr>
    <td>valueInfo</td>
    <td>Object</td>
    <td>{{< rest-var-response-valueinfo >}}</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>String</td>
    <td>The key of the process definition the variable instance belongs to.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition the variable instance belongs to.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id the process instance belongs to.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>String</td>
    <td>The execution id the variable instance belongs to.</td>
  </tr>
  <tr>
    <td>activityInstanceId</td>
    <td>String</td>
    <td>The id of the activity instance in which the variable is valid.</td>
  </tr>
  <tr>
    <td>caseDefinitionKey</td>
    <td>String</td>
    <td>The key of the case definition the variable instance belongs to.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>String</td>
    <td>The id of the case definition the variable instance belongs to.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>String</td>
    <td>The case instance id the variable instance belongs to.</td>
  </tr>
  <tr>
    <td>caseExecutionId</td>
    <td>String</td>
    <td>The case execution id the variable instance belongs to.</td>
  </tr>
  <tr>
    <td>taskId</td>
    <td>String</td>
    <td>The id of the task the variable instance belongs to.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The id of the tenant that this variable instance belongs to.</td>
  </tr>
  <tr>
    <td>errorMessage</td>
    <td>String</td>
    <td>An error message in case a Java Serialized Object could not be de-serialized.</td>
  </tr>
   <tr>
    <td>state</td>
    <td>String</td>
    <td>The current state of the variable. Can be 'CREATED' or 'DELETED'.</td>
  </tr>
  <tr>
    <td>createTime</td>
    <td>String</td>
    <td>The time the variable was inserted. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>removalTime</td>
    <td>String</td>
    <td>The time after which the variable should be removed by the History Cleanup job. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>rootProcessInstanceId</td>
    <td>String</td>
    <td>The process instance id of the root process instance that initiated the process containing this variable.</td>
  </tr>
</table>

\* For further information, please see the <a href="{{< relref "reference/rest/overview/date-format.md" >}}"> documentation</a>.


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
    <td>Variable with given id does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/history/variable-instance/someId`

## Response

Status 200.

```json
{
  "id": "someId",
  "name": "amount",
  "type": "Integer",
  "variableType": "integer",
  "value": 5,
  "valueInfo": {},
  "processDefinitionKey": "aProcessDefinitionKey",
  "processDefinitionId": "aProcessDefinitionId",
  "processInstanceId": "aProcessInstanceId",
  "executionId": "aExecutionId",
  "activityInstanceId": "Task_1:b68b71ca-e310-11e2-beb0-f0def1557726",
  "caseDefinitionKey": null,
  "caseInstanceId": null,
  "caseExecutionId": null,
  "taskId": null,
  "tenantId": null,
  "errorMessage": null,
  "state": "CREATED",
  "createTime":"2017-02-10T14:33:19.000+0200",
  "removalTime": "2018-02-10T14:33:19.000+0200",
  "rootProcessInstanceId": "aRootProcessInstanceId"
}
```
