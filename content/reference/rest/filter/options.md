---

title: "Filter Resource Options"
weight: 130

menu:
  main:
    name: "Options"
    identifier: "rest-api-filter-13-options"
    parent: "rest-api-filter"
    pre: "OPTIONS `/filter` for available interactions on resource
          </br>
          OPTIONS `/filter/{id}` for available interactions on resource instance"

---


The `/filter` resource supports two custom OPTIONS requests, one for the resource as such and one for individual filter instances. The OPTIONS request allows you to check for the set of available operations that the currently authenticated user can perform on the `/filter` resource. Whether the user can perform an operation or not may depend on various factors, including the users authorizations to interact with this resource and the internal configuration of the process engine.

# Method

OPTIONS `/filter` for available interactions on resource.

OPTIONS `/filter/{id}` for available interactions on resource instance.


# Result

A JSON object with a single property named `links`, providing a list of resource links that are allowed actions for the current user. Each link has the following properties

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>method</td>
    <td>String</td>
    <td>The HTTP method to use for the interaction.</td>
  </tr>
  <tr>
    <td>href</td>
    <td>String</td>
    <td>The interaction URL.</td>
  </tr>
  <tr>
    <td>rel</td>
    <td>String</td>
    <td>The relation of the interaction (i.e., a symbolic name representing the nature of the interaction). Examples: <code>create</code>, <code>delete</code> ...</td>
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
</table>


# Example

## Request

OPTIONS `/filter/aFilterId`

## Response

Status 200.

    {"links":[
      {"method": "GET", href":"http://localhost:8080/engine-rest/filter/aFilterId", "rel":"self"},
      {"method": "GET", href":"http://localhost:8080/engine-rest/filter/aFilterId/singleResult", "rel":"singleResult"}
      {"method": "POST", href":"http://localhost:8080/engine-rest/filter/aFilterId/singleResult", "rel":"singleResult"}
      {"method": "GET", href":"http://localhost:8080/engine-rest/filter/aFilterId/list", "rel":"list"}
      {"method": "POST", href":"http://localhost:8080/engine-rest/filter/aFilterId/list", "rel":"list"}
      {"method": "GET", href":"http://localhost:8080/engine-rest/filter/aFilterId/count", "rel":"count"}
      {"method": "POST", href":"http://localhost:8080/engine-rest/filter/aFilterId/count", "rel":"count"}
      {"method": "PUT", href":"http://localhost:8080/engine-rest/filter/aFilterId", "rel":"update"},
      {"method": "DELETE", href":"http://localhost:8080/engine-rest/filter/aFilterId", "rel":"delete"}]}
