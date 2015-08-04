---

title: 'None Events'
category: 'Events'

keywords: 'none start intermediate throwing end event definition'

---

None events are unspecified events, also called 'blank' events. For instance, a 'none' start event technically means that the trigger for starting the process instance is unspecified. This means that the engine cannot anticipate when the process instance must be started. The none start event is used when the process instance is started through the API by calling one of the `startProcessInstanceBy...` methods.

```java
ProcessInstance processInstance = runtimeService.startProcessInstanceByKey('invoice');
```

Note: a subprocess must always have a none start event.

<div data-bpmn-diagram="implement/event-none"></div>


## None End Event

A 'none' end event means that the result thrown when the event is reached is unspecified. As such, the engine will not do anything besides ending the current path of execution. The XML representation of a none end event is the normal end event declaration, without any sub-element (other end event types all have a sub-element declaring the type).

```xml
<endEvent id="end" name="my end event" />
```





## Intermediate None Event (throwing)

The following process diagram shows a simple example of an intermediate none event, which is often used to indicate some state achieved in the process.

<div data-bpmn-diagram="implement/event-none-intermediate" ></div>


This can be a good hook to monitor some KPI's, basically by adding an execution listener

```xml
<intermediateThrowEvent id="noneEvent">
  <extensionElements>
    <camunda:executionListener class="org.camunda.bpm.engine.test.bpmn.event.IntermediateNoneEventTest$MyExecutionListener" event="start" />
  </extensionElements>
</intermediateThrowEvent>
```

You can add some own code to the execution listener to maybe send some event to your BAM tool or DWH. The engine itself doesn't do anything in the event, it just passes through it.

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
      <a href="ref:#custom-extensions-camunda-extension-elements-camundafailedjobretrytimecycle">camunda:failedJobRetryTimeCycle</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundainputoutput">
        camunda:inputOutput</a>
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
