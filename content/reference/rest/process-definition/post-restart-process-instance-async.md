---

title: 'Restart Process Instance Async'
weight: 170

menu:
  main:
    name: "Restart Process Instance Async"
    identifier: "rest-api-process-definition-restart-process-instance-async"
    parent: "rest-api-process-definition"
    pre: "POST `/process-definition/{id}/restart-async`"

---

Restarts process instances that were canceled or terminated asynchronously. Can also restart completed process instances. It will create a new instance using the original instance information. To execute the restart synchronously,
use the [Restart Process Instance]({{< ref "/reference/rest/process-definition/post-restart-process-instance-sync.md" >}}) method.

For more information about the difference between synchronous and
asynchronous execution, please refer to the related
section of the [user guide]({{< ref "/user-guide/process-engine/process-instance-restart.md#execution" >}}).

# Method

POST `/process-definition/{id}/restart-async`

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process definition of the process instances to restart.</td>
  </tr>
</table>

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processInstanceIds</td>
    <td>A list of process instance ids to restart.</td>
  </tr>
  <tr>
    <td>historicProcessInstanceQuery</td>
    <td>
      A historic process instance query like the request body described by
      <a href="{{< ref "/reference/rest/history/process-instance/post-process-instance-query.md#request-body" >}}">
        <code>POST /history/process-instance</code>
      </a>.
    </td>
  </tr>
  <tr>
    <td>skipCustomListeners</td>
    <td>Skip execution listener invocation for activities that are started as part of this request.</td>
  </tr>
  <tr>
    <td>skipIoMappings</td>
    <td>Skip execution of <a href="{{< ref "/user-guide/process-engine/variables.md#input-output-variable-mapping" >}}">input/output variable mappings</a> for activities that are started as part of this request.</td>
  </tr>
   <tr>
    <td>initialVariables</td>
    <td>Set the initial set of variables during restart. By default, the last set of variables is used.</td>
  </tr>
  <tr>
    <td>withoutBusinessKey</td>
    <td>Do not take over the business key of the historic process instance.</td>
  </tr>
  <tr>
    <td>instructions</td>
    <td>
        A JSON array of instructions. The instructions are executed in the order they are in. An instruction may have the following properties:
      <table class="table table-striped">
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>type</td>
          <td><b>Mandatory.</b> One of the following values: <code>startBeforeActivity</code>, <code>startAfterActivity</code>, <code>startTransition</code>. A <code>startBeforeActivity</code>  instruction requests to enter a given activity. A <code>startAfterActivity</code> instruction requests to execute the single outgoing sequence flow of a given activity. A <code>startTransition</code> instruction requests to execute a specific sequence flow.</td>
        </tr>
        <tr>
          <td>activityId</td>
          <td><b>Can be used with instructions of types <code>startBeforeActivity</code> and <code>startAfterActivity</code>.</b> Specifies the activity the instruction targets.</td>
        </tr>
        <tr>
          <td>transitionId</td>
          <td><b>Can be used with instructions of types <code>startTransition</code></b>. Specifies the sequence flow to start.</td>
        </tr>
      </table>
    </td>
  </tr>

</table>

# Result

A JSON object corresponding to the `Batch` interface in the engine. Its
properties are as follows:

{{< rest-batch-response >}}


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
      In case following parameters are missing: instructions, activityId or transitionId, processInstanceIds or historicProcessInstanceQuery, an exception of type <code>InvalidRequestException</code> is returned. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Restarting one or more Process Instances with known processInstanceIds:

### Request

POST `/process-definition/aProcessDefinitionId/restart-async`

Request Body:

```json
{
  "instructions": [
    {
      "type": "startAfterActivity",
      "activityId": "aUserTask"
    }
  ],
  "processInstanceIds": [
    "aProcessInstance",
    "anotherProcessInstance"
  ],
  "initialVariables" : true,
  "skipCustomListeners" : true,
  "withoutBusinessKey" : true
}
```

### Response

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

## Restarting one or more Process Instances using a historicProcessInstanceQuery:

### Request

POST `/process-definition/aProcessDefinitionId/restart-async`

Request Body:

```json
{
  "instructions": [
    {
      "type": "startAfterActivity",
      "activityId": "aUserTask"
    }
  ],
  "initialVariables" : true,
  "skipCustomListeners" : true,
  "withoutBusinessKey" : true,
  "historicProcessInstanceQuery": {
    "processDefinitionId": "aProcessDefinitionId",
    "processInstanceBusinessKey" : "businessKey"
  }
}
```
### Response

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