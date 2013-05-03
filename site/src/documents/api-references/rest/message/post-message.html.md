Deliver a Message
=================

Deliver a message to the process engine to either trigger a message start or intermediate message catching event.
Internally, this maps to the engine's `RuntimeService#correlateMessage` methods.
See more on the correlation behavior in the [message event documentation](/api-references/bpmn20/#!/events/message-events).


Method
------

POST `/message`


Parameters
----------

#### Request Body

A json object with the following properties:

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
    <td>correlationKeys</td>
    <td>Used for correlation of process instances that wait for incoming messages.
    Has to be a json object containg key-value pairs that are matched against process instance variables during correlation.<br/>
    <strong>Note:</strong> Process instance variables are the global variables of a process instance.
    Local variables of child executions (such as in subprocesses) are not considered!</td>
  </tr>
  <tr>
    <td>processVariables</td>
    <td>A map of variables that is injected into the triggered execution or process instance after the message has been delivered.</td>
  </tr>
</table>


Result
------

This method returns no content.


Response codes
--------------

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
    <td></td>
    <td>No `messageName` was supplied or the message has not been correlated to exactly one entity (execution or process definition).</td>
  </tr>
</table>

Example
--------------

#### Request

POST `/message`

Request body:

    {"messageName" : "aMessage",
    "businessKey" : "aBusinessKey",
    "correlationKeys" : {
        "aVariable" : "aValue"
    },
    "processVariables" : {
        "aVariable" : "aNewValue",
        "anotherVariable" : true
    }}

#### Response

Status 204. No content.