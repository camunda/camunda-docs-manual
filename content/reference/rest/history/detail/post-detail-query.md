---

title: "Get Historic Details (POST)"
weight: 10

menu:
  main:
    name: "Get List (POST)"
    identifier: "rest-api-history-post-detail-query"
    parent: "rest-api-history-detail"
    pre: "POST `/history/detail`"

---


Queries for historic details that fulfill the given parameters.
This method is slightly more powerful than the [Get Historic Details]({{< ref "/reference/rest/history/detail/get-detail-query.md" >}}) method because it allows
sorting by multiple parameters.
The size of the result set can be retrieved by using the [Get Historic Detail Count]({{< ref "/reference/rest/history/detail/get-detail-query-count.md" >}}) method.


# Method

POST `/history/detail`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.</td>
  </tr>
  <tr>
    <td>deserializeValues</td>
    <td>
      {{< rest-var-query-param-deserialize-object-value >}}
    </td>
  </tr>
</table>

## Request

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by process instance id.</td>
  </tr>
  <tr>
    <td>processInstanceIdIn</td>
    <td>Only include historic details which belong to one of the passed process instance ids.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>Filter by execution id.</td>
  </tr>
  <tr>
    <td>activityInstanceId</td>
    <td>Filter by activity instance id.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>Filter by case instance id.</td>
  </tr>
  <tr>
    <td>caseExecutionId</td>
    <td>Filter by case execution id.</td>
  </tr>
  <tr>
    <td>variableInstanceId</td>
    <td>Filter by variable instance id.</td>
  </tr>
  <tr>
    <td>variableTypeIn</td>
    <td>Only include historic details where the variable updates belong to one of the passed and comma-separated variable types. A list of all supported variable types can be found <a href="{{< ref "/user-guide/process-engine/variables.md#supported-variable-values" >}}">here</a>. <b>Note:</b> All non-primitive variables are assoziated with the type "serializable".</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids.</td>
  </tr>
  <tr>
    <td>userOperationId</td>
    <td>Filter by a user operation id</td>
  </tr>
  <tr>
    <td>formFields</td>
    <td>Only include <strong>HistoricFormFields</strong>. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>variableUpdates</td>
    <td>Only include <strong>HistoricVariableUpdates</strong>. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>excludeTaskDetails</td>
    <td>Excludes all task-related <strong>HistoricDetails</strong>, so only items which have no task id set will be selected. When this parameter is used together with <code>taskId</code>, this call is ignored and task details are <strong>not</strong> excluded. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>occurredBefore</td>
    <td>Restrict to historic details that occured before the given date (including the date). By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>occurredAfter</td>
    <td>Restrict to historic details that occured after the given date (including the date). By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
  <tr>
    <td>sorting</td>
    <td>
        A JSON array of criteria to sort the result by. Each element of the array is a JSON object that specifies one ordering. The position in the array identifies the rank of an ordering, i.e., whether it is primary, secondary, etc. The ordering objects have the following properties:
      <table class="table table-striped">
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>sortBy</td>
          <td><b>Mandatory.</b> Sort the results lexicographically by a given criterion. Valid values are <code>processInstanceId</code>, <code>variableName</code>, <code>variableType</code>, <code>variableRevision</code>, <code>formPropertyId</code>, <code>time</code>, <code>occurrence</code> and <code>tenantId</code>.</td>
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

A JSON array of historic detail objects.
Each historic detail object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the historic detail.</td>
  </tr>
    <tr>
    <td>type</td>
    <td>String</td>
    <td>The type of the historic detail. Either <code>formField</code> for a submitted form field value or <code>variableUpdate</code> for variable updates.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>String</td>
    <td>The key of the process definition that this historic detail belongs to.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition that this historic detail belongs to.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance the historic detail belongs to.</td>
  </tr>
  <tr>
    <td>activityInstanceId</td>
    <td>String</td>
    <td>The id of the execution the historic detail belongs to.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>String</td>
    <td>The id of the execution the historic detail belongs to.</td>
  </tr>
  <tr>
    <td>caseDefinitionKey</td>
    <td>String</td>
    <td>The key of the case definition that this historic detail belongs to.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>String</td>
    <td>The id of the case definition that this historic detail belongs to.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>String</td>
    <td>The id of the case instance the historic detail belongs to.</td>
  </tr>
  <tr>
    <td>caseExecutionId</td>
    <td>String</td>
    <td>The id of the case execution the historic detail belongs to.</td>
  </tr>
  <tr>
    <td>taskId</td>
    <td>String</td>
    <td>The id of the task the historic detail belongs to.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The id of the tenant that this historic detail belongs to.</td>
  </tr>
  <tr>
    <td>userOperationId</td>
    <td>String</td>
    <td>The id of user operation which links historic detail with <a href="{{< ref "/reference/rest/history/user-operation-log/_index.md" >}}">user operation log</a> entries.</td>
  </tr>
  <tr>
    <td>time</td>
    <td>String</td>
    <td>The time when this historic detail occurred, default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
