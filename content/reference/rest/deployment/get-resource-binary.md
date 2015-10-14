---

title: 'Get Single Deployment Resource (binary)'
weight: 70

menu:
  main:
    name: "Get Resource (Binary)"
    identifier: "rest-api-deployment-get-resource-binary"
    parent: "rest-api-deployment"
    pre: "GET `/deployment/{id}/resources/{resourceId}/data`"

---


Retrieves the binary content of a single deployment resource for the given deployment.


# Method

GET `/deployment/{id}/resources/{resourceId}/data`


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
  <tr>
    <td>resourceId</td>
    <td>The id of the deployment resource.</td>
  </tr>
</table>


# Result

Byte Stream.


# Response Codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>*</td>
    <td>
      Request successful. The media type of the response depends on the filename. For example a <code>process.bpmn</code> resource will have
      the media type <code>application/xml</code>. If the filetype is unknown it defaults to <code>application/octet-stream</code>.
    </td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Deployment Resource with given resource id or deployment id does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/deployments/someDeploymentId/resources/someResourceId/data`

## Response

Status 200.

Byte Stream.
