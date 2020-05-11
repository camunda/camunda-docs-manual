---

title: 'History for DMN Decisions'
weight: 50

menu:
  main:
    name: "History"
    identifier: "user-guide-process-engine-decisions-history"
    parent: "user-guide-process-engine-decisions"
    pre: "Audit evaluated Decisions"
---

After a decision definition has been evaluated either from a BPMN process, CMMN
case or through the Decision Service, the inputs and outputs are saved in the
History of the platform. The history entity is of type
`HistoricDecisionInstance` and has the event type `evaluate`.

For details about the history mechanism as such, refer to the [History and Audit
Event Log].

{{< note title="History Level" class="info" >}}

History level **FULL** is required. Otherwise, no history
for decisions is created.

{{< /note >}}

# Query for evaluated Decisions

The History Service can be used to query for `HistoricDecisionInstances`. For
example, use the following query to get all history entries for a decision
definition with key `checkOrder` ordered by the time when the decision was
evaluated.

```java
List<HistoricDecisionInstance> historicDecisions = processEngine
  .getHistoryService()
  .createHistoricDecisionInstanceQuery()
  .decisionDefinitionKey("checkOrder")
  .orderByEvaluationTime()
  .asc()
  .list();
```

Decisions which were evaluated from a [BPMN business rule task] can be
filtered by the process definition id or key and process instance id.

```java
HistoryService historyService = processEngine.getHistoryService();

List<HistoricDecisionInstance> historicDecisionInstances = historyService
  .createHistoricDecisionInstanceQuery()
  .processDefinitionId("processDefinitionId")
  .list();

historicDecisionInstances = historyService
  .createHistoricDecisionInstanceQuery()
  .processDefinitionKey("processDefinitionKey")
  .list();

historicDecisionInstances = historyService
  .createHistoricDecisionInstanceQuery()
  .processInstanceId("processInstanceId")
  .list();
```

Decisions which were evaluated from a [CMMN decision task] can be filtered
by the case definition id or key and case instance id.

```java
HistoryService historyService = processEngine.getHistoryService();

List<HistoricDecisionInstance> historicDecisionInstances = historyService
  .createHistoricDecisionInstanceQuery()
  .caseDefinitionId("caseDefinitionId")
  .list();

historicDecisionInstances = historyService
  .createHistoricDecisionInstanceQuery()
  .caseDefinitionKey("caseDefinitionKey")
  .list();

historicDecisionInstances = historyService
  .createHistoricDecisionInstanceQuery()
  .caseInstanceId("caseInstanceId")
  .list();
```

Note that the inputs and outputs of a decision are not included in the query
result by default. Call the methods `includeInputs()` and `includeOutputs()` on
the query to retrieve the inputs and outputs from the result.

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

The {{< javadocref
page="?org/camunda/bpm/engine/history/HistoricDecisionInstance"
text="HistoricDecisionInstance" >}} contains information about a single
evaluation of a decision.

```java
HistoricDecisionInstance historicDecision = ...;

// id of the decision definition
String decisionDefinitionId = historicDecision.getDecisionDefinitionId();

// key of the decision definition
String decisionDefinitionKey = historicDecision.getDecisionDefinitionKey();

// name of the decision
String decisionDefinitionName = historicDecision.getDecisionDefinitionName();

// time when the decision was evaluated
Date evaluationTime = historicDecision.getEvaluationTime();

// inputs of the decision (if includeInputs was specified in the query)
List<HistoricDecisionInputInstance> inputs = historicDecision.getInputs();

// outputs of the decision (if includeOutputs was specified in the query)
List<HistoricDecisionOutputInstance> outputs = historicDecision.getOutputs();
```

In case the decision was evaluated from a process, information of the process
definition, the process instance and the activity is set in the
`HistoricDecisionInstance`. The same applies for decisions evaluated from
a case, where the history instance will reference the corresponding case
instances.

Additionally, if the decision is a decision table with hit policy `collect` and
an aggregator function, then the result of the aggregation can be retrieved by
the `getCollectResultValue()` method.

For more information on supported hit policies please see the [DMN 1.3
reference].

## Historic Decision Input Instance

The {{< javadocref
page="?org/camunda/bpm/engine/history/HistoricDecisionInputInstance"
text="HistoricDecisionInputInstance" >}} represents one input of an
evaluated decision (e.g., an input clause of a decision table). 

```java
HistoricDecisionInputInstance input = ...;

// id of the input clause
String clauseId = input.getClauseId();

// label of the input clause
String clauseName = input.getClauseName();

// evaluated value of the input expression
Object value = input.getValue();

// evaluated value of the input expression as typed value
// which contains type information
TypedValue typedValue = input.getTypedValue();
```

Note that the value may be the result of a type transformation in case the 
input specifies a type.

## Historic Decision Output Instance

The {{< javadocref
page="?org/camunda/bpm/engine/history/HistoricDecisionOutputInstance"
text="HistoricDecisionOutputInstance" >}} represents one output entry of an
evaluated decision. If the decision is implemented as decision table, the 
`HistoricDecisionInstance` contains one `HistoricDecisionOutputInstance` 
for each output clause and matched rule.

```java
HistoricDecisionOutputInstance output = ...;

// id of the output clause
String clauseId = output.getClauseId();

// label of the output clause
String clauseName = output.getClauseName();

// evaluated value of the output entry
Object value = output.getValue();

// evaluated value of the output entry as typed value
// which contains type information
TypedValue typedValue = output.getTypedValue();

// id of matched rule the output belongs to
String ruleId = output.getRuleId();

// the position of the rule in the list of matched rules
Integer ruleOrder = output.getRuleOrder();

// name of the output clause used as output variable identifier
String variableName = output.getVariableName();
```

Note that the value may be the result of a type transformation in case the
output specifies a type.

# Cockpit

You can audit the evaluated decision definitions in the [Cockpit] webapp.



[Cockpit]: {{< ref "/webapps/cockpit/dmn/_index.md" >}}
[History and Audit Event Log]: {{< ref "/user-guide/process-engine/history.md" >}}
[DMN 1.3 reference]: {{< ref "/reference/dmn/decision-table/hit-policy.md" >}}
[BPMN business rule task]: {{< ref "/reference/bpmn20/tasks/business-rule-task.md#using-camunda-dmn-engine" >}}
[CMMN decision task]: {{< ref "/reference/cmmn11/tasks/decision-task.md" >}}
