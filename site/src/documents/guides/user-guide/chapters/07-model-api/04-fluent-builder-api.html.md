---

title: 'Fluent builder API'
category: 'BPMN model API'

---

To create simple BPMN processes we provide a fluent builder API. With this API you can easily create basic
processes in few lines of code. In the [generate invoice process][1] quickstart we demonstrate how to
create a rather complex process with 5 tasks and 2 gateways within less then 50 lines of code.

The fluent builder API is not nearly complete but provide you the following basic elements:

* process
* start event
* exclusive gateway
* parallel gateway
* script task
* service task
* user task
* end event

## Create a process with the fluent builder API

To create a empty model instance with a new process the method `Bpmn.createProcess()` is used. After this
you can add as many tasks and gateways as you like. At the end you must call `done()` to return the generated
model instance. So for example a simple process with one user task can be created like this:

```java
BpmnModelInstance modelInstance = Bpmn.createProcess()
  .startEvent()
  .userTask()
  .endEvent()
  .done();
```

To add a new element you have to call a function which is named like the
element to add. Additionally you can set attributes of the last created
element.

So for example lets set the name of the process and mark it executable and give the user task also a name.

```java
BpmnModelInstance modelInstance = Bpmn.createProcess()
    .name("Example process")
    .executable()
  .startEvent()
  .userTask()
    .name("Some work to do")
  .endEvent()
  .done();
```

As you can see a sequential process is really simple and straightforward to model but often you want
branches and parallel execution path. Which is also possible with the fluent builder API. Just add
a parallel or exclusive gateway and model the first path till an end event or another gateway. After that
call the `moveToLastGateway()` method and you return to the last gateway and can model the next path.

```java
BpmnModelInstance modelInstance = Bpmn.createProcess()
  .startEvent()
  .userTask()
  .parallelGateway()
    .scriptTask()
    .endEvent()
  .moveToLastGateway()
    .serviceTask()
    .endEvent()
  .done();
```

This examples models a process with an user task after the start event followed by a parallel gateway
with two parallel outgoing execution paths with each a task and an end event.

Normally you want to add conditions on outgoing flows of an exclusive gateway which is also simple with
the fluent builder API. Just use the method `condition()` and give it a label and an expression.

```java
BpmnModelInstance modelInstance = Bpmn.createProcess()
  .startEvent()
  .userTask()
  .exclusiveGateway()
  .name("What to do next?")
    .condition("Call an agent", "#{action = 'call'}")
    .scriptTask()
    .endEvent()
  .moveToLastGateway()
    .condition("Create a task", "#{action = 'task'}")
    .serviceTask()
    .endEvent()
  .done();
```

If you want to use the `moveToLastGateway()` method but have multiple incoming
sequence flows at your current position you have to use the generic
`moveToNode` method with the id of the gateway. This could for example happen
if you add a join gateway to your process. For this purpose and for loops we
added the `connectTo(elementId)` method.

```java
BpmnModelInstance modelInstance = Bpmn.createProcess()
  .startEvent()
  .userTask()
  .parallelGateway("fork")
    .serviceTask()
    .parallelGateway("join")
  .moveToNode("fork")
    .userTask()
    .connectTo("join")
  .moveToNode("fork")
    .scriptTask()
    .connectTo("join")
  .endEvent()
  .done()
```

This example creates a process with three parallel execution paths which all
joins in the second gateway. Notice that the first call of `moveToNode` is not
needed cause at this point the joining gateway has only one incoming sequence
flow but was used for consistency.

```java
BpmnModelInstance modelInstance = Bpmn.createProcess()
  .startEvent()
  .userTask()
  .id("question")
  .exclusiveGateway()
  .name("Everything fine?")
    .condition("yes", "#{fine}")
    .serviceTask()
    .userTask()
    .endEvent()
  .moveToLastGateway()
    .condition("no", "#{!fine}")
    .userTask()
    .connectTo("question")
  .done()
```

This examples create an parallel gateway with a feedback loop in the second execution path.

## Extend a process with the fluent builder API

With the fluent builder API you not only can create processes you can also extend existing processes.

For example imagine a process containing a parallel gateway with the id `gateway`. You now want to
add another execution path to it for a new service task which has to be executed every time.

```java
BpmnModelInstance modelInstance = Bpmn.readModelFromFile(new File("PATH/TO/MODEL.bpmn"));
ParallelGateway gateway = (ParallelGateway) modelInstance.getModelElementById("gateway");

gateway.builder()
  .serviceTask()
    .name("New task")
  .endEvent();
```

Another use case is to insert new tasks between existing elements. Imagine a process
containing a user task with the id `task1` which is followed by a service task. And now
you want to add a script task and an user task between these two.

```java
BpmnModelInstance modelInstance = Bpmn.readModelFromFile(new File("PATH/TO/MODEL.bpmn"));
UserTask userTask = (UserTask) modelInstance.getModelElementById("task1");
SequenceFlow outgoingSequenceFlow = userTask.getOutgoing().iterator().next();
FlowNode serviceTask = outgoingSequenceFlow.getTarget();
userTask.getOutgoing().remove(outgoingSequenceFlow);

userTask.builder()
  .scriptTask()
  .userTask()
  .connectTo(serviceTask.getId());
```


[1]: https://github.com/camunda/camunda-quickstarts/tree/master/bpmn-model-api/generate-invoice-process
