---

title: 'Event Subprocess'
category: 'Subprocesses'

keywords: 'event subprocess'

---


The Event subprocess is a subprocess that is triggered by an event. An Event subprocess can be added at the process level or at any subprocess level. The event used to trigger an event subprocess is configured using a start event. From this, it follows that none start events are not supported for Event subprocesses. An Event subprocess might be triggered using events like message events, error events, signal events, timer events, or compensation events. The subscription to the start event is created when the scope (process instance or subprocess) hosting the Event subprocess is created. The subscription is removed when the scope is destroyed.

An Event subprocess may be interrupting or non-interrupting. An interrupting subprocess cancels any executions in the current scope. A non-interrupting Event subprocess spawns a new concurrent execution. While an interrupting Event subprocess can only be triggered once for each activation of the scope hosting it, a non-interrupting Event subprocess can be triggered multiple times. The fact whether the subprocess is interrupting is configured using the start event triggering the Event subprocess.

An Event subprocess must not have any incoming or outgoing sequence flows. Since an Event subprocess is triggered by an event, an incoming sequence flow makes no sense. When an Event subprocess is ended, either the current scope is ended (in case of an interrupting Event subprocess), or the concurrent execution spawned for the non-interrupting subprocess is ended.

The Event subprocess is visualized as a an embedded subprocess with a dotted outline.

<div data-bpmn-diagram="tutorial/subprocess_event"> </div>

It is represented using XML in the same way as a an embedded subprocess. In addition the attribute triggeredByEvent must have the value true:

```xml
<subProcess id="eventSubProcess" triggeredByEvent="true">
  <!-- ... -->
</subProcess>      
```

<div class="alert alert-warning">
  <strong>Current limitations:</strong>
  <ul>
    <li>Only interrupting Event subprocesses are supported.</li>
    <li>Only Event subprocess triggered using an Error Start Event or Message Start Event are supported.</li>
  </ul>
</div>


## Example

The following is an example of an Event subprocess triggered using an Error Start Event. The Event subprocess is located at the "process level", i.e. is scoped to the process instance:

<div data-bpmn-diagram="implement/event-subprocess"></div>

This is how the Event subprocess looks like in XML:

```xml
<subProcess id="eventSubProcess" triggeredByEvent="true">
  <startEvent id="catchError">
    <errorEventDefinition errorRef="error" /> 
  </startEvent>
  <sequenceFlow id="flow2" sourceRef="catchError" targetRef="taskAfterErrorCatch" />
  <userTask id="taskAfterErrorCatch" name="Provide additional data" />
</subProcess>    
```

As already stated, an Event subprocess can also be added to an embedded subprocess. If it is added to an embedded subprocess, it becomes an alternative to a boundary event. Consider the two following process diagrams. In both cases the embedded subprocess throws an error event. Both times the error is caught and handled using a user task.

<div data-bpmn-diagram="implement/event-subprocess-alternative1"></div>

as opposed to:

<div data-bpmn-diagram="implement/event-subprocess-alternative2"></div>

In both cases the same tasks are executed. However, there are differences between both modelling alternatives:

*   The embedded subprocess is executed using the same execution which executed the scope it is hosted in. This means that an embedded subprocess has access to the variables local to it's scope. When using a boundary event, the execution created for executing the embedded subprocess is deleted by the sequence flow leaving the boundary event. This means that the variables created by the embedded subprocess are not available anymore.
*   When using an Event subprocess, the event is completely handled by the subprocess it is added to. When using a boundary event, the event is handled by the parent process.

These two differences can help you decide whether a boundary event or an embedded subprocess is better suited for solving a particular process modeling / implementation problem.


## Additional Resources

*   [Event subprocess in the BPMN Tutorial](http://camunda.org/design/reference.html#!/activities/event)