---

title: 'Built-In Beans'
category: 'Cdi and Java EE Integration'

---

* The ProcessEngine as well as the services are available for injection: `@Inject` ProcessEngine, RepositoryService, TaskService, ...
* The current process instance and task can be injected: @Inject ProcessInstance, Task,
* The current business key can be injected: @Inject @BusinessKey String businessKey,
* The current process instance id be injected: @Inject @ProcessInstanceId String pid.

Process variables are available for injection. camunda-engine-cdi supports

* type-safe injection of `@BusinessProcessScoped` beans using `@Inject [additional qualifiers] Type fieldName`
* unsafe injection of other process variables using the `@ProcessVariable(name?)` qualifier:

  ```
  @Inject
  @ProcessVariable
  private Object accountNumber;

  @Inject
  @ProcessVariable("accountNumber")
  private Object account;
  ```

In order to reference process variables using EL, we have similar options:

* `@Named @BusinessProcessScoped` beans can be referenced directly,
* other process variables can be referenced using the ProcessVariables-bean: `#{processVariables['accountNumber']}`
