---

title: 'Get Rendered Start Form'
weight: 60

menu:
  main:
    identifier: "rest-api-process-definition-get-rendered-start-form"
    parent: "rest-api-process-definition"
    pre: "GET `/process-definition/{id}/rendered-form`
          </br>
          GET `/process-definition/key/{key}/rendered-form`
          </br>
          GET `/process-definition/key/{key}/tenant-id/{tenant-id}/rendered-form`"

---

Retrieves the rendered form for a process definition. This method can be used for getting the HTML rendering of a [Generated Task Form]({{< relref "user-guide/task-forms/_index.md#generated-task-forms" >}}).

# Method

GET `/process-definition/{id}/rendered-form`

GET `/process-definition/key/{key}/rendered-form` (returns the rendered form for the latest version of the process definition which belongs to no tenant)

GET `/process-definition/key/{key}/tenant-id/{tenant-id}/rendered-form` (returns the rendered form for the latest version of the process definition for tenant)

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process definition to get the rendered start form for.</td>
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

An HTML response body providing the rendered (generated) form content.

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
    <td>Process definition has no form field metadata defined. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>Process definition with given key does not exist. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/process-definition/anId/rendered-form`

GET `/process-definition/key/aKey/rendered-form`

## Response

```xml
<form class="form-horizontal">
  <div class="control-group">
    <label class="control-label">Customer ID</label>
    <div class="controls">
      <input form-field type="string" name="customerId"></input>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label">Amount</label>
    <div class="controls">
      <input form-field type="number" name="amount"></input>
    </div>
  </div>
</form>
```
