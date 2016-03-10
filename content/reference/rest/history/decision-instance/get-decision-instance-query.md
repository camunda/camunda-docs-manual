---

title: "Get Decision Instances"
weight: 10

menu:
  main:
    name: "Get List"
    identifier: "rest-api-history-get-decision-instance-query"
    parent: "rest-api-history-decision-instance"
    pre: "GET `/history/decision-instance`"

---


Query for historic decision instances that fulfill the given parameters.  The
size of the result set can be retrieved by using the [get historic decision
instances count][count] method.


# Method

GET `/history/decision-instance`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>decisionInstanceId</td>
    <td>Filter by decision instance id.</td>
  </tr>
  <tr>
    <td>decisionInstanceIdIn</td>
    <td>Filter by decision instance ids. Must be a comma-separated list of decision instance ids.</td>
  </tr>
    <td>decisionDefinitionId</td>
    <td>Filter by the decision definition the instances belongs to.</td>
  </tr>
  <tr>
    <td>decisionDefinitionKey</td>
    <td>Filter by the key of the decision definition the instances belongs to.</td>
  </tr>
  <tr>
    <td>decisionDefinitionName</td>
    <td>Filter by the name of the decision definition the instances belongs to.</td>
  </tr>
  </tr>
    <td>processDefinitionId</td>
    <td>Filter by the process definition the instances belongs to.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Filter by the key of the process definition the instances belongs to.</td>
  </tr>
  </tr>
    <td>processInstanceId</td>
    <td>Filter by the process instance the instances belongs to.</td>
  </tr>
  </tr>
    <td>caseDefinitionId</td>
    <td>Filter by the case definition the instances belongs to.</td>
  </tr>
  <tr>
    <td>caseDefinitionKey</td>
    <td>Filter by the key of the case definition the instances belongs to.</td>
  </tr>
  </tr>
    <td>caseInstanceId</td>
    <td>Filter by the case instance the instances belongs to.</td>
  </tr>
  </tr>
    <td>activityIdIn</td>
    <td>
      Filter by the activity ids the instances belongs to.
      Must be a comma-separated list of acitvity ids.
    </td>
  </tr>
  </tr>
    <td>activityInstanceIdIn</td>
    <td>
      Filter by the activity instance ids the instances belongs to.
      Must be a comma-separated list of acitvity instance ids.
    </td>
  </tr>
  <tr>
    <td>evaluatedBefore</td>
    <td>
      Restrict to instances that were evaluated before the given date.
      The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.
    </td>
  </tr>
  <tr>
    <td>evaluatedAfter</td>
    <td>
      Restrict to instances that were evaluated after the given date.
      The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.
    </td>
  </tr>
  <tr>
    <td>includeInputs</td>
    <td>
      Include input values in the result.
      Value may only be <code>true</code>, as <code>false</code> is the default behavior.
    </td>
  </tr>
  <tr>
    <td>includeOutputs</td>
    <td>
      Include output values in the result.
      Value may only be <code>true</code>, as <code>false</code> is the default behavior.
    </td>
  </tr>
  <tr>
    <td>disableBinaryFetching</td>
    <td>
      Disables fetching of byte array input and output values.
      Value may only be <code>true</code>, as <code>false</code> is the default behavior.
    </td>
  </tr>
  <tr>
    <td>disableCustomObjectDeserialization</td>
    <td>
      Disables deserialization of input and output values that are custom objects.
      Value may only be <code>true</code>, as <code>false</code> is the default behavior.
    </td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>
      Sort the results by a given criterion. Valid values are <code>evaluationTime</code>.
      Must be used in conjunction with the <code>sortOrder</code> parameter.
    </td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>
      Sort the results in a given order.
      Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
      Must be used in conjunction with the <code>sortBy</code> parameter.
    </td>
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


# Result

