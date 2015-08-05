---

title: 'Automatic Resource Deployment'
weight: 30

menu:
  main:
    identifier: "user-guide-spring-framework-integration-automatic-deployment"
    parent: "user-guide-spring-framework-integration"

---

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
