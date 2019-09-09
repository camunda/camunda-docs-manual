---

title: "Set Job Due Date"
weight: 70

menu:
  main:
    name: "Update Due Date"
    identifier: "rest-api-job-put-set-job-duedate"
    parent: "rest-api-job"
    pre: "PUT `/job/{id}/duedate`"    

---


Updates the due date of a job by id.


# Method

PUT `/job/{id}/duedate`


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

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>duedate</td>
    <td>The date to set when the job has the next execution.</td>
  </tr>
  <tr>
    <td>cascade</td>
    <td>A boolean value to indicate if modifications to the due date should cascade to subsequent jobs. (e.g. Modify the due date of a timer by +15 minutes. This flag indicates if a +15 minutes should be applied to all subsequent timers.) This flag only affects timer jobs and only works if due date is not null. Default: <code>false</code></td>
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
    <td>The due date could not be set successfully. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

PUT `/job/aJobId/duedate`

Request Body:

    {
      "duedate": "2013-08-13T18:43:28.000+0200",
      "cascade": false
    }

## Response

Status 204. No content.
