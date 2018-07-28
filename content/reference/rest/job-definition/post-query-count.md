---

title: "Get Job Definition Count (POST)"
weight: 50

menu:
  main:
    name: "Get List Count (POST)"
    identifier: "rest-api-job-definition-post-query-count"
    parent: "rest-api-job-definition"
    pre: "POST `/job-definition/count`"

---


Queries for the number of job definitions that fulfill given parameters. This method takes the same message body as the [Get Job Definitions (POST)]({{< relref "reference/rest/job-definition/post-query.md" >}}) method and therefore it is slightly more powerful than the [Get Job Definition Count]({{< relref "reference/rest/job-definition/get-query-count.md" >}}) method.


# Method

POST `/job-definition/count`


# Parameters

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
</table>


# Result

A JSON object that contains the count as the only property.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>count</td>
    <td>Number</td>
    <td>The number of matching executions.</td>
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
    <td>Returned if some of the query parameters are invalid, for example if a <code>sortOrder</code> parameter is supplied, but no <code>sortBy</code>. See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

<!-- TODO: Insert a 'real' example -->
POST <code>/job-definition/count</code>

Request Body:

    {
      "activityIdIn":
        [
          ServiceTask1, ServiceTask2
        ]
    }

## Response

    {"count": 2}
