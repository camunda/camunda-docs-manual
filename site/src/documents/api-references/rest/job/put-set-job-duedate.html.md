---

title: 'Set Job Due Date'
category: 'Job'

keywords: 'put'

---


Updates the due date of a job.


## Method

PUT `/job/{id}/duedate`


## Parameters

#### Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the job to be retrieved.</td>
  </tr>
</table>

#### Request Body

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
</table>


## Result

This method returns no content.


## Response codes

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
    <td>Job with given id does not exist. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr><br>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The due date could not be set successfully. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


## Example

#### Request

PUT `/job/aJobId/duedate`

Request body:

    {"duedate": "2013-08-13 18:43:28"}

#### Response

Status 204. No content.