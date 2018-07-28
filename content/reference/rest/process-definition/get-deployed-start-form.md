---

title: "Get Deployed Start Form"
weight: 150

menu:
  main:
    name: "Get Deployed Start Form"
    identifier: "rest-api-process-definition-get-deployed-start-form"
    parent: "rest-api-process-definition"
    pre: "GET `/process-definition/{id}/deployed-start-form`
          </br>
          GET `/process-definition/key/{key}/deployed-start-form`
          </br>
          GET `/process-definition/key/{key}/tenant-id/{tenant-id}/deployed-start-form`"

---

Retrieves the deployed form that can be referenced from a start event. For further information please refer to
<a href="{{< ref "/user-guide/task-forms/_index.md#embedded-task-forms" >}}">User Guide</a>.


# Method

1. GET `/process-definition/{id}/deployed-start-form`

2. GET `/process-definition/key/{key}/deployed-start-form`

3. GET `/process-definition/key/{key}/tenant-id/{tenant-id}/deployed-start-form`



# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process definition to get the deployed start form for.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>The key of the process definition (the latest version thereof) to be retrieved.</td>
  </tr>
  <tr>
    <td>tenant-id</td>
    <td>The id of the tenant the process definitions belong to.</td>
  </tr>
</table>

# Result

An object with the deployed start form content.

# Response Codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>application/xhtml+xml</td>
    <td>Request successful.</td>
  </tr>
   <tr>
    <td>400</td>
    <td>application/json</td>
    <td>The form key has wrong format.
    See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a>
    for the error response format.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>The deployed start form cannot be retrieved due to missing permissions on process definition resource.
    See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a>
    for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>No deployed start form for a given process definition exists.
    See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a>
    for the error response format.</td>
  </tr>
</table>

# Example

## Request

GET `/process-definition/processDefinitionId/deployed-start-form` <br>
GET `/process-definition/key/processDefinitionKey/deployed-start-form` <br>
GET `/process-definition/key/processDefinitionKey/tenant-id/tenantId/deployed-start-form`

## Response

```xml
<form role="form" name="invoiceForm"
      class="form-horizontal">

  <div class="form-group">
    <label class="control-label col-md-4"
           for="creditor">Creditor</label>
    <div class="col-md-8">
      <input cam-variable-name="creditor"
             cam-variable-type="String"
             id="creditor"
             class="form-control"
             type="text"
             required />
      <div class="help">
        (e.g. &quot;Great Pizza for Everyone Inc.&quot;)
      </div>
    </div>
  </div>

</form>
```
