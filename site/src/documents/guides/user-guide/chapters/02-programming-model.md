# Programming Model

<section id="programming-model-spring"> </section>

## Spring Framework Integration

The camunda-engine spring framework integration is located inside the camunda-engine-spring module and can be added to apache maven-based projects through the following dependency:

    <dependency>
      <groupId>org.camunda.bpm</groupId>
      <artifactId>camunda-engine-spring</artifactId>
      <version>${camunda.version}</version>
    </dependency>


### Bootstrapping a process engine

You can use a Spring application context Xml file for bootstrapping the process engine. You can bootstrap both application-managed and container-managed process engines through Spring.

#### Bootstrapping an application-managed Process Engine
  
The ProcessEngine can be configured as a regular Spring bean. The starting point of the integration is the class `org.camunda.bpm.engine.spring.ProcessEngineFactoryBean`. That bean takes a process engine configuration and creates the process engine. This means that the creation and configuration of properties for Spring is the same as documented in the configuration section. For Spring integration the configuration and engine beans will look like this:

    <bean id="processEngineConfiguration" 
          class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
        ...
    </bean>
  
    <bean id="processEngine" 
          class="org.camunda.bpm.engine.spring.ProcessEngineFactoryBean">
      <property name="processEngineConfiguration" ref="processEngineConfiguration" />
    </bean>

  
Note that the processEngineConfiguration bean uses the <a href="http://docs.camunda.org/api-references/java/?org/camunda/bpm/engine/spring/SpringProcessEngineConfiguration.html">SpringProcessEngineConfiguration</a> class. 

#### Bootstrapping a container-managed Process Engine as a Spring Bean

If you want the process enigne to be registered with the BpmPlatform ProcessEngineService, you must use `org.camunda.bpm.engine.spring.container.ManagedProcessEngineFactoryBean` instead of the ProcessEngineFactoryBean shown in the example above. I that case the constructed process engine object is registered with the BpmPlatform and can be referenced for creating process application deployments and exposed through the runtime container integration. 

### Transactions

We'll explain the `SpringTransactionIntegrationTest` found in the Spring examples of the distribution step by step. Below is the Spring configuration file that we use in this example (you can find it in `SpringTransactionIntegrationTest-context.xml`). The section shown below contains the `dataSource`, `transactionManager`, `processEngine` and the process engine services.

When passing the DataSource to the `SpringProcessEngineConfiguration` (using property "dataSource"), the camunda engine uses a `org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy` internally, which wraps the passed DataSource. This is done to make sure the SQL connections retrieved from the DataSource and the Spring transactions play well together. This implies that it's no longer needed to proxy the dataSource yourself in Spring configuration, although it's still allowed to pass a `TransactionAwareDataSourceProxy` into the `SpringProcessEngineConfiguration`. In this case no additional wrapping will occur.

Make sure when declaring a `TransactionAwareDataSourceProxy` in Spring configuration yourself, that you don't use it for resources that are already aware of Spring-transactions (e.g. `DataSourceTransactionManager` and `JPATransactionManager` need the un-proxied dataSource).

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

The remainder of that Spring configuration file contains the beans and configuration that we'll use in this particular example:

    <beans>  
      ...
      <tx:annotation-driven transaction-manager="transactionManager"/>

      <bean id="userBean" class="org.camunda.bpm.engine.spring.test.UserBean">
        <property name="runtimeService" ref="runtimeService" />
      </bean>

      <bean id="printer" class="org.camunda.bpm.engine.spring.test.Printer" />

    </beans>

First the application context is created with any of the Spring ways to do that. In this example you could use a classpath XML resource to configure our Spring application context:

    ClassPathXmlApplicationContext applicationContext = 
        new ClassPathXmlApplicationContext("mytest/SpringTransactionIntegrationTest-context.xml");


or, since it is a test:
  
    @ContextConfiguration("classpath:mytest/SpringTransactionIntegrationTest-context.xml")

Then we can get the service beans and invoke methods on them. The ProcessEngineFactoryBean will have added an extra interceptor to the services that applies Propagation.REQUIRED transaction semantics on the engine service methods. So, for example, we can use the repositoryService to deploy a process like this:

    RepositoryService repositoryService = (RepositoryService) applicationContext.getBean("repositoryService");
    String deploymentId = repositoryService
      .createDeployment()
      .addClasspathResource("mytest/hello.bpmn20.xml")
      .deploy()
      .getId();  

