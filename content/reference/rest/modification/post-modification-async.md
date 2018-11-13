---

title: "Execute Modification Async (Batch)"
weight: 30

menu:
  main:
    name: "Execute Modification Async (Batch)"
    identifier: "rest-api-modification-executeAync"
    parent: "rest-api-modification"
    pre: "POST `/modification/executeAsync`"

---

Executes a modification asynchronously for multiple process instances. To execute a modification synchronously, 
use the [Execute Modification]({{< ref "/reference/rest/modification/post-modification-sync.md" >}}) method.

For more information about the difference between synchronous and
asynchronous execution of a modification, please refer to the related
section of the [user guide]({{< ref "/user-guide/process-engine/process-instance-migration.md#executing-a-migration-plan" >}}).


# Method

POST `/modification/executeAsync`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
   <tr>
    <td>processDefinitionId</td>
    <td>The id of the process definition for the modification</td>
  </tr>
  <tr>
    <td>skipCustomListeners</td>
    <td>Skip execution listener invocation for activities that are started or ended as part of this request.</td>
  </tr>
  <tr>
    <td>skipIoMappings</td>
    <td>Skip execution of <a href="{{< ref "/user-guide/process-engine/variables.md#input-output-variable-mapping" >}}">input/output variable mappings</a> for activities that are started or ended as part of this request.</td>
  </tr>
  <tr>
    <td>processInstanceIds</td>
    <td>A list of process instance ids to modify.</td>
  </tr>
  <tr>
    <td>processInstanceQuery</td>
    <td>
      A process instance query like the request body described by
      <a href="{{< ref "/reference/rest/process-instance/post-query.md#request-body" >}}">
        <code>POST /process-instance</code>
      </a>.
    </td>
  <tr>
    <td>instructions</td>
    <td>
        A JSON array of modification instructions. The instructions are executed in the order they are in. An instruction may have the following properties:
      <table>
        <tr>
          <td>type</td>
          <td><b>Mandatory.</b> One of the following values: <code>cancel</code>, <code>startBeforeActivity</code>, <code>startAfterActivity</code>, <code>startTransition</code>. A <code>startBeforeActivity</code> and <code>cancel</code> instructions request to enter a given activity. A <code>startAfterActivity</code> instruction requests to execute the single outgoing sequence flow of a given activity. A <code>startTransition</code> instruction requests to execute a specific sequence flow.</td>
        </tr>
        <tr>
          <td>activityId</td>
          <td><b>Can be used with instructions of types <code>startBeforeActivity</code>, <code>startAfterActivity</code>, and <code>cancel</code>.</b> Specifies the activity the instruction targets.</td>
        </tr>
        <tr>
          <td>transitionId</td>
          <td><b>Can be used with instructions of type <code>startTransition</code></b>. Specifies the sequence flow to start.</td>
        </tr>
        <tr>
          <td>cancelCurrentActiveActivityInstances</td>
          <td><b>Can be used with instructions of type <code>cancel</code></b>. Prevents the deletion of new created activity instances.</td>
        </tr>
      </table>
    </td>
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
      <code>invocationsPerBatchJob</code> times. E.g., for a process instance
      modification batch this specifies the number of process instances which
      are modified per batch execution job.
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
      In case following parameters are missing: instructions, processDefinitionId, activityId or transitionId, processInstanceIds or processInstanceQuery, an exception of type <code>InvalidRequestException</code> is returned. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

POST `/modification/executeAsync`

Request Body:

```json
{
  "processDefinitionId" : "aProcessDefinitionId",
  "instructions": [
    {
      "type": "startAfterActivity",
      "activityId": "aUserTask"
    },
    {
      "type": "cancel",
      "activityId": "anotherTask",
      "cancelCurrentActiveActivityInstances" : true
    }
  ],
  "processInstanceIds": [
    "aProcessInstance",
    "anotherProcessInstance"
  ],
  "processInstanceQuery": {
    "processDefinitionId": "aProcessDefinitionId"
  },
  "skipCustomListeners": true
}
```

## Response

Status 200.

```json
{
  "id": "aBatchId",
  "type": "aBatchType",
  "totalJobs": 10,
  "batchJobsPerSeed": 100,
  "invocationsPerBatchJob": 1,
  "seedJobDefinitionId": "aSeedJobDefinitionId",
  "monitorJobDefinitionId": "aMonitorJobDefinitionId",
  "batchJobDefinitionId": "aBatchJobDefinitionId",
  "tenantId": "aTenantId"
}
```
