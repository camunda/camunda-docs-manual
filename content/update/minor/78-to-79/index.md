---

title: "Update from 7.8 to 7.9"
weight: 50
menu:
  main:
    name: "7.8 to 7.9"
    identifier: "migration-guide-78"
    parent: "migration-guide-minor"
    pre: "Update from `7.8.x` to `7.9.0`."

---

<!-- TODO :  -->

# Base Delegate Execution

This section concerns the Java API and the interface `org.camunda.bpm.engine.delegate.BaseDelegateExecution`.

The behaviour of `BaseDelegateExecution#getBusinessKey` has been changed. It now returns a business key of the root execution, e.g. process instance and is equvalent to `DelegateExecution#getProcessBusinessKey`. 

Please note this change can influence your custom implementations of `Execution Listener`.
