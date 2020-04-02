---

title: "Tenant User Membership Resource Options"
weight: 30

menu:
  main:
    name: "Options"
    identifier: "rest-api-tenant-user-options"
    parent: "rest-api-tenant-user-member"
    pre: "OPTIONS `/tenant/{id}/user-members`"

---

The OPTIONS request allows checking for the set of available operations that the currently authenticated user can perform on the resource. If the user can perform an operation or not may depend on various things, including the users authorizations to interact with this resource and the internal configuration of the process engine.

# Method

OPTIONS `/tenant/{id}/user-members` for available interactions on resource


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the tenant</td>
  </tr>
</table>


# Result

A JSON object with a single property named `links`, providing a list of resource links. Each link has the following properties

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

OPTIONS `/tenant/tenantOne/user-members`

## Response

Status 200.

    {"links":[
        {"method":"GET","href":"http://localhost:8080/camunda/api/engine/engine/default/tenant/tenantOne/user-members","rel":"self"},
        {"method":"DELETE","href":"http://localhost:8080/camunda/api/engine/engine/default/tenant/tenantOne/user-members","rel":"delete"},
        {"method":"PUT","href":"http://localhost:8080/camunda/api/engine/engine/default/tenant/tenantOne/user-members","rel":"create"}]
    }
