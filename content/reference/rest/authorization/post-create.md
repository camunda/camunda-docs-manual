---

title: "Create a New Authorization"
weight: 60

menu:
  main:
    name: "Create"
    identifier: "rest-api-authorization-post-create"
    parent: "rest-api-authorization"
    pre: "POST `/authorization/create`"

---


Creates a new authorization.


# Method

POST `/authorization/create`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>type</td>
    <td>Integer</td>
    <td>The type of the authorization. (0=global, 1=grant, 2=revoke). See the <a href="{{< ref "/user-guide/process-engine/authorization-service.md#authorization-type" >}}">User Guide</a> for more information about authorization types.</td>
  </tr>
  <tr>
    <td>permissions</td>
    <td>String</td>
    <td>An array of Strings holding the permissions provided by this authorization.</td>  </tr>
  <tr>
    <td>userId</td>
    <td>String</td>
    <td>The id of the user this authorization has been created for. The value "*" represents a global authorization ranging over all users.</td>
  </tr>
  <tr>
    <td>groupId</td>
    <td>String</td>
    <td>The id of the group this authorization has been created for.</td>
  </tr>
  <tr>
    <td>resourceType</td>
    <td>Integer</td>
    <td>An integer representing the resource type. See the <a href="{{< ref "/user-guide/process-engine/authorization-service.md#resources" >}}">User Guide</a> for a list of integer representations of resource types.</td>
  </tr>
  <tr>
    <td>resourceId</td>
    <td>String</td>
    <td>The resource Id. The value "*" represents an authorization ranging over all instances of a resource.</td>
  </tr>
</table>


# Result

A JSON array with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the authorization.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>Integer</td>
    <td>The type of the authorization (0=global, 1=grant, 2=revoke).</td>
  </tr>
  <tr>
    <td>permissions</td>
    <td>String</td>
    <td>An array of Strings holding the permissions provided by this authorization.</td>
  </tr>
  <tr>
    <td>userId</td>
    <td>String</td>
    <td>The id of the user this authorization has been created for. The value "*" represents a global authorization ranging over all users.</td>
  </tr>
  <tr>
    <td>groupId</td>
    <td>String</td>
    <td>The id of the group this authorization has been created for.</td>
  </tr>
  <tr>
    <td>resourceType</td>
    <td>Integer</td>
    <td>An integer representing the resource type. See the <a href="{{< ref "/user-guide/process-engine/authorization-service.md#resources" >}}">User Guide</a> for a list of integer representations of resource types.</td>
  </tr>
  <tr>
    <td>resourceId</td>
    <td>String</td>
    <td>The resource Id. The value "*" represents an authorization ranging over all instances of a resource.</td>
  </tr>
  <tr>
    <td>links</td>
    <td>Object</td>
    <td>A JSON array containing links to interact with the resource. The links contain only operations that the currently authenticated user would be authorized to perform.</td>
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
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the properties in the request body are invalid, for example if a permission parameter is not valid for the provided resourceType. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>The authenticated user is unauthorized to create an instance of this resource. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The authorization could not be updated due to an internal server error. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/authorization/create`

Request Body:

    {"type" : 0,
     "permissions": ["CREATE", "READ"],
     "userId": "*",
     "groupId": null,
     "resourceType": 1,
     "resourceId": "*"}

## Response

Status 200.

    {"id":"anAuthorizationId",
     "type": 0,
     "permissions": ["CREATE", "READ"],
     "userId": "*",
     "groupId": null,
     "resourceType": 1,
     "resourceId": "*",
     "links":[
        {"method": "GET", href":"http://localhost:8080/engine-rest/authorization/anAuthorizationId", "rel":"self"},
        {"method": "PUT", href":"http://localhost:8080/engine-rest/authorization/anAuthorizationId", "rel":"update"},
        {"method": "DELETE", href":"http://localhost:8080/engine-rest/authorization/anAuthorizationId", "rel":"delete"}
      ]}
