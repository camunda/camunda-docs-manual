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

When a decision was evaluated, either from processes or cases or through the Decision Service, its inputs and outputs
are saved in the History. The history entity is of type `HistoricDecisionInstance` and has the event type `evaluate`.

For details about the history mechanism please refer to the [History and Audit Event Log]({{< relref "user-guide/process-engine/history.md" >}}).

{{< note title="History Level" class="info" >}}
Please note that a history level of **FULL** is required. Otherwise, no history is created.
{{< /note >}}

# Query for evaluated Decisions

The History Service can be used to query for `HistoricDecisionInstances`. For example, use the following query to get all history from a decision with key `checkOrder` ordered by the time when the decision was evaluated.

```java
List<HistoricDecisionInstance> historicDecisions = processEngine
  .getHistoryService()
  .createHistoricDecisionInstanceQuery()
  .decisionDefinitionKey("checkOrder")
  .orderByEvaluationTime()
  .asc()
  .list();
```

In case the decision was evaluated from a process, the decisions can be filtered by the id of the process instance.

```java
List<HistoricDecisionInstance> historicDecisions = processEngine
  .getHistoryService()
  .createHistoricDecisionInstanceQuery()
  .processInstanceId("xxx")
  .list();
```

Note that the inputs and outputs of a decision are not included in the query result by default. Call the methods `includeInputs()` and `includeOutputs()` on the query to retrieve the inputs and outputs from the result.

```java
List<HistoricDecisionInstance> historicDecisions = processEngine
  .getHistoryService()
  .createHistoricDecisionInstanceQuery()
  .decisionDefinitionKey("checkOrder")
  .includeInputs()
  .includeOutputs()
  .list();
```

# The Historic Decision Instance

The {{< javadocref page="org/camunda/bpm/engine/history/HistoricDecisionInstance" text="HistoricDecisionInstance" >}} containing informations about a single evaluation of a decision. 

```java
HistoricDecisionInstance historicDecision = // ...

// id of the decision definition
String decisionDefinitionId = historicDecision.getDecisionDefinitionId();
// key of the decision definition
String decisionDefinitionKey = historicDecision.getDecisionDefinitionKey();
// name of the decision
String decisionDefinitionName = historicDecision.getDecisionDefinitionName();
// time when the decision was evaluated
Date evaluationTime = historicDecision.getEvaluationTime();

// inputs of the decision
List<HistoricDecisionInputInstance> inputs = historicDecision.getInputs();
// outputs of the decision
List<HistoricDecisionOutputInstance> outputs = historicDecision.getOutputs();
```

In case the decision was evaluated from a process, informations of the process definition, the process instance and the activity are set in the `HistoricDecisionInstance`.

Additionally, if the decision is a decision table with hit policy `collect` and an aggregator function then the result of the aggregation can be retrieved by the `getCollectResultValue()` method.

## Historic Decision Input Instance

The {{< javadocref page="org/camunda/bpm/engine/history/HistoricDecisionInputInstance" text="HistoricDecisionInputInstance" >}} represents one input clause of an evaluated decision. 

```java
HistoricDecisionInputInstance input = // ...

// id of the input clause
String clauseId = input.getClauseId();
// label of the input clause
String clauseName = input.getClauseName();
// evaluated value of the input expression
Object value = input.getValue();
// evaluated value of the input expression as typed value which contains type informations
TypedValue typedValue = input.getTypedValue();
```

Note that the value may the result of a type transformation in case the input expression specifies a type. 

## Historic Decision Output Instance

The {{< javadocref page="org/camunda/bpm/engine/history/HistoricDecisionOutputInstance" text="HistoricDecisionOutputInstance" >}} represents one output entry of an evaluated decision. So the Historic Decision Instance contains one Historic Decision Output Instance for each output clause and matched rule. 

Like Historic Decision Input Instance, it contains a reference to the output clause and the evaluated value of the output entry's expression. Additionally, the id of rule and 
their position in the decision result can be retrieved.

# Cockpit
