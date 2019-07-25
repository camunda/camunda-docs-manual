
---

title: "Set Annotation to an User Operation Log (Historic)"
weight: 30

menu:
  main:
    name: "Set Annotation"
    identifier: "rest-api-history-set-user-operation-log-annotation"
    parent: "rest-api-history-user-operation-log"
    pre: "PUT `/history/user-operation/{operationId}/set-annotation`"

---

Set an annotation for auditing reasons.

# Method

PUT `/history/user-operation/{operationId}/set-annotation`

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

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>annotation</td>
    <td>An arbitrary text annotation set by a user for auditing reasons.</td>
  </tr>
</table>

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

PUT `/history/user-operation/a02a5890-ad41-11e9-8609-c6bbb7c7e9e3/set-annotation`

Request Body:

```json
{
  "annotation": "Instances restarted due to wrong turn"
}
```

## Response

Status 204. No content.