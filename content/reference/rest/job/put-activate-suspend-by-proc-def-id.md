---

title: "Activate/Suspend Jobs By Process Definition Id"
weight: 130

menu:
  main:
    name: "Activate/Suspend By Process Definition Id"
    identifier: "rest-api-job-put-activate-suspend-by-proc-def-id"
    parent: "rest-api-job"
    pre: "PUT `/job/suspended`"

---


Activate or suspend jobs with the given process definition id.

# Method

PUT `/job/suspended`

# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>The process definition id of the jobs to activate or suspend.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend all jobs with the given process definition id. When the value is set to <code>true</code>, all jobs with the given process definition id will be suspended and when the value is set to <code>false</code>, all jobs with the given process definition id will be activated.</td>
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
    <td>Returned if some of the request parameters are invalid, for example if the <code>processDefinitionId</code> parameter is null. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

PUT `/job/suspended`

    {
      "processDefinitionId" : "aProcessDefinitionId",
      "suspended" : true
    }

## Response

Status 204. No content.
