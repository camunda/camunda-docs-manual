---

title: 'Repository Service'
weight: 50

menu:
  main:
    identifier: "user-guide-dmn-model-api-repository-service"
    parent: "user-guide-dmn-model-api"

---


It is also possible to access the DMN model instance by the decision definition id using the [Repository Service]({{< relref "user-guide/process-engine/process-engine-api.md#services-api" >}}), as the following incomplete test sample code shows.

```java
public void testRepositoryService() {
  String decisionDefinitionId = repositoryService.createDecisionDefinitionQuery()
    .decisionDefinitionKey(DECISION_KEY).singleResult().getId();
  DmnModelInstance modelInstance = repositoryService
    .getDmnModelInstance(decisionDefinitionId);
}
```
