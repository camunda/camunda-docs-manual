---

title: 'Case Task'
weight: 30

menu:
  main:
    identifier: "cmmn-ref-tasks-case"
    parent: "cmmn-ref-tasks"
    pre: "Allows invoking another CMMN Case."

---

A *case task* can be used to call another CMMN case.

{{< cmmn-symbol type="case-task" >}}

A case task is a regular task that requires a `caseRef` attribute that references a case definition by its key. Such a case task can be defined as follows:

```xml
<caseTask id="checkCreditCase" name="Check credit" caseRef="checkCreditCase" />
```

The referenced case definition is resolved at runtime. This means that the referenced case can be deployed independently from the calling case, if needed.

A case task in state `ENABLED` can be started manually using the `CaseService` as follows:

```java
caseService.manuallyStartCaseExecution("aCaseExecutionId");
```

When the case task instance becomes `ACTIVE`, a new case instance will be launched. In the above example a new case instance of the case `checkCreditCase` will be created.

If a case task is *blocking* (the attribute `isBlocking` is set to `true`), the case task remains `ACTIVE` until the case instance associated with the case task is completed. When the called case instance reaches the state `COMPLETED` for the first time, the corresponding case task completes automatically. It is not possible to complete a blocking case task manually.

In case of a *non-blocking* (the attribute `isBlocking` is set to `false`) task, the case task does not wait for the case instance to complete, and completes immediately upon its activation and after calling its associated case.

Note: The default value for the attribute `isBlocking` is `true`. To define a non-blocking case task the attribute `isBlocking` must be set to `false` as follows:

```xml
<caseTask id="checkCreditCase" name="Check credit" caseRef="checkCreditCase" isBlocking="false" />
```

# Transactional Behavior

The activation of the case task as well as the creation and execution of the case instance are performed in the same transaction.

# Case Binding

By default, the case task always creates a new case instance of the latest case definition with the specified key. In order to specify a different version of a case, it is possible to define a binding with the Camunda custom attribute `caseBinding`. The following values are allowed for the attribute `caseBinding`:

* `latest`: use the latest case definition version (which is also the default behavior if the attribute is not defined)
* `deployment`: use the case definition version that is part of the calling case definition's deployment (note: this requires that a case with the specified key is deployed along with the calling case definition)
* `version`: use a fixed version of the case definition, in this case the attribute `caseVersion` is required

The following is an example of a case task that calls the `checkCreditCase` case with version 3.


```xml
<caseTask id="checkCreditCase" caseRef="checkCreditCase"
  camunda:caseBinding="latest|deployment|version"
  camunda:caseVersion="3">
</caseTask>
```

Note: It is also possible to use an expression for the attribute `caseVersion` that must resolve to an integer at runtime.

# Case Tenant Id

When the case task resolves the case definition to be called it must take into account multi tenancy.

## Default Tenant Resolution
By default, the tenant id of the calling case definition is used to resolve the called case definition.
That is, if the calling case definition has no tenant id, then the case task resolves a case definition using the provided key, binding and without a tenant id (tenant id = null).
If the calling case definition has a tenant id, a case definition with the provided key and the same tenant id is resolved.

Note that the tenant id of the calling case instance is not taken into account in the default behavior.

## Explicit Tenant Resolution

In some situations it may be useful to override this default behavior and specify the tenant id explicitly.

The `camunda:caseTenantId` attribute allows to explicitly specify a tenant id:

```xml
<caseTask id="checkCreditCase" caseRef="checkCreditCase"
  camunda:caseTenantId="TENANT_1">
</casetask>
```

If the tenant id is not known at design time, an expression can be used as well:

```xml
<caseTask id="checkCreditCase" caseRef="checkCreditCase"
  camunda:caseTenantId="${ myBean.calculateTenantId(variable) }">
</caseTask>
```

An expression also allows using the tenant id of the calling case instance instead of the calling case definition:

```xml
<caseTask id="checkCreditCase" caseRef="checkCreditCase"
  camunda:caseTenantId="${ execution.tenantId }">
</caseTask>
```

# Exchange Variables

The Camunda custom extensions elements `in` and `out` allow to exchange variables between the case task (in a case instance) and the case instance that it creates: `in` elements of a case task map variables of the calling case to input variables of the launched case instance and `out` mappings of a case task map output variables of the called case instance to variables of the calling case, e.g.,

