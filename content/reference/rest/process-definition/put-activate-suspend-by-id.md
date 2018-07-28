---

title: 'Activate/Suspend Process Definition By Id'
weight: 130

menu:
  main:
    name: "Activate/Suspend By Id"
    identifier: "rest-api-process-definition-activate-suspend-by-id"
    parent: "rest-api-process-definition"
    pre: "PUT `/process-definition/{id}/suspended`
          </br>
          PUT `/process-definition/key/{key}/suspended`
          </br>
          PUT `/process-definition/key/{key}/tenant-id/{tenant-id}/suspended`"

---


Activates or suspends a given process definition by id or by latest version of process definition key.

# Method

PUT `/process-definition/{id}/suspended`

PUT `/process-definition/key/{key}/suspended` (suspend the latest version of the process definition which belongs to no tenant)

PUT `/process-definition/key/{key}/tenant-id/{tenant-id}/suspended` (suspended the latest version of the process definition for tenant)


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process definition to activate or suspend.</td>
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


## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>suspended</td>
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend a given process definition. When the value is set to <code>true</code>, the given process definition will be suspended and when the value is set to <code>false</code>, the given process definition will be activated.</td>
  </tr>
  <tr>
    <td>includeProcessInstances</td>
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend also all process instances of the given process definition. When the value is set to <code>true</code>, all process instances of the provided process definition will be activated or suspended and when the value is set to <code>false</code>, the suspension state of all process instances of the provided process definition will not be updated.</td>
  </tr>
  <tr>
    <td>executionDate</td>
    <td>The date on which the given process definition will be activated or suspended. If null, the suspension state of the given process definition is updated immediately. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
</table>


# Result

This method returns no content.


# Response Codes

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
    <td>Returned if some of the request parameters are invalid, for example if the provided <code>executionDate</code> parameter doesn't have the expected format. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Process definition with given key does not exist. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

PUT `/process-definition/aProcessDefinitionId/suspended`

PUT `/process-definition/key/aProcessDefinitionKey/suspended`

    {
      "suspended" : true,
      "includeProcessInstances" : true,
      "executionDate" : "2013-11-21T10:49:45"
    }

## Response

Status 204. No content.
