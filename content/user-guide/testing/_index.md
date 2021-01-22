---

title: "Testing"
weight: 70
layout: "single"

menu:
  main:
    identifier: "user-guide-testing"
    parent: "user-guide"

---

Testing BPMN processes, CMMN cases (and also DMN decisions) is just as important as testing code.
This section explains how to write unit tests and integration tests with Camunda and explains some best practice and guidelines.


# Unit Tests

Camunda supports both JUnit versions 3 and 4 styles of unit testing.

## JUnit 4

Using the JUnit 4 style of writing unit tests, the {{< javadocref page="?org/camunda/bpm/engine/test/ProcessEngineRule.html" text="ProcessEngineRule" >}} must be used. Through this rule, the process engine and services are available through getters. As with the ProcessEngineTestCase (see above), including this rule will look for the default configuration file on the classpath. Process engines are statically cached over multiple unit tests when using the same configuration resource.

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
  Our [Project Templates for Maven]({{< ref "/user-guide/process-applications/maven-archetypes.md" >}}) give you a complete running project including a JUnit test out of the box.
{{< /note >}}


## JUnit 3

In the JUnit 3 style, the {{< javadocref page="?org/camunda/bpm/engine/test/ProcessEngineTestCase.html" text="ProcessEngineTestCase" >}} must be extended. This will make the ProcessEngine and the services available through protected member fields. In the `setup()` of the test, the processEngine will be initialized by default with the `camunda.cfg.xml` resource on the classpath. To specify a different configuration file, override the getConfigurationResource() method. Process engines are cached statically over multiple unit tests when the configuration resource is the same.

A JUnit 3 style test can look as follows:

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

## Deploy Test Resources

You can annotate test classes and methods with {{< javadocref page="?org/camunda/bpm/engine/test/Deployment.html" text="@Deployment" >}}. Before the test is run, a resource file named `TestClassName.bpmn20.xml` (for a class-level annotation) or `TestClassName.testMethod.bpmn20.xml` (for a method-level annotation), in the same package as the test class, will be deployed. At the end of the test the deployment will be deleted, including all related process instances, tasks, etc. The `@Deployment` annotation also supports setting the resource location explicitly.

```
@Deployment(resources = {"myProcess.bpmn", "mySubprocess.bpmn"})
```
will pick the files `myProcess.bpmn` and `mySubProcess.bpmn` directly from the top of the classpath.

Method-level annotations override class-level annotations. See the Javadocs for {{< javadocref page="?org/camunda/bpm/engine/test/Deployment.html" text="@Deployment" >}}more details.

The annotation is supported for [JUnit 3]({{< relref "#junit-3" >}}) and [JUnit 4]({{< relref "#junit-4" >}}) style of testing.

## Specify the required History Level

If a test requires a specific history level (e.g., because it uses the HistoryService) then you can annotate the test class or method with {{< javadocref page="?org/camunda/bpm/engine/test/RequiredHistoryLevel.html" text="@RequiredHistoryLevel" >}} and specify the required history level (e.g., "activity", "full"). Before the test is run, it checks the current history level of the process engine and skip the test if the history level is lower than the specified one.  

A JUnit 4 style test can look as follows:

```java
public class MyBusinessProcessTest {

  @Rule
  public ProcessEngineRule processEngineRule = new ProcessEngineRule();

  @Test
  @Deployment
  @RequiredHistoryLevel(ProcessEngineConfiguration.HISTORY_ACTIVITY)
  public void ruleUsageExample() {
    RuntimeService runtimeService = processEngineRule.getRuntimeService();
    runtimeService.startProcessInstanceByKey("ruleUsage");

    HistoryService historyService = processEngineRule.getHistoryService();
    // requires history level >= "activity"
    HistoricVariableInstance variable = historyService
      .createHistoricVariableInstanceQuery()
      .singleResult();
      
    assertEquals("value", variable.getValue());
  }
}
```

The annotation is supported for [JUnit 3]({{< relref "#junit-3" >}}) and [JUnit 4]({{< relref "#junit-4" >}}) style of testing. Note that a skipped test is marked as passed for JUnit 3 style tests since JUnit 3 doesn't support skipping of tests.  

## Disabling Telemetry

Telemetry reports are introduced with Camunda Platform 7.14.0. To prevent sending data generated during testing, we encourage you to disable the [telemetry reporter][engine-config-telemetryReporterActivate]. Please read more about the topic in the dedicated page for [Telemetry][telemetry-initial-report].

