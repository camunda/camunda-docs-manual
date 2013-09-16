---

title: 'Get Single Definition'
category: 'Process Definition'

---


Retrieves a single process definition according to the ProcessDefinition interface in the engine.


Method
------

GET `/process-definition/{id}`


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
    <td>The id of the process definition to be retrieved.</td>
  </tr>
</table>


Result
------

A json object corresponding to the ProcessDefinition interface in the engine.
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
    <td>The id of the process definition.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>String</td>
    <td>The key of the process definition, i.e. the id of the BPMN 2.0 XML process definition.</td>
  </tr>
  <tr>
    <td>category</td>
    <td>String</td>
    <td>The category of the process definition.</td>
  </tr>
  <tr>
    <td>description</td>
    <td>String</td>
    <td>The description of the process definition.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the process definition.</td>
  </tr>
  <tr>
    <td>version</td>
    <td>Number</td>
    <td>The version of the process definition that the engine assigned to it.</td>
  </tr>
  <tr>
    <td>resource</td>
    <td>String</td>
    <td>The file name of the process definition.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>String</td>
    <td>The id of the process definition.</td>
  </tr>
  <tr>
    <td>diagram</td>
    <td>String</td>
    <td>The file name of the process definition diagram, if exists.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Boolean</td>
    <td>A flag indicating whether the definition is suspended.</td>
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
    <td>application/json</td>
    <td>Process definition with given id does not exist.  See the <a href="#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

<!-- TODO: Insert a 'real' example -->
GET `/process-definition/aProcessDefinitionId`

#### Response

    {"id":"aProcessDefinitionId",
    "key":"aKey",
    "category":"aCategory",
    "description":"aDescription",
    "name":"aName",
    "version":42,
    "resource":"aResourceName",
    "deploymentId":"aDeploymentId",
    "diagram":"aResourceName",
    "suspended":true}