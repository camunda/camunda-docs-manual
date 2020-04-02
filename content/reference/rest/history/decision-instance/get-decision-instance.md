---

title: "Get Historic Decision Instance"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-history-get-decision-instance"
    parent: "rest-api-history-decision-instance"
    pre: "GET `/history/decision-instance/{id}`"

---


Retrieves a historic decision instance by id, according to the
`HistoricDecisionInstance` interface in the engine.


# Method

GET `/history/decision-instance/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the historic decision instance to be retrieved.</td>
  </tr>
</table>

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
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
</table>


# Result

A JSON object corresponding to the `HistoricDecisionInstance` interface in the engine.
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
    <td>The time the instance was evaluated. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>removalTime</td>
    <td>String</td>
    <td>The time after which the instance should be removed by the History Cleanup job. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
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
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the historic decision instance.</td>
  </tr>
  <tr>
    <td>userId</td>
    <td>String</td>
    <td>The id of the authenticated user that has evaluated this decision instance without a process or case instance.</td>
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
    <td>The result of the collect aggregation of the decision result if used. Can be <code>null</code> if no aggregation was used.</td>
  </tr>
  <tr>
    <td>rootDecisionInstanceId</td>
    <td>String</td>
    <td>The decision instance id of the evaluated root decision. Can be <code>null</code> if this instance is the root decision instance of the evaluation.</td>
  </tr>
  <tr>
    <td>rootProcessInstanceId</td>
    <td>String</td>
    <td>The process instance id of the root process instance that initiated the evaluation of this decision. Can be <code>null</code> if this decision instance is not evaluated as part of a BPMN process.</td>
  </tr>
  <tr>
    <td>decisionRequirementsDefinitionId</td>
    <td>String</td>
    <td>The id of the decision requirements definition that this decision instance belongs to.</td>
  </tr>
  <tr>
    <td>decisionRequirementsDefinitionKey</td>
    <td>String</td>
    <td>The key of the decision requirements definition that this decision instance belongs to.</td>
  </tr>
</table>

\* For further information, please see the <a href="{{< ref "/reference/rest/overview/date-format.md" >}}"> documentation</a>.

## Decision Input Value

{{< rest-decision-input deserializationParameter="disableCustomObjectDeserialization" >}}

\* For further information, please see the <a href="{{< ref "/reference/rest/overview/date-format.md" >}}"> documentation</a>.

## Decision Output Value

{{< rest-decision-output deserializationParameter="disableCustomObjectDeserialization" >}}

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
    <td>404</td>
    <td>application/json</td>
    <td>Historic decision instance with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/history/decision-instance/aDecisionInstId?includeInput=true&includeOutputs=true`

## Response

```json
{
    "activityId": "assignApprover",
    "activityInstanceId": "assignApprover:67e9de1e-579d-11e5-9848-f0def1e59da8",
    "collectResultValue": null,
    "decisionDefinitionId": "invoice-assign-approver:1:4c864d79-579d-11e5-9848-f0def1e59da8",
    "decisionDefinitionKey": "invoice-assign-approver",
    "decisionDefinitionName": "Assign Approver",
    "evaluationTime": "2015-09-10T11:22:06.000+0200",
    "removalTime": null,
    "id": "67ea2c3f-579d-11e5-9848-f0def1e59da8",
    "inputs": [
        {
            "clauseId": "clause1",
            "clauseName": "Invoice Amount",
            "decisionInstanceId": "67ea2c3f-579d-11e5-9848-f0def1e59da8",
            "errorMessage": null,
            "id": "67ea2c41-579d-11e5-9848-f0def1e59da8",
            "type": "Double",
            "createTime":"2015-09-10T11:22:06.000+0200",
            "removalTime": null,
            "rootProcessInstanceId": "aRootProcessInstanceId",
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
            "createTime":"2015-09-10T11:22:06.000+0200",
            "removalTime": null,
            "rootProcessInstanceId": "aRootProcessInstanceId",
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
            "createTime":"2015-09-10T11:22:06.000+0200",
            "removalTime": null,
            "rootProcessInstanceId": "aRootProcessInstanceId",
            "value": "accounting",
            "valueInfo": {},
            "variableName": "result"
        }
    ],
    "processDefinitionId": "invoice:1:4c6e3197-579d-11e5-9848-f0def1e59da8",
    "processDefinitionKey": "invoice",
    "processInstanceId": "67e98fec-579d-11e5-9848-f0def1e59da8",
    "rootProcessInstanceId": "f8259e5d-ab9d-11e8-8449-e4a7a094a9d6",
    "caseDefinitionId": null,
    "caseDefinitionKey": null,
    "caseInstanceId": null,
    "tenantId": null,
    "userId": null,
    "rootDecisionInstanceId": null,
    "decisionRequirementsDefinitionId": null,
    "decisionRequirementsDefinitionKey": null
}
```
