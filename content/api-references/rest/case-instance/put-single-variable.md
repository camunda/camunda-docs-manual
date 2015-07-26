---

title: "Put Single Case Instance Variable"
weight: 120

menu:
  main:
    identifier: "rest-api-case-instance-put-single-variable"
    parent: "rest-api-case-instance"

---


Sets a variable of a given case instance.


Method
------

PUT `/case-instance/{id}/variables/{varId}`


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
    <td>The id of the case instance to set the variable for.</td>
  </tr>
  <tr>
    <td>varId</td>
    <td>The name of the variable to set.</td>
  </tr>
</table>

#### Request Body

A JSON object with the following properties:

<%- @partial('api-references/rest/variables/variable-request.html.md.eco', @, {}) %>

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
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>The variable value or type is invalid, for example if the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example 1
---------

#### Request

PUT `/case-instance/aCaseInstanceId/variables/aVarName`

    {"value" : "someValue", "type": "String"}

#### Response

Status 204. No content.

Example 2
---------

#### Request

PUT `/case-instance/aCaseInstanceId/variables/aVarName`

<%- @partial('api-references/rest/variables/variable-request-example.md', @, {}) %>

#### Response

Status 204. No content.
