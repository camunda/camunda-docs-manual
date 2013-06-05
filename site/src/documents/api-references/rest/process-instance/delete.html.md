Delete Process Instance
=======================

Deletes a running process instance.


Method
------

DELETE `/process-instance/{id}`


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
    <td>The id of the process instance to be retrieved.</td>
  </tr>
</table>

#### Request Body

A json object with the following property:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deleteReason</td>
    <td>A String describing why the process instance is deleted. Will be inserted into the engine's history. Optional parameter.</td>
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
    <td>200</td>
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Process instance with given id does not exist. See the <a href="/api-references/rest/#!/overview/introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

DELETE `/process-instance/aProcessInstanceId`

    {"deleteReason" : "some reason"}

#### Response

Status 204. No content.