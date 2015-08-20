---

title: "Spring Framework Integration"
weight: 50

menu:
  main:
    identifier: "user-guide-spring-framework-integration"
    parent: "user-guide"

---

The camunda-engine spring framework integration is located inside the `camunda-engine-spring` maven module and can be added to apache maven-based projects through the following dependency:

{{< note title="" class="info" >}}
  Please import the [Camunda BOM](/get-started/apache-maven/) to ensure correct versions for every Camunda project.
{{< /note >}}

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine-spring</artifactId>
</dependency>
```

The `camunda-engine-spring` artifact should be added as a library to the process application.


# Process Engine Configuration

You can use a Spring application context Xml file for bootstrapping the process engine. It is possible to bootstrap both application-managed and container-managed process engines through Spring.


## Configure an Application-Managed Process Engine

The ProcessEngine can be configured as a regular Spring bean. The starting point of the integration is the class `org.camunda.bpm.engine.spring.ProcessEngineFactoryBean`. That bean takes a process engine configuration and creates the process engine. This means that the creation and configuration of properties for Spring is the same as documented in the configuration section. For Spring integration the configuration and engine beans will look like this:

```xml
<bean id="processEngineConfiguration"
      class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
    ...
</bean>

<bean id="processEngine"
      class="org.camunda.bpm.engine.spring.ProcessEngineFactoryBean">
  <property name="processEngineConfiguration" ref="processEngineConfiguration" />
</bean>
```

Note that the processEngineConfiguration bean uses the {{< javadocref page="?org/camunda/bpm/engine/spring/SpringProcessEngineConfiguration.html" text="SpringProcessEngineConfiguration" >}} class.


## Configure a Container-Managed Process Engine as a Spring Bean

If you want the process engine to be registered with the BpmPlatform ProcessEngineService, you must use `org.camunda.bpm.engine.spring.container.ManagedProcessEngineFactoryBean` instead of the ProcessEngineFactoryBean shown in the example above. You will also need to ensure:
1) that none of your webapps include camunda-webapp\*.jar within their own lib folder, this should be at a shared level.
2) that your server.xml contains JNDI entries for the 'ProcessEngineService' and 'ProcessApplicationService' as below:

```xml
<!-- Global JNDI resources
       Documentation at /docs/jndi-resources-howto.html
  -->
  <GlobalNamingResources>

    <Resource name="java:global/camunda-bpm-platform/process-engine/ProcessEngineService!org.camunda.bpm.ProcessEngineService" auth="Container"
              type="org.camunda.bpm.ProcessEngineService"
              description="camunda BPM platform Process Engine Service"
              factory="org.camunda.bpm.container.impl.jndi.ProcessEngineServiceObjectFactory" />

    <Resource name="java:global/camunda-bpm-platform/process-engine/ProcessApplicationService!org.camunda.bpm.ProcessApplicationService" auth="Container"
              type="org.camunda.bpm.ProcessApplicationService"
              description="camunda BPM platform Process Application Service"
              factory="org.camunda.bpm.container.impl.jndi.ProcessApplicationServiceObjectFactory" />
       ...
  </GlobalNamingResources>
```

I that case the constructed process engine object is registered with the BpmPlatform and can be referenced for creating process application deployments and exposed through the runtime container integration.


## Configure a Process Engine Plugin in Spring

In Sping you can configure a process engine plugin by setting a list value to the
`processEnginePlugins` property of the `processEngineConfiguration` bean:

```xml
<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
  ...
  <property name="processEnginePlugins">
    <list>
      <bean id="spinPlugin" class="org.camunda.spin.plugin.impl.SpinProcessEnginePlugin" />
    </list>
  </property>
</bean>
```


# Spring Transaction Integration

We'll explain the `SpringTransactionIntegrationTest` found in the Spring examples of the distribution step by step. Below is the Spring configuration file that we use in this example (you can find it in `SpringTransactionIntegrationTest-context.xml`). The section shown below contains the `dataSource`, `transactionManager`, `processEngine` and the process engine services.

When passing the DataSource to the `SpringProcessEngineConfiguration` (using property "dataSource"), the Camunda engine uses a `org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy` internally, which wraps the passed DataSource. This is done to make sure the SQL connections retrieved from the DataSource and the Spring transactions play well together. This implies that it's no longer needed to proxy the dataSource yourself in Spring configuration, although it's still allowed to pass a `TransactionAwareDataSourceProxy` into the `SpringProcessEngineConfiguration`. In this case no additional wrapping will occur.

Make sure when declaring a `TransactionAwareDataSourceProxy` in Spring configuration yourself, that you don't use it for resources that are already aware of Spring-transactions (e.g. `DataSourceTransactionManager` and `JPATransactionManager` need the un-proxied dataSource).

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

First the application context is created with any of the Spring ways to do that. In this example you could use a classpath XML resource to configure our Spring application context:

```java
ClassPathXmlApplicationContext applicationContext =
    new ClassPathXmlApplicationContext("mytest/SpringTransactionIntegrationTest-context.xml");
```

or, since it is a test:

```java
@ContextConfiguration("classpath:mytest/SpringTransactionIntegrationTest-context.xml")
```

Then we can get the service beans and invoke methods on them. The ProcessEngineFactoryBean will have added an extra interceptor to the services that applies Propagation.REQUIRED transaction semantics on the engine service methods. So, for example, we can use the repositoryService to deploy a process like this:

```java
RepositoryService repositoryService = (RepositoryService) applicationContext.getBean("repositoryService");
String deploymentId = repositoryService
  .createDeployment()
  .addClasspathResource("mytest/hello.bpmn20")
  .addClasspathResource("mytest/hello.png")
  .deploy()
  .getId();
