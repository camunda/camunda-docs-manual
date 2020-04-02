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
To call another version of the subprocess it is possible to define the attributes `calledElementBinding`, `calledElementVersion`, and `calledElementVersionTag` in the call activity. These attributes are optional.

CalledElementBinding has four different values:

* latest: always call the latest process definition version (which is also the default behaviour if the attribute isn't defined)
* deployment: if called process definition is part of the same deployment as the calling process definition, use the version from deployment
* version: call a fixed version of the process definition, in this case `calledElementVersion` is required. The version number can either be specified in the BPMN XML or returned by an expression (see [custom extensions]({{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#calledelementversion" >}}))
* versionTag: call a fixed version tag of the process definition, in this case `calledElementVersionTag` is required. The version tag can either be specified in the BPMN XML or returned by an expression (see [custom extensions]({{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#calledelementversiontag" >}}))

```xml
<callActivity id="callSubProcess" calledElement="checkCreditProcess"
  camunda:calledElementBinding="latest|deployment|version"
  camunda:calledElementVersion="17">
</callActivity>
```
or
```xml
<callActivity id="callSubProcess" calledElement="checkCreditProcess"
  camunda:calledElementBinding="versionTag"
  camunda:calledElementVersionTag="ver-tag-1.0.1">
</callActivity>
```

# CalledElement Tenant Id

When the call activity resolves the process definition to be called it must take multi tenancy into account.

## Default Tenant Resolution
By default, the tenant id of the calling process definition is used to resolve the called process definition.
That is, if the calling process definition has no tenant id, then the call activity resolves a process definition using the provided key, binding and without a tenant id (tenant id = null).
If the calling process definition has a tenant id, a process definition with the provided key and the same tenant id is resolved.

Note that the tenant id of the calling process instance is not taken into account in the default behavior.

## Explicit Tenant Resolution

In some situations it may be useful to override this default behavior and specify the tenant id explicitly.

The `camunda:calledElementTenantId` attribute allows to explicitly specify a tenant id:

```xml
<callActivity id="callSubProcess" calledElement="checkCreditProcess"
  camunda:calledElementTenantId="TENANT_1">
</callActivity>
```

If the tenant id is not known at design time, an expression can be used as well:

```xml
<callActivity id="callSubProcess" calledElement="checkCreditProcess"
  camunda:calledElementTenantId="${ myBean.calculateTenantId(variable) }">
</callActivity>
```

An expression also allows using the tenant id of the calling process instance instead of the calling process definition:

```xml
<callActivity id="callSubProcess" calledElement="checkCreditProcess"
  camunda:calledElementTenantId="${ execution.tenantId }">
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

## Variable Output on BPMN Error Event

When a BPMN error event from a called process instance is caught in the calling process instance, the output variable mappings are executed as well. Depending on the BPMN models, this requires output parameters to tolerate `null` values for variables that do not exist in the called instance when the error is propagated.

## Combination with Input/Output parameters

Call activities can be combined with [Input/Output parameters]({{< ref "/user-guide/process-engine/variables.md#input-output-variable-mapping" >}}) as well. This allows for an even more flexible mapping of variables into the called process. In order to only map variables that are declared in the `inputOutput` mapping, the attribute `local` can be used. Consider the following XML:

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


## Delegation of Variable Mapping

The mapping of input and output variables can also be delegated. This means the passing of input or/and output variables can be done in Java code.
For this the [Delegate Variable Mapping]({{< ref "/user-guide/process-engine/delegation-code.md#delegate-variable-mapping" >}}) interface must be implemented.

There are two possible ways to use delegation for variable mapping.

### Delegate Variable Mapping via Reference

The first one is to set the Camunda extension property `variableMappingClass` and reference the implementation of the `DelegateVariableMapping` interface via the whole class name.


```xml
 <process id="callSimpleSubProcess">

    <startEvent id="theStart" />

    <sequenceFlow id="flow1" sourceRef="theStart" targetRef="callSubProcess" />

    <callActivity id="callSubProcess" calledElement="simpleSubProcess" camunda:variableMappingClass="org.camunda.bpm.example.bpm.callactivity.DelegatedVarMapping"/>

    <sequenceFlow id="flow3" sourceRef="callSubProcess" targetRef="taskAfterSubProcess" />

    <userTask id="taskAfterSubProcess" name="Task after subprocess" />

    <sequenceFlow id="flow4" sourceRef="taskAfterSubProcess" targetRef="theEnd" />

    <endEvent id="theEnd" />

  </process>
```

### Delegate Variable Mapping via Expression

The second one is to set the Camunda extension property `variableMappingDelegateExpression` with an expression.
This allows to specify an expression that resolves to an object implementing the `DelegateVariableMapping` interface.

```xml
  <process id="callSimpleSubProcess">

    <startEvent id="theStart" />

    <sequenceFlow id="flow1" sourceRef="theStart" targetRef="callSubProcess" />

    <callActivity id="callSubProcess" calledElement="simpleSubProcess" camunda:variableMappingDelegateExpression="${expr}"/>
    
    <sequenceFlow id="flow3" sourceRef="callSubProcess" targetRef="taskAfterSubProcess" />

    <userTask id="taskAfterSubProcess" name="Task after subprocess" />

    <sequenceFlow id="flow4" sourceRef="taskAfterSubProcess" targetRef="theEnd" />

    <endEvent id="theEnd" />

  </process>
```
See [Delegate Variable Mapping]({{< ref "/user-guide/process-engine/delegation-code.md#delegate-variable-mapping" >}}) for further information of implementing the interface.

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

## Case Binding

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

## Case Tenant Id

The call activity must take multi tenancy into account when resolving the case definition to be called.

The [default behavior](#default-tenant-resolution) is the same as when resolving BPMN Process Definitions (i.e., the tenant id of the calling process definition is used to resolve the called case definition.)

In order to override the default behavior, the tenant id for resolving the called case definition can be specified explicitly using the `camunda:caseTenantId` attribute:

```xml
<callActivity id="callSubProcess" camunda:caseRef="checkCreditCase"
  camunda:caseTenantId="TENANT_1">
</callActivity>
```

If the tenant id is not known at design time, an expression can be used as well:

```xml
<callActivity id="callSubProcess" camunda:caseRef="checkCreditCase"
  camunda:caseTenantId="${ myBean.calculateTenantId(variable) }">
</callActivity>
```

An expression also allows using the tenant id of the calling process instance instead of the calling process definition:

```xml
<callActivity id="callSubProcess" camunda:caseRef="checkCreditCase"
  camunda:caseTenantId="${ execution.tenantId }">
</callActivity>
```

# Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#asyncbefore" >}}">camunda:asyncBefore</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#asyncafter" >}}">camunda:asyncAfter</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#calledelementbinding" >}}">camunda:calledElementBinding</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#calledelementversion" >}}">camunda:calledElementVersion</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#calledelementversiontag" >}}">camunda:calledElementVersionTag</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#calledelementtenantid" >}}">camunda:calledElementTenantId</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#casebinding" >}}">camunda:caseBinding</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#caseref" >}}">camunda:caseRef</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#caseversion" >}}">camunda:caseVersion</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#casetenantid" >}}">camunda:caseTenantId</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#exclusive" >}}">camunda:exclusive</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#jobpriority" >}}">camunda:jobPriority</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#variablemappingclass" >}}">camunda:variableMappingClass</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#variablemappingdelegateexpression" >}}">camunda:variableMappingDelegateExpression</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#in" >}}">camunda:in</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#out" >}}">camunda:out</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#inputoutput" >}}">camunda:inputOutput</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#failedjobretrytimecycle" >}}">camunda:failedJobRetryTimeCycle</a>
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

