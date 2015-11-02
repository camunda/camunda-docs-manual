---

title: "Testing"
weight: 70

menu:
  main:
    identifier: "user-guide-testing"
    parent: "user-guide"

---

Testing BPMN processes, CMMN cases (and also DMN decisions) is just as important as testing code.
This section explains how to write Unit tests and Integration Tests with Camunda and explains some best practice and guidelines.


# Unit Tests

Camunda supports both JUnit versions 3 and 4 styles of unit testing. In the JUnit 3 style, the {{< javadocref page="?org/camunda/bpm/engine/test/ProcessEngineTestCase.html" text="ProcessEngineTestCase" >}} must be extended. This will make the ProcessEngine and the services available through protected member fields. In the setup() of the test, the processEngine will be initialized by default with the camunda.cfg.xml resource on the classpath. To specify a different configuration file, override the getConfigurationResource() method. Process engines are cached statically over multiple unit tests when the configuration resource is the same.

By extending ProcessEngineTestCase, you can annotate test methods with {{< javadocref page="?org/camunda/bpm/engine/test/Deployment.html" text="Deployment" >}}. Before the test is run, a resource file of the form testClassName.testMethod.bpmn20.xml, in the same package as the test class, will be deployed. At the end of the test the deployment will be deleted, including all related process instances, tasks, etc. The Deployment annotation also supports setting the resource location explicitly. See the Javadocs for more details.

Taking all that into account, a JUnit 3 style test looks as follows:

```java
public class MyBusinessProcessTest extends ProcessEngineTestCase {

  @Deployment
  public void testSimpleProcess() {
  runtimeService.startProcessInstanceByKey("simpleProcess");

  Task task = taskService.createTaskQuery().singleResult();
  assertEquals("My Task", task.getName());

  taskService.complete(task.getId());
  assertEquals(0, runtimeService.createProcessInstanceQuery().count());
  }
}
```

To get the same functionality when using the JUnit 4 style of writing unit tests, the {{< javadocref page="?org/camunda/bpm/engine/test/ProcessEngineRule.html" text="ProcessEngineRule" >}} Rule must be used. Through this rule, the process engine and services are available through getters. As with the ProcessEngineTestCase (see above), including this Rule will enable the use of the Deployment annotation (see above for an explanation of its use and configuration) and it will look for the default configuration file on the classpath. Process engines are statically cached over multiple unit tests when using the same configuration resource.

The following code snippet shows an example of using the JUnit 4 style of testing and the usage of the ProcessEngineRule.

```java
public class MyBusinessProcessTest {

  @Rule
  public ProcessEngineRule processEngineRule = new ProcessEngineRule();

  @Test
  @Deployment
  public void ruleUsageExample() {
    RuntimeService runtimeService = processEngineRule.getRuntimeService();
    runtimeService.startProcessInstanceByKey("ruleUsage");

    TaskService taskService = processEngineRule.getTaskService();
    Task task = taskService.createTaskQuery().singleResult();
    assertEquals("My Task", task.getName());

    taskService.complete(task.getId());
    assertEquals(0, runtimeService.createProcessInstanceQuery().count());
  }
}
```

{{< note title="" class="info" >}}
  Our [Project Templates for Maven]({{< relref "user-guide/process-applications/maven-archetypes.md" >}}) give you a complete running project including a JUnit test out of the box.
{{< /note >}}


## Debug Unit Tests

When using the in-memory H2 database for unit tests, the following instructions allow to easily inspect the data in the engine database during a debugging session. The screenshots here are taken in Eclipse, but the mechanism should be similar for other IDEs.

Suppose we have put a breakpoint somewhere in our unit test. In Eclipse this is done by double-clicking in the left border next to the code:

{{< img src="img/api-test-debug-breakpoint.png" title="API Test Debugging" >}}

If we now run the unit test in debug mode (right-click in test class, select 'Run as' and then 'JUnit test'), the test execution halts at our breakpoint, where we can now inspect the variables of our test as shown in the right upper panel.

{{< img src="img/api-test-debug-view.png" title="API Test Debugging" >}}