```xml
<caseTask id="checkCreditCase" name="Check credit" caseRef="checkCreditCase">
  <extensionElements>
    <camunda:in source="aCaseVariable" target="aSubCaseVariable" />
    <camunda:out source="aSubCaseVariable" target="anotherCaseVariable" />
  </extensionElements>
</caseTask>
```

In the above example, the value of the input variable `aCaseVariable` is passed to the newly created case instance. Inside the case instance, the value of the input variable `aCaseVariable` is available as `aSubCaseVariable`. After successful completion of the called case instance, the value of the output variable `aSubCaseVariable` is passed back to the calling case task where it can be accessed by the name `anotherCaseVariable`.

In addition, it is also possible to use expressions:

```xml
<caseTask id="checkCreditCase" name="Check credit" caseRef="checkCreditCase">
  <extensionElements>
    <camunda:in sourceExpression="${x+5}" target="y" />
    <camunda:out sourceExpression="${y+5}" target="z" />
  </extensionElements>
</caseTask>
```

Assuming `y` is not updated by the called case instance, the following holds after the case task completes: `z = y+5 = x+5+5`.

Source expressions are evaluated in the context of the called case instance. That means, in cases where calling and called case definitions belong to different process applications, context like Java classes, Spring or CDI beans are resolved from the process application the called case definition belongs to.

Furthermore, the case task can be configured to pass all variables to the called case instance, and to pass all variables of the case instance back to the associated case task:

```xml
<caseTask id="checkCreditCase" name="Check credit" caseRef="checkCreditCase">
  <extensionElements>
    <camunda:in variables="all" />
    <camunda:out variables="all" />
  </extensionElements>
</caseTask>
```

Note: The variables keeps their names.

It is possible, at runtime, to decide which variables are mapped into the called case instance. This can be declared with the `local` attribute on the `camunda:in` element as follows:

```xml
<caseTask id="checkCreditCase" name="Check credit" caseRef="checkCreditCase">
  <extensionElements>
    <camunda:in variables="all" local="true" />
  </extensionElements>
</caseTask>
```

With this setting, only local variables are going to be mapped. These can be set via the `CaseService` before starting the case instance. Consider the following code to manually start a case task:

```
caseService
  .withCaseExecution(caseTaskExecutionId)
  .setVariable("var1", "abc")
  .setVariableLocal("var2", "def")
  .manualStart();
```

With `local="true"` for the `in` mapping, only `var2` is mapped into the called case instance.


# Pass Business Key

In addition to [exchanging variables]({{< relref "reference/cmmn11/tasks/case-task.md#exchange-variables" >}}), it is possible to pass a business key to the called case instance as well. Since a business key is immutable, this is one way mapping. It is not possible to have output mapping for a business key.

The following example shows how the business key of the calling case instance can be passed to the called case instance. In this case, the calling case instance and the called case instance end up with the same business key.

```xml
<caseTask id="checkCreditCase" name="Check credit" caseRef="checkCreditCase">
  <extensionElements>
    <camunda:in businessKey="#{caseExecution.caseBusinessKey}" />
  </extensionElements>
</caseTask>
```

If the business key of the called case instance should be different from the business key of the calling case instance, it is possible to use an expression that, for example, references a variable:

```xml
<caseTask id="checkCreditCase" name="Check credit" caseRef="checkCreditCase">
  <extensionElements>
    <camunda:in businessKey="#{customerId}" />
  </extensionElements>
</caseTask>
```

# Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-attributes.md#casebinding" >}}">camunda:caseBinding</a>,
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-attributes.md#casetenantid" >}}">camunda:caseTenantId</a>,
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-attributes.md#caseversion" >}}">camunda:caseVersion</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-elements.md#in" >}}">camunda:in</a>,
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-elements.md#out" >}}">camunda:out</a>,
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-elements.md#caseexecutionlistener" >}}">camunda:caseExecutionListener</a>,
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-elements.md#variablelistener" >}}">camunda:variableListener</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      The attribute <code>camunda:caseVersion</code> should only be set if
      the attribute <code>camunda:caseBinding</code> equals <code>version</code>
    </td>
  </tr>
</table>
