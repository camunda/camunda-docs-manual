---

title: 'Plan Items and Item Definitions'
weight: 10

menu:
  main:
    identifier: "cmmn-ref-concepts-plan-items-and-definitions"
    parent: "cmmn-ref-concepts"
    pre: "Understand how to compose a Case out of different Tasks."

---

CMMN differentiates between *plan items* and *plan item definitions*. While plan items represent actual units of work that are enacted as part of the case, plan item definitions serve as the blueprint for how a plan item has to be enacted. This concept simplifies reuse of plan item definitions and furthermore enables dynamic planning so that additional items can be generated from a definition at runtime.

As an example, consider the following fragment of a case definition:

```xml
<definitions>
  <case id="case" name="Case">
    <casePlanModel id="CasePlanModel_1">
      <planItem id="PlanItem_HumanTask_1" definitionRef="HumanTask_1" />
      <planItem id="PlanItem_HumanTask_2" definitionRef="HumanTask_1" />

      <humanTask id="HumanTask_1" camunda:assignee="kermit" />
    </casePlanModel>
  </case>
</defintions>
```

This model contains one plan item definition, namely the `humanTask` element. This definition is referenced by two plan items, `PlanItem_HumanTask_1` and `PlanItem_HumanTask_2`. When a new case of this model is created, there will be two human task instances, one for each plan item. The plan item definition is the single point at which the human task is configured. Thus, the assignee specification by the attribute `camunda:assignee="kermit"` is valid for both plan items.

Accordingly, a case plan model that contains plan item definitions but no plan items will appear as a case with no tasks at runtime.

Apart from reuse of configuration, plan item definitions can be instantiated at runtime, typically referred to as *planning*. Planning allows users to create plan items of a well-defined set of plan item definitions dynamically as needed. Note that planning is currently not supported by the Camunda engine.

This reference describes, if not otherwise noted, the plan item definitions supported by the Camunda engine. Whenever there is a consideration of runtime state, it is assumed that a plan item referencing that definition exists.
