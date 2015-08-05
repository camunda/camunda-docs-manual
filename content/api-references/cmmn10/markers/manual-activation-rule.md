---

title: 'Manual Activation Rule'
weight: 10

menu:
  main:
    identifier: "cmmn-ref-markers-manual-activation"
    parent: "cmmn-ref-markers"

---

**Can be used with**: [Task](ref:#tasks), [Stage](ref:#grouping-tasks-stage)

<img class="img-responsive" src="ref:asset:/assets/cmmn/manual-activation-marker.png"/>

Whether the actual work of a task or stage can be performed depends on its [entry criteria](#concepts-entry-and-exit-criteria). Given that an entry criterion is fulfilled, there are two ways to activate a task:

* By manual activation
* By automatic activation

Manual activation is the default behavior in which it is required that a user manually activates a task. In camunda, this can be done by using the `CaseService` API with `caseService.manuallyStartCaseExecution(caseExecutionId)`. By specifying a *manual activation rule*, it is possible to omit this step or make it depend on case variable payload. With manual activation, a user can decide to activate a task or instead disable it. A task that is automatically activated *must* be carried out.

In XML, a manual activation rule can be specified for an individual plan item or for a plan item definition. For a plan item it looks as follows:

```xml
<planItem id="PlanItem_HumanTask_1" definitionRef="HumanTask_1">
  <itemControl>
    <manualActivationRule>
      <condition>
        <body>${false}</body>
      </condition>
    </manualActivationRule>
  </itemControl>
</planItem>

<humanTask id="HumanTask_1">

</humanTask>
```

The specified expression `${false}` evaluates to the boolean value `false` and means that the plan item should become active in any case without human intervention.

For a plan item definition, the following XML can be used:

```xml
<planItem id="PlanItem_HumanTask_1" definitionRef="HumanTask_1"/>

<humanTask id="HumanTask_1">
  <defaultControl>
    <manualActivationRule>
      <condition>
        <body>${false}</body>
      </condition>
    </manualActivationRule>
  </defaultControl>
</humanTask>
```

The rule specified in the `humanTask` element is valid for all plan items that reference it, here `PlanItem_HumanTask_1`.

As with any expression, you can use case variables to determine the result of a manual activation rule. The following snippet expresses that manual activation is required when a variable `var` has a value greater than 100:

```xml
<manualActivationRule>
  <condition>
    <body>${var > 100}</body>
  </condition>
</manualActivationRule>
```

<div class="alert alert-warning">
  <p><strong>Tricky Specification</strong></p>
  <p>Manual activation is the default behavior. Thus, by specifying the element <code>manualActivationRule</code> you can express exceptions from that default for cases in which a task does <strong>not</strong> need manual activation.</p>
</div>

In terms of the [task/stage lifecycle](ref:#concepts-plan-item-lifecycles-taskstage-lifecycle), manual activation corresponds to the transition from `AVAILABLE` to `ENABLED` when an entry criterion occurs, and from `ENABLED` to `ACTIVE` when the task is manually activated. In contrast, automatic activation corresponds to the direct transition from `AVAILABLE` to `ACTIVE` that fires immediately when an entry criterion occurs.
