---

title: 'Receive Task'
weight: 60

menu:
  main:
    identifier: "bpmn-ref-tasks-receive-task"
    parent: "bpmn-ref-tasks"
    pre: "Wait for a message to arrive."

---

A Receive Task is a simple task that waits for the arrival of a certain message. When the process execution arrives at a Receive Task, the process state is committed to the persistence storage. This means that the process will stay in this wait state until a specific message is received by the engine, which triggers the continuation of the process beyond the Receive Task.

{{< bpmn-symbol type="receive-task" >}}

A Receive Task with a message reference can be triggered like an ordinary event:

```xml
<definitions ...>
  <message id="newInvoice" name="newInvoiceMessage"/>
  <process ...>
    <receiveTask id="waitState" name="wait" messageRef="newInvoice">
  ...
```

You can then either correlate the message:

```java
// correlate the message
runtimeService.createMessageCorrelation(subscription.getEventName())
  .processInstanceBusinessKey("AB-123")
  .correlate();
```

Or explicitly query for the subscription and trigger it:

```java
ProcessInstance pi = runtimeService.startProcessInstanceByKey("processWaitingInReceiveTask");

EventSubscription subscription = runtimeService.createEventSubscriptionQuery()
  .processInstanceId(pi.getId()).eventType("message").singleResult();

runtimeService.messageEventReceived(subscription.getEventName(), subscription.getExecutionId());
```

{{< note title="" class="warning" >}}
Correlation of a parallel multi instance isn't possible because the subscription can't be identified unambiguously.
{{< /note >}}

To continue a process instance that is currently waiting at a Receive Task without a message reference, the `runtimeService.signal(executionId)` can be called, using the id of the execution that arrived in the Receive Task.

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

* [Tasks](http://camunda.org/bpmn/reference.html#activities-task) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)
* [Message Receive Events]({{< ref "/reference/bpmn20/events/message-events.md" >}})
* [Trigger a subscription via REST]({{< ref "/reference/rest/execution/post-signal.md" >}})
