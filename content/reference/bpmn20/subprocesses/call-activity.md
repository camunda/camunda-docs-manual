---

title: 'Call Activity'
weight: 20

menu:
  main:
    identifier: "bpmn-subprocess-call-activity"
    parent: "bpmn-subprocess"
    pre: "Call a process from another process."

---

BPMN 2.0 makes a distinction between an embedded subprocess and a call activity. From a conceptual point of view, both will call a subprocess when process execution arrives at the activity.

The difference is that the call activity references a process that is external to the process definition, whereas the subprocess is embedded within the original process definition. The main use case for the call activity is to have a reusable process definition that can be called from multiple other process definitions. Although not yet part of the BPMN specification, it is also possible to call a CMMN case definition.

When process execution arrives at the call activity, a new process instance is created, which is used to execute the subprocess, potentially creating parallel child executions as within a regular process. The main process instance waits until the subprocess is completely ended, and continues the original process afterwards.

<div data-bpmn-diagram="../bpmn/call-activity"></div>

A call activity is visualized the same way as a collapsed embedded subprocess, however with a thick border. Depending on the modeling tool, a call activity can also be expanded, but the default visualization is the collapsed representation.

A call activity is a regular activity that requires a calledElement which references a process definition by its key. In practice, this means that the id of the process is used in the calledElement:

```xml
<callActivity id="callCheckCreditProcess" name="Check credit" calledElement="checkCreditProcess" />
```

Note that the process definition of the subprocess is resolved at runtime. This means that the subprocess can be deployed independently from the calling process, if needed.


# CalledElement Binding

In a call activity the `calledElement` attribute contains the process definition key as reference to the subprocess. This means that the latest process definition version of the subprocess is always called.
To call another version of the subprocess it is possible to define the attributes `calledElementBinding` and `calledElementVersion` in the call activity. Both attributes are optional.

CalledElementBinding has three different values:

*   latest: always call the latest process definition version (which is also the default behaviour if the attribute isn't defined)
* 	deployment: if called process definition is part of the same deployment as the calling process definition, use the version from deployment
*   version: call a fixed version of the process definition, in this case `calledElementVersion` is required. The version number can either be
    specified in the BPMN XML or returned by an expression (see [custom extensions]({{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#calledelementversion" >}}))

```xml
<callActivity id="callSubProcess" calledElement="checkCreditProcess"
  camunda:calledElementBinding="latest|deployment|version"
  camunda:calledElementVersion="17">
</callActivity>
```


# Passing Variables

You can pass process variables to the subprocess and vice versa. The data is copied into the subprocess when it is started and copied back into the main process when it ends.

```xml
<callActivity id="callSubProcess" calledElement="checkCreditProcess" >
  <extensionElements>
    <camunda:in source="someVariableInMainProcess" target="nameOfVariableInSubProcess" />
    <camunda:out source="someVariableInSubProcss" target="nameOfVariableInMainProcess" />
  </extensionElements>
</callActivity>
```

By default, variables declared in `out` elements are set in the highest possible variable scope.

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
    <camunda:out sourceExpression="${y+5}" target="z" />
  </extensionElements>
</callActivity>
```

So in the end `z = y+5 = x+5+5` holds.

Source expressions are evaluated in the context of the called process instance. That means, in cases where calling and called process definitions belong to different process applications, context like Java classes, Spring or CDI beans is resolved from the process application the called process definition belongs to.

## Combination with Input/Output parameters

Call activities can be combined with [Input/Output parameters]({{< relref "user-guide/process-engine/variables.md#input-output-variable-mapping" >}}) as well. This allows for an even more flexible mapping of variables into the called process. In order to only map variables that are declared in the `inputOutput` mapping, the attribute `local` can be used. Consider the following XML:

```xml
<callActivity id="callSubProcess" calledElement="checkCreditProcess" >
  <extensionElements>
    <!-- Input/Output parameters -->
    <camunda:inputOutput>
      <camunda:inputParameter name="var1">
        <camunda:script scriptFormat="groovy">
          <![CDATA[
            sum = a + b + c
          ]]>
        </camunda:script>
      </camunda:inputParameter>
      <camunda:inputParameter name="var2"></camunda:inputParameter>
    </camunda:inputOutput>

    <!-- Mapping to called instance -->
    <camunda:in variables="all" local="true" />
  </extensionElements>
</callActivity>
```

Setting `local="true"` means that all local variables of the execution executing the call activity are mapped into the called process instance. These are exactly the variables that are declared as input parameters.

The same can be done with output parameters:

```xml
<callActivity id="callSubProcess" calledElement="checkCreditProcess" >
  <extensionElements>
    <!-- Input/Output parameters -->
    <camunda:inputOutput>
      <camunda:outputParameter name="var1">
        <camunda:script scriptFormat="groovy">
          <![CDATA[
            sum = a + b + c
          ]]>
        </camunda:script>
      </camunda:outputParameter>
      <camunda:outputParameter name="var2"></camunda:outputParameter>
    </camunda:inputOutput>

    <!-- Mapping from called instance -->
    <camunda:out variables="all" local="true" />
  </extensionElements>
</callActivity>
```

When the called process instance ends, due to `local="true"` in the `camunda:out` parameter all variables are mapped to local variables of the execution executing the call activity. These variables can be mapped to process instance variables by using an output mapping. Any variable that is not declared by a `camunda:outputParameter` element will not be available anymore after the call activity ends.

# Passing Business Key

You can pass the business key to the subprocess. The data is copied into the subprocess when it is started. You can not give back the business key to the parent process because the business key is not changeable.

```xml
<callActivity id="callSubProcess" calledElement="checkCreditProcess" >
  <extensionElements>
    <camunda:in businessKey="#{execution.processBusinessKey}" />
  </extensionElements>
</callActivity>
```


# Example

The following process diagram shows a simple handling of an order. Since, for example, the billing could be common to many other processes, it is modeled as a call activity.

<div data-bpmn-diagram="../bpmn/call-activity"></div>

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

# Create a Case Instance

A call activity can also be used to create a new CMMN case instance as a subordinate of the corresponding process instance. The call activity completes as soon as the created case instance reaches the state `COMPLETED` for the first time. In contrast to calling a BPMN process, the attribute `caseRef` instead of the attribute `calledElement` must be used to reference a case definition by its key. This means that the latest case definition version is always called.

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

# Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#asyncbefore" >}}">camunda:asyncBefore</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#asyncafter" >}}">camunda:asyncAfter</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#calledelementbinding" >}}">camunda:calledElementBinding</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#calledelementversion" >}}">camunda:calledElementVersion</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#casebinding" >}}">camunda:caseBinding</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#caseref" >}}">camunda:caseRef</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#caseversion" >}}">camunda:caseVersion</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#exclusive" >}}">camunda:exclusive</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#jobpriority" >}}">camunda:jobPriority</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#in" >}}">camunda:in</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#out" >}}">camunda:out</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#failedjobretrytimecycle" >}}">camunda:failedJobRetryTimeCycle</a>
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

# Additional Resources

*   [Call Activity](http://camunda.org/bpmn/reference.html#activities-call-activity) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)

