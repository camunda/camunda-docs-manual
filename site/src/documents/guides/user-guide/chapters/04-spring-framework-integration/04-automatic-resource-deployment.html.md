---

title: 'Automatic Resource Deployment'
category: 'Spring Framework Integration'

---

Spring integration also has a special feature for deploying resources. In the process engine configuration, you can specify a set of resources. When the process engine is created, all those resources will be scanned and deployed. There is filtering in place that prevents duplicate deployments. Only when the resources actually have changed, will new deployments be deployed to the engine database. This makes sense in a lot of use case, where the Spring container is rebooted often (e.g. testing).

Here's an example:

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