A JSON array of historic decision instance objects.
Each historic decision instance object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the decision instance.</td>
  </tr>
  <tr>
    <td>decisionDefinitionId</td>
    <td>String</td>
    <td>The id of the decision definition that this decision instance belongs to.</td>
  </tr>
  <tr>
    <td>decisionDefinitionKey</td>
    <td>String</td>
    <td>The key of the decision definition that this decision instance belongs to.</td>
  </tr>
  <tr>
    <td>decisionDefinitionName</td>
    <td>String</td>
    <td>The name of the decision definition that this decision instance belongs to.</td>
  </tr>
  <tr>
    <td>evaluationTime</td>
    <td>String</td>
    <td>The time the instance was evaluated. Has the format <code>yyyy-MM-dd'T'HH:mm:ss</code>.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition that this decision instance belongs to.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>String</td>
    <td>The key of the process definition that this decision instance belongs to.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance that this decision instance belongs to.</td>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>String</td>
    <td>The id of the case definition that this decision instance belongs to.</td>
  </tr>
  <tr>
    <td>caseDefinitionKey</td>
    <td>String</td>
    <td>The key of the case definition that this decision instance belongs to.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>String</td>
    <td>The id of the case instance that this decision instance belongs to.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>String</td>
    <td>The id of the activity that this decision instance belongs to.</td>
  </tr>
  <tr>
    <td>activityInstanceId</td>
    <td>String</td>
    <td>The id of the activity instance that this decision instance belongs to.</td>
  </tr>
  <tr>
    <td>inputs</td>
    <td>List of decision inputs</td>
    <td>
      The list of decision input values. <strong>Only exists</strong> if <code>includeInputs</code>
      was set to <code>true</code> in the query. For the decision input properties
      <a href="#decision-input-value">see below</a>.
    </td>
  </tr>
  <tr>
    <td>ouputs</td>
    <td>List of decision outputs</td>
    <td>
      The list of decision output values. <strong>Only exists</strong> if <code>includeOutputs</code>
      was set to <code>true</code> in the query. For the decision output properties
      <a href="#decision-output-value">see below</a>.
    </td>
  </tr>
  <tr>
    <td>collectResultValue</td>
    <td>Double</td>
    <td>The result of the collect aggregation of the decision result if used. <code>null</code> if no aggregation was used.</td>
  </tr>
</table>

## Decision Input Value

{{< rest-decision-input deserializationParameter="disableCustomObjectDeserialization" >}}

## Decision Output Value

{{< rest-decision-output deserializationParameter="disableCustomObjectDeserialization" >}}


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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/history/decision-instance?includeInputs=true&includeOutputs=true`

## Response

```json
[
  {
    "activityId": "assignApprover",
      "activityInstanceId": "assignApprover:67e9de1e-579d-11e5-9848-f0def1e59da8",
      "collectResultValue": null,
      "decisionDefinitionId": "invoice-assign-approver:1:4c864d79-579d-11e5-9848-f0def1e59da8",
      "decisionDefinitionKey": "invoice-assign-approver",
      "decisionDefinitionName": "Assign Approver",
      "evaluationTime": "2015-09-10T11:22:06",
      "id": "67ea2c3f-579d-11e5-9848-f0def1e59da8",
      "inputs": [
      {
        "clauseId": "clause1",
        "clauseName": "Invoice Amount",
        "decisionInstanceId": "67ea2c3f-579d-11e5-9848-f0def1e59da8",
        "errorMessage": null,
        "id": "67ea2c41-579d-11e5-9848-f0def1e59da8",
        "type": "Double",
        "value": 123.0,
        "valueInfo": {}
      },
      {
        "clauseId": "clause2",
        "clauseName": "Invoice Category",
        "decisionInstanceId": "67ea2c3f-579d-11e5-9848-f0def1e59da8",
        "errorMessage": null,
        "id": "67ea2c40-579d-11e5-9848-f0def1e59da8",
        "type": "String",
        "value": "Misc",
        "valueInfo": {}
      }
    ],
    "outputs": [
    {
      "clauseId": "clause3",
      "clauseName": "Approver Group",
      "decisionInstanceId": "67ea2c3f-579d-11e5-9848-f0def1e59da8",
      "errorMessage": null,
      "id": "67ea2c42-579d-11e5-9848-f0def1e59da8",
      "ruleId": "DecisionRule_1of5a87",
      "ruleOrder": 1,
      "type": "String",
      "value": "accounting",
      "valueInfo": {},
      "variableName": "result"
    }
    ],
    "processDefinitionId": "invoice:1:4c6e3197-579d-11e5-9848-f0def1e59da8",
    "processDefinitionKey": "invoice",
    "processInstanceId": "67e98fec-579d-11e5-9848-f0def1e59da8",
    "caseDefinitionId": null,
    "caseDefinitionKey": null,
    "caseInstanceId": null
  }
]
```

[count]: {{< relref "reference/rest/history/decision-instance/get-decision-instance-query-count.md" >}}
