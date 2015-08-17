---

title: 'Repetition Rule'
weight: 40

menu:
  main:
    identifier: "cmmn-ref-markers-repetition-rule"
    parent: "cmmn-ref-markers"

---

**Can be used with**: [Task]({{< relref "reference/cmmn10/tasks/index.md" >}}), [Stage]({{< relref "reference/cmmn10/grouping-tasks/stage.md" >}}), [Milestone]({{< relref "reference/cmmn10/milestone.md" >}})

{{< img src="../img/repetition-rule-marker.png" title="Repetition Rule Marker" >}}

Under which conditions a plan item is *repeatable* can be specified by a *repetition rule*.

This rule is evaluated when the milestone, stage or task is instantiated and transitions to the state `AVAILABLE`. Its result value of type `boolean` is maintained for the rest of the life of the plan item instance and cannot be changed. If this rule evaluates to `true`, the plan item can be repeated. The trigger for the repetition is a [sentry]({{< relref "reference/cmmn10/sentry.md" >}}), that is referenced as entry criterion. Once a referenced entry criteria is satisfied the repeatable task moves into the next state (`ENABLED` or `ACTIVE`) and a new instance of the plan item is created. The new instance transitions to the state `AVAILABLE` and also evaluates the repetition rule.

The details of plan item states and transitions are provided in the [Plan Item Lifecycles]({{< relref "reference/cmmn10/concepts/lifecycle.md" >}}) section. And the details of entry criteria are provided in the [Entry and Exit Criteria]({{< relref "reference/cmmn10/concepts/entry-exit-criteria.md" >}}) section.

In XML, a repetition rule can be specified for an individual plan item or for a plan item definition. For a plan item it looks as follows:

```xml
<planItem id="PlanItem_HumanTask" definitionRef="HumanTask">
  <itemControl>
    <repetitionRule>
      <condition>
        <body>${true}</body>
      </condition>
    </repetitionRule>
  </itemControl>
</planItem>

<humanTask id="HumanTask" />
```

For a plan item definition, the following XML can be used:

```xml
<planItem id="PlanItem_HumanTask" definitionRef="HumanTask"/>

<humanTask id="HumanTask_1">
  <defaultControl>
    <repetitionRule>
      <condition>
        <body>${true}</body>
      </condition>
    </repetitionRule>
  </defaultControl>
</humanTask>
```

The rule specified in the `humanTask` element is valid for all plan items that reference it, here `PlanItem_HumanTask_1`.

The shown examples can lead to a infinite number of repetitions, because for each new instance the rule evaluates to `true`. In same cases it might be desirable to limit the number of repetitions, for example if a certain value is reached. As with any expression, you can use case variables to determine the result of a repetition rule. The following snippet expresses that repetition is required when a variable `var` has a value less than `100`:

```xml
<manualActivationRule>
  <condition>
    <body><![CDATA[${var < 100}]]></body>
  </condition>
</manualActivationRule>
```

## Repetition Rule By Example

{{< img src="../img/repetition-rule-example.png" >}}

```xml
<definitions>
  <case id="case" name="Case">
    <casePlanModel id="CasePlanModel_1">

      <planItem id="PlanItem_HumanTask_B" name="B"
                definitionRef="HumanTask"
                entryCriteriaRefs="Sentry_1" />

      <planItem id="PlanItem_HumanTask_A" name="A"
                definitionRef="HumanTask"
                entryCriteriaRefs="Sentry_2" />

      <sentry id="Sentry_1">
      	...
      </sentry>

      <sentry id="Sentry_2">
        <planItemOnPart sourceRef="PlanItem_HumanTask_B">
          <standardEvent>complete</standardEvent>
        </planItemOnPart>
      </sentry>

      <humanTask id="HumanTask">
      	<defaultControl>
      	  <repetitionRule>
      	    <condition>
      	      <body><![CDATA[${score < 50}]]></body>
      	    </condition>
      	  </repetitionRule>
      	</defaultControl>
      </humanTask>

    </casePlanModel>
  </case>
</defintions>
```

