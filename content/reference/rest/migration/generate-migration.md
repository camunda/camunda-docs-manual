---

title: "Generate Migration Plan"
weight: 10

menu:
  main:
    name: "Generate"
    identifier: "rest-api-migration-generate"
    parent: "rest-api-migration"
    pre: "POST `/migration/generate`"

---

Generate a migration plan for two process definitions. The generated migration
plan contains migration instructions which map equal activities between the
two process definitions.


# Method

POST `/migration/generate`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>sourceProcessDefinitionId</td>
    <td>The id of the source process definition for the migration.</td>
  </tr>
  <tr>
    <td>targetProcessDefinitionId</td>
    <td>The id of the target process definition for the migration.</td>
  </tr>
  <tr>
    <td>updateEventTriggers</td>
    <td>A boolean flag indicating whether instructions between events should have be configured to update the event triggers.</td>
  </tr>
</table>


# Result

A JSON object corresponding to the migration plan interface in the engine.
Its properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>sourceProcessDefinitionId</td>
    <td>String</td>
    <td>The id of the source process definition for the migration.</td>
  </tr>
  <tr>
    <td>targetProcessDefinitionId</td>
    <td>String</td>
    <td>The id of the target process definition for the migration.</td>
  </tr>
  <tr>
    <td>instructions</td>
    <td>Array</td>
    <td>
      A list of migration instructions which map equal activities. Each
      migration instruction is a JSON object with the following properties:
        <table class="table table-striped">
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>sourceActivityIds</td>
            <td>Array</td>
            <td>The activity ids from the source process definition being mapped.</td>
          </tr>
          <tr>
            <td>targetActivityIds</td>
            <td>Array</td>
            <td>The activity ids from the target process definition being mapped.</td>
          </tr>
          <tr>
            <td>updateEventTrigger</td>
            <td>Boolean</td>
            <td>
              Configuration flag whether event triggers defined are going to be update during migration.
            </td>
          </tr>
        </table>
    </td>
  </tr>
</table>


# Response codes

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
      The requested migration was invalid. See <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a>
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
  "sourceProcessDefinitionId": "aProcessDefinitionId1",
  "targetProcessDefinitionId": "aProcessDefinitionId2",
  "updateEventTriggers": true
}
```

## Response

Status 200.

```json
{
  "sourceProcessDefinitionId": "aProcessDefinitionId1",
  "targetProcessDefinitionId": "aProcessDefinitionId2",
  "instructions": [
    {
      "sourceActivityIds": ["aUserTask"],
      "targetActivityIds": ["aUserTask"],
      "updateEventTrigger": false
    },
    {
      "sourceActivityIds": ["anEvent"],
      "targetActivityIds": ["anotherEvent"],
      "updateEventTrigger": true
    }
  ]
}
```
