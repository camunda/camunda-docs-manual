---

title: 'Decision Task'
weight: 40

menu:
  main:
    identifier: "cmmn-ref-tasks-decision"
    parent: "cmmn-ref-tasks"
    pre: "Allows invoking a DMN 1.1 Decision."

---

A *decision task* can be used to invoke a [DMN 1.1] decision table.

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


# Decision Result

The output of the decision, also called decision result, is not saved as case variable automatically. It has to pass into a case variable by using a [predefined]({{< relref "user-guide/process-engine/decisions/bpmn-cmmn.md#predefined-mapping-of-the-decision-result" >}}) or a [custom]({{< relref "user-guide/process-engine/decisions/bpmn-cmmn.md#custom-mapping-to-case-variables" >}}) mapping of the decision result.

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

See the [User Guide]({{< relref "user-guide/process-engine/decisions/bpmn-cmmn.md#the-decision-result" >}}) for details about the mapping.

{{< note title="Name of the Result Variable" class="warning" >}}
The result variable should not have the name `decisionResult` since the decision result itself is saved in a variable with this name. Otherwise an exception is thrown while saving the result variable.
{{< /note >}}


# Limitations of the Decision Task

To evaluate a referenced decision, the integration of the Camunda DMN engine is used. As a result, only [DMN 1.1] decision tables can be evaluated with a decision task. There is no option to integrate with other rule engines.


# Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-attributes.md#decisionbinding" >}}">camunda:decisionBinding</a>,
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-attributes.md#decisionversion" >}}">camunda:decisionVersion</a>,
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-attributes.md#mapdecisionresult" >}}">camunda:mapDecisionResult</a>,
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-attributes.md#resultvariable" >}}">camunda:resultVariable</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-elements.md#caseexecutionlistener" >}}">camunda:caseExecutionListener</a>,
      <a href="{{< relref "reference/cmmn11/custom-extensions/camunda-elements.md#variablelistener" >}}">camunda:variableListener</a>
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

[DMN 1.1]: {{< relref "reference/dmn11/index.md" >}}
