---

title: 'Decision Task'
weight: 40

menu:
  main:
    identifier: "cmmn-ref-tasks-decision"
    parent: "cmmn-ref-tasks"
    pre: "Allows invoking a DMN 1.3 Decision."

---

A *decision task* can be used to invoke a [DMN 1.3] decision from a case.

{{< cmmn-symbol type="decision-task" >}}

A decision task is a regular task that requires a `decisionRef` attribute that references a
decision definition by its key. Such a decision task can be defined as follows:

```xml
<decisionTask id="checkCreditDecision"
              name="Check credit"
              decisionRef="checkCreditDecision" />
```
Instead of the `decisionRef` attribute it is also possible to use an expression which must evaluate
to a key of a decision definition at runtime.

```xml
<decisionTask id="checkCreditDecision" name="Check credit">
  <decisionRefExpression>${resolveToCheckCreditDecision}</decisionRefExpression>
</decisionTask>
```

One of the attributes `decisionRef` or `decisionRefExpression` must be present.

The referenced decision definition is resolved at runtime. This means that the referenced decision can be deployed independently from the calling case, if needed.

A decision task in state `ENABLED` can be started manually using the `CaseService` as follows:

```java
caseService.manuallyStartCaseExecution("aCaseExecutionId");
```

When the decision task instance becomes `ACTIVE`, the referenced decision is evaluated synchronously. As a consequence, the decision task is always executed as `blocking`, because the engine does not distinguish between a `blocking` and a `non-blocking` decision task.


# Transactional Behavior

The activation of the decision task as well as the evaluation of the decision are performed in the same transaction.


# Decision Binding

By default, the decision task always evaluates the latest decision definition with the specified key. To specify a different version of a decision, it is possible to define a binding with the Camunda custom attribute `decisionBinding`. The following values are allowed for the attribute `decisionBinding`:

* `latest`: use the latest decision definition version (which is also the default behavior if the attribute is not defined)
* `deployment`: use the decision definition version that is part of the calling case definition's deployment (note: this requires that a decision with the specified key is deployed along with the calling case definition)
* `version`: use a fixed version of the decision definition, in this case the attribute `decisionVersion` is required

The following is an example of a decision task that calls the `checkCreditDecision` decision with version 3.


```xml
<decisionTask id="checkCreditDecision" decisionRef="checkCreditDecision"
  camunda:decisionBinding="version"
  camunda:decisionVersion="3">
</decisionTask>
```

Note: It is also possible to use an expression for the attribute `decisionVersion` that must resolve to an integer at runtime.

# Decision Tenant Id

When the decision task resolves the decision definition to be evaluated it must take into account multi tenancy.

## Default Tenant Resolution
By default, the tenant id of the calling case definition is used to evaluate the decision definition.
That is, if the calling case definition has no tenant id, then the decision task evaluate a decision definition using the provided key, binding and without a tenant id (tenant id = null).
If the calling case definition has a tenant id, a decision definition with the provided key and the same tenant id is evaluated.

Note that the tenant id of the calling case instance is not taken into account in the default behavior.

## Explicit Tenant Resolution

In some situations it may be useful to override this default behavior and specify the tenant id explicitly.

The `camunda:decisionTenantId` attribute allows to explicitly specify a tenant id:

```xml
<decisionTask id="checkCreditDecision" decisionRef="checkCreditDecision"
  camunda:decisionTenantId="TENANT_1">
</decisionTask>
```

If the tenant id is not known at design time, an expression can be used as well:

```xml
<decisionTask id="checkCreditDecision" decisionRef="checkCreditDecision"
  camunda:decisionTenantId="${ myBean.calculateTenantId(variable) }">
</decisionTask>
```

An expression also allows using the tenant id of the calling case instance instead of the calling case definition:

```xml
<decisionTask id="checkCreditDecision" decisionRef="checkCreditDecision"
  camunda:decisionTenantId="${ caseExecution.tenantId }">
</decisionTask>
```

# Decision Result

The output of the decision, also called decision result, is not saved as case variable automatically. It has to pass into a case variable by using a [predefined]({{< ref "/user-guide/process-engine/decisions/bpmn-cmmn.md#predefined-mapping-of-the-decision-result" >}}) or a [custom]({{< ref "/user-guide/process-engine/decisions/bpmn-cmmn.md#custom-mapping-to-case-variables" >}}) mapping of the decision result.

In case of a predefined mapping, the `camunda:mapDecisionResult` attribute references the mapper to use. The result of the mapping is saved in the variable which is specified by the `camunda:resultVariable` attribute. If no predefined mapper is set then the `resultList` mapper is used by default.

The following example calls the latest version of the `checkCreditDecision` and
maps the `singleEntry` of the decision result into the case variable `result`.
The mapper `singleEntry` assumes that the decision result only contains one
entry or none at all.

```xml
<decisionTask id="checkCreditDecision" decisionRef="checkCreditDecision"
    camunda:mapDecisionResult="singleEntry"
    camunda:resultVariable="result" />
```

See the [User Guide]({{< ref "/user-guide/process-engine/decisions/bpmn-cmmn.md#the-decision-result" >}}) for details about the mapping.

{{< note title="Name of the Result Variable" class="warning" >}}
The result variable should not have the name `decisionResult` since the decision result itself is saved in a variable with this name. Otherwise an exception is thrown while saving the result variable.
{{< /note >}}


# Limitations of the Decision Task

To evaluate a referenced decision, the integration of the Camunda DMN engine is used. As a result, only [DMN 1.3] decisions can be evaluated with a decision task. There is no option to integrate with other rule engines.


# Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< ref "/reference/cmmn11/custom-extensions/camunda-attributes.md#decisionbinding" >}}">camunda:decisionBinding</a>,
            <a href="{{< ref "/reference/cmmn11/custom-extensions/camunda-attributes.md#decisiontenantid" >}}">camunda:decisionTenantId</a>,
      <a href="{{< ref "/reference/cmmn11/custom-extensions/camunda-attributes.md#decisionversion" >}}">camunda:decisionVersion</a>,
      <a href="{{< ref "/reference/cmmn11/custom-extensions/camunda-attributes.md#mapdecisionresult" >}}">camunda:mapDecisionResult</a>,
      <a href="{{< ref "/reference/cmmn11/custom-extensions/camunda-attributes.md#resultvariable" >}}">camunda:resultVariable</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< ref "/reference/cmmn11/custom-extensions/camunda-elements.md#caseexecutionlistener" >}}">camunda:caseExecutionListener</a>,
      <a href="{{< ref "/reference/cmmn11/custom-extensions/camunda-elements.md#variablelistener" >}}">camunda:variableListener</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      The attribute <code>camunda:decisionVersion</code> should only be set if
      the attribute <code>camunda:decisionBinding</code> equals <code>version</code>
    </td>
  </tr>
</table>

[DMN 1.3]: {{< ref "/reference/dmn/_index.md" >}}
