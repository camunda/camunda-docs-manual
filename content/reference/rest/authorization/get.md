---

title: "Get Single Authorization"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-authorization-get"
    parent: "rest-api-authorization"
    pre: "GET `/authorization/{id}`"

---


Retrieves a single authorization by Id.

# Method

GET `/authorization/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the authorization to be retrieved.</td>
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
    <td>The type of the authorization. (0=global, 1=grant, 2=revoke).</td>
  </tr>
  <tr>
    <td>permissions</td>
    <td>Array of Strings</td>
    <td>An array of strings representing the permissions assigned by this authentication.</td>
  </tr>
  <tr>
    <td>userId</td>
    <td>String</td>
    <td>The id of the user this authorization has been created for. The value "\*" represents a global authorization ranging over all users.</td>
  </tr>
  <tr>
    <td>groupId</td>
    <td>String</td>
    <td>The id of the group this authorization has been created for.</td>
  </tr>
  <tr>
    <td>resourceType</td>
    <td>Integer</td>
    <td>An integer representing the resource type. See the <a href="{{< relref "user-guide/process-engine/authorization-service.md#resources" >}}">User Guide</a> for a list of integer representations of resource types.</td>
  </tr>
  <tr>
    <td>resourceId</td>
    <td>String</td>
    <td>The resource Id. The value "\*" represents an authorization ranging over all instances of a resource.</td>
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
    <td>404</td>
    <td>application/json</td>
    <td>Authorization with given id does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

GET `/authorization/anAuthorizationId`

## Response

Status 200.

    {"id":"anAuthorizationId",
     "type": 0,
     "permissions": ["CREATE", "READ"],
     "userId": "*",
     "groupId": null,
     "resourceType": 1,
     "resourceId": "*"}
