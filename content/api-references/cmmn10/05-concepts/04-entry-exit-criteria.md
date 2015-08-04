---

title: 'Entry and Exit Criteria'
weight: 20

menu:
  main:
    identifier: "cmmn-ref-concepts-entry-and-exit-criteria"
    parent: "cmmn-ref-concepts"

---

Transitions in a CMMN case can happen in two ways: Either by external interaction or by events occurring and conditions being fulfilled. The former refers to any explicit interaction with a case that is triggered from the outside. For example, a human worker completing a human task would be such an interaction. Completing a task means that the corresponding plan item is completed, depending on the actual case model, the case instance may complete.

Similar changes in the state of a case instance may be driven by events occurring or conditions getting fulfilled. For example, it is possible to define that when one plan item completes, another is enabled. Similarly, a plan item can terminate when an event triggers. When specifying plan items, this concept is referred to as *entry criteria* and *exit criteria*. These criteria are always defined for individual plan items, not for plan item definitions. For example, the following case model fragment defines an entry criterion for the plan item `PlanItem_HumanTask_1`:

```xml
<definitions>
  <case id="case" name="Case">
    <casePlanModel id="CasePlanModel_1">
      <planItem id="PlanItem_HumanTask_1" definitionRef="HumanTask_1" entryCriteriaRefs="Sentry_1" />
      <planItem id="PlanItem_HumanTask_2" definitionRef="HumanTask_1"/>

      <sentry id="Sentry_1">
        <planItemOnPart sourceRef="PlanItem_HumanTask_2">
          <standardEvent>complete</standardEvent>
        </planItemOnPart>
      </sentry>

      <humanTask id="HumanTask_1" camunda:assignee="kermit" />
    </casePlanModel>
  </case>
</defintions>
```

Similarly, `PlanItem_HumanTask_1` with an exit criterion looks as follows:

```xml
<planItem id="PlanItem_HumanTask_1" definitionRef="HumanTask_1" exitCriteriaRefs="Sentry_1" />
```

The conditions and events behind entry and exit criteria can be expressed by so-called *sentries*. Refer to the [Sentry](ref:#sentries-sentry) section on how sentries work and what kind of conditions can be expressed by them.

When any entry criterion is met, the plan item it is defined for performs the state transition from `AVAILABLE` to `ENABLED`. While the plan item is not in state `AVAILABLE`, entry criteria are not relevant.

Similarly, when any exit criterion is met, a plan item performs a state transition from any of the states `AVAILABE`, `ENABLED`, `DISABLED`, or `ACTIVE` to state `TERMINATED`.

The details of plan item states and transitions are provided in the [Plan Item Lifecycles](ref:#concepts-plan-item-lifecycles) section.
