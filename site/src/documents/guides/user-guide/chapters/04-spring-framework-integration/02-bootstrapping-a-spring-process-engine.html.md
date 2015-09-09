---

title: 'Process Engine Configuration'
category: 'Spring Framework Integration'

---

You can use a Spring application context Xml file for bootstrapping the process engine. You can bootstrap both application-managed and container-managed process engines through Spring.

### Configuring an application-managed Process Engine

The ProcessEngine can be configured as a regular Spring bean. The starting point of the integration is the class `org.camunda.bpm.engine.spring.ProcessEngineFactoryBean`. That bean takes a process engine configuration and creates the process engine. This means that the creation and configuration of properties for Spring is the same as documented in the configuration section. For Spring integration the configuration and engine beans will look like this:

    <bean id="processEngineConfiguration"
          class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
        ...
    </bean>

    <bean id="processEngine"
          class="org.camunda.bpm.engine.spring.ProcessEngineFactoryBean">
      <property name="processEngineConfiguration" ref="processEngineConfiguration" />
    </bean>


Note that the processEngineConfiguration bean uses the <a href="ref:/reference/javadoc/?org/camunda/bpm/engine/spring/SpringProcessEngineConfiguration.html">SpringProcessEngineConfiguration</a> class.

### Configuring a container-managed Process Engine as a Spring Bean

If you want the process enigne to be registered with the BpmPlatform ProcessEngineService, you must use `org.camunda.bpm.engine.spring.container.ManagedProcessEngineFactoryBean` instead of the ProcessEngineFactoryBean shown in the example above. I that case the constructed process engine object is registered with the BpmPlatform and can be referenced for creating process application deployments and exposed through the runtime container integration.
