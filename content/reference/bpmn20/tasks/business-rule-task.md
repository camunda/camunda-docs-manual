---

title: 'Business Rule Task'
weight: 40

menu:
  main:
    identifier: "bpmn-ref-tasks-business-rule-task"
    parent: "bpmn-ref-tasks"
    pre: "Execute an automated business decision."

---

A Business Rule Task is used to synchronously execute one or more rules.

{{< bpmn-symbol type="business-rule-task" >}}


# Using Camunda DMN Engine

You can use the Camunda DMN engine integration to evaluate a DMN decision. You have
to specify the decision key to evaluate as the `camunda:decisionRef` attribute. Additionally, 
the `camunda:decisionRefBinding` specifies which version of the decision should be evaluated.
Valid values are:
* `deployment`, which evaluates the decision version which was deployed with the process
version,
* `latest` which will always evaluate the latest decision version,
* `version` which allows you to specify a specific version to execute with the `camunda:decisionRefVersion` attribute, and
* `versionTag` which allows you to specify a specific version tag to execute with the `camunda:decisionRefVersionTag` attribute.

```xml
<businessRuleTask id="businessRuleTask"
    camunda:decisionRef="myDecision"
    camunda:decisionRefBinding="version"
    camunda:decisionRefVersion="12" />
```

The `camunda:decisionRefBinding` attribute defaults to `latest`.

```xml
<businessRuleTask id="businessRuleTask"
    camunda:decisionRef="myDecision" />
```

The attributes `camunda:decisionRef`, `camunda:decisionRefVersion`, and `camunda:decisionRefVersionTag` can be specified as
an expression which will be evaluated on execution of the task.

```xml
<businessRuleTask id="businessRuleTask"
    camunda:decisionRef="${decisionKey}"
    camunda:decisionRefBinding="version"
    camunda:decisionRefVersionTag="${decisionVersionTag}" />
```

The output of the decision, also called decision result, is not saved as process variable automatically. It has to pass into a process variable by using a [predefined]({{< relref "user-guide/process-engine/decisions/bpmn-cmmn.md#predefined-mapping-of-the-decision-result" >}}) or a [custom]({{< relref "user-guide/process-engine/decisions/bpmn-cmmn.md#custom-mapping-into-process-variables" >}}) mapping of the decision result.

In case of a predefined mapping, the `camunda:mapDecisionResult` attribute references the mapper to use. The result of the mapping is saved in the variable which is specified by the `camunda:resultVariable` attribute. If no predefined mapper is set then the `resultList` mapper is used by default.

```xml
<businessRuleTask id="businessRuleTask"
    camunda:decisionRef="myDecision"
    camunda:mapDecisionResult="singleEntry"
    camunda:resultVariable="result" />
```

See the [User Guide]({{< relref "user-guide/process-engine/decisions/bpmn-cmmn.md#the-decision-result" >}}) for details about the mapping.

{{< note title="Name of the Result Variable" class="warning" >}}
The result variable should not have the name `decisionResult`, as the decision result itself is saved in a variable with this name. Otherwise, an exception is thrown while saving the result variable.
{{< /note >}}

# DecisionRef Tenant Id

When the Business Rule Task resolves the decision definition to be evaluated it must take multi tenancy into account.

## Default Tenant Resolution
By default, the tenant id of the calling process definition is used to evaluate the decision definition.
That is, if the calling process definition has no tenant id, then the Business Rule Task evaluates a decision definition using the provided key, binding and without a tenant id (tenant id = null).
If the calling process definition has a tenant id, a decision definition with the provided key and the same tenant id is evaluated.

Note that the tenant id of the calling process instance is not taken into account in the default behavior.

## Explicit Tenant Resolution

In some situations it may be useful to override this default behavior and specify the tenant id explicitly.

The `camunda:decisionRefTenantId` attribute allows to explicitly specify a tenant id:

