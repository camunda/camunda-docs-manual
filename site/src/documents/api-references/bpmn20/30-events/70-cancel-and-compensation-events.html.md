---

title: 'Cancel and Compensation Events'
category: 'Events'

keywords: 'cancel end boundary compensation intermediate throwing boundary event definition'

---


Cancel and compensation events occur in the context of the [transaction subprocess](ref:#subprocesses-transaction-subprocess). Please read that part first to understand the overall idea.


## Cancel End Event

The cancel end event can only be used in combination with a [transaction subprocess](ref:#subprocesses-transaction-subprocess). When the cancel end event is reached, a cancel event is thrown which must be caught by a cancel boundary event. The cancel boundary event then cancels the transaction and triggers compensation.


## Cancel Boundary Event

An attached intermediate catching cancel on the boundary of a transaction subprocess, or boundary cancel event for short, is triggered when a transaction is cancelled. When the cancel boundary event is triggered, it first interrupts all executions active in the current scope. Next, it starts compensation of all active compensation boundary events in the scope of the transaction. Compensation is performed synchronously, i.e. the boundary event waits before compensation is completed before leaving the transaction. When compensation is completed, the transaction subprocess is left using the sequence flow(s) running out of the cancel boundary event.

<div data-bpmn-symbol="intermediatecatchevent/cancel"></div>

Note: Only a single cancel boundary event is allowed for a transaction subprocess.

Note: If the transaction subprocess hosts nested subprocesses, compensation is only triggered for subprocesses that have completed successfully.

Note: If a cancel boundary event is placed on a transaction subprocess with multi instance characteristics, if one instance triggers cancellation, the boundary event cancels all instances.

A cancel boundary event is defined as a typical boundary event:

```xml
<boundaryEvent id="boundary" attachedToRef="transaction" >       
  <cancelEventDefinition />
</boundaryEvent>
```

Since the cancel boundary event is always interrupting, the cancelActivity attribute is not required. 


## Compensation Intermediate Throwing Event

An intermediate throwing compensation event can be used to trigger compensation.

<div data-bpmn-symbol="intermediatethrowevent/compensate"></div>

Triggering compensation: Compensation can either be triggered for a designated activity or for the scope which hosts the compensation event. Compensation is performed through execution of the compensation handler associated with an activity.

*   When compensation is thrown for an activity, the associated compensation handler is executed the same number of times the activity competed successfully.
*    If compensation is thrown for the current scope, all activities withing the current scope are compensated, which includes activities on concurrent branches.
*    Compensation is triggered hierarchically: if an activity to be compensated is a subprocess, compensation is triggered for all activities contained in the subprocess. If the subprocess has nested activities, compensation is thrown recursively. However, compensation is not propagated to the "upper levels" of the process: if compensation is triggered within a subprocess, it is not propagated to activities outside of the subprocess scope. The bpmn specification states that compensation is triggered for activities at "the same level of subprocess".
*    Compensation is performed in reverse order of execution. This means that whichever activity completed last is compensated first, etc.
*    The intermediate throwing compensation event can be used to compensate transaction subprocesses which competed successfully.

Note: If compensation is thrown within a scope which contains a subprocess and the subprocess contains activities with compensation handlers, compensation is only propagated to the subprocess if it has completed successfully when compensation is thrown. If some of the activities nested inside the subprocess have completed and have attached compensation handlers, the compensation handlers are not executed if the subprocess containing these activities is not completed yet. Consider the following example:

<div data-bpmn-diagram="implement/event-compensation-throw"></div>

In this process we have two concurrent executions, one executing the embedded subprocess and one executing the "charge credit card" activity. Lets assume both executions are started and the first concurrent execution is waiting for a user to complete the "review bookings" task. The second execution performs the "charge credit card" activity and an error is thrown, which causes the "cancel reservations" event to trigger compensation. At this point the parallel subprocess is not yet completed which means that the compensation event is not propagated to the subprocess and thus the "cancel hotel reservation" compensation handler is not executed. If the user task (and thus the embedded subprocess) completes before the "cancel reservations" is performed, compensation is propagated to the embedded subprocess.

Process variables: When compensating an embedded subprocess, the execution used for executing the compensation handlers has access to the local process variables of the subprocess in the state they were in when the subprocess completed execution. To achieve this, a snapshot of the process variables associated with the scope execution (execution created for executing the subprocess) is taken. Form this, a couple of implications follow:

*   The compensation handler does not have access to variables added to concurrent executions created inside the subprocess scope.
*   Process variables associated with executions higher up in the hierarchy, (for instance process variables associated with the process instance execution are not contained in the snapshot: the compensation handler has access to these process variables in the state they are in when compensation is thrown.
*   A variable snapshot is only taken for embedded subprocesses, not for other activities.

Current limitations:

*   `waitForCompletion="false"` is currently unsupported. When compensation is triggered using the intermediate throwing compensation event, the event is only left, after compensation completed successfully.
*   Compensation itself is currently performed by concurrent executions. The concurrent executions are started in reverse order in which the compensated activities completed. Future versions of activity might include an option to perform compensation sequentially.
*   Compensation is not propagated to sub process instances spawned by call activities.

A compensation intermediate event is defined as a intermediate throwing event. The specific type sub-element is in this case a compensateEventDefinition element.

```xml
<intermediateThrowEvent id="throwCompensation">
  <compensateEventDefinition />
</intermediateThrowEvent>
```

In addition, the optional argument activityRef can be used to trigger compensation of a specific scope / activity:

```xml
<intermediateThrowEvent id="throwCompensation">
  <compensateEventDefinition activityRef="bookHotel" />
</intermediateThrowEvent>
```


## Compensation Boundary Event

An attached intermediate catching compensation on the boundary of an activity or compensation boundary event for short, can be used to attach a compensation handler to an activity.

<div data-bpmn-symbol="intermediatecatchevent/compensate"></div>

The compensation boundary event must reference a single compensation handler using a directed association.

A compensation boundary event has a different activation policy from other boundary events. Other boundary events like for instance the signal boundary event are activated when the activity they are attached to is started. When the activity is left, they are deactivated and the corresponding event subscription is cancelled. The compensation boundary event is different. The compensation boundary is activated when the activity is attached to completes successfully. At this point, the corresponding subscription to compensation events is created. The subscription is removed either when a compensation event is triggered or when the corresponding process instance ends. From this, it follows:

*   When compensation is triggered, the compensation handler associated with the compensation boundary event is invoked the same number of times the activity it is attached to completed successfully.
*   If a compensation boundary event is attached to an activity with multiple instance characteristics, a compensation event subscription is created for each instance.
*   If a compensation boundary event is attached to an activity which is contained inside a loop, a compensation event subscription is created for each time the activity is executed.
*   If the process instance ends, the subscriptions to compensation events are cancelled.

Note: the compensation boundary event is not supported on embedded subprocesses.

A compensation boundary event is defined as a typical boundary event:

```xml
<boundaryEvent id="compensateBookHotelEvt" attachedToRef="bookHotel" >       
  <compensateEventDefinition />
</boundaryEvent>

<association associationDirection="One" id="a1"  sourceRef="compensateBookHotelEvt" targetRef="undoBookHotel" />

<serviceTask id="undoBookHotel" isForCompensation="true" camunda:class="..." />
```

Since the compensation boundary event is activated after the activity has completed successfully, the cancelActivity attribute is not supported.


## Additional Resources

* [Transaction subprocess](ref:#subprocesses-transaction-subprocess)
* [Compensation Events in the BPMN Turorial](http://camunda.org/design/reference.html#!/events/compensation)