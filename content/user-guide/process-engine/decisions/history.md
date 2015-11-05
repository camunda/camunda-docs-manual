---

title: 'History for DMN Decisions'
weight: 40

menu:
  main:
    name: "History"
    identifier: "user-guide-process-engine-decisions-history"
    parent: "user-guide-process-engine-decisions"
    pre: "Audit evaluated Decisions"
---


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


# Query for evaluated Decisions

# The Historic Decision Instance

## Historic Decision Inputs

## Historic Decision Outputs

# Cockpit
