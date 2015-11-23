---

title: 'Delegation Code'
weight: 20

menu:
  main:
    identifier: "user-guide-cmmn-model-api-delegation"
    parent: "user-guide-cmmn-model-api"

---


If you use [Delegation Code]({{< relref "user-guide/process-engine/delegation-code.md" >}}) you can access the CMMN model instance and current element of the executed case. If a CMMN model is accessed it will be cached to avoid redundant database queries.


# Case Execution Listener

If your class implements the `org.camunda.bpm.engine.delegate.CaseExecutionListener` interface you can access the CMMN model instance
and the plan item element. As an Case Execution Listener can be added to several elements like case plan model, human task etc. it can
not be guaranteed which type the flow element will be.

```java
public class ExampleCaseExecutionListener implements CaseExecutionListener {

  public void notify(DelegateCaseExecution caseExecution) throws Exception {
    CmmnModelInstance modelInstance = execution.getCmmnModelInstance();
    CmmnElement cmmnElement = execution.getCmmnModelElementInstance();
  }
}
```
