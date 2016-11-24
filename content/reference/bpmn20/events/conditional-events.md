---

title: 'Conditional Events'
weight: 70

menu:
  main:
    identifier: "bpmn-ref-events-conditional-events"
    parent: "bpmn-ref-events"
    pre: "Events catching conditional event."

---

The conditional event defines an event which will be triggered if a given condition is evaluated to true.
It can be used as start event of an event sub process, as intermediate event and boundary event.
The start and boundary event can be interrupting and non interrupting.

In the Camunda specific implementation conditional events are triggered with the help of variables.
See the section [Trigger Conditional Events]({{< relref "#trigger-conditional-events">}}) for more information.

In the following BPMN model all supported conditional events are used.

<div data-bpmn-diagram="../bpmn/event-conditional" ></div>

As you can see, an intermediate conditional event is like a wait until the condition is satisfied. In this example, if
the processor becomes available and the condition is for example `${processorAvailable == true}`, the condition will be satisfied and the execution process to the next activity.

Is the condition of the conditional boundary event satisfied, which checks whether the application was changed, the corresponding UserTask will be interrupted.

During the entire execution of the process instance, the application can be canceled. If the condition of the conditional start event is
satisfied the execution of the process instance will be interrupted by the event sub process.
This will cancel the current processing of the application.

# Condition

To specify when a conditional event should be triggered, a `condition` must be specified as a sub-element of `conditionalEventDefinition`.

```xml
<conditionalEventDefinition>
  <condition type="tFormalExpression">${true}</condition>
</conditionalEventDefinition>
```

It is possible to specify on which variable and variable change event the condition should be evaluated.
For that the camunda extension attributes `camunda:variableName` and `camunda:variableEvent` can be used.

The `variableName` defines the variable name on which the condition should be evaluated exclusively.
The `variableEvents` defines the variable change events on which the condition should be evaluated exclusively.
It is possible to specify more than one variable change event as a comma separated list.
The attributes can be used in combination.

The `conditionalEventDefinition` can, for example, look like this:

```xml
<conditionalEventDefinition camunda:variableName="var1" camunda:variableEvent="create, update">
  <condition type="tFormalExpression">${var1 == 1}</condition>
</conditionalEventDefinition>
```

The condition is only evaluated if the variable `var1` is created or updated on the current variable scope.
It is reasonable to use the `variableEvent` on non interrupting events, since these events can be triggered more than once!

The variable specification gives more control over the condition evaluation and event triggering.
If the `variableName` and `variableEvent` is not specified, the condition will be evaluated every time a variable changes.
See the section [Trigger Conditional Events]({{< relref "#trigger-conditional-events">}}) for more information.

# Conditional Boundary Event

A conditional boundary event acts like an observer which is triggered if a specific condition is satisfied.

There is a difference between an interrupting and a non interrupting conditional event. The interrupting event is the default.
The non-interrupting event leads to the original activity not being interrupted, the activity stays there.
Instead, an additional execution is created and sent over the outgoing transition of the event.
A non interrupting conditional event can be triggered more than once. Obviously the activity with the attached boundary event must be still active.

In the XML representation for non interrupting conditional events, the cancelActivity attribute is set to false:
```xml
<boundaryEvent id="conditionalEvent" attachedToRef="taskWithCondition" cancelActivity="false">
  <conditionalEventDefinition>
    <condition type="tFormalExpression">${true}</condition>
  </conditionalEventDefinition>
</boundaryEvent>
```

# Intermediate Conditional Catch Event

An intermediate conditional event is like a wait until the condition is true. When the execution arrives at the catching event activity,
the condition is evaluated for the first time. If the condition is satisfied, the execution process continues to the next activity.
If the condition is not satisfied, the execution stays in this activity until the condition is satisfied.

An intermediate conditional event is defined as an intermediate catching event.
The specific type sub-element in this case is a conditionalEventDefinition element.

```xml
<intermediateCatchEvent id="conditionalEvent">
  <conditionalEventDefinition>
    <condition type="tFormalExpression">${true}</condition>
  </conditionalEventDefinition>
</intermediateCatchEvent>
```

# Conditional Start Event

A conditional start event is only supported on an event sub process. On start of a process with a defined event sub process (that contains
a conditional start event), the condition will be evaulated. Is the condition satisfied the event sub process will be triggered otherwise a subscription is created. If the condition is satisfied during the execution of the process instance, the event sub process is executed.

