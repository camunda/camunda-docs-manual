---

title: 'Get Job Logs Count'
category: 'History'

keywords: 'historic get query count job log'

---


Query for the number of historic job logs that fulfill the given parameters.
Takes the same parameters as the [get historic job logs](ref:#history-get-job-logs) method.


Method
------

GET `/history/job-log/count`


Parameters
----------

#### Query Parameters

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
    <td>jobDefinitionId</td>
    <td>Filter by job definition id.</td>
  </tr>
  <tr>
    <td>activityIdIn</td>
    <td>Only include historic job logs which belong to one of the passed activity ids.</td>
  </tr>
  <tr>
    <td>jobHandlerType</td>
    <td>Filter by job handler type.</td>
  <tr>
    <td>executionIdIn</td>
    <td>Only include historic job logs which belong to one of the passed execution ids.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by process instance id.</td>
  </tr>
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
    <td>jobExceptionMessage</td>
    <td>Filter by job exception message.</td>
  </tr>
  <tr>
    <td>jobTimers</td>
    <td>Only select historic job logs for timers. Cannot be used together with <code>jobMessages</code>.</td>
  </tr>
  <tr>
    <td>jobMessages</td>
    <td>Only select historic job logs for messages. Cannot be used together with <code>jobTimers</code>.</td>
  </tr>
  <tr>
    <td>creationLog</td>
    <td>Only include creation logs. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>failureLog</td>
    <td>Only include failure logs. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>successLog</td>
    <td>Only include success logs. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
  <tr>
    <td>deletionLog</td>
    <td>Only include deletion logs. Values may be <code>true</code> or <code>false</code>.</td>
  </tr>
</table>


Result
------

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


Response codes
--------------

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
    <td>Returned if some of the query parameters are invalid.</td>
  </tr>
</table>


Example
-------

#### Request

GET `/history/job-log/count?jobId=aJobId`

#### Response

```json
{
  "count": 1
}
```
