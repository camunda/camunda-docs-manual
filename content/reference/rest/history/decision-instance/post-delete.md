---

title: 'Delete Async (POST)'
weight: 110

menu:
  main:
    name: "Delete Async (POST)"
    identifier: "rest-api-history-delete-decision-instance-async"
    parent: "rest-api-history-decision-instance"
    pre: "POST `/history/decision-instance/delete`"

---


Delete multiple historic decision instances asynchronously (batch).
At least `historicDecisionInstanceIds` or `historicDecisionInstanceQuery` has to be provided. If both are provided
then all instances matching query criterion and instances from the list will be deleted.

# Method

POST `/history/decision-instance/delete`

# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>historicDecisionInstanceIds</td>
    <td>A list historic decision instance ids to delete.</td>
  </tr>
  <tr>
    <td>historicDecisionInstanceQuery</td>
    <td>
      A historic decision instance query like the request body described by
      <a href="{{< ref "/reference/rest/history/decision-instance/get-decision-instance-query.md#query-parameters" >}}">
        <code>POST /history/decision-instance</code>
      </a>.
    </td>
  </tr>
  <tr>
    <td>deleteReason</td>
    <td>A string with delete reason.</td>
  </tr>
</table>

# Result

A JSON object corresponding to the Batch interface in the engine. Its properties are as follows:

{{< rest-batch-response >}}


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
    <td>Returned if some of the query parameters are invalid, i.e. neither historicDecisionInstanceIds, nor historicDecisionInstanceQuery is present. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

POST `/history/decision-instance/delete`

Request Body:

    {
      "historicDecisionInstanceIds": ["aDecision","secondDecision"],
      "historicDecisionInstanceQuery": {
        "decisionDefinitionKey": "a-definition-key"
      },
      "deleteReason": "a delete reason"
    }

## Response

Status 200 OK

```json
{
  "id": "aBatchId",
  "type": "aBatchType",
  "totalJobs": 10,
  "batchJobsPerSeed": 100,
  "jobsCreated": 10,
  "invocationsPerBatchJob": 1,
  "seedJobDefinitionId": "aSeedJobDefinitionId",
  "monitorJobDefinitionId": "aMonitorJobDefinitionId",
  "batchJobDefinitionId": "aBatchJobDefinitionId",
  "suspened": false,
  "tenantId": null,
  "createUserId": "aUser"
}
```
