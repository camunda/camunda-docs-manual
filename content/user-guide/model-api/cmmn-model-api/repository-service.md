---

title: 'Repository Service'
weight: 50

menu:
  main:
    identifier: "user-guide-cmmn-model-api-repository-service"
    parent: "user-guide-cmmn-model-api"

---


It is also possible to access the CMMN model instance by the case definition id using the [Repository Service]({{< ref "/user-guide/process-engine/process-engine-api.md#services-api" >}}). As the following incomplete test sample code shows.

```java
public void testRepositoryService() {
  String caseDefinitionId = repositoryService.createCaseDefinitionQuery()
    .caseDefinitionKey(CASE_KEY).singleResult().getId();
  CmmnModelInstance modelInstance = repositoryService
    .getCmmnModelInstance(caseDefinitionId);
}
```
