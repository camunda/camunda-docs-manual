---

title: "Get Deployment Resources"
weight: 50

menu:
  main:
    name: "Get Resources"
    identifier: "rest-api-deployment-get-resources"
    parent: "rest-api-deployment"
    pre: "GET `/deployment/{id}/resources`"

---


Retrieves all deployment resources of a given deployment.


# Method

GET `/deployment/{id}/resources`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the deployment to retrieve the deployment resources for.</td>
  </tr>
</table>


# Result

A JSON array containing all deployment resources of the given deployment. Each
object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the deployment resource.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the deployment resource.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>String</td>
    <td>The id of the deployment.</td>
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
    <td>Deployment resources for the given deployment do not exist. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/deployment/anDeploymentId/resources`

## Response

```json
[
  {
    "id": "anResourceId",
    "name": "anResourceName",
    "deploymentId": "anDeploymentId"
  },
  {
    "id": "anotherResourceId",
    "name": "anotherResourceName",
    "deploymentId": "anDeploymentId"
  }
]
```
