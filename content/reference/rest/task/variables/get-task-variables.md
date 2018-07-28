---

title: 'Get Task Variables'
weight: 260

menu:
  main:
    name: "Get List"
    identifier: "rest-api-task-get-variables"
    parent: "rest-api-task-variables"
    pre: "GET `/task/{id}/variables`"

---


Retrieves all variables visible from the task. A variable is visible from the task if it is a local task variable or declared in a parent scope of the task. See documentation on [visiblity of variables]({{< relref "user-guide/process-engine/variables.md" >}}).


# Method

GET `/task/{id}/variables`


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
    <td>Task id is null or does not exist. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/task/aTaskId/variables`

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

GET `/task/aTaskId/variables`

## Response

{{< rest-vars-response-example-deserialized >}}


# Example 2

## Request

GET `/task/aTaskId/variables?deserializeValues=false`

## Response

{{< rest-vars-response-example-serialized >}}
