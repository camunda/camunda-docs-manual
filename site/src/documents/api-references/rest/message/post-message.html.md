---

title: 'Deliver a Message'
category: 'Message'

keywords: 'post'

---


Deliver a message to the process engine to either trigger a message start or intermediate message catching event.
Internally, this maps to the engine's `RuntimeService#correlateMessage` methods.
See more on the correlation behavior in the [message event documentation](ref:/api-references/bpmn20/#events-message-events).


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
    Has to be a json object containing key-value pairs that are matched against process instance variables during correlation.<br/>
    Each key is a variable name and each value a json variable value object. A variable value object has the property <code>value</code>, which is the value to update, and <code>type</code>, which represents the type of the value. Valid types are String, Integer, Short, Long, Double and Date.
    
    <strong>Note:</strong> Process instance variables are the global variables of a process instance.
    Local variables of child executions (such as in subprocesses) are not considered!</td>
  </tr>
  <tr>
    <td>processVariables</td>
    <td>A map of variables that is injected into the triggered execution or process instance after the message has been delivered.
    Each key is a variable name and each value a json variable value object. A variable value object has the property <code>value</code>, which is the value to update, and <code>type</code>, which represents the type of the value. Valid types are String, Integer, Short, Long, Double and Date.</td>
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
    <td>application/json</td>
    <td>No <code>messageName</code> was supplied or the message has not been correlated to exactly one entity (execution or process definition). Or the variable value or type is invalid. For example the value could not be parsed to an Integer value or the passed variable type is not supported. See the <a href="ref:#overview-introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
-------

#### Request

POST `/message`

Request body:

    {"messageName" : "aMessage",
    "businessKey" : "aBusinessKey",
    "correlationKeys" : {
        "aVariable" : {"value" : "aValue", "type": "String"}
    },
    "processVariables" : {
        "aVariable" : {"value" : "aNewValue", "type": "String"},
        "anotherVariable" : {"value" : true, "type": "Boolean"}
    }}

#### Response

Status 204. No content.
