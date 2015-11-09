---

title: 'Decision Service in the Process Engine'
weight: 20

menu:
  main:
    name: "Decision Service"
    identifier: "user-guide-process-engine-decisions-service"
    parent: "user-guide-process-engine-decisions"
    pre: "Evaluate Decisions"
---

The decision service is a part of the process engine's services API. It allows to evaluate a decision independent from BPMN and CMMN.

# Evaluating a Decision

A deployed decision definition can be evaluated using the decision service. The decision definition is referenced by id or a combination of key and version. If no version is specified then the latest version of decision definition with the given key is evaluated.

```java
DecisionService decisionService = processEngine.getDecisionService();

VariableMap variables = Variables.createVariables()
  .putValue("status", "bronze")
  .putValue("sum", 1000);

DmnDecisionTableResult decisionResult = decisionService
  .evaluateDecisionByKey("decision-key", variables);
```

## The Decision Key

The key of a decision definition is specified by the `id` attribute of the `decision` element. The different naming is related to the [Versioning of Decisions]({{< relref "user-guide/process-engine/decisions/repository.md#versioning-of-decisions" >}}). Since the key can specifies multiple versions of a decision definition, the id specifies exactly one version. 

## Passing Data

A decision may reference one or more variables. For example, a variable can be referenced in an input expression or an input entry of a decision table. The variables have to pass to the decision service as key-value pairs. Each pair specifies the name and the value of a variable.

# Authorizations for Evaluating Decisions

The user need the permission `CREATE_INSTANCE` on the resource `DECISION_DEFINITION` to evaluate decisions. The resource id of the authorization is the key of the decision definition.

For more information about authorization please refer to the [Authorization Service]({{< relref "user-guide/process-engine/authorization-service.md" >}}).

# Working with the Decision Result

The result of an evaluation is called decision result which is a complex object of type `DmnDecisionTableResult`. Generally, it is a list of key-value pairs. Each entry in the list represents one matched rule. The output entries of this rule are represented by the key-value pairs. The key of a pair is specified by the name of the output. 

The decision result provides methods from interface List\<Map\<String, Object\>\> and some convenience methods.

```java
DmnDecisionTableResult decisionResult = // ...

// get the value of the single output entry of the only matched rule 
String singleValue = decisionResult.getSingleOutput().getSingleValue();

// get the value of the output with name 'result' of the only matched rule
String result = decisionResult.getSingleOutput().get("result");

// get the value of the first output of the second matched rule
String firstValue = decisionResult.get(1).getFirstValue();

// get a list of all values of outputs with name 'result' of all matched rules
List<String> results = decisionResult.collectValues("result");
```

Note that the decision result also provide methods to get typed output entries. A complete list of all methods can be found in the {{< javadocref page="org.camunda.bpm.dmn.engine.DmnDecisionResult" text="Java Docs" >}}.

# History of Evaluated Decisions

When a decision is evaluated then a new history entry of type `HistoricDecisionInstance` is created which contains the inputs and outputs of the decision. The history can be queried by the history service.

```java
List<HistoricDecisionInstance> historicDecisions = processEngine
  .getHistoryService()
  .createHistoricDecisionInstanceQuery()
  .decisionDefinitionKey("decision-key")
  .includeInputs()
  .includeOutputs()
  .list();
```

For more information about this please refer to the [History for DMN Decisions]({{< relref "user-guide/process-engine/decisions/history.md" >}}).
