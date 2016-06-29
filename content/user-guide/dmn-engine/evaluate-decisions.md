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

A DMN XML file can contain multiple decisions - grouped by the [decision requirement diagram]. To distinguish the decisions,
every decision must have an `id` attribute.

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
engine. To only parse a specific decision from a DMN file, you specify the decision
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

## Parse Decision Requirement Diagrams

In addition to parse all containing decisions of a [decision requirement diagram]({{< relref "reference/dmn11/drd/index.md" >}}) (aka DRD), the DMN engine can also parse the DRD from an `InputStream` or a `DmnModelInstance` itself. 

```java
// parse the drd from an input stream
DmnDecisionRequirementDiagram drd = dmnEngine.parseDecisionRequirementDiagram(inputStream);

// get the keys of all containing decisions
Set<String> decisionKeys = drd.getDecisionKeys();

// get a containing decision by key
DmnDecision decision = drd.getDecision("decision");

// get all containing decisions
Collection<DmnDecision> decisions = drd.getDecisions();
```

The DRD is represented in the XML by the `definitions` element. The `id` of the DRD in the XML is called `key` in the context of the DMN engine. 

## Decision Tables only

Currently the DMN engine only supports DMN 1.1 decisions with [decision tables]. Other decisions
will be ignored. Use the method {{< javadocref page="?org/camunda/bpm/dmn/engine/DmnDecision.html#isDecisionTable()" text="isDecisionTable()" >}} to test if a parsed decision is actually implemented as decision table.

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

# Evaluate Decisions

To evaluate (or "execute") a decision, either pass an already transformed {{< javadocref page="?org/camunda/bpm/dmn/engine/DmnDecision.html" text="DmnDecision" >}} or use a DMN model instance or Input Stream in combination with a decision key.

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

If a decision has the list of required decision then, the decision is evaluated after the evaluation of all the required decisions.

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

Assume the following example of making a decision for selecting a dish.

{{< img src="../img/dmn.png" title="Select Dish" >}}

The decision table returns the `desiredDish` as the output.

Assume that the decision table is executed with the following input variables:

- `season`: "Winter" 
- `guestCount`: 7 

There is a matching rule in the table for the given inputs.
The `DmnDecisionTableResult` thus consists of one `DmnDecisionRuleResult`.
`DmnDecisionRuleResult` contains the key `desiredDish`.

To access the output value, `get` method of `DmnDecisionRuleResult` is used:

```java
DmnDecisionTableResult tableResult = dmnEngine.evaluateDecisionTable(decision, variables);

// the size will be 1
int size = tableResult.size();

// get the matching rule
DmnDecisionRuleResult ruleResult = tableResult.get(0);

// get output values by name
Object result = ruleResult.get("desiredDish");
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
tableResult.collectEntries("desiredDish");

// returns the first output entry
ruleResult.getFirstEntry();

// also returns the first output entry
// but asserts that only a single one exists
ruleResult.getSingleEntry();
```

## Decision Evaluation with Required decisions

The decision evaluation requires the evaluation result of all the required decision as a input.

Assume the following example of making a decision for selecting a dish.
{{< img src="../img/drd.png" title="Select dish" >}}

Decision to be evaluated: `Dish`

Required Decisions: `Season` and `GuestCount`

`Dish` decision is evaluated after the evaluation of `Season` and `GuestCount`.

Results of `Season` and `GuestCount` is applied as a input to `Dish` decision for evaluation.
 
Assume that the decision is executed with the following input variables:

- `temperature`: 35
- `dayType`: "WeekDay"

With the above input, `season` decision table has one matching rule and generates a output value `Summer` that is mapped to the output variable `season`.
`GuestCount` decision has one matching rule with the input `dayType` and generates a output value `4` that is mapped to the output variable `guestCount`.

The output result of the decisions `Season` and `GuestCount` are [mapped] to the inputs of the `Dish` decision.
`Dish` decision has one matching rule with the inputs generated by the required decions and generates the output `Beans salad`.

```java
// `variables` is of type `java.util.Map` and has the input entries 
35 for `temperature` and "WeekDay" for `dayType`
DmnDecisionTableResult tableResult = dmnEngine.evaluateDecisionTable(decision, variables);

// the size will be 1
int size = tableResult.size();

// get the matching rule
DmnDecisionRuleResult ruleResult = tableResult.get(0);

// `result` contains a `java.lang.String` output with the value `Beans salad`
Object result = ruleResult.get("desiredDish");
```

[mapped]: {{< relref "reference/dmn11/drd/index.md#required-decision-mapping" >}}
[decision tables]: {{< relref "reference/dmn11/decision-table/index.md" >}}
[decision requirement diagram]: {{< relref "reference/dmn11/drd/index.md" >}}
