---

title: 'Decisions'
weight: 260

menu:
  main:
    identifier: "user-guide-process-engine-decisions"
    parent: "user-guide-process-engine"

---

Decisions can be deployed as DMN Decision Tables to the Camunda BPM platform.


# Decisions inside BPMN

Inside BPMN processes they can be references by Business Rule Tasks. For more information
on this please refer to the [BPMN 2.0 reference]({{< relref "reference/bpmn20/tasks/business-rule-task.md" >}}).

```xml
<businessRuleTask id="businessRuleTask"
    camunda:decisionRef="myDecision"
    camunda:mapDecisionResult="singleValue"
    camunda:resultVariable="result" />
```

# Decision Service

You can also execute decisions directly through the Decision Service. The
Decision Service allows you to executed a deployed decision by Decision
Definition Id, Decision Definition Key and Decision Definition Key + Version.
After the execution you can access the decision result. Please see the
following example:

```java
DecisionService decisionService = processEngine.getDecisionService();

VariableMap variables = Variables.createVariables()
  .putValue("status", "bronze")
  .putValue("sum", 1000);

DmnDecisionResult decisionResult = decisionService
  .evaluateDecisionByKey("decision", variables);

String result = decisionResult.getFirstOutput().get("result");
```

# Decision History

After a decision was executed, either as a Business Rule Task or through the Decision Service, its inputs and outputs
are saved in the History. Please note that a history level of FULL is required. You can than use the History Service
to query for Historic Decision Instances.

```java
List<HistoricDecisionInstance> historicDecisions = processEngine
  .getHistoryService()
  .createHistoricDecisionInstanceQuery()
  .decisionDefinitionKey("decision")
  .includeInputs()
  .includeOutputs()
  .list();

for (HistoricDecisionInstance historicDecision : historicDecisions) {
  List<HistoricDecisionInputInstance> inputs = historicDecision.getInputs();
  List<HistoricDecisionOutputInstance> outputs = historicDecision.getOutputs();
}
```

[businessRuleTask]: ({{< relref "reference/bpmn20/tasks/business-rule-task.md#using-camunda-dmn-engine" >}}
