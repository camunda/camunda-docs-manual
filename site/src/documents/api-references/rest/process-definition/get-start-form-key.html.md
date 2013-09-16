---

title: 'Get Start Form Key'
category: 'Process Definition'

---


Retrieves the key of the start form for a process definition. The form key corresponds to the `FormData#formKey` property in the engine.


Method
--------------  

GET `/process-definition/{id}/startForm`


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
    <td>The id of the process definition to get the start form for.</td>
  </tr>
</table>


Result
--------------  

A json object containing the form key.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>key</td>
    <td>String</td>
    <td>The for key for the task.</td>
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
    <td>400</td>
    <td>application/json</td>
    <td>Process definition with given id does not exist or has no start form defined. See the <a href="#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
--------------

#### Request

GET `/process-definition/anId/startForm`

#### Response

    {"key":"aFormKey"}