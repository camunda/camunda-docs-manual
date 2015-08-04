---

title: 'Cancel and Compensation Events'
category: 'Events'

keywords: 'cancel end boundary compensation intermediate throwing boundary event definition'

---


Cancel and compensation events occur in the context of the [transaction subprocess](ref:#subprocesses-transaction-subprocess). Please read that section first to understand the overall idea.


## Cancel End Event

The cancel end event can only be used in combination with a [transaction subprocess](ref:#subprocesses-transaction-subprocess). When the cancel end event is reached, a cancel event is thrown which must be caught by a cancel boundary event. The cancel boundary event then cancels the transaction and triggers compensation.


## Cancel Boundary Event

An attached intermediate catching cancel event on the boundary of a transaction subprocess, or, for short, a cancel boundary event, is triggered when a transaction is canceled. When the cancel boundary event is triggered, it first interrupts all executions active in the current scope. Next, it starts compensation of all active compensation boundary events in the scope of the transaction. Compensation is performed synchronously, i.e. the boundary event waits before compensation is completed before leaving the transaction. When compensation is completed, the transaction subprocess is left using the sequence flow(s) running out of the cancel boundary event.

<div data-bpmn-symbol="intermediatecatchevent/cancel"></div>

Note: Only a single cancel boundary event is allowed for a transaction subprocess.

Note: If the transaction subprocess hosts nested subprocesses, compensation is only triggered for subprocesses that have completed successfully.

Note: In case a cancel boundary event is placed on a transaction subprocess with multi instance characteristics, if one instance triggers cancellation, the boundary event cancels all instances.

A cancel boundary event is defined as a typical boundary event:

```xml
<boundaryEvent id="boundary" attachedToRef="transaction" >
  <cancelEventDefinition />
</boundaryEvent>
```

Since the cancel boundary event is always interrupting, the cancelActivity attribute is not required.


## Intermediate Throwing Compensation Event

An intermediate throwing compensation event can be used to trigger compensation.

<div data-bpmn-symbol="intermediatethrowevent/compensate"></div>

Triggering compensation: Compensation can either be triggered for a designated activity or for the scope that hosts the compensation event. Compensation is performed through execution of the compensation handler associated with an activity.

*   When compensation is thrown for an activity, the associated compensation handler is executed the same amount of times the activity completed successfully.
*   If compensation is thrown for the current scope, all activities within the current scope are compensated, which includes activities on concurrent branches.
*   Compensation is triggered hierarchically: if an activity to be compensated is a subprocess, compensation is triggered for all activities contained within the subprocess. If the subprocess has nested activities, compensation is thrown recursively. However, compensation is not propagated to the "upper levels" of the process: if compensation is triggered within a subprocess, it is not propagated to activities outside of the subprocess scope. The BPMN specification states that compensation is triggered for activities at "the same level of subprocess".
*   Compensation is consumed by compensation event subprocess: if an activity to be compensated is a subprocess and the subprocess contains an event subprocess triggered by a compensation start event, compensation triggers the event subprocess instead of trigger the activities contained within the subprocess.
*   Compensation is performed in reverse order of execution. This means that whichever activity completed last is compensated first, etc.
*   The intermediate throwing compensation event can be used to compensate transaction subprocesses which completed successfully.

Note: If compensation is thrown within a scope which contains a subprocess and the subprocess contains activities with compensation handlers, compensation is only propagated to the subprocess if it has completed successfully when compensation is thrown. If some of the activities nested inside the subprocess have completed and have attached compensation handlers, the compensation handlers are not executed if the subprocess containing these activities is not completed yet. Consider the following example:

<div data-bpmn-diagram="implement/event-compensation-throw"></div>

In this process we have two concurrent executions, one executing the embedded subprocess and one executing the "charge credit card" activity. Lets assume both executions are started and the first concurrent execution is waiting for a user to complete the "review bookings" task. The second execution performs the "charge credit card" activity and an error is thrown, which causes the "cancel reservations" event to trigger compensation. At this point the parallel subprocess is not yet completed which means that the compensation event is not propagated to the subprocess and thus the "cancel hotel reservation" compensation handler is not executed. If the user task (and thus the embedded subprocess) completes before the "cancel reservations" is performed, compensation is propagated to the embedded subprocess.

Process variables: When compensating an embedded subprocess, the execution used for executing the compensation handlers has access to the local process variables of the subprocess in the state they were in when the subprocess completed execution. To achieve this, a snapshot of the process variables associated with the scope execution (execution created for executing the subprocess) is taken. From this, a couple of implications follow:

*   The compensation handler does not have access to variables added to concurrent executions created inside the subprocess scope.
*   Process variables associated with executions higher up in the hierarchy, e.g., process variables associated with the process instance execution, are not contained in the snapshot: the compensation handler has access to these process variables in the state they are in when compensation is thrown.
*   A variable snapshot is only taken for embedded subprocesses, not for other activities.

Current limitations:

*   `waitForCompletion="false"` is currently unsupported. When compensation is triggered using the intermediate throwing compensation event, the event is only left after compensation completed successfully.
*   Compensation itself is currently performed by concurrent executions. The concurrent executions are started in reverse order to which the compensated activities completed. Future versions of activity might include an option to perform compensation sequentially.
*   Compensation is not propagated to sub process instances spawned by call activities.

A compensation intermediate event is defined as an intermediate throwing event. The specific type sub-element in this case is a compensateEventDefinition element.

```xml
<intermediateThrowEvent id="throwCompensation">
  <compensateEventDefinition />
</intermediateThrowEvent>
```

Additionally, the optional argument `activityRef` can be used to trigger compensation of a specific scope / activity:

```xml
<intermediateThrowEvent id="throwCompensation">
  <compensateEventDefinition activityRef="bookHotel" />
</intermediateThrowEvent>
```

## Compensation End Event

<div data-bpmn-symbol="endevent/compensate"></div>

A compensation end event triggers compensation and the current path of execution is ended. It has the same behavior and limitations as a compensation intermediate throwing event.

```xml
<endEvent id="throwCompensation">
  <compensateEventDefinition />
</endEvent>
```

## camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaasyncbefore">camunda:asyncBefore</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaasyncafter">camunda:asyncAfter</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaexclusive">camunda:exclusive</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundajobpriority">camunda:jobPriority</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-elements-camundainputoutput">
        camunda:inputOutput</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>&ndash;</td>
  </tr>
</table>


## Compensation Boundary Event

An attached intermediate catching compensation on the boundary of an activity, or, for short, a compensation boundary event, can be used to attach a compensation handler to an activity or an embedded subprocess.

<div data-bpmn-symbol="intermediatecatchevent/compensate"></div>

The compensation boundary event must reference a single compensation handler using a directed association.

A compensation boundary event has a different activation policy than other boundary events. Other boundary events, such as the signal boundary event are activated when the activity they are attached to is started. When the activity is left, they are deactivated and the corresponding event subscription is canceled. The compensation boundary event is different. The compensation boundary is activated when the activity it is attached to completes successfully. At this point, the corresponding subscription to compensation events is created. The subscription is removed either when a compensation event is triggered or when the corresponding process instance ends. This leads to the following points:

*   When compensation is triggered, the compensation handler associated with the compensation boundary event is invoked the same amount of times that the activity it is attached to completed successfully.
*   If a compensation boundary event is attached to an activity with multiple instance characteristics, a compensation event subscription is created for each instance.
*   If a compensation boundary event is attached to an activity which is contained inside a loop, a compensation event subscription is created for each time the activity is executed.
*   If the process instance ends, the subscriptions to compensation events are canceled.

A compensation boundary event is defined as a typical boundary event:

```xml
<boundaryEvent id="compensateBookHotelEvt" attachedToRef="bookHotel" >
  <compensateEventDefinition />
</boundaryEvent>

<association associationDirection="One" id="a1"  sourceRef="compensateBookHotelEvt" targetRef="undoBookHotel" />

<serviceTask id="undoBookHotel" isForCompensation="true" camunda:class="..." />
```

As the compensation boundary event is activated after the activity has completed successfully, the cancelActivity attribute is not supported.

## Compensation Start Event

<div data-bpmn-symbol="startevent/compensate"></div>

A compensation start event can only be used to trigger an Event Sub-Process - it __cannot__ be used to start a process instance. This kind of event subprocess called compensation event subprocess.

When deploying a process definition with a compensation event subprocess, the following considerations apply:

* The compensation event subprocess is only supported for embedded subprocess and not at process-level, caused by the current limitation that compensation is not propagated to sub process instances spawned by call activities.
* There can be only one compensation event subprocess at the same embedded subprocess. 
* A subprocess with a compensation event subprocess and an attached compensation boundary event is not supported. When compensation is thrown, the compensation event subprocess will be ignored. Note that the compensation event subprocess and the compensation boundary event has a similar behavior, so only one of them should be chosen.

A compensation event subprocess can be used as a compensation handler for the embedded subprocess. Similar to a compensation boundary event attached to a subprocess, a compensation event subprocess will only be invoked by a thrown compensation event, if the subprocess completed successfully. In this case, the compensation event subprocess will be invoked the same amount of times that the subprocess completed successfully.

Contrary to a compensation boundary event attached to a subprocess, a compensation event subprocess consume a thrown compensation event. When compensation is thrown for the subprocess or the current scope, the compensation event subprocess is invoked. Other activities within the subprocess are not compensated. The compensation event subprocess can recursively trigger compensation for activities contained in its parent.

<div data-bpmn-diagram="implement/event-compensation-event-subprocess"></div>

The above process contains an embedded subprocess with a compensation event subprocess, triggered by a compensation start event. Note that this compensation handler deviates from default compensation in that it triggers compensation activities in an specific order independent from the order of execution; it also contains an additional activity adding process logic that cannot be derived from the body of the subprocess itself.

The XML representation of a compensation start event is the normal start event declaration with a compensateEventDefinition child-element:

```xml
<subProcess id="compensationEventSubprocess" triggeredByEvent="true">
  <startEvent id="compensationStart" >
    <compensateEventDefinition />
  </startEvent>
  <!-- ... -->
</subProcess>
```


## Additional Resources

* [Transaction subprocess](ref:#subprocesses-transaction-subprocess)
* [Compensation Events](http://camunda.org/bpmn/reference.html#events-compensation) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)