The other way around also works. In this case, the Spring transaction will be around the userBean.hello() method and the engine service method invocation will join that same transaction.

    UserBean userBean = (UserBean) applicationContext.getBean("userBean");
    userBean.hello();

The UserBean looks like this. Remember from above in the Spring bean configuration we injected the repositoryService into the userBean.
    
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

### Automatic resource deployment

Spring integration also has a special feature for deploying resources. In the process engine configuration, you can specify a set of resources. When the process engine is created, all those resources will be scanned and deployed. There is filtering in place that prevents duplicate deployments. Only when the resources actually have changed, will new deployments be deployed to the engine database. This makes sense in a lot of use case, where the Spring container is rebooted often (e.g. testing).

Here's an example:

    <bean id="processEngineConfiguration" class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
      ...
      <property name="deploymentResources" value="classpath*:/mytest/autodeploy.*.bpmn20.xml" />
    </bean>
      
    <bean id="processEngine" class="org.camunda.bpm.engine.spring.ProcessEngineFactoryBean">
      <property name="processEngineConfiguration" ref="processEngineConfiguration" />
    </bean>

### Expression Language

When using the ProcessEngineFactoryBean, by default, all expressions in the BPMN processes will also 'see' all the Spring beans. It's possible to limit the beans you want to expose in expressions or even exposing no beans at all using a map that you can configure. The example below exposes a single bean (printer), available to use under the key "printer". To have NO beans exposed at all, just pass an empty list as 'beans' property on the SpringProcessEngineConfiguration. When no 'beans' property is set, all Spring beans in the context will be available.
 
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
  
Now the exposed beans can be used in expressions: for example, the SpringTransactionIntegrationTest hello.bpmn20.xml shows how a method on a Spring bean can be invoked using a UEL method expression:
 
    <definitions id="definitions" ...>
      
      <process id="helloProcess">
      
        <startEvent id="start" />
        <sequenceFlow id="flow1" sourceRef="start" targetRef="print" />
        
        <serviceTask id="print" activiti:expression="#{printer.printMessage()}" />
        <sequenceFlow id="flow2" sourceRef="print" targetRef="end" />
        
        <endEvent id="end" />
        
      </process>

    </definitions>

Where Printer looks like this:
 
    public class Printer {

      public void printMessage() {
        System.out.println("hello world");
      }
    }


And the Spring bean configuration (also shown above) looks like this:

    <beans ...>
      ...

      <bean id="printer" class="org.camunda.bpm.engine.spring.test.transaction.Printer" />
    </beans>

#### Expression resolving with the Shared Process Engine

In a shared process engine deployment scenario, you have a process engine which dispatches to multiple applications. In this case, there is not a single spring application context but each application may maintain its own application context. The process engine cannot use a single expression resolver for a single application context but must delegate to the appropriate process application, depending on which process is currently executed.

This functionality is provided by the `org.camunda.bpm.engine.spring.application.SpringProcessApplicationElResolver`. This class is a ProcessApplicationElReolver implementation delegating to the local application context. Expression resolving then works in the following way: the shared process engine checks which process application corresponds to the
process it is currently executing. It then delegates to that process application for resolving expressions. The process application delegates to the SpringProcessApplicationElResolver which uses the local Spring application context for resolving beans.

The SpringProcessApplicationElResolver class is automatically detected if the camunda-engine-spring module is visible from the classpath of a process application.

### Testing

When integrating with Spring, business processes can be tested very easily (in scope 2, see <a href="#testing">Testing Scopes</a>) using the standard camunda testing facilities. The following example shows how a business process is tested in a typical Spring-based unit test:

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
    
Note that for this to work, you need to define a <a href="http://docs.camunda.org/api-references/java/?org/camunda/bpm/engine/test/ProcessEngineRule.html">ProcessEngineRule</a> bean in the Spring configuration (which is injected by auto-wiring in the example above).

    <bean id="activitiRule" class="org.camunda.bpm.engine.test.ProcessEngineRule">
      <property name="processEngine" ref="processEngine" />
    </bean>       

<section id="programming-model-cdi"> </section>

## CDI Integration

