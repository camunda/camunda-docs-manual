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
    <td>
      A json object consisting of key-value pairs. 
      Each key is a variable name, each value the variable value that will be set in the process instance.
      Variable types may be `String`, `Number` and `Boolean`.
      This parameter is optional and may be left out.
    </td>
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
    <td>If the task does not exist or the corresponding process instance could not be resumed successfully. See the [Introduction](/api-references/rest/#!/overview/introduction) for the error response format.</td>
  </tr>
</table>


Example
--------------

#### Request

POST `/task/anId/resolve`

Request body:

    {"variables":
        {"aVariable": "aStringValue",
        "anotherVariable": 42,
        "aThirdVariable": true}
    }

#### Response

Status 204. No content.