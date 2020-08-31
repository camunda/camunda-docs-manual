---

title: 'Set Variables Async (POST)'
weight: 110

menu:
  main:
    name: "Set Variables Async (POST)"
    identifier: "rest-api-process-instance-post-set-variables-async"
    parent: "rest-api-process-instance"
    pre: "POST `/process-instance/variables-async`"

---

Update or create runtime process variables in the root scope of process instances.

# Method

POST `/process-instance/variables-async`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processInstanceIds</td>
    <td>A list of process instance ids that define a group of process instances to which the operation will set variables.</td>
  </tr>
  <tr>
    <td>processInstanceQuery</td>
    <td>
      A process instance query like the request body for the
      <a href="{{< ref "/reference/rest/process-instance/post-query.md#request-body" >}}">
        <code>Get Instances (POST)</code>
      </a> method to select process instances the operation will set variables to.
    </td>
  </tr>
  <tr>
    <td>historicProcessInstanceQuery</td>
    <td>
      A historic process instance query like the request body for the
      <a href="{{< ref "/reference/rest/history/process-instance/post-process-instance-query.md#request-body" >}}">
        <code>Get Instances (POST)</code>
      </a> method to select process instances the operation will set variables to.
    </td>
  </tr>
  <tr>
    <td>variables</td>
    <td>A JSON object containing variable key-value pairs the operation will set in the root scope of the process instances. 
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
        <li>The variable value or type is invalid, for example if the value could not be parsed to an Integer value or the passed variable type is not supported</li>
        <li>If none of <code>processInstanceIds</code>, <code>processInstanceQuery</code> and <code>historicProcessInstanceQuery</code> is given</li>
        <li>If no or an empty array of <code>variables</code> is given</li>
        <li>If no process instance ids where found</li>
        <li>If a transient variable is set</li>
        <li>If the engine config flag <code>javaSerializationFormatEnabled</code> is <code>false</code> and a Java serialized variable is given</li>
       </ul>
       See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>

# Example

## Request

POST `/process-instance/variables-async`

Request Body:

```json
{
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
  "type": "set-variables",
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
