Get Single Instance
===================

Retrieves a single process instance according to the ProcessInstance interface in the engine.


Method
------

GET `/process-instance/{id}`


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


Result
------

A json object corresponding to the ProcessInstance interface in the engine.
Its properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the process instance.</td>
  </tr>
  <tr>
    <td>definitionId</td>
    <td>String</td>
    <td>The id of the process definition this instance belongs to.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>String</td>
    <td>The business key of the process instance.</td>
  </tr>
  <tr>
    <td>ended</td>
    <td>Boolean</td>
    <td>A flag indicating whether the process instance has ended.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Boolean</td>
    <td>A flag indicating whether the process instance is suspended.</td>
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
    <td>404</td>
    <td></td>
    <td>Process instance with given id does not exist.</td>
  </tr>
</table>

Example
-------

#### Request

<!-- TODO: Insert a 'real' example -->
GET `/process-instance/aProcessInstanceId`

#### Response

    {"id":"aProcessInstanceId",
    "definitionId":"aProcDefId",
    "businessKey":"aKey",
    "ended":false,
    "suspended":false}