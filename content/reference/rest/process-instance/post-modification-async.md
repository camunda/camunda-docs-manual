---

title: 'Modify Process Instance Execution State Async'
weight: 105

menu:
  main:
    name: "Modify"
    identifier: "rest-api-process-instance-modify-async"
    parent: "rest-api-process-instance"
    pre: "POST `/process-instance/{id}/modification-async`"

---

<p>Submits a list of modification instructions to change a process instance's execution state async. A modification instruction is one of the following:</p>

<ul>
  <li>Starting execution before an activity</li>
  <li>Starting execution after an activity on its single outgoing sequence flow</li>
  <li>Starting execution on a specific sequence flow</li>
  <li>Cancelling an activity instance, transition instance, or all instances (activity or transition) for an activity</li>
</ul>

<p>Instructions are executed asynchronous and in the order they are provided in this request's body. Variables can be provided with every starting instruction.</p>

<p>The exact semantics of modification can be read about in the <a href="{{< relref "user-guide/process-engine/process-instance-modification.md" >}}">user guide</a>.</p>

# Method

POST `/process-instance/{id}/modification-async`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process instance to modify.</td>
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
    <td>skipCustomListeners</td>
    <td>Skip execution listener invocation for activities that are started or ended as part of this request.</td>
  </tr>
  <tr>
    <td>skipIoMappings</td>
    <td>Skip execution of <a href="{{< relref "user-guide/process-engine/variables.md#input-output-variable-mapping" >}}">input/output variable mappings</a> for activities that are started or ended as part of this request.</td>
  </tr>
  <tr>
    <td>instructions</td>
    <td>
        A JSON array of modification instructions. The instructions are executed in the order they are in. An instruction may have the following properties:
      <table class="table table-striped">
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>type</td>
          <td><b>Mandatory.</b> One of the following values: <code>cancel</code>, <code>startBeforeActivity</code>, <code>startAfterActivity</code>, <code>startTransition</code>. A <code>cancel</code> instruction requests cancellation of a single activity instance or all instances of one activity. A <code>startBeforeActivity</code> instruction requests to enter a given activity. A <code>startAfterActivity</code> instruction requests to execute the single outgoing sequence flow of a given activity. A <code>startTransition</code> instruction requests to execute a specific sequence flow.</td>
        </tr>
        <tr>
          <td>activityId</td>
          <td><b>Can be used with instructions of types <code>startBeforeActivity</code>, <code>startAfterActivity</code>, and <code>cancel</code>.</b> Specifies the activity the instruction targets.</td>
        </tr>
        <tr>
          <td>transitionId</td>
          <td><b>Can be used with instructions of types <code>startTransition</code></b>. Specifies the sequence flow to start.</td>
        </tr>
        <tr>
          <td>activityInstanceId</td>
          <td><b>Can be used with instructions of type <code>cancel</code>.</b> Specifies the activity instance to cancel. Valid values are the activity instance IDs supplied by the <a href="{{< relref "reference/rest/process-instance/get-activity-instances.md" >}}">Get Activity Instance</a> request.</td>
        </tr>
        <tr>
          <td>transitionInstanceId</td>
          <td><b>Can be used with instructions of type <code>cancel</code>.</b> Specifies the transition instance to cancel. Valid values are the transition instance IDs supplied by the <a href="{{< relref "reference/rest/process-instance/get-activity-instances.md" >}}">Get Activity Instance</a> request.</td>
        </tr>
        <tr>
          <td>ancestorActivityInstanceId</td>
          <td><p><b>Can be used with instructions of type <code>startBeforeActivity</code>, <code>startAfterActivity</code>, and <code>startTransition</code>.</b> Valid values are the activity instance IDs supplied by the <a href="{{< relref "reference/rest/process-instance/get-activity-instances.md" >}}">Get Activity Instance</a> request.</p>
          <p>If there are multiple parent activity instances of the targeted activity, this specifies the ancestor scope in which hierarchy the activity/transition is to be instantiated.</p>
          <p>Example: When there are two instances of a subprocess and an activity contained in the subprocess is to be started, this parameter allows to specify under which subprocess instance the activity should be started.</p></td>
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


# Response Codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>application/json	</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>At least one modification instruction misses required parameters.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>If the user is not allowed to execute batches.
        See the <a href="{{< relref "reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The modification cannot be performed, for example because it starts a failing activity.</td>
  </tr>
</table>


# Example

## Request

POST `/process-instance/aProcessInstanceId/modification-async`

Request Body:

    {
    "skipCustomListeners": true,
    "skipIoMappings": true,
    "instructions": [
        {
          "type": "startBeforeActivity",
          "activityId": "activityId"
        },
        {
          "type": "cancel",
          "activityInstanceId": "anActivityInstanceId",
        }
      ]
    }

## Response

Status 200.

```json
{
  "id": "aBatchId",
  "type": "instance-modification",
  "totalJobs": 10,
  "batchJobsPerSeed": 100,
  "invocationsPerBatchJob": 1,
  "seedJobDefinitionId": "aSeedJobDefinitionId",
  "monitorJobDefinitionId": "aMonitorJobDefinitionId",
  "batchJobDefinitionId": "aBatchJobDefinitionId",
  "tenantId": "aTenantId"
}
```

