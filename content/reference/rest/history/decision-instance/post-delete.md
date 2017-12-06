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
At least _historicDecisionInstanceIds_ or _historicDecisionInstanceQuery_ has to be provided. If both are provided
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
      <a href="{{< relref "reference/rest/history/decision-instance/get-decision-instance-query.md#query-parameters" >}}">
        <code>POST /history/decision-instance</code>
      </a>.
    </td>
  </tr>
</table>

## Response Body

A JSON object corresponding to the Batch interface in the engine. Its properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the batch.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>The type of the batch. See the <a href="{{< relref "user-guide/process-engine/batch.md#creating-a-batch" >}}">User Guide</a> for more information about batch types.</td>
  </tr>
  <tr>
    <td>totalJobs</td>
    <td>Number</td>
    <td>
      The total jobs of a batch is the number of batch execution jobs required to
      complete the batch.
    </td>
  </tr>
  <tr>
    <td>jobsCreated</td>
    <td>Number</td>
    <td>
      The number of batch execution jobs already created by the seed job.
    </td>
  </tr>
  <tr>
    <td>batchJobsPerSeed</td>
    <td>Number</td>
    <td>
      The number of batch execution jobs created per seed job invocation.
      The batch seed job is invoked until it created all batch execution jobs required by
      the batch (see <code>totalJobs</code> property).
    </td>
  </tr>
  <tr>
    <td>invocationsPerBatchJob</td>
    <td>Number</td>
    <td>
      Every batch execution job invokes the command executed by the batch
      <code>invocationsPerBatchJob</code> times. E.g., for a decision instance
      deletion batch this specifies the number of decision instances which
      are deleted per batch execution job.
    </td>
  </tr>
  <tr>
    <td>seedJobDefinitionId</td>
    <td>String</td>
    <td>The job definition id for the seed jobs of this batch.</td>
  </tr>
  <tr>
    <td>batchJobDefinitionId</td>
    <td>String</td>
    <td>The job definition id for the batch execution jobs of this batch.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Boolean</td>
    <td>Indicates wheter this batch is suspened or not.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the batch.</td>
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
    <td>Returned if some of the query parameters are invalid, i.e. neither historicDecisionInstanceIds, nor historicDecisionInstanceQuery is present. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
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
      }
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
  "tenantId": null
}
```
