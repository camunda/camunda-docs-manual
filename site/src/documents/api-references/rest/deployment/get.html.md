---

title: "Get Single Deployment"
category: 'Deployment'

keywords: 'get'

---


Retrieves all deployment resources for a deployment by id.


Method
------

GET `/deployments/{id}`


Parameters
----------

#### Path Parameters

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


Result
------

A json array of deployment resource objects. Each deployment resource object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the deployment resource that this deployment belongs to.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the deployment resource that this deployment belongs to.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>String</td>
    <td>The id of the deployment.</td>
  </tr>
</table>

Response codes
--------------

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
    <td>No deployment resources for given deployment id exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

GET `/deployments/someDeploymentId`
  
#### Response

Status 200.

    [
		{
		  "id": "resourceId"
		  "name": "resourceName",
		  "deploymentId": "someDeploymentId",
		}
		{
		  "id": "otherResourceId"
		  "name": "otherResourceName",
		  "deploymentId": "someDeploymentId",
		}
		{
		  "id": "yetAnotherResourceId"
		  "name": "yetAnotherResourceName",
		  "deploymentId": "someDeploymentId",
		}
	]
