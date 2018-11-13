---

title: "Evaluating Decisions using the DMN Engine API"
weight: 20

menu:
  main:
    name: "Evaluate Decisions"
    identifier: "user-guide-dmn-engine-evaluate"
    parent: "user-guide-dmn-engine"
    pre: "Evaluate Decisions using the DMN Engine API"

---

The DMN engine {{< javadocref page="?org/camunda/bpm/dmn/engine/DmnEngine.html" text="interface" >}} exposes methods
for parsing and evaluating DMN Decisions.

# Parse Decisions

Decisions can be parsed from an `InputStream` or transformed from a {{< javadocref page="?org/camunda/bpm/model/dmn/DmnModelInstance.html" text="DmnModelInstance" >}}.

This example shows how to parse a decision from an input stream:

```java
// create a default DMN engine
DmnEngine dmnEngine = DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration()
  .buildEngine();

InputStream inputStream = ...

// parse all decision from the input stream
List<DmnDecision> decisions = dmnEngine.parseDecisions(inputStream);
```

The next example uses the DMN Model API to first create a
DmnModelInstance and then transform the decisions:

```java
// create a default DMN engine
DmnEngine dmnEngine = DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration()
  .buildEngine();

// read a DMN model instance from a file
DmnModelInstance dmnModelInstance = Dmn.readModelFromFile(...);

// parse the decisions
List<DmnDecision> decisions = dmnEngine.parseDecisions(dmnModelInstance);
```

## The Decision Key

A DMN XML file can contain multiple decisions. To distinguish the decisions,
every decision should have an `id` attribute.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn11.xsd" id="definitions" name="definitions" namespace="http://camunda.org/schema/1.0/dmn">
  <decision id="first-decision" name="First Decision">
    <decisionTable>
      <output id="output1"/>
    </decisionTable>
  </decision>
  <decision id="second-decision" name="Second Decision">
    <decisionTable>
      <output id="output2"/>
    </decisionTable>
  </decision>
</definitions>
```

The `id` of a decision in the XML is called `key` in the context of the DMN
engine. To only parse a specific decision from a DMN file you, specify the decision
key which corresponds to the `id` attribute in the XML file.

```java
// create a default DMN engine
DmnEngine dmnEngine = DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration()
  .buildEngine();

// read the DMN XML file as input stream
InputStream inputStream = ...

// parse only the decision with the key "second-decision"
DmnDecision decision = dmnEngine.parseDecision("second-decision", inputStream);
```

## Decision Tables only

Currently the DMN engine only supports DMN 1.1 [decision tables]. Other decisions
will be ignored. Use the method {{< javadocref page="?org/camunda/bpm/dmn/engine/DmnDecision.html#isDecisionTable()" text="isDecisionTable()" >}} to test if a parsed decision is actually a decision table.

```java
// create a default DMN engine
DmnEngine dmnEngine = DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration()
  .buildEngine();

// read the DMN XML file as input stream
InputStream inputStream = ...

// parse all decision from the input stream
List<DmnDecision> decisions = dmnEngine.parseDecisions(inputStream);

// get the first decision
DmnDecision decision = decisions.get(0);

// do something if it is a decision table
if (decision.isDecisionTable()) {
  // ...
}
```

# Evaluate Decision Tables

To evaluate (or "execute") a decision table, either pass an already transformed {{< javadocref page="?org/camunda/bpm/dmn/engine/DmnDecision.html" text="DmnDecision" >}} or use a DMN model instance or Input Stream in combination with a decision key.

As input to the evaluation, a set of input variables must be provided.

```java
// create a default DMN engine
DmnEngine dmnEngine = DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration()
  .buildEngine();

// read the DMN XML file as input stream
InputStream inputStream = ...;

// parse the DMN decision from the input stream
DmnDecision decision = dmnEngine.parseDecision("decisionKey", inputStream);

// create the input variables
VariableMap variables = ...;

// evaluate the decision table
result = dmnEngine
  .evaluateDecisionTable(decision, variables);
```

## Pass Variables

To provide the input variables for a decision evaluation you can either use a
Java `Map<String, Object>` resp. a `VariableMap` or a `VariableContext`.

The following example shows how to use a `VariableMap`.

```java
// create the input variables
VariableMap variables = Variables.createVariables()
  .putValue("x", "camunda")
  .putValue("y", 2015);

// evaluate the decision table with the input variables
DmnDecisionTableResult result = dmnEngine
  .evaluateDecisionTable(decision, variables);
```

Alternatively, a `VariableContext` can be used.
Use the `VariableContext` to support lazy-loading of variables.

## Interpret the DmnDecisionTableResult

The evaluation of a DMN decision table returns a {{< javadocref
page="?org/camunda/bpm/dmn/engine/DmnDecisionTableResult.html"
text="DmnDecisionTableResult" >}}. The result is a list of the
matching decision rule results. These results are {{< javadocref
page="?org/camunda/bpm/dmn/engine/DmnDecisionRuleResult.html"
text="DmnDecisionRuleResults" >}} which represent a mapping from an output name
to an output value.

Assume the following example decision table which decides which group should
approve an invoice.

{{< img src="../img/assign-approver.png" title="Assign Approver" >}}

The decision table returns two outputs for every matched rule.

Assume that the decision table is executed with the following input variables:

- `amount`: 350
- `invoiceCategory`: "Travel Expenses"

Since the conditions are true, the first and the second rule in the decision table will match.
The `DmnDecisionTableResult` thus consists of two `DmnDecisionRuleResults`.
Both `DmnDecisionRuleResult`s contain the keys `result` and `reason`.

To access these values, the default `java.util.List` and `java.util.Map` methods can be used:

```java
DmnDecisionTableResult tableResult = dmnEngine.evaluateDecisionTable(decision, variables);

// the size will be 2
int size = tableResult.size();

// get first matching rule
DmnDecisionRuleResult ruleResult = tableResult.get(0);

// get output values by name
Object result = ruleResult.get("result");
Object reason = ruleResult.get("reason");
```

The result objects expose additional convenience methods:

```java
DmnDecisionTableResult tableResult = dmnEngine.evaluateDecisionTable(decision, variables);

// returns the first rule result
DmnDecisionRuleResult ruleResult = tableResult.getFirstResult();

// returns first rule result
// but asserts that only a single one exists
tableResult.getSingleResult();

// collects only the entries for an output column
tableResult.collectEntries("result");

// returns the first output entry
ruleResult.getFirstEntry();

// also returns the first output entry
// but asserts that only a single one exists
ruleResult.getSingleEntry();
```

[decision tables]: {{< ref "/reference/dmn11/decision-table/_index.md" >}}
[expressions]: {{< ref "/user-guide/dmn-engine/expressions-and-scripts.md" >}}
