---

title: "Group Membership Resource Options"
weight: 30

menu:
  main:
    name: "Options"
    identifier: "rest-api-group-membership-options"
    parent: "rest-api-group-member"
    pre: "OPTIONS `/group/{id}/members`"

---

The OPTIONS request allows checking for the set of available operations that the currently authenticated user can perform on the resource. The fact whether the user can perform an operation or not may depend on various things, including the users authorizations to interact with this resource and the internal configuration of the process engine.

# Method

OPTIONS `/group/{id}/members` for available interactions on resource


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the group.</td>
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
    <td>The interaction URL</td>
  </tr>
  <tr>
    <td>rel</td>
    <td>String</td>
    <td>The relation of the interaction (ie. a symbolic name representing the nature of the interaction). Examples: <code>create</code>, <code>delete</code> ...</td>
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

OPTIONS `/group/sales/members`

## Response

Status 200.

    {"links":[
        {"method":"GET","href":"http://localhost:8080/camunda/api/engine/engine/default/group/sales/members","rel":"self"},
        {"method":"DELETE","href":"http://localhost:8080/camunda/api/engine/engine/default/group/sales/members","rel":"delete"},
        {"method":"PUT","href":"http://localhost:8080/camunda/api/engine/engine/default/group/sales/members","rel":"create"}]
    }
