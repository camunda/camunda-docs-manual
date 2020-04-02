---

title: "Get Job Log"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-history-get-job-log"
    parent: "rest-api-history-job-log"
    pre: "GET `/history/job-log/{id}`"

---


Retrieves a historic job log by id.


# Method

GET `/history/job-log/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the log entry.</td>
  </tr>
</table>


# Result

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the log entry.</td>
  </tr>
  <tr>
    <td>timestamp</td>
    <td>String</td>
    <td>The time when the log entry has been written.</td>
  </tr>
  <tr>
    <td>removalTime</td>
    <td>String</td>
    <td>The time after which the log entry should be removed by the History Cleanup job. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>jobId</td>
    <td>String</td>
    <td>The id of the associated job.</td>
  </tr>
  <tr>
    <td>jobDueDate</td>
    <td>String</td>
    <td>The date on which the associated job is supposed to be processed.</td>
  </tr>
  <tr>
    <td>jobRetries</td>
    <td>Number</td>
    <td>The number of retries the associated job has left.</td>
  </tr>
  <tr>
    <td>jobPriority</td>
    <td>Number</td>
    <td>The execution priority the job had when the log entry was created.</td>
  </tr>
  <tr>
    <td>jobExceptionMessage</td>
    <td>String</td>
    <td>The message of the exception that occurred by executing the associated job.</td>
  </tr>
  <tr>
    <td>failedActivityId</td>
    <td>String</td>
    <td>The id of the activity on which the last exception occurred by executing the associated job.</td>
  </tr>
  <tr>
    <td>jobDefinitionId</td>
    <td>String</td>
    <td>The id of the job definition on which the associated job was created.</td>
  </tr>
  <tr>
    <td>jobDefinitionType</td>
    <td>String</td>
    <td>The job definition type of the associated job. See the <a href="{{< ref "/user-guide/process-engine/the-job-executor.md#job-creation" >}}">User Guide</a> for more information about job definition types.</td>
  </tr>
  <tr>
    <td>jobDefinitionConfiguration</td>
    <td>String</td>
    <td>The job definition configuration type of the associated job.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>String</td>
    <td>The id of the activity on which the associated job was created.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>String</td>
    <td>The execution id on which the associated job was created.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance on which the associated job was created.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition which the associated job belongs to.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>String</td>
    <td>The key of the process definition which the associated job belongs to.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>String</td>
    <td>The id of the deployment which the associated job belongs to.</td>
  </tr>
  <tr>
    <td>rootProcessInstanceId</td>
    <td>String</td>
    <td>The process instance id of the root process instance that initiated the process which the associated job belongs to.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The id of the tenant that this historic job log entry belongs to.</td>
  </tr>
  <tr>
    <td>hostname</td>
    <td>String</td>
    <td>
      The name of the host of the Process Engine where the 
      job of this historic job log entry was executed.
    </td>
  </tr>
  <tr>
    <td>creationLog</td>
    <td>boolean</td>
    <td>A flag indicating whether this log represents the creation of the associated job.</td>
  </tr>
  <tr>
    <td>failureLog</td>
    <td>boolean</td>
    <td>A flag indicating whether this log represents the failed execution of the associated job.</td>
  </tr>
  <tr>
    <td>successLog</td>
    <td>boolean</td>
    <td>A flag indicating whether this log represents the successful execution of the associated job.</td>
  </tr>
  <tr>
    <td>deletionLog</td>
    <td>boolean</td>
    <td>A flag indicating whether this log represents the deletion of the associated job.</td>
  </tr>
</table>

\* For further information, please see the <a href="{{< ref "/reference/rest/overview/date-format.md" >}}"> documentation</a>.

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
    <td>404</td>
    <td>application/json</td>
    <td>Historic job log with given id does not exist. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/history/job-log/someId`

## Response

Status 200.

```json
{
  "id" : "someId",
  "timestamp" : "2015-01-15T15:22:20.000+0200",
  "removalTime": "2018-02-10T14:33:19.000+0200",
  "jobId" : "aJobId",
  "jobDefinitionId" : "aJobDefinitionId",
  "activityId" : "serviceTask",
  "jobType" : "message",
  "jobHandlerType" : "async-continuation",
  "jobDueDate" : null,
  "jobRetries" : 3,
  "jobPriority": 15,
  "jobExceptionMessage" : null,
  "failedActivityId": null,
  "executionId" : "anExecutionId",
  "processInstanceId" : "aProcessInstanceId",
  "processDefinitionId" : "aProcessDefinitionId",
  "processDefinitionKey" : "aProcessDefinitionKey",
  "deploymentId" : "aDeploymentId",
  "rootProcessInstanceId": "aRootProcessInstanceId",
  "tenantId": null,
  "hostname": "aHostname",
  "creationLog" : true,
  "failureLog" : false,
  "successLog" : false,
  "deletionLog" : false
}
```
