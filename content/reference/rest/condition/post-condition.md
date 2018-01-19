---

title: "Evaluate a Condition"
weight: 10

menu:
  main:
    name: "Evaluate"
    identifier: "rest-api-condition-post-condition"
    parent: "rest-api-condition"
    pre: "POST `/condition`"

---


Evaluates conditions to the process engine to trigger a conditional start event.
Internally this maps to the engine's condition evaluation builder method `ConditionEvaluationBuilder#evaluateStartConditions()`.
For more information about the correlation behavior, see the [Conditional Start Events]({{< relref "reference/bpmn20/events/conditional-events.md#conditional-start-event" >}}) section of the [BPMN 2.0 Implementation Reference]({{< relref "reference/bpmn20/index.md" >}}).


# Method

POST `/condition`

# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>variables</td>
    <td>A map of variables which are used for evaluation of the conditions and are injected into the process instances which have been triggered.
    Each key is a variable name and each value a JSON variable value object with the following properties.
    {{< rest-var-request transient="true">}}
  </tr>
  <tr>
    <td>businessKey</td>
    <td>Used for the process instances that have been triggered after the evaluation.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>Used to evaluate a condition for a tenant with the given id. Will only evaluate conditions of process definitions which belong to the tenant.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>A Boolean value that indicates whether the conditions should only be evaluated of process definitions which belong to no tenant or not. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Used to evaluate conditions of the process definition with the given id.</td>
  </tr>
</table>


# Result

A JSON array of process instance objects which have been triggered after the evaluation.
Each process instance object has the following properties:

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
    <td>The id of the process definition that this process instance belongs to.</td>
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
  <tr>
    <td>links</td>
    <td>Object</td>
    <td>A JSON array containing links to interact with the instance.</td>
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
    <td>If no <code>variables</code> were supplied. If both <code>tenantId</code> and <code>withoutTenantId</code> are supplied. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>If the user is not allowed to evaluate a condition. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>If no process instances were triggered after the evaluation. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

POST `/condition`

Request Body:

    {
      "variables" : {
        "temperature" : {"value" : 24, "type": "Integer",
                        "valueInfo" : { "transient" : true } },
        "city" : {"value" : "Parma", "type": "String"}
      },
      "businessKey" : "aBusinessKey",
      "tenantId" : "aTenantId"
    }

## Response

    [{
		"links": [],
		"id": "aProcInstId",
		"definitionId": "aProcDefId",
		"businessKey": "aBusinessKey",
		"caseInstanceId": null,
		"ended": false,
		"suspended": false,
		"tenantId": "aTenantId"
	},
	{
		"links": [],
		"id": "anotherId",
		"definitionId": "aProcDefId",
		"businessKey": "aBusinessKey",
		"caseInstanceId": null,
		"ended": false,
		"suspended": false,
		"tenantId": aTenantId
	}]