This case contains two human tasks *A* and *B* that are connected by a sentry. Task *B* gets `ENABLED` if any conditions are fulfilled and task *A* gets `ENABLED` if an instance of `B` completes. Furthermore both tasks are repeatable as long as the variable `score` is less than `50`.

The following illustrations contains a property named `repeatable`: If `repeatable == true`(repetition rule evaluates to true), then the instance creates a new instance when performing a transition from state `AVAILABLE` to either `ENABLED` or `ACTIVE` (depending on the manual activation rule).

In our example, the following steps might take place:

1. A user instantiates the case and sets the variable `score` to the value `10`.
2. Two instances for each human task are automatically created and both transition in state `AVAILABLE`. During the transition for each instance the repetition rule will be evaluated. As a consequence that the variable `score` is less than `50` the instances (*A* and *B*) are `repeatable`.
{{< img src="../img/state-1.png" >}}
3. When the entry criterion (*Sentry_1*) of instance *B* is satisfied, the task *B* reaches the state `ENABLED`. Based on the fact that *B* is `repeatable` a new instance *B'* of the corresponding task is created. The instance *B'* moves into the state `AVAILABLE` and the repetition rule evaluates to `true`, because the variable `score` is still less than `50`.
{{< img src="../img/state-2.png" >}}
4. A user manually starts and completes task *B* and the instance reaches the state `COMPLETED`.
5. The completion of instance *B* satisfies the entry criterion (*Sentry_2*) of *A*. In consequence, task *A* becomes `ENABLED` and a new instance *A'* is created. The instance *A'* moves into the `AVAILABLE` state and the repetition rule evaluates to `true`. So that *A'* is `repeatable`.
{{< img src="../img/state-3.png" >}}
6. A user changes the value of the variable `score` to `55`. This does not have any effect on the instance *A'* and *B'*, both stay `repeatable`.
7. The entry criterion (*Sentry_1*) of instance *B'* is satisfied (once again). The instance *B'* reaches the state `ENABLED` and a new instance *B''* is created. Now the repetition rule evaluates to `false`, so that *B''* is not `repeatable` anymore.
{{< img src="../img/state-4.png" >}}
8. A user manually starts and completes task *B'* and the instance reaches the state `COMPLETED`.
9. The completion of instance *B'* satisfies the entry criterion (*Sentry_2*) of *A'*. So that *A'* becomes `ENABLED` and a new instance *A''* is created. The new instance *A''* is `AVAILABLE` but not `repeatable`, because the repetition rule evaluates to `false`.
{{< img src="../img/state-5.png" >}}
10. If the entry criterion (*Sentry_1*) of *B''* gets satisfied and a user starts and completes *B''*, the instance *A''* becomes `ENABLED`. As a consequence that *A''* and *B''* are not repeatable no new instances are created.
{{< img src="../img/state-6.png" >}}

## Repetition Criteria

Additionally to the entry criteria it is possible to use `repetition criteria` to define on which condition a `repetition` of a task (or stage or milestone) should transition from state `AVAILABLE` either to `ENABLED` or `ACTIVE`.

A repetition criterion behaves in the same way like an [entry criterion]({{< relref "reference/cmmn10/concepts/entry-exit-criteria.md">}}). The difference is that a repetition criterion is only used by an instance which is a `repetition` of a task. While the *first* instance of a task (which is not a repetition) only takes the defined entry criteria into account to get enabled or active.

Note the repetition criteria is a Camunda extension which is not part of the CMMN specification.

In XML, a repetition criteria can be specified for an individual plan item or for a plan item definition. For a plan item it looks as follows:

```xml
<definitions xmlns:camunda="http://camunda.org/schema/1.0/cmmn">

  <case id="case" name="Case">
    <casePlanModel id="CasePlanModel_1">

      <planItem id="PlanItem_HumanTask"
                definitionRef="HumanTask">
        <itemControl>
          <repetitionRule>
            <extensionElements>
              <camunda:repetitionCriterion>
      	        Sentry
              </camunda:repetitionCriterion>
            </extensionElements>
            <condition>
              <body>${true}</body>
            </condition>
          </repetitionRule>
        </itemControl>
      </planItem>

      <sentry id="Sentry">
        ...
      </sentry>

      <humanTask id="HumanTask" />

    </casePlanModel>
  </case>

</definitions>
```

