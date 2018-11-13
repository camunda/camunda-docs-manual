---

title: "Overview"
weight: 10
layout: "single"

menu:
  main:
    identifier: "rest-api-overview"
    parent: "rest-api"

---


The goal of the REST API is to provide access to all relevant interfaces of the engine.


# Structure

These documents explain all existing methods in the REST API. For each method they provide:

* An informal description
* HTTP verb and URL
* Possible query, path or message body parameters
* A detailed description of the response content
* Possible response codes
* A brief example request and response


# Engine Usage

The methods as described work on the default process engine as given by the available `ProcessEngineProvider` service.

You may prepend `/engine/{name}` to any of the methods (unless otherwise documented) to access another engine where `{name}` is the name of the process engine as returned by `ProcessEngine#getName()`, e.g., `/engine/myEngineName/task`.


# Error Handling

For every method this documentation gives possible HTTP status codes. The error code explanations do not cover all possible error causes that may arise when the request is served, for example, most of the requests will not work properly if there are problems with database access. Any of these undocumented errors will be translated to a HTTP 500 error.

All errors also provide a JSON response body of the form:

```json
  {
    "type" : "SomeExceptionClass",
    "message" : "a detailed message"
  }
```

## Authorization Exceptions

If an already authenticated user interacts with a resource in an unauthorized way, the status code of the response will be set to `403, Forbidden`. Details about the unauthorized interaction are provided in the response body.

#### Type

`AuthorizationException`

#### Response Body

```json
{"type" : "AuthorizationException",
 "message" : "The user with id 'jonny' does not have 'DELETE' permission on resource 'Mary' of type 'User'.",
 "userId" : "jonny",
 "permissionName" : "DELETE",
 "resourceName" : "User",
 "resourceId" : "Mary"}
```

## Migration Validation Exceptions

If a migration plan from one process definition version to another is not
valid, a migration exception is thrown. It can be a *migration plan validation
exception* where the plan itself is not valid, e.g., it contains an invalid
instruction. Or it can be a *migrating process instance validation exception* when a
migration plan cannot be applied to a specific process instance, e.g., an active
activity was not mapped by the migration plan.

### Migration Plan Validation Exceptions

#### Type

`MigrationPlanValidationException`

#### Response Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>The type of exception, here <code>MigrationPlanValidationException</code>.</td>
  </tr>
  <tr>
    <td>message</td>
    <td>String</td>
    <td>The error message.</td>
  </tr>
  <tr>
    <td>validationReport</td>
    <td>Object</td>
    <td>
      A JSON object containing details about all detected validation errors.
      Its properties are described below.
    </td>
  </tr>
</table>

Every validation report object contains the following properties:

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
      A JSON array describing a single instruction validation report.
      Each report object consists of an <code>instruction</code> that is
      invalid and a <code>failures</code> array containing the validation
      messages for this instruction.
    </td>
  </tr>
</table>

#### Example

```json
{
  "type": "MigrationPlanValidationException",
  "message": "ENGINE-23001 Migration plan for process definition 'invoice:1:8aa1533c-23e5-11e6-abb7-f6aefe19b687' to 'invoice:2:8accd012-23e5-11e6-abb7-f6aefe19b687' is not valid:\n\t Migration instruction MigrationInstructionImpl{sourceActivityId='approveInvoice', targetActivityId='assignApprover', updateEventTrigger='false'} is not valid:\n\t\tActivities have incompatible types (UserTaskActivityBehavior is not compatible with DmnBusinessRuleTaskActivityBehavior)\n",
  "validationReport": {
    "instructionReports": [
      {
        "instruction": {
          "sourceActivityIds": [
            "approveInvoice"
          ],
          "targetActivityIds": [
            "assignApprover"
          ],
          "updateEventTrigger": false
        },
        "failures": [
          "Activities have incompatible types (UserTaskActivityBehavior is not compatible with DmnBusinessRuleTaskActivityBehavior)"
        ]
      }
    ]
  }
}
```

### Migrating Process Instance Validation Exceptions

#### Type

`MigratingProcessInstanceValidationException`

#### Response Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>type</td>
    <td>String</td>
    <td>The type of exception, here <code>MigratingProcessInstanceValidationException</code>.</td>
  </tr>
  <tr>
    <td>message</td>
    <td>String</td>
    <td>The error message.</td>
  </tr>
  <tr>
    <td>validationReport</td>
    <td>Object</td>
    <td>
      A JSON object containing details about all detected validation errors.
      Its properties are described below.
    </td>
  </tr>
</table>

Every validation report object contains the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>processInstanceId</td>
    <td>String</td>
    <td>The id of the process instance that cannot be migrated when following the migration plan.</td>
  </tr>
  <tr>
    <td>failures</td>
    <td>Array</td>
    <td>
      An array of general failure messages, which are not related to
      a specific activity or transition.
    </td>
  </tr>
  <tr>
    <td>activityInstanceValidationReports</td>
    <td>Array</td>
    <td>
      An array of JSON objects describing the single activity instance
      validation errors. Each activity instance validation report
      consists of a <code>migrationInstruction</code>, if the error is
      related to an existing migration instruction, the
      <code>activityInstanceId</code> and <code>sourceScopeId</code>
      of the activity which cannot be migrated and an array
      <code>failures</code>, which is a list of all validation error
      messages for this report.
    </td>
  </tr>
  <tr>
    <td>transitionInstanceValidationReports</td>
    <td>Array</td>
    <td>
      An array of JSON objects describing the single transition instance
      validation errors. Each transition instance validation report
      consists of a <code>migrationInstruction</code>, if the error is
      related to an existing migration instruction, the
      <code>transitionInstanceId</code> and <code>sourceScopeId</code>
      of the transition which cannot be migrated and an array
      <code>failures</code>, which is a list of all validation error
      messages for this report.
    </td>
  </tr>
</table>

#### Example

```json
{
  "type": "MigratingProcessInstanceValidationException",
  "message": "ENGINE-23004 Cannot migrate process instance '96dc383f-23eb-11e6-8e4a-f6aefe19b687':\n\tCannot migrate activity instance 'approveInvoice:f59925bc-23eb-11e6-8e4a-f6aefe19b687':\n\t\tThere is no migration instruction for this instance's activity\n\tCannot migrate transition instance 'f598897a-23eb-11e6-8e4a-f6aefe19b687':\n\t\tThere is no migration instruction for this instance's activity\n",
  "validationReport": {
    "processInstanceId": "96dc383f-23eb-11e6-8e4a-f6aefe19b687",
    "failures": [],
    "activityInstanceValidationReports": [
      {
        "migrationInstruction": null,
        "activityInstanceId": "approveInvoice:f59925bc-23eb-11e6-8e4a-f6aefe19b687",
        "sourceScopeId": "approveInvoice",
        "failures": [
          "There is no migration instruction for this instance's activity"
        ]
      }
    ],
    "transitionInstanceValidationReports": [
      {
        "migrationInstruction": null,
        "transitionInstanceId": "f598897a-23eb-11e6-8e4a-f6aefe19b687",
        "sourceScopeId": "ServiceTask_1",
        "failures": [
          "There is no migration instruction for this instance's activity"
        ]
      }
    ]
  }
}
```

# Authentication

The REST API ships with an implementation of [HTTP Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication). By default it is switched off (in the rest-api web application and therefore also in the pre-built Camunda BPM distributions). You can activate it by adding a servlet filter as described in the [Authentication]({{< ref "/reference/rest/overview/authentication.md" >}}) section.
