---

title: 'Process Engine Configuration'
category: 'Spring Framework Integration'

---

You can use a Spring application context Xml file for bootstrapping the process engine. You can bootstrap both application-managed and container-managed process engines through Spring.

### Configuring an application-managed Process Engine

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


Note that the processEngineConfiguration bean uses the <a href="ref:/api-references/javadoc/?org/camunda/bpm/engine/spring/SpringProcessEngineConfiguration.html">SpringProcessEngineConfiguration</a> class.

### Configuring a container-managed Process Engine as a Spring Bean

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

### Configuring a Process Engine Plugin in Spring

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

