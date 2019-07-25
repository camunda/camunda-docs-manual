---

title: "Clear Annotation of an User Operation Log (Historic)"
weight: 40

menu:
  main:
    name: "Clear Annotation"
    identifier: "rest-api-history-clear-user-operation-log-annotation"
    parent: "rest-api-history-user-operation-log"
    pre: "PUT `/history/user-operation/{operationId}/clear-annotation`"

---

Clear the annotation which was previously set for auditing reasons.

# Method

PUT `/history/user-operation/{operationId}/clear-annotation`

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>operationId</td>
    <td>The operation id of the operation log to be updated.</td>
  </tr>
</table>

## Request Body

No request body.

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
    <td>Returned if some of the request parameters are invalid, for example if the 
    <code>operationId</code> path parameter value does not exists. See the <a href="{{< ref 
    "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

PUT `/history/user-operation/a02a5890-ad41-11e9-8609-c6bbb7c7e9e3/clear-annotation`

## Response

Status 204. No content.