---

title: 'Conditional Events'
weight: 70

menu:
  main:
    identifier: "bpmn-ref-events-conditional-events"
    parent: "bpmn-ref-events"
    pre: "Events catching conditional event."

---

# Conditional Events

The conditional event defines an event which will be triggered if a given condition is evaluated to true.
They can be used as start event of an event sub process, as intermediate event and boundary event.
The start and boundary event can be interrupting and non interrupting.

In the following bpmn model all supported conditional events are used. Conditions of conditional events
are only evaluated if a variable changes on execution level, except for conditional intermediate events. These conditions are
evaluated, if the execution arrives the event. Is the condition not satisfied, the condition evaluation will be repeated like on the other events.
For more informations about variable scopes see documentation of [Process Variables]({{< relref "user-guide/process-engine/variables.md#variable-scopes-and-variable-visibility">}}).

<div data-bpmn-diagram="../bpmn/event-conditional" ></div>

As you can see in the example process, an intermediate conditional event is like an wait until the condition is satisfied. In this example, if
the processor comes available (variable `processorAvailable` is set to `true`) the condition will be satisfied and the execution process to the next activity.

In the user task, with the conditional boundary event, the execution can be interrupt if the condition, which checks whether the application was changed, is satisfied.
For example the variable `isChanged` or `isDirty` is set to `true`, which satisfies the condition of the boundary event.

During the hole execution of the process the application can be canceled. This can be done by setting the variable `cancel` to `true` on process level.
Every time a variable is set in the variable scope of the process instance the condition of the start event will be evaluated.
Is the variable `cancel` set to true, the condition is satisfied and the execution is interrupted by the event sub process.
This will cancel the current processing of the application.

## Condition

To specify when an conditional event should be triggered, a `condition` must be specified as a sub-element of `conditionalEventDefinition`.

```xml
<conditionalEventDefinition>
  <condition type="tFormalExpression">${true}</condition>
</conditionalEventDefinition>
```

Conditional events are only evaluated if a variable was changed, except conditional intermediate events see below. 
It is possible to specify on which variable and variable change event the condition should be evaluated.
For that the camunda extension attributes `camunda:variableName` and `camunda:variableEvent` can be used.

The `variableName` defines the variable name, on which the condition should be only evaluated.
The `variableEvents` defines the variable change events, on which the condition should be only evaluated.
It is possible to specify more than one variable change events as comma separated list.
The attributes can be used in combination.

The `conditionalEventDefinition` can for example look like this:

```xml
<conditionalEventDefinition camunda:variableName="var1" camunda:variableEvent="create, update">
  <condition type="tFormalExpression">${var1 == 1}</condition>
</conditionalEventDefinition>
```

The condition is only evaluated if the variable `var1` is created or updated on the current variable scope. 
It is reasonable to use the `variableEvent` on non interrupting events, since these events can be triggered more than once!

The variable specification gives more control over the condition evaluation and event triggering.
If the `variableName` and `variableEvent` is not specified the condition will be evaluated every time a variable changes.

## Conditional Boundary Event

A boundary conditional event acts like an observer, which will be triggered if a specific condition is satisfied.
If a variable is changed during the execution of an activity, to which the boundary event is attached, the condition will be evaluated.
That means the condition is only evaluated if a variable changes during the execution of the activity on which the boundary event is attached to.

There is the difference between an interrupting and a non interrupting conditional event. The interrupting event is the default. 
The non-interrupting event leads to the original activity not being interrupted, the activity stays there. 
Instead, an additional execution is created and sent over the outgoing transition of the event.
A non interrupting conditional event can be triggered more than once, every time a variable is changed on the execution on which the
condition is evaluated. Obviously the activity with the attached boundary event must be still active.

In the XML representation for non interrupting conditional events, the cancelActivity attribute is set to false:
```xml
<boundaryEvent id="conditionalEvent" attachedToRef="taskWithCondition" cancelActivity="false">
  <conditionalEventDefinition>
    <condition type="tFormalExpression">${true}</condition>
  </conditionalEventDefinition>
</boundaryEvent>
```

On concurrent executions the conditions are evaluated either on variable changes on the parent execution or
on there current execution.
For more informations about variable scopes see documentation of [Process Variables]({{< relref "user-guide/process-engine/variables.md#variable-scopes-and-variable-visibility">}}).

<div data-bpmn-diagram="../bpmn/event-conditional-parallel-boundary" ></div>
  

## Intermediate Conditional Catch Event

A conditional intermediate event is like an wait until the condition is true. When the execution arrives the catching event activity,
the condition is evaluated for the first time. Is the condition satisfied the execution process to the next activity.
Was the condition not satisfied the condition will be evaluated every time a variable is changed, except a specific `variableName` 
or `variableEvent` is defined.

A conditional intermediate event is defined as an intermediate catching event.
The specific type sub-element in this case is a conditionalEventDefinition element.

```xml
<intermediateCatchEvent id="conditionalEvent">
  <conditionalEventDefinition>
    <condition type="tFormalExpression">${true}</condition>
  </conditionalEventDefinition>
</intermediateCatchEvent>
```

## Conditional Start Event

A conditional start event are only supported on an event sub process. On start of an process with a defined event sub process (that contains
an condition start event) a subscription will be created. Every time a variable is changed, on the process scope, the condition of the
conditional start event will be evaluated. Is the condition satisfied the event sub process is executed. 

Similar to the conditional boundary events the conditional start events can be interrupting and non interrupting. 
Non interrupting conditional start events can be triggered more than once, that can be restricted with the help of the `variableName`
and `variableEvent` attributes.

The XML representation of a conditional start event is the normal start event declaration with a conditionalEventDefinition child-element:

```xml
<subProcess id="EventSubProcess" triggeredByEvent="true">
  <startEvent id="conditionalStartEvent">
    <conditionalEventDefinition>
      <condition type="tFormalExpression">${true}</condition>
    </conditionalEventDefinition>
  </startEvent>
</subProcess>
```

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
