---

title: "Validate Migration Plan"
weight: 20

menu:
  main:
    name: "Validate"
    identifier: "rest-api-migration-validate"
    parent: "rest-api-migration"
    pre: "POST `/migration/validate`"

---

Validates a migration plan statically without executing it. This
corresponds to the [creation time validation][] described in the user
guide.


# Method

POST `/migration/validate`


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
    <td>instructions</td>
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
    <td>Request successful. The migration plan is valid.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>
      The provided migration plan is not valid, so an exception of type <code>MigrationPlanValidationException</code> is returned. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
    </td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>
      In case additional parameters of the request are unexpected, an exception of type <code>InvalidRequestException</code> is returned. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
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
  "instructions": [
    {
      "sourceActivityIds": ["aUserTask"],
      "targetActivityIds": ["aUserTask"]
    },
    {
      "sourceActivityIds": ["anEvent"],
      "targetActivityIds": ["anotherEvent"],
      "updateEventTrigger": true
    }
  ]
}
```

## Response

Status 204. No content.

[user guide]: {{< relref "user-guide/process-engine/process-instance-migration.md#executing-a-migration-plan" >}}
[POST /migration/executeAsync]: {{< relref "reference/rest/migration/execute-migration-async.md" >}}
[creation time validation]: {{< relref "user-guide/process-engine/process-instance-migration.md#creation-time-validation" >}}

