---

title: "Deliver a Message"
weight: 10

menu:
  main:
    name: "Deliver"
    identifier: "rest-api-message-post-message"
    parent: "rest-api-message"
    pre: "POST `/message`"

---


Deliver a message to the process engine to either trigger a message start event or an intermediate message catching event.
Internally this maps to the engine's message correlation builder methods `MessageCorrelationBuilder#correlate()` and `MessageCorrelationBuilder#correlateAll()`.
For more information about the correlation behavior, see the [Message Events]({{< relref "reference/bpmn20/events/message-events.md" >}}) section of the [BPMN 2.0 Implementation Reference]({{< relref "reference/bpmn20/index.md" >}}).


# Method

POST `/message`


# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>messageName</td>
    <td>The name of the message to deliver.</td>
  </tr>
  <tr>
    <td>businessKey</td>
    <td>Used for correlation of process instances that wait for incoming messages. Will only correlate to executions that belong to a process instance with the provided business key.</td>
  </tr>
  <tr>
    <td>tenantId</td>
    <td>Used to correlate the message for a tenant with the given id. Will only correlate to executions and process definitions which belongs to the tenant.</td>
  </tr>
  <tr>
    <td>withoutTenantId</td>
    <td>A Boolean value that indicates whether the message should only be correlated to executions and process definitions which belongs to no tenant. Value may only be <code>true</code>, as <code>false</code> is the default behavior.</td>
  </tr>
  <tr>
    <td>correlationKeys</td>
    <td>Used for correlation of process instances that wait for incoming messages.
    Has to be a JSON object containing key-value pairs that are matched against process instance variables during correlation.
    Each key is a variable name and each value a JSON variable value object with the following properties.

    {{< rest-var-request-primitive-only >}}

    <p><strong>Note:</strong> Process instance variables are the global variables of a process instance.
    Local variables of child executions (such as in subprocesses) are not considered!</p></td>
  </tr>
  <tr>
    <td>processVariables</td>
    <td>A map of variables that is injected into the triggered execution or process instance after the message has been delivered.
    Each key is a variable name and each value a JSON variable value object with the following properties.
    {{< rest-var-request >}}
  </tr>
  <tr>
    <td>all</td>
    <td>A Boolean value that indicates whether the message should be correlated to exactly one entity or multiple entities. If the value is set to <code>false</code> the message will be correlated to exactly one entity (execution or process definition). If the value is set to <code>true</code> the message will be correlated to multiple executions and a process definition that can be instantiated by this message in one go.</td>
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
    <td>If no <code>messageName</code> was supplied. If both <code>tenantId</code> and <code>withoutTenantId</code> are supplied.</br>
    If the message has not been correlated to exactly one entity (execution or process definition), or the variable value or type is invalid, for example if the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="{{< relref "reference/rest/overview/index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example


## Request

POST `/message`

Request Body:

    {"messageName" : "aMessage",
    "businessKey" : "aBusinessKey",
    "correlationKeys" : {
        "aVariable" : {"value" : "aValue", "type": "String"}
    },
    "processVariables" : {
        "aVariable" : {"value" : "aNewValue", "type": "String"},
        "anotherVariable" : {"value" : true, "type": "Boolean"}
    }
    }

## Response

Status 204. No content.
