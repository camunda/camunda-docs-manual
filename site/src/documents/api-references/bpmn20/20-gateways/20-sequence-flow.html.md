---

title: 'Conditional and Default Sequence Flows'
shortTitle: 'Sequence Flows'
category: 'Gateways'

keywords: 'default condition sequence flow'

---


A sequence flow is the connector between two elements of a process. After an element is visited during process execution, all outgoing sequence flow will be followed. This means that the default nature of BPMN 2.0 is to be parallel: <strong>two outgoing sequence flow will create two separate, parallel paths of execution.</strong>

<div data-bpmn-diagram="implement/sequence-flow-parallel"></div>

## Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaexecutionlistener">camunda:executionListener</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>&ndash;</td>
  </tr>
</table>


## Conditional Sequence Flow

A sequence flow can have a condition defined on it. When a BPMN 2.0 activity is left, the default behavior is to evaluate the conditions on the outgoing sequence flow. When a condition evaluates to true, that outgoing sequence flow is selected. When multiple sequence flow are selected that way, multiple executions will be generated and the process will be continued in a parallel way. Note: This is different for gateways. Gateways will handle sequence flow with conditions in specific ways, depending on the gateway type.

<div data-bpmn-diagram="implement/sequence-flow-conditional"></div>

A conditional sequence flow is represented in XML as a regular sequence flow, containing a conditionExpression sub-element. Note that for the moment only tFormalExpressions are supported, Omitting the xsi:type="" definition will simply default to this only supported type of expressions.

```xml
<sequenceFlow id="flow" sourceRef="theStart" targetRef="theTask">
  <conditionExpression xsi:type="tFormalExpression">
    <![CDATA[${order.price > 100 && order.price < 250}]]>
  </conditionExpression>
</sequenceFlow>
```

Currently conditionalExpressions can only be used with UEL, detailed info about these can be found in section Expressions. The expression used should resolve to a boolean value, otherwise an exception is thrown while evaluating the condition.

The example below references data of a process variable, in the typical JavaBean style through getters.

```xml
<conditionExpression xsi:type="tFormalExpression">
  <![CDATA[${order.price > 100 && order.price < 250}]]>
</conditionExpression>
```

This example invokes a method that resolves to a boolean value.

```xml
<conditionExpression xsi:type="tFormalExpression">
  <![CDATA[${order.isStandardOrder()}]]>
</conditionExpression>
```


## Default Sequence Flow

All BPMN 2.0 tasks and gateways can have a default sequence flow. This sequence flow is only selected as the outgoing sequence flow for that activity if and only if none of the other sequence flow could be selected. Conditions on a default sequence flow are always ignored.

A default sequence flow for a certain activity is defined by the default attribute on that activity. The following shows for example an exclusive gateway with a default sequence flow. Only when x is not 1 or 2, it will be chosen as outgoing sequence flow for the gateway.

<div data-bpmn-diagram="implement/exclusive-gateway"></div>

Note the 'slash' marker at the beginning of the default sequence flow. The corresponding XML snippet shows how flow4 is configured as default sequence flow.

```xml
<exclusiveGateway id="exclusiveGw" name="Exclusive Gateway" default="flow4" />

<sequenceFlow id="flow2" sourceRef="exclusiveGw" targetRef="theTask1" name="${x==1}">
  <conditionExpression xsi:type="tFormalExpression">${x == 1}</conditionExpression>
</sequenceFlow>

<sequenceFlow id="flow3" sourceRef="exclusiveGw" targetRef="theTask2" name="${x==2}">
  <conditionExpression xsi:type="tFormalExpression">${x == 2}</conditionExpression>
</sequenceFlow>

<sequenceFlow id="flow4" sourceRef="exclusiveGw" targetRef="theTask3" name="else">
</sequenceFlow>
```
