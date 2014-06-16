---

title: 'Receive Task'
category: 'Tasks'

keywords: 'message receive task'

---

A Receive Task is a simple task that waits for the arrival of a certain message. When process execution arrives at a Receive Task, the process state is committed to the persistence store. This means that the process will stay in this wait state, until a specific message is received by the engine, which triggers the continuation of the process past the Receive Task.

<div data-bpmn-symbol="receivetask" data-bpmn-symbol-name="Receive Task"></div>

A Receive Task with a message reference can be triggered like an ordinary event:

```xml
<definitions ...>
  <message id="newInvoice" name="newInvoiceMessage"/>
  <process ...>
    <receiveTask id="waitState" name="wait" messageRef="newInvoice">
  ...
```

```java
ProcessInstance pi = runtimeService.startProcessInstanceByKey("processWaitingInReceiveTask");
EventSubscription subscription = runtimeService.createEventSubscriptionQuery()
  .processInstanceId(pi.getId()).eventType("message").singleResult();

// correlate the message
runtimeService.correlateMessage(subscription.getEventName());
// or receive the event
runtimeService.messageEventReceived(subscription.getEventName(), subscription.getExecutionId());
```

<div class="alert alert-warning">
  Correlation of a parallel multi instance isn't possible because the subscription can't unambiguous identified.
</div>

To continue a process instance that is currently waiting at a Receive Task without a message reference, the `runtimeService.signal(executionId)` can be called using the id of the execution that arrived in the Receive Task.

```xml
<receiveTask id="waitState" name="wait" />
```

The following code snippet shows how this works in practice:

```java
ProcessInstance pi = runtimeService.startProcessInstanceByKey("receiveTask");
Execution execution = runtimeService.createExecutionQuery()
  .processInstanceId(pi.getId()).activityId("waitState").singleResult();

runtimeService.signal(execution.getId());
```

## camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaasyncbefore">camunda:asyncBefore</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaasyncafter">camunda:asyncAfter</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaexclusive">camunda:exclusive</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-elements-camundafailedjobretrytimecycle">camunda:failedJobRetryTimeCycle</a>
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

## Additional Resources

* [Tasks in the BPMN Tutorial](http://camunda.org/bpmn/reference.html#activities-task)
* [Message Receive Event](ref:#events-message-events)
* [Trigger a subscription over REST](ref:/api-references/rest/#execution-trigger-message-event-subscription)
