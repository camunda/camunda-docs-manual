---

title: "Execute Migration Plan"
weight: 20

menu:
  main:
    name: "Execute"
    identifier: "rest-api-migration-execute"
    parent: "rest-api-migration"
    pre: "POST `/migration/execute`"

---

Execute a migration plan synchronously for multiple process instances. To
execute a migration plan asynchronously use [POST /migration/executeAsync][].

For more information about the difference between synchronously and
asynchronously execution of a migration plan please refer to the related
[user guide][] section.


# Method

POST `/migration/execute`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>migrationPlan</td>
    <td>
      The migration plan to execute. A JSON object corresponding to the
      migration plan interface in the engine.
    </td>
  </tr>
  <tr>
    <td>processInstanceIds</td>
    <td>A list of process instance ids to migrate.</td>
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
      The provided migration plan is not valid, so an exception of type <code>MigrationPlanValidationException</code> is returned. See <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>
      The provided migration plan is not valid for a specific process instance it is applied to, so an exception of type <code>MigrationInstructionInstanceValidationException</code> is returned. See <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>
      In case additional parameters of the request are unexpected, an exception of type <code>InvalidRequestException</code> is returned. See <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
</table>


# Example

## Request

POST `/migration/generate`

Request Body:

```json
{
  "migrationPlan": {
    "sourceProcessDefinitionId": "aProcessDefinitionId1",
    "targetProcessDefinitionId": "aProcessDefinitionId2",
    "instructions": [
      {
        "sourceActivityIds": ["aUserTask"],
        "targetActivityIds": ["aUserTask"]
      },
      {
        "sourceActivityIds": ["anotherUserTask"],
        "targetActivityIds": ["anotherUserTask"]
      }
    ]
  },
  "processInstanceIds": [
    "aProcessInstance",
    "anotherProcessInstance"
  ]
}
```

## Response

Status 204. No content.

[user guide]: {{< relref "user-guide/process-engine/process-instance-migration.md#executing-a-migration-plan" >}}
[POST /migration/executeAsync]: {{< relref "reference/rest/migration/execute-migration-async.md" >}}
