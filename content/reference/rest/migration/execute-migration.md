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

Execute a migration plan synchronously for multiple process instances.


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
      The migration was unsuccesful for at least on process instance. See <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a>
      for the error response format.
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
