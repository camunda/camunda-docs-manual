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
    camunda:decisionRefVersion="12"
    camunda:resultVariable="result" />
```

The `camunda:decisionRefBinding` attribute defaults to `latest`.

```xml
<businessRuleTask id="businessRuleTask"
    camunda:decisionRef="myDecision"
    camunda:resultVariable="result" />
```

The attributes `camunda:decisionRef` and `camunda:decisionRefVersion` can both be specified as
an expression which will be evaluated on execution of the task.

```xml
<businessRuleTask id="businessRuleTask"
    camunda:decisionRef="${decisionKey}"
    camunda:decisionRefBinding="version"
    camunda:decisionRefVersion="${decisionVersion}"
    camunda:resultVariable="result" />
```

The output of the decision, also called decision result, is a complex object of type `DmnDecisionResult`. Generally, it is a list of key-value pairs. Each entry in the list represents one matched rule. The output values of this rule are represented by the key-value pairs. 

The decision result is not saved as process variable automatically. It has to pass into a process variable by using one of the followings ways:

* built-in decision result mapper
* custom output variable mapping
* custom mapping with execution listener

## Built-in Decision Result Mapper

A decision result mapper is a predefined function for an output variable mapping. The result of the mapping is saved in the variable which is specified by the `camunda:resultVariable` attribute. The `camunda:mapDecisionResult` attribute references the mapper and accepts one of the following values:

* singleValue
* singleOutput
* collectValues
* outputList 

```xml
<businessRuleTask id="businessRuleTask"
    camunda:decisionRef="myDecision"
    camunda:mapDecisionResult="singleValue"
    camunda:resultVariable="result" />
```

The mapper `singleValue` is used for decisions which can have only one matched rule with one output value. For example, a decision table with hit policy `unique`, `first` or `collect` with an aggregator function like `sum`. The result of the mapping is a single typed value.

If the decision can have more than one output value then the `singleOutput` mapper should be used. The result of the mapping is a map which contains the output values of the matched rule. 

The `collectValues` mapper can be used for decision which can have multiple matched rules with exactly one output value. For example, a decision tables with hit policy `rule order`, `output order` or `collect` without aggregator function. The result is a list that contains the output value of each matched rule. 

If none of the above mappers is suitable for the decision then the `outputList` mapper can be used. The result of the mapping is a list of maps that represents the matched rules with their output values. In contrast to `DmnDecisionResult`, it used collection classes from the JDK only.

In case that the `camunda:mapDecisionResult` attribute is not set then the `outputList` mapper is used by default. 

Note that the mapper throw an exception if the decision is not suitable. For example, the `singleValue` mapper throw an exception if the decision result contains more than one matched rule.

{{< note title="Name of the Result Variable" class="warning" >}}
The result variable should not have the name `decisionResult` since the decision result is saved in a variable with this name. Otherwise an exception is thrown while saving the result variable.
{{< /note >}}

{{< note title="Limitations of Serialization" class="warning" >}}
If you are using one of the built-in decision result mappers `singleOutput`, `collectValues` or `outputList` then you should consider the [limitations of serialization]({{< relref "#limitations-of-serialization" >}}).
{{< /note >}}

## Custom Output Variable Mapping

In addition to the built-in mappers, a custom [output variable mapping]({{< relref "user-guide/process-engine/variables.md#input-output-variable-mapping" >}}) can be used. For example, the decision result have multiple output values which should be saved in separate process variables. 

```xml
<businessRuleTask id="businessRuleTask" camunda:decisionRef="myDecision">
  <extensionElements>
    <camunda:inputOutput>
      <camunda:outputParameter name="result">
        ${decisionResult.getSingleOutput().result}
      </camunda:outputParameter>
      <camunda:outputParameter name="reason">
        ${decisionResult.getSingleOutput().reason}
      </camunda:outputParameter>
    </camunda:inputOutput>
  </extensionElements>
