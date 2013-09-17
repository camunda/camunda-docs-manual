---

title: 'Trigger Execution'
category: 'Execution'

keywords: 'post signal asynchronous continuation'

---


Signals a single execution. Can for example be used to explicitly skip user tasks or signal asynchronous continuations.


Method
------

POST `/execution/{id}/signal`


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
    <td>The id of the execution to signal.</td>
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
    <td>variables</td>
    <td>A json object containing variable key-value pairs. Each key is a variable name and each value a json variable value object.
    A variable value object has has the property `value`, which is the value to update, and `type`, which represents the type of the value. Valid types are String, Integer, Short, Long, Double and Date.</td>
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
    <td>400</td>
    <td>application/json</td>
    <td>The variable value or type is invalid. For example the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>     
</table>


Example
-------

#### Request

POST `/execution/{id}/signal`

Request body:

    {"variables": 
        {"myVariable": {"value": "camunda", "type": "String"},
        "mySecondVariable": {"value": 124, "type": "Integer"}}
    }

#### Response

Status 204. No content.
