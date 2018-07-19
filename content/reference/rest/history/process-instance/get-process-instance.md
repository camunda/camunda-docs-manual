---

title: "Get Process Instance"
weight: 30

menu:
  main:
    name: "Get"
    identifier: "rest-api-history-get-process-instance"
    parent: "rest-api-history-process-instance"
    pre: "GET `/history/process-instance/{id}`"

---


Retrieves a historic process instance by id, according to the `HistoricProcessInstance` interface in the engine.


# Method

GET `/history/process-instance/{id}`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the historic process instance to be retrieved.</td>
  </tr>
</table>


# Result

A JSON object corresponding to the `HistoricProcessInstance` interface in the engine.
Its properties are as follows:
<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the process instance.</td>
  </tr>
  <tr>
    <td>superProcessInstanceId</td>
    <td>String</td>
    <td>The id of the parent process instance, if it exists.</td>
  </tr>
  <tr>
    <td>superCaseInstanceId</td>
    <td>String</td>
    <td>The id of the parent case instance, if it exists.</td>
  </tr>
  <tr>
    <td>caseInstanceId</td>
    <td>String</td>
    <td>The id of the parent case instance, if it exists.</td>
  </tr>
  <tr>
    <td>processDefinitionName</td>
    <td>String</td>
    <td>The name of the process definition that this process instance belongs to.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>String</td>
    <td>The key of the process definition that this process instance belongs to.</td>
  </tr>
  <tr>
    <td>processDefinitionVersion</td>
    <td>Integer</td>
    <td>The version of the process definition that this process instance belongs to.</td>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition that this process instance belongs to.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>String</td>
    <td>The business key of the process instance.</td>
  </tr>
  <tr>
    <td>startTime</td>
    <td>Date</td>
    <td>The time the instance was started. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>endTime</td>
    <td>Date</td>
    <td>The time the instance ended. Default format* <code>yyyy-MM-dd'T'HH:mm:ss.SSSZ</code>.</td>
  </tr>
  <tr>
    <td>durationInMillis</td>
    <td>Number</td>
    <td>The time the instance took to finish (in milliseconds).</td>
  </tr>
  <tr>
    <td>startUserId</td>
    <td>String</td>
    <td>The id of the user who started the process instance.</td>
  </tr>
  <tr>
    <td>startActivityId</td>
    <td>String</td>
    <td>The id of the initial activity that was executed (e.g., a start event).</td>
  </tr>
  <tr>
    <td>deleteReason</td>
    <td>String</td>
    <td>The provided delete reason in case the process instance was canceled during execution.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the process instance.</td>
  </tr>
  <tr>
    <td>state</td>
    <td>String</td>
    <td>
        last state of the process instance, possible values are:
        <ul style="list-style: none;">
                <li>ACTIVE - running process instance</li>
                <li>SUSPENDED - suspended process instances</li>
                <li>COMPLETED - completed through normal end event</li>
                <li>EXTERNALLY_TERMINATED - terminated externally, for instance through REST API</li>
                <li>INTERNALLY_TERMINATED - terminated internally, for instance by terminating boundary event</li>
        </ul>
    </td>
  </tr>
</table>

\* For further information, please see the <a href="{{< relref "reference/rest/overview/date-format.md" >}}"> documentation</a>.

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
    <td>404</td>
    <td>application/json</td>
    <td>Historic process instance with given id does not exist. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Example

## Request

GET `/history/process-instance/aProcInstId`

## Response

```json
{
  "id":"7c80cc8f-ef95-11e6-b6e6-34f39ab71d4e",
  "businessKey":null,
  "processDefinitionId":"invoice:1:7bf79f13-ef95-11e6-b6e6-34f39ab71d4e",
  "processDefinitionKey":"invoice",
  "processDefinitionName":"Invoice Receipt",
  "processDefinitionVersion":1,
  "startTime":"2017-02-10T14:33:19.000+0200",
  "endTime":null,
  "durationInMillis":null,
  "startUserId":null,
  "startActivityId":"StartEvent_1",
  "deleteReason":null,
  "superProcessInstanceId":null,
  "superCaseInstanceId":null,
  "caseInstanceId":null,
  "tenantId":null,
  "state":"ACTIVE"
}
```
