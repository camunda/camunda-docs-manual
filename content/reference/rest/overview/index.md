---

title: "Overview"
weight: 10

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

If a migration plan from one process definition version to another is not valid, a migration exception is thrown. It can be a *migration plan validation exception* where the plan itself is not valid, or a *migration instruction instance validation exception* where a migration instruction that is generally valid cannot be applied to a specific activity instance.

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
    <td>errorReport</td>
    <td>Object</td>
    <td>
      A JSON object containing details about all detected validation errors.
      It has the following properties:
      <table class="table table-striped">
        <tr>
          <th>Name</th>
          <th>Value</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>validationErrors</td>
          <td>Array</td>
          <td>A JSON array describing a single validation errors. Each validation error consists of a <code>message</code> and the <code>instruction</code> that is invalid.</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

### Migration Instruction Instance Validation Exceptions

#### Type

`MigrationInstructionInstanceValidationException`

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
    <td>The type of exception, here <code>MigrationInstructionInstanceValidationException</code>.</td>
  </tr>
  <tr>
    <td>message</td>
    <td>String</td>
    <td>The error message.</td>
  </tr>
  <tr>
    <td>errorReport</td>
    <td>Object</td>
    <td>
      A JSON object containing details about all detected validation errors.
      It has the following properties:
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
          <td>validationErrors</td>
          <td>Array</td>
          <td>An array of JSON objects describing the single validation errors. Each validation error consists of a <code>message</code>, an <code>instruction</code> that is invalid, and an array of <code>activityInstanceIds</code> that the instruction cannot be applied to.</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

# Authentication

The REST API ships with an implementation of [HTTP Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication). By default it is switched off (in the rest-api web application and therefore also in the pre-built Camunda BPM distributions). You can activate it by adding a servlet filter as described in the [Authentication]({{< relref "reference/rest/overview/authentication.md" >}}) section.
