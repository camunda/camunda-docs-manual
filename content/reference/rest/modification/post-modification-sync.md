---

title: "Execute Modification"
weight: 30

menu:
  main:
    name: "Execute Modification"
    identifier: "rest-api-modification-execute"
    parent: "rest-api-modification"
    pre: "POST `/modification/execute`"

---

Executes a modification synchronously for multiple process instances. 
To modify a single process instance, use the [Modify Process Instance Execution State]({{< relref "reference/rest/process-instance/post-modification.md" >}}) method.
To execute a modification asynchronously, use the [Execute Modification Async (Batch)]({{< relref "reference/rest/modification/post-modification-async.md" >}}) method.

For more information about the difference between synchronous and
asynchronous execution of a modification, please refer to the related
section of the [user guide]({{< relref "user-guide/process-engine/process-instance-migration.md#executing-a-migration-plan" >}}).


# Method

POST /modification/execute`


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
    <td>Skip execution of <a href="{{< relref "user-guide/process-engine/variables.md#input-output-variable-mapping" >}}">input/output variable mappings</a> for activities that are started or ended as part of this request.</td>
  </tr>
  <tr>
    <td>processInstanceIds</td>
    <td>A list of process instance ids to modify.</td>
  </tr>
  <tr>
    <td>processInstanceQuery</td>
    <td>
      A process instance query like the request body described by
      <a href="{{< relref "reference/rest/process-instance/post-query.md#request-body" >}}">
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
      In case following parameters are missing: instructions, processDefinitionId, activityId or transitionId, processInstanceIds or processInstanceQuery, an exception of type <code>InvalidRequestException</code> is returned. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

POST `/modification/execute`

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

Status 204. No content.
