Resolve Task
============

Resolve a task and update execution variables.


Method
------

POST `/task/{id}/resolve`


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
    <td>The id of the task to resolve.</td>
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
    <td>A json object containing variable key-value pairs. Each key is a variable name and each value a json variable value object.
    A variable value object has has the property `value`, which is the value to update, and `type`, which represents the type of the value. Valid types are String, Integer, Short, Long, Double and Date. This parameter is optional and may be left out.</td>
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
    <td>The variable value or type is invalid. For example the value could not be parsed to an Integer value or the passed variable type is not supported.</td>
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

POST `/task/anId/resolve`

Request body:

    {"variables":
        {"aVariable": {"value": "aStringValue", "type": "String"},
        "anotherVariable": {"value": 42, "type": "Integer"},
        "aThirdVariable": {"value": true, "type": "Boolean"}}
    }

#### Response

Status 204. No content.