---

title: "Get Finished Case Instance Report"
weight: 20

menu:
  main:
    identifier: "rest-api-history-get-finished-case-instance-report"
    parent: "rest-api-history-case-definition"
    pre: "GET `/history/case-definition/finished-case-instance-report`"

---

Retrieves a report about case definition and finished case instances relevant to history cleanup (See 
<a href="{{< relref "user-guide/process-engine/history.md#history-cleanup" >}}">History cleanup</a>) so that you can tune the history time to live. These reports include the count of the finished historic case instances and  cleanable case instances, and basic case definition data - id, key, name and version.

# Method

GET `/history/case-definition/finished-case-instance-report`

# Result

A JSON array containing finished case instance information relevant to the history cleanup. Each report result has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>caseDefinitionId</td>
    <td>String</td>
    <td>The id of the case definition.</td>
  </tr>
  <tr>
    <td>caseDefinitionKey</td>
    <td>String</td>
    <td>The key of the case definition.</td>
  </tr>
  <tr>
    <td>caseDefinitionName</td>
    <td>String</td>
    <td>The name of the case definition.</td>
  </tr>
  <tr>
    <td>caseDefinitionName</td>
    <td>String</td>
    <td>The name of the case definition.</td>
  </tr>
  <tr>
    <td>caseDefinitionVersion</td>
    <td>int</td>
    <td>The version of the case definition.</td>
  </tr>
  <tr>
    <td>historyTimeToLive</td>
    <td>String</td>
    <td>The history time to live of the case definition.</td>
  </tr>
  <tr>
    <td>finishedCaseInstanceCount</td>
    <td>long</td>
    <td>The count of the finished historic case instances.</td>
  </tr>
  <tr>
    <td>cleanableCaseInstanceCount</td>
    <td>long</td>
    <td>The count of the cleanable historic case instances referring to history time to live.</td>
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

GET `/history/case-definition/finished-case-instance-report`

## Response

```json
[
  {
    "caseDefinitionId":"invoice:1:7bf79f13-ef95-11e6-b6e6-34f39ab71d4e",
    "caseDefinitionKey":"invoice",
    "caseDefinitionName":"Invoice Receipt",
    "caseDefinitionVersion":1,
    "historyTimeToLive":"5",
    "finishedCaseInstanceCount":100
    "cleanableCaseInstanceCount":53
  },
  {
    "caseDefinitionId":"invoice:2:7bf79f13-ef95-11e6-b6e6-34f39ab71d4e",
    "caseDefinitionKey":"invoice",
    "caseDefinitionName":"Invoice Receipt v2.0",
    "caseDefinitionVersion":2,
    "historyTimeToLive":"5",
    "finishedCaseInstanceCount":1000
    "cleanableCaseInstanceCount":13
  }

]
```
