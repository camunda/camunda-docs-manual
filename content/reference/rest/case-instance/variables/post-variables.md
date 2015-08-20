---

title: "Update/Delete Case Instance Variables"
weight: 110

menu:
  main:
    name: "Modify"
    identifier: "rest-api-case-instance-post-variables"
    parent: "rest-api-case-instance-variables"
    pre: "POST `/case-instance/{id}/variables`"

---


Updates or deletes the variables of a case instance. Please note: deletion precedes update.


# Method

POST `/case-instance/{id}/variables`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the case instance to set variables for.</td>
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


# Response Codes

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
    <td>The variable value or type is invalid, for example if the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>Update or delete could not be executed, for example because the case instance does not exist.</td>
  </tr>
</table>


# Example

## Request

POST `/case-instance/aCaseInstanceId/variables`

Request body:

    {
      "modifications":
        {
          "aVariable":
            {
              "value": "aValue"
            },
          "anotherVariable":
            {
              "value": 42
            }
        },
      "deletions":
        [
          "aThirdVariable",
          "FourthVariable"
        ]
    }

## Response

Status 204. No content.
