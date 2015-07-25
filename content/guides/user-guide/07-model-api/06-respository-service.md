---

title: 'Repository Service'
weight: 50

menu:
  main:
    identifier: "user-guide-model-api-repository-service"
    parent: "user-guide-model-api"

---

It is also possible to access the BPMN model instance by the process definition id using the [Repository Service][1]. As the
following incomplete test sample code shows. Please see the [generate-jsf-form][2] quickstart for a complete example.

```java
public void testRepositoryService() {
  runtimeService.startProcessInstanceByKey(PROCESS_KEY);
  String processDefinitionId = repositoryService.createProcessDefinitionQuery()
    .processDefinitionKey(PROCESS_KEY).singleResult().getId();
  BpmnModelInstance modelInstance = repositoryService.getBpmnModelInstance(processDefinitionId);
}
```

[1]: #process-engine-process-engine-api-services-api
[2]: https://github.com/camunda/camunda-bpm-examples/tree/master/bpmn-model-api/generate-jsf-form
