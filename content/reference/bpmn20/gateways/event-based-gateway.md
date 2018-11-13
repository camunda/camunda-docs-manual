---

title: 'Event-based Gateway'
weight: 50

menu:
  main:
    identifier: "bpmn-ref-gateways-event-based"
    parent: "bpmn-ref-gateways"
    pre: "Model decisions based on events."

---

The event-based Gateway allows you to make a decision based on events. Each outgoing sequence flow of the gateway needs to be connected to an intermediate catching event. When process execution reaches an event-based Gateway, the gateway acts like a wait state: execution is suspended. In addition, an event subscription is created for each outgoing sequence flow.

Note that the sequence flows running out of an event-based Gateway are different than ordinary sequence flows. These sequence flows are never actually "executed". On the contrary, they allow the process engine to determine which events an execution arriving at an event-based Gateway needs to subscribe to. The following restrictions apply:

*   An event-based Gateway must have two or more outgoing sequence flows.
*   An event-based Gateway may only be followed by elements of the type intermediateCatchEvent.
    (Receive Tasks after an event-based Gateway are not supported by the engine yet.)
*   An intermediateCatchEvent connected to an event-based Gateway must have a single incoming sequence flow.

The following process is an example of a process with an event-based Gateway. When the execution arrives at the event-based Gateway, process execution is suspended. Additionally, the process instance subscribes to the alert signal event and creates a timer which fires after 10 minutes. This effectively causes the process engine to wait for ten minutes for a signal event. If the signal event occurs within 10 minutes, the timer is canceled and execution continues after the signal. If the signal is not fired, execution continues after the timer and the signal subscription is canceled.

<div data-bpmn-diagram="../bpmn/event-based-gateway"></div>

The corresponding xml looks like this:

```xml
<definitions>
  <signal id="alertSignal" name="alert" />
  <process id="catchSignal">
    <startEvent id="start" />

    <sequenceFlow sourceRef="start" targetRef="gw1" />

    <eventBasedGateway id="gw1" />

    <sequenceFlow sourceRef="gw1" targetRef="signalEvent" />
    <sequenceFlow sourceRef="gw1" targetRef="timerEvent" />

    <intermediateCatchEvent id="signalEvent" name="Alert">
      <signalEventDefinition signalRef="alertSignal" />
    </intermediateCatchEvent>

    <intermediateCatchEvent id="timerEvent" name="Alert">
      <timerEventDefinition>
        <timeDuration>PT10M</timeDuration>
      </timerEventDefinition>
    </intermediateCatchEvent>

    <sequenceFlow sourceRef="timerEvent" targetRef="exGw1" />
    <sequenceFlow sourceRef="signalEvent" targetRef="task" />

    <userTask id="task" name="Handle alert"/>

    <exclusiveGateway id="exGw1" />

    <sequenceFlow sourceRef="task" targetRef="exGw1" />
    <sequenceFlow sourceRef="exGw1" targetRef="end" />

    <endEvent id="end" />
  </process>
</definitions>
```


# Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#asyncbefore" >}}">camunda:asyncBefore</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#exclusive" >}}">camunda:exclusive</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#jobpriority" >}}">camunda:jobPriority</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#failedjobretrytimecycle" >}}">camunda:failedJobRetryTimeCycle</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#executionlistener" >}}">camunda:executionListener</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      The <code>camunda:exclusive</code> attribute is only evaluated if the attribute
      <code>camunda:asyncBefore</code> is set to <code>true</code>
    </td>
  </tr>
</table>


# Additional Resources

*   [Event-based Gateways](http://camunda.org/bpmn/reference.html#gateways-event-based-gateways) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)
