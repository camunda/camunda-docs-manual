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
They can be used as start event of an event sub process, as intermediate event and boundary event.
The start and boundary event can be interrupting and non interrupting.

In the following BPMN model all supported conditional events are used. Conditions of conditional events
are evaluated at scope creation time and if a variable changes on execution level. At scope creation time means for example, that if an activity 
with a condition boundary event is reached the condition is at first evaluated and triggered, if the condition is satisfied. Is the condition not satisfied
the activity will be executed and the conditional event can be triggered via setting a variable on the variable scope.
The same takes affect for conditional start events of event sub processes if a sub process is reached (or the process instance is started, which contains an event sub process).
For more information about variable scopes, see the documentation of below and [Process Variables]({{< relref "user-guide/process-engine/variables.md#variable-scopes-and-variable-visibility">}}).

<div data-bpmn-diagram="../bpmn/event-conditional" ></div>

As you can see in the example process, an intermediate conditional event is like a wait until the condition is satisfied. In this example, if
the processor becomes available (variable `processorAvailable` is set to `true`), the condition will be satisfied and the execution process to the next activity.

In the user task, with the conditional boundary event, the execution can be interrupted if the condition which checks whether the application was changed is satisfied.
For example, if the variable `isChanged` or `isDirty` is set to `true`, the condition of the boundary event is satisfied.

During the entire execution of the process, the application can be canceled. This can be done by setting the variable `cancel` to `true` on process level.
Every time a variable is set in the variable scope of the process instance, the condition of the start event will be evaluated.
If the variable `cancel` is set to true, the condition is satisfied and the execution is interrupted by the event sub process.
This will cancel the current processing of the application.

# Trigger Conditional Events 

In the following section we will explain how setting a variable on a variable scope can affect a conditional event.

## Default Evaluation

The default evaluation means that conditional events are evaluated the first time at scope creation time.
That means if a BPMN Process is started which contains an global event sub process with conditional start event this condition will be evaluated 
before the start event of the process is executed. This can be useful if a process is started with variables and on some cases the process should do something different.

Also if an activity with a conditional boundary event is reached or an sub process with event sub process inside, the conditions are at first evaluated before the activity is
exeucted. If the condition are satisfied the conditional event is triggered. That same applies to intermediate conditional events. During the execution of the activity 
on which the conditional event is attached to a variable event can trigger the conditional event.

## Triggering

The following BPMN process model is more complex and combines some of the conditional events with sub processes and concurrency.

<div data-bpmn-diagram="../bpmn/conditionalEventScopes" ></div>

In the picture below the execution tree of the BPMN model is displayed. This execution tree corresponds to the execution time on which
the execution stays in `UserTask A` and `B`.


<div data-bpmn-diagram="../bpmn/conditionalEventScopesExecutionTree" ></div>

The execution tree above displays the current existing executions. The concurrent executions are created if a parallel gateway will for example be passed.
ScopeExecution are created for sub processes or activities with boundary events. With this knowledge of the execution tree it is possible to trigger the conditional events
separately.

### Set Variable From Outside

Let us assume we have started the process above and are now staying in `UserTask A` and `B`, so the execution tree will look like the tree above. If we only want to trigger
the boundary event of the `UserTask B` we have to set a variable on the `ScopeExecution 3`. 
This can be done via:

```java
  //get task with corresponding execution id
  Task task = taskService.createTaskQuery().taskName("UserTask B").singleResult();
  //set variable on this execution
  runtimeService.setVariableLocal(task.getExecutionId(), "variable", 1);
```

The same applies to triggering the conditional boundary event of the `UserTask A`.

If a variable is set on the `Concurrent Execution 2` all conditional events are triggered which are below this execution in other words
which are inside this scope. To explain this on the BPMN Model: We set a variable on the upper parallel branch, that triggers all conditional events which are inside this branch.
That means the conditiona boundary event of the sub process and of the `UserTask B` and also the conditional start event of the event sub process inside
the sub process. 

According to this if a variable is set on the process instance execution, all conditional events are triggered. That means if we change the code above
and call instead of `setVariableLocal` the method `setVariable` the variable will be set on process instance level.

```java
  //get task with corresponding execution id
  Task task = taskService.createTaskQuery().taskName("UserTask B").singleResult();
  //set variable on process instance execution
  runtimeService.setVariable(task.getExecutionId(), "variable", 1);
```

### Set Variable From Delegation Code

Variables can not only be set from outside also from delegation code. 
For example with the help of execution listener, input-output mapping, JavaDelegates or Expressions.
Setting a variable will create a variable event. Theses variables events are collected and delayed if they are created in delegation code.

In the following picture the different activity instance states are displayed. `Starting` corresponds to the starting of the activity instance.
At this time the input mappings and execution start listeners are called. After that the activity changes the state to execute or also called `default` state.
In the end of the activity instance the ending state is used, on which the output mappings and execution end listeners are called.


{{< img src="../img/activityInstanceState.png" title="API Services" >}}

Every time a variable is set in delegation code the corresponding variable event is delayed. On the border of the current activity instance state, which you can see in the picture above, 
the delayed variable events are dispatched. This dispatching can trigger conditional events. The default evaluation of conditional events is executed after dispatching the delayed events of the 
activity instancte starting state.

# Condition

To specify when a conditional event should be triggered, a `condition` must be specified as a sub-element of `conditionalEventDefinition`.

```xml
<conditionalEventDefinition>
  <condition type="tFormalExpression">${true}</condition>
</conditionalEventDefinition>
```

Conditional events are only evaluated if a variable was changed, except conditional intermediate events (see below). 
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

# Conditional Boundary Event

A conditional boundary event acts like an observer which is triggered if a specific condition is satisfied.
If a variable is changed during the execution of an activity to which the boundary event is attached, the condition will be evaluated.
That means the condition is only evaluated if a variable changes during the execution of the activity onto which the boundary event is attached.

There is a difference between an interrupting and a non interrupting conditional event. The interrupting event is the default. 
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

On concurrent executions, the conditions are evaluated either on variable changes on the parent execution or
on their current execution.
For more information about variable scopes see the documentation of [Process Variables]({{< relref "user-guide/process-engine/variables.md#variable-scopes-and-variable-visibility">}}).

<div data-bpmn-diagram="../bpmn/event-conditional-parallel-boundary" ></div>
  

# Intermediate Conditional Catch Event

An intermediate conditional event is like a wait until the condition is true. When the execution arrives at the catching event activity,
the condition is evaluated for the first time. If the condition is satisfied, the execution process continues to the next activity.
If the condition is not satisfied, the condition will be evaluated every time a variable is changed, except if a specific `variableName` 
or `variableEvent` is defined.

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
a conditional start event), a subscription is created. Every time a variable is changed on the process scope, the condition of the
conditional start event is evaluated. If the condition is satisfied, the event sub process is executed. 

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
