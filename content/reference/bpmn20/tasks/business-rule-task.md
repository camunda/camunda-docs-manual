---

title: 'Business Rule Task'
weight: 40

menu:
  main:
    identifier: "bpmn-ref-tasks-business-rule-task"
    parent: "bpmn-ref-tasks"
    pre: "Execute an automated business decision."

---

A Business Rule task is used to synchronously execute one or more rules.

{{< bpmn-symbol type="business-rule-task" >}}


# Using Camunda DMN Engine

You can use the Camunda DMN engine integration to evaluate a DMN decision table. You have
to specify the decision key to evaluate as the `camunda:decisionRef` attribute. Additionally
the `camunda:decisionRefBinding` specifies which version of the decision should be evaluated.
Valid values are `deployment` which evaluates the decision version which was deployed with the process
version, `latest` which will always evaluate the latest decision version and `version` which
allows you to specify a specific version to execute with the `camunda:decisionRefVersion` attribute.

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

The attributes `camunda:decisionRef` and `camunda:decisionRefVersion` can both be specified as
an expression which will be evaluated on execution of the task.

```xml
<businessRuleTask id="businessRuleTask"
    camunda:decisionRef="${decisionKey}"
    camunda:decisionRefBinding="version"
    camunda:decisionRefVersion="${decisionVersion}" />
```

The output of the decision, also called decision result, is not saved as process variable automatically. It has to pass into a process variable by using a [predefined]({{< ref "/user-guide/process-engine/decisions/bpmn-cmmn.md#predefined-mapping-of-the-decision-result" >}}) or a [custom]({{< ref "/user-guide/process-engine/decisions/bpmn-cmmn.md#custom-mapping-into-process-variables" >}}) mapping of the decision result.

In case of a predefined mapping, the `camunda:mapDecisionResult` attribute references the mapper to use. The result of the mapping is saved in the variable which is specified by the `camunda:resultVariable` attribute. If no predefined mapper is set then the `resultList` mapper is used by default.

```xml
<businessRuleTask id="businessRuleTask"
    camunda:decisionRef="myDecision"
    camunda:mapDecisionResult="singleEntry"
    camunda:resultVariable="result" />
```

See the [User Guide]({{< ref "/user-guide/process-engine/decisions/bpmn-cmmn.md#the-decision-result" >}}) for details about the mapping.

{{< note title="Name of the Result Variable" class="warning" >}}
The result variable should not have the name `decisionResult` since the decision result itself is saved in a variable with this name. Otherwise an exception is thrown while saving the result variable.
{{< /note >}}

# Using a Custom Rule Engine

You can integrate with other Rule Engines. To do so, you have to plug in your
implementation of the rule task the same way as in a Service Task.

```xml
<businessRuleTask id="businessRuleTask"
    camunda:delegateExpression="${MyRuleServiceDelegate}" />
```


# Using Delegate Code

Alternatively a Business Rule Task can be implemented using Java Delegation just as a Service Task. For more
information on this please see the [Service Tasks]({{< relref "service-task.md" >}}) documentation.


# Camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#asyncbefore" >}}">camunda:asyncBefore</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#asyncafter" >}}">camunda:asyncAfter</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#class" >}}">camunda:class</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#decisionref" >}}">camunda:decisionRef</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#decisionrefbinding" >}}">camunda:decisionRefBinding</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#decisionrefversion" >}}">camunda:decisionRefVersion</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#delegateexpression" >}}">camunda:delegateExpression</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#exclusive" >}}">camunda:exclusive</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#expression" >}}">camunda:expression</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#jobpriority" >}}">camunda:jobPriority</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#mapdecisionresult" >}}">camunda:mapDecisionResult</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#resultvariable" >}}">camunda:resultVariable</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-attributes.md#type" >}}">camunda:type</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#failedjobretrytimecycle" >}}">camunda:failedJobRetryTimeCycle</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#field" >}}">camunda:field</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#connector" >}}">camunda:connector</a>,
      <a href="{{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#inputoutput" >}}">camunda:inputOutput</a>
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
</table>


# Additional Resources

* [Decisions]({{< ref "/user-guide/process-engine/decisions/_index.md" >}})
* [Service Tasks]({{< ref "/reference/bpmn20/tasks/service-task.md" >}})
* [Tasks](http://camunda.org/bpmn/reference.html#activities-task) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)
* [Demo using Drools on the Business Rule Task](https://github.com/camunda/camunda-consulting/tree/master/one-time-examples/order-confirmation-rules)
