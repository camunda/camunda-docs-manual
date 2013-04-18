Get Start Form Key
==================

Retrieves the start form key of this process definition.


Method
------

GET `/process-definition/{id}/startForm`


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
    <td>The id of the process definition to retrieve the form key for.</td>
  </tr>
</table>


Result
------ 

A json object:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>key</td>
    <td>String</td>
    <td>The form key to required to render a start form for the process definition.</td>
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
</table>


Example
-------

#### Request

<!-- TODO: Insert a 'real' example -->
GET `/process-definition/aProcessDefinitionId/startForm`

#### Response

    {"key":"aStartFormKey"}