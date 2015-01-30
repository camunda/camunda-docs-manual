---

title: 'Built-In Beans'
category: 'CDI and Java EE Integration'

---

* The ProcessEngine as well as the services are available for injection: `@Inject` ProcessEngine, RepositoryService, TaskService, ...
* A specific named ProcessEngine and its services can be injected by adding the qualifier `@ProcessEngineName('someEngine')`
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

### Injecting a process engine based on contextual data

While a specific process engine can be accessed by adding the qualifier `@ProcessEngineName('name')` to the injection point, this requires that it is known which process engine is used at design time. A more flexible approach is to resolve the process engine at runtime based on contextual information such as the logged in user. In this case, `@Inject` can be used without a `@ProcessEngineName` annotation.

To implement resolution from contextual data, the producer bean `org.camunda.bpm.engine.cdi.impl.ProcessEngineServicesProducer` must be extended. The following code implements a contextual resolution of the engine by the currently authenticated user. Note that which contextual data is used and how it is accessed is entirely up to you.

```java
@Specializes
public class UserAwareEngineServicesProvider extends ProcessEngineServicesProducer {

  // User can be any object containing user information from which the tenant can be determined
  @Inject
  private UserInfo user;

  @Specializes @Produces @RequestScoped
  public ProcessEngine processEngine() {

    // okay, maybe this should involve some more logic ;-)
    String engineForUser = user.getTenant();

    ProcessEngine processEngine =  BpmPlatform.getProcessEngineService().getProcessEngine(engineForUser);
    if(processEngine != null) {
      return processEngine;

    } else {
      return ProcessEngines.getProcessEngine(engineForUser, false);

    }
  }

  @Specializes @Produces @RequestScoped
  public RuntimeService runtimeService() {
    return processEngine().getRuntimeService();
  }

  @Specializes @Produces @RequestScoped
  public TaskService taskService() {
    return processEngine().getTaskService();
  }

  ...
}
```

The above code makes selecting the process engine based on the current user's tenant completely transparent. For each request, the currently authenticated user is retrieved and the correct process engine is looked up. Note that the class `UserInfo` represents any kind of context object that identifies the current tenant. For example, it could be a JAAS principal. The produced engine can be accessed in the following way:

```java
@Inject
private RuntimeService runtimeService;
```
