---

title: "Delete Task Worker Metrics"
weight: 30

menu:
  main:
    identifier: "rest-api-metrics-delete-task-worker"
    parent: "rest-api-metrics"
    pre: "DELETE `/metrics/task-worker`"

---

Deletes all task worker metrics prior to the given date or all if no date is provided.

# Method

DELETE `/metrics/task-worker`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>date</td>
    <td>The date value as string prior to which all task worker metrics should be deleted.</td>
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
    <td>403</td>
    <td>application/json</td>
    <td>If the user who performs the operation is not a <b>camunda-admin</b> user.</td>
  </tr>
</table>


# Example

## Request

DELETE `/metrics/task-worker?date=2020-01-01T00:00:00.000+0200`


## Response

Status 204. No content.