Example of disabling the reporter in XML-based configuration:

```
<property name="telemetryReporterActivate">false</property>
```

[engine-config-telemetryReporterActivate]: {{< ref "/reference/deployment-descriptors/tags/process-engine.md#telemetryReporterActivate" >}}
[telemetry-initial-report]: {{< ref "/introduction/telemetry.md#initial-data-report" >}}

## Debug Unit Tests

When using the in-memory H2 database for unit tests, the following instructions allow to easily inspect the data in the engine database during a debugging session. The screenshots here are taken in Eclipse, but the mechanism should be similar for other IDEs.

Suppose we have put a breakpoint somewhere in our unit test. In Eclipse this is done by double-clicking in the left border next to the code:

{{< img src="img/api-test-debug-breakpoint.png" title="API Test Debugging" >}}

If we now run the unit test in debug mode (right-click in test class, select 'Run as' and then 'JUnit test'), the test execution halts at our breakpoint, where we can now inspect the variables of our test as shown in the right upper panel.

{{< img src="img/api-test-debug-view.png" title="API Test Debugging" >}}

To inspect the data, open up the 'Display' window (if this window isn't there, open Window->Show View->Other and select Display.) and type (code completion is available) `org.h2.tools.Server.createWebServer("-web").start()`

{{< img src="img/api-test-debug-start-h2-server.png" title="API Test Debugging" >}}

Select the line you've just typed and right-click on it. Now select 'Display' (or execute the shortcut instead of right-clicking)

{{< img src="img/api-test-debug-start-h2-server-2.png" title="API Test Debugging" >}}

Now open up a browser and go to http://localhost:8082, and fill in the JDBC URL to the in-memory database (by default this is jdbc:h2:mem:camunda), and hit the connect button.

{{< img src="img/api-test-debug-h2-login.png" title="API Test Debugging" >}}

You can now see the engine database and use it to understand how and why your unit test is executing your process in a certain way.

{{< img src="img/api-test-debug-h2-tables.png" title="API Test Debugging" >}}


# Camunda Assertions

Additional to normal JUnit assertions, [Camunda Platform Assert](https://github.com/camunda/camunda-bpm-assert) adds a fluent API for asserting typical scenarios in a process integrating with [AssertJ](https://joel-costigliola.github.io/assertj/).

```java
assertThat(processInstance).isWaitingAt("UserTask_InformCustomer");
assertThat(task()).hasCandidateGroup("Sales").isNotAssigned();
```

A more extensive guide with examples can also be found [in the repository](https://github.com/camunda/camunda-bpm-assert/blob/master/README.md).

To use Camunda Platform Assert, add the following dependency to your ```pom.xml```:

```xml
<dependency>
  <groupId>org.camunda.bpm.assert</groupId>
  <artifactId>camunda-bpm-assert</artifactId>
  <version>8.0.0</version>
  <scope>test</scope>
</dependency>
```

Also, you will have to add the AssertJ library v3.16.1 to your dependencies with

```xml
<dependency>
  <groupId>org.assertj</groupId>
  <artifactId>assertj-core</artifactId>
  <version>3.16.1</version>
  <scope>test</scope>
</dependency>
```

If Camunda Platform Assert is used in combination with [Spring Boot](https://spring.io/projects/spring-boot) or the 
[Camunda Spring Boot Starter](https://docs.camunda.org/manual/latest/user-guide/spring-boot-integration/), 
the AssertJ dependency will be present in your project already.

## Assertions Version Compatibility

Each version of Camunda Platform Assert is bound to a specific version of Camunda Platform and AssertJ. Only these default combinations are recommended (and supported) by Camunda.
Nevertheless, each version of Camunda Platform Assert can be combined with newer patch versions of the Camunda Platform engine, though such combinations must be thoroughly tested before being used in production.
All versions prior to 3.0.0 belong to the community extension are not part of the official Camunda Platform product support.

<table class="table table-striped">
  <tr>
    <th>Camunda Platform Assert artifact</th>
    <th>AssertJ version</th>
    <th>Camunda Platform Assert version</th>
    <th>Camunda Platform version</th>
  </tr>
  <tr>
    <td>camunda-bpm-assert</td>
    <td>1.5.0</td>
    <td>1.0&#42;</td>
    <td>7.0.0 - 7.6.0</td>
  </tr>
  <tr>
    <td>camunda-bpm-assert</td>
    <td>1.6.1</td>
	<td>1.1&#42;</td>
    <td>7.0.0 - 7.6.0</td>
  </tr>
  <tr>
    <td>camunda-bpm-assert</td>
    <td>1.7.0</td>
	<td>1.2&#42;</td>
    <td>7.0.0 - 7.6.0</td>
  </tr>
  <tr>
    <td>camunda-bpm-assert</td>
    <td>1.7.1</td>
	<td>2.0-alpha1&#42;&#42;</td>
    <td>7.0.0 - 7.9.0</td>
  </tr>
  <tr>
    <td>camunda-bpm-assert</td>
    <td>1.7.1</td>
	<td>2.0-alpha2&#42;&#42;</td>
    <td>7.0.0 - 7.9.0</td>
  </tr>
  <tr>
    <td>camunda-bpm-assert</br>camunda-bpm-assert-assertj2</br>camunda-bpm-assert-assertj3-9-1</td>
    <td>3.11.1</br>2.9.0</br>3.9.1</td>
    <td>3.0.0</td>
    <td>7.10.0</td>
  </tr>
  <tr>
    <td>camunda-bpm-assert</br>camunda-bpm-assert-assertj2</br>camunda-bpm-assert-assertj3-11-1</td>
    <td>3.12.2</br>2.9.0</br>3.11.1</td>
    <td>4.0.0</td>
    <td>7.11.0</td>
  </tr>
  <tr>
    <td>camunda-bpm-assert</td>
    <td>3.13.2</td>
    <td>5.0.0</td>
    <td>7.12.0</td>
  </tr>
  <tr>
    <td>camunda-bpm-assert</td>
    <td>3.13.2</td>
    <td>6.0.0</td>
    <td>7.13.0</td>
  </tr>
  <tr>
    <td>camunda-bpm-assert</td>
    <td>3.16.1</td>
    <td>7.0.0</td>
    <td>7.13.0</td>
  </tr>
  <tr>
    <td>camunda-bpm-assert</td>
    <td>3.16.1</td>
    <td>8.0.0</td>
    <td>7.14.0</td>
  </tr>
  <tr>
    <td>camunda-bpm-assert</td>
    <td>3.18.1</td>
    <td>9.0.0</td>
    <td>7.14.0</td>
  </tr>
  <tr>
    <td>camunda-bpm-assert</td>
    <td>3.18.1</td>
    <td>10.0.0</td>
    <td>7.15.0</td>
  </tr>
</table>

\* For these versions, use the following Maven coordinates:
```
<dependency>
  <groupId>org.camunda.bpm.extension</groupId>
  <artifactId>camunda-bpm-assert</artifactId>
  <version>1.x</version> <!-- set correct version here -->
  <scope>test</scope>
</dependency>
```

\*\* For these versions, only alphas were released, there will be no final release for this branch.
For these versions, use the following Maven coordinates:
```
<dependency>
  <groupId>org.camunda.bpm.extension</groupId>
  <artifactId>camunda-bpm-assert</artifactId>
  <version>2.x</version> <!-- set correct version here -->
  <scope>test</scope>
</dependency>
```

## Migration from community versions

In order to migrate from a Camunda Platform Assert version 1.x / 2.x to a version 3.x or higher, the following points have to be considered:

* The groupId for Maven dependencies has changed, it is now `org.camunda.bpm.assert`. Project dependencies have to be adjusted accordingly.
* There might be multiple artifacts available for a specific version as shown in the compatibility overview above. The artifact that matches the other project dependencies has to be chosen by `artifactId` and `version`.
* The inheritance from AssertJ's `Assertions` has been cut. In case AssertJ assertions are used in test code besides BPM Assert assertions, the imports have to be adjusted to also include:

```java
import static org.assertj.core.api.Assertions.*;
```

# Community extensions to support testing

There are a couple of well documented and heavily used community extensions that can make testing much more productive and fun.

## Camunda Scenario Tests

[Camunda-bpm-assert-scenario](https://github.com/camunda/camunda-bpm-assert-scenario/) enables you to write more robust test suites. The idea is, that you only have to adapt your tests if your process models changes in a way that affects the tested behavior. It concentrates much less on the concrete path through a given process model, but on the external effects the path through the model has.

```java
@Test
public void testHappyPath() {
  // "given" part of the test
  when(process.waitsAtUserTask("CompleteWork")).thenReturn(
    (task) -> task.complete()
  );
  // "when" part of the test
  run(process).startByKey("ReadmeProcess").execute();
  // "then" part of the test
  verify(process).hasFinished("WorkFinished");
}
```

## Camunda Test Coverage

[Camunda-bpm-process-test-coverage](https://github.com/camunda/camunda-bpm-process-test-coverage/) visualises test process pathes and checks your process model coverage ratio. Running typical JUnit tests leaves html files in the build output.


# Resolving Beans Without Spring/CDI

The `Mocks` class can be used to make beans available inside the *Expression Language* or in *Script Tasks* without the need of any bean manager.

Register the bean inside the application:
```java
Mocks.register("myBean", new Bean());
```

Now the named bean is exposed and can be used within the process:
```xml
<serviceTask id="serviceTask" camunda:expression="#{myBean.invokeMethod()}" />
```

In the case, that mocked beans must be resolvable during process deployment (e.g. bean expression in timer start event definition),
one should make sure, that they are registered before the deployment happens. E.g. when used in combination with
`@Deployment` annotation, beans should not be registered in `@Before` method, but rather the separate test rule can be created, that registers beans on startup, 
and chained before `ProcessEngineRule`. 

**The mocked beans feature should be used for testing purposes only.** Beans that are stored with `Mocks` are exclusively available within the respective storing thread as it is based on `ThreadLocal`. In most productive environments, it is not possible to access mocked beans during process execution due to the reason that jobs are executed by the multi-threaded Job Executor. Since the [Job Executor is disabled in unit test scenarios]({{< ref "/user-guide/process-engine/the-job-executor.md#job-executor-in-a-unit-test" >}}), the thread of process execution is the same that creates mocked bean instances.

# Best Practice

## Write Focused Tests

The feature to [start a process instance at a set of activities]({{< ref "/user-guide/process-engine/process-engine-concepts.md#start-a-process-instance-at-any-set-of-activities" >}}) can be used to to create a very specific scenario without much setup. Similarly, certain activities can be skipped by using [process instance modification]({{< ref "/user-guide/process-engine/process-instance-modification.md" >}}).

## Scoping Tests

BPMN processes, CMMN cases and DMN decisions do not exist in isolation. Consider the example of a BPMN process: firstly, the process itself is executed by the Camunda engine which requires a database. Next, the process is "not just the process". It can contain expressions, scripts and often calls out to custom Java classes which may in turn again call out to services, either locally or remotely. To test the process, all these things need to be present, otherwise the test cannot work.

Setting all of this up just to run a unit test is expensive. This is why, in practice, it makes sense to apply a concept which we call test scoping. Scoping the test means limiting the amount of infrastructure required to run the test. Things outside of the scope of the test are mocked.

### Example: Scoping Tests for a Java EE Application

This is best explained using an example. Assume you are building a typical Java EE application containing a BPMN process. The process uses Java Expression Language (EL) for conditions, it invokes Java Delegate implementations as CDI beans, these beans may in turn call out to the actual business logic implemented as EJBs. The business logic uses JPA for maintaining additional business objects in a secondary database. It also sends out messages using JMS to interact with external systems and has a nice web UI. The application runs inside a Java EE application server like Wildfly.

To test this application, all components, including the application server itself, need to be present and the external systems need to process the JMS messages. This makes it hard to write focused tests. However, by looking at the process itself, we find that there are many aspects of it that we can test without having the complete infrastructure in place. For example, if the process data is present, the Expression Language conditions can usually be tested without any additional infrastructure. This already allows asserting that the process "takes the right turn" at a gateway given a set of input data. Next, if the EJBs are mocked, the delegation logic can be included in such tests as well. This allows asserting that wiring of the delegation logic is correct, that it performs correct data transformation and mapping and that it invokes the business logic with the correct parameters. Given that the Camunda engine can work with an in-memory database, it now becomes possible to test the BPMN process "in isolation", as a unit test and assert its local functional correctness. The same principle can be applied to the next "outer layers" of the system, including the business logic and external systems.

The following drawing shows a schematic representation of what this looks like for our example of a Java EE application:

{{< img src="img/test-scopes.png" title="Testing Scopes" >}}

Three test scopes are defined:

* Scope 1: Local, functional correctness of the process model with data, conditions and delegation code, usually implemented as a unit test.
* Scope 2: Integration with business logic inside the runtime container, for Java EE applications usually implemented as an Arquillian-based integration test.
* Scope 3: Integration with external systems and UI.

Note that the above is just an example for a Java EE application, other applications may require different test scopes. However the principle remains the same.
