---

title: 'Manual Task'
category: 'Tasks'

keywords: 'manual'

---

A Manual Task defines a task that is external to the BPM engine. It is used to model work that is done by somebody, which the engine does not need to know of, nor is there a system or UI interface. For the engine, a manual task is handled as a pass-through activity, automatically continuing the process from the moment process execution arrives into it.

<div data-bpmn-symbol="manualtask" data-bpmn-symbol-name="Manual Task"></div>

```xml
<manualTask id="myManualTask" name="Manual Task" />
```
