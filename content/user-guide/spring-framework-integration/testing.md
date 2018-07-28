---

title: 'Spring-Based Testing'
weight: 50

menu:
  main:
    name: "Testing"
    identifier: "user-guide-spring-framework-integration-testing"
    parent: "user-guide-spring-framework-integration"
    pre: "Write Spring-Based Unit Tests"

---

When integrating with Spring, business processes can be tested very easily (in scope 2, see [Testing Scopes]) using the standard Camunda testing facilities. The following example shows how a business process is tested in a typical Spring-based unit test:

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:org/camunda/bpm/engine/spring/test/junit4/springTypicalUsageTest-context.xml")
public class MyBusinessProcessTest {

  @Autowired
  private RuntimeService runtimeService;

  @Autowired
  private TaskService taskService;

  @Autowired
  @Rule
  public ProcessEngineRule processEngineRule;

  @Test
  @Deployment
  public void simpleProcessTest() {
    runtimeService.startProcessInstanceByKey("simpleProcess");
    Task task = taskService.createTaskQuery().singleResult();
    assertEquals("My Task", task.getName());

    taskService.complete(task.getId());
    assertEquals(0, runtimeService.createProcessInstanceQuery().count());

  }
}
```

Note that for this to work, you need to define a {{< javadocref page="?org/camunda/bpm/engine/test/ProcessEngineRule.html" text="ProcessEngineRule" >}} bean in the Spring configuration (which is injected by auto-wiring in the example above).

```xml
<bean id="processEngineRule" class="org.camunda.bpm.engine.test.ProcessEngineRule">
  <property name="processEngine" ref="processEngine" />
</bean>
```

[Testing Scopes]: {{< relref "user-guide/testing/_index.md#scoping-tests" >}}
