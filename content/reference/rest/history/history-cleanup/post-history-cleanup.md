---

title: "Clean up history (POST)"
weight: 40

menu:
  main:
    name: "Clean up history (POST)"
    identifier: "rest-api-history-cleanup-post"
    parent: "rest-api-history-cleanup"
    pre: "POST `/history/cleanup`"

---

Schedules asynchronous history cleanup (See [History cleanup]({{< ref "/user-guide/process-engine/history.md#history-cleanup">}})).


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
    <td>immediatelyDue</td>
    <td>When true the job will be scheduled for nearest future. When false, the job will be scheduled for next batch window start time. Default is <code>true</code>.</td>
  </tr>
</table>


## Request Body

Not used

# Result

{{< note title="Result is not reliable any more" class="warning" >}}
  This endpoint will return at most a single history cleanup job. Since version `7.9.0` it is possible 
  to configure multiple [parallel history cleanup jobs]({{<ref "/user-guide/process-engine/history.md#parallel-execution" >}})
  Use [`GET /history/cleanup/jobs`]({{<ref "/reference/rest/history/history-cleanup/get-history-cleanup-jobs.md" >}}) 
  to find all the available history cleanup jobs.
{{</note>}}

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
    <td>400</td>
    <td>application/json</td>
    <td>
      Returned if some of the query parameters are invalid or the engine does not participate in history cleanup.
      See <a href="{{<ref "/user-guide/process-engine/history.md#cleanup-execution-participation-per-node" >}}">Cleanup Execution Participation per Node</a>.
    </td>
  </tr>
</table>

# Example

## Request

POST `/history/cleanup?immediatelyDue=false`

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
    "createTime": "2017-04-01T09:45:15.039+0100"

}
```
