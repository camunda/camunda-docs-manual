---

title: 'Message Events'
weight: 30

menu:
  main:
    identifier: "bpmn-ref-events-message-events"
    parent: "bpmn-ref-events"
    pre: "Events catching / throwing messages."
---

Message events are events which reference a named message. A message has a name and a payload. Unlike a signal, a message event is always directed at a single recipient.


# Defining a Message

A message event definition is declared by using the `messageEventDefinition` element. The attribute `messageRef` references a message element declared as a child element of the definitions root element. The following is an excerpt of a process in which two message events are declared and referenced by a start event and an intermediate catching message event.

## Example

```xml
<definitions id="definitions"
  xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:camunda="http://activiti.org/bpmn"
  targetNamespace="Examples"
  xmlns:tns="Examples">

  <message id="newInvoice" name="newInvoiceMessage" />
  <message id="payment" name="paymentMessage" />

  <process id="invoiceProcess">

    <startEvent id="messageStart" >
        <messageEventDefinition messageRef="newInvoice" />
    </startEvent>
    ...
    <intermediateCatchEvent id="paymentEvt" >
        <messageEventDefinition messageRef="payment" />
    </intermediateCatchEvent>
    ...
  </process>
</definitions>
```

## Expressions

You can use expressions for the name in the message event definition (except for the message start event). The name is then resolved as soon as a process reaches the scope of the message. For example when the process instances reaches a Message Intermediate Catching Event, then the expression within the name is resolved.

By using expressions within the message name, you can influence the message name dynamically based on process variables. An example could look as follows:

```xml
<message id="newInvoice" name="newInvoiceMessage-${execution.processBusinessKey}" />
```

**Note:** It is not allowed to use expressions in the message name of a start event of the process definition. So using an expression in the message definition and then referencing this definition in a message start event of the process entry point will cause an error. However, it is allowed to use expressions in the message start event of a subprocess. Therefore, using an expression in the message definition and then referencing this definition in the message start event within a subprocess will work just fine.

## Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#asyncbefore" >}}">camunda:asyncBefore</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#asyncafter" >}}">camunda:asyncAfter</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#exclusive" >}}">camunda:exclusive</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#jobpriority" >}}">camunda:jobPriority</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#inputoutput" >}}">camunda:inputOutput</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>&ndash;</td>
  </tr>
</table>

# Message Api

As an embeddable process engine, the Camunda engine is not concerned with the receiving part of the message. This would be environment dependent and entails platform-specific activities such as connecting to a JMS (Java Messaging Service) Queue/Topic or processing a Webservice or REST request. The reception of messages is therefore something you have to implement as part of the application or infrastructure into which the process engine is embedded.

After you have received a message, you can choose whether you employ the engine's built-in correlation or explicitly deliver the message to start a new process instance or trigger a waiting execution.

## Using the Runtime Service's Correlation Methods

The engine offers a basic correlation mechanism that will either signal an execution waiting for a specific message or instantiate a process with a matching message start event. The `RuntimeService` provides a fluent message correlation API:

The result of the correlation is an object of type `MessageCorrelationResult`. It contains the type of the correlation, which is either `execution` or `processDefinition`.
The first type is set if the message was correlated to an intermediate message catch event. The second is set if the message was correlated to a start event.
If the type is set to `execution`, then the result contains an `Execution` object which can be accessed via the `result.getExecution()` method. If the type is set to 
`processDefinition`, the result contains a `ProcessInstance` object which was created through the start event, which is accessible via the `result.getProcessInstance()` method.

```java
// correlate the message
MessageCorrelationResult result = runtimeService.createMessageCorrelation("messageName")
  .processInstanceBusinessKey("AB-123")
  .setVariable("payment_type", "creditCard")
  .correlateWithResult();
```
You can also explicitly query for the subscription and trigger it:

```java
ProcessInstance pi = runtimeService.startProcessInstanceByKey("processWaitingInReceiveTask");

EventSubscription subscription = runtimeService.createEventSubscriptionQuery()
  .processInstanceId(pi.getId()).eventType("message").singleResult();

runtimeService.messageEventReceived(subscription.getEventName(), subscription.getExecutionId());
```
The `messageName` identifies the message as defined in the message name attribute in the process definition xml.

Correlation is successful if a single matching entity exists among the following:

* **Process Definition**: A process definition matches if it can be started by a message named `messageName`.
* **Execution (Process Instance)**: An execution matches if it is waiting for a message named `messageName` (if provided) and its process instance matches the given `businessKey` and `correlationKeys` (if provided). The `correlationKeys` map is matched against the process instance variables. If `messageName` is not provided, any execution that matches the other criteria matches the overall correlation. This can be useful when the sending party only knows a dynamic correlation key but not the message name as defined in the process model.

Alternatively, it is possible to correlate a message to multiple matched executions and to a process definition that can be instantiated by this message in one go. To do so, you can correlate a message by using the message correlation builder as follows:

```java
List<MessageCorrelationResult> results = runtimeService
  .createMessageCorrelation("aMessageName")
  .correlateAllWithResult();
```
The result will be a list of `MessageCorrelationResult` objects. Each result corresponds to a correlation.

It is possible to retrieve the process variables on message correlation. By specifying the boolean parameter `shouldDeserializeValues`, you decide whether the variables' values to be serialized or not. Please see the example below:

```java
MessageCorrelationResultWithVariables result = runtimeService
  .createMessageCorrelation("aMessageName")
  .setVariable("name", "value")
  .correlateWithResultAndVariables(shouldDeserializeValues);
VariableMap processVariables = result.getVariables();
```

Additionally, message correlation builder provides the possibility to correlate the message by local execution variables.
  
```java
List<MessageCorrelationResult> results = runtimeService
  .createMessageCorrelation("aMessageName")
  .localVariableEquals("localVarName", "localVarValue"))
  .correlateAllWithResult();
```

In this case the matching execution will be selected based on variables existing in it's scope (ignoring all parent scopes).

In case of successful correlation, the correlated or newly created process instance is updated with the variables from the `processVariables` map.


## Explicitly Triggering a Message

Alternatively, you can explicitly deliver a message to start a process instance or trigger a waiting execution.

If the message should trigger the starting of a new process instance then you can use the correlation API:

```java
ProcessInstance startedProcessInstance = runtimeService
  .createMessageCorrelation("messageName")
  .processInstanceBusinessKey("businessKey")
  .setVariable("name", "value")
  .correlateStartMessage();

// or

MessageCorrelationResultWithVariables result = runtimeService
  .createMessageCorrelation("aMessageName")
  .processInstanceBusinessKey("businessKey")
  .startMessageOnly()
  .setVariable("name", "value")
  .correlateWithResultAndVariables(shouldDeserializeValues);
ProcessInstance startedProcessInstance = result.getProcessInstance();
VariableMap processVariables = result.getVariables();
```

Or you can use one of the following methods offered by the runtime service:

```java
ProcessInstance startProcessInstanceByMessage(String messageName);
ProcessInstance startProcessInstanceByMessage(String messageName, Map<String, Object> processVariables);
ProcessInstance startProcessInstanceByMessage(String messageName, String businessKey, Map<String, Object> processVariables);
```

These methods allow starting a process instance using the referenced message.

If the message needs to be received by an existing process instance, you first have to correlate the message to a specific process instance (see the next section) and then trigger continuation of the waiting execution. The runtime service offers the following methods to trigger an execution based on a message event subscription:

```java
void messageEventReceived(String messageName, String executionId);
void messageEventReceived(String messageName, String executionId, HashMap<String, Object> processVariables);
```



## Querying for Message Event Subscriptions

The engine supports message start events and intermediate message events.

In case of a message start event, the message event subscription is associated with a particular process definition. Such message subscriptions can be queried using a ProcessDefinitionQuery:

