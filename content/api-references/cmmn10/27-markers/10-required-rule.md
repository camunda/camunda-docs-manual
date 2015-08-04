---

title: 'Required Rule'
weight: 20

menu:
  main:
    identifier: "cmmn-ref-markers-required"
    parent: "cmmn-ref-markers"

---

**Can be used with**: [Task](ref:#tasks), [Stage](ref:#grouping-tasks-stage) and [Milestone](ref:#milestones-milestone)

<img class="img-responsive" src="ref:asset:/assets/cmmn/required-marker.png"/>

A plan item may be *required*, meaning that it has to reach an end-like state before the containing stage can complete. Whether a plan item is required can be specified by a *required rule*.

This rule is evaluated when the milestone, stage or task is instantiated and transitions to the state <code>AVAILABLE</code>, and its result value of type `boolean` is maintained throughout the remainder of the case instance. If this rule evaluates to <code>true</code>, the plan item's parent stage instance must not transition to <code>COMPLETED</code> state unless the plan item is in the <code>COMPLETED</code>, <code>TERMINATED</code> or <code>DISABLED</code> state. For example, a task that has not yet been worked on, i.e., is in state <code>ENABLED</code>, prevents its containing stage to complete. If the rule is not present, then it is considered to be <code>false</code>.

```xml
<planItem id="PlanItem_HumanTask_1" definitionRef="HumanTask_1">
  <itemControl>
    <requiredRule>
      <condition>
        <body>${true}</body>
      </condition>
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
      <condition>
        <body>${true}</body>
      </condition>
    </requiredRule>
  </defaultControl>
</humanTask>
```

The rule specified in the `humanTask` element is valid and individually evaluated for all plan items that reference it, here `PlanItem_HumanTask_1`.

As with any expression, you can use case variables to determine the result of a required rule. The following snippet expresses that the plan item is required when a variable `var` has a value greater than 100:

```xml
<requiredRule>
  <condition>
    <body>${var > 100}</body>
  </condition>
</requiredRule>
```
