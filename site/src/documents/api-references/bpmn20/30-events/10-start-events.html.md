---

title: 'Start Events'
category: 'Events'

keywords: 'start events asynchronous instantiation none timer message'

---


A start event is a trigger for starting a process instance. 

The engine supports the following types of start events:<br>

<p>
	<div data-bpmn-symbol="startevent"><a href="ref:#events-none-events">Blank</a></div>
</p
<p>
	<div data-bpmn-symbol="startevent/timer"><a href="ref:#events-timer-events">Timer</a></div>
</p>
<p>
	<div data-bpmn-symbol="startevent/message"><a href="ref:#events-message-events">Message</a></div>
</p>


There can be at most one blank or timer start event per process definition. There can be multiple message start events.

Although according to the BPMN 2.0 specification start events are not mandatory, the engine requires at least one start event to instantiate a process. 


## Asynchronous Instantiation

A start event may be declared as asynchronous by `camunda:async="true"`

```xml
<startEvent id="startEvent" camunda:async="true" />
```

This will ensure that the process engine creates a process instance when the process is instantiated, but the execution of the initial activities is not done synchronously. Instead a job is created and asynchronously processed by the [job executor](ref:/guides/user-guide/#process-engine-the-job-executor) see [Asynchronous Continuations](ref:/guides/user-guide/#process-engine-transactions-in-processes-asynchronous-continutaions) for some background.