To inspect the data, open up the 'Display' window (if this window isn't there, open Window->Show View->Other and select Display.) and type (code completion is available) org.h2.tools.Server.createWebServer("-web").start()

{{< img src="img/api-test-debug-start-h2-server.png" title="API Test Debugging" >}}

Select the line you've just typed and right-click on it. Now select 'Display' (or execute the shortcut instead of right-clicking)

{{< img src="img/api-test-debug-start-h2-server-2.png" title="API Test Debugging" >}}

Now open up a browser and go to http://localhost:8082, and fill in the JDBC URL to the in-memory database (by default this is jdbc:h2:mem:camunda), and hit the connect button.

{{< img src="img/api-test-debug-h2-login.png" title="API Test Debugging" >}}

You can now see the engine database and use it to understand how and why your unit test is executing your process in a certain way.

{{< img src="img/api-test-debug-h2-tables.png" title="API Test Debugging" >}}

# Camunda Assertions

Apart from JUnit assertions, there is the community extension [camunda-bpm-assert](https://github.com/camunda/camunda-bpm-assert) that adds a fluent API for asserting typical scenarios in a process integrating with [AssertJ](https://joel-costigliola.github.io/assertj/).

# Arquillian Tests

In Java EE environments we recently use JBoss Arquillian pretty often to test Process Applications, because it makes bootstrapping the engine pretty simple. We will add more documentation on this here soon - for the moment please refer to the [Arquillian Getting Started Guide](http://arquillian.org/guides/getting_started_de/).

{{< note title="" class="info" >}}
  Our [Project Templates for Maven]({{< relref "user-guide/process-applications/maven-archetypes.md" >}}) give you a complete running project including a JUnit test out of the box.
{{< /note >}}


# Best Practice

## Write Focused Tests

The feature to [start a process instance at a set of activities]({{< relref "user-guide/process-engine/process-engine-concepts.md#start-a-process-instance-at-any-set-of-activities" >}}) can be used to to create a very specific scenario without much setup. Similarly, certain activities can be skipped by using [process instance modification]({{< relref "user-guide/process-engine/process-instance-modification.md" >}}).

## Scoping Tests

BPMN processes, CMMN cases and DMN decisions do not exist in isolation. Consider the example of a BPMN process: firstly, the process itself is executed by the Camunda engine which requires a database. Next, the process is "not just the process". It can contain expressions, scripts and often calls out to custom Java classes which may in turn again call out to services, either locally or remotely. In order to test the process, all these things need to be present, otherwise, the test cannot work.

Setting all of this up just in order to run a unit test is expensive. This is why, in practice it makes sense to apply a concept which we call test scoping. Scoping the test means limiting the amount of infrastructure required to run the test. Things outside of the scope of the test are mocked.

### Example: Scoping Tests for a Java EE Application

This is best explained using an example. Assume you are building a typical Java EE Application containing a BPMN process. The process uses Java Expression Language (EL) for conditions, it invokes Java Delegate implementations as CDI Beans, these Beans may in turn call out to the actual Business Logic implemented as EJBs. The Business Logic uses JPA for maintaining additional business objects in a secondary database. It also sends out messages using JMS to interact with external systems and has a nice Web UI. The application runs inside a Java EE Application Server like Wildfly.

In order to test this application, all components including the Applications Server itself need to be present and the external systems need to process the JMS messages. This makes it hard to write focused test. But looking at the process itself, we find that there are may aspects of it that we can test without having the complete infrastructure in place. For example, if the process data is present, the Expression Language conditions can usually be tested without any additional infrastructure. This already allows asserting that the process "takes the right turn" at a gateway given a set of input data. Next, If the EJBs are mocked, the delegation logic can be included in such tests as well. This allows asserting that wiring of the delegation logic is correct and that it performs correct data transformation and mapping and invokes the business logic with the correct parameters. Given that Camunda engine can work with an in-memory database, it now becomes possible to test the BPMN process "in isolation", as a unit test and assert its local functional correctness. The same principle can be applied to the next "outer layers" of the system, including the business logic and external systems.

The following drawing shows a schematic representation of what this looks like for our example of a Java EE Application:

{{< img src="img/test-scopes.png" title="Testing Scopes" >}}

Three test scopes are defined:

* Scope 1: Local, functional correctness of the process model with data, conditions and delegation code, usually implemented as a unit test.
* Scope 2: Integration with business logic inside the runtime container, for Java EE Applications usually implemented as am Arquillian-based integration test. 
* Scope 3: Integration with external systems and UI.

Note that the above is just an example for a Java EE Application, other applications may require different test scopes. However the principle remains the same.
