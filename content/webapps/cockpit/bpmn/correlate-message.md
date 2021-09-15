---

title: 'Correlate Message'
weight: 75

menu:
  main:
    identifier: "user-guide-cockpit-correlate-message"
    parent: "user-guide-cockpit-bpmn"
    pre: "Correlate Message"

---

When an execution waits in a message-catching flow-node, you can use [Message Correlation][] to 
continue the execution. Cockpit offers a [Batch Operation][] to correlate messages.

{{< img src="../../img/correlate-message/batch-operation.png" alt="Correlate Message Batch Operation" caption="" >}}

You can configure the batch operation as follows:

* **Message Name**\
  Enter a message name or leave empty. If empty, any execution matches the correlation.
* **Variables**\
  Add variables that are set into the root scope of the process instances.
* **Process Instances**\
  Select a set of process instances via the checkboxes or by defining query criteria. 

## Process Action

You can find a {{< glyphicon name="envelope" >}} button on the right side next to the BPMN diagram 
on the process definition and instance view.

{{< img src="../../img/correlate-message/process-action.png" alt="Process action to correlate a message" caption="Process action to correlate a message" >}}

If you click this button, a modal dialog opens:

{{< img src="../../img/correlate-message/modal-dialog.png" alt="Modal dialog to correlate a message" caption="Modal dialog to correlate a message" >}}

When you click into the text input field, you can choose a message name from a list of suggestions.

You can also enter another message name that is not present in the list of suggestions, e.g., it is
resolved via an expression and not present in the list. You can also leave the message name empty.

To proceed, click on the "Open Batch Operation" button. The correlate message [batch operation]({{< ref "/webapps/cockpit/batch/batch-operation.md" >}}) page
opens prefilled with the previously selected message name. Depending on whether you are on the process 
definition or instance page, a filter criterion defines the process definition or instance id.

## Diagram Overlays

You can open the modal dialog prefilled with the message name by clicking the {{< glyphicon name="envelope" >}} button
in the upper right corner of a message-catching flow-node. To make the button visible, hover over a 
message-catching flow-node.

{{< img src="../../img/correlate-message/diagram-overlay-button.png" alt="Diagram overlay button" caption="Diagram overlay button" >}}

{{< note title="Known limitations" class="info" >}}
Not all message-catching flow-nodes in a BPMN diagram are covered with overlays or are present
in the list of message name suggestions in the modal dialog. 

This is the case when (1) a flow-node is a process instance Start Event or (2) the message name contains an EL expression.
{{< /note >}}

[Message Correlation]: {{< ref "/reference/bpmn20/events/message-events.md#message-api" >}}
[Batch Operation]: {{< ref "/user-guide/process-engine/batch-operations.md#correlate-messages-to-process-instances" >}}
