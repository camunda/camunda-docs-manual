---

title: "Get Tenant"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-tenant-get"
    parent: "rest-api-tenant"
    pre: "GET `/tenant/{id}`"

---


Retrieves a tenant.


# Method

GET `/tenant/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the tenant to be retrieved.</td>
  </tr>
</table>


# Result

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the tenant.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the tenant.</td>
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
    <td>Tenant with given id does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

GET `/tenant/tenantOne`

## Response

Status 200.

    {
     "id":"tenantOne",
     "name":"Tenant One"
    }
