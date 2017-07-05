---

title: "Get Cleanable Process Instance Report"
weight: 20

menu:
  main:
    identifier: "rest-api-history-get-cleanable-process-instance-report"
    parent: "rest-api-history-process-definition"
    pre: "GET `/history/process-definition/cleanable-process-instance-report`"

---

Retrieves a report about a process definition and finished process instances relevant to history cleanup (see 
<a href="{{< relref "user-guide/process-engine/history.md#history-cleanup" >}}">History cleanup</a>) so that you can tune the history time to live. These reports include the count of the finished historic process instances, cleanable process instances and basic process definition data - id, key, name and version.

# Method

GET `/history/process-definition/cleanable-process-instance-report`

# Result

A JSON array containing finished process instance information relevant to history cleanup. Each report result has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processDefinitionId</td>
    <td>String</td>
    <td>The id of the process definition.</td>
  </tr>
  <tr>
    <td>processDefinitionKey</td>
    <td>String</td>
    <td>The key of the process definition.</td>
  </tr>
  <tr>
    <td>processDefinitionName</td>
    <td>String</td>
    <td>The name of the process definition.</td>
  </tr>
  <tr>
    <td>processDefinitionName</td>
    <td>String</td>
    <td>The name of the process definition.</td>
  </tr>
  <tr>
    <td>processDefinitionVersion</td>
    <td>Number</td>
    <td>The version of the process definition.</td>
  </tr>
  <tr>
    <td>historyTimeToLive</td>
    <td>Number</td>
    <td>The history time to live of the process definition.</td>
  </tr>
  <tr>
    <td>finishedProcessInstanceCount</td>
    <td>Number</td>
    <td>The count of the finished historic process instances.</td>
  </tr>
  <tr>
    <td>cleanableProcessInstanceCount</td>
    <td>Number</td>
    <td>The count of the cleanable historic process instances, referring to history time to live.</td>
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
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>If the authenticated user is unauthorized to see the requested information.</td>
  </tr>
</table>

# Examples

## Request

GET `/history/process-definition/cleanable-process-instance-report`

## Response

```json
[
  {
    "processDefinitionId":"invoice:1:7bf79f13-ef95-11e6-b6e6-34f39ab71d4e",
    "processDefinitionKey":"invoice",
    "processDefinitionName":"Invoice Receipt",
    "processDefinitionVersion":1,
    "historyTimeToLive":5,
    "finishedProcessInstanceCount":100
    "cleanableProcessInstanceCount":53
  },
  {
    "processDefinitionId":"invoice:2:7bf79f13-ef95-11e6-b6e6-34f39ab71d4e",
    "processDefinitionKey":"invoice",
    "processDefinitionName":"Invoice Receipt v2.0",
    "processDefinitionVersion":2,
    "historyTimeToLive":5,
    "finishedProcessInstanceCount":1000
    "cleanableProcessInstanceCount":13
  }
  
]
```
