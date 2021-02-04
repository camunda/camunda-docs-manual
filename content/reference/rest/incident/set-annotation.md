---

title: "Set Incident Annotation"
weight: 50

menu:
  main:
    name: "Set Incident Annotation"
    identifier: "rest-api-incident-set-incident-annotation"
    parent: "rest-api-incident"
    pre: "PUT `/incident/{id}/annotation`"

---


Sets the annotation of an incident with the given id.

# Method

PUT `/incident/{id}/annotation`

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the incident to set the annotation at.</td>
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
    <td>An arbitrary text annotation set by a user.</td>
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
    <td>Returned if no incident can be found for the given id. See the <a href="{{< ref 
    "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

PUT `/incident/a02a5890-ad41-11e9-8609-d5bbb7c7e9e3/annotation`

Request Body:

```json
{
  "annotation": "Cannot identify root cause"
}
```

## Response

Status 204. No content.