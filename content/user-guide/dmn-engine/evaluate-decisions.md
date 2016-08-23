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

A DMN XML file can contain multiple decisions - grouped by the [decision requirements graph]. To distinguish the decisions,
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

## Parse Decision Requirements Graph

In addition to parsing all contained decisions of a [decision requirements graph]({{< relref "reference/dmn11/drg/index.md" >}}) (a.k.a. DRG), the DMN engine can also parse the DRG itself from an `InputStream` or a `DmnModelInstance`. 

```java
// parse the drg from an input stream
DmnDecisionRequirementsGraph drg = dmnEngine.parseDecisionRequirementsGraph(inputStream);

// get the keys of all containing decisions
Set<String> decisionKeys = drg.getDecisionKeys();

// get a containing decision by key
DmnDecision decision = drg.getDecision("decision");

// get all containing decisions
Collection<DmnDecision> decisions = drg.getDecisions();
```

The DRG is represented in the XML by the `definitions` element. The `id` of the DRG in the XML is called `key` in the context of the DMN engine. 

## Decision Tables only

It is possible to chack if a parsed decision is implemented as [decision table] by using the method {{< javadocref page="?org/camunda/bpm/dmn/engine/DmnDecision.html#isDecisionTable()" text="isDecisionTable()" >}}.

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

To evaluate (or "execute") a decision, either pass an already transformed {{< javadocref page="?org/camunda/bpm/dmn/engine/DmnDecision.html" text="DmnDecision" >}} or use a DMN model instance or input stream in combination with a decision key.

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

// evaluate the decision
result = dmnEngine.evaluateDecision(decision, variables);

// or if the decision is implemented as decision table then you can also use
result = dmnEngine.evaluateDecisionTable(decision, variables);
```

If a decision has the list of required decisions, then the decision is evaluated after the evaluation of all the required decisions.

## Pass Variables

To provide the input variables for a decision evaluation you can use a
Java `Map<String, Object>`, resp. a `VariableMap` or a `VariableContext`.

The following example shows how to use a `VariableMap`.

```java
// create the input variables
VariableMap variables = Variables.createVariables()
  .putValue("x", "camunda")
  .putValue("y", 2015);

// evaluate the decision with the input variables
result = dmnEngine.evaluateDecision(decision, variables);
```

Alternatively, a `VariableContext` can be used.
Use the `VariableContext` to support lazy-loading of variables.

## Interpret the Decision Result

<!--
The evaluation of a DMN decision returns a {{< javadocref page="?org/camunda/bpm/dmn/engine/DmnDecisionResult.html"
text="DmnDecisionResult" >}} or a {{< javadocref page="?org/camunda/bpm/dmn/engine/DmnDecisionTableResult.html"
text="DmnDecisionTableResult" >}} if the decision is implemented as decision table and evaluated using `evaluateDecisionTable()`.
Both results are semantically equal and provide the same methods.
-->

The evaluation of a DMN decision returns a {{< javadocref page="?org/camunda/bpm/dmn/engine/DmnDecisionResult.html"
text="DmnDecisionResult" >}}. If the decision is implemented as [decision table] then the result is a list of the
matching decision rule results. These results represent a mapping from an output name to an output value.

If the decision is instead implemented as [decision literal expression] then the result is a list 
which contains only one entry. This entry represents the expression value and is mapped by the variable name.

<!--
The evaluation of a DMN decision table returns a {{< javadocref
page="?org/camunda/bpm/dmn/engine/DmnDecisionTableResult.html"
text="DmnDecisionTableResult" >}}. The result is a list of the
matching decision rule results. These results are {{< javadocref
page="?org/camunda/bpm/dmn/engine/DmnDecisionRuleResult.html"
text="DmnDecisionRuleResults" >}} which represent a mapping from an output name
to an output value.
-->

Assume the following example of making a decision to select a dish.

{{< img src="../img/dmn.png" title="Select Dish" >}}

The decision table returns the `desiredDish` as the output.

Assume that the decision table is executed with the following input variables:

- `season`: "Winter" 
- `guestCount`: 7 

There is a matching rule in the table for the given inputs.
The `DmnDecisionResult` thus consists of one `DmnDecisionResultEntries` which contains the key `desiredDish`.

To access the output value, `get()` method of `DmnDecisionResultEntries` is used:

```java
DmnDecisionResult decisionResult = dmnEngine.evaluateDecision(decision, variables);

// the size will be 1
int size = decisionResult.size();

// get the matching rule
DmnDecisionResultEntries ruleResult = decisionResult.get(0);

// get output values by name
Object result = ruleResult.get("desiredDish");
```

The result objects expose additional convenience methods:

```java
DmnDecisionResult decisionResult = dmnEngine.evaluateDecision(decision, variables);

// returns the first rule result
DmnDecisionResultEntries ruleResult = decisionResult.getFirstResult();

// returns first rule result
// but asserts that only a single one exists
decisionResult.getSingleResult();

// collects only the entries for an output column
decisionResult.collectEntries("desiredDish");

// returns the first output entry
ruleResult.getFirstEntry();

// also returns the first output entry
// but asserts that only a single one exists
ruleResult.getSingleEntry();

// shortcut to returns the single output entry of the single rule result
// - combine getSingleResult() and getSingleEntry()
decisionResult.getSingleEntry();
```

Note that the decision can also be evaluated using the 
{{< javadocref page="?org/camunda/bpm/dmn/engine/DmnEngine.html##evaluateDecisionTable(org.camunda.bpm.dmn.engine.DmnDecision, java.util.Map)"
text="evaluateDecisionTable()" >}} method if it is implemented as [decision table]. In this case, evaluation returns a {{< javadocref page="?org/camunda/bpm/dmn/engine/DmnDecisionTableResult.html" text="DmnDecisionTableResult" >}} which is semantically equal and provides the same methods as a
`DmnDecisionResult`.

## Decision Evaluation with Required decisions

The decision evaluation requires the evaluation result of all the required decisions as an input.

Assume the following example of making a decision to select a dish.
{{< img src="../img/drd.png" title="Select dish" >}}

Decision to be evaluated: `Dish`

Required Decisions: `Season` and `GuestCount`

`Dish` decision is evaluated after the evaluation of `Season` and `GuestCount`.

Results of `Season` and `GuestCount` are applied as input to `Dish` decision for evaluation.
 
Assume that the decision is executed with the following input variables:

- `temperature`: 35
- `dayType`: "WeekDay"

With the above input, `season` decision table has one matching rule and generates an output value `Summer` that is mapped to the output variable `season`.
`GuestCount` decision has one matching rule with the input `dayType` and generates an output value `4` that is mapped to the output variable `guestCount`.

The output results of the decisions `Season` and `GuestCount` are used as inputs of the `Dish` decision. A decision can access the result (i.e., output value) of a required decision by its output name (e.g., `season` of the Season decision). If the required decision has multiple matched rules, then the decision gets a list of all output values instead of the single value.

The `Dish` decision has one matching rule with the inputs generated by the required decisions and generates the output `Bean salad`.

```java
// the inputs are `temperature` = `35` and `dayType` = `WeekDay`
DmnDecisionResult decisionResult = dmnEngine.evaluateDecision(decision, variables);

// output is `Beans salad`
String desiredDish = decisionResult.getSingleEntry();
```

[decision table]: {{< relref "reference/dmn11/decision-table/index.md" >}}
[decision literal expression]: {{< relref "reference/dmn11/decision-literal-expression/index.md" >}}
[decision requirements graph]: {{< relref "reference/dmn11/drg/index.md" >}}
