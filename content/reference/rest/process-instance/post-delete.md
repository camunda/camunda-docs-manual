---

title: 'Delete Async (POST)'
weight: 110

menu:
  main:
    name: "Delete Async (POST)"
    identifier: "rest-api-process-instance-post-delete-async"
    parent: "rest-api-process-instance"
    pre: "POST `/process-instance/delete`"

---


Delete multiple process instances asynchronously (batch).


# Method

POST `/process-instance/delete`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processInstanceIds</td>
    <td>A list process instance ids to delete.</td>
  </tr>
  <tr>
    <td>processInstanceQuery</td>
    <td>
      A process instance query like the request body described by
      <a href="{{< relref "reference/rest/process-instance/post-query.md#request-body" >}}">
        <code>POST /process-instance</code>
      </a>.
    </td>
  </tr>
  <tr>
    <td>deletionReason</td>
    <td>A string with deletion reason.</td>
  </tr>
</table>


# Response Codes

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
    <td>Returned if some of the query parameters are invalid, i.e. neither processInstanceIds, nor processInstanceQuery is present. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/process-instance/delete`

Request Body:

    {
    "deletionReason" : "aReason",
    "processInstanceIds": ["aProcess","secondProcess"]
    }

## Response

Status 200 OK