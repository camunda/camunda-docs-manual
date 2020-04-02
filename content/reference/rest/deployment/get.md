---

title: 'Get Deployment'
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-deployment-get"
    parent: "rest-api-deployment"
    pre: "GET `/deployment/{id}`"

---


Retrieves a deployment by id, according to the `Deployment` interface of the engine.


# Method

GET `/deployment/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the deployment.</td>
  </tr>
</table>


# Result

A JSON object corresponding to the `Deployment` interface of the engine. Its properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the deployment.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the deployment.</td>
  </tr>
  <tr>
    <td>source</td>
    <td>String</td>
    <td>The source of the deployment.</td>
  </tr>
  <tr>
    <td>deploymentTime</td>
    <td>Date</td>
    <td>The date and time of the deployment.</td>
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
    <td>404</td>
    <td>application/json</td>
    <td>Deployment with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/deployments/someDeploymentId`

## Response

Status 200.

```json
{
  "id": "someDeploymentId",
  "name": "deploymentName",
  "source": "process application",
  "deploymentTime": "2013-04-23T13:42:43.000+0200"
}
```
