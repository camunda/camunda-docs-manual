---

title: "Activate/Suspend Job Definitions By Process Definition Key"
weight: 100

menu:
  main:
    name: "Activate/Suspend By Process Definition Key"
    identifier: "rest-api-job-definition-put-activate-suspend-by-proc-def-key"
    parent: "rest-api-job-definition"
    pre: "PUT `/job-definition/suspended`"

---


Activates or suspends job definitions with the given process definition key.

# Method

PUT `/job-definition/suspended`

# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>The process definition key of the job definitions to activate or suspend.</td>
  </tr>
  <tr>
    <td>processDefinitionTenantId</td>
    <td>Only activate or suspend job definitions of a process definition which belongs to a tenant with the given id.</td>
  </tr>
  <tr>
    <td>processDefinitionWithoutTenantId</td>
    <td>Only activate or suspend job definitions of a process definition which belongs to no tenant. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend all job definitions with the given process definition key. When the value is set to <code>true</code>, all job definitions with the given process definition key will be suspended and when the value is set to <code>false</code>, all job definitions with the given process definition key will be activated.</td>
  </tr>
  <tr>
    <td>includeJobs</td>
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend also all jobs of the job definitions with the given process definition key. When the value is set to <code>true</code>, all jobs of the process definitions with the given process definition key will be activated or suspended and when the value is set to <code>false</code>, the suspension state of all jobs of the process definitions with the given process definition key will not be updated.</td>
  </tr>
  <tr>
    <td>executionDate</td>
    <td>The date on which all job definitions with the given process definition key will be activated or suspended. If null, the suspension state of all job definitions with the given process definition key is updated immediately. By default*, the date must have the format <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>, e.g., <code>2013-01-23T14:42:45.000+0200</code>.</td>
  </tr>
</table>

\* For further information, please see the <a href="{{< relref "reference/rest/overview/date-format.md" >}}"> documentation</a>.

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
    <td>Returned if some of the request parameters are invalid, for example if the provided <code>executionDate</code> parameter doesn't have the expected format or if the <code>processDefinitionKey</code> parameter is null. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

PUT `/job-definition/suspended`

    {
      "processDefinitionKey" : "aProcessDefinitionKey",
      "suspended" : true,
      "includeJobs" : true,
      "executionDate" : "2013-11-21T10:49:45.000+0200"
    }

## Response

Status 204. No content.
