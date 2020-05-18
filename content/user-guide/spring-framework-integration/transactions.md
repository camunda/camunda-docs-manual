---

title: 'Spring Transaction Integration'
weight: 20

menu:
  main:
    name: "Transactions"
    identifier: "user-guide-spring-framework-integration-transactions"
    parent: "user-guide-spring-framework-integration"
    pre: "Integrate Spring-Managed Transactions"

---

# Transaction Integration by Example

The following explains the [SpringTransactionIntegrationTest](https://github.com/camunda/camunda-bpm-platform/blob/7.12.0/engine-spring/core/src/test/java/org/camunda/bpm/engine/spring/test/transaction/SpringTransactionIntegrationTest.java) of the core codebase step by step. Below is the Spring configuration file that we use in this example (you can find it in [SpringTransactionIntegrationTest-context.xml](https://github.com/camunda/camunda-bpm-platform/blob/7.12.0/engine-spring/core/src/test/resources/org/camunda/bpm/engine/spring/test/transaction/SpringTransactionIntegrationTest-context.xml)). The section shown below contains the `dataSource`, `transactionManager`, `processEngine` and the process engine services.

When passing the DataSource to the `SpringProcessEngineConfiguration` (using property "dataSource"), the Camunda engine uses a `org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy` internally, which wraps the passed DataSource. This is done to make sure the SQL connections retrieved from the DataSource and the Spring transactions play well together. This implies that it's no longer needed to proxy the dataSource yourself in Spring configuration, although it's still allowed to pass a `TransactionAwareDataSourceProxy` into the `SpringProcessEngineConfiguration`. In this case no additional wrapping will occur.

Make sure when declaring a `TransactionAwareDataSourceProxy` in Spring configuration yourself, that you don't use it for resources that are already aware of Spring-transactions (e.g., `DataSourceTransactionManager` and `JPATransactionManager` need the un-proxied dataSource).

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-2.5.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-3.0.xsd">

  <bean id="dataSource" class="org.springframework.jdbc.datasource.SimpleDriverDataSource">
    <property name="driverClass" value="org.h2.Driver" />
    <property name="url" value="jdbc:h2:mem:camunda;DB_CLOSE_DELAY=1000" />
    <property name="username" value="sa" />
    <property name="password" value="" />
  </bean>

  <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource" />
  </bean>

  <bean id="processEngineConfiguration" class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
    <property name="dataSource" ref="dataSource" />
    <property name="transactionManager" ref="transactionManager" />
    <property name="databaseSchemaUpdate" value="true" />
    <property name="jobExecutorActivate" value="false" />
  </bean>

  <bean id="processEngine" class="org.camunda.bpm.engine.spring.ProcessEngineFactoryBean">
    <property name="processEngineConfiguration" ref="processEngineConfiguration" />
  </bean>

  <bean id="repositoryService" factory-bean="processEngine" factory-method="getRepositoryService" />
  <bean id="runtimeService" factory-bean="processEngine" factory-method="getRuntimeService" />
  <bean id="taskService" factory-bean="processEngine" factory-method="getTaskService" />
  <bean id="historyService" factory-bean="processEngine" factory-method="getHistoryService" />
  <bean id="managementService" factory-bean="processEngine" factory-method="getManagementService" />

  ...
</beans>
```
  
{{< note title="" class="warning" >}}
  The `processEngineConfiguration` attributes `transactionManager` and `dataSource` must be configured consistently, 
  i.e. the `transactionManager` bean must actually manage the data source. If that is not the case, the process engine will use auto-commit mode for the data source connection, potentially leading to inconsistencies in the database.
{{< /note >}}

The remainder of that Spring configuration file contains the beans and configuration that we'll use in this particular example:

```xml
<beans>
  ...
  <tx:annotation-driven transaction-manager="transactionManager"/>

  <bean id="userBean" class="org.camunda.bpm.engine.spring.test.UserBean">
    <property name="runtimeService" ref="runtimeService" />
  </bean>

  <bean id="printer" class="org.camunda.bpm.engine.spring.test.Printer" />

</beans>
```

First, the application context is created with any of the Spring ways to do that. In this example you could use a classpath XML resource to configure our Spring application context:

```java
ClassPathXmlApplicationContext applicationContext =
    new ClassPathXmlApplicationContext("mytest/SpringTransactionIntegrationTest-context.xml");
```

or, since it is a test:

```java
@ContextConfiguration("classpath:mytest/SpringTransactionIntegrationTest-context.xml")
```

Then we can get the service beans and invoke methods on them. The ProcessEngineFactoryBean will have added an extra interceptor to the services that applies `Propagation.REQUIRED` transaction semantics on the engine service methods. So, for example, we can use the repositoryService to deploy a process like this:

```java
RepositoryService repositoryService = (RepositoryService) applicationContext.getBean("repositoryService");
String deploymentId = repositoryService
  .createDeployment()
  .addClasspathResource("mytest/hello.bpmn20")
  .addClasspathResource("mytest/hello.png")
  .deploy()
  .getId();
```

The other way around also works. In this case, the Spring transaction will be around the `userBean.hello()` method and the engine service method invocation will join that same transaction.

```java
UserBean userBean = (UserBean) applicationContext.getBean("userBean");
userBean.hello();
```

The `UserBean` looks like this. Remember from above in the Spring bean configuration we injected the repositoryService into the userBean.

```java
public class UserBean {

  // injected by Spring
  private RuntimeService runtimeService;

  @Transactional
  public void hello() {
    // here you can do transactional stuff in your domain model
    // and it will be combined in the same transaction as
    // the startProcessInstanceByKey to the RuntimeService
    runtimeService.startProcessInstanceByKey("helloProcess");
  }

  public void setRuntimeService(RuntimeService runtimeService) {
    this.runtimeService = runtimeService;
  }
}
```

# Using Inner Spring Transactions

When engine API calls are executed in the Spring context, Spring doesn't 
make it transparent to the Process Engine when nested API calls need to 
be executed in a separate transaction (the `Propagation.REQUIRES_NEW` 
transaction behavior). This doesn't play well with how the Process Engine 
Context is used to separate transaction data described in detail in
[Transactions and the Process Engine Context][transactions-and-engine-context]. 
Due to this, if the inner transaction fails, the changes made by the engine 
API calls are still committed to the Camunda database.

A solution for this is to explicitly declare to the Process Engine that
a new Process Engine Context is to be created, where all the following
Engine API calls will store their changes for the database. In case the
inner transaction fails, the changes in this new Process Engine Context
will be reverted.

The Process Engine Context must be declared whenever a Spring 
`Propagation.REQUIRES_NEW` inner transaction is defined in an already 
running transaction. 

## Example

In the following code-snippet, we can see a Spring `Propagation.REQUIRED` 
transaction, defined on the `execute` method, and a Spring `Propagation.REQUIRES_NEW`
transaction, defined on the `InnerProcessServiceImpl#startInnerProcess` method.
The `InnerProcessServiceImpl#startInnerProcess` method is called through 
the `execute` method, resulting in an inner transaction.We can also assume 
that, in the `startProcessInstanceByKey` engine API call, some custom code 
continues to execute in the inner transaction, and throws an exception.

```java
@Transactional(value = "transactionManager", propagation = Propagation.REQUIRED)
public void execute(DelegateExecution execution) throws Exception {
  try {
    innerProcessService.startInnerProcess(execution);
  } catch (Exception ex) {
    // noop
  }
}

/* InnerProcessService implementation */

@Service
public class InnerProcessServiceImpl implements InnerProcessService {

  @Override
  @Transactional(value = "transactionManager", propagation = Propagation.REQUIRES_NEW, rollbackFor = {Throwable.class})
  public void startInnerProcess(DelegateExecution execution) {

    execution.getProcessEngineServices()
      .getRuntimeService()
      .startProcessInstanceByKey("EXAMPLE_PROCESS");

    // custom code continues
  }
}
```

In a case like this one, since Spring doesn't make the Process Engine aware that the `startProcessInstanceByKey` 
engine API call is executed in a new, inner transaction, when the custom code 
fails, the Spring inner transaction will be rolled back, but the data
from the started Process Instance data will be committed with the outer 
transaction.

The described problem can be solved through the static methods of the 
`org.camunda.bpm.engine.context.ProcessEngineContext` class. First, we 
call the `ProcessEngineContext.requiresNew()` method to  declare that a 
new Context is required. Finally, we call the `ProcessEngineContext.clear()` 
method to clear the declaration for a new Process Engine Context. This
is important since a new Process Engine Context will be declared for each 
following engine API call until the `ProcessEngineContext#clear` method 
is called.

Using a `try-finally` block is recommended to ensure that the `ProcessEngineContext` 
static methods are called and cleared even in the presence of exceptions.
Below, you can find the solution applied to the `startProcessInstanceByKey`
engine API call of the example above:

```java
try {
  
  // declare new Process Engine Context
  ProcessEngineContext.requiresNew();
  
  // call engine APIs
  execution.getProcessEngineServices()
    .getRuntimeService()
    .startProcessInstanceByKey("EXAMPLE_PROCESS");

} finally {
  // clear declaration for new Process Engine Context
  ProcessEngineContext.clear();
}
```

[transactions-and-engine-context]: {{< ref "/user-guide/process-engine/transactions-in-processes.md#transactions-and-the-process-engine-context" >}}