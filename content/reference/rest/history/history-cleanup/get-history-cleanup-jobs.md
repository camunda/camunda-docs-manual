---

title: "Find clean up history jobs (GET)"
weight: 40

menu:
  main:
    name: "Find clean up history jobs (GET)"
    identifier: "rest-api-history-cleanup-jobs"
    parent: "rest-api-history-cleanup"
    pre: "GET `/history/cleanup/jobs`"

---
Finds history cleanup jobs (See [History cleanup]({{< ref "/user-guide/process-engine/history.md#job-progress">}})).

# Method

GET `/history/cleanup/jobs`


# Parameters

## Query Parameters

Not used

## Request Body

Not used

# Result

A list of JSON objects representing scheduled jobs.
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
    <td>History clean up jobs are empty.</td>
  </tr>
</table>

# Example

## Request

GET `/history/cleanup/jobs`

## Response

```json
[
   {
       "id":"aJobId",
       "jobDefinitionId":null,
       "processInstanceId":null,
       "processDefinitionId":null,
       "processDefinitionKey":null,
       "executionId":null,
       "exceptionMessage":null,
       "retries":3,
       "dueDate":"aDueDate",
       "suspended":false,
       "priority":0,
       "tenantId":null
   },
   {
       "id":"anotherJobId",
       "jobDefinitionId":null,
       "processInstanceId":null,
       "processDefinitionId":null,
       "processDefinitionKey":null,
       "executionId":null,
       "exceptionMessage":null,
       "retries":3,
       "dueDate":"anotherDueDate",
       "suspended":false,
       "priority":0,
       "tenantId":null
   }
]
```
