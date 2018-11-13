---

title: "Evaluate Decision"
weight: 60

menu:
  main:
    name: "Evaluate"
    identifier: "rest-api-decision-definition-evaluate"
    parent: "rest-api-decision-definition"
    pre: "POST `/decision-definition/{id}/evaluate`
          </br>
          POST `/decision-definition/key/{key}/evaluate`
          </br>
          POST `/decision-definition/key/{key}/tenant-id/{tenant-id}/evaluate`"

---

Evaluates a given decision and returns the result. The input values of the decision have to be supplied in the request body.


# Method

POST `/decision-definition/{id}/evaluate`

POST `/decision-definition/key/{key}/evaluate` (evaluates the latest version of decision definition which belongs to no tenant)

POST `/decision-definition/key/{key}/tenant-id/{tenant-id}/evaluate` (evaluates the latest version of the decision definition for tenant)


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the decision definition to be evaluated.</td>
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

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>variables</td>
    <td>A JSON object containing the variables the decision is to be evaluated with. Each key corresponds to a variable name and each value to a variable value. A variable value is a JSON object with the following properties:
    {{< rest-var-request >}}
  </tr>
</table>


# Result

A JSON array representing the result of the newly evaluated decision. The array contains the output values of each matched rule as key-value pairs. Each key is an output name of an output clause and each value an output value object that has the following properties:

{{< rest-var-response >}}

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
    <td>403</td>
    <td>application/json</td>
    <td>The authenticated user is unauthorized to evaluate this decision. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
  <td>The decision could not be evaluated due to a nonexistent decision definition. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The decision could not be evaluated successfully. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>



# Example

## Request

POST `/decision-definition/aDecisionDefinitionId/evaluate`

POST `/decision-definition/key/aDecisionDefinitionKey/evaluate`

Request body:

```json
{
  "variables" : {
    "amount" : { "value" : 600, "type" : "Double" },
    "invoiceCategory" : { "value" : "Misc", "type" : "String" }
  }
}
```

## Response

```json
[
  {
    "result": { "value" : "management", "type" : "String", "valueInfo" : null }
  }
]
```
