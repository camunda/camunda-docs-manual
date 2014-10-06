---

title: 'Signal Events'
category: 'Events'

keywords: 'signal catching intermediate throw end event event definition'

---


Signal events are events which reference a named signal. A signal is an event of global scope (broadcast semantics) and is delivered to all active handlers.

The following is an example of two separate processes communicating using signals. The first process is started if an insurance policy is updated or changed. After the changes have been reviewed by a human participant, a signal event is thrown, signaling that a policy has changed:

<div data-bpmn-diagram="implement/event-signal-throwing"></div>

This event can now be caught by all process instances which are interested. The following is an example of a process subscribing to the event.

<div data-bpmn-diagram="implement/event-signal-catching"></div>

Note: It is important to understand that a signal event is broadcast to all active handlers. In of the example given above this means that all instances of the process catching the signal would receive the event.


## Signal Event Definition

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

## Throwing Signal Events via API

A signal can either be thrown by a process instance using a BPMN construct or programmatically using Java API. The following methods on the org.camunda.bpm.engine.RuntimeService can be used to throw a signal programmatically:

```java
RuntimeService.signalEventReceived(String signalName);
RuntimeService.signalEventReceived(String signalName, String executionId);
```

The difference between `signalEventReceived(String signalName)` and `signalEventReceived(String signalName, String executionId)` is that the first method throws the signal globally to all subscribed handlers (broadcast semantics) and the second method only delivers the signal to a specific execution.

Note: The signal event does not perform any kind of correlation to a specific process instance. On the contrary, it is broadcast to all process instances. If you need to exclusively deliver a signal to a specific process instance, do not use the throwing signal event but perform correlation manually and use `signalEventReceived(String signalName, String executionId)` using the appropriate query mechanisms.


## Querying for Signal Event subscriptions

It is possible to query for all executions which have subscribed to a specific signal event:

```xml
List<Execution> executions = runtimeService.createExecutionQuery()
    .signalEventSubscriptionName("alert")
    .list();
```

We could then use the signalEventReceived(String signalName, String executionId) method to deliver the signal to these executions.


## Catching Signal Events

A signal event can be caught by an intermediate catch signal event or a signal boundary event.

<p>
<div data-bpmn-symbol="intermediatecatchevent/signal" />
</p>

Note: Contrary to other events, such as the boundary error event, a boundary signal event does not only catch signal events thrown from the scope it is attached to. A signal event has a global scope (broadcast semantics), meaning that the signal can be thrown from any place, even from a different process instance.

This is straightforward in the XML:

```xml
<intermediateCatchEvent id="signal">
  <signalEventDefinition signalRef="newCustomerSignal" />
</intermediateCatchEvent>
```

or, alternatively:

```xml
<boundaryEvent id="boundary" attachedToRef="task" cancelActivity="true">
  <signalEventDefinition signalRef="alertSignal"/>
</boundaryEvent>
```

## camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-elements-camundafailedjobretrytimecycle">
        camunda:failedJobRetryTimeCycle</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundainputoutput">
        camunda:inputOutput</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>&ndash;</td>
  </tr>
</table>


## Signal Intermediate Throwing Event

An intermediate throwing signal event throws a signal event for a defined signal.

<div data-bpmn-symbol="intermediatethrowevent/signal"></div>

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

## camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-elements-camundafailedjobretrytimecycle">
        camunda:failedJobRetryTimeCycle</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundainputoutput">
        camunda:inputOutput</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>&ndash;</td>
  </tr>
</table>


## Signal End Event

<div data-bpmn-symbol="endevent/signal"></div>

A signal end event throws a signal event for a defined signal and the current path of execution is ended. It has the same behavior as a signal intermediate throwing event.

```xml
<endEvent id="signal">
        <signalEventDefinition signalRef="newCustomerSignal" />
</endEvent>
```


## Additional Resources

*   [Signal Events](http://camunda.org/bpmn/reference.html#events-signal) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)
