---

title: "Get Single Deployment Resource"
category: 'Deployment'

keywords: 'get'

---


Retrieves a single deployment resource by resource id for the given deployment.


Method
------

GET `/deployments/{id}/{resourceId}`


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
  <tr>
    <td>resourceId</td>
    <td>The id of the deployment resource that this deployment belongs to.</td>
  </tr>
</table>


Result
------

A json object corresponding to the Resource interface in the engine.
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
    <td>application/octet-stream</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Deployment Resource with given resource id or deployment id does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

GET `/deployments/someDeploymentId/someResourceId`
  
#### Response

Status 200.

	{
	  "id": "someResourceId"
	  "name": "resourceName",
	  "deploymentId": "someDeploymentId",
	}
