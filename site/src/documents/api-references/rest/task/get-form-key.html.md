Get Form Key
============

Retrieves the form key for a task. The form key corresponds to the `FormData#formKey` property in the engine.
This key can be used to do task-specific form rendering in client applications.


Method
------

GET `/task/{id}/form`


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
    <td>The id of the task to retrieve the form for.</td>
  </tr>
</table>


Result
------

A json object containing the form key.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>key</td>
    <td>String</td>
    <td>The for key for the task.</td>
  </tr>
</table>


Response codes
--------------

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>Task with given id does not exist. See the <a href="/api-references/rest/#!/overview/introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/task/anId/form`

#### Response

    {"key":"aFormKey"}