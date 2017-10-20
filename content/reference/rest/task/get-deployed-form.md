---

title: "Get Deployed Form"
weight: 150

menu:
  main:
    name: "Get Deployed Form"
    identifier: "rest-api-task-get-deployed-form"
    parent: "rest-api-task"
    pre: "GET `/task/{id}/deployed-form`"

---

Retrieves the deployed form that is referenced from a given task. For further information please refer to 
<a href="{{< relref "user-guide/task-forms/index.md#embedded-task-forms" >}}">User Guide</a>.


# Method

GET `/task/{id}/deployed-form`

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to get the deployed form for.</td>
  </tr>
</table>

# Result

An object with the deployed form content.

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
    See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a>
    for the error response format.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>The deployed form cannot be retrieved due to missing permissions on task resource. 
    See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> 
    for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>No deployed form for a given task exists. 
    See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> 
    for the error response format.</td>
  </tr>
</table>

# Example

## Request

GET `/task/taskId/deployed-form`

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
