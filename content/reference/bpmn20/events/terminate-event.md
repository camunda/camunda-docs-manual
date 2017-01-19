---

title: 'Terminate Events'
weight: 90

menu:
  main:
    identifier: "bpmn-ref-events-terminate-event"
    parent: "bpmn-ref-events"
    pre: "End a scope."

---

A terminate event ends the complete scope where the event is raised and all inner scopes.

It is useful if you have a parallel split in your process and you want to immediately consume all tokens that are currently available.

If you use it on the process instance level, the whole process is terminated. On a subprocess level the current scope and all inner processes will be terminated.

<div data-bpmn-diagram="../bpmn/event-terminate"></div>


# Terminate Event Definition

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


# Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#asyncbefore" >}}">camunda:asyncBefore</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#asyncafter" >}}">camunda:asyncAfter</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#exclusive" >}}">camunda:exclusive</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#jobpriority" >}}">camunda:jobPriority</a>
    </td>
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

## Additional Resources

* [Terminate Events](http://camunda.org/bpmn/reference.html#events-termination) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)
