---

title: 'Call Activity'
weight: 20

menu:
  main:
    identifier: "bpmn-subprocess-call-activity"
    parent: "bpmn-subprocess"

---


BPMN 2.0 makes a distinction between an embedded subprocess and a call activity. From a conceptual point of view, both will call a subprocess when process execution arrives at the activity.

The difference is that the call activity references a process that is external to the process definition, whereas the subprocess is embedded within the original process definition. The main use case for the call activity is to have a reusable process definition that can be called from multiple other process definitions. Although not yet part of the BPMN specification, it is also possible to call a CMMN case definition.

When process execution arrives at the call activity, a new process instance is created, which is used to execute the subprocess, potentially creating parallel child executions as within a regular process. The main process instance waits until the subprocess is completely ended, and continues the original process afterwards.

<div data-bpmn-diagram="implement/call-activity"></div>

A call activity is visualized the same way as a collapsed embedded subprocess, however with a thick border. Depending on the modeling tool, a call activity can also be expanded, but the default visualization is the collapsed representation.

A call activity is a regular activity that requires a calledElement which references a process definition by its key. In practice, this means that the id of the process is used in the calledElement:

```xml
<callActivity id="callCheckCreditProcess" name="Check credit" calledElement="checkCreditProcess" />
```

Note that the process definition of the subprocess is resolved at runtime. This means that the subprocess can be deployed independently from the calling process, if needed.


## CalledElement Binding

In a call activity the `calledElement` attribute contains the process definition key as reference to the subprocess. This means that the latest process definition version of the subprocess is always called.
To call another version of the subprocess it is possible to define the attributes `calledElementBinding` and `calledElementVersion` in the call activity. Both attributes are optional.

CalledElementBinding has three different values:

*   latest: always call the latest process definition version (which is also the default behaviour if the attribute isn't defined)
* 	deployment: if called process definition is part of the same deployment as the calling process definition, use the version from deployment
*   version: call a fixed version of the process definition, in this case `calledElementVersion` is required. The version number can either be
    specified in the BPMN XML or returned by an expression (see [custom extensions](ref:#custom-extensions-camunda-extension-attributes-camundacalledelementversion))

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

Furthermore, you can configure the call activity so that all process variables are passed to the subprocess and vice versa. The process variables have the same name in the main process as in the subprocess.

```xml
<callActivity id="callSubProcess" calledElement="checkCreditProcess" >
  <extensionElements>
    <camunda:in variables="all" />
    <camunda:out variables="all" />
  </extensionElements>
</callActivity>
```

It is possible to use expressions here as well:

```xml
<callActivity id="callSubProcess" calledElement="checkCreditProcess" >
  <extensionElements>
    <camunda:in sourceExpression="${x+5}" target="y" />
    <camunda:out source="${y+5}" target="z" />
  </extensionElements>
</callActivity>
```

So, in the end `z = y+5 = x+5+5`


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

The following process diagram shows a simple handling of an order. Since, for example, the billing could be common to many other processes, it is modeled as a call activity.

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

There is nothing special about the process definition of the subprocess. It could also be used without being called from another process.

## Create a Case Instance

A call activity can also be used to create a new CMMN case instance as a subordinate of the corresponding process instance. The call activity completes as soon as the created case instance reaches the state [COMPLETED](ref:/api-references/cmmn10/#concepts-plan-item-lifecycles-case-instance-lifecycle) for the first time. In contrast to calling a BPMN process, the attribute `caseRef` instead of the attribute `calledElement` must be used to reference a case definition by its key. This means that the latest case definition version is always called.

To call another version of a case definition it is possible to define the attributes `caseBinding` and `caseVersion` in the call activity. Both attributes are optional.

CaseBinding has three different values:

*   latest: always call the latest case definition version (which is also the default behaviour if the attribute isn't defined)
*   deployment: if called case  definition is part of the same deployment as the calling process definition, use the version from deployment
*   version: call a fixed version of the case definition, in this case `caseVersion` is required

```xml
<callActivity id="callSubProcess" camunda:caseRef="checkCreditCase"
  camunda:caseBinding="latest|deployment|version"
  camunda:caseVersion="17">
</callActivity>
```

## camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaasyncbefore">camunda:asyncBefore</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaasyncafter">camunda:asyncAfter</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundacalledelementbinding">camunda:calledElementBinding</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundacalledelementversion">camunda:calledElementVersion</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundacasebinding">camunda:caseBinding</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundacaseref">camunda:caseRef</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundacaseversion">camunda:caseVersion</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaexclusive">camunda:exclusive</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundajobpriority">camunda:jobPriority</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-elements-camundain">camunda:in</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaout">camunda:out</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundafailedjobretrytimecycle">camunda:failedJobRetryTimeCycle</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      The <code>camunda:exclusive</code> attribute is only evaluated if the attribute
      <code>camunda:asyncBefore</code> or <code>camunda:asyncAfter</code> is set to <code>true</code>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attribute <code>camunda:calledElementVersion</code> should only be set if
      the attribute <code>camunda:calledElementBinding</code> equals <code>version</code>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attribute <code>calledElement</code> cannot be used in combination
      with the attribute <code>camunda:caseRef</code> and vice versa.
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attribute <code>camunda:caseVersion</code> should only be set if
      the attribute <code>camunda:caseBinding</code> equals <code>version</code>
    </td>
  </tr>
</table>

## Additional Resources

*   [Call Activity](http://camunda.org/bpmn/reference.html#activities-call-activity) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)

