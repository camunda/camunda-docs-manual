---

title: "Get External Task Count"
weight: 30

menu:
  main:
    name: "Get List Count"
    identifier: "rest-api-external-task-get-query-count"
    parent: "rest-api-external-task"
    pre: "GET `/external-task/count`"

---


Query for the number of external tasks that fulfill given parameters.
Takes the same parameters as the [get external tasks]({{< relref "reference/rest/external-task/get-query.md" >}}) method.


# Method

GET `/external-task/count`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>externalTaskId</td>
    <td>Filter by an external task's id.</td>
  </tr>
  <tr>
    <td>topicName</td>
    <td>Filter by an external task topic.</td>
  </tr>
  <tr>
    <td>workerId</td>
    <td>Filter by the id of the worker that the task was most recently locked by.</td>
  </tr>
  <tr>
    <td>locked</td>
    <td>Only include external tasks that are currently locked (i.e. they have a lock time and it has not expired). Value may only be <code>true</code>, as <code>false</code> matches any external task.</td>
  </tr>
  <tr>
    <td>notLocked</td>
    <td>Only include external tasks that are currently not locked (i.e. they have no lock or it has expired). Value may only be <code>true</code>, as <code>false</code> matches any external task.</td>
  </tr>
  <tr>
    <td>withRetriesLeft</td>
    <td>Only include external tasks that have a positive (&gt; 0) number of retries (or <code>null</code>). Value may only be <code>true</code>, as <code>false</code> matches any external task.</td>
  </tr>
  <tr>
    <td>noRetriesLeft</td>
    <td>Only include external tasks that have 0 retries. Value may only be <code>true</code>, as <code>false</code> matches any external task.</td>
  </tr>
  <tr>
    <td>lockExpirationAfter</td>
    <td>Restrict to external tasks that have a lock that expires after a given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>lockExpirationBefore</td>
    <td>Restrict to external tasks that have a lock that expires before a given date. The date must have the format <code>yyyy-MM-dd'T'HH:mm:ss</code>, e.g., <code>2013-01-23T14:42:45</code>.</td>
  </tr>
  <tr>
    <td>activityId</td>
    <td>Filter by the id of the activity that an external task is created for.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>Filter by the id of the execution that an external task belongs to.</td>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>Filter by the id of the process instance that an external task belongs to.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>Filter by the id of the process definition that an external task belongs to.</td>
  </tr>
  <tr>
    <td>tenantIdIn</td>
    <td>Filter by a comma-separated list of tenant ids. An external task must have one of the given tenant ids.</td>
  </tr>
  <tr>
    <td>active</td>
    <td>Only include active tasks. Value may only be <code>true</code>, as <code>false</code> matches any external task.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Only include suspended tasks. Value may only be <code>true</code>, as <code>false</code> matches any external task.</td>
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
    <td>The number of matching external tasks.</td>
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

GET `/external-task/count?topicName=aTopic`

## Response

    {"count": 42}
