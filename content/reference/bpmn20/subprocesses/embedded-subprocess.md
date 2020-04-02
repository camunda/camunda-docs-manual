---

title: 'Embedded Subprocess'
weight: 10

menu:
  main:
    identifier: "bpmn-subprocess-embedded"
    parent: "bpmn-subprocess"
    pre: "Group a set of flow nodes into a scope."

---

A subprocess is an activity that contains other activities, gateways, events, etc., which itself forms a process that is part of a bigger process. A subprocess is completely defined inside a parent process (that's why it's often called an embedded Subprocess).

Subprocesses have two major use cases:

*   Subprocesses allow hierarchical modeling. Many modeling tools allow that subprocesses can be collapsed, hiding all the details of the subprocess and displaying a high-level, end-to-end overview of the business process.
*   A subprocess creates a new scope for events. Events that are thrown during execution of the subprocess can be caught by a boundary event on the boundary of the subprocess, thus creating a scope for that event, limited to the subprocess.

Using a subprocess does impose some constraints:

*   A subprocess can only have one none start event, no other start event types are allowed. A subprocess must have at least one end event. Note that the BPMN 2.0 specification allows to omit the start and end events in a subprocess, but the current engine implementation does not support this.
*   Sequence flows can not cross subprocess boundaries.

A subprocess is visualized as a typical activity, i.e., a rounded rectangle. In case the subprocess is collapsed, only the name and a plus-sign are displayed, giving a high-level overview of the process:

<div data-bpmn-diagram="../bpmn/subprocess"></div>

In case the subprocess is expanded, the steps of the subprocess are displayed within the subprocess boundaries:

<div data-bpmn-diagram="../bpmn/subprocess_expanded"></div>

One of the main reasons to use a subprocess is to define a scope for an event. The following process model shows this: If we are spontaneously invited to dinner, we will cancel our cooking process. However, if we are already eating, we will not react to an invitation anymore. In more technical terms, the scope of the message event is the subprocess, so the message can only be received while the subprocess is active.

<div data-bpmn-diagram="../bpmn/subprocess_attached"></div>

A subprocess is defined by the subprocess element. All activities, gateways, events, etc. that are part of the subprocess need to be enclosed within this element.

```xml
<startEvent id="outerStartEvent" />
<!-- ... other elements ... -->
<subProcess id="subProcess">
   <startEvent id="subProcessStart" />
   <!-- ... other subprocess elements ... -->
   <endEvent id="subProcessEnd" />
</subProcess>
```


# Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#asyncbefore" >}}">camunda:asyncBefore</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#asyncafter" >}}">camunda:asyncAfter</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#exclusive" >}}">camunda:exclusive</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#jobpriority" >}}">camunda:jobPriority</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#failedjobretrytimecycle" >}}">camunda:failedJobRetryTimeCycle</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#inputoutput" >}}">camunda:inputOutput</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      The <code>camunda:exclusive</code> attribute is only evaluated if the attribute
      <code>camunda:asyncBefore</code> or <code>camunda:asyncAfter</code> is set to <code>true</code>
    </td>
  </tr>
</table>


# Additional Resources

*   [Subprocesses](http://camunda.org/bpmn/reference.html#activities-subprocess) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)

