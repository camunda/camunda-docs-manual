---

title: 'Conditional Events'
weight: 70

menu:
  main:
    identifier: "bpmn-ref-events-conditional-events"
    parent: "bpmn-ref-events"
    pre: "Events catching conditional events."

---

The conditional event defines an event which is triggered if a given condition is evaluated to true.
It can be used as start event of an event sub process, as intermediate event and boundary event.
The start and boundary event can be interrupting and non interrupting.

In Camunda, conditional events are triggered with the help of process variables.
See the [Trigger Conditional Events]({{< relref "#trigger-conditional-events">}}) section for details.

In the following BPMN model, all supported conditional events are used.

{{< img src="../bpmn/event-conditional.svg" title="Conditional Events Overview" >}}

As you can see, an intermediate conditional event is like a wait until the condition is satisfied. In this example, if
the processor becomes available and the condition is, for example, `${processorAvailable == true}`, the condition will be satisfied and the execution process continues to the next activity.

If the condition of the conditional boundary event, which checks if the application was changed, is satisfied, then the corresponding user task will be interrupted.

During the entire execution of the process instance, the application can be canceled. If the condition of the conditional start event is
satisfied, the execution of the process instance will be interrupted by the event sub process.
This will cancel the current processing of the application.

# Condition

To specify when a conditional event should be triggered, a `condition` element must be specified as a sub-element of `conditionalEventDefinition`.

```xml
<conditionalEventDefinition>
  <condition type="tFormalExpression">${var1 == 1}</condition>
</conditionalEventDefinition>
```

The specified condition can be an EL expression and has access to the process instance variables.
For information about EL expressions, see the [Expression Language]({{< relref "user-guide/process-engine/expression-language.md">}})
section. A condition is evaluated every time a variable changes, see the [Trigger Conditional Events]({{< relref "#trigger-conditional-events">}}) section for details.

To prevent the continuous evaluation of a condition, the evaluation can be restricted to specific variable changes.
For that, the Camunda extension attributes `camunda:variableName` and `camunda:variableEvents` can be used.

By default, condition evaluation is triggered by any kind of variable change, i.e., create/update/delete of any variable. `variableName` can be used to restrict that to changes of a specific variable. `variableEvents` can be used to restrict the type of change. It is possible to specify more than one variable change event as a comma separated list.
The attributes can be used in combination.

The `conditionalEventDefinition` can, for example, look like this:

```xml
<conditionalEventDefinition camunda:variableName="var1"
                            camunda:variableEvents="create, update">
  <condition type="tFormalExpression">${var1 == 1}</condition>
</conditionalEventDefinition>
```

The condition above is only evaluated if the variable `var1` is created or updated.
The attributes are especially useful on non interrupting events, since these events can be triggered more than once!

# Conditional Boundary Event

A conditional boundary event acts like an observer which is triggered if a specific condition is satisfied.

There is a difference between an interrupting and a non interrupting conditional event. The interrupting event is the default.
The non-interrupting event leads to the original activity not being interrupted, the instance remains active.
Instead, an additional path of execution is created, taking the outgoing transition of the event.
A non interrupting conditional event can be triggered more than once as long as the activity it is attached to is active.

In the XML representation for non interrupting conditional events, the cancelActivity attribute is set to false:
```xml
<boundaryEvent id="conditionalEvent" attachedToRef="taskWithCondition" cancelActivity="false">
  <conditionalEventDefinition>
    <condition type="tFormalExpression">${var1 == 1}</condition>
  </conditionalEventDefinition>
</boundaryEvent>
```

# Intermediate Conditional Catch Event

An intermediate conditional event is like a wait until the condition is true. When the execution arrives at the catching event activity,
the condition is evaluated for the first time. If the condition is satisfied, the execution process continues to the next activity.
If the condition is not satisfied, the execution stays in this activity until the condition is satisfied.

An intermediate conditional event is defined as an intermediate catching event.
The specific sub-element type in this case is a conditionalEventDefinition element.

```xml
<intermediateCatchEvent id="conditionalEvent">
  <conditionalEventDefinition>
    <condition type="tFormalExpression">${var1 == 1}</condition>
  </conditionalEventDefinition>
</intermediateCatchEvent>
```

# Conditional Start Event

A conditional start event can only be used in combination with an event sub process. Similar to conditional boundary events, conditional start events can be interrupting and non interrupting.

The XML representation of a conditional start event is the normal start event declaration with a conditionalEventDefinition child-element:

```xml
<subProcess id="EventSubProcess" triggeredByEvent="true">
  <startEvent id="conditionalStartEvent">
    <conditionalEventDefinition>
      <condition type="tFormalExpression">${var1 == 1}</condition>
    </conditionalEventDefinition>
  </startEvent>
</subProcess>
```

