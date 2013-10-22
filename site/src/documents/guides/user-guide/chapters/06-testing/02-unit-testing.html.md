---

title: 'Unit Testing'
category: 'Testing'

---


Business processes are an integral part of software projects and they should be tested in the same way normal application logic is tested: with unit tests. Since the camunda engine is an embeddable Java engine, writing unit tests for business processes is as simple as writing regular unit tests.

camunda supports both JUnit versions 3 and 4 styles of unit testing. In the JUnit 3 style, the [ProcessEngineTestCase](ref:/api-references/javadoc/?org/camunda/bpm/engine/test/ProcessEngineTestCase.html) must be extended. This will make the ProcessEngine and the services available through protected member fields. In the setup() of the test, the processEngine will be initialized by default with the camunda.cfg.xml resource on the classpath. To specify a different configuration file, override the getConfigurationResource() method. Process engines are cached statically over multiple unit tests when the configuration resource is the same.

By extending ProcessEngineTestCase, you can annotate test methods with [Deployment](ref:/api-references/javadoc/?org/camunda/bpm/engine/test/Deployment.html). Before the test is run, a resource file of the form testClassName.testMethod.bpmn20.xml in the same package as the test class, will be deployed. At the end of the test, the deployment will be deleted, including all related process instances, tasks, etc. The Deployment annotation also supports setting the resource location explicitly. See the Javadocs for more details.

Taking all that in account, a JUnit 3 style test looks as follows:

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

To get the same functionality when using the JUnit 4 style of writing unit tests, the [ProcessEngineRule](ref:/api-references/javadoc/?org/camunda/bpm/engine/test/ProcessEngineRule.html) Rule must be used. Through this rule, the process engine and services are available through getters. As with the ProcessEngineTestCase (see above), including this Rule will enable the use of the Deployment annotation (see above for an explanation of its use and configuration) and it will look for the default configuration file on the classpath. Process engines are statically cached over multiple unit tests when using the same configuration resource.

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

<div class="alert alert-info">
  Our <a href="ref:#process-applications-maven-project-templates-archetypes"><strong>Project Templates for Maven</strong></a> give you a complete running project including a JUnit test out of the box.
</div>
