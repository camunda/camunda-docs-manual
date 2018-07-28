---

title: 'Get Rendered Task Form'
weight: 150

menu:
  main:
    name: "Get Rendered Form"
    identifier: "rest-api-task-get-rendered-form"
    parent: "rest-api-task"
    pre: "GET `/task/{id}/rendered-form`"

---


Retrieves the rendered form for a task. This method can be used to get the HTML rendering of a [Generated Task Form]({{< relref "user-guide/task-forms/_index.md#generated-task-forms" >}}).

# Method

GET `/task/{id}/rendered-form`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the task to get the rendered form for.</td>
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
    <td>The task with the given id does not exist or has no form field metadata defined for this task. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/task/anId/rendered-form`

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
