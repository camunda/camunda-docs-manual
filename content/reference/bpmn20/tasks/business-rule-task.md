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

<div data-bpmn-symbol="businessruletask" data-bpmn-symbol-name="Businss Rule Task"></div>

# Using Camunda DMN engine

You can use the Camunda DMN engine integration to evaluate a DMN decision table. You have
to specify the decision key to evaluate as the `camunda:decisionRef` attribute. Additionally
the `camunda:decisionRefBinding` specifies which version of the decision should be evaluated.
Valid values are `deployment` which evaluates the decision version which was deployed with the process
version, `latest` which will always evaluate the latest decision version and `version` which
allows you to specify a specific version to execute with the `camunda:decisionRefVersion` attribute.

The `camunda:decisionRefBinding` attribute defaults to `latest`.

The output of the decision is saved in a variable which can be specified by the `camunda:resultVariable`
attribute.

```xml
<businessRuleTask id="businessRuleTask"
    camunda:decisionRef="myDecision"
    camunda:resultVariable="decisionResult" />
```

```xml
<businessRuleTask id="businessRuleTask"
    camunda:decisionRef="myDecision"
    camunda:decisionRefBinding="version"
    camunda:decisionRefVersion="12"
    camunda:resultVariable="decisionResult" />
```

The attributes `camunda:decisionRef` and `camunda:decisionRefVersion` can both be specified as
an expression which will be evaluated on execution of the task.

```xml
<businessRuleTask id="businessRuleTask"
    camunda:decisionRef="${decisionKey}"
    camunda:decisionRefBinding="version"
    camunda:decisionRefVersion="${decisionVersion}"
    camunda:resultVariable="decisionResult" />
```

## DMN Result Variable Type

Please beware that depending of the structure of the decision result the result
variable type will change. The following rules are applied to *unpack* the
decision result to be easy accessible in the process:

1. If **only one** rule matches and has **only one** output the result variable will
   contain this output value.
2. If **only one** rule matches and has **more than one** output the result variable
   will be a map of the output values.
3. If **more than one** rule matches but **all** matched rules have **only one** output the
   result variable will be a list of these output values.
4. If **more than one** rule matches and **at least one** matched rule has **more than one** output
   the result variable will be the complete decision result which is a list of
   maps.


# Using a custom rule engine

You can use the rule engine of your choice, on the open source side we have
made good experiences with JBoss Drools. To do so, you have to plug in your
implementation of the rule task the same way as in a Service Task.

```xml
<businessRuleTask id="businessRuleTask"
    camunda:delegateExpression="${MyRuleServiceDelegate}" />
```

# Using Delegate Code

Alternatively a Business Rule Task can be implemented using Java Delegation just as a Service Task. For more
information on this please see the [Service Tasks][] documentation.

# camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-asyncbefore" >}}">camunda:asyncBefore</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-asyncafter" >}}">camunda:asyncAfter</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-class" >}}">camunda:class</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-decisionref" >}}">camunda:decisionRef</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-decisionrefbinding" >}}">camunda:decisionRefBinding</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-decisionrefversion" >}}">camunda:decisionRefVersion</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-delegateexpression" >}}">camunda:delegateExpression</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-exclusive" >}}">camunda:exclusive</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-expression" >}}">camunda:expression</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-jobpriority" >}}">camunda:jobPriority</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-resultvariable" >}}">camunda:resultVariable</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#camunda-type" >}}">camunda:type</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#camunda-failedjobretrytimecycle" >}}">camunda:failedJobRetryTimeCycle</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#camunda-field" >}}">camunda:field</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#camunda-connector" >}}">camunda:connector</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-elements.md#camunda-inputoutput" >}}">camunda:inputOutput</a>
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

* [Service Tasks]({{< relref "reference/bpmn20/tasks/service-task.md" >}}))
* [Tasks](http://camunda.org/bpmn/reference.html#activities-task) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)
* [Demo using Drools on the Business Rule Task](https://github.com/camunda/camunda-consulting/tree/master/showcases/order-confirmation-rules)
