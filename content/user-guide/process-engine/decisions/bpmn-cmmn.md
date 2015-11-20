---

title: 'Invoke Decisions from Processes and Cases'
weight: 30

menu:
  main:
    name: "Decisions in BPMN & CMMN"
    identifier: "user-guide-process-engine-decisions-bpmn"
    parent: "user-guide-process-engine-decisions"
    pre: "Invoke Decisions from BPMN Processes and CMMN Cases"
---


# BPMN & CMMN Integration

A decision can be invoked inside a BPMN process or a CMMN case.

## DMN Business Rule Task

A DMN Business Rule Task references a decision table which is deployed inside the engine. The decision table is invoked when the task is entered.

```xml
<businessRuleTask id="businessRuleTask"
    camunda:decisionRef="myDecision"
    camunda:mapDecisionResult="singleEntry"
    camunda:resultVariable="result" />
```

For more information on this please refer to the [BPMN 2.0 reference]({{< relref "reference/bpmn20/tasks/business-rule-task.md" >}}).

## DMN Decision Task

A DMN Decision Task references a decision table which is deployed inside the engine. The decision table is invoked when the task is activated.

```xml
<decisionTask id="businessRuleTask" decisionRef="myDecision"
    camunda:mapDecisionResult="singleEntry"
    camunda:resultVariable="result" />
```

For more information on this please refer to the [CMMN 1.1 reference]({{< relref "reference/cmmn11/tasks/decision-task.md" >}}).

# The Decision Result

The output of the decision, also called decision result, is a complex object of type `DmnDecisionTableResult`. Generally, it is a list of key-value pairs. Each entry in the list represents one matched rule. The output entries of this rule are represented by the key-value pairs.

The type `DmnDecisionTableResult` provides methods from List interface and some convenience methods like `getSingleResult()` or `getFirstResult()` to get the result of a matched rule. The rule results provides methods from Map interface and also convenience methods like `getSingleEntry()` or `getFirstEntry()`. For example, `decisionResult.getSingleResult().getEntry("result")` returns the output entry with name `result` of the only matched rule. It also provides methods to get typed output entries like `getSingleEntryTyped()`. Please refer to the [User Guide]({{< relref "user-guide/process-engine/variables.md#typed-value-api" >}}) for details about typed values. A complete list of all methods can be found in the {{< javadocref page="org/camunda/bpm/dmn/engine/DmnDecisionTableResult" text="Java Docs" >}}.

The decision result is available in the local scope of the executing task as a transient variable named `decisionResult`. It can be passed into a variable by using a predefined or a custom mapping of the decision result, if necessary.

## Predefined Mapping of the Decision Result

The engine includes predefined mappings of the decision result for common use cases. The mapping is similar to an output variable mapping and extract a value from the decision result which is passed to a variable. The following mappings are available:

<table class="table table-striped">
  <tr>
    <th>Mapper</th>
    <th>Result</th>
    <th>Is suitable for decision tables with</th>
  </tr>
  <tr>
    <td>singleEntry</td>
    <td>single typed entry</td>
    <td>single output entry and hit policy unique, first, priority or collect with an aggregator function</td>
  </tr>
  <tr>
    <td>singleResult</td>
    <td>Map of String and Object</td>
    <td>multiple output entries and hit policy unique, first, priority or collect with an aggregator function</td>
  </tr>
  <tr>
    <td>collectEntries</td>
    <td>List of Objects</td>
    <td>single output and hit policy rule order, output order or collect without an aggregator function</td>
  </tr>
  <tr>
    <td>resultList</td>
    <td>List of Maps of String and Object</td>
    <td>multiple output entries and hit policy rule order, output order or collect without an aggregator function</td>
  </tr>
</table>

Only the `singleEntry` mapper returns a [typed value]({{< relref "user-guide/process-engine/variables.md#typed-value-api" >}}) that contains the value of the output entry and additional type informations. The other mappers returns a collection which contains the value of the output entry as pure object.

Note that the mapper throw an exception if the decision result is not suitable. For example, the `singleEntry` mapper throw an exception if the decision result contains more than one matched rule.

{{< note title="Limitations of Serialization" class="warning" >}}
If you are using one of the predefined mappers `singleResult`, `collectEntries` or `resultList` then you should consider the [limitations of serialization]({{< relref "#limitations-of-the-serialization-of-the-mapping-result" >}}).
{{< /note >}}

## Custom Mapping of the Decision Result

Instead of a predefined mapping, a custom desision result mapping can be used to pass the decision result into variables.

{{< note title="Limitations of Serialization" class="warning" >}}
If you pass a collection or a complex object to a variable then you should consider the [limitations of serialization]({{< relref "#limitations-of-the-serialization-of-the-mapping-result" >}}).
{{< /note >}}

### Custom Mapping into Process Variables

If a business rule task is used to invoke a decision inside a BPMN process, then the decision result can be passed into process variables by using [output variable mapping]({{< relref "user-guide/process-engine/variables.md#input-output-variable-mapping" >}}). For example, the decision result have multiple output values which should be saved in separate process variables.

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

In addition to an output variable mapping, the decision result can also be processed by an [execution listener]({{< relref "user-guide/process-engine/delegation-code.md#execution-listener" >}}) which is attached to the business rule task.

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
    String result = decisionResult.getSingleResult().get("result");
    String reason = decisionResult.getSingleResult().get("reason");
    // ...
  }

}
```

### Custom Mapping into Case Variables

If a decision task is used to invoke a decision inside a CMMN case, the decision result can be passed to a case variable by using a case execution listener which is attached to the decision task.

```xml
<decisionTask id="decisionTask" decisionRef="myDecision">
  <extensionElements>
    <camunda:caseExecutionListener event="complete"
      class="org.camunda.bpm.example.MyDecisionResultListener" />
  </extensionElements>
</businessRuleTask>
```

```java
public class MyDecisionResultListener implements CaseExecutionListener {

  @Override
  public void notify(DelegateCaseExecution caseExecution) throws Exception;
    DmnDecisionResult decisionResult = caseExecution.getVariable("decisionResult");
    String result = decisionResult.getSingleResult().get("result");
    String reason = decisionResult.getSingleResult().get("reason");
    // ...
    caseExecution.setVariable("result", result);
    // ...
  }

}
```

## Limitations of the Serialization of the Mapping Result

The predefined mappings `singleResult`, `collectEntries` and `resultList` map the decision result to collections. The implementation of the collections are from the JDK and contains untyped values as Objects. When a collection is saved as process variable then it is serialized as object value because there is no suitable primitive value type. Depends on your [object value serialization]({{< relref "user-guide/process-engine/variables.md#object-value-serialization" >}}), this can lead to deserialization problems.

In case you are using the default build-in object serialization, the variable can not be deserialized if the JDK is upgraded or changed and contains an incompatible version of the collection class. Otherwise, if you are using another serialization like JSON then you should consider that the untyped value is deserializable. For example, a collection of date values can not be deserialized using JSON because JSON has no registered mapper for date by default.

The same problems can occur by using a custom output variable mapping since `DmnDecisionTableResult` have methods that returns the same collections as the predefined mappers. Additionally, it is not recommended to save a `DmnDecisionTableResult` or a `DmnRuleResult` as process variable because the implementation can change in a new version of Camunda BPM.

To be aware of these problems, you can use primitive variables only. Alternatively, you can use a custom object for serialization that you can control by yourself.

# Accessing Process Variables from Decision Tables

## Process Variables in Input Expressions

- typed values & variableContext

## Process Varianbles in Input Entries

## Process Variables in Output Entries

# Expression Language Integration

## Accessing Beans

## Extending the Expression Lanaguage