# Trigger Conditional Events

## Triggering on Scope Instantiation

When a BPMN scope is instantiated, the event conditions which are available in this scope
are evaluated. This behavior is called *triggering on scope instantiation*.

Consider the following process model:

<div data-bpmn-diagram="../bpmn/event-conditional2" ></div>

When a process instance is started, i.e., the process definition scope is instantiated, the condition of the sub process is evaluated before the none start
event is executed. If fulfilled, it triggers immediately and the none start event never executes. The same applies to activities with conditional boundary events and intermediate conditional events.

## Triggering via Variable API

Besides the triggering on scope instantiation, conditional events can also be triggered when a process variable changes.
That is the case if a variable is created, updated or deleted.

### Set Variable From Outside

Variables can be changed from the outside with the help of the [variable API]({{< relref "user-guide/process-engine/variables.md">}}).
See the following example how to set a variable on the variable scope of the process instance:

```java
  //set variable on process instance
  runtimeService.setVariable(processInstance.getId(), "variable", 1);
```

This statement triggers the evaluation of all applicable conditional events. For details, see the sections on [Top-Down Evaluation]({{< relref "#top-down-evaluation">}}) and [Scoped Evaluation]({{< relref "#scoped-evaluation">}}).

### Set Variable From Delegation Code

Variables can not only be set from outside, but also also from within a process instance via [delegation code]({{< relref "user-guide/process-engine/delegation-code.md">}}).

For example:

```java
public class SetVariableDelegate implements JavaDelegate {
  @Override
  public void execute(DelegateExecution execution) throws Exception {
    execution.setVariable("variable", 1);
  }
}
```

When set from delegation code, variable changes do not trigger conditional events immediately, to not interfere with the remaining code execution. Instead, the changes are recorded and collectively dispatched at the end of a phase of the activity instance lifecycle.

In the following picture the different activity instance phases are displayed.

{{< img src="../img/activityInstanceState.png" title="API Services" >}}

 * `Starting` corresponds to the starting phase of the activity instance. At this time the input mappings and execution start listeners are called.
 * `Execute` corresponds to the executing phase of the activity instance.
 * `Ending` corresponds to the ending phase of the activity instance. At this time the output mappings and execution end listeners are called.

For example, let us assume a variable is set in a start execution listener of an activity. Conditional events are only triggered after *all* start listeners have been executed and the activity instance is ready to enter the `Execute` phase.

### Top-Down Evaluation

A variable change causes condition evaluation and event triggering in a *top-down* fashion.
That means the evaluation starts at the the conditional events of the BPMN scope in which the variable was changed. It then step by step descends into the instances of nested BPMN scopes (e.g., embedded sub processes). This is done until a conditional event is triggered that interrupts the current scope instance (thereby cancelling all children) or until there are no more deeper nested scopes.

For example see the following BPMN process model:

<div data-bpmn-diagram="../bpmn/conditionalEventScopesHighestFirst" ></div>

If a variable is set in the context of the sub process instance, then the conditional boundary event of the sub process is evaluated first.
If the condition is satisfied, then the execution is interrupted, otherwise the conditional boundary event of `UserTask B` is evaluated and
triggered, if the condition is satisfied.

### Scoped Evaluation

Variable changes in the context of a scope instance can only trigger the conditional events to which the variable is *visible*, but do not interfere with unrelated scope instances.
That means if a variable changes, only those conditional events are evaluated that listen in the context of that scope instance or its children.

See the following BPMN process model:

<div data-bpmn-diagram="../bpmn/conditionalEventScopes" ></div>

If we have started the process above and `UserTask B` and `UserTask A` are active, then the [activity instance]({{< relref "user-guide/process-engine/process-engine-concepts.md#activity-instances">}}) hierarchy is:

    ProcessInstance
       UserTask A
       SubProcess
         UserTask B

If a variable is set in the context of the `SubProcess` instance, then only the conditional boundary event of `UserTask B` is evaluated. The boundary event of `UserTask A` cannot trigger as the variable is not *visible* in its context. The user guide section on [variable scopes and variable visibility](({{< relref "user-guide/process-engine/variables.md#variable-scopes-and-variable-visibility">}})) provides details on the general concept.

# Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#variablename" >}}">camunda:variableName</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#variableevents" >}}">camunda:variableEvents</a>,
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
    &ndash;
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>&ndash;</td>
  </tr>
</table>

# Additional Resources

* [Conditional Events](http://camunda.org/bpmn/reference.html#events-conditional) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)
