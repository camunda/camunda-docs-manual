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

Generates a migration plan for two process definitions. The generated migration
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
    <td>A boolean flag indicating whether instructions between events should be configured to update the event triggers.</td>
  </tr>
  <tr>
    <td>variables</td>
    <td>
      A map of variables which can be set into the process instances' scope.<br><br>
      <strong>Heads-up:</strong> this property is just passed through and no generation, only validation happens. It is for convenience to directly pass the result as part of the execution payload.<br><br>
      Each key is a variable name and each value a JSON variable value object with the following properties:
      {{< rest-var-request transient="true">}}
    </td>
  </tr>
</table>


# Result

A JSON object corresponding to the migration plan interface in the engine.
Its properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Type</th>
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
            <th>Type</th>
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
              Configuration flag whether event triggers defined are going to be updated during migration.
            </td>
          </tr>
        </table>
    </td>
  </tr>
  <tr>
    <td>variables</td>
    <td>Object</td>
    <td>
      Each key is a variable name and each value a JSON variable value object.
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
    <td>Invalid variable value, for example if the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>
      The requested migration was invalid. See <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a>
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
  "updateEventTriggers": true,
  "variables": {
    "foo": {
      "type": "Object",
      "value": "[5,6]",
      "valueInfo": {
        "objectTypeName": "java.util.ArrayList",
        "serializationDataFormat": "application/json"
      }
    }
  }
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
  ],
  "variables": {
    "foo": {
      "type": "Object",
      "value": "[5,6]",
      "valueInfo": {
        "objectTypeName": "java.util.ArrayList",
        "serializationDataFormat": "application/json"
      }
    }
  }
}
```
