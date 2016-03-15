---

title: 'Signal Events'
weight: 60

menu:
  main:
    identifier: "bpmn-ref-events-signal-events"
    parent: "bpmn-ref-events"
    pre: "Events catching / throwing signals."
---


Signal events are events which reference a named signal. A signal is an event of global scope (broadcast semantics) and is delivered to all active handlers.

The following is an example of two separate processes communicating using signals. The first process is started if an insurance policy is updated or changed. After the changes have been reviewed by a human participant, a signal event is thrown, signaling that a policy has changed:

<div data-bpmn-diagram="../bpmn/event-signal-throwing"></div>

This event can now be caught by all process instances which are interested. The following is an example of a process subscribing to the event.

<div data-bpmn-diagram="../bpmn/event-signal-catching"></div>

Note: It is important to understand that a signal event is broadcast to all active handlers. In of the example given above this means that all instances of the process catching the signal would receive the event.


# Signal Event Definition

A signal event definition is declared using the signalEventDefinition element. The attribute `signalRef` references a signal element declared as a child element of the definitions root element. The following is an excerpt of a process in which a signal event is thrown and caught by intermediate events. The signalEventDefinitions reference the 'global' signal element.


```xml
<definitions>
  <!-- declaration of the signal -->
  <signal id="alertSignal" name="alert" />

  <process id="catchSignal">
    <intermediateThrowEvent id="throwSignalEvent" name="Alert">
      <!-- signal event definition -->
      <signalEventDefinition signalRef="alertSignal" />
    </intermediateThrowEvent>
    <!-- ... -->
    <intermediateCatchEvent id="catchSignalEvent" name="On Alert">
      <!-- signal event definition -->
      <signalEventDefinition signalRef="alertSignal" />
    </intermediateCatchEvent>
    <!-- ... -->
  </process>
</definitions>
```

__Note__: Contrary to other events, such error events, a signal is not consumed if it is caught. If you have two active signal boundary events catching the same signal event, both boundary events are triggered, event if they are part of different process instances.


# Signal Api

## Triggering (Throwing) Signals

A signal can either be thrown by a process instance using a BPMN construct or programmatically using Java API. The `RuntimeService` provides a fluent API to throw a signal programmatically:

```java
// broadcast signal
runtimeService
  .createSignalEvent("signalName")
  .setVariables(variables)
  .send();
  
// deliver a signal to a single execution
runtimeService
  .createSignalEvent("signalName")
  .executionId(executionId)
  .setVariables(variables)
  .send();  
```

Additionally, you can use one of the following methods offered by the `RuntimeService`:

```java
RuntimeService.signalEventReceived(String signalName);
RuntimeService.signalEventReceived(String signalName, String executionId);
```

If an execution id is specified then the signal is only delivered to the specific execution. Otherwise, the signal is thrown globally to all subscribed handlers (broadcast semantics).

Note: The signal event does not perform any kind of correlation to a specific process instance. On the contrary, it is broadcast to all process instances. If you need to exclusively deliver a signal to a specific process instance, do not use the throwing signal event. Instead, perform the correlation manually using the appropriate query mechanisms and deliver the signal to a specific execution programmatically.

## Querying for Signal Event Subscriptions

It is possible to query for all executions which have subscribed to a specific signal event:

```xml
List<Execution> executions = runtimeService.createExecutionQuery()
    .signalEventSubscriptionName("alert")
    .list();
```

You could then use the signal API to deliver the signal to these executions.

# Catching Signal Events

## Signal Start Event

{{< bpmn-symbol type="signal-start-event" >}}

A signal start event can be used to start a process instance using a named signal.

When deploying a process definition with one or more signal start events, the following considerations apply:

* The name of the signal start event must be unique across a given process definition, i.e. a process definition must not have multiple signal start events with the same name. The engine throws an exception upon deployment of a process definition in case two or more signal start events reference the same signal or if two or more signal start events reference signals with the same signal name.
* Contrary to message start events, the name of the signal start event does not have to be unique across all deployed process definitions.
* Process versioning: Upon deployment of a new version of a process definition, the signal subscriptions of the previous version are canceled. This is also the case for signal events that are not present in the new version.

