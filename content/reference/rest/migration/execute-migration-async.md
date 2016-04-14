---

title: "Execute Migration Plan Async (Batch)"
weight: 20

menu:
  main:
    name: "Execute Async (Batch)"
    identifier: "rest-api-migration-execute-async"
    parent: "rest-api-migration"
    pre: "POST `/migration/executeAsync`"

---

Execute a migration plan asynchronously (batch) for multiple process instances.
To execute a migration plan synchronously use [POST /migration/execute][].

For more information about the difference between synchronously and
asynchronously execution of a migration plan please refer to the related
[user guide][] section.



# Method

POST `/migration/executeAsync`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>migrationPlan</td>
    <td>
      The migration plan to execute. A JSON object corresponding to the
      migration plan interface in the engine.
    </td>
  </tr>
  <tr>
    <td>processInstanceIds</td>
    <td>A list of process instance ids to migrate.</td>
  </tr>
</table>


# Result

A JSON object corresponding to the Batch interface in the engine. Its
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
    <td>size</td>
    <td>Number</td>
    <td>The size of the created batch.</td>
  </tr>
  <tr>
    <td>batchJobsPerSeed</td>
    <td>Number</td>
    <td>The number of batch jobs created per batch seed job invocation.</td>
  </tr>
  <tr>
    <td>invocationsPerBatchJob</td>
    <td>Number</td>
    <td>The number of invocations per batch job.</td>
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


# Response codes

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
      The provided migration plan is not valid, so an exception of type <code>MigrationPlanValidationException</code> is returned. See <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>
      In case additional parameters of the request are unexpected, an exception of type <code>InvalidRequestException</code> is returned. See <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

POST `/migration/executeAsync`

Request Body:

```json
{
  "migrationPlan": {
    "sourceProcessDefinitionId": "aProcessDefinitionId1",
    "targetProcessDefinitionId": "aProcessDefinitionId2",
    "instructions": [
      {
        "sourceActivityIds": ["aUserTask"],
        "targetActivityIds": ["aUserTask"]
      },
      {
        "sourceActivityIds": ["anotherUserTask"],
        "targetActivityIds": ["anotherUserTask"]
      }
    ]
  },
  "processInstanceIds": [
    "aProcessInstance",
    "anotherProcessInstance"
  ]
}
```

## Response

Status 200.

```json
{
  "id": "aBatchId",
  "type": "aBatchType",
  "size": 10,
  "batchJobsPerSeed": 10,
  "invocationsPerBatchJob": 1,
  "seedJobDefinitionId": "aSeedJobDefinitionId",
  "monitorJobDefinitionId": "aMonitorJobDefinitionId",
  "batchJobDefinitionId": "aBatchJobDefinitionId",
  "tenantId": "aTenantId"
}
```

[user guide]: {{< relref "user-guide/process-engine/process-instance-migration.md#executing-a-migration-plan" >}}
[POST /migration/execute]: {{< relref "reference/rest/migration/execute-migration.md" >}}
