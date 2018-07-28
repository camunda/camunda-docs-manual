---

title: 'Escalation Events'
weight: 55

menu:
  main:
    identifier: "bpmn-ref-events-escalation-events"
    parent: "bpmn-ref-events"
    pre: "Events catching / throwing escalations."
---

Escalation events are events which reference a named escalation. They are mostly used to communicate from a subprocess to an upper process. Unlike an error, an escalation event is non critical and execution continues at the location of throwing.

<div data-bpmn-diagram="../bpmn/escalation-example"></div>


# Defining Escalation

An escalation event definition is declared by using the `escalationEventDefinition` element. The attribute `escalationRef` references an `escalation` element declared as a child element of the definitions root element. The following is an excerpt of a process in which an escalation event is declared and referenced by an escalation intermediate throw event.

```xml
<definitions>
  <escalation id="lateShipment" escalationCode="ORDER-LATE-SHIPMENT" />
  <!-- ... -->
  <process>
    <!-- ... -->
    <intermediateThrowEvent id="throwEscalation" name="late shipment">
      <escalationEventDefinition escalationRef="lateShipment" />
    </intermediateThrowEvent>
    <!-- ... -->
  </process>
</definitions>
```


# Catching Escalation Events

## Escalation Start Event

* {{< bpmn-symbol type="escalation-event-subprocess-start-event" >}}

* {{< bpmn-symbol type="escalation-event-subprocess-nonint-start-event" >}}

An escalation start event can only be used to trigger an event sub-process - it __cannot__ be used to start a process instance.

<div data-bpmn-diagram="../bpmn/escalation-start-event"></div>

An event sub-process with an escalation start event is triggered by an escalation event that occurs in the same scope or in a lower scope (e.g., sub-process or call activity). When the sub-process is triggered by an escalation event from a call activity, then the defined output variables of the call activity are passed to the sub-process.

Two optional attributes can be added to the escalation start event, <code>escalationRef</code> and <code>escalationCodeVariable</code>:

```xml
<subprocess triggeredByEvent="true">
  <startEvent id="catchEscalation" isInterrupting="false">
    <escalationEventDefinition camunda:escalationCodeVariable="code"/>
  </startEvent>
  <!-- ... -->
</subprocess>
```

* If `escalationRef` is omitted or `escalationCode` of referenced escalation is omitted, the event sub-process is triggered by any escalation event, regardless of the escalation code of the escalation.
* In case an `escalationRef` is set, the event sub-process is only triggered by escalation events with the defined escalation code.
* If `escalationCodeVariable` is set, the escalation code of the occurred escalation event can be retrieved using this variable.

{{< note title="Current Limitations" class="warning" >}}
* The escalation code of the start event must be unique across the event sub-processes of the same scope.
* If a start event has no `escalationRef` or `escalationCode` of referenced escalation then another event sub-process with an escalation start event is not supported.
{{< /note >}}

### Camunda Extensions

The following extensions are supported for `escalationEventDefinition`.

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#escalationcodevariable" >}}">camunda:escalationCodeVariable</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>&ndash;</td>
  </tr>
</table>

## Escalation Boundary Event

* {{< bpmn-symbol type="escalation-intermediate-boundary-event" >}}

* {{< bpmn-symbol type="escalation-intermediate-boundary-nonint-event" >}}

An intermediate catching escalation event on the boundary of an activity, or escalation boundary event for short, catches escalations that are thrown within the scope of the activity on which it is defined.

<div data-bpmn-diagram="../bpmn/escalation-boundary-event"></div>

An escalation boundary event can only attached on an embedded sub-process or a call activity, since an escalation can only be thrown by an escalation intermediate throw event or an escalation end event. When the boundary event is triggered by an escalation event from a call activity, then the defined output variables of the call activity are passed to the scope of the boundary event.

Two optional attributes can be added to the escalation boundary event, <code>escalationRef</code> and <code>escalationCodeVariable</code>, see [Escalation Start Event]({{< relref "#escalation-start-event" >}}).

```xml
<boundaryEvent id="catchEscalation" name="late shipment" attachedToRef="productProcurement">
  <escalationEventDefinition escalationRef="lateShipment" cancelActivity="false" />
</boundaryEvent>
```

{{< note title="Current Limitations" class="warning" >}}
* The escalation code of the boundary event must be unique across the boundary events of the attached activity.
* If a boundary event has no `escalationRef` or `escalationCode` of referenced escalation then another escalation boundary event is not supported.
{{< /note >}}

### Camunda Extensions

The following extensions are supported for `escalationEventDefinition`.

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#escalationcodevariable" >}}">camunda:escalationCodeVariable</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>&ndash;</td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>&ndash;</td>
  </tr>
</table>


# Throwing Escalation Events

## Escalation Intermediate Throw Event

{{< bpmn-symbol type="escalation-intermediate-throw-event" >}}

When process execution arrives at an escalation intermediate throw event, a named escalation is thrown. This escalation can be caught by an escalation boundary event or an event sub-process with an escalation start event which has the same or none escalation code.

<div data-bpmn-diagram="../bpmn/escalation-intermediate-throw-event"></div>

Like an error event, an escalation event is propagated to upper scopes (e.g., from sub-process or call activity) till it is caught. In case no boundary event or event sub-process caught the event, the execution just continues with normal flow. If the escalation is propagated to an upper scope via call activity then the defined output variables of the call activity are passed to the upper scope.

```xml
<intermediateThrowEvent id="throwEscalation" name="order shipped">
  <escalationEventDefinition escalationRef="orderShipped" />
</intermediateThrowEvent>
```

## Escalation End Event

{{< bpmn-symbol type="escalation-end-event" >}}

When process execution arrives at an escalation end event, the current path of execution is ended and a named escalation is thrown. It has the same behavior as an [escalation intermediate throw event]({{< relref "#escalation-intermediate-throw-event" >}}).

<div data-bpmn-diagram="../bpmn/escalation-end-event"></div>

```xml
<endEvent id="throwEscalation" name="late shipment">
  <escalationEventDefinition escalationRef="lateShipment" />
</endEvent>
```
