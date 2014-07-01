---

title: 'Business Rule Task'
category: 'Tasks'

keywords: 'service task business rule'

---

A Business Rule task is used to synchronously execute one or more rules.

<div data-bpmn-symbol="businessruletask" data-bpmn-symbol-name="Businss Rule Task"></div>

You can use the rule engine of your choice, on the open source side we have made good experiences with JBoss Drools. To do so, you have to plug in your implementation of the rule task the same way as in a Service Task. So the only difference is that it has a different icon in the BPMN process model - but this can make already a huge difference for acceptance of the process model.

```xml
<businessRuleTask id="businessRuleTask" camunda:delegateExpression="${MyRuleServiceDelegate}" />
```

## camunda Extensions

<table class="table table-striped">
  <tr>
    <th>Attributes</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaasyncbefore">camunda:asyncBefore</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaasyncafter">camunda:asyncAfter</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaclass">camunda:class</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundadelegateexpression">camunda:delegateExpression</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaexclusive">camunda:exclusive</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaexpression">camunda:expression</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundaresultvariable">camunda:resultVariable</a>,
      <a href="ref:#custom-extensions-camunda-extension-attributes-camundatype">camunda:type</a>
    </td>
  </tr>
  <tr>
    <th>Extension Elements</th>
    <td>
      <a href="ref:#custom-extensions-camunda-extension-elements-camundafailedjobretrytimecycle">camunda:failedJobRetryTimeCycle</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundafield">camunda:field</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundaconnector">camunda:connector</a>,
      <a href="ref:#custom-extensions-camunda-extension-elements-camundainputoutput">camunda:inputOutput</a>
    </td>
  </tr>
  <tr>
    <th>Constraints</th>
    <td>
      One of the attributes <code>camunda:class</code>, <code>camunda:delegateExpression</code>,
      <code>camunda:type</code> or <code>camunda:expression</code> is mandatory
    </td>
  </tr>
  <tr>
    <td></td>
    <td>
      The attribute <code>camunda:resultVariable</code> can only be used in combination with the
      <code>camunda:expression</code> attribute
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

## Additional Resources

* [Service Tasks](ref:/api-references/bpmn20/#tasks-service-task)
* [Tasks](http://camunda.org/bpmn/reference.html#activities-task) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)
* [Demo using Drools on the Business Rule Task](https://github.com/camunda/camunda-consulting/tree/master/showcases/order-confirmation-rules)
