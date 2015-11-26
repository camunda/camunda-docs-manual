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

The DMN engine provides a {{< javadocref page="?org/camunda/bpm/dmn/engine/DmnEngine.html" text="interface" >}} to parse and evaluate DMN decisions.

# Parse Decisions

To parse a decision you can either pass a `InputStream` or a {{< javadocref page="?org/camunda/bpm/model/dmn/DmnModelInstance.html" text="DmnModelInstance" >}} to the DMN engine.

```java
// create a default DMN engine
DmnEngine dmnEngine = DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration()
  .buildEngine();

// read a DMN model instance from a file
DmnModelInstance dmnModelInstance = Dmn.readModelFromFile(...);

// parse all decision from the DMN model instance
List<DmnDecision> decisions = dmnEngine.parseDecisions(dmnModelInstance);

// or read the DMN XML file as input stream
InputStream inputStream = ...
// and parse all decision from the input stream
decisions = dmnEngine.parseDecisions(dmnModelInstance);
```

## The Decision Key

A DMN XML file can contain multiple decisions. To distinguish the decisions
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
engine. So if you want to parse a specific decision from a DMN file you
have to specify the decision key which corresponds to the `id` attribute in
the XML file.

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
will be ignored. If you want to test that a decision actually is a decision
table you can use the method {{< javadocref page="?org/camunda/bpm/dmn/engine/DmnDecision.html#isDecisionTable()" text="isDecisionTable()" >}}.

```java
// create a default DMN engine
DmnEngine dmnEngine = DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration()
  .buildEngine();

// read the DMN XML file as input stream
InputStream inputStream = ...

// parse all decision from the DMN model instance
List<DmnDecision> decisions = dmnEngine.parseDecisions(dmnModelInstance);

// get the first decision
DmnDecision decision = decisions.get(0);

// do something if it is a decision table
if (decision.isDecisionTable()) {
  // ...
}
```

# Evaluate Decision Tables

The DMN engine can evaluated DMN 1.1 [decision tables]. To evaluate a decision
table you can either pass an already transformed {{< javadocref page="?org/camunda/bpm/dmn/engine/DmnDecision.html" text="DmnDecision" >}}. Or you can use a DMN model instance
or Input Stream in combination with a decision key.

As the decision table consist of multiple expressions you have to specify the
set of input variables which are used to evaluate these expression. For more
information on the supported expressions see the corresponding
[section][expressions].

```java
// create a default DMN engine
DmnEngine dmnEngine = DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration()
  .buildEngine();

// load DMN file
InputStream inputStream = ...;

// or read a DMN model instance from a file
DmnModelInstance dmnModelInstance = Dmn.readModelFromFile(...);

// or parse a DMN decision
DmnDecision decision = dmnEngine.parseDecision(...);

// create the input variables
VariableMap variables = Variables.createVariables()
  .putValue("x", "camunda")
  .putValue("y", 2015);

// evaluate decision tables
DmnDecisionTableResult result = dmnEngine
  .evaluateDecisionTable("myDecision", inputStream, variables);
result = dmnEngine
  .evaluateDecisionTable("myDecision", dmnModelInstance, variables);
result = dmnEngine
  .evaluateDecisionTable(decision, variables);
```

## Pass Variables

To provide the input variables for a decision evaluation you can either use a
Java `Map<String, Object>` resp. a `VariableMap` or a `VariableContext`. A
`VariableContext` should be used if it is desirable to implement lazy-loading
of variables.

```java
// create a default DMN engine
DmnEngine dmnEngine = DmnEngineConfiguration
  .createDefaultDmnEngineConfiguration()
  .buildEngine();

// parse a DMN decision
DmnDecision decision = dmnEngine.parseDecision(...);

// create the input variables
VariableMap variables = ...;

// or a variable context
VariableContext variableContext = ...;

// evaluate decision tables
DmnDecisionTableResult result = dmnEngine
  .evaluateDecisionTable(decision, variables);
result = dmnEngine
  .evaluateDecisionTable(decision, variableContext);
```


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

The decision table returns for every matched rule two outputs.

Assuming the input is:

- `amount`: 350
- `invoiceCategory`: "Travel Expenses"

The decision rules 1 and 2 with match. So the `DmnDecisionTableResult` consist
of two `DmnDecisionRuleResults`. Whereas both `DmnDecisionRuleResult` will
contain the keys `result` and `reason`.

You can access them in Java using normal list and map methods:

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

Additionally the result objects have methods to easily access common result
cases.

```java
DmnDecisionTableResult tableResult = dmnEngine.evaluateDecisionTable(decision, variables);

// will return first rule result
DmnDecisionRuleResult ruleResult = tableResult.getFirstResult();

// will also return first rule result
// but asserts that only one exists
tableResult.getSingleResult();

// collect only the entries for on output column
tableResult.collectEntries("result");

// will return first output entry
ruleResult.getFirstEntry();

// will also return first output entry
// but asserts that only one exists
ruleResult.getSingleEntry();
```


[decision tables]: {{< relref "reference/dmn11/decision-table/index.md" >}}
[expressions]: {{< relref "user-guide/dmn-engine/expressions-and-scripts.md" >}}
