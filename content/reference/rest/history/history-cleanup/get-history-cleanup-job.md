---

title: "Find clean up history job (GET)"
weight: 60

menu:
  main:
    name: "Find clean up history job (GET)"
    identifier: "rest-api-history-cleanup-job"
    parent: "rest-api-history-cleanup"
    pre: "GET `/history/cleanup/job`"

---
<b>Deprecated!</b> Use `GET /history/cleanup/jobs` instead.

Finds history cleanup job (See [History cleanup]({{< ref "/user-guide/process-engine/history.md#job-progress">}})).

# Method

GET `/history/cleanup/job`


# Parameters

## Query Parameters

Not used

## Request Body

Not used

# Result

A JSON object representing scheduled job.
See [Get Job]({{<ref "/reference/rest/job/get.md#result" >}}) for the structure and example.

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
    <td>History clean up job does not exist</td>
  </tr>
</table>

# Example

## Request

GET `/history/cleanup/job`

## Response

```json
{
    "id":"074bd92a-1a95-11e7-8ceb-34f39ab71d4e",
    "jobDefinitionId":null,
    "processInstanceId":null,
    "processDefinitionId":null,
    "processDefinitionKey":null,
    "executionId":null,
    "exceptionMessage":null,
    "retries":3,
    "dueDate":"2017-04-06T13:57:45.000+0200",
    "suspended":false,
    "priority":0,
    "tenantId":null,
    "createTime": "2017-05-05T17:00:00+0200"
}
```
