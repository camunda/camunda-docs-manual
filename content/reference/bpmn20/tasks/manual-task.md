---

title: 'Manual Task'
weight: 70

menu:
  main:
    identifier: "bpmn-ref-tasks-manual-task"
    parent: "bpmn-ref-tasks"
    pre: "A task which is performed externally."

---

A Manual Task defines a task that is external to the BPM engine. It is used to model work that is done by somebody who the engine does not need to know of and is there no known system or UI interface. For the engine, a manual task is handled as a pass-through activity, automatically continuing the process at the moment the process execution arrives at it.

<div data-bpmn-symbol="manualtask" data-bpmn-symbol-name="Manual Task"></div>

```xml
<manualTask id="myManualTask" name="Manual Task" />
```


## camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-asyncbefore" >}}">camunda:asyncBefore</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-asyncafter" >}}">camunda:asyncAfter</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-exclusive" >}}">camunda:exclusive</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-jobpriority" >}}">camunda:jobPriority</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#camunda-failedjobretrytimecycle" >}}">camunda:failedJobRetryTimeCycle</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#camunda-inputoutput" >}}">camunda:inputOutput</a>
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
