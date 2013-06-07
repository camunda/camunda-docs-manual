Complete Task
=============

Complete a task and update process variables.


Method
------

POST `/task/{id}/complete`


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
    <td>The id of the task to complete.</td>
  </tr>
</table>
  
#### Request Body

A json object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>variables</td>
    <td>A json object containing variable key-value pairs that will be set in the process instance.
    Each key is a variable name and each value a json variable value object.
    A variable value object has has the property `value`, which is the value to update.
    Value types may be `String`, `Number` and `Boolean`.
    This parameter is optional and may be left out.</td>
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
    <td>500</td>
    <td>application/json</td>
    <td>If the task does not exist or the corresponding process instance could not be resumed successfully. See the <a href="/api-references/rest/#!/overview/introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
--------------

#### Request

POST `/task/anId/complete`

Request body:

    {"variables":
        {"aVariable": {"value": "aStringValue"},
        "anotherVariable": {"value": 42},
        "aThirdVariable": {"value": true}}
    }

#### Response

Status 204. No content.