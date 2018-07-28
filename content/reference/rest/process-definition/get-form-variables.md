---

title: 'Get Start Form Variables'
weight: 30

menu:
  main:
    identifier: "rest-api-process-definition-get-start-form-variables"
    parent: "rest-api-process-definition"
    pre: "GET `/process-definition/{id}/form-variables`
          </br>
          GET `/process-definition/key/{key}/form-variables`
          </br>
          GET `/process-definition/key/{key}/tenant-id/{tenant-id}/form-variables`"

---

Retrieves the start form variables for a process definition (only if they are defined via the [Generated Task Form]({{< relref "user-guide/task-forms/_index.md#generated-task-forms" >}}) approach).
The start form variables take form data specified on the start event into account. If form fields are defined,
the variable types and default values of the form fields are taken into account.

# Method

GET `/process-definition/{id}/form-variables`

GET `/process-definition/key/{key}/form-variables` (returns the form variables for the latest process definition which belongs to no tenant).

GET `/process-definition/key/{key}/tenant-id/{tenant-id}/form-variables` (returns the form variables for the latest version of process definition for tenant)


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process definition to retrieve the variables for.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the process definition (the latest version thereof) to be retrieved.</td>
  </tr>
  <tr>
    <td>tenant-id</td>
    <td>The id of the tenant the process definition belongs to.</td>
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
    <td>Process definition with given key does not exist. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/process-definition/anId/form-variables`

GET `/process-definition/anId/form-variables?variableNames=a,b,c`

GET `/process-definition/key/aKey/form-variables`

## Response

```json
{
  "amount": {
      "type": "Integer",
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
