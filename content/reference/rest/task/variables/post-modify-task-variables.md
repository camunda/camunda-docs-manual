---

title: 'Update/Delete Task Variables'
weight: 270

menu:
  main:
    name: "Modify"
    identifier: "rest-api-task-post-variables"
    parent: "rest-api-task-variables"
    pre: "POST `/task/{id}/variables`"

---


Updates or deletes the variables visible from the task.
Updates precede deletions. So, if a variable is updated AND deleted, the deletion overrides the update.
A variable is visible from the task if it is a local task variable or declared in a parent scope of the task. See documentation on [visiblity of variables]({{< relref "user-guide/process-engine/variables.md" >}}).


# Method

POST `/task/{id}/variables`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to set variables for.</td>
  </tr>
</table>


## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>modifications</td>
    <td>A JSON object containing variable key-value pairs. Each key is a variable name and each value a JSON variable value object with the following properties:
    {{< rest-var-request >}}
  </tr>
  <tr>
    <td>deletions</td>
    <td>An array of <code>String</code> keys of variables to be deleted.</td>
  </tr>
</table>


# Result

This method returns no content.


# Response codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td></td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>The variable value or type is invalid. For example the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>Update or delete could not be executed because the task is null or does not exist.</td>
  </tr>
</table>

# Example

## Request

POST `/task/aTaskId/variables`

Request Body:

```json
{
  "modifications": [
    "aVariable": { "value": "aValue", "type": "String" },
    "anotherVariable": { "value": 42, "type": "Integer" }
  ],
  "deletions": [
    "aThirdVariable", "FourthVariable"
  ]
}
```

## Response

Status 204. No content.
