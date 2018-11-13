---

title: "Get Decision Definition"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-decision-definition-get"
    parent: "rest-api-decision-definition"
    pre: "GET `/decision-definition/{id}`
          </br>
          GET `/decision-definition/key/{key}`
          </br>
          GET `/decision-definition/key/{key}/tenant-id/{tenant-id}`"

---


Retrieves a decision definition by id, according to the `DecisionDefinition` interface in the engine.


# Method

GET `/decision-definition/{id}`

GET `/decision-definition/key/{key}` (returns the latest version of the decision definition which belongs to no tenant)

GET `/decision-definition/key/{key}/tenant-id/{tenant-id}` (returns the latest version of the decision definition for tenant)


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the decision definition to be retrieved.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the decision definition (the latest version thereof) to be retrieved.</td>
  </tr>
  <tr>
    <td>tenant-id</td>
    <td>The id of the tenant the decision definition belongs to.</td>
  </tr>
</table>

# Result

A JSON object corresponding to the `DecisionDefinition` interface in the engine.
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
    <td>The id of the decision definition.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>String</td>
    <td>The key of the decision definition, i.e., the id of the DMN 1.0 XML decision definition.</td>
  </tr>
  <tr>
    <td>category</td>
    <td>String</td>
    <td>The category of the decision definition.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the decision definition.</td>
  </tr>
  <tr>
    <td>version</td>
    <td>Number</td>
    <td>The version of the decision definition that the engine assigned to it.</td>
  </tr>
  <tr>
    <td>resource</td>
    <td>String</td>
    <td>The file name of the decision definition.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>String</td>
    <td>The deployment id of the decision definition.</td>
  </tr>
  <tr>
    <td>decisionRequirementsDefinitionId</td>
    <td>String</td>
    <td>The id of the decision requirements definition this decision definition belongs to.</td>
  </tr>
  <tr>
    <td>decisionRequirementsDefinitionKey</td>
    <td>String</td>
    <td>The key of the decision requirements definition this decision definition belongs to.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the decision definition.</td>
  </tr>
  <tr>
    <td>historyTimeToLive</td>
    <td>Number</td>
    <td>History time to live value of the decision definition. Is used within <a href="{{< ref "/user-guide/process-engine/history.md#history-cleanup">}}">History cleanup</a>.</td>
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
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>
      Decision definition with given id or key does not exist.
      See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

GET `/decision-definition/aDecisionDefinitionId`

GET `/decision-definition/key/aDecisionDefinitionKey`

## Response

```json
{
  "id": "dish-decision:1:c633e8a8-41b7-11e6-b0ef-00aa004d0001",
  "key": "dish-decision",
  "category": "http://camunda.org/schema/1.0/dmn",
  "name": "Dish Decision",
  "version": 1,
  "resource": "drd-dish-decision.dmn",
  "deploymentId": "c627175e-41b7-11e6-b0ef-00aa004d0001",
  "decisionRequirementsDefinitionId":"dish:1:c633c195-41b7-11e6-b0ef-00aa004d0001",
  "decisionRequirementsDefinitionKey":"dish",
  "tenantId": null,
  "historyTimeToLive": 5
}
```
