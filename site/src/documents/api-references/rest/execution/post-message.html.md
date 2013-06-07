Trigger Message Event Subscription
==================================

Deliver a message to a specific execution to trigger an existing message event subscription. Inject process variables as the message's payload.


Method
------

POST `/execution/{id}/messageSubscriptions/{messageName}/trigger`


Parameters
----------

#### Path Parameters

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
    <td>variables</td>
    <td>A json object containing variable key-value pairs. Each key is a variable name and each value a json variable value object.
    A variable value object has has the property `value`, which is the value to update.</td>
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
    <td>500</td>
    <td>application/json</td>
    <td>The addressed execution has no pending message subscriptions for the given message.
    See the <a href="/api-references/rest/#!/overview/introduction">Introduction</a> for the error response format.</td>
  </tr>
</table>

Example
--------------

#### Request

POST `/execution/anExecutionId/messageSubscriptions/someMessage/trigger`

Request body:

    {"messageName" : "aMessage",
    "variables" :
        {"aVariableName" : {"value" : true},
        "anotherVariableName" : {"value" : 42}}
    }

#### Response

Status 204. No content.