For a plan item definition, the following XML can be used:


```xml
<definitions xmlns:camunda="http://camunda.org/schema/1.0/cmmn">

  <case id="case" name="Case">
    <casePlanModel id="CasePlanModel_1">

      <planItem id="PlanItem_HumanTask"
                definitionRef="HumanTask"/>

      <sentry id="Sentry">
        ...
      </sentry>

      <humanTask id="HumanTask_1">
        <defaultControl>
          <repetitionRule>
            <extensionElements>
      	      <camunda:repetitionCriterion>
      	        Sentry
              </camunda:repetitionCriterion>
            </extensionElements>
            <condition>
              <body>${true}</body>
            </condition>
          </repetitionRule>
        </defaultControl>
      </humanTask>

    </casePlanModel>
  </case>

</definitions>
```

### Entry Criteria vs Repetition Criteria

For a better understanding it is necessary to distinguish between a `first` instance and an instance which is a `repetition`:

- `first instance`: The `first` instance is the one which is created when the parent stage gets active.
- `repetition`: It is an instance which repeats the `first` instance. There could be more than one repetitions of the `first` instance.

The repetition and entry criteria can be used in different combinations. The following remarks explains when any instance performs the state transition from `AVAILABLE` to either `ENABLED` or `ACTIVE`:

1. Only entry criteria are present:
Each instance (`first` and every `repetition`) performs the state transition, when any *entry* criterion is met.
2. Only repetition criteria are present:
The `first` instance performs immediately the state transition. While each `repetition` performs the transition, when any *repetition* criterion is met.
3. Entry and repetition criteria are present:
The `first` instance performs the state transition, when any *entry* criterion is met. Each `repetition` performs the state transition, when any *repetition* criterion is met.
4. Neither entry nor repetition criteria are present:
Each instance (`first`and every `repetition`) performs immediately the state transition. But this could lead to undesired situations, for example it is possible to create an infinite loop. In such a combination the repetition rule should evaluate after a given number of repetitions to `true`. This would allow to instantiate for example 5 instance in parallel (whereby one instance is the `first` instance and the other four instances are the `repetitions`).

### Example

The repetition rule gives the opportunity to implement the following use case: Whenever the task *A* completes a new instance of task *A* should be offered to repeat the task.

Therefore the CMMN could look like as follows:

```xml
<definitions>
  <case id="case" name="Case">
    <casePlanModel id="CasePlanModel_1">

      <planItem id="PlanItem_HumanTask" name="A"
                definitionRef="HumanTask" />

      <sentry id="Sentry">
        <planItemOnPart sourceRef="PlanItem_HumanTask">
          <standardEvent>complete</standardEvent>
        </planItemOnPart>
      </sentry>

      <humanTask id="HumanTask">
      	<defaultControl>
      	  <repetitionRule>
            <extensionElements>
      	      <camunda:repetitionCriterion>
      	        Sentry
              </camunda:repetitionCriterion>
            </extensionElements>
      	    <condition>
      	      <body>${true}</body>
      	    </condition>
      	  </repetitionRule>
      	</defaultControl>
      </humanTask>

    </casePlanModel>
  </case>
</defintions>
```
So the `first` instance of task *A* would immediately perform the state transition from `AVAILABLE` to either `ENABLED` or `ACTIVE`. This state transition would create a new instance *A'* which remains in the state `AVAILABLE`. The instance *A'* waits that the defined *repetition* criterion is met. Once the instance *A* gets completed by a user the sentry is satisfied and the instance *A'* performs the state transition out of `AVAILABLE`. Furthermore a new instance *A''* is also created.

This example can be easily extended to limit the number of repetitions by using another expression as repetition rule.

## Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="../../custom-extensions/camunda-elements/">camunda:repetitionCriterion</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      The element <code>camunda:repetitionCriterion</code> should only be set if a repetition rule is present.
    </td>
  </tr>
</table>