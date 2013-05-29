Trigger Execution
=================

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
    <td>A json array containing variable objects. These variables are updated in the execution, if
    signalling is successful. Each variable object may have the properties `name` and `value`.</td>
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
</table>


Example
-------

#### Request

POST `/execution/{id}/signal`

Request body:

    {"variables": 
        [{"name": "myVariable",
         "value": "camunda"
        },
        {"name": "mySecondVariable",
         "value": 124}]}

#### Response

Status 204. No content.
