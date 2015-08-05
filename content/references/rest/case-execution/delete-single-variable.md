---

title: "Delete Single Case Execution Variable"
weight: 230

menu:
  main:
    identifier: "rest-api-case-execution-delete-single-variable"
    parent: "rest-api-case-execution"

---


Deletes a variable of a given case execution.


Method
------

DELETE `/case-execution/{id}/variables/{varId}`


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
    <td>The id of the case execution to delete the variable from.</td>
  </tr>
  <tr>
    <td>varId</td>
    <td>The name of the variable to delete.</td>
  </tr>
</table>


Result
------

This method returns no content.


Response codes
--------------

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
</table>


Example
-------

#### Request

DELETE `/case-execution/aCaseExecutionId/variables/aVarName`


#### Response

Status 204. No content.
