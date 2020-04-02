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
<definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" id="definitions" name="definitions" namespace="http://camunda.org/schema/1.0/dmn">
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

In addition to parsing all contained decisions of a [decision requirements graph]({{< ref "/reference/dmn11/drg/_index.md" >}}) (DRG), the DMN engine can also parse the DRG itself from an `InputStream` or a `DmnModelInstance`.

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

It is possible to check if a parsed decision is implemented as [decision table] by using the method {{< javadocref page="?org/camunda/bpm/dmn/engine/DmnDecision.html#isDecisionTable()" text="isDecisionTable()" >}}.

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

The evaluation of a DMN decision returns a {{< javadocref page="?org/camunda/bpm/dmn/engine/DmnDecisionResult.html"
text="DmnDecisionResult" >}}. If the decision is implemented as [decision table] then the result is a list of the
matching decision rule results. These results represent a mapping from an output name to an output value.

If the decision is instead implemented as [decision literal expression] then the result is a list
which contains only one entry. This entry represents the expression value and is mapped to the variable name.

Assume the following example of making a decision to select a dish.

{{< img src="../img/dish-dmn.png" title="Select Dish" >}}

The decision table returns the `desiredDish` as the output.

Assume that the decision table is executed with the following input variables:

- `season`: "Spring"
- `guestCount`: 14

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

## Decisions with Required Decisions

If a decision has one or more [required decisions], then the required decisions are evaluated first. The results of this evaluations are passed as input for the evaluation of the decision.

Assume the following example of making a decision to select beverages.

{{< img src="../img/beverages-dmn.png" title="Beverages Decision" >}}

The following [decision requirements diagram] shows that the `Beverages` decision requires the `Dish` decision (from the previous example).  

{{< img src="../img/drd.png" title="Select beverages" >}}

When the `Beverages` decision is evaluated then the DMN engine evaluates the `Dish` decision first.

Assume that the decision is evaluated with the following input variables:

- `season`: "Spring"
- `guestCount`: 14
- `guestsWithChildren`: false 

With the above inputs, `Dish` decision table has one matching rule and generates the output value `Stew` that is mapped to the output variable `desiredDish`.

The output result of the `Dish` decision is used as input of the `Beverages` decision. That means that the input expression `desiredDish` of the `Beverages` decision returns the output value `Stew` of the `Dish` decision. In general, a decision can access the results (i.e., the output values) of required decisions by there output name.

As result, the `Beverages` decision has two matching rules and generates the output values `Guiness` and `Water`.

```java
DmnDecision decision = dmnEngine.parseDecision("beverages", inputStream);

DmnDecisionResult decisionResult = dmnEngine.evaluateDecision(decision, variables);

List<String> beverages = decisionResult.collectEntries("beverages");
```

## Hit Policy of Required Decisions

The [hit policy] of a required decision can affect the result that is passed as input to the requiring decision. If the required decision has a [COLLECT] hit policy with aggregator then the decision result (i.e. output value) is only the aggregated value. 

In case of a hit policy with multiple matched rules (i.e., [COLLECT] without aggregator or [RULE ORDER]), the output variable is mapped to a list of output values, even if only one rule matched.

[decision table]: {{< ref "/reference/dmn11/decision-table/_index.md" >}}
[decision literal expression]: {{< ref "/reference/dmn11/decision-literal-expression/_index.md" >}}
[decision requirements graph]: {{< ref "/reference/dmn11/drg/_index.md" >}}
[decision requirements diagram]: {{< ref "/reference/dmn11/drg/_index.md" >}}
[required decisions]: {{< ref "/reference/dmn11/drg/_index.md#required-decisions" >}}
[hit policy]: {{< ref "/reference/dmn11/decision-table/hit-policy.md" >}}
[COLLECT]: {{< ref "/reference/dmn11/decision-table/hit-policy.md#collect-hit-policy" >}}
[RULE ORDER]: {{< ref "/reference/dmn11/decision-table/hit-policy.md#rule-order-hit-policy" >}}
