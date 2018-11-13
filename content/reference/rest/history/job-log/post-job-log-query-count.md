---

title: "Get Job Log Count (POST)"
weight: 50

menu:
  main:
    name: "Get List Count (POST)"
    identifier: "rest-api-history-post-job-log-query-count"
    parent: "rest-api-history-job-log"
    pre: "POST `/history/job-log/count`"

---


Queries for the number of historic job logs that fulfill the given parameters.
This method takes the same message body as the [Get Job Logs (POST)]({{< ref "/reference/rest/history/job-log/post-job-log-query.md" >}}) method and therefore it is slightly more powerful than the [Get Job Log Count]({{< ref "/reference/rest/history/job-log/get-job-log-query-count.md" >}}) method.


# Method

POST `/history/job-log/count`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>logId</td>
    <td>Filter by historic job log id.</td>
  </tr>
  <tr>
    <td>jobId</td>
    <td>Filter by job id.</td>
  </tr>
  <tr>
    <td>jobExceptionMessage</td>
    <td>Filter by job exception message.</td>
  </tr>
  <tr>
    <td>jobDefinitionId</td>
    <td>Filter by job definition id.</td>
  </tr>
  <tr>
    <td>jobDefinitionType</td>
    <td>Filter by job definition type.</td>
  </tr>
  <tr>
    <td>jobDefinitionConfiguration</td>
    <td>Filter by job definition configuration.</td>
  </tr>
  <tr>
    <td>activityIdIn</td>
    <td>Only include historic job logs which belong to one of the passed activity ids.</td>
  </tr>
  <tr>
    <td>executionIdIn</td>
    <td>Only include historic job logs which belong to one of the passed execution ids.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by process instance id.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Filter by process definition id.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>Filter by process definition key.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>Filter by deployment id.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Only include historic job log entries which belong to one of the passed and comma-separated tenant ids.</td>
  </tr>
  <tr>
    <td>jobPriorityLowerThanOrEquals</td>
    <td>Only include logs for which the associated job had a priority lower than or equal to the given value. Value must be a valid <code>long</code> value.</td>
  </tr>
  <tr>
    <td>jobPriorityHigherThanOrEquals</td>
    <td>Only include logs for which the associated job had a priority higher than or equal to the given value. Value must be a valid <code>long</code> value.</td>
  </tr>
  <tr>
    <td>creationLog</td>
    <td>Only include creation logs. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>failureLog</td>
    <td>Only include failure logs. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>successLog</td>
    <td>Only include success logs. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>deletionLog</td>
    <td>Only include deletion logs. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
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
    <td>The number of matching historic job logs.</td>
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
    <td>Returned if some of the query parameters are invalid. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/history/job-log/count`

Request Body:

```json
{
  "jobId": "aJobId"
}
```

## Response

```json
{
  "count": 1
}
```
