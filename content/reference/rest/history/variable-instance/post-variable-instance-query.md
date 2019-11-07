---

title: "Get Variable Instances (POST)"
weight: 50

menu:
  main:
    name: "Get List (POST)"
    identifier: "rest-api-history-post-variable-instance-query"
    parent: "rest-api-history-variable-instance"
    pre: "POST `/history/variable-instance`"

---


Queries for historic variable instances that fulfill the given parameters.
This method is slightly more powerful than the [Get Variable Instances]({{< ref "/reference/rest/history/variable-instance/get-variable-instance-query.md" >}}) method because it allows filtering by variable values of the different types `String`, `Number` or `Boolean`.


# Method

POST `/history/variable-instance`


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


## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>variableName</td>
    <td>Filter by variable name.</td>
  </tr>
  <tr>
    <td>variableNameLike</td>
    <td>Restrict to variables with a name like the parameter.</td>
  </tr>
  <tr>
    <td>variableValue</td>
    <td>Filter by variable value. May be <code>String</code>, <code>Number</code> or <code>Boolean</code>.</td>
  </tr>
  <tr>
    <td>variableNamesIgnoreCase</td>
    <td>Match the variable name provided in <code>variableName</code> and <code>variableNameLike</code> case-insensitively. If set to <code>true</code> <strong>variableName</strong> and <strong>variablename</strong> are treated as equal.</td>
  </tr>
  <tr>
    <td>variableValuesIgnoreCase</td>
    <td>Match the variable value provided in <code>variableValue</code> case-insensitively. If set to <code>true</code> <strong>variableValue</strong> and <strong>variablevalue</strong> are treated as equal.</td>
  </tr>
  <tr>
    <td>variableTypeIn</td>
    <td>Only include historic variable instances which belong to one of the passed and comma-separated variable types. A list of all supported variable types can be found <a href="{{< ref "/user-guide/process-engine/variables.md#supported-variable-values" >}}">here</a>. <b>Note:</b> All non-primitive variables are associated with the type "serializable".
    </td>
  </tr>
  <tr>
    <td>includeDeleted</td>
    <td>Include variables that has already been deleted during the execution.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by the process instance the variable belongs to.</td>
  </tr>
  <tr>
    <td>processInstanceIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed process instance ids.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Filter by the process definition the variable belongs to.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Filter by a key of the process definition the variable belongs to.</td>
  </tr>
  <tr>
    <td>executionIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed execution ids.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>Filter by the case instance the variable belongs to.</td>
  </tr>
  <tr>
    <td>caseExecutionIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed case execution ids.</td>
  </tr>
  <tr>
    <td>caseActivityIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed case activity ids.</td>
  </tr>
  <tr>
    <td>taskIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed task ids.</td>
  </tr>
  <tr>
    <td>activityInstanceIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed activity instance ids.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Only include historic variable instances which belong to one of the passed and comma-separated tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include historic variable instances that belong to no tenant. Value may only be 
    <code>true</code>, as <code>false</code> is the default behavior.</td>
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
          <td><b>Mandatory.</b> Sort the results lexicographically by a given criterion. Valid values are <code>instanceId</code> and <code>variableName</code> and <code>tenantId</code>.
          </td>
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

A JSON array of historic variable instance objects.
Each historic activity instance object has the following properties:

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
    <td>{{< rest-var-response-value deserializationParameter="deserializeValues" >}}</td>
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
    <td>The id of the execution the variable instance belongs to.</td>
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
    <td>The id of the case instance the variable instance belongs to.</td>
  </tr>
  <tr>
    <td>caseExecutionId</td>
    <td>String</td>
    <td>The id of the case execution the variable instance belongs to.</td>
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

\* For further information, please see the <a href="{{< ref "/reference/rest/overview/date-format.md" >}}"> documentation</a>.

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

POST `/history/variable-instance`

Request Body:

```json
{
  "variableName": "someVariable",
  "variableValue": 42,
  "sorting":
    [{"sortBy": "variableName",
    "sortOrder": "asc"
    },
    {"sortBy": "instanceId",
    "sortOrder": "desc"
    }]
}
```

## Response

```json
[
  {
    "id": "someId",
    "name": "someVariable",
    "type": "Integer",
    "variableType": "integer",
    "value": 5,
    "valueInfo": {},
    "processDefinitionKey": "aProcessDefinitionKey",
    "processDefinitionId": "aProcessDefinitionId",
    "processInstanceId": "aProcInstId",
    "executionId": "aExecutionId",
    "activityInstanceId": "aActivityInstId",
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
]
```