</businessRuleTask>
```

The decision result of type `DmnDecisionResult` is available in the process variable `decisionResult`. It provides different convenience methods like `getSingleOutput()`, `getSingleValue()` and `getFirstValue()`. For a complete list of methods, see the {{< javadocref page="org.camunda.bpm.dmn.engine.DmnDecisionResult" text="Java Docs" >}} of this class.

The decision result also provide methods to get typed output values, for example `getSingleValueTyped()`. Please refer to the [Typed Value API]({{< relref "user-guide/process-engine/variables.md#typed-value-api" >}}) section of the User Guide for details about typed values. 

{{< note title="Limitations of Serialization" class="warning" >}}
If you map a collection or a complex object to a process variable then you should consider the [limitations of serialization]({{< relref "#limitations-of-serialization" >}}).
{{< /note >}}

## Custom Mapping with Execution Listener

The decision result can also processed by an [execution listener]({{< relref "user-guide/process-engine/delegation-code.md#execution-listener" >}}) which is attached to the business rule task. Like in case of custom output variable mapping, the decision result is available is the process variable `decisionResult`.

```xml
<businessRuleTask id="businessRuleTask" camunda:decisionRef="myDecision">
  <extensionElements>
    <camunda:executionListener event="end"
      delegateExpression="${myDecisionResultListener}" />
  </extensionElements>
</businessRuleTask>
```

```java
public class MyDecisionResultListener implements ExecutionListener {

  @Override
  public void notify(DelegateExecution execution) throws Exception {
    DmnDecisionResult decisionResult = execution.getVariable("decisionResult");
    String result = decisionResult.getSingleOutput().get("result");
    String reason = decisionResult.getSingleOutput().get("reason");
    // ...
  }
  
}
```

{{< note title="Limitations of Serialization" class="warning" >}}
If you save a collection or a complex object to a process variable then you should consider the [limitations of serialization]({{< relref "#limitations-of-serialization" >}}).
{{< /note >}}

## Limitations of Serialization

The built-in decision result mappers `singleOutput`, `collectValues` and `outputList` map the result to collections. The implementation of the collections are from the JDK and contains untyped values. When a collection is saved as process variable then it is serialized as object value because there is no suitable primitive value type. Depends on your [object value serialization]({{< relref "user-guide/process-engine/variables.md#object-value-serialization" >}}), this can lead to deserialization problems. 

In case you are using the default build-in object serialization, the variable can not be deserialized if the JDK is upgraded or changed and contains an incompatible version of the collection class. Otherwise, if you are using another serialization like JSON then you should consider that the untyped value is deserializable. For example, a collection of date values can not be deserialized using JSON because JSON has no mapper for date by default.

The same problems can occur by using a custom output variable mapping since `DmnDecisionResult` and `DmnDecisionOutput` have methods that returns the same collections as the built-in mappers. Additionally, it is not recommended to save a `DmnDecisionResult` or a `DmnDecisionOutput` as process variable because the implementation can change in a new version of Camunda BPM.

To be aware of these problems, you can use primitive variables only. Alternatively, you can use a custom object for serialization that you can control by yourself. 

# Using a Custom Rule Engine

You can use the rule engine of your choice, on the open source side we have
made good experiences with JBoss Drools. To do so, you have to plug in your
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
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#asyncbefore" >}}">camunda:asyncBefore</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#asyncafter" >}}">camunda:asyncAfter</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#class" >}}">camunda:class</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#decisionref" >}}">camunda:decisionRef</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#decisionrefbinding" >}}">camunda:decisionRefBinding</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#decisionrefversion" >}}">camunda:decisionRefVersion</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#delegateexpression" >}}">camunda:delegateExpression</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#exclusive" >}}">camunda:exclusive</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#expression" >}}">camunda:expression</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#jobpriority" >}}">camunda:jobPriority</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#mapdecisionresult" >}}">camunda:mapDecisionResult</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#resultvariable" >}}">camunda:resultVariable</a>,
      <a href="{{< relref "reference/bpmn20/custom-extensions/extension-attributes.md#type" >}}">camunda:type</a>
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
</table>


# Additional Resources

* [Decisions]({{< relref "user-guide/process-engine/decisions.md" >}})
* [Service Tasks]({{< relref "reference/bpmn20/tasks/service-task.md" >}})
* [Tasks](http://camunda.org/bpmn/reference.html#activities-task) in the [BPMN 2.0 Modeling Reference](http://camunda.org/bpmn/reference.html)
* [Demo using Drools on the Business Rule Task](https://github.com/camunda/camunda-consulting/tree/master/one-time-examples/order-confirmation-rules)
