---

title: 'Inclusive Gateway'
weight: 40

menu:
  main:
    identifier: "bpmn-ref-gateways-inclusive"
    parent: "bpmn-ref-gateways"
    pre: "Model conditional fork / join concurrency."

---


The Inclusive Gateway can be seen as a combination of an exclusive and a parallel gateway. Like an exclusive gateway, you can define conditions on outgoing sequence flows and the inclusive gateway will evaluate them. However, the main difference is that the inclusive gateway can receive more than one sequence flow, like a parallel gateway.

The functionality of the inclusive gateway is based on the incoming and outgoing sequence flows:

*   __fork__: all outgoing sequence flow conditions are evaluated and for the sequence flow conditions that evaluate to 'true', the flows are followed in parallel, creating one concurrent execution for each sequence flow.
*   __join__: all concurrent executions arriving at the inclusive gateway wait at the gateway until an execution has arrived for each of the incoming sequence flows that have a process token. This is an important difference to the parallel gateway. So in other words, the inclusive gateway will only wait for the incoming sequence flows that are executed. After the join, the process continues past the joining inclusive gateway.

Note that an inclusive gateway can have both _fork_ and _join_ behavior, if there are multiple incoming and outgoing sequence flows for the same inclusive gateway. In that case, the gateway will first join all incoming sequence flows that have a process token, before splitting into multiple concurrent paths of executions for the outgoing sequence flows that have a condition that evaluates to 'true'.

<div data-bpmn-diagram="../bpmn/inclusive-gateway"></div>

Defining an inclusive gateway needs one line of XML:

```xml
<inclusiveGateway id="myInclusiveGateway" />
```

The actual behavior (fork, join or both) is defined by the sequence flows connected to the inclusive gateway. For example, the model above comes down to the following XML:

```xml
<startEvent id="theStart" />
<sequenceFlow id="flow1" sourceRef="theStart" targetRef="fork" />

<inclusiveGateway id="fork" />
<sequenceFlow sourceRef="fork" targetRef="receivePayment" >
<conditionExpression xsi:type="tFormalExpression">${paymentReceived == false}</conditionExpression>
</sequenceFlow>
<sequenceFlow sourceRef="fork" targetRef="shipOrder" >
<conditionExpression xsi:type="tFormalExpression">${shipOrder == true}</conditionExpression>
</sequenceFlow>

<userTask id="receivePayment" name="Receive Payment" />
<sequenceFlow sourceRef="receivePayment" targetRef="join" />

<userTask id="shipOrder" name="Ship Order" />
<sequenceFlow sourceRef="shipOrder" targetRef="join" />

<inclusiveGateway id="join" />
<sequenceFlow sourceRef="join" targetRef="archiveOrder" />

<userTask id="archiveOrder" name="Archive Order" />
<sequenceFlow sourceRef="archiveOrder" targetRef="theEnd" />

<endEvent id="theEnd" />
```

In the above example, after the process is started, two tasks are created if the process variables paymentReceived == false and shipOrder == true. In case only one of these conditions evaluates to true, only one task will be created. If no condition evaluates to true, an exception is thrown. This can be prevented by specifying a default outgoing sequence flow. In the following example one task will be created, the ship order task:

```java
HashMap<String, Object> variableMap = new HashMap<String, Object>();
variableMap.put("receivedPayment", true);
variableMap.put("shipOrder", true);

ProcessInstance pi = runtimeService.startProcessInstanceByKey("forkJoin");

TaskQuery query = taskService.createTaskQuery()
                         .processInstanceId(pi.getId())
                         .orderByTaskName()
                         .asc();

List<Task> tasks = query.list();
assertEquals(1, tasks.size());

Task task = tasks.get(0);
assertEquals("Ship Order", task.getName());
```

When this task is completed, the second inclusive gateway joins the two executions and, since there is only one outgoing sequence flow, no concurrent paths of execution are created and only the Archive Order task is active.

Note that an inclusive gateway does not need to be 'balanced' (i.e., a matching number of incoming/outgoing sequence flows for corresponding inclusive gateways). An inclusive gateway will simply wait for all incoming sequence flows and create a concurrent path of execution for each outgoing sequence flow, not influenced by other constructs in the process model.


# Camunda-specific behavior 

Note that in Camunda's implementation of the inclusive gateway, the following holds: 

* If the join waits for a token, but that token takes a different turn in the process 
  so that it can no longer reach the join (e.g. because of a boundary event interrupting 
  the flow), then the join will not trigger.
* The join will trigger when:
  * it received a number of tokens greater or equal to the number of incoming sequence 
    flows. The tokens do not necessarily need to reach the gateway through different 
    sequence flows.
  * it received a number of tokens smaller than the number of incoming sequence flows 
    and there are no more tokens that can arrive at the gateway.

The following examples show under which conditions an inclusive gateway will trigger a join:

1. In the following scenario, `Parallel Gateway 1` creates three execution tokens, but
   only two sequence flows join in the inclusive gateway. In this scenario, the inclusive
   gateway **will trigger** even with only two tokens since the tokens from `Task 1` and `Task 2`
   were joined in a single token by `Parallel Gateway 2`. 
   <div data-bpmn-diagram="../bpmn/inclusive_gateway_scenario_1"></div>
   
1. In this scenario, `Parallel Gateway 1` creates two execution tokens, and
   three sequence flows join in the inclusive gateway. In this scenario, the inclusive
   gateway **will trigger** with three tokens since `Parallel Gateway 2` splits the single
   token from `Task 1` into two separate tokens for `Task 3` and `Task 4`.
   <div data-bpmn-diagram="../bpmn/inclusive_gateway_scenario_2"></div>

1. In the diagram below, the parallel gateway creates two execution tokens. The first
   execution token will wait at `User Task 1`, and the second will reach the
   `Inclusive Gateway`. The `Inclusive Gateway` will trigger immediately for the first token,
   and a second time, for the second token, as both tokens arrive on the same sequence flow.
   As a result, there will be two instances of `User Task 2` that will need to be completed.
   <div data-bpmn-diagram="../bpmn/inclusive_gateway_scenario_3"></div>

1. In the last scenario, the parallel gateway creates two execution tokens. The first
   execution token will wait at `User Task 1`, and the second will reach the
   `Inclusive Gateway 2` and wait for the gateway to trigger. However, the
   `Inclusive Gateway 2` **will not trigger** a join until `User Task 1` is completed and
   the second token arrives at the gateway. As a result, the `Inclusive Gateway 2` will trigger
   only once instead of two times. According to the BPMN 2.0 specification, since both tokens pass 
   the same sequence flow (true), the inclusive gateway should trigger twice. Finally, due to this
   behavior, only one instance of `User Task 2` will need to be completed instead of the expected two.
   In cases like this one, it is recommended to use an [`Exclusive Gateway`]({{< ref "/reference/bpmn20/gateways/exclusive-gateway.md" >}})
   instead of the `Inclusive Gateway 1`.
   <div data-bpmn-diagram="../bpmn/inclusive_gateway_scenario_4"></div>

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

*   [Inclusive Gateways](http://camunda.org/bpmn/reference.html#gateways-data-based-inclusive-gateways) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)
*   [Conditional and Default Sequence Flows]({{< ref "/reference/bpmn20/gateways/sequence-flow.md" >}})
