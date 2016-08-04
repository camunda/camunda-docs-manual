---

title: 'Manual Activation Rule'
weight: 10

menu:
  main:
    identifier: "cmmn-ref-markers-manual-activation"
    parent: "cmmn-ref-markers"
    pre: "Controls whether a Task must be manually activated by a users."

---

**Can be used with**: [Task]({{< relref "reference/cmmn11/tasks/index.md" >}}), [Stage]({{< relref "reference/cmmn11/grouping-tasks/stage.md" >}})

{{< cmmn-symbol type="marker-manual-activation" >}}

Whether the actual work of a task or stage can be performed depends on its [entry criteria]({{< relref "reference/cmmn11/concepts/entry-exit-criteria.md" >}}). Given that an entry criterion is fulfilled, there are two ways to activate a task:

* By manual activation
* By automatic activation

Automatic activation is the default behavior in which it is not required that a user manually activates a task. In camunda, manual activation can be done by using the `CaseService` API with `caseService.manuallyStartCaseExecution(caseExecutionId)`. By specifying a *manual activation rule*, it is possible to omit this step or make it depend on case variable payload. With manual activation, a user can decide to activate a task or instead disable it. A task that is automatically activated *must* be carried out.

In XML, a manual activation rule can be specified for an individual plan item or for a plan item definition. For a plan item it looks as follows:

```xml
<planItem id="PlanItem_HumanTask_1" definitionRef="HumanTask_1">
  <itemControl>
    <manualActivationRule>
      <condition>${true}</condition>
    </manualActivationRule>
  </itemControl>
</planItem>

<humanTask id="HumanTask_1">

</humanTask>
```

The specified expression `${true}` evaluates to the boolean value `true` and means that the plan item should become active in only through the human intervention.

For a plan item definition, the following XML can be used:

```xml
<planItem id="PlanItem_HumanTask_1" definitionRef="HumanTask_1"/>

<humanTask id="HumanTask_1">
  <defaultControl>
    <manualActivationRule>
      <condition>${true}</condition>
    </manualActivationRule>
  </defaultControl>
</humanTask>
```

The rule specified in the `humanTask` element is valid for all plan items that reference it, here `PlanItem_HumanTask_1`.

{{< note title="Tricky Specification" class="warning" >}}
Automatic activation is the default behavior. Thus, by specifying the element `manualActivationRule` you can express exceptions from that default for cases in which a task `does` need a manual activation.
{{< /note >}}

As with any expression, you can use case variables to determine the result of a manual activation rule. The following snippet expresses that manual activation is required when a variable `var` has a value greater than 100:

```xml
<manualActivationRule>
  <condition>${var > 100}</condition>
</manualActivationRule>
```

In terms of the [task/stage lifecycle]({{< relref "reference/cmmn11/concepts/lifecycle.md" >}}), manual activation corresponds to the transition from `AVAILABLE` to `ENABLED` when an entry criterion occurs, and from `ENABLED` to `ACTIVE` when the task is manually activated. In contrast, automatic activation corresponds to the direct transition from `AVAILABLE` to `ACTIVE` that fires immediately when an entry criterion occurs.
