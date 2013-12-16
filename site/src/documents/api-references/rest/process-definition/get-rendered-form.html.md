---

title: 'Get Rendered Start Form'
category: 'Process Definition'

keywords: 'get'

---

Retrieves the rendered form for a process definition. This method can be used for getting the html rendering of a [Generated Task Form](ref:/guides/user-guide/#tasklist-task-forms-generated-task-forms).

Method
--------------  

GET `/process-definition/{id}/rendered-form`


Parameters
--------------  

#### Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process definition to get the rendered start form for.</td>
  </tr>
</table>


Result
--------------  

An HTML response body providing the rendered (generated) form content.

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
    <td>application/xhtml+xml</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>Process definition with given id does not exist or has no form field metadata defined. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
--------------

#### Request

GET `/process-definition/anId/rendered-form`

#### Response

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