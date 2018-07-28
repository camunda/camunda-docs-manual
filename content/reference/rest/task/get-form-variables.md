---

title: 'Get Task Form Variables'
weight: 310

menu:
  main:
    pre: "Get Form Variables"
    identifier: "rest-api-task-get-form-variables"
    parent: "rest-api-task"
    pre: "GET `/task/{id}/form-variables`"

---

Retrieves the form variables for a task.
The form variables take form data specified on the task into
account. If form fields are defined, the variable types and
default values of the form fields are taken into account.

# Method

GET `/task/{id}/form-variables`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to retrieve the variables for.</td>
  </tr>
</table>

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>variableNames</td>
    <td>A comma-separated list of variable names. Allows restricting the list of requested
        variables to the variable names in the list. It is best practice to restrict the list of
        variables to the variables actually required by the form in order to minimize fetching of
        data. If the query parameter is ommitted all variables are fetched. If the query parameter
        contains non-existent variable names, the variable names are ignored.</td>
  </tr>
  <tr>
    <td>deserializeValues</td>
    <td>
      {{< rest-var-query-param-deserialize-object-value >}}
    </td>
  </tr>
</table>

# Result

A JSON object containing a property for each variable returned. The key is the variable name, the
value is a JSON object with the following properties:

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
    <td>application/xhtml+xml</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Task id is null or does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/task/anId/form-variables`

GET `/task/anId/form-variables?variableNames=a,b,c`


## Response

```json
{
  "amount": {
      "type": "integer",
      "value": 5,
      "valueInfo": {}
  },
  "firstName": {
      "type": "String",
      "value": "Jonny",
      "valueInfo": {}
  }

}
```
