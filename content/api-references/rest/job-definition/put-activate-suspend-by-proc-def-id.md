---

title: "Activate/Suspend Job Definitions By Process Definition Id"
weight: 90

menu:
  main:
    identifier: "rest-api-job-definition-put-activate-suspend-by-proc-def-id"
    parent: "rest-api-job-definition"

---


Activate or suspend job definitions with the given process definition id.

Method
------

PUT `/job-definition/suspended`

Parameters
----------

#### Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>The process definition id of the job definitions to activate or suspend.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend all job definitions with the given process definition id. When the value is set to <code>true</code>, all job definitions with the given process definition id will be suspended and when the value is set to <code>false</code>, all job definitions with the given process definition id will be activated.</td>
  </tr>
  <tr>
    <td>includeJobs</td>
    <td>A <code>Boolean</code> value which indicates whether to activate or suspend also all jobs of the job definitions with the given process definition id. When the value is set to <code>true</code>, all jobs of the job definitions with the given process definition id will be activated or suspended and when the value is set to <code>false</code>, the suspension state of all jobs of the job definitions with the given process definition id will not be updated.</td>
  </tr>
  <tr>
    <td>executionDate</td>
    <td>The date on which all job definitions with the given process definition id will be activated or suspended. If null, the suspension state of all job definitions with the given process definition id is updated immediately. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
</table>


Result
------

This method returns no content.


Response codes
--------------

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
    <td>Returned if some of the request parameters are invalid, for example if the provided <code>executionDate</code> parameter doesn't have the expected format or if the <code>processDefinitionId</code> parameter is null. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>


Example
-------

#### Request

PUT `/job-definition/suspended`

    {
      "processDefinitionId" : "aProcessDefinitionId",
      "suspended" : true,
      "includeJobs" : true,
      "executionDate" : "2013-11-21T10:49:45"
    }

#### Response

Status 204. No content.
