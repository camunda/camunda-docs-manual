---

title: 'Manual Task'
category: 'Tasks'

keywords: 'manual'

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
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-elements-camundainputoutput">
        camunda:inputOutput</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>&ndash;</td>
  </tr>
</table>
