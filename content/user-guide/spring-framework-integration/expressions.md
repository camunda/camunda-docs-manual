---

title: 'Spring Beans in Processes'
weight: 40

menu:
  main:
    name: "Spring Bean Resolving"
    identifier: "user-guide-spring-framework-integration-expressions"
    parent: "user-guide-spring-framework-integration"
    pre: "Use Spring Beans in Processes"

---

# Limit the exposed Spring Beans

When using the `ProcessEngineFactoryBean`, by default, all expressions and scripts in the BPMN processes will also "see" all the Spring beans. It's possible to limit the beans you want to expose or even expose no beans at all using a map that you can configure. The example below exposes a single bean (printer), available to use under the key `printer`. To expose NO beans at all, pass an empty map as `beans` property on the `SpringProcessEngineConfiguration`. When no `beans` property is set, all Spring beans in the context will be available.

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

<bean id="printer"
      class="org.camunda.bpm.engine.spring.test.transaction.Printer" />
```

# Using Spring Beans in expressions

The exposed beans can be used in expressions. For example, the `SpringTransactionIntegrationTest` `testBasicActivitiSpringIntegration.bpmn20.xml` shows how a method on a Spring bean can be invoked using a UEL method expression:

```xml
<definitions id="definitions" ...>

  <process id="helloProcess" isExecutable="true">
  
    <startEvent id="start" />
    <sequenceFlow id="flow1" sourceRef="start" targetRef="print" />
    
    <serviceTask id="print" 
                 camunda:expression="#{printer.printMessage(execution)}" />
    <sequenceFlow id="flow2" sourceRef="print" targetRef="userTask" />
    
    <userTask id="userTask" />
    <sequenceFlow id="flow3" sourceRef="userTask" targetRef="end" />
    
    <endEvent id="end" />
    
  </process>

</definitions>
```

Where Printer looks like this:

```java
public class Printer {

  public void printMessage(ActivityExecution execution) {
    execution.setVariable("myVar", "Hello from Printer!");
  }
}
```

And the Spring bean configuration (also shown above) looks like this:

```xml
<beans ...>
  ...

  <bean id="printer"
        class="org.camunda.bpm.engine.spring.test.transaction.Printer" />
</beans>
```

# Expression resolving with the shared process engine

In a shared process engine deployment scenario, you have a process engine which dispatches to multiple applications. In this case, there is not a single Spring application context but each application may maintain its own application context. The process engine cannot use a single expression resolver for a single application context but must delegate to the appropriate process application, depending on which process is currently being executed.

This functionality is provided by the `org.camunda.bpm.engine.spring.application.SpringProcessApplicationElResolver`. This class is a `ProcessApplicationElResolver` implementation delegating to the local application context. Expression resolving then works in the following way:

1. The shared process engine checks which process application corresponds to the process it is currently executing.
2. It then delegates to that process application for resolving expressions.
3. The process application delegates to the `SpringProcessApplicationElResolver` which uses the local Spring application context for resolving beans.

{{< note title="" class="info" >}}
  The `SpringProcessApplicationElResolver` class is automatically detected if the `camunda-engine-spring` module is included as a library of the process application, not as a global library.
{{< /note >}}

# Using Spring Beans in scripting

When using `ProcessEngineFactoryBean`, all Spring beans are accessible in Groovy, JavaScript, and Jython. For example, the `ScriptTaskTest-applicationContext.xml` exposes the bean 'testbean':

```xml
<beans ...>
  ...

  <bean id="testbean" 
        class="org.camunda.bpm.engine.spring.test.scripttask.Testbean" />
</beans>
```
Where Testbean looks like this:

```java
@Component
public class Testbean {
  private String name = "name property of testbean";

  public String getName() {
    return name;
  }
}
```

`Testbean` is referenced then form JavaScript:

```javascript
  execution.setVariable('foo', testbean.name);
```
