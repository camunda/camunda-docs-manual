---

title: 'Get Task Variable'
weight: 250

menu:
  main:
    name: Get
    identifier: "rest-api-task-get-variable"
    parent: "rest-api-task-variables"
    pre: "GET `/task/{id}/variables/{varName}`"

---


Retrieves a variable from the context of a given task.
The variable must be visible from the task. It is visible from the task if it is a local task variable or declared in a parent scope of the task. See documentation on [visiblity of variables]({{< ref "/user-guide/process-engine/variables.md" >}}).


# Method

GET `/task/{id}/variables/{varName}`


# Parameters
  
## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to retrieve the variable from.</td>
  </tr>
  <tr>
    <td>varName</td>
    <td>The name of the variable to get.</td>
  </tr>
</table>

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deserializeValue</td>
    <td>
      {{< rest-var-query-param-deserialize-object-value >}}
    </td>
  </tr>
</table>

# Result

A JSON object with the following properties:

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
    <td>404</td>
    <td>application/json</td>
    <td>Variable with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>Task id is null or does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example 1

## Request

GET `/task/aTaskId/variables/myObject123`
  
## Response

{{< rest-var-response-example-deserialized >}}

# Example 2

## Request

GET `/task/aTaskId/variables/myObject123?deserializeValue=false`
  
## Response

{{< rest-var-response-example-serialized >}}
