---

title: "Get Job Definitions (POST)"
weight: 40

menu:
  main:
    name: "Get List (POST)"
    identifier: "rest-api-job-definition-post-query"
    parent: "rest-api-job-definition"
    pre: "POST `/job-definition`"

---


Queries for job definitions that fulfill given parameters. This method is slightly more powerful than the [Get Job Definitions]({{< relref "reference/rest/job-definition/get-query.md" >}}) method because it allows filtering by multiple job definitions of types <code>String</code>, <code>Number</code> or <code>Boolean</code>.


# Method

POST `/job-definition`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
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

## Request Body

A JSON object with the following properties:

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
    <td>Only include job definitions which belong to one of the passed activity ids.</td>
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
    <td>Only include job definitions which exist for the given job type. See the <a href="{{< relref "user-guide/process-engine/the-job-executor.md#job-creation" >}}">User Guide</a> for more information about job types.</td>
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
    <td>sorting</td>
    <td>
        A JSON array of criteria to sort the result by. Each element of the array is a JSON object that specifies one ordering. The position in the array identifies the rank of an ordering, i.e., whether it is primary, secondary, etc. The ordering objects have the following properties:
      <table class="table table-striped">
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>sortBy</td>
          <td><b>Mandatory.</b> Sort the results lexicographically by a given criterion. Valid values are <code>jobDefinitionId</code>, <code>activityId</code>, <code>processDefinitionId</code>, <code>processDefinitionKey</code>, <code>jobType</code>, <code>jobConfiguration</code> and <code>tenantId</code>.</td>
        </tr>
        <tr>
          <td>sortOrder</td>
          <td><b>Mandatory.</b> Sort the results in a given order. Values may be <code>asc</code> for ascending order or <code>desc</code> for descending order.
        </tr>
      </table>
    </td>
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
    <td>The type of the job which is running for this job definition. See the <a href="{{< relref "user-guide/process-engine/the-job-executor.md#job-creation" >}}">User Guide</a> for more information about job types.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST <code>/job-definition</code>

Request Body:

    {
      "activityIdIn":
        [
          ServiceTask1, ServiceTask2
        ],
      "sorting":
        [{"sortBy": "activityId",
        "sortOrder": "asc"
        },
        {"sortBy": "jobType",
        "sortOrder": "asc"
        }]
    }

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
        "tenantId": null
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
        "tenantId": null
      }
    ]
