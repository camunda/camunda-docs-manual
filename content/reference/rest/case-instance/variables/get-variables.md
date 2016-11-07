---

title: "Get Case Instance Variables"
weight: 80

menu:
  main:
    name: "Get List"
    identifier: "rest-api-case-instance-get-variables"
    parent: "rest-api-case-instance-variables"
    pre: "GET `/case-instance/{id}/variables`"

---


Retrieves all variables of a given case instance by id.


# Method

GET `/case-instance/{id}/variables`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the case instance to retrieve the variables from.</td>
  </tr>
</table>

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deserializeValues</td>
    <td>
      {{< rest-var-query-param-deserialize-object-value >}}
    </td>
  </tr>
</table>


# Result

A JSON object of variables key-value pairs.
Each key is a variable name and each value a variable value object that has the following properties:

{{< rest-var-response deserializationParameter="deserializeValues" >}}


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
    <td>500</td>
    <td>application/json</td>
    <td>Case instance with given id does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example 1

## Request

GET `/case-instance/aCaseInstanceId/variables`

## Response

{{< rest-vars-response-example-deserialized >}}


# Example 2


## Request

GET `/case-instance/aCaseInstanceId/variables?deserializeValues=false`

## Response

{{< rest-vars-response-example-serialized >}}
