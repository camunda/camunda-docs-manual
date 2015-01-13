---

title: 'Service Task'
category: 'Tasks'

keywords: 'service task implementation field injections results'

---


A service task is used to invoke services. In camunda this is done by calling Java code.

<div data-bpmn-symbol="servicetask" data-bpmn-symbol-name="Service Task"></div>

There are 4 ways of declaring how to invoke Java logic:

* Specifying a class that implements JavaDelegate or ActivityBehavior
* Evaluating an expression that resolves to a delegation object
* Invoking a method expression
* Evaluating a value expression

To specify a class that is called during process execution, the fully qualified classname needs to be provided by the `camunda:class` attribute.

```xml
<serviceTask id="javaService"
             name="My Java Service Task"
             camunda:class="org.camunda.bpm.MyJavaDelegate" />
```

Please refer to the [Java Delegate](ref:/guides/user-guide/#process-engine-delegation-code-java-delegate) section of the [User Guide](ref:/guides/user-guide/) for details on how to implement a Java Delegate.

It is also possible to use an expression that resolves to an object. This object must follow the
same rules as objects that are created when the `camunda:class` attribute is used.

```xml
<serviceTask id="beanService"
             name="My Bean Service Task"
             camunda:delegateExpression="${myDelegateBean}" />
```

Or an expression which calls a method or resolves to a value.

```xml
<serviceTask id="expressionService"
             name="My Expression Service Task"
             camunda:expression="${myBean.doWork()}" />
```

For more information about expression language as delegation code please see the corresponding
[section](ref:/guides/user-guide/#process-engine-expression-language-use-expression-language-as-delegation-code)
of the [User Guide](ref:/guides/user-guide/).

## Generic Java Delegates & Field Injection

You can easily write generic Java Delegate classes which can be configured later on via the BPMN 2.0 XML in the Service Task. Please refer to the [Field Injection](ref:/guides/user-guide/#process-engine-delegation-code-field-injection) section of the [User Guide](ref:/guides/user-guide/) for details.

## Service task results

The return value of a service execution (for a service task exclusively using expression) can be assigned to an already existing or to a new process variable by specifying the process variable name as a literal value for the `camunda:resultVariable` attribute of a service task definition. Any existing value for a specific process variable will be overwritten by the result value of the service execution. When not specifying a result variable name, the service execution result value is ignored.

```xml
<serviceTask id="aMethodExpressionServiceTask"
           camunda:expression="#{myService.doSomething()}"
           camunda:resultVariable="myVar" />
```

In the example above, the result of the service execution (the return value of the `doSomething()` method invocation on object `myService`) is set to the process variable named `myVar` after the service execution completes.

<div class="alert alert-warning">
  <strong>Result variables and multi-instance</strong>
  <p>
    Note that when you use <code>camunda:resultVariable</code> in a multi-instance construct, for example in a multi-instance subprocess, the result variable is overwritten every time the task completes, which may appear as random behavior. See <a href="ref:#custom-extensions-camunda-extension-attributes-camundaresultvariable">camunda:resultVariable</a> for details.
  </p>
</div>

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

* [Tasks](http://camunda.org/bpmn/reference.html#activities-task) in the [BPMN Modeling Reference](http://camunda.org/bpmn/reference.html) section
* [How to call a Webservice from BPMN](http://www.bpm-guide.de/2010/12/09/how-to-call-a-webservice-from-bpmn/). Please note that this article is outdated. However, it is still valid regarding how you would call a Web Service using the process engine.
