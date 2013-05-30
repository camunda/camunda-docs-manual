Update/Delete Execution Variables
=================================

Updates or deletes the variables in the context of an execution.
Updates precede deletes. So if a variable is updated AND deleted, the deletion overrides the update.


Method
------

POST `/execution/{id}/variables`


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
    <td>The id of the execution to set variables for.</td>
  </tr>
</table>
  

#### Request Body

<p>
  A json object with the following properties:
</p>
<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>modifications</td>
    <td>An array of json variable objects. A variable object has two properties: `name` as the variable's key in the process context
    and `value` for the value to be updated.</td>
  </tr>
  <tr>
    <td>deletions</td>
    <td>An array of `String` keys of variables to be deleted.</td>
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
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>Update or delete could not be executed, for example because the execution does not exist.</td>
  </tr>
</table>

Example
-------

#### Request

POST `/execution/anExecutionId/variables`

Request body:

    {"modifications": [
        {"name": "aVariable",
         "value": "aValue"},
        {"name": "anotherVariable",
         "value": 42}
        ],
    "deletions": [
        "aThirdVariable", "FourthVariable"
    ]}

#### Response

Status 204. No content.
