---

title: "Get Job Definitions"
weight: 10

menu:
  main:
    name: "Get List"
    identifier: "rest-api-job-definition-get-query"
    parent: "rest-api-job-definition"
    pre: "GET `/job-definition`"

---


Queries for job definitions that fulfill given parameters.
The size of the result set can be retrieved by using the [Get Job Definition Count]({{< ref "/reference/rest/job-definition/get-query-count.md" >}}) method.


# Method

GET `/job-definition`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>jobDefinitionId</td>
    <td>Filter by job definition id.</td>
  </tr>
  <tr>
    <td>activityIdIn</td>
    <td>Only include job definitions which belong to one of the passed and comma-separated activity ids.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Only include job definitions which exist for the given process definition id.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Only include job definitions which exist for the given process definition key.</td>
  </tr>
  <tr>
    <td>jobType</td>
    <td>Only include job definitions which exist for the given job type. See the <a href="{{< ref "/user-guide/process-engine/the-job-executor.md#job-creation" >}}">User Guide</a> for more information about job types.</td>
  </tr>
  <tr>
    <td>jobConfiguration</td>
    <td>Only include job definitions which exist for the given job configuration. For example: for timer jobs it is the timer configuration.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Only include active job definitions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Only include suspended job definitions. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>withOverridingJobPriority</td>
    <td>Only include job definitions that have an overriding job priority defined. The only effective value is <code>true</code>. If set to <code>false</code>, this filter is not applied.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Only include job definitions which belong to one of the passed and comma-separated tenant ids.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>Only include job definitions which belong to no tenant. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>includeJobDefinitionsWithoutTenantId</td>
    <td>Include job definitions which belong to no tenant. Can be used in combination with <code>tenantIdIn</code>. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>sortBy</td>
    <td>Sort the results lexicographically by a given criterion. Valid values are
    <code>jobDefinitionId</code>, <code>activityId</code>, <code>processDefinitionId</code>, <code>processDefinitionKey</code>, <code>jobType</code>, <code>jobConfiguration</code> and <code>tenantId</code>.
    Must be used in conjunction with the <code>sortOrder</code> parameter.</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
    Must be used in conjunction with the <code>sortBy</code> parameter.</td>
  </tr>
  <tr>
    <td>firstResult</td>
    <td>Pagination of results. Specifies the index of the first result to return.</td>
  </tr>
  <tr>
    <td>maxResults</td>
    <td>Pagination of results. Specifies the maximum number of results to return. Will return less results if there are no more results left.</td>
  </tr>
</table>


# Result

A JSON array of job definition objects.
Each job definition object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the job definition.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition this job definition is associated with.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>String</td>
    <td>The key of the process definition this job definition is associated with.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>String</td>
    <td>The id of the activity this job definition is associated with.</td>
  </tr>
  <tr>
    <td>jobType</td>
    <td>String</td>
    <td>The type of the job which is running for this job definition. See the <a href="{{< ref "/user-guide/process-engine/the-job-executor.md#job-creation" >}}">User Guide</a> for more information about job types.</td>
  </tr>
  <tr>
    <td>jobConfiguration</td>
    <td>String</td>
    <td>The configuration of a job definition provides details about the jobs which will be created. For example: for timer jobs it is the timer configuration.</td>
  </tr>
  <tr>
    <td>overridingJobPriority</td>
    <td>Number</td>
    <td>The execution priority defined for jobs that are created based on this definition. May be <code>null</code> when the priority has not been overridden on the job definition level.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Boolean</td>
    <td>Indicates whether this job definition is suspended or not.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The id of the tenant this job definition is associated with.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>String</td>
    <td>The id of the deployment this job definition is related to. In a deployment-aware setup, this leads to all jobs of the same definition being executed on the same node.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

<!-- TODO: Insert a 'real' example -->
GET <code>/job-definition?activityIdIn=ServiceTask1,ServiceTask2</code>

## Response

    [
      {
        "id": "aJobDefId",
        "processDefinitionId": "aProcDefId",
        "processDefinitionKey": "aProcDefKey",
        "activityId": "ServiceTask1",
        "jobType": "asynchronous-continuation",
        "jobConfiguration": "",
        "suspended": false,
        "overridingJobPriority": 15,
        "tenantId": null,
		"deploymentId": "aDeploymentId"
      },
      {
        "id": "aJobDefId",
        "processDefinitionId": "aProcDefId",
        "processDefinitionKey": "aProcDefKey",
        "activityId": "ServiceTask2",
        "jobType": "asynchronous-continuation",
        "jobConfiguration": "",
        "suspended": true,
        "overridingJobPriority": null,
        "tenantId": null,
		"deploymentId": "aDeploymentId"
      }
    ]