```

The other way around also works. In this case, the Spring transaction will be around the userBean.hello() method and the engine service method invocation will join that same transaction.

```java
UserBean userBean = (UserBean) applicationContext.getBean("userBean");
userBean.hello();
```

The UserBean looks like this. Remember from above in the Spring bean configuration we injected the repositoryService into the userBean.

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

# Automatic Resource Deployment

Spring integration also has a special feature for deploying resources. In the process engine configuration, you can specify a set of resources. When the process engine is created, all those resources will be scanned and deployed. There is filtering in place that prevents duplicate deployments. Only in case the resources have actually changed, new deployments will be deployed to the engine database. This makes sense in a lot of use cases, where the Spring container is rebooted often (e.g. testing).

Here's an example:

```xml
<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
  ...
  <property name="deploymentResources" value="classpath*:/mytest/autodeploy.*.bpmn20" />
  <property name="deploymentResources">
    <list>
      <value>classpath*:/mytest/autodeploy.*.bpmn20</value>
      <value>classpath*:/mytest/autodeploy.*.png</value>
    </list>
  </property>
</bean>

<bean id="processEngine" class="org.camunda.bpm.engine.spring.ProcessEngineFactoryBean">
  <property name="processEngineConfiguration" ref="processEngineConfiguration" />
</bean>
```


# Expression Resolving

When using the ProcessEngineFactoryBean, by default, all expressions in the BPMN processes will also 'see' all the Spring beans. It's possible to limit the beans you want to expose in expressions or even exposing no beans at all using a map that you can configure. The example below exposes a single bean (printer), available to use under the key "printer". To have NO beans exposed at all, just pass an empty list as 'beans' property on the SpringProcessEngineConfiguration. When no 'beans' property is set, all Spring beans in the context will be available.

```xml
<bean id="processEngineConfiguration"
      class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
  ...
  <property name="beans">
    <map>
      <entry key="printer" value-ref="printer" />
    </map>
  </property>
</bean>

<bean id="printer" class="org.camunda.bpm.engine.spring.test.transaction.Printer" />
```

Now the exposed beans can be used in expressions: for example, the SpringTransactionIntegrationTest hello.bpmn20.xml shows how a method on a Spring bean can be invoked using a UEL method expression:

```xml
<definitions id="definitions" ...>

  <process id="helloProcess">

    <startEvent id="start" />
    <sequenceFlow id="flow1" sourceRef="start" targetRef="print" />

    <serviceTask id="print" camunda:expression="#{printer.printMessage()}" />
    <sequenceFlow id="flow2" sourceRef="print" targetRef="end" />

    <endEvent id="end" />

  </process>

</definitions>
```

Where Printer looks like this:

```java
public class Printer {

  public void printMessage() {
    System.out.println("hello world");
  }
}
```

And the Spring bean configuration (also shown above) looks like this:

```xml
<beans ...>
  ...

  <bean id="printer" class="org.camunda.bpm.engine.spring.test.transaction.Printer" />
</beans>
```

## Expression Resolving With the Shared Process Engine

In a shared process engine deployment scenario, you have a process engine which dispatches to multiple applications. In this case, there is not a single spring application context but each application may maintain its own application context. The process engine cannot use a single expression resolver for a single application context but must delegate to the appropriate process application, depending on which process is currently executed.

This functionality is provided by the `org.camunda.bpm.engine.spring.application.SpringProcessApplicationElResolver`. This class is a ProcessApplicationElResolver implementation delegating to the local application context. Expression resolving then works in the following way: the shared process engine checks which process application corresponds to the process it is currently executing. It then delegates to that process application for resolving expressions. The process application delegates to the SpringProcessApplicationElResolver which uses the local Spring application context for resolving beans.

{{< note title="" class="info" >}}
  The `SpringProcessApplicationElResolver` class is automatically detected if the `camunda-engine-spring` module is included as a library of the process application, not as a global library.
{{< /note >}}


# Spring-Based Testing

When integrating with Spring, business processes can be tested very easily (in scope 2, see [Testing Scopes]({{< relref "user-guide/testing/index.md" >}})) using the standard Camunda testing facilities. The following example shows how a business process is tested in a typical Spring-based unit test:

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:org/camunda/bpm/engine/spring/test/junit4/springTypicalUsageTest-context.xml")
public class MyBusinessProcessTest {

  @Autowired
  private RuntimeService runtimeService;

  @Autowired
  private TaskService taskService;

  @Autowired
  @Rule
  public ProcessEngineRule processEngineRule;

  @Test
  @Deployment
  public void simpleProcessTest() {
    runtimeService.startProcessInstanceByKey("simpleProcess");
    Task task = taskService.createTaskQuery().singleResult();
    assertEquals("My Task", task.getName());

    taskService.complete(task.getId());
    assertEquals(0, runtimeService.createProcessInstanceQuery().count());

  }
}
```

Note that for this to work, you need to define a {{< javadocref page="?org/camunda/bpm/engine/test/ProcessEngineRule.html" text="ProcessEngineRule" >}} bean in the Spring configuration (which is injected by auto-wiring in the example above).

```xml
<bean id="processEngineRule" class="org.camunda.bpm.engine.test.ProcessEngineRule">
  <property name="processEngine" ref="processEngine" />
</bean>
```