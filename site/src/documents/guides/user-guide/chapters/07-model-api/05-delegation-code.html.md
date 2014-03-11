---

title: 'Delegation Code'
category: 'BPMN model API'

---

If you use [Delegation Code][1] you can access the BPMN model instance and current element of the executed process. If
a BPMN model is accessed it will be cached to avoid redundant database queries.

## Java Delegate

If your class implements the `org.camunda.bpm.engine.delegate.JavaDelegate` interface you can access the BPMN model instance
and the current flow element. In the following example the `JavaDelegate` was added to a service task in the BPMN model.
Therefore the returned flow element can be casted to a `ServiceTask`.

```java
public class ExampleServiceTask implements JavaDelegate {

  public void execute(DelegateExecution execution) throws Exception {
    BpmnModelInstance modelInstance = execution.getBpmnModelInstance();
    ServiceTask serviceTask = (ServiceTask) execution.getBpmnModelElementInstance();
  }
}
```

## Execution Listener

If your class implements the `org.camunda.bpm.engine.delegate.ExecutionListener` interface you can access the BPMN model instance
and the current flow element. As a Execution Listener can be added to several elements like process, events, tasks, gateways
and sequence flows it can not be guaranteed of which type the flow element will be.

```java
public class ExampleExecutionListener implements ExecutionListener {

  public void notify(DelegateExecution execution) throws Exception {
    BpmnModelInstance modelInstance = execution.getBpmnModelInstance();
    FlowElement flowElement = execution.getBpmnModelElementInstance();
  }
}
```

## Task Listener

If your class implements the `org.camunda.bpm.engine.delegate.TaskListener` interface you can access the BPMN model instance
and the current user task since a Task Listener can only be added to a user task.

```java
public class ExampleTaskListener implements TaskListener {

  public void notify(DelegateTask delegateTask) {
    BpmnModelInstance modelInstance = delegateTask.getBpmnModelInstance();
    UserTask userTask = delegateTask.getBpmnModelElementInstance();
  }
}
```

[1]: #process-engine-delegation-code
