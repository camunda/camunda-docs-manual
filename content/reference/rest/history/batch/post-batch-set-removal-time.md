---

title: "Set Removal Time Async (POST)"
weight: 60

menu:
  main:
    name: "Set Removal Time Async (POST)"
    identifier: "rest-api-history-post-batch-set-removal-time"
    parent: "rest-api-history-batch"
    pre: "POST `/history/batch/set-removal-time`"

---

Sets the removal time to multiple historic batches asynchronously (batch).<br><br>
At least _historicBatchIds_ or _historicBatchQuery_ has to be provided. If both are provided, 
all instances matching query criterion and instances from the list will be updated with a removal time.

# Method

POST `/history/batch/set-removal-time`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>absoluteRemovalTime</td>
    <td>
      The date for which the historic batches shall be removed. <br>Value my not be <code>null</code>.<br><br>
      <strong>Note:</strong> Cannot be set in conjunction with <code>clearedRemovalTime</code> or <code>calculatedRemovalTime</code>.
    </td>
  </tr>
  <tr>
    <td>clearedRemovalTime</td>
    <td>
      Sets the removal time to <code>null</code>. <br>Value may only be <code>true</code>, as <code>false</code> is the default behavior.<br><br>
      <strong>Note:</strong> Cannot be set in conjunction with <code>absoluteRemovalTime</code> or <code>calculatedRemovalTime</code>.
    </td>
  </tr>
  <tr>
    <td>calculatedRemovalTime</td>
    <td>
      The removal time is calculated based on the engine's configuration settings. <br>Value may only be <code>true</code>, as <code>false</code> is the default behavior.<br><br>
      <strong>Note:</strong> Cannot be set in conjunction with <code>absoluteRemovalTime</code> or <code>clearedRemovalTime</code>.
    </td>
  </tr>
  <tr>
    <td>historicBatchQuery</td>
    <td>Query for the historic batches to set the removal time for.</td>
  </tr>
  <tr>
    <td>historicBatchIds</td>
    <td>The ids of the historic batches to set the removal time for.</td>
  </tr>
</table>

# Result

A JSON object corresponding to the `Batch` interface in the engine. Its
properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the created batch.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>The type of the created batch.</td>
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
    <td>batchJobsPerSeed</td>
    <td>Number</td>
    <td>
      The number of batch execution jobs created per seed job invocation.
      The batch seed job is invoked until it has created all batch execution jobs required by
      the batch (see <code>totalJobs</code> property).
    </td>
  </tr>
  <tr>
    <td>invocationsPerBatchJob</td>
    <td>Number</td>
    <td>
      Every batch execution job invokes the command executed by the batch
      <code>invocationsPerBatchJob</code> times. E.g., for a batch
      migration batch this specifies the number of batches which
      are migrated per batch execution job.
    </td>
  </tr>
  <tr>
    <td>seedJobDefinitionId</td>
    <td>String</td>
    <td>The job definition id for the seed jobs of this batch.</td>
  </tr>
  <tr>
    <td>monitorJobDefinitionId</td>
    <td>String</td>
    <td>The job definition id for the monitor jobs of this batch.</td>
  </tr>
  <tr>
    <td>batchJobDefinitionId</td>
    <td>String</td>
    <td>The job definition id for the batch execution jobs of this batch.</td>
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
    <td>204</td>
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>
      Request was unsuccessfull due to a bad user request. This occurs if some of the query parameters are invalid, e. g. if neither historicBatchIds nor historicBatchQuery is present or if no mode is specified. <br><br>
      See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

POST `/history/batch/set-removal-time`

Request Body:

```json
{
  "absoluteRemovalTime": "2019-05-05T11:56:24.725+0200",
  "historicBatchQuery": {
    "completed": true
  },
  "historicBatchIds": [ 
    "b4d2ad98-7240-11e9-98b7-be5e0f7575b7",
    "b4d2ad94-7240-11e9-98b7-be5e0f7575b7"
  ]
}
```

## Response

Status 200.

```json
{
  "id": "120b568d-724a-11e9-98b7-be5e0f7575b7",
  "type": "batch-set-removal-time",
  "totalJobs": 12,
  "batchJobsPerSeed": 100,
  "invocationsPerBatchJob": 1,
  "seedJobDefinitionId": "120b5690-724a-11e9-98b7-be5e0f7575b7",
  "monitorJobDefinitionId": "120b568f-724a-11e9-98b7-be5e0f7575b7",
  "batchJobDefinitionId": "120b568e-724a-11e9-98b7-be5e0f7575b7",
  "tenantId": "accounting"
}
```
