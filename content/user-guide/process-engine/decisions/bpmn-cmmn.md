---

title: 'Invoke Decisions from Processes and Cases'
weight: 40

menu:
  main:
    name: "Decisions in BPMN & CMMN"
    identifier: "user-guide-process-engine-decisions-bpmn"
    parent: "user-guide-process-engine-decisions"
    pre: "Invoke Decisions from BPMN Processes and CMMN Cases"
---


# BPMN & CMMN Integration

This section explains how to invoke DMN decision from BPMN and CMMN.

## BPMN Business Rule Task

The BPMN business rule task can reference a [deployed] decision
definition. The decision definition is evaluated when the task is executed.

```xml
<definitions id="taskAssigneeExample"
  xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:camunda="http://camunda.org/schema/1.0/bpmn"
  targetNamespace="Examples">

  <process id="process">

    <!-- ... -->

    <businessRuleTask id="businessRuleTask"
                      camunda:decisionRef="myDecision"
                      camunda:mapDecisionResult="singleEntry"
                      camunda:resultVariable="result" />

    <!-- ... -->

  </process>
</definitions>
```

For more information on how to reference a decision definition from a business
rule task, please refer to the [BPMN 2.0 reference][business rule task].

## DMN Decision Task

The CMMN decision task references a [deployed] decision definition.
The decision definition is invoked when the task is activated.

```xml
<definitions id="definitions"
                  xmlns="http://www.omg.org/spec/CMMN/20151109/MODEL"
                  xmlns:camunda="http://camunda.org/schema/1.0/cmmn"
                  targetNamespace="Examples">
  <case id="case">
    <casePlanModel id="CasePlanModel_1">
      <planItem id="PI_DecisionTask_1" definitionRef="DecisionTask_1" />
      <decisionTask id="DecisionTask_1"
                    decisionRef="myDecision"
                    camunda:mapDecisionResult="singleEntry"
                    camunda:resultVariable="result">
      </decisionTask>
    </casePlanModel>
  </case>
</definitions>
```

For more information on how to reference a decision definition from a decision
task, please refer to the [CMMN 1.1 reference][decision task].

# The Decision Result

The output of the decision, also called decision result, is a complex object of
type `DmnDecisionResult`. Generally, it is a list of key-value pairs. 

If the decision is implemented as [decision table] then each entry in the list represents one matched rule. The output entries of this
rule are represented by the key-value pairs. The key of a pair is specified by
the name of the output.

Instead, if the decision is implemented as [decision literal expression] then the list contains only one entry. This entry represents the expression value and is mapped by the variable name.

The type `DmnDecisionResult` provides methods from the `List` interface
and some convenience methods like `getSingleResult()` or `getFirstResult()` to
get the result of a matched rule. The rule results provide methods from the
`Map` interface and also convenience methods like `getSingleEntry()` or
`getFirstEntry()`.

If the decision result contains only a single output value (e.g., evaluating a decision literal expression) then 
the value can be retrieved from the result using the `getSingleEntry()` method
which combines `getSingleResult()` and `getSingleEntry()`.

For example, the following code returns the output entry with name `result` of
the only matched rule.

```java
DmnDecisionResult decisionResult = ...;

Object value = decisionResult
  .getSingleResult()
  .getEntry("result");
```

It also provides methods to get typed output entries like
`getSingleEntryTyped()`. Please refer to the [User Guide][Typed Value API] for
details about typed values. A complete list of all methods can be found in the
{{< javadocref page="?org/camunda/bpm/dmn/engine/DmnDecisionResult"
text="Java Docs" >}}.

The decision result is available in the local scope of the executing task as a
transient variable named `decisionResult`. It can be passed into a variable by
using a predefined or a custom mapping of the decision result, if necessary.

## Predefined Mapping of the Decision Result

The engine includes predefined mappings of the decision result for common use
cases. The mapping is similar to an [output variable mapping]. It extracts a
value from the decision result which is saved in a process/case variable. The
following mappings are available:

<table class="table table-striped">
  <tr>
    <th>Mapper</th>
    <th>Result</th>
    <th>Is suitable for</th>
  </tr>
  <tr>
    <td>singleEntry</td>
    <td>TypedValue</td>
    <td>decision literal expressions and <br/>
    decision tables with no more than one matching rule and only one output</td>
  </tr>
  <tr>
    <td>singleResult</td>
    <td>Map&lt;String, Object&gt;</td>
    <td>decision tables with no more than one matching rule</td>
  </tr>
  <tr>
    <td>collectEntries</td>
    <td>List&lt;Object&gt;</td>
    <td>decision tables with multiple matching rules and only one output</td>
  </tr>
  <tr>
    <td>resultList</td>
    <td>List&lt;Map&lt;String, Object&gt;&gt;</td>
    <td>decision tables with multiple matching rules and multiple outputs</td>
  </tr>
