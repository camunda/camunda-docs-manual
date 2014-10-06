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


There can a maximum of one blank or timer start event per process definition. There can be multiple message start events.

Although start events are not mandatory according to the BPMN 2.0 specification, the engine requires at least one start event to instantiate a process.


## Asynchronous Instantiation

A start event may be declared as asynchronous with `camunda:asyncBefore="true"`

```xml
<startEvent id="startEvent" camunda:asyncBefore="true" />
```

This will ensure that the process engine creates a process instance when the process is instantiated, but the execution of the initial activities is not done synchronously. Instead, a job is created and asynchronously processed by the [job executor](ref:/guides/user-guide/#process-engine-the-job-executor). See the [Asynchronous Continuations](ref:/guides/user-guide/#process-engine-transactions-in-processes-asynchronous-continuations) section of the [User Guide](ref:/guides/user-guide/) for some background information.

## camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaasyncbefore">camunda:asyncBefore</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaexclusive">camunda:exclusive</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaformhandlerclass">camunda:formHandlerClass</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaformkey">camunda:formKey</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundainitiator">camunda:initiator</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaformdata">camunda:formData</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaformproperty">camunda:formProperty</a>,
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      The <code>camunda:exclusive</code> attribute is only evaluated if the attribute
      <code>camunda:asyncBefore</code> is set to <code>true</code>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attributes <code>camunda:asyncBefore</code>, <code>camunda:exclusive</code> and
      <code>camunda:initiator</code> are only available for start events of a Process
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

