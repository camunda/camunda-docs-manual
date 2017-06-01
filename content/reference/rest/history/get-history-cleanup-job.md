---

title: "Find clean up history job (GET)"
weight: 40

menu:
  main:
    name: "Find clean up history job (GET)"
    identifier: "rest-api-find-history-cleanup-job"
    parent: "rest-api-history"
    pre: "GET `/history/find-cleanup-job`"

---

Finds history cleanup job (See [History cleanup]({{< relref "user-guide/process-engine/history.md#job-progress">}})).

# Method

GET `/history/find-cleanup-job`


# Parameters

## Query Parameters

Not used

## Request Body

Not used

# Result

A JSON object representing scheduled job.
See [Get Job]({{<relref "reference/rest/job/get.md#result" >}}) for the structure and example.

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

GET `/history/find-cleanup-job`

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
    "dueDate":"2017-04-06T13:57:45",
    "suspended":false,
    "priority":0,
    "tenantId":null
}
```
