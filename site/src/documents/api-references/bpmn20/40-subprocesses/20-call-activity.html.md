---

title: 'Call Activity'
category: 'Subprocesses'

keywords: 'call activity businesskey variables pass'

---


BPMN 2.0 makes a distinction between an embedded subprocess and the call activity. From a conceptual point of view, both will call a subprocess when process execution arrives at the activity.

The difference is that the call activity references a process that is external to the process definition, whereas the subprocess is embedded within the original process definition. The main use case for the call activity is to have a reusable process definition that can be called from multiple other process definitions.

When process execution arrives in the call activity, a new process instance is created, which is  used to execute the subprocess, potentially creating parallel child execution as within a regular process. The super process instance  waits until the subprocess is completely ended, and continues the original process afterwards.

<div data-bpmn-diagram="implement/call-activity"></div>

A call activity is visualized the same as a collapsed embedded subprocess, however with a thick border. Depending on the modeling tool, a call activity can also be expanded, but the default visualization is the collapsed representation.

A call activity is a regular activity, that requires a calledElement that references a process definition by its key. In practice, this means that the id of the process is used in the calledElement:

```xml
<callActivity id="callCheckCreditProcess" name="Check credit" calledElement="checkCreditProcess" />    
```

Note that the process definition of the subprocess is resolved at runtime. This means that the subprocess can be deployed independently from the calling process, if needed.


## CalledElement Binding

In a call activity contains the calledElement attribute the process definition key as reference to the subprocess. This means that always the latest process definition version of the subprocess is called.
To call another version of the subprocess it is possible to define the attribute calledElementBinding and calledElementVersion in the call activity. Both attributes are optional.

CalledElementBinding has three different values:

*   latest: always call latest process definition version (the same behaviour without this attribute)
* 	deployment: if called process definition is part of the same deployment as the calling process definition use version from deployment
*   version: call fix version of process definition, calledElementVersion is required

```xml
<callActivity id="callSubProcess" calledElement="checkCreditProcess"
  camunda:calledElementBinding="latest|deployment|version"
  camunda:calledElementVersion="17">
</callActivity>
```


## Passing variables

You can pass process variables to the subprocess and vice versa. The data is copied into the subprocess when it is started and copied back into the main process when it ends.

```xml
<callActivity id="callSubProcess" calledElement="checkCreditProcess" >
  <extensionElements>
    <camunda:in source="someVariableInMainProcess" target="nameOfVariableInSubProcess" />
    <camunda:out source="someVariableInSubProcss" target="nameOfVariableInMainProcess" />
  </extensionElements>
</callActivity>
```

Furthermore, you can configure the call activity, that all process variables are passed to the subprocess and vice versa. The process variables have the same name in the parent process as in the subprocess.

```xml
<callActivity id="callSubProcess" calledElement="checkCreditProcess" >
  <extensionElements>
    <camunda:in variables="all" />
    <camunda:out variables="all" />
  </extensionElements>
</callActivity>
```

We use a Custom Extension as a shortcut for the BPMN standard elements called dataInputAssociation and dataOutputAssociation, which only work if you declare process variables in the BPMN 2.0 standard way.

It is possible to use expressions here as well:

```xml
<callActivity id="callSubProcess" calledElement="checkCreditProcess" >
  <extensionElements>
    <camunda:in sourceExpression="${x+5}" target="y" />
    <camunda:out source="${y+5}" target="z" />
  </extensionElements>
</callActivity>
```

So in the end `z = y+5 = x+5+5`


## Passing Business Key

You can pass the business key to the subprocess. The data is copied into the subprocess when it is started. You can not give back the business key to the parent process because the business key is not changeable.

```xml
<callActivity id="callSubProcess" calledElement="checkCreditProcess" >
  <extensionElements>
    <camunda:in businessKey="#{execution.processBusinessKey}" />
  </extensionElements>
</callActivity>
```


## Example

The following process diagram shows a simple handling of an order. Since for example the billing could be common to many other processes, it is modeled as a call activity.

<div data-bpmn-diagram="implement/call-activity"></div>

The XML looks as follows:

```xml
<startEvent id="theStart" />
<sequenceFlow id="flow1" sourceRef="theStart" targetRef="shipping" />

<callActivity id="shipping" name="Shipping" calledElement="shippingProcess" />
<sequenceFlow id="flow2" sourceRef="shipping" targetRef="billing" />
    
<callActivity id="billing" name="Billing" calledElement="billingProcess" />
<sequenceFlow id="flow3" sourceRef="billing" targetRef="end" />
       
<endEvent id="end" />
```

There is nothing special to the process definition of the subprocess. It could as well be used without being called from another process. 	


## Additional Resources

*   [Call Activity in the BPMN Tutorial](http://camunda.org/design/reference.html#!/activities/callactivity)
*   [Call Activity](http://camunda.org/bpmn/reference.html#activities-call-activity) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)

