---

title: "Get DRD Statistics"
weight: 60

menu:
  main:
    name: "Get DRD Statistics"
    identifier: "rest-api-history-decision-requirements-definition-get-statistics"
    parent: "rest-api-history-decision-requirements-definition"
    pre: "GET `/history/decision-requirements-definition/{id}/statistics`"
---

Retrieves evaluation statistics of a given decision requirements definition.

# Method

GET `/history/decision-requirements-definition/{id}/statistics` return evaluation statistics
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
</table>

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
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
    <td>decisionDefinitionKey</td>
    <td>String</td>
    <td>A key of decision defintion.</td>
  </tr>
  <tr>
    <td>evaluations</td>
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

GET `/history/decision-requirements-definition/invoice:1:9f86d61f-9ee5-11e3-be3b-606720b6f99c/statistics`

## Response

```json
[
  {
    "decisionDefinitionKey" : "dish-decision",
    "evaluations" : 1
  }
]
```
## Request With Query Parameter `decisionInstanceId=17`

GET `/history/decision-requirements-definition/invoice:1:9f86d61f-9ee5-11e3-be3b-606720b6f99c/statistics?decisionInstanceId=17`

## Response

```json
[
  {
    "decisionDefinitionKey" : "dish-decision",
    "evaluations" : 1
  }
]
```
