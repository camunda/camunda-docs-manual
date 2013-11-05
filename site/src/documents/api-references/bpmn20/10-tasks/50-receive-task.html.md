---

title: 'Receive Task'
category: 'Tasks'

keywords: 'message receive task'

---

A Receive Task is a simple task that waits for the arrival of a certain message. Currently, we have only implemented Java semantics for this task. When process execution arrives at a Receive Task, the process state is committed to the persistence store. This means that the process will stay in this wait state, until a specific message is received by the engine, which triggers the continuation of the process past the Receive Task.

<div data-bpmn-symbol="receivetask" data-bpmn-symbol-name="Receive Task"></div>

```xml
<receiveTask id="waitState" name="wait" />    
```
To continue a process instance that is currently waiting at such a Receive Task, the runtimeService.signal(executionId) must be called using the id of the execution that arrived in the Receive Task. The following code snippet shows how this works in practice:

```xml
ProcessInstance pi = runtimeService.startProcessInstanceByKey("receiveTask");
Execution execution = runtimeService.createExecutionQuery()
  .processInstanceId(pi.getId())
  .activityId("waitState")
  .singleResult();
assertNotNull(execution);
    
runtimeService.signal(execution.getId());   
```

## Additional Resources

* [Tasks in the BPMN Tutorial](http://camunda.org/design/reference.html#!/activities/tasks)
* [Message Receive Event](ref:#events-message-events)