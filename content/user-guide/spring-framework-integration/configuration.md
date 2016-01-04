---

title: 'Process Engine Configuration'
weight: 10

menu:
  main:
    name: "Bootstrapping"
    identifier: "user-guide-spring-framework-integration-configuration"
    parent: "user-guide-spring-framework-integration"
    pre: "Bootstrap the Process Engine via Spring context XML or JavaConfig"

---

You can use a Spring application context XML file for bootstrapping the process engine. It is possible to bootstrap both application-managed and container-managed process engines through Spring.

Note that you can also use a [Spring JavaConfig]({{< relref "#using-spring-javaconfig" >}}) for bootstrapping instead of XML.

# Configure an Application-Managed Process Engine

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


# Configure a Container-Managed Process Engine as a Spring Bean

If you want the process engine to be registered with the BpmPlatform ProcessEngineService, you must use `org.camunda.bpm.engine.spring.container.ManagedProcessEngineFactoryBean` instead of the ProcessEngineFactoryBean shown in the example above. You will also need to ensure:

1. That none of your webapps include camunda-webapp\*.jar within their own lib folder, this should be at a shared level.
2. That your server.xml contains JNDI entries for the 'ProcessEngineService' and 'ProcessApplicationService' as below:

```xml
<!-- Global JNDI resources
     Documentation at /docs/jndi-resources-howto.html
-->
  <GlobalNamingResources>

    <Resource name="java:global/camunda-bpm-platform/process-engine/ProcessEngineService!org.camunda.bpm.ProcessEngineService"
              auth="Container"
              type="org.camunda.bpm.ProcessEngineService"
              description="camunda BPM platform Process Engine Service"
              factory="org.camunda.bpm.container.impl.jndi.ProcessEngineServiceObjectFactory" />

    <Resource name="java:global/camunda-bpm-platform/process-engine/ProcessApplicationService!org.camunda.bpm.ProcessApplicationService"
              auth="Container"
              type="org.camunda.bpm.ProcessApplicationService"
              description="camunda BPM platform Process Application Service"
              factory="org.camunda.bpm.container.impl.jndi.ProcessApplicationServiceObjectFactory" />
       ...
  </GlobalNamingResources>
```

I that case the constructed process engine object is registered with the BpmPlatform and can be referenced for creating process application deployments and exposed through the runtime container integration.


# Configure a Process Engine Plugin

In Sping you can configure a process engine plugin by setting a list value to the
`processEnginePlugins` property of the `processEngineConfiguration` bean:

```xml
<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
  ...
  <property name="processEnginePlugins">
    <list>
      <bean id="spinPlugin"
            class="org.camunda.spin.plugin.impl.SpinProcessEnginePlugin" />
    </list>
  </property>
</bean>
```

# Using Spring JavaConfig

In addition to the Spring application context XML file, you can bootstrap the process engine using Spring JavaConfig. The configuration class can look like this:

```java
@Configuration
public class ExampleProcessEngineConfiguration {

  @Bean
  public DataSource dataSource() {
     // Use a JNDI data source or read the properties from
     // env or a properties file.
     // Note: The following shows only a simple data source
     // for In-Memory H2 database.

    SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
    dataSource.setDriverClass(org.h2.Driver.class);
    dataSource.setUrl("jdbc:h2:mem:camunda;DB_CLOSE_DELAY=-1");
    dataSource.setUsername("sa");
    dataSource.setPassword("");
    return dataSource;
  }

  @Bean
  public PlatformTransactionManager transactionManager() {
    return new DataSourceTransactionManager(dataSource());
  }

  @Bean
  public SpringProcessEngineConfiguration processEngineConfiguration() {
    SpringProcessEngineConfiguration config = new SpringProcessEngineConfiguration();

    config.setDataSource(dataSource());
    config.setTransactionManager(transactionManager());

    config.setDatabaseSchemaUpdate("true");
    config.setHistory("audit");
    config.setJobExecutorActivate(true);

    return config;
  }

  @Bean
  public ProcessEngineFactoryBean processEngine() {
    ProcessEngineFactoryBean factoryBean = new ProcessEngineFactoryBean();
    factoryBean.setProcessEngineConfiguration(processEngineConfiguration());
    return factoryBean;
  }

  @Bean
  public RepositoryService repositoryService(ProcessEngine processEngine) {
    return processEngine.getRepositoryService();
  }

  @Bean
  public RuntimeService runtimeService(ProcessEngine processEngine) {
    return processEngine.getRuntimeService();
  }

  @Bean
  public TaskService taskService(ProcessEngine processEngine) {
    return processEngine.getTaskService();
  }

  // more engine services and additional beans ...

}
```

Note that you can define your custom beans in the configuration class, in combination with an additional XML file or using component scan. The following example adds a component scan to the configuration class to detect and instantiate all beans in the package "com.example".

```java
@Configuration
@ComponentScan("com.example")
public class ExampleProcessEngineConfiguration {

  // ...

}
```


