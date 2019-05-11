---

title: "Recalculate Job Due Date"
weight: 75

menu:
  main:
    name: "Recalculate Due Date"
    identifier: "rest-api-job-post-recalculate-job-duedate"
    parent: "rest-api-job"
    pre: "POST `/job/{id}/duedate/recalculate`"    

---


Recalculates the due date of a job by id.


# Method

POST `/job/{id}/duedate/recalculate`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the job to be updated.</td>
  </tr>
</table>


## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>creationDateBased</td>
    <td>Recalculate the due date based on the creation date of the job or the current date. Value may only be <code>false</code>, as <code>true</code> is the default behavior. </td>
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
    <td>404</td>
    <td>application/json</td>
    <td>Job with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr><br>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The due date could not be recalculated successfully. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/job/aJobId/duedate/recalculate`

POST `/job/aJobId/duedate/recalculate?creationDateBased=false`

## Response

Status 204. No content.
