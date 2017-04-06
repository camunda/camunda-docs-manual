---

title: "Clean up history (POST)"
weight: 40

menu:
  main:
    name: "Clean up history (POST)"
    identifier: "rest-api-history-cleanup"
    parent: "rest-api-history"
    pre: "POST `/history/cleanup`"

---

Schedules asynchronous history cleanup (See [History cleanup]{{< relref "user-guide/process-engine/history-cleanup.md">}}).


# Method

POST `/history/cleanup`


# Parameters

## Query Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>executeAtOnce</td>
    <td>When true the job will be scheduled for nearest future. When false, the job will be scheduled for next batch window start time. Default is `true`.</td>
  </tr>
</table>


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
    <td>400</td>
    <td>application/json</td>
    <td>Returned if some of the query parameters are invalid.</td>
  </tr>
</table>

# Example

## Request

POST `/history/cleanup`

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
