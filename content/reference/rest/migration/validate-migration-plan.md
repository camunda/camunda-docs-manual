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
corresponds to the [creation time validation]({{< ref "/user-guide/process-engine/process-instance-migration.md#creation-time-validation" >}}) described in the user
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
              Configuration flag whether event triggers defined are going to be updated during migration.
            </td>
          </tr>
        </table>
    </td>
  </tr>
</table>

# Result

A JSON object which contains a list of instruction reports
if any errors are detected, other wise it is empty.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>instructionReports</td>
    <td>Array</td>
    <td>
      The list of instruction validation reports. If no validation errors are
      detected it is an empty list.
    </td>
  </tr>
</table>


The properties of a instruction report are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>instruction</td>
    <td>Object</td>
    <td>
      A migration instruction JSON object with the following properties:
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
              Configuration flag whether event triggers defined are going to be updated during migration.
            </td>
          </tr>
        </table>
      </td>
  </tr>
  <tr>
    <td>failures</td>
    <td>Array</td>
    <td>A list of instruction validation report messages.</td>
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
    <td></td>
    <td>Request successful. The validation report was returned.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>
      In case additional parameters of the request are unexpected, an exception
      of type <code>InvalidRequestException</code> is returned. See the <a
      href="{{< ref "/reference/rest/overview/_index.md#error-handling">}}">
      Introduction</a> for the error response format.
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

Status 200.

```json
{
  "instructionReports": [
    {
      "instruction": {
        "sourceActivityIds": [
          "aUserTask"
        ],
        "targetActivityIds": [
          "aUserTask"
        ],
        "updateEventTrigger": false
      },
      "failures": [
        "failure1",
        "failure2"
      ]
    },
    {
      "instruction": {
        "sourceActivityIds": [
          "anEvent"
        ],
        "targetActivityIds": [
          "anotherEvent"
        ],
        "updateEventTrigger": true
      },
      "failures": [
        "failure1",
        "failure2"
      ]
    }
  ]
}
```
