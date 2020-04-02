---

title: "Trigger Message Event Subscription"
weight: 140

menu:
  main:
    name: "Trigger"
    identifier: "rest-api-execution-post-message"
    parent: "rest-api-execution-message-event-subscription"
    pre: "POST `/execution/{id}/messageSubscriptions/{messageName}/trigger`"

---


Delivers a message to a specific execution by id, to trigger an existing message event subscription. Inject process variables as the message's payload.


# Method

POST `/execution/{id}/messageSubscriptions/{messageName}/trigger`


# Parameters

## Path Parameters

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>The id of the execution to submit the message to.</td>
  </tr>
  <tr>
    <td>messageName</td>
    <td>The name of the message that the addressed subscription corresponds to.</td>
  </tr>
</table>


## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>variables</td>
    <td>A JSON object containing variable key-value pairs. Each key is a variable name and each value a JSON variable value object.
    {{< rest-var-request transient="true" >}}
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
    <td>The variable value or type is invalid, for example if the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
  <tr>
    <td>500</td>
    <td>application/json</td>
    <td>The addressed execution has no pending message subscriptions for the given message.
    See the <a href="{{< ref "/reference/rest/overview/_index.md#error-handling" >}}">Introduction</a> for the error response format.</td>
  </tr>
</table>

# Example

## Request

POST `/execution/anExecutionId/messageSubscriptions/someMessage/trigger`

Request Body:

    {"variables" :
        {"aVariable" : {"value" : true, "type": "Boolean"},
         "anotherVariable" : {"value" : 42, "type": "Integer"}}
    }

## Response

Status 204. No content.
