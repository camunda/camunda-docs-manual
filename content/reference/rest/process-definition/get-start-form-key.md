---

title: 'Get Start Form Key'
weight: 70

menu:
  main:
    identifier: "rest-api-process-definition-get-start-form-key"
    parent: "rest-api-process-definition"
    pre: "GET `/process-definition/{id}/startForm`
          </br>
          GET `/process-definition/key/{key}/startForm`
          </br>
          GET `/process-definition/key/{key}/tenant-id/{tenant-id}/startForm`"

---


Retrieves the key of the start form for a process definition. The form key corresponds to the `FormData#formKey` property in the engine.


# Method

GET `/process-definition/{id}/startForm`

GET `/process-definition/key/{key}/startForm` (returns the key of the start form for the latest version of process definition which belongs to no tenant)

GET `/process-definition/key/{key}/tenant-id/{tenant-id}/startForm` (returns the key of the start form for the latest version of process definition for tenant)

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process definition to get the start form for.</td>
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

A JSON object containing the form key.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>key</td>
    <td>String</td>
    <td>The form key for the process definition.</td>
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
    <td>400</td>
    <td>application/json</td>
    <td>Process definition has no start form defined. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Process definition with given key does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/process-definition/anId/startForm`

GET `/process-definition/key/aKey/startForm`

## Response

    {"key":"aFormKey"}
