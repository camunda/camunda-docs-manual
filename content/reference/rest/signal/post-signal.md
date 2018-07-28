---

title: "Throw a Signal"
weight: 10

menu:
  main:
    name: "Event"
    identifier: "rest-api-signal-post-signal"
    parent: "rest-api-signal"
    pre: "POST `/signal`"

---


A signal is an event of global scope (broadcast semantics) and is delivered to all active handlers.
Internally this maps to the engine's signal event received builder method `RuntimeService#createSignalEvent()`.
For more information about the signal behavior, see the [Signal Events]({{< ref "/reference/bpmn20/events/signal-events.md" >}})
section of the [BPMN 2.0 Implementation Reference]({{< ref "/reference/bpmn20/_index.md" >}}).


# Method

POST `/signal`

# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>name</td>
    <td>The name of the signal to deliver.<br>
    <strong>Note:</strong> This property is mandatory.</td>
  </tr>
  <tr>
    <td>executionId</td>
    <td>Optionally specifies a single execution which is notified by the signal.<br>
    <strong>Note:</strong> If no execution id is defined the signal is broadcasted to all subscribed handlers.</td>
  </tr>
  <tr>
    <td>variables</td>
    <td>A JSON object containing variable key-value pairs. Each key is a variable name and each value a JSON variable value object.
    {{< rest-var-request transient="true">}}
  </tr>
  <tr>
    <td>tenantId</td>
    <td>Specifies a tenant to deliver the signal. The signal can only be received on executions or process definitions
    which belongs to the given tenant.<br>
    <strong>Note:</strong> Cannot be used in combination with <code>executionId</code>.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>If <code>true</code> the signal can only be received on executions or process definitions which belongs to no
    tenant. Value may not be <code>false</code> as this is the default behavior.<br>
    <strong>Note:</strong> Cannot be used in combination with <code>executionId</code>.</td>
  </tr>
</table>

# Result
This method returns no content.

# Response Codes

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
      <ul>
        <li>If no <code>name</code> was given</li>
        <li>If the variable value or type is invalid, for example if the value could not be parsed to an integer value
        or the passed variable type is not supported</li>
        <li>If a tenant id and an execution id is specified</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>403</td>
    <td>application/json</td>
    <td>If the user is not allowed to throw a signal event.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>
      If a single execution is specified and no such execution exists or has not subscribed to the signal.
    </td>
  </tr>
</table>

Also see the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">introduction</a> for the error
response format.

# Example


## Request

POST `/signal`

Request Body:

```json
{
  "name": "policy_conditions_changed",
  "variables": {
    "newTimePeriodInMonth": {
      "value": 24
    }
  }
}
```


## Response

Status 204. No content.
