---

title: "Get Single Decision Definition"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-decision-definition-get"
    parent: "rest-api-decision-definition"
    pre: "GET `/decision-definition/{id}`
          </br>
          GET `/decision-definition/key/{key}` (returns the latest version of decision definition)"

---


Retrieves a single decision definition according to the DecisionDefinition interface in the engine.


# Method

GET `/decision-definition/{id}`

GET `/decision-definition/key/{key}` (returns the latest version of decision definition)


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
</table>

Note that the path parameter `key` cannot be used when more than one tenant has a decision definition with the given key.

# Result

A JSON object corresponding to the DecisionDefinition interface in the engine.
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
    <td>The key of the decision definition, i.e. the id of the DMN 1.0 XML decision definition.</td>
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
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the decision definition.</td>
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
    <td>400</td>
    <td>application/json</td>
    <td>
      The path parameter "key" has no value. <br/>
      If more than one tenant has a decision definition with the given key.
      See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>
      Decision definition with given id or key does not exist.
      See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
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
  "id":"aDecisionDefinitionId",
  "key":"aDecisionDefinitionKey",
  "category":"aCategory",
  "name":"aName",
  "version":42,
  "resource":"aResourceName",
  "deploymentId":"aDeploymentId",
  "tenantId": null
}
```
