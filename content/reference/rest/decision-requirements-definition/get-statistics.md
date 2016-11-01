---

title: "Get DRD Statistics"
weight: 60

menu:
  main:
    name: "Get DRD Statistics"
    identifier: "rest-api-decision-requirements-definition-get-statistics"
    parent: "rest-api-decision-requirements-definition"
    pre: "GET `/decision-requirements-definition/{id}/statistics`
          </br>
          GET `/decision-requirements-definition/{id}/statistics/{decisionInstanceId}`"
---

Retrieves evaluation statistics of a given decision requirements definition.

# Method

GET `/decision-requirements-definition/{id}/statistics`

GET `/decision-requirements-definition/{id}/statistics/{decisionInstanceId}` return evaluation statistics
of a single decision instance.

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the decision requirements definition.</td>
  </tr>
  <tr>
    <td>decisionInstanceId</td>
    <td>An id of the decision definition instance.</td>
  </tr>
</table>

# Result

A JSON array containing statistics object for each decision definition related to this DRD.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>decisionDefinitionId</td>
    <td>String</td>
    <td>The id of the decision definition.</td>
  </tr>
  <tr>
    <td>decisionDefinitionKey</td>
    <td>String</td>
    <td>A key of decision defintion.</td>
  </tr>
  <tr>
    <td>evaluatons</td>
    <td>Integer</td>
    <td>A number of evaluation for decision definition.</td>
  </tr>
</table>

## Response codes

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
</table>

# Example

## Request

GET `/decision-requirements-definition/invoice:1:9f86d61f-9ee5-11e3-be3b-606720b6f99c/statistics`

GET `/decision-requirements-definition/invoice:1:9f86d61f-9ee5-11e3-be3b-606720b6f99c/statistics/1`

## Response

```json
[
  {
    "decisionDefinitionId" : "dish-decision:1:5",
    "decisionDefinitionKey" : "dish-decision",
    "evaluatons" : 1
  }
]
```