A process instance of a process definition with one or more signal start events will be started, when thrown a signal with a proper name. The signal can either be thrown by a process instance (i.e. on intermediate throwing signal event or signal end event) or using the following methods on the RuntimeService:

```java
void signalEventReceived(String signalName);
void signalEventReceived(String signalName, Map<String, Object> processVariables);
```

Note: A thrown signal can start multiple process instances when multiple process definitions have a signal start event with the same signal name.

The XML representation of a signal start event is the normal start event declaration with a signalEventDefinition child-element:

```xml
<startEvent id="signalStart" >
  <signalEventDefinition signalRef="alertSignal" />
</startEvent>
```

## Signal Intermediate Catching Event

{{< bpmn-symbol type="signal-intermediate-catch-event" >}}

When a token arrives at the signal intermediate catching event, it will wait there until a signal with the proper name arrives.

```xml
<intermediateCatchEvent id="signal">
  <signalEventDefinition signalRef="newCustomerSignal" />
</intermediateCatchEvent>
```

## Camunda Extensions

The following extensions are supported for the Signal Intermediate Catching Event:

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#inputoutput" >}}">
        camunda:inputOutput</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>&ndash;</td>
  </tr>
</table>

## Signal Boundary Event

When an execution arrives in the activity to which the signal boundary event is attached, the signal boundary event catches signals with the proper name.

Note: Contrary to other events, such as the error boundary event, a signal boundary event does not only catch signal events thrown from the scope it is attached to. A signal event has a global scope (broadcast semantics), meaning that the signal can be thrown from any place, even from a different process instance.

```xml
<boundaryEvent id="boundary" attachedToRef="task" cancelActivity="true">
  <signalEventDefinition signalRef="alertSignal"/>
</boundaryEvent>
```

# Throwing Signal Events

## Signal Intermediate Throwing Event

An intermediate throwing signal event throws a signal event for a defined signal.

{{< bpmn-symbol type="signal-intermediate-throw-event" >}}

The signal is broadcast to all active handlers (i.e. all catching signal events). Signals can be published synchronously or asynchronously.

*   In the default configuration, the signal is delivered synchronously. This means that the throwing process instance waits until the signal is delivered to all catching process instances. The catching process instances are also notified in the same transaction as the throwing process instance, which means that if one of the notified instances produces a technical error (throws an exception), all involved instances fail.
*   A signal can also be delivered asynchronously. In that case it is determined which handlers are active at the time the throwing signal event is reached. For each active handler, an asynchronous notification message (Job) is stored and delivered by the JobExecutor.</li>

A signal intermediate event is defined as an intermediate throwing event. In this case, the specific type sub-element is a signalEventDefinition element.

```xml
<intermediateThrowEvent id="signal">
  <signalEventDefinition signalRef="newCustomerSignal" />
</intermediateThrowEvent>
```

An asynchronous signal event would look like this:

```xml
<intermediateThrowEvent id="signal">
  <signalEventDefinition signalRef="newCustomerSignal" camunda:async="true" />
</intermediateThrowEvent>
```

## Camunda Extensions

The following extensions are spported for the Signal Intermediate Throwing Event:

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#failedjobretrytimecycle" >}}">
        camunda:failedJobRetryTimeCycle</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#inputoutput" >}}">
        camunda:inputOutput</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>&ndash;</td>
  </tr>
</table>


## Signal End Event

{{< bpmn-symbol type="signal-end-event" >}}

A signal end event throws a signal event for a defined signal and the current path of execution is ended. It has the same behavior as a signal intermediate throwing event.

```xml
<endEvent id="signal">
        <signalEventDefinition signalRef="newCustomerSignal" />
</endEvent>
```


# Additional Resources

*   [Signal Events](http://camunda.org/bpmn/reference.html#events-signal) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)
