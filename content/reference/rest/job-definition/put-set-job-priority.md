---

title: "Set Job Definition Priority by Id"
weight: 60

menu:
  main:
    name: "Set Priority"
    identifier: "rest-api-job-definition-put-set-job-definition-priority"
    parent: "rest-api-job-definition"
    pre: "PUT `/job-definition/{id}/jobPriority`"

---


Sets an overriding execution priority for jobs with the given definition id. Optionally, the priorities of all the definition's existing jobs are updated accordingly. The priority can be reset by setting it to <code>null</code>, meaning that a new job's priority will not be determined based on its definition's priority any longer. See the [user guide on job prioritization]({{< relref "user-guide/process-engine/the-job-executor.md#set-job-definition-priorities-via-managementservice-api" >}}) for details.

# Method

PUT `/job-definition/{id}/jobPriority`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the job definition to be updated.</td>
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
    <td>priority</td>
    <td>The new execution priority number for jobs of the given definition. The definition's priority can be reset by using the value <code>null</code>. In that case, the job definition's priority no longer applies but a new job's priority is determined as specified in the process model.</td>
  </tr>
  <tr>
    <td>includeJobs</td>
    <td>A boolean value indicating whether existing jobs of the given definition should receive the priority as well. Default value is <code>false</code>. Can only be <code>true</code> when the <i>priority</i> parameter is not <code>null</code>.
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
    <td>Job definition with given id does not exist. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The retries could not be set successfully. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

PUT <code>/job-definition/aJobDefId/jobPriority</code>

Request Body:

    {
      "priority": 10,
      "includeJobs": true
    }

## Response

  Status 204. No content.
