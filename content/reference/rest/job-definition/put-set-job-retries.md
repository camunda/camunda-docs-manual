---

title: "Set Job Retries By Job Definition Id"
weight: 70

menu:
  main:
    name: "Set Retries"
    identifier: "rest-api-job-definition-put-set-job-definition-retries"
    parent: "rest-api-job-definition"
    pre: "PUT `/job-definition/{id}/retries`"

---


Set the number of retries of all <strong>failed</strong> jobs associated with the given job definition id.


# Method

PUT `/job-definition/{id}/retries`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the job definition to be retrieved.</td>
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
    <td>retries</td>
    <td>The number of retries to set that a job has left.</td>
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
    <td>500</td>
    <td>application/json</td>
    <td>The retries could not be set successfully. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

PUT <code>/job-definition/aJobDefId/retries</code>

Request Body:

    {"retries": 3}

## Response

  Status 204. No content.
