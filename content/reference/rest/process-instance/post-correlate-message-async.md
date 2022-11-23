---

title: 'Correlate Message Async (POST)'
weight: 120

menu:
  main:
    name: "Correlate Message Async (POST)"
    identifier: "rest-api-process-instance-post-correlate-message-async"
    parent: "rest-api-process-instance"
    pre: "POST `/process-instance/message-async`"

---

Correlates a message asynchronously to executions that are waiting for this message.
Messages will not be correlated to process definition-level start message events to start process instances.

# Method

POST `/process-instance/message-async`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>messageName</td>
    <td>The name of the message to correlate. Corresponds to the 'name' element of the message defined in BPMN 2.0 XML. Can be null to correlate by other criteria only.</td>
  </tr>
  <tr>
    <td>processInstanceIds</td>
    <td>A list of process instance ids that define a group of process instances to which the operation will correlate a message.</td>
  </tr>
  <tr>
    <td>processInstanceQuery</td>
    <td>
      A process instance query like the request body for the
      <a href="{{< ref "/reference/rest/process-instance/post-query.md#request-body" >}}">
        <code>Get Instances (POST)</code>
      </a> method to select process instances the operation will correlate a message to.
    </td>
  </tr>
  <tr>
    <td>historicProcessInstanceQuery</td>
    <td>
      A historic process instance query like the request body for the
      <a href="{{< ref "/reference/rest/history/process-instance/post-process-instance-query.md#request-body" >}}">
        <code>Get Instances (POST)</code>
      </a> method to select process instances the operation will correlate a message to.
    </td>
  </tr>
  <tr>
    <td>variables</td>
    <td>A JSON object containing variable key-value pairs the operation will set in the root scope of the process instances the message is correlated to. 
    Each key is a variable name and each value a JSON variable value object. {{< rest-var-request >}}</td>
  </tr>
</table>

Please note that if `processInstanceIds`, `processInstanceQuery` and `historicProcessInstanceQuery` 
are defined, the resulting operation will be performed on the union of these sets.

## Response Body

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
    <td>
      <ul>
        <li>If none of <code>processInstanceIds</code>, <code>processInstanceQuery</code> and <code>historicProcessInstanceQuery</code> is given</li>
        <li>If no process instance ids where found</li>
      </ul>
      See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>

# Example

## Request

POST `/process-instance/message-async`

Request Body:

```json
{
  "messageName" : "a-message-name",
  "processInstanceIds" : [
    "b4d2ad98-7240-11e9-98b7-be5e0f7575b7"
  ],
  "processInstanceQuery": {
    "processDefinitionKey": "my-process-definition-key"
  },
  "variables" : {
    "myVariableName": {
      "value": "myStringValue"
    }
  }
}
```

## Response

Status 200 OK

```json
{
  "id": "120b568d-724a-11e9-98b7-be5e0f7575b7",
  "type": "correlate-message",
  "totalJobs": 12,
  "batchJobsPerSeed": 100,
  "invocationsPerBatchJob": 1,
  "seedJobDefinitionId": "120b5690-724a-11e9-98b7-be5e0f7575b7",
  "monitorJobDefinitionId": "120b568f-724a-11e9-98b7-be5e0f7575b7",
  "batchJobDefinitionId": "120b568e-724a-11e9-98b7-be5e0f7575b7",
  "tenantId": "accounting",
  "suspended": false,
  "createUserId": null
}
```
