---

title: 'Event-based Gateway'
category: 'Gateways'

keywords: ''

---


The event-based Gateway allows to take a decision based on events. Each outgoing sequence flow of the gateway needs to be connected to an intermediate catching event. When process execution reaches an event-based Gateway, the gateway acts like a wait state: execution is suspended. In addition, for each outgoing sequence flow, an event subscription is created.

Note the sequence flows running out of an event-based Gateway are different from ordinary sequence flows. These sequence flows are never actually "executed". On the contrary, they allow the process engine to determine which events an execution arriving at an event-based Gateway needs to subscribe to. The following restrictions apply:

*   An event-based Gateway must have two or more outgoing sequence flows.
*   An event-based Gateway must only be to elements of type intermediateCatchEvent only. 
    (Receive Tasks after an event-based Gateway are not yet supported by the engine.)
*   An intermediateCatchEvent connected to an event-based Gateway must have a single incoming sequence flow.

The following process is an example of a process with an event-based Gateway. When the execution arrives at the event-based Gateway, process execution is suspended. In addition, the process instance subscribes to the alert signal event and created a timer which fires after 10 minutes. This effectively causes the process engine to wait for ten minutes for a signal event. If the signal occurs within 10 minutes, the timer is cancelled and execution continues after the signal. If the signal is not fired, execution continues after the timer and the signal subscription is cancelled. 

<div data-bpmn-diagram="implement/event-based-gateway"></div>

The correspondig xml looks like this:

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


## Additional Resources

*   [Event-based Gateways in the BPMN Tutorial](http://camunda.org/design/reference.html#!/gateways/event)