Similar to conditional boundary events, conditional start events can be interrupting and non interrupting.
Non interrupting conditional start events can be triggered more than once. This can be restricted with the help of the `variableName`
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

# Trigger Conditional Events

In the following section we will explain how conditional events are triggered.

## Default Evaluation

At the time on which a new scope is created the conditional events, which are available in this scope, 
are evaluated and triggered if there condition is satisfied. This behavior is called default evaluation of conditional events at
scope creation time.

For example a BPMN Process is started which contains an global event sub process with conditional start event this condition will be evaluated
before the start event of the process is executed. The same applies to activities with conditional boundary events and intermediate conditional events.

## Triggering

Besides the triggering via the default evaluation conditional events can also be triggered with the help of variable events.

### Top-Down Evaluation

If a variable is created, updated or deleted on a variable scope an variable event is created. 
In this case the Top-Down conditional event evaluation is started. That means the evaluation starts at the the conditional events of the highest scope,
on which the variable event was created. If no conditional event interrupts the current execution, the conditional events of the
child variable scopes are evaluated. This is done recursively until a conditional event interrupts the current execution or the lowest variable
scope is reached and there available conditional events are evaluated. The lowest scope corresponds to the scope of the activity which is currently executed.

For example see the following BPMN process model:

<div data-bpmn-diagram="../bpmn/conditionalEventScopesHighestFirst" ></div>

Is a variable set on the variable scope of the sub process the conditional boundary event of the sub process is evaluated as first.
Is the condition satisfied the execution is interrupted, otherwise the conditional boundary event of the `UserTask B` is evaluated and
triggered if the condition is satisfied. 

### Scope Evaluation


Variables events on concurrent variable scopes can only trigger the corresponding conditional events.
That means if a variable event is created, only the conditional events are evaluated which are belongs to the variable
scope or to their child scopes.

See the following BPMN process model:

<div data-bpmn-diagram="../bpmn/conditionalEventScopes" ></div>

If a variable event is created on the variable scope of the sub process only the conditional boundary event of the `UserTask B` is evaluated,
not the conditional boundary event of the `UserTask A`. Nevertheless is the variable event created on the process instance variable scope
the conditional boundary event of the `UserTask A` is evaluated as first. See the following activity instance hierarchy:

    ProcessInstance
       UserTask A
       SubProcess
         UserTask B

In this tree you can see that the `UserTask A` is on higher scope than the `UserTask B`, thats why the conditional boundary event
of the `UserTask A` will be evaluated as first, if the variable event is created on the process instance level. For more
information's see the section about [Activity Instances]({{< relref "user-guide/process-engine/process-engine-concepts.md#activity-instances">}}).

### Set Variable From Outside

Let us assume we have started the process above and are now staying in `UserTask A` and `B`. If we only want to trigger
the boundary event of the `UserTask B` we have to set a variable on variable scope of the `UserTask B`.
This can be done via:

```java
  //get task with corresponding execution id
  Task task = taskService.createTaskQuery().taskName("UserTask B").singleResult();
  //set variable on this execution
  runtimeService.setVariableLocal(task.getExecutionId(), "variable", 1);
```

The same applies to triggering the conditional boundary event of the `UserTask A`.

### Set Variable From Delegation Code

Variables can not only be set from outside also from delegation code, see for information the
[Delegation Code]({{< relref "user-guide/process-engine/delegation-code.md">}}) section.
Setting a variable will create a variable event. Theses variables events are collected and delayed if they are created in delegation code.

In the following picture the different activity instance phases are displayed.

{{< img src="../img/activityInstanceState.png" title="API Services" >}}

 * `Starting` corresponds to the starting phase of the activity instance. At this time the input mappings and execution start listeners are called. 
 * `Default` or `Execute` corresponds to the executing phase of the activity instance.
 * `Ending` corresponds to the ending phase of the activity instance. At this time the output mappings and execution end listeners are called.

On the border of each activity instance phase, which you can see in the picture above,
the delayed variable events are dispatched, so after `starting`, `default` and `ending`. This dispatching can trigger conditional events.
The default evaluation of conditional events is executed after dispatching the delayed events of the activity instance `starting` phase.

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
