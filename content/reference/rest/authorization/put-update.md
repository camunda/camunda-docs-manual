---

title: "Update an Authorization"
weight: 70

menu:
  main:
    name: "Update"
    identifier: "rest-api-authorization-put-update"
    parent: "rest-api-authorization"
    pre: "PUT `/authorization/{id}`"

---


Updates an authorization by id.

# Method

PUT `/authorization/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the authorization to be updated.</td>
  </tr>
</table>


## Request Body

A JSON object with the following properties:


<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>permissions</td>
    <td>Integer</td>
    <td>An integer holding the permissions provided by this authorization.</td>
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
    <td>An integer representing the resource type. See the <a href="{{< ref "/user-guide/process-engine/authorization-service.md#resources" >}}">User Guide</a> for a list of integer representations of resource types.</td>
  </tr>
  <tr>
    <td>resourceId</td>
    <td>String</td>
    <td>The resource Id. The value "\*" represents an authorization ranging over all instances of a resource.</td>
  </tr>
</table>

# Result

This method returns no content.


# Response Codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td></td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>The authenticated user is unauthorized to update this resource. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>The authorization with the requested Id cannot be found.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The authorization could not be updated due to an internal server error. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

PUT `/authorization/anAuthorizationId`

Request Body:

    {"permissions": 16,
     "userId": "*",
     "groupId": null,
     "resourceType": 1,
     "resourceId": "*"}

## Response

Status 204. No content.
