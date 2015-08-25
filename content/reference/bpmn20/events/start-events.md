---

title: 'Start Events'
weight: 10

menu:
  main:
    identifier: "bpmn-ref-events-start-event"
    parent: "bpmn-ref-events"

---


A start event is a trigger for starting a process instance.

The engine supports the following types of start events:<br>

<p>
	<div data-bpmn-symbol="startevent"><a href="{{< relref "reference/bpmn20/events/none-events.md" >}}">Blank</a></div>
</p
<p>
	<div data-bpmn-symbol="startevent/timer"><a href="{{< relref "reference/bpmn20/events/timer-events.md" >}}">Timer</a></div>
</p>
<p>
	<div data-bpmn-symbol="startevent/message"><a href="{{< relref "reference/bpmn20/events/message-events.md" >}}">Message</a></div>
</p>
<p>
	<div data-bpmn-symbol="startevent/signal"><a href="{{< relref "reference/bpmn20/events/signal-events.md" >}}">Signal</a></div>
</p>


There can a maximum of one blank or timer start event per process definition. There can be multiple message or signal start events.

Although start events are not mandatory according to the BPMN 2.0 specification, the engine requires at least one start event to instantiate a process.


## Asynchronous Instantiation

A start event may be declared as asynchronous with `camunda:asyncBefore="true"`

```xml
<startEvent id="startEvent" camunda:asyncBefore="true" />
```

This will ensure that the process engine creates a process instance when the process is instantiated, but the execution of the initial activities is not done synchronously. Instead, a job is created and asynchronously processed by the [job executor]({{< relref "user-guide/process-engine/the-job-executor.md" >}}. See the [Asynchronous Continuations]({{< relref "user-guide/process-engine/transactions-in-processes.md#asynchronous-continuations" >}}) section of the [User Guide]({{< relref "user-guide/index.md" >}} for some background information.

## camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-asyncbefore" >}}">camunda:asyncBefore</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-asyncafter" >}}">camunda:asyncAfter</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-exclusive" >}}">camunda:exclusive</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-formhandlerclass" >}}">camunda:formHandlerClass</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-formkey" >}}">camunda:formKey</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-initiator" >}}">camunda:initiator</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-jobpriority" >}}">camunda:jobPriority</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#camunda-failedjobretrytimecycle" >}}">camunda:failedJobRetryTimeCycle</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#camunda-formdata" >}}">camunda:formData</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#camunda-formproperty" >}}">camunda:formProperty</a>,
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      The <code>camunda:exclusive</code> attribute is only evaluated if the attribute
      <code>camunda:asyncBefore</code> or <code>camunda:asyncAfter</code> is set to <code>true</code>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attributes <code>camunda:asyncBefore</code> and <code>camunda:initiator</code> are only available for start events of a Process
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      Only one <code>camunda:formData</code> extension element is allowed
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attributes <code>camunda:formHandlerClass</code> and <code>camunda:formKey</code>
      are only available for the intital start event of a Process
    </td>
  </tr>
</table>

