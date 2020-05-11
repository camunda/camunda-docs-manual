---

title: 'Decision Service in the Process Engine'
weight: 30

menu:
  main:
    name: "Decision Service"
    identifier: "user-guide-process-engine-decisions-service"
    parent: "user-guide-process-engine-decisions"
    pre: "Evaluate Decisions using the Services API"
---

The decision service is a part of the process engine's [Services API]. It allows
to evaluate a deployed decision definition independently from BPMN and CMMN.

# Evaluating a Decision

To evaluate a deployed decision, reference it by id or a combination of key and version. If
a key is used but no version is specified then the latest version of decision
definition with the given key is evaluated.

```java
DecisionService decisionService = processEngine.getDecisionService();

VariableMap variables = Variables.createVariables()
  .putValue("status", "bronze")
  .putValue("sum", 1000);

DmnDecisionResult decisionResult = decisionService
  .evaluateDecisionByKey("decision-key")
  .variables(variables)
  .evaluate(); 
  
// alternatively for decision tables only
DmnDecisionTableResult decisionResult = decisionService
  .evaluateDecisionTableByKey("decision-key")
  .variables(variables)
  .evaluate(); 
```

## The Decision Key

The key of a decision definition is specified by the `id` attribute of the
`decision` element in the DMN XML. The different naming is related to the
[Versioning of Decisions]. Since a key can reference multiple versions of a
decision definition, the id specifies exactly one version.

## Passing Data

A decision may reference one or more variables. For example, a variable can be
referenced in an input expression or an input entry of a decision table. The
variables are passed to the decision service as key-value pairs. Each pair
specifies the name and the value of a variable.

For more information on the different expressions see the [DMN 1.3 reference].

# Authorizations for Evaluating Decisions

The user needs the permission `CREATE_INSTANCE` on the resource
`DECISION_DEFINITION` to evaluate decisions. The resource id of the
authorization is the decision definition key.

For more information about authorizations please refer to the [Authorization
Service] section.

# Working with the Decision Result

The result of an evaluation is called decision result. The decision result is a complex object
of type `DmnDecisionResult`. Think of it as a list of key-value pairs.

If the decision is implemented as [decision table] then each entry in the list represents one matched rule. The output entries of this
rule are represented by the key-value pairs. The key of a pair is specified by
the name of the output.

Instead, if the decision is implemented as [decision literal expression] then the list contains only one entry. This entry represents the expression value and is mapped by the variable name.

The decision result provides methods from interface `List<Map<String,
Object>>` and some convenience methods.

```java
DmnDecisionResult decisionResult = ...;

// get the value of the single entry of the only matched rule
String singleEntry = decisionResult.getSingleResult().getSingleEntry();

// get the value of the result entry with name 'result' of the only matched rule
String result = decisionResult.getSingleResult().getEntry("result");

// get the value of the first entry of the second matched rule
String firstValue = decisionResult.get(1).getFirstEntry();

// get a list of all entries with the output name 'result' of all matched rules
List<String> results = decisionResult.collectEntries("result");

// shortcut to get the single output entry of the single rule result
// - combine getSingleResult() and getSingleEntry()
String result = decisionResult.getSingleEntry();
```

Note that the decision result also provides methods to get typed output entries.
A complete list of all methods can be found in the {{< javadocref
page="?org/camunda/bpm/dmn/engine/DmnDecisionResult" text="Java Docs" >}}.

If the decision is implemented as [decision table] then it can also be evaluated using one of the 
{{< javadocref page="?org/camunda/bpm/engine/DecisionService.html##evaluateDecisionTableByKey(java.lang.String)"
text="evaluateDecisionTable" >}} methods. In this case, the evaluation returns a {{< javadocref page="?org/camunda/bpm/dmn/engine/DmnDecisionTableResult.html" text="DmnDecisionTableResult" >}} which is semantically equal and provide the same methods as a
`DmnDecisionResult`.

# History of Evaluated Decisions

When a decision is evaluated, a new history entry of type
`HistoricDecisionInstance` is created which contains the inputs and outputs of
the decision. The history can be queried by the history service.

```java
List<HistoricDecisionInstance> historicDecisions = processEngine
  .getHistoryService()
  .createHistoricDecisionInstanceQuery()
  .decisionDefinitionKey("decision-key")
  .includeInputs()
  .includeOutputs()
  .list();
```

For more information about this, please refer to the [History for DMN Decisions].

[decision table]: {{< ref "/reference/dmn/decision-table/_index.md" >}}
[decision literal expression]: {{< ref "/reference/dmn/decision-literal-expression/_index.md" >}}
[Services API]: {{< ref "/user-guide/process-engine/process-engine-api.md#services-api" >}}
[DMN 1.3 reference]: {{< ref "/reference/dmn/decision-table/_index.md" >}}
[Versioning of Decisions]: {{< ref "/user-guide/process-engine/decisions/repository.md#versioning-of-decisions" >}}
[Authorization Service]: {{< ref "/user-guide/process-engine/authorization-service.md" >}}
[History for DMN Decisions]: {{< ref "/user-guide/process-engine/decisions/history.md" >}}
