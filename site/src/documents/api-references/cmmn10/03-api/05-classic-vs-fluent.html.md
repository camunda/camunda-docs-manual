---

title: 'Classic vs Fluent API'
category: 'API'

keywords: 'caseservice case api fluent non-fluent nonfluent classic'

---

<!-- move this to the user guide as soon as there is a concept on how separate CMMN and BPMN concerns in it -->

The `CaseService` offers two API variants. One is in the following referred to as the *classic* API, since it is very similar to the API offered by the `RuntimeService` for BPMN processes. The *fluent* API follows a different concept in that it allows to compose case service commands by method chaining.

## Classic and Fluent API by Example

As an example, the `CaseService` offers two classic methods to manually start a task: 

```java
caseService.manuallyStartCaseExecution(caseExecutionId);

Map<String, Object> variables = new HashMap<String, Object>();
variables.put("aVaraibleToSet", "aValueToSet");

caseService.manuallyStartCaseExecution(caseExecutionId, variables);
```

The same can be expressed using the fluent API as follows:

```java
caseService
  .withCaseExecution(caseExecutionId)
  .manualStart();
  
Map<String, Object> variables = new HashMap<String, Object>();
variables.put("aVaraibleToSet", "aValueToSet");
  
caseService
  .withCaseExecution(caseExecutionId)
  .setVariables(variables)
  .manualStart();
```

In this way, the fluent API is another, fluently readable way of expressing the same functionality. On top, the fluent API allows due to its flexibility to express very specific interactions that the classic API does not offer. For example, the following snippet manually starts a case execution, sets variables and removes another variable in one command (and therefore transaction):

```java
Map<String, Object> variables = new HashMap<String, Object>();
variables.put("aVaraibleToSet", "aValueToSet");

caseService
  .withCaseExecution(caseExecutionId)
  .setVariables(variables)
  .removeVariable("aVariableToRemove")
  .manualStart();
```


## Entry Points to the Fluent API

The fluent API can be used to work with case definitions and case executions. The entry points are as follows:

* `caseService.withCaseDefinition(caseDefinitionId)`: Offers interactions on the case definition that has the provided id, such as creating a new case instance.
* `caseService.withCaseDefinitionByKey(caseDefinitionKey)`: Offers interactions on the case definition that has the latest version of those that have the provided key.
* `caseService.withCaseExecution(caseExecutionId)`: Offers interactions on case executions, such as starting and completing tasks.