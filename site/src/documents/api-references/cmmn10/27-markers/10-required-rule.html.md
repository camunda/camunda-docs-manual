---

title: 'Required Rule'
category: 'Markers'

keywords: 'required rule plan item definition variable'

---

**Can be used with**: [Task](ref:#tasks), [Stage](ref:#grouping-tasks-stage) and [Milestone](ref:#milestones-milestone)

<img class="img-responsive" src="ref:asset:/assets/cmmn/required-marker.png"/>

This rule will be evaluated when the milestone, stage or task is instantiated and transitions to <code>AVAILABLE</code> state, and their <code>boolean</code> value will be maintained for the rest of the file of the corresponding instance. The required rule determines whether the milestone, stage or task instance having this condition must be in the <code>COMPLETED</code>, <code>TERMINATED</code> or <code>DISABLED</code> state in order for its parent stage instance to transition into the <code>COMPLETED</code> state.

If this rule is not present, then it is considered <code>false</code>. If this rule evaluates to <code>true</code>, the parent stage instance must not transition to complete state unless this milestone, stage or task instance is in the <code>COMPLETED</code>, <code>TERMINATED</code> or <code>DISABLED</code> state.

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

The specified expression `${true}` evaluates to the boolean value `true` and means that the plan item should become required.

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

The rule specified in the `humanTask` element is valid for all plan items that reference it, here `PlanItem_HumanTask_1`.

As with any expression, you can use case variables to determine the result of a required rule. The following snippet expresses that the plan item is required when a variable `var` has a value greater than 100:

```xml
<requiredRule>
  <condition>
    <body>${var > 100}</body>
  </condition>
</requiredRule>
```
