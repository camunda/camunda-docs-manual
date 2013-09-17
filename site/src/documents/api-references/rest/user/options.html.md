---

title: 'User Resource Options'
category: 'User'

keywords: 'options'

---


The `/user` resource supports two custom OPTIONS requests, one for the resource as such and one for individual user instances. The options request allows checking for the set of available operations that the currently authenticated user can perform on the `/user` resource. The fact whether the user can perform an operation may depend on various things, including the users authorizations to interact with this resource and the interal configuration of the process engine.

Method
------

OPTIONS `/user` for available interactions on resource
OPTIONS `/user/{id}` for available interactions on resource instance


Result
------

A Json object with a single property named `links`, providing a list of resource links. Each link has the following properties

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
    <td>The relation of the interaction (ie. a symbolic name representing the nature of the interaction). Examples: `create`, `delete` ...</td>
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
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
</table>

Example
-------

#### Request

OPTIONS `/user/aUserId`
  
#### Response

Status 200.

    {"links":[
      {"method":"GET","href":"http://localhost:8080/camunda/api/engine/engine/default/user/peter/profile","rel":"self"},
      {"method":"DELETE","href":"http://localhost:8080/camunda/api/engine/engine/default/user/peter","rel":"delete"},
      {"method":"PUT","href":"http://localhost:8080/camunda/api/engine/engine/default/user/peter/profile","rel":"update"}
      ]}