```xml
<businessRuleTask id="businessRuleTask" decisionRef="myDecision"
  camunda:decisionRefTenantId="TENANT_1">
</businessRuleTask>
```

If the tenant id is not known at design time, an expression can be used as well:

```xml
<businessRuleTask id="businessRuleTask" decisionRef="myDecision"
  camunda:decisionRefTenantId="${ myBean.calculateTenantId(variable) }">
</businessRuleTask>
```

An expression also allows using the tenant id of the calling process instance instead of the calling process definition:

```xml
<businessRuleTask id="businessRuleTask" decisionRef="myDecision"
  camunda:decisionRefTenantId="${ execution.tenantId }">
</businessRuleTask>
```

# Using a Custom Rule Engine

You can integrate with other rule engines. To do so, you have to plug in your
implementation of the rule task the same way as in a Service Task.

```xml
<businessRuleTask id="businessRuleTask"
    camunda:delegateExpression="${MyRuleServiceDelegate}" />
```


# Using Delegate Code

Alternatively, a Business Rule Task can be implemented using Java Delegation just as a Service Task. For more
information on this please see the [Service Tasks]({{< relref "service-task.md" >}}) documentation.


# Implementing as an External Task

In addition to the above, a Business Rule Task can be implemented via the [External Task]({{< relref "user-guide/process-engine/external-tasks.md" >}}) mechanism where an external system polls the process engine for work to do. See the section on [Service Tasks](({{< relref "service-task.md#external-tasks" >}}) for more information about how to configure an external task.


# Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#asyncbefore" >}}">camunda:asyncBefore</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#asyncafter" >}}">camunda:asyncAfter</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#class" >}}">camunda:class</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#decisionref" >}}">camunda:decisionRef</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#decisionrefbinding" >}}">camunda:decisionRefBinding</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#decisionreftenantid" >}}">camunda:decisionRefTenantId</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#decisionrefversion" >}}">camunda:decisionRefVersion</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#decisionrefversiontag" >}}">camunda:decisionRefVersionTag</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#delegateexpression" >}}">camunda:delegateExpression</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#exclusive" >}}">camunda:exclusive</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#expression" >}}">camunda:expression</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#jobpriority" >}}">camunda:jobPriority</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#mapdecisionresult" >}}">camunda:mapDecisionResult</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#resultvariable" >}}">camunda:resultVariable</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#topic" >}}">camunda:topic</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#type" >}}">camunda:type</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#taskpriority" >}}">camunda:taskPriority</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#failedjobretrytimecycle" >}}">camunda:failedJobRetryTimeCycle</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#field" >}}">camunda:field</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#connector" >}}">camunda:connector</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#inputoutput" >}}">camunda:inputOutput</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      One of the attributes <code>camunda:class</code>, <code>camunda:delegateExpression</code>, <code>camunda:decisionRef</code>,
      <code>camunda:type</code> or <code>camunda:expression</code> is mandatory
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attribute <code>camunda:resultVariable</code> can only be used in combination with the
      <code>camunda:decisionRef</code> or <code>camunda:expression</code> attribute
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The <code>camunda:exclusive</code> attribute is only evaluated if the attribute
      <code>camunda:asyncBefore</code> or <code>camunda:asyncAfter</code> is set to <code>true</code>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attribute <code>camunda:topic</code> can only be used when the <code>camunda:type</code> attribute is set to <code>external</code>.
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attribute <code>camunda:taskPriority</code> can only be used when the <code>camunda:type</code> attribute is set to <code>external</code>.
    </td>
  </tr>
</table>


# Additional Resources

* [Decisions]({{< relref "user-guide/process-engine/decisions/index.md" >}})
* [Service Tasks]({{< relref "reference/bpmn20/tasks/service-task.md" >}})
* [Tasks](http://camunda.org/bpmn/reference.html#activities-task) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)
* [Demo using Drools on the Business Rule Task](https://github.com/camunda/camunda-consulting/tree/master/one-time-examples/order-confirmation-rules)
