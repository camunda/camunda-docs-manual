---

title: 'Restart Process Instance'
weight: 170

menu:
  main:
    name: "Restart Process Instance"
    identifier: "rest-api-process-definition-restart-process-instance"
    parent: "rest-api-process-definition"
    pre: "POST `/process-definition/{id}/restart`"

---

Restarts process instances that were canceled or terminated synchronously. To execute the restart asynchronously,
use the [Restart Process Instance Async]({{< relref "reference/rest/process-definition/post-restart-process-instance-async.md" >}}) method.

For more information about the difference between synchronous and
asynchronous execution, please refer to the related
section of the [user guide]({{< relref "user-guide/process-engine/process-instance-restart.md#execution" >}}).

# Method

POST `/process-definition/{id}/restart`

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
      <a href="{{< relref "reference/rest/history/process-instance/post-process-instance-query.md#request-body" >}}">
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
    <td>Skip execution of <a href="{{< relref "user-guide/process-engine/variables.md#input-output-variable-mapping" >}}">input/output variable mappings</a> for activities that are started as part of this request.</td>
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
          <td><b>Mandatory.</b> One of the following values: <code>startBeforeActivity</code>, <code>startAfterActivity</code>, <code>startTransition</code>. A <code>startBeforeActivity</code> instruction requests to enter a given activity. A <code>startAfterActivity</code> instruction requests to execute the single outgoing sequence flow of a given activity. A <code>startTransition</code> instruction requests to execute a specific sequence flow.</td>
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

This method returns no content.

# Response codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>204</td>
    <td></td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>
      In case following parameters are missing: instructions, activityId or transitionId, processInstanceIds or historicProcessInstanceQuery, an exception of type <code>InvalidRequestException</code> is returned. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Restarting one or more Process Instances with known processInstanceIds:

### Request

POST `/process-definition/aProcessDefinitionId/restart`

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

Status 204. No content.

## Restarting one or more Process Instances using a historicProcessInstanceQuery:

### Request

POST `/process-definition/aProcessDefinitionId/restart`

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

Status 204. No content.

