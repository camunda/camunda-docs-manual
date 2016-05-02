---

title: "Execute Migration Plan"
weight: 30

menu:
  main:
    name: "Execute"
    identifier: "rest-api-migration-execute"
    parent: "rest-api-migration"
    pre: "POST `/migration/execute`"

---

Execute a migration plan synchronously for multiple process instances. To
execute a migration plan asynchronously, use [POST /migration/executeAsync][].

For more information about the difference between synchronous and
asynchronous execution of a migration plan, please refer to the related
section of the [user guide][].


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
      migration plan interface in the engine as explained below.
    </td>
  </tr>
  <tr>
    <td>processInstanceIds</td>
    <td>A list of process instance ids to migrate.</td>
  </tr>
  <tr>
    <td>processInstanceQuery</td>
    <td>
      A process instance query like the request body described by
      <a href="{{< relref "reference/rest/process-instance/post-query.md#request-body" >}}">
        <code>POST /process-instance</code>
      </a>.
    </td>
  </tr>
  <tr>
    <td>skipCustomListeners</td>
    <td>A boolean value to control whether execution listeners should be invoked during migration.</td>
  </tr>
  <tr>
    <td>skipIoMappings</td>
    <td>A boolean value to control whether input/output mappings should be executed during migration.</td>
  </tr>
</table>

The migration plan JSON object has the following properties:

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
    <td>Request successful.</td>
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
      The provided migration plan is not valid for a specific process instance it is applied to, so an exception of type <code>MigrationInstructionInstanceValidationException</code> is returned. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.
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
  "migrationPlan": {
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
  },
  "processInstanceIds": [
    "aProcessInstance",
    "anotherProcessInstance"
  ],
  "processInstanceQuery": {
    "processDefinitionId": "aProcessDefinitionId1"
  },
  "skipCustomListeners": true
}
```

## Response

Status 204. No content.

[user guide]: {{< relref "user-guide/process-engine/process-instance-migration.md#executing-a-migration-plan" >}}
[POST /migration/executeAsync]: {{< relref "reference/rest/migration/execute-migration-async.md" >}}