```java
ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
  .messageEventSubscription("newCallCenterBooking")
  .singleResult();
```

As there can only be one process definition for a specific message subscription, the query always returns zero or one results. If a process definition is updated, only the newest version of the process definition has a subscription to the message event.

In case of an intermediate catch message event, the message event subscription is associated with a particular execution. Such message event subscriptions can be queried using an ExecutionQuery:

```java
Execution execution = runtimeService.createExecutionQuery()
  .messageEventSubscriptionName("paymentReceived")
  .processVariableValueEquals("orderId", message.getOrderId())
  .singleResult();
```

Such queries are called correlation queries and usually require knowledge about the processes (in this case, there is a maximum of one process instance for a given orderId).


# Message Start Event

A message start event can be used to start a process instance using a named message. This effectively allows us to select the right start event from a set of alternative start events using the message name.

When deploying a process definition with one or more message start events, the following considerations apply:

* The name of the message start event must be unique across a given process definition, i.e., a process definition must not have multiple message start events with the same name. The engine throws an exception upon deployment of a process definition in case two or more message start events reference the same message or if two or more message start events reference messages with the same message name.
* The name of the message start event must be unique across all deployed process definitions. The engine throws an exception upon deployment of a process definition in case one or more message start events reference a message with the same name as a message start event already deployed by a different process definition.
* Process versioning: Upon deployment of a new version of a process definition, the message subscriptions of the previous version are canceled. This is also the case for message events that are not present in the new version.

When starting a process instance, a message start event can be triggered using the following methods on the RuntimeService:

```java
ProcessInstance startProcessInstanceByMessage(String messageName);
ProcessInstance startProcessInstanceByMessage(String messageName, Map<String, Object> processVariables);
ProcessInstance startProcessInstanceByMessage(String messageName, String businessKey, Map<String, Object> processVariables);
```

The messageName is the name given in the name attribute of the message element referenced by the messageRef attribute of the messageEventDefinition. The following considerations apply when starting a process instance:

* Message start events are only supported in top-level processes. Message start events are not supported in embedded sub processes.
* If a process definition has multiple message start events, `runtimeService.startProcessInstanceByMessage(...)` allows selection of the appropriate start event.
* If a process definition has multiple message start events and a single none start event, `runtimeService.startProcessInstanceByKey(...)` and `runtimeService.startProcessInstanceById(...)` start a process instance using the none start event.
* If a process definition has multiple message start events and no none start event, `runtimeService.startProcessInstanceByKey(...)` and `runtimeService.startProcessInstanceById(...)` throw an exception.
* If a process definition has a single message start event, `runtimeService.startProcessInstanceByKey(...)` and `runtimeService.startProcessInstanceById(...)` start a new process instance using the message start event.
* If a process is started from a call activity, message start event(s) are only supported if
    * in addition to the message start event(s), the process has a single none start event
    * the process has a single message start event and no other start events.

The XML representation of a message start event is the normal start event declaration with a messageEventDefinition child-element:

```xml
<definitions id="definitions"
  xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:camunda="http://activiti.org/bpmn"
  targetNamespace="Examples"
  xmlns:tns="Examples">

  <message id="newInvoice" name="newInvoiceMessage" />

  <process id="invoiceProcess">

    <startEvent id="messageStart" >
        <messageEventDefinition messageRef="tns:newInvoice" />
    </startEvent>
    ...
  </process>

</definitions>
```

A process can be started using one of two different messages, this is useful if the process needs alternative ways to react to different start events but eventually continues in a uniform way.

<div data-bpmn-diagram="../bpmn/event-message-start-alternative" > </div>


# Message Intermediate Catching Event


When a token arrives at the message intermediate catching event it will wait there until a message with the proper name arrives. As already described, the message must be handed into the engine via the appropriate API calls.

The following example shows different message events in a process model:

<div data-bpmn-diagram="../bpmn/event-message"></div>