The camunda-engine-cdi module provides programming model integration with CDI (Context and Dependency Injection). CDI is the Java EE 6 standard for Dependency Injection. The camunda-engine-cdi integration leverages both the configurability of the camunda engine and the extensibility of CDI. The most prominent features are:
 
 * A custom El-Resolver for resolving CDI beans (including EJBs) from the process,
 * Support for @BusinessProcessScoped beans (CDI beans the lifecycle of which is bound to a process instance),
 * Declarative control over a process instance using annotations,
 * The Process Engine is hooked-up to the CDI event bus,
 * Works with both Java EE and Java SE, works with Spring,
 * Support for unit testing.

### Maven Dependency

In order to use the camunda-engine-cdi module inside your application, you must include the following Maven dependency:

    <dependency>
      <groupId>org.camunda.bpm</groupId>
      <artifactId>camunda-engine-cdi</artifactId>
      <version>7.x</version>
    </dependency>

Replace 'x' with your camunda BPM version.

### Looking up a Process Engine

The cdi extension needs to get access to a ProcessEngine. To achieve this, an implementation of the interface `org.camunda.bpm.engine.cdi.spi.ProcessEngineLookup` is looked up at runtime. The cdi module ships with a default implementation named org.camunda.bpm.engine.cdi.impl.LocalProcessEngineLookup, which uses the ProcessEngines-Utility class for looking up the ProcessEngine. In the default configuration ProcessEngines#NAME_DEFAULT is used to lookup the ProcessEngine. This class might be subclassed to set a custom name. NOTE: needs an activiti.cfg.xml configuration on the classpath.

camunda-engine-cdi uses a java.util.ServiceLoader SPI for resolving an instance of org.camunda.bpm.engine.cdi.spi.ProcessEngineLookup. In order to provide a custom implementation of the interface, we need to add a plain text file named META-INF/services/org.camunda.bpm.engine.cdi.spi.ProcessEngineLookup to our deployment, in which we specify the fully qualified classname of the implementation.

*Note:* If you do not provide a custom org.camunda.bpm.engine.cdi.spi.ProcessEngineLookup implementation, the engine will use the default LocalProcessEngineLookup implementation. In that case, all you need to do is providing a activiti.cfg.xml file on the classpath (see next section).

### Configuring the Process Engine

Configuration depends on the selected ProcessEngineLookup-Strategy (cf. previous section). Here, we focus on the configuration options available in combination with the LocalProcessEngineLookup, which requires us to provide a Spring activiti.cfg.xml file on the classpath.

camunda offers different ProcessEngineConfiguration implementations mostly dependent on the underlying transaction management strategy. The camunda-engine-cdi module is not concerned with transactions, which means that potentially any transaction management strategy can be used (even the Spring transaction abstraction). As a convenience, the cdi-module provides two custom ProcessEngineConfiguration implementations:

* org.camunda.bpm.engine.cdi.CdiJtaProcessEngineConfiguration: a subclass of the JtaProcessEngineConfiguration, can be used if JTA-managed transactions should be used for the engine.
* org.camunda.bpm.engine.cdi.CdiStandaloneProcessEngineConfiguration: a subclass of the StandaloneProcessEngineConfiguration, can be used if plain JDBC transactions should be used for engine.

The following is an example activiti.cfg.xml file for JBoss 7:

    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

            <!-- lookup the JTA-Transaction manager -->
            <bean id="transactionManager" class="org.springframework.jndi.JndiObjectFactoryBean">
                    <property name="jndiName" value="java:jboss/TransactionManager"></property>
                    <property name="resourceRef" value="true" />
            </bean>

            <!-- process engine configuration -->
            <bean id="processEngineConfiguration"
                    class="org.camunda.bpm.engine.cdi.CdiJtaProcessEngineConfiguration">
                    <!-- lookup the default Jboss datasource -->
                    <property name="dataSourceJndiName" value="java:jboss/datasources/ExampleDS" />
                    <property name="databaseType" value="h2" />
                    <property name="transactionManager" ref="transactionManager" />
                    <!-- using externally managed transactions -->
                    <property name="transactionsExternallyManaged" value="true" />
                    <property name="databaseSchemaUpdate" value="true" />
            </bean>
    </beans>