</table>

\* For further information, please see the <a href="{{< ref "/reference/rest/overview/date-format.md" >}}"> documentation</a>.

Depending on the type of the historic detail it contains further properties. In case of an <code>HistoricVariableUpdate</code> the following properties are also provided:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>variableName</td>
    <td>String</td>
    <td>The name of the variable which has been updated.</td>
  </tr>
  <tr>
    <td>variableInstanceId</td>
    <td>String</td>
    <td>The id of the associated variable instance.</td>
  </tr>
  <tr>
    <td>variableType</td>
    <td>String</td>
    <td>{{< rest-var-response-type >}}</td>
  </tr>
  <tr>
    <td>value</td>
    <td>String/Number/Boolean/Object</td>
    <td>{{< rest-var-response deserializationParameter="deserializeValues" >}}</td>
  </tr>
  <tr>
    <td>valueInfo</td>
    <td>Object</td>
    <td>{{< rest-var-response-valueinfo >}}</td>
  </tr>
  <tr>
    <td>revision</td>
    <td>number</td>
    <td>The revision of the historic variable update.</td>
  </tr>
  <tr>
    <td>errorMessage</td>
    <td>String</td>
    <td>An error message in case a Java Serialized Object could not be de-serialized.</td>
  </tr>
</table>

In case of an <code>HistoricFormField</code> the following properties are also provided:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>fieldId</td>
    <td>String</td>
    <td>The id of the form field.</td>
  </tr>
  <tr>
    <td>fieldValue</td>
    <td>String/Number/Boolean/Object</td>
    <td>The submitted value.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/history/detail?firstResult=1&maxResults=10`

Response Body:

    {
      "processInstanceId": "3cd597b7-001a-11e7-8c6b-34f39ab71d4e",
      "occurredAfter": "2018-01-29T10:15:45.000+0100",
      "sorting": [
        {
          "sortBy": "processInstanceId",
          "sortOrder": "asc"
        }
      ]
    }

## Response

```json
[
  {
    "type": "variableUpdate",
    "id": "3cd79390-001a-11e7-8c6b-34f39ab71d4e",
    "processDefinitionKey": "invoice",
    "processDefinitionId": "invoice:1:3c59899b-001a-11e7-8c6b-34f39ab71d4e",
    "processInstanceId": "3cd597b7-001a-11e7-8c6b-34f39ab71d4e",
    "activityInstanceId": "StartEvent_1:3cd7456e-001a-11e7-8c6b-34f39ab71d4e",
    "executionId": "3cd597b7-001a-11e7-8c6b-34f39ab71d4e",
    "caseDefinitionKey": null,
    "caseDefinitionId": null,
    "caseInstanceId": null,
    "caseExecutionId": null,
    "taskId": null,
    "tenantId": null,
    "userOperationId": "3cd76c7f-001a-11e7-8c6b-34f39ab71d4e",
    "time": "2017-03-03T15:03:54.000+0200",
    "variableName": "amount",
    "variableInstanceId": "3cd65b08-001a-11e7-8c6b-34f39ab71d4e",
    "variableType": "Double",
    "value": 30.0,
    "valueInfo": {},
    "revision": 0,
    "errorMessage": null
  },
  {
    "type": "variableUpdate",
    "id": "3cd79392-001a-11e7-8c6b-34f39ab71d4e",
    "processDefinitionKey": "invoice",
    "processDefinitionId": "invoice:1:3c59899b-001a-11e7-8c6b-34f39ab71d4e",
    "processInstanceId": "3cd597b7-001a-11e7-8c6b-34f39ab71d4e",
    "activityInstanceId": "StartEvent_1:3cd7456e-001a-11e7-8c6b-34f39ab71d4e",
    "executionId": "3cd597b7-001a-11e7-8c6b-34f39ab71d4e",
    "caseDefinitionKey": null,
    "caseDefinitionId": null,
    "caseInstanceId": null,
    "caseExecutionId": null,
    "taskId": null,
    "tenantId": null,
    "userOperationId": "3cd76c7f-001a-11e7-8c6b-34f39ab71d4e",
    "time": "2017-03-03T15:03:54.000+0200",
    "variableName": "invoiceDocument",
    "variableInstanceId": "3cd65b0a-001a-11e7-8c6b-34f39ab71d4e",
    "variableType": "File",
    "value": null,
    "valueInfo": {
      "mimeType": "application/pdf",
      "filename": "invoice.pdf"
    },
    "revision": 0,
    "errorMessage": null
  }
]
```
