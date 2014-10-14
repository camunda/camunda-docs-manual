---

title: 'Terminate Events'
category: 'Events'

keywords: 'terminate end event definition'

---


A terminate event ends the complete scope where the event is raised and all inner scopes. 

It is useful if you had a parallel split in your process before and you want to consume all tokens that are currently available immediately.

If you use it on the process instance level, the whole process is terminated. On a subprocess level the current scope and all inner processes will be terminated.

<div data-bpmn-diagram="implement/event-terminate"></div>


## Terminate Event Definition

A terminate event is modeled as a end event with an additional definition element to mark the termination:

```xml
<process id="someProcess">
  <!-- ... -->
    <endEvent id="EndEvent_2" name="Tweet rejected">
      <terminateEventDefinition id="TerminateEventDefinition_1"/>
    <endEvent>
  <!-- ... -->
</process>
```


## Additional Resources

* [Terminate Events](http://camunda.org/bpmn/reference.html#events-termination) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)

