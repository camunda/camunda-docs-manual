---

title: 'Get Local Task Variables'
weight: 260

menu:
  main:
    name: "Get List"
    identifier: "rest-api-task-get-local-variables"
    parent: "rest-api-task-local-variables"
    pre: "GET `/task/{id}/localVariables`"

---


Retrieves all variables of a given task.


# Method

GET `/task/{id}/localVariables`


# Parameters
  
## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to retrieve the variables from.</td>
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
    <td>Task id is null or does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/task/aTaskId/localVariables`

## Response

```json
{
"aTaskVariableKey":
   {
   "value":
   {
    "property1":"aPropertyValue",
    "property2":true
   },
   "type":"ExampleVariableObject"
   }
}
```


# Example 1

## Request

GET `/task/aTaskId/localVariables`
  
## Response

{{< rest-vars-response-example-deserialized >}}

    
# Example 2

## Request

GET `/task/aTaskId/localVariables?deserializeValues=false`
  
## Response

{{< rest-vars-response-example-serialized >}}
