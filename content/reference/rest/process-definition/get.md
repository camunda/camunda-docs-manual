---

title: 'Get Single Definition'
weight: 100

menu:
  main:
    name: "Get"
    identifier: "rest-api-process-definition-get-single-definition"
    parent: "rest-api-process-definition"
    pre: "GET `/process-definition/{id}`
          </br>
          GET `/process-definition/key/{key}`
          </br>
          GET `/process-definition/key/{key}/tenant-id/{tenant-id}`"

---


Retrieves a single process definition according to the ProcessDefinition interface in the engine.


# Method

GET `/process-definition/{id}`

GET `/process-definition/key/{key}` (returns the latest version of process definition which belongs to no tenant)

GET `/process-definition/key/{key}/tenant-id/{tenant-id}` (returns the latest version of process definition for tenant)

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process definition to be retrieved.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the process definition (the latest version thereof) to be retrieved.</td>
  </tr>
  <tr>
    <td>tenant-id</td>
    <td>The id of the tenant the process definition belongs to.</td>
  </tr>
</table>

# Result

A JSON object corresponding to the ProcessDefinition interface in the engine.
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
    <td>The deployment id of the process definition.</td>
  </tr>
  <tr>
    <td>diagram</td>
    <td>String</td>
    <td>The file name of the process definition diagram, if it exists.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Boolean</td>
    <td>A flag indicating whether the definition is suspended or not.</td>
  </tr>
   <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the process definition.</td>
  </tr>
  <tr>
    <td>semanticVersion</td>
    <td>String</td>
    <td>The semantic version of the process definition.</td>
  </tr>
</table>


# Response Codes

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
    <td>Process definition with given id or key does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

<!-- TODO: Insert a 'real' example -->
GET `/process-definition/aProcessDefinitionId`

GET `/process-definition/key/aProcessDefinitionKey`

## Response

    {"id":"aProcessDefinitionId",
    "key":"aProcessDefinitionKey",
    "category":"aCategory",
    "description":"aDescription",
    "name":"aName",
    "version":42,
    "resource":"aResourceName",
    "deploymentId":"aDeploymentId",
    "diagram":"aResourceName",
    "suspended":true,
    "tenantId":null,
    "semanticVersion":"1.0.0"}
