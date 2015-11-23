---

title: 'Repository Service'
weight: 50

menu:
  main:
    identifier: "user-guide-bpmn-model-api-repository-service"
    parent: "user-guide-bpmn-model-api"

---


It is also possible to access the BPMN model instance by the process definition id using the [Repository Service]({{< relref "user-guide/process-engine/process-engine-api.md#services-api" >}}). As the following incomplete test sample code shows. Please see the [generate-jsf-form](https://github.com/camunda/camunda-bpm-examples/tree/master/bpmn-model-api/generate-jsf-form) quickstart for a complete example.

```java
public void testRepositoryService() {
  runtimeService.startProcessInstanceByKey(PROCESS_KEY);
  String processDefinitionId = repositoryService.createProcessDefinitionQuery()
    .processDefinitionKey(PROCESS_KEY).singleResult().getId();
  BpmnModelInstance modelInstance = repositoryService.getBpmnModelInstance(processDefinitionId);
}
```
