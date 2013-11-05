---

title: 'Spring-based Testing'
category: 'Spring Framework Integration'

---

When integrating with Spring, business processes can be tested very easily (in scope 2, see <a href="ref:#testing">Testing Scopes</a>) using the standard camunda testing facilities. The following example shows how a business process is tested in a typical Spring-based unit test:

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

Note that for this to work, you need to define a <a href="ref:/api-references/javadoc/?org/camunda/bpm/engine/test/ProcessEngineRule.html">ProcessEngineRule</a> bean in the Spring configuration (which is injected by auto-wiring in the example above).

    <bean id="processEngineRule" class="org.camunda.bpm.engine.test.ProcessEngineRule">
      <property name="processEngine" ref="processEngine" />
    </bean>