And this is how it would look like for Glassfish 3.1.1 (assuming a datasource named jdbc/camunda is properly configured):

    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

            <!-- lookup the JTA-Transaction manager -->
            <bean id="transactionManager" class="org.springframework.jndi.JndiObjectFactoryBean">
                    <property name="jndiName" value="java:appserver/TransactionManager"></property>
                    <property name="resourceRef" value="true" />
            </bean>

            <!-- process engine configuration -->
            <bean id="processEngineConfiguration"
                    class="org.camunda.bpm.engine.cdi.CdiJtaProcessEngineConfiguration">
                    <property name="dataSourceJndiName" value="jdbc/camunda" />
                    <property name="transactionManager" ref="transactionManager" />
                    <!-- using externally managed transactions -->
                    <property name="transactionsExternallyManaged" value="true" />
                    <property name="databaseSchemaUpdate" value="true" />
            </bean>
    </beans>
        
Note that the above configuration requires the "spring-context" module:

    <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>3.0.3.RELEASE</version>
    </dependency>

The configuration in a Java SE environment looks exactly like the examples provided in section Creating a ProcessEngine, substitute `CdiStandaloneProcessEngineConfiguration` for `StandaloneProcessEngineConfiguration`.

### Contextual Process Execution with CDI

In this section we briefly look at the contextual process execution model used by the camunda-engine-cdi extension. A BPMN business process is typically a long-running interaction, comprised of both user and system tasks. At runtime, a process is split-up into a set of individual units of work, performed by users and/or application logic. In camunda-engine-cdi, a process instance can be associated with a cdi scope, the association representing a unit of work. This is particularly useful, if a unit of work is complex, for instance if the implementation of a UserTask is a complex sequence of different forms and "non-process-scoped" state needs to be kept during this interaction. In the default configuration, process instances are associated with the "broadest" active scope, starting with the conversation and falling back to the request if the conversation context is not active. 

#### Associating a Conversation with a Process Instance


When resolving @BusinessProcessScoped beans, or injecting process variables, we rely on an existing association between an active cdi scope and a process instance. camunda-engine-cdi provides the org.camunda.bpm.engine.cdi.BusinessProcess bean for controlling the association, most prominently:

* the startProcessBy*(...)-methods, mirroring the respective methods exposed by the RuntimeService allowing to start and subsequently associating a business process,
* resumeProcessById(String processInstanceId), allowing to associate the process instance with the provided id,
* resumeTaskById(String taskId), allowing to associate the task with the provided id (and by extension, the corresponding process instance).

Once a unit of work (for example a UserTask) is completed, the completeTask() method can be called to disassociate the conversation/request from the process instance. This signals the engine that the current task is completed and makes the process instance proceed.

Note that the BusinessProcess-bean is a @Named bean, which means that the exposed methods can be invoked using expression language, for example from a JSF page. The following JSF2 snippet begins a new conversation and associates it with a user task instance, the id of which is passed as a request parameter (e.g. `pageName.jsf?taskId=XX`):

    <f:metadata>
      <f:viewParam name="taskId" />
      <f:event type="preRenderView" listener="#{businessProcess.startTask(taskId, true)}" />
    </f:metadata>

#### Declaratively controlling the Process

camunda-engine-cdi allows declaratively starting process instances and completing tasks using annotations. The @org.camunda.bpm.engine.cdi.annotation.StartProcess annotation allows to start a process instance either by "key" or by "name". Note that the process instance is started after the annotated method returns. Example:

```
@StartProcess("authorizeBusinessTripRequest")
public String submitRequest(BusinessTripRequest request) {
  // do some work
  return "success";
}
```

Depending on the configuration of the camunda engine, the code of the annotated method and the starting of the process instance will be combined in the same transaction. The `@org.camunda.bpm.engine.cdi.annotation.CompleteTask`-annotation works in the same way:

```
  @CompleteTask(endConversation=false)
  public String authorizeBusinessTrip() {
      // do some work
      return "success";
  }
```

The `@CompleteTask` annotation offers the possibility to end the current conversation. The default behavior is to end the conversation after the call to the engine returns. Ending the conversation can be disabled, as shown in the example above.

#### Referencing Beans from the Process

The `camunda-engine-cdi` library exposes CDI beans via Expression Language, using a custom resolver. This makes it possible to reference beans from the process:

    <userTask id="authorizeBusinessTrip" name="Authorize Business Trip"                      
                            activiti:assignee="#{authorizingManager.account.username}" />
    </script>

Where "authorizingManager" could be a bean provided by a producer method:

```
@Inject 
@ProcessVariable 
private Object businessTripRequesterUsername;

@Produces
@Named
public Employee authorizingManager() {
        TypedQuery<Employee> query = entityManager.createQuery("SELECT e FROM Employee e WHERE e.account.username='"
                + businessTripRequesterUsername + "'", Employee.class);
        Employee employee = query.getSingleResult();
        return employee.getManager();
}
```

We can use the same feature to call a business method of an EJB in a service task, using the `activiti:expression="myEjb.method()"`-extension. 
Note that this requires a `@Named`-annotation on the MyEjb-class.

#### Working with @BusinessProcessScoped beans

Using camunda-engine-cdi, the lifecycle of a bean can be bound to a process instance. To this extend, a custom context implementation is provided, namely the BusinessProcessContext. Instances of BusinessProcessScoped beans are stored as process variables in the current process instance. BusinessProcessScoped beans need to be PassivationCapable (for example Serializable). The following is an example of a process scoped bean:

```
@Named
@BusinessProcessScoped
public class BusinessTripRequest implements Serializable {
        private static final long serialVersionUID = 1L;
        private String startDate;
        private String endDate;
        // ...
}
```

Sometimes, we want to work with process scoped beans, in the absence of an association with a process instance, for example before starting a process. If no process instance is currently active, instances of BusinessProcessScoped beans are temporarily stored in a local scope (I.e. the Conversation or the Request, depending on the context. If this scope is later associated with a business process instance, the bean instances are flushed to the process instance.

#### Injecting Process Variables

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

#### Receiving Process Events

The Process engine can be hooked-up to the CDI event-bus. This allows us to be notified of process events using standard CDI event mechanisms. In order to enable CDI event support, enable the corresponding parse listener in the configuration:

    <property name="postBpmnParseHandlers">
      <list>
        <bean class="org.camunda.bpm.engine.cdi.impl.event.CdiEventSupportBpmnParseHandler" />
      </list>
    </property>

Now the engine is configured for publishing events using the CDI event bus. The following gives an overview of how process events can be received in CDI beans. In CDI, we can declaratively specify event observers using the @Observes-annotation. Event notification is type-safe. The type of process events is org.camunda.bpm.engine.cdi.BusinessProcessEvent. The following is an example of a simple event observer method:

```
public void onProcessEvent(@Observes BusinessProcessEvent businessProcessEvent) {
  // handle event
}
```

This observer would be notified of all events. If we want to restrict the set of events the observer receives, we can add qualifier annotations:

* `@BusinessProcess`: restricts the set of events to a certain process definition. Example:

  ```
  @Observes
  @BusinessProcess("billingProcess")
  private BusinessProcessEvent evt;
  ```

* `@StartActivity`: restricts the set of events by a certain activity. For example: 

  ```
  @Observes
  @StartActivity("shipGoods")
  private BusinessProcessEvent evt;
  ```

  is invoked whenever an activity with the id "shipGoods" is entered.

* `@EndActivity`: restricts the set of events by a certain activity. The following for example is invoked whenever an activity with the id "shipGoods" is left: 

  ```java
  @Observes
  @EndActivity("shipGoods")
  private BusinessProcessEvent evt;
  ```

* `@TakeTransition`: restricts the set of events by a certain transition.

The qualifiers named above can be combined freely. For example, in order to receive all events generated when leaving the "shipGoods" activity in the "shipmentProcess", we could write the following observer method:

```
public void beforeShippingGoods(@Observes @BusinessProcess("shippingProcess") @EndActivity("shipGoods") BusinessProcessEvent evt) {
  // handle event
}
```

In the default configuration, event listeners are invoked synchronously and in the context of the same transaction. CDI transactional observers (only available in combination with JavaEE / EJB), allow to control when the event is handed to the observer method. Using transactional observers, we can for example assure that an observer is only notified if the transaction in which the event is fired succeeds:

```
public void onShipmentSuceeded(
  @Observes(during=TransactionPhase.AFTER_SUCCESS) @BusinessProcess("shippingProcess") @EndActivity("shipGoods") BusinessProcessEvent evt) {
  
  // send email to customer
}
```

### Additional Features

* The ProcessEngine as well as the services are available for injection: `@Inject` ProcessEngine, RepositoryService, TaskService, ...
* The current process instance and task can be injected: @Inject ProcessInstance, Task,
* The current business key can be injected: @Inject @BusinessKey String businessKey,
* The current process instance id be injected: @Inject @ProcessInstanceId String pid.