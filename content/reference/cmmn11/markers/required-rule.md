---

title: 'Required Rule'
weight: 20

menu:
  main:
    identifier: "cmmn-ref-markers-required"
    parent: "cmmn-ref-markers"
    pre: "Controls whether a Task, Stage or Milestone is required to be performed."

---

**Can be used with**: [Task]({{< ref "/reference/cmmn11/tasks/_index.md" >}}), [Stage]({{< ref "/reference/cmmn11/grouping-tasks/stage.md" >}}) and [Milestone]({{< ref "/reference/cmmn11/milestone.md" >}})

{{< cmmn-symbol type="marker-required" >}}

A plan item may be *required*, meaning that it has to reach an end-like state before the containing stage can complete. Whether a plan item is required can be specified by a *required rule*.

This rule is evaluated when the milestone, stage or task is instantiated and transitions to the state `AVAILABLE`, and its result value of type `boolean` is maintained throughout the remainder of the case instance. If this rule evaluates to `true`, the plan item's parent stage instance must not transition to `COMPLETED` state unless the plan item is in the `COMPLETED`, `TERMINATED` or `DISABLED` state. For example, a task that has not yet been worked on, i.e., is in state `ENABLED`, prevents its containing stage to complete. If the rule is not present, then it is considered to be `false`.

```xml
<planItem id="PlanItem_HumanTask_1" definitionRef="HumanTask_1">
  <itemControl>
    <requiredRule>
      <condition>${true}</condition>
    </requiredRule>
  </itemControl>
</planItem>

<humanTask id="HumanTask_1">

</humanTask>
```

The specified expression `${true}` evaluates to the boolean value `true` and means that the plan item is required.

For a plan item definition, the following XML can be used:

```xml
<planItem id="PlanItem_HumanTask_1" definitionRef="HumanTask_1"/>

<humanTask id="HumanTask_1">
  <defaultControl>
    <requiredRule>
      <condition>${true}</condition>
    </requiredRule>
  </defaultControl>
</humanTask>
```

The rule specified in the `humanTask` element is valid and individually evaluated for all plan items that reference it, here `PlanItem_HumanTask_1`.

As with any expression, you can use case variables to determine the result of a required rule. The following snippet expresses that the plan item is required when a variable `var` has a value greater than 100:

```xml
<requiredRule>
  <condition>${var > 100}</condition>
</requiredRule>
```
