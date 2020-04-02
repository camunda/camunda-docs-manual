---

title: 'Parallel Gateway'
weight: 30

menu:
  main:
    identifier: "bpmn-ref-gateways-parallel"
    parent: "bpmn-ref-gateways"
    pre: "Model fork / join concurrency."

---


Gateways can also be used to model concurrency in a process. The most straightforward gateway to introduce concurrency in a process model is the Parallel Gateway, which allows forking into multiple paths of execution or joining multiple incoming paths of execution.

<div data-bpmn-diagram="../bpmn/parallel-gateway"></div>

The functionality of the parallel gateway is based on the incoming and outgoing sequence flow(s):

*   fork: all outgoing sequence flows are followed in parallel, creating one concurrent execution for each sequence flow.
*   join: all concurrent executions arriving at the parallel gateway wait at the gateway until an execution has arrived for each of the incoming sequence flows. Then the process continues past the joining gateway.

{{< note title="Limitation" class="warning" >}}
  Note that in Camunda's implementation of the parallel gateway, the gateway triggers as soon as the following holds: The number of arrived tokens is equal to the number of incoming sequence flows. It is not required that a token arrives on *every* incoming flow.
{{< /note >}}

Note that a parallel gateway can have both fork and join behaviors, if there are multiple incoming and outgoing sequence flows for the same parallel gateway. In that case, the gateway will first join all incoming sequence flows, before splitting into multiple concurrent paths of executions.

An important difference with other gateway types is that the parallel gateway does not evaluate conditions. If conditions are defined on the sequence flow connected with the parallel gateway, they are simply ignored.

Defining a parallel gateway needs one line of XML:

```xml
<parallelGateway id="myParallelGateway" />
```

The actual behavior (fork, join or both), is defined by the sequence flow connected to the parallel gateway.

For example, the model above comes down to the following XML:

```xml
<startEvent id="theStart" />
<sequenceFlow id="flow1" sourceRef="theStart" targetRef="fork" />

<parallelGateway id="fork" />
<sequenceFlow sourceRef="fork" targetRef="receivePayment" />
<sequenceFlow sourceRef="fork" targetRef="shipOrder" />

<userTask id="receivePayment" name="Receive Payment" />
<sequenceFlow sourceRef="receivePayment" targetRef="join" />

<userTask id="shipOrder" name="Ship Order" />
<sequenceFlow sourceRef="shipOrder" targetRef="join" />

<parallelGateway id="join" />
<sequenceFlow sourceRef="join" targetRef="archiveOrder" />

<userTask id="archiveOrder" name="Archive Order" />
<sequenceFlow sourceRef="archiveOrder" targetRef="theEnd" />

<endEvent id="theEnd" />
```

In the above example, after the process is started, two tasks are created:

```java
ProcessInstance pi = runtimeService.startProcessInstanceByKey("forkJoin");
TaskQuery query = taskService.createTaskQuery()
                         .processInstanceId(pi.getId())
                         .orderByTaskName()
                         .asc();

List<Task> tasks = query.list();
assertEquals(2, tasks.size());

Task task1 = tasks.get(0);
assertEquals("Receive Payment", task1.getName());
Task task2 = tasks.get(1);
assertEquals("Ship Order", task2.getName());
```

When these two tasks are completed, the second parallel gateway joins the two executions and, as there is only one outgoing sequence flow, no concurrent paths of execution are created and only the Archive Order task is active.

Note that a parallel gateway does not need to be 'balanced' (i.e., a matching number of incoming/outgoing sequence flows for corresponding parallel gateways). A parallel gateway will simply wait for all incoming sequence flows and create a concurrent path of execution for each outgoing sequence flow, not influenced by other constructs in the process model. So, the following process is legal in BPMN 2.0:

<div data-bpmn-diagram="../bpmn/parallel-gateway-unbalanced"></div>


# Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#asyncbefore" >}}">camunda:asyncBefore</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#asyncafter" >}}">camunda:asyncAfter</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#exclusive" >}}">camunda:exclusive</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#jobpriority" >}}">camunda:jobPriority</a>
   </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#failedjobretrytimecycle" >}}">camunda:failedJobRetryTimeCycle</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#executionlistener" >}}">camunda:executionListener</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      The <code>camunda:exclusive</code> attribute is only evaluated if the attribute
      <code>camunda:asyncBefore</code> or <code>camunda:asyncAfter</code> is set to <code>true</code>
    </td>
  </tr>
</table>


# Additional Resources

*   [Parallel Gateways](http://camunda.org/bpmn/reference.html#gateways-parallel-gateways) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)
