---

title: 'Expression Resolving'
category: 'Spring Framework Integration'

---

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

        <serviceTask id="print" camunda:expression="#{printer.printMessage()}" />
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

### Expression resolving with the Shared Process Engine

In a shared process engine deployment scenario, you have a process engine which dispatches to multiple applications. In this case, there is not a single spring application context but each application may maintain its own application context. The process engine cannot use a single expression resolver for a single application context but must delegate to the appropriate process application, depending on which process is currently executed.

This functionality is provided by the `org.camunda.bpm.engine.spring.application.SpringProcessApplicationElResolver`. This class is a ProcessApplicationElResolver implementation delegating to the local application context. Expression resolving then works in the following way: the shared process engine checks which process application corresponds to the
process it is currently executing. It then delegates to that process application for resolving expressions. The process application delegates to the SpringProcessApplicationElResolver which uses the local Spring application context for resolving beans.

The SpringProcessApplicationElResolver class is automatically detected if the camunda-engine-spring module is visible from the classpath of a process application.
