---

title: 'Configure the DMN engine'
weight: 10

menu:
  main:
    name: "Configuration"
    identifier: "user-guide-process-engine-decisions-configuration"
    parent: "user-guide-process-engine-decisions"
    pre: "Configure the DMN engine"

---

The configuration of the DMN engine is a part of the process engine configuration. It depends on whether you use an application managed or a shared, container managed process engine. Please refer to the [Process Engine Bootstrapping] for details.

This section shows how to configure the DMN engine:

* [Programmatically via Java API]({{< relref "#configure-the-dmn-engine-using-java-api" >}})
* [Declarative via XML configuration]({{< relref "#configure-the-dmn-engine-using-spring-xml" >}})

In the examples the default expression language of the input expressions is set to `groovy`. A list of all possible configurations can be found in the [DMN Engine Configuration] section.

# Configure the DMN Engine using Java API

First, you need to create a [ProcessEngineConfiguration]({{< ref "/user-guide/process-engine/process-engine-bootstrapping.md#bootstrap-a-process-engine-using-the-java-api" >}}) object for the process engine and a `DmnEngineConfiguration` object for the DMN engine. Now you can configure the DMN engine using the `DmnEngineConfiguration` object. When you are done, set the object on the `ProcessEngineConfiguration` and call `buildProcessEngine()` to create the process engine.

```java
// create the process engine configuration
ProcessEngineConfigurationImpl processEngineConfiguration = // ...

// create the DMN engine configuration
DefaultDmnEngineConfiguration dmnEngineConfiguration = (DefaultDmnEngineConfiguration)
  DmnEngineConfiguration.createDefaultDmnEngineConfiguration();

// configure the DMN engine ...
// e.g. set the default expression language for input expressions to `groovy`
dmnEngineConfiguration.setDefaultInputExpressionExpressionLanguage("groovy");

// set the DMN engine configuration on the process engine configuration
processEngineConfiguration.setDmnEngineConfiguration(dmnEngineConfiguration);

// build the process engine which includes the DMN engine
processEngineConfiguration.buildProcessEngine();
```

# Configure the DMN Engine using Spring XML

Follow the [instructions]({{< ref "/user-guide/process-engine/process-engine-bootstrapping.md#configure-process-engine-using-spring-xml" >}}) to create a base `camunda.cfg.xml` XML configuration for the process engine.

Add a new configuration bean of class `org.camunda.bpm.dmn.engine.impl.DefaultDmnEngineConfiguration`. Configure the DMN engine using the bean and set it as `dmnEngineConfiguration` property on the `processEngineConfiguration` bean.

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

  <bean id="processEngineConfiguration"
        class="org.camunda.bpm.engine.impl.cfg.StandaloneProcessEngineConfiguration">

    <property name="dmnEngineConfiguration">
      <bean class="org.camunda.bpm.dmn.engine.impl.DefaultDmnEngineConfiguration">

        <!-- configure the DMN engine ... -->
        <!-- e.g. set the default expression language for input expressions to `groovy` -->
        <property name="defaultInputExpressionExpressionLanguage" value="groovy" />

      </bean>
    </property>

  </bean>
</beans>
```

[Process Engine Bootstrapping]: {{< ref "/user-guide/process-engine/process-engine-bootstrapping.md" >}}
[DMN Engine Configuration]: {{< ref "/user-guide/dmn-engine/embed.md#configuration-of-the-dmn-engine" >}}

