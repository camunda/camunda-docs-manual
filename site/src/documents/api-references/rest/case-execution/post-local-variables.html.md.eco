---

title: 'Update/Delete Local Case Execution Variables'
category: 'Case Execution'

keywords: 'post'

---


Updates or deletes the variables in the context of a case execution. The updates do not propagate upwards in the case execution hierarchy.
Please note: deletion precedes update.


Method
------

POST `/case-execution/{id}/localVariables`


Parameters
----------

#### Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the case execution to set variables for.</td>
  </tr>
</table>


#### Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>modifications</td>
    <td><p>A JSON object containing variable key-value pairs. Each key is a variable name and each value a JSON variable value object.</p>
    <%- @partial('api-references/rest/variables/variable-request.html.md.eco', @, {}) %></td>
  </tr>
  <tr>
    <td>deletions</td>
    <td>An array of <code>String</code> keys of variables to be deleted.</td>
  </tr>
</table>


Result
------

This method returns no content.


Response codes
--------------

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
    <td>The variable value or type is invalid, for example if the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>Update or deletion could not be executed, for example because the case execution does not exist.</td>
  </tr>
</table>

Example
-------

#### Request

POST `/case-execution/aCaseExecutionId/localVariables`

Request body:

    {
      "modifications":
        {
          "aVariable": {"value": "aValue", "type": "String"},
          "anotherVariable": {"value": 42, "type": "Integer"}},
      "deletions":
        [
          "aThirdVariable",
          "FourthVariable"
        ]
    }

#### Response

Status 204. No content.