```xml
<intermediateCatchEvent id="message">
  <messageEventDefinition messageRef="newCustomerMessage" />
</intermediateCatchEvent>
```

Instead of the message intermediate catching event you might want to think about a <a href="{{< ref "/reference/bpmn20/tasks/receive-task.md" >}}">Receive Task</a> instead, which can serve similar purposes but is able to be used in combination with boundary events. In combination with the message intermediate catching event you might want to use an <a href="{{< ref "/reference/bpmn20/gateways/event-based-gateway.md" >}}">Event-based Gateway</a>.


# Message Boundary Event

Boundary events are catching events that are attached to an activity. This means that while the activity is running, the message boundary event is listening for named message. When this is caught, two things might happen, depending on the configuration of the boundary event:

* Interrupting boundary event: The activity is interrupted and the sequence flow going out of the event is followed.
* Non-interrupting boundary event: One token stays in the activity and an additional token is created which follows the sequence flow going out of the event.


# Message Intermediate Throwing Event

A Message Intermediate Throwing event sends a message to an external service. This event has the same behavior as a [Service Task]({{< ref "/reference/bpmn20/tasks/service-task.md" >}}).

<div data-bpmn-diagram="../bpmn/event-message-throwing" > </div>

```xml
<intermediateThrowEvent id="message">
  <messageEventDefinition camunda:class="org.camunda.bpm.MyMessageServiceDelegate" />
</intermediateThrowEvent>
```


## Camunda Extensions for `messageEventDefinition`

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#class" >}}">camunda:class</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#delegateexpression" >}}">camunda:delegateExpression</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#expression" >}}">camunda:expression</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#resultvariable" >}}">camunda:resultVariable</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#topic" >}}">camunda:topic</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#type" >}}">camunda:type</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#taskpriority" >}}">camunda:taskPriority</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#field" >}}">camunda:field</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#connector" >}}">camunda:connector</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      One of the attributes <code>camunda:class</code>, <code>camunda:delegateExpression</code>, <code>camunda:type</code> or <code>camunda:expression</code> is mandatory
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attribute <code>camunda:resultVariable</code> can only be used in combination with the <code>camunda:expression</code> attribute
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attribute <code>camunda:type</code> can only be set to <code>external</code>.
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attribute <code>camunda:topic</code> can only be used when the <code>camunda:type</code> attribute is set to <code>external</code>.
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attribute <code>camunda:taskPriority</code> can only be used when the <code>camunda:type</code> attribute is set to <code>external</code>.
    </td>
  </tr>
</table>


# Message End Event

When process execution arrives at a Message End Event, the current path of execution is ended and a message is sent. The Message End Event has the same behavior as a [Service Task]({{< ref "/reference/bpmn20/tasks/service-task.md" >}}).

```xml
<endEvent id="end">
  <messageEventDefinition camunda:class="org.camunda.bpm.MyMessageServiceDelegate" />
</endEvent>
```


## Camunda Extensions for `messageEventDefinition`

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#class" >}}">camunda:class</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#delegateexpression" >}}">camunda:delegateExpression</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#expression" >}}">camunda:expression</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#resultvariable" >}}">camunda:resultVariable</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#topic" >}}">camunda:topic</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#type" >}}">camunda:type</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#taskpriority" >}}">camunda:taskPriority</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#field" >}}">camunda:field</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#connector" >}}">camunda:connector</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      One of the attributes <code>camunda:class</code>, <code>camunda:delegateExpression</code>, <code>camunda:type</code> or <code>camunda:expression</code> is mandatory
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attribute <code>camunda:resultVariable</code> can only be used in combination with the <code>camunda:expression</code> attribute
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attribute <code>camunda:type</code> can only be set to <code>external</code>.
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attribute <code>camunda:topic</code> can only be used when the <code>camunda:type</code> attribute is set to <code>external</code>.
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attribute <code>camunda:taskPriority</code> can only be used when the <code>camunda:type</code> attribute is set to <code>external</code>.
    </td>
  </tr>
</table>
