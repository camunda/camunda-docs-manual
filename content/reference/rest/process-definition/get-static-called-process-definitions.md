---

title: 'Get Static Called Process Definitions'
weight: 10

menu:
  main:
    identifier: "rest-api-process-definition-get-static-called-process-definitions"
    parent: "rest-api-process-definition"
    pre: "GET `/process-definition/{id}/static-called-process-definitions`"

---

For the given process, returns a list of called process definitions corresponding to
the `CalledProcessDefinition` interface in the engine. The list contains all process definitions
that are referenced statically by call activities in the given process. This endpoint does not
resolve process definitions that are referenced with expressions. Each called process definition
contains a list of call activity ids, which specifies the call activities that are calling that
process. This endpoint does not resolve references to case definitions.

# Method

GET `/process-definition/{id}/static-called-process-definitions`

# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the process definition.</td>
  </tr>
</table>

# Result

A JSON Array of objects corresponding to the `CalledProcessDefinition` interface in the engine.
The Array can be empty, if the endpoint cannot resolve the called process(es) because the reference is
an expression which is resolved by the engine during runtime of the calling process.
Each called process definition object has the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the process definition.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>String</td>
    <td>The key of the process definition, i.e., the id of the BPMN 2.0 XML process definition.</td>
  </tr>
  <tr>
    <td>category</td>
    <td>String</td>
    <td>The category of the process definition.</td>
  </tr>
  <tr>
    <td>description</td>
    <td>String</td>
    <td>The description of the process definition.</td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>The name of the process definition.</td>
  </tr>
  <tr>
    <td>version</td>
    <td>Number</td>
    <td>The version of the process definition that the engine assigned to it.</td>
  </tr>
  <tr>
    <td>resource</td>
    <td>String</td>
    <td>The file name of the process definition.</td>
  </tr>
  <tr>
    <td>deploymentId</td>
    <td>String</td>
    <td>The deployment id of the process definition.</td>
  </tr>
  <tr>
    <td>diagram</td>
    <td>String</td>
    <td>The file name of the process definition diagram, if it exists.</td>
  </tr>
  <tr>
    <td>suspended</td>
    <td>Boolean</td>
    <td>A flag indicating whether the definition is suspended or not.</td>
  </tr>
   <tr>
    <td>tenantId</td>
    <td>String</td>
    <td>The tenant id of the process definition.</td>
  </tr>
  <tr>
    <td>versionTag</td>
    <td>String</td>
    <td>The version tag of the process definition.</td>
  </tr>
  <tr>
    <td>historyTimeToLive</td>
    <td>Number</td>
    <td>History time to live value of the process definition. Is used within <a href="{{< ref "/user-guide/process-engine/history.md#history-cleanup">}}">History cleanup</a>.</td>
  </tr>
  <tr>
    <td>startableInTasklist</td>
    <td>Boolean</td>
    <td>A flag indicating whether the process definition is startable in Tasklist or not.</td>
  </tr>
  <tr>
    <td>calledFromActivityIds</td>
    <td>Array</td>
    <td>Ids of the CallActivities which call this process.</td>
  </tr>
  <tr>
    <td>callingProcessDefinitionId</td>
    <td>String</td>
    <td>The id of the calling process definition</td>
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
    <td>404</td>
    <td>application/json</td>
    <td>Process definition with given key does not exist. 
        See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>


# Examples

## Request

GET `/process-definition/aProcessDefinitionId/static-called-process-definitions`

## Response

```json
[
  {
    "id": "ACalledProcess:1:1bbd4e83-f8f1-11eb-9344",
    "key": "ACalledProcess",
    "category": "http://www.omg.org/spec/BPMN/20100524/MODEL",
    "description": null,
    "name": "ACalledProcess",
    "version": 1,
    "resource": "called-process.bpmn",
    "deploymentId": "1baa3baf-f8f1-11eb-9344-0e0bbdd53e42",
    "diagram": null,
    "suspended": false,
    "tenantId": null,
    "versionTag": null,
    "historyTimeToLive": null,
    "calledFromActivityIds": [
      "aCallActivityId"
    ],
    "callingProcessDefinitionId": "aProcessDefinitionId",
    "startableInTasklist": true
  },
  {
    "id": "AnotherCalledProcess:2:1bc2f3d5-f8f1-11eb-9344",
    "key": "AnotherCalledProcess",
    "category": "http://www.omg.org/spec/BPMN/20100524/MODEL",
    "description": null,
    "name": "AnotherCalledProcess",
    "version": 2,
    "resource": "another-called-process.bpmn",
    "deploymentId": "1baa3baf-f8f1-11eb-9344-0e0bbdd53e42",
    "diagram": null,
    "suspended": false,
    "tenantId": null,
    "versionTag": null,
    "historyTimeToLive": null,
    "calledFromActivityIds": [
      "aSecondCallActivityId",
      "aThirdCallActivityId"
    ],
    "callingProcessDefinitionId": "aProcessDefinitionId",
    "startableInTasklist": true
  }
]
```
