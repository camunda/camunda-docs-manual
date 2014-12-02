---

title: 'Sentry'
category: 'Sentries'

keywords: 'sentry event exit entry criteria criterion'

---

A *sentry* captures the occurrence of a certain event occurring or a condition being fulfilled within a case. Sentries are used as [entry and exit criteria](ref:#concepts-entry-and-exit-criteria). Note that the black and white diamonds represent the criteria. A sentry itself has no graphical representation.

<img class="img-responsive" src="ref:asset:/assets/cmmn/sentry-markers.png"/>

In XML, a sentry can be specified as follows:

```xml
<planItem id="PlanItem_HumanTask_1" definitionRef="HumanTask_1"/>
<planItem id="PlanItem_HumanTask_2" definitionRef="HumanTask_1" entryCriteriaRefs="Sentry_1" />

<sentry id="Sentry_1">
  <planItemOnPart sourceRef="PlanItem_HumanTask_1">
    <standardEvent>complete</standardEvent>
  </planItemOnPart>
  <ifPart>
    <condition>
      <body>${myVar > 100}</body>
    </condition>
  </ifPart>
</sentry>

<humanTask id="HumanTask_1"/>
```

The above example defines a sentry that is fulfilled when the plan item `PlanItem_HumanTask_1` performs the state transition `complete` (note the `planItemOnPart` element) and a variable named `myVar` has a value greater than 100 (note the `ifPart` element). Furthermore, it serves as an [entry criterion](ref:#concepts-entry-and-exit-criteria) for the plan item `PlanItem_HumanTask_2` that becomes `ENABLED` as soon as the sentry is fulfilled (note the `entryCriteriaRefs` attribute of the element `PlanItem_HumanTask_2`).

As conditions or event triggers, sentries may define the following elements:

* **OnPart**: A trigger that occurs when a certain transition in the lifecycle of a plan item or a case file item is performed.
* **IfPart**: A condition that is checked when all OnParts are fulfilled. This condition is defined on case data.

## OnPart

OnParts are defined on lifecycle transitions for plan items or case file items. As the camunda engine does currently not support case file items, it is only possible to use *plan item OnParts*. A sentry with an OnPart can be defined as follows:

```xml
<sentry id="Sentry_1">
  <planItemOnPart sourceRef="PlanItem_1">
    <standardEvent>complete</standardEvent>
  </planItemOnPart>
</sentry>
```


A `planItemOnPart` must always reference a plan item by the attribute `sourceRef`. This plan item must be contained by the same stage the sentry is defined in. The child element `standardEvent` can the identifier of any lifecycle transition from that plan item's lifecycle and that is supported by the camunda engine. Note that different plan item definitions define different lifecycles. For details on valid lifecycle transitions, see the [Lifecycles](ref:#concepts-plan-item-lifecycles) section.

As an alternative to `sourceRef`, the CMMN specification allows to define an attribute `sentryRef` responsible for referencing another sentry such that the onPart is  fulfilled when the plan item that sentry references performs the *exit* state transition. This attribute is currently not supported by the camunda engine.

Note that it is possible to have any number of OnParts which allows to combine multiple events. All OnParts must be fulfilled for a sentry to occur, i.e. specifying multiple OnParts is a conjunction of multiple events. An OnPart is fulfilled as soon as the element it is defined on performs the specified lifecycle transition. It is irrelevant whether this element performs any other subsequent lifecycle transitions.

## IfPart

An IfPart defines an additional condition that is checked when all OnParts of the sentry are fulfilled. Only if the IfPart evaluates to `true`, the sentry is fulfilled. In camunda, a sentry with an IfPart looks as follows:

```xml
<sentry id="Sentry_1">
  <ifPart>
    <condition>
      <body>${myVar > 100}</body>
    </condition>
  </ifPart>
</sentry>
```

A sentry can have at most one IfPart and that IfPart can have at most one `condition` element. In the `condition` element, expression language must be used. In such an expression, case variables can be accessed by their name. The above example defines a condition that evaluates to `true` if there is a variable named `myVar` and that variable's value is greater than 100.

In addition to variable names, the identifier `caseExecution` can be used to access the execution object for the stage that the sentry is defined in. The below example explicitly accesses a local variable of that execution:

```xml
<sentry id="Sentry_1">
  <ifPart>
    <condition>
      <body>${caseExecution.getVariableLocal("myVar") > 100}</body>
    </condition>
  </ifPart>
</sentry>
```

The CMMN specification allows to reference a case file item by the sentry attribute `contextRef`. This attribute is not supported by the camunda engine and therefore ignored.

The engine evaluates IfParts at every lifecycle transition of a plan item contained in the sentry's stage. That means, if an IfPart is not satisfied immediately when all OnParts have occurred, the sentry may still occur at any later lifecycle transition.

## Combining OnParts and IfParts

Sentries allow a flexible definition of event occurrences and data-based conditions to be fulfilled. The following rules apply for combining OnParts and IfParts

* A valid sentry must have at least one OnPart or an IfPart.
* A sentry without OnParts is fulfilled when the IfPart evaluates to `true`.
* A sentry without an IfPart is fulfilled when all OnParts have occurred.

## camunda Extensions

There are no custom camunda extensions for sentries.