</table>

Only the `singleEntry` mapper returns a [typed value][Typed Value API] that
wraps the value of the output entry and additional type information. The
other mappers return collections which contain the value of the output entries
as normal Java objects without additional type information.

Note that the mapper throws an exception if the decision result is not
suitable. For example, the `singleEntry` mapper throws an exception if the
decision result contains more than one matched rule.

{{< note title="Limitations of Serialization" class="warning" >}}

If you are using one of the predefined mappers `singleResult`, `collectEntries`
or `resultList` then you should consider the [limitations of serialization]({{<
relref "#limitations-of-the-serialization-of-the-mapping-result" >}}).

{{< /note >}}

To specify the name of the process/case variable to store the result of the
mapping, the `camunda:resultVariable` attribute is used.

BPMN:
```xml
<businessRuleTask id="businessRuleTask"
                  camunda:decisionRef="myDecision"
                  camunda:mapDecisionResult="singleEntry"
                  camunda:resultVariable="result" />
```

CMMN:
```xml
<decisionTask id="DecisionTask_1"
              decisionRef="myDecision"
              camunda:mapDecisionResult="singleEntry"
              camunda:resultVariable="result">
```

{{< note title="Name of the Result Variable" class="warning" >}}

The result variable should not have the name `decisionResult` since the
decision result itself is saved in a variable with this name. Otherwise an
exception is thrown while saving the result variable.

{{< /note >}}

## Custom Mapping of the Decision Result

Instead of a predefined mapping, a custom decision result mapping can be used
to pass the decision result into variables.

{{< note title="Limitations of Serialization" class="warning" >}}

If you pass a collection or a complex object to a variable then you should
consider the [limitations of serialization]({{< relref "#limitations-of-the-serialization-of-the-mapping-result" >}}).


{{< /note >}}

### Custom Mapping to Process Variables

If a business rule task is used to invoke a decision inside a BPMN process,
then the decision result can be passed into process variables by using an
[output variable mapping].

For example, if the decision result has multiple output values which should be
saved in separate process variables this can be done achieved by defining an
output mapping on the business rule task.

```xml
<businessRuleTask id="businessRuleTask" camunda:decisionRef="myDecision">
  <extensionElements>
    <camunda:inputOutput>
      <camunda:outputParameter name="result">
        ${decisionResult.getSingleResult().result}
      </camunda:outputParameter>
      <camunda:outputParameter name="reason">
        ${decisionResult.getSingleResult().reason}
      </camunda:outputParameter>
    </camunda:inputOutput>
  </extensionElements>
</businessRuleTask>
```

In addition to an output variable mapping, the decision result can also be
processed by an [execution listener], which is attached to the business rule
task.

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
    DmnDecisionResult decisionResult = (DmnDecisionResult) execution.getVariable("decisionResult");
    String result = decisionResult.getSingleResult().get("result");
    String reason = decisionResult.getSingleResult().get("reason");
    // ...
  }

}
```

### Custom Mapping to Case Variables

If a decision task is used to invoke a decision inside a CMMN case, the
decision result can be passed to a case variable by using a case execution
listener which is attached to the decision task.

```xml
<decisionTask id="decisionTask" decisionRef="myDecision">
  <extensionElements>
    <camunda:caseExecutionListener event="complete"
      class="org.camunda.bpm.example.MyDecisionResultListener" />
  </extensionElements>
</decisionTask>
```

```java
public class MyDecisionResultListener implements CaseExecutionListener {

  @Override
  public void notify(DelegateCaseExecution caseExecution) throws Exception;
    DmnDecisionResult decisionResult = (DmnDecisionResult) caseExecution.getVariable("decisionResult");
    String result = decisionResult.getSingleResult().get("result");
    String reason = decisionResult.getSingleResult().get("reason");
    // ...
    caseExecution.setVariable("result", result);
    // ...
  }

}
```

## Limitations of the Serialization of the Mapping Result

The predefined mappings `singleResult`, `collectEntries` and `resultList` map
the decision result to Java collections. The implementation of the collections
depends on the used JDK and contains untyped values as Objects. When a collection
is saved as process/case variable then it is serialized as object value because
there is no suitable primitive value type. Depending on the used [object value
serialization], this can lead to deserialization problems.

In case you are using the default built-in object serialization, the variable
can not be deserialized if the JDK is updated or changed and contains an
incompatible version of the collection class. Otherwise, if you are using
another serialization like JSON then you should ensure that the untyped value
is deserializable. For example, a collection of date values can not be
deserialized using JSON because JSON has no registered mapper for date by
default.

The same problems can occur by using a custom output variable mapping since
`DmnDecisionResult` has methods that return the same collections as the
predefined mappers. Additionally, it is not recommended to save a
`DmnDecisionResult` or a `DmnDecisionResultEntries` as process/case variable because
the underlying implementation can change in a new version of Camunda BPM.

To prevent any of these problems, you should use primitive variables only.
Alternatively, you can use a custom object for serialization that you control
by yourself.

# Accessing Variables from Decisions

DMN Decision tables and Decision Literal Expressions contain multiple expressions which will be evaluated by the
DMN engine. For more information about the expressions of a decision
please see our [DMN 1.1 reference][decision table]. These expressions can
access all process/case variables which are available in the scope of the
calling task. The variables are provided through a read-only variable context.

As a shorthand, process/case variables can be directly referenced by name in
expressions. For example, if a process variable `foo` exists, then this
variable can be used in an input expression, input entry and output entry of a decision table 
by its name.

```xml
<input id="input">
  <!--
    this input expression will return the value
    of the process/case variable `foo`
  -->
  <inputExpression>
    <text>foo</text>
  </inputExpression>
</input>
```

The returned value of the process/case variable in the expression will
be a normal object and not a [typed value][Typed Value API]. If you want
to use the typed value in your expression, you have to get the variable
from the variable context. The following snippet does the same as the above
example. It gets the variable `foo` from the variable context and returns
its unwrapped value.

```xml
<input id="input">
  <!--
    this input expression uses the variable context to
    get the typed value of the process/case variable `foo`
  -->
  <inputExpression>
    <text>
      variableContext.resolve("foo").getValue()
    </text>
  </inputExpression>
</input>
```

# Expression Language Integration

By default, the DMN engine uses [JUEL] as expression language for input
expressions, output entries and literal expressions. It uses [FEEL] as expression language for input
entries. Please see the [DMN engine][expression languages] guide for more
information about expression languages.

## Accessing Beans

If the DMN engine is invoked by the Camunda BPM platform, it uses the same
JUEL configuration as the Camunda BPM engine. Therefore, it is also
possible to access Spring and CDI Beans from JUEL expressions in decisions. 
For more information on this integration, please see the corresponding
section in the [Spring] and [CDI] guides.

## Extending the Expression Language

{{< note title="Use of Internal API" class="warning" >}}

These APIs are **not** part of the [public API]({{< ref "/introduction/public-api.md" >}}) and may change in later releases.

{{< /note >}}

It is possible to add own functions which can be used inside JUEL expressions.
Therefore a new {{< javadocref
page="?org/camunda/bpm/engine/impl/javax/el/FunctionMapper.html"
text="FunctionMapper" >}} has to be implemented. The function mapper than
has to be added to the process engine configuration after it was
initialized.

```java
ProcessEngineConfigurationImpl processEngineConfiguration = (ProcessEngineConfigurationImpl) processEngine
  .getProcessEngineConfiguration();

processEngineConfiguration
  .getExpressionManager()
  .addFunctionMapper(new MyFunctionMapper());
```

This can be done, for example, by creating a [process engine plugin].

Please **note** that these functions are available in all JUEL expressions
in the platform, not only in DMN decisions.

[decision table]: {{< ref "/reference/dmn11/decision-table/_index.md" >}}
[decision literal expression]: {{< ref "/reference/dmn11/decision-literal-expression/_index.md" >}}
[deployed]: {{< ref "/user-guide/process-engine/decisions/repository.md" >}}
[business rule task]: {{< ref "/reference/bpmn20/tasks/business-rule-task.md" >}}
[decision task]: {{< ref "/reference/cmmn11/tasks/decision-task.md" >}}
[Typed Value API]: {{< ref "/user-guide/process-engine/variables.md#typed-value-api" >}}
[object value serialization]: {{< ref "/user-guide/process-engine/variables.md#object-value-serialization" >}}
[output variable mapping]: {{< ref "/user-guide/process-engine/variables.md#input-output-variable-mapping" >}}
[execution listener]: {{< ref "/user-guide/process-engine/delegation-code.md#execution-listener" >}}
[expression languages]: {{< ref "/user-guide/dmn-engine/expressions-and-scripts.md" >}}
[JUEL]: http://juel.sourceforge.net/
[FEEL]: {{< ref "/reference/dmn11/feel/_index.md" >}}
[Spring]: {{< ref "/user-guide/spring-framework-integration/_index.md#expression-resolving" >}}
[CDI]: {{< ref "/user-guide/cdi-java-ee-integration/expression-resolving.md" >}}
[process engine plugin]: {{< ref "/user-guide/process-engine/process-engine-plugins.md" >}}
