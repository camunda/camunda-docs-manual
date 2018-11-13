---

title: 'Sentries'
weight: 60

menu:
  main:
    identifier: "cmmn-ref-sentries"
    parent: "cmmn-ref"

---

A *sentry* captures the occurrence of a certain event occurring or a condition being fulfilled within a case. Sentries are used as [entry and exit criteria]({{< ref "/reference/cmmn11/concepts/entry-exit-criteria.md" >}}). Note that the black and white diamonds represent the criteria. A sentry itself has no graphical representation.

{{< cmmn-symbol type="marker-entry-criterion" >}}

{{< cmmn-symbol type="marker-exit-criterion" >}}

In XML, a sentry can be specified as follows:

```xml
<planItem id="PlanItem_HumanTask_1" definitionRef="HumanTask_1"/>
<planItem id="PlanItem_HumanTask_2" definitionRef="HumanTask_1">
  <entryCriterion sentryRef="Sentry_1" />
</planItem>

<sentry id="Sentry_1">
  <planItemOnPart sourceRef="PlanItem_HumanTask_1">
    <standardEvent>complete</standardEvent>
  </planItemOnPart>
  <ifPart>
    <condition>${myVar > 100}</condition>
  </ifPart>
</sentry>

<humanTask id="HumanTask_1"/>
```

The above example defines a sentry that is fulfilled when the plan item `PlanItem_HumanTask_1` performs the state transition `complete` (note the `planItemOnPart` element) and a variable named `myVar` has a value greater than 100 (note the `ifPart` element). Furthermore, it serves as an [entry criterion]({{< ref "/reference/cmmn11/concepts/entry-exit-criteria.md" >}}) for the plan item `PlanItem_HumanTask_2` that becomes `ENABLED` as soon as the sentry is fulfilled (note the `entryCriterion` child element of the element `PlanItem_HumanTask_2`).

As conditions or event triggers, sentries may define the following elements:

* **OnPart**: A trigger that occurs when a certain transition in the lifecycle of a plan item or a case file item is performed.
* **IfPart**: A condition that is checked when all OnParts are fulfilled. This condition is defined on case data.

# OnPart

OnParts are defined on lifecycle transitions for plan items or case file items. As the Camunda engine does not currently support case file items, it is only possible to use *plan item OnParts*. A sentry with an OnPart can be defined as follows:

```xml
<sentry id="Sentry_1">
  <planItemOnPart sourceRef="PlanItem_1">
    <standardEvent>complete</standardEvent>
  </planItemOnPart>
</sentry>
```


A `planItemOnPart` must always reference a plan item by the attribute `sourceRef`. This plan item must be contained by the same stage the sentry is defined in. The child element `standardEvent` can the identifier of any lifecycle transition from that plan item's lifecycle and that is supported by the camunda engine. Note that different plan item definitions define different lifecycles. For details on valid lifecycle transitions, see the [Lifecycles]({{< ref "/reference/cmmn11/concepts/lifecycle.md" >}}) section.

As an alternative to `sourceRef`, the CMMN specification allows to define an attribute `sentryRef` responsible for referencing another sentry such that the onPart is fulfilled when the plan item that sentry references performs the *exit* state transition. This attribute is currently not supported by the Camunda engine.

Note that it is possible to have any number of OnParts which allows to combine multiple events. All OnParts must be fulfilled for a sentry to occur, i.e., specifying multiple OnParts is a conjunction of multiple events. An OnPart is fulfilled as soon as the element it is defined on performs the specified lifecycle transition. It is irrelevant whether this element performs any other subsequent lifecycle transitions.

# IfPart

An IfPart defines an additional condition that is checked when all OnParts of the sentry are fulfilled. Only if the IfPart evaluates to `true`, the sentry is fulfilled. In Camunda, a sentry with an IfPart looks as follows:

```xml
<sentry id="Sentry_1">
  <ifPart>
    <condition>${myVar > 100}</condition>
  </ifPart>
</sentry>
```

A sentry can have at most one IfPart and that IfPart can have at most one `condition` element. In the `condition` element, expression language must be used. In such an expression, case variables can be accessed by their name. The above example defines a condition that evaluates to `true` if there is a variable named `myVar` and that variable's value is greater than 100.

In addition to variable names, the identifier `caseExecution` can be used to access the execution object for the stage that the sentry is defined in. The below example explicitly accesses a local variable of that execution:

```xml
<sentry id="Sentry_1">
  <ifPart>
    <condition>${caseExecution.getVariableLocal("myVar") > 100}</condition>
  </ifPart>
</sentry>
```
The CMMN specification allows to reference a case file item by the sentry attribute `contextRef`. This attribute is not supported by the Camunda engine and therefore ignored.

The engine evaluates IfParts at every lifecycle transition of a plan item contained in the sentry's stage. That means, if an IfPart is not satisfied immediately when all OnParts have occurred, the sentry may still occur at any later lifecycle transition.

# Camunda Extensions

# VariableOnPart

VariableOnParts are defined on lifecycle transitions of a variable. Sentry with VariableOnPart is evaluated when the variable undergoes a transition (create or delete or update).
A sentry can have more than one variableOnPart and can have at most one `variable event` each.
In Camunda, a sentry with a variableOnPart looks as follows

```
<sentry id="Sentry_1">
  <extensionElements>
    <camunda:variableOnPart variableName = "variable_1">
      <camunda:variableEvent>create</camunda:variableEvent>
    </camunda:variableOnPart>
  </extensionElements>	
</sentry>  
```
In the above example, sentry is evaluated when the `create` event on the variable `variable_1` occurs.

# VariableOnPart Evaluation

Variable event that occurs in the scope of the execution triggers the sentry with variableOnParts in the following conditions:

* `variableName` and `variableEvent` defined in the variableOnPart of the sentry matches the occurred variable event and the associated variable name.
* There exists no variable of the same name in the ancestory path of the sentry between the execution scope of the sentry and the execution scope of the variable event occurrence (the scope of the variable definition)

Consider the below example in which there are two human tasks. `HumanTask1` is defined inside the case model and the `HumanTask_2` is defined inside the stage.
Each human task is attached with a entry criterion sentry and both the sentries are evaluated when the update event for the variable `foo` occurs.

{{< img src="../img/variableOnPart.png">}}

Scenario 1:

When a variable `foo` is set and updated in the scope of the case model, then both the sentries are evaluated and results in the transition of `HumanTask1` and `HumanTask_2` from available state to enabled state.

Scenario 2:

When there exists two variables of the same name `foo`, one defined in the scope of the case model and the other defined in the scope of stage. Then, sentries are triggered based on the scope of the update event.

* When the variable `foo` is updated in the scope of the case model, then only the `HumanTask1` gets enabled.
* When the variable `foo` is updated in the scope of the stage, then only the `HumanTask_2` gets enabled.

# Combining OnParts, IfParts and VariableOnParts

Sentries allow a flexible definition of event occurrences and data-based conditions to be fulfilled. The following rules apply for combining OnParts, IfParts and VariableOnParts.

* A valid sentry must have at least one of the sentry parts (OnPart or IfPart or VariableOnPart).
* A sentry without OnParts is fulfilled when the IfPart evaluates to `true` and all the VariableOnParts have occurred.
* A sentry without an IfPart is fulfilled when all OnParts and all the VariableOnParts have occurred.
* A sentry without variableOnPart is fullfilled when all the OnParts and IfPart are fulfilled.