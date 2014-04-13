---

title: "Get Single Deployment Resource (binary)"
category: 'Deployment'

keywords: 'get'

---


Retrieves the binary content of a single deployment resource for the given deployment.


Method
------

GET `/deployment/{id}/resources/{resourceId}/data`


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
    <td>The id of the deployment resource.</td>
  </tr>
</table>


Result
------

Byte Stream.

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

GET `/deployments/someDeploymentId/resources/someResourceId/data`

#### Response

Status 200.

Byte Stream.
