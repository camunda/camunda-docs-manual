---

title: 'Custom Queries'
category: 'Process Engine'

---


## Why custom queries?

The process engine offers a pretty straightforward and easy to use Java Query API, if you want to build a task list you just write something like this:

```java
@Inject
private TaskService taskService;

public List<Task> getAllTasks() {
  return taskService.createTaskQuery().taskAssignee("bernd").list();
}
```

Easy as it is, there are basically two catches:

*   can only build queries the API supports.
*   You cannot add constraints on your domain objects.

Let me give you a simple use case example, which we implemented in the [custom-queries example](https://github.com/camunda/camunda-consulting/tree/master/snippets/custom-queries):

*   You have a process variable "customer" holding the customerId
*   You have your own entity "Customer" with all the details


<center>
  <img src="ref:asset:/assets/img/real-life/custom-query-domain-example.png" class="img-responsive"/>
</center>


So far a pretty common situation (please note that the object diagram was simplified to show the relevant aspects and doesn't correspond one to one to the implementation classes). What would be easy now is to query all process instances for a customer:

```java
@Inject
private TaskService taskService;
 
public List<Task> getTasks() {
  return taskService.createTaskQuery().processVariableValueEquals("customer", "0815").list();
}
```

But imagine you want to query

*   All tasks for a certain region (which is part of your domain, not the fox engine database)
*   All tasks for customer 0815 or 4711 (the Query API always assumes AND and does not support OR)

How to do this?


## The "naive" implementation

Something we see very often is what we call the "naive" implementation, the easiest way you can think of: Use the existing query capabilities and add an filter of its own into your Java code. This is easy to write for every Java developers. However, it normally queries too much information from the Process Engine's database and therefore **might cause serious performance issues - so please check the alternatives below first.** 

For the two example queries above we might write the following code:

```java
public List<Task> getTasks(String region) {
  ArrayList<Task> resultingList = new ArrayList<Task>();
  // customer Id = 0815
  List<Task> list = taskService.createTaskQuery().processVariableValueEquals("customer", "0815").list();
  for (Task task : list) {
    String customerId = (String) runtimeService.getVariable(task.getExecutionId(), "customer");
    Customer customer = customerService.getCustomer(customerId);
    if (region.equals(customer.getRegion())) {
      resultingList.add(task);
    }
  }
  // OR customer Id = 4711
  list = taskService.createTaskQuery().processVariableValueEquals("customer", "4711").list();
  for (Task task : list) {
    String customerId = (String) runtimeService.getVariable(task.getExecutionId(), "customer");
    Customer customer = customerService.getCustomer(customerId);
    if (region.equals(customer.getRegion())) {
      resultingList.add(task);
    }
  }
  return resultingList;
}
```

Think about what this does:

*   Query all tasks
*   Create their own query for the process variable "customer" for every task
*   Create another query for the customer entity for every task
*   throw away almost all of the information, because we only need a couple of tasks (the region is a rather restrictive condition)

Hence the code above might work in small environments, but can cause serious performance problems.

Given this, what are the alternatives? To show you other solution approaches, we want to have a quick look at some persistence internals first.


## Background: Persistence in the process engine

The process engine uses [MyBatis](http://mybatis.org/) for persistence: "The MyBatis data mapper framework makes it easier to use a relational database with object-oriented applications. MyBatis couples objects with stored procedures or SQL statements using a XML descriptor. Simplicity is the biggest advantage of the MyBatis data mapper over object relational mapping tools.".

In a nutshell, we parse an XML mapping file with all the SQL statements we need and setup a so called SessionFactory to talk to MyBatis (which then talks to the database via JDBC). The used mapping file can be found in the sources of the camunda BPM platform: [mappings.xml](https://github.com/camunda/camunda-bpm-platform/blob/master/engine/src/main/resources/org/camunda/bpm/engine/impl/mapping/mappings.xml). Basically, it "just" includes the other mapping files.

When creating a query via the Query API it is executed as Command object, which then delegates to MyBatis with the right query and the correct parameters. Not much magic involved here.


## Possible Solution Approaches

In order to solve the requirements stated in the introduction, we can think of a couple of possible solution approaches:

 *   The **naive implementation** as already explained: **not recommended**.
 *   Write custom **SQL** code to do your own queries: possible, but you have to mess around with SQL yourself, **not recommended**.
 *   Leverage **MyBatis** for your custom queries: That is actually a really powerful approach and **our recommendation**, see the example below.
 *   Use **JPA**: We experimented with JPA mappings for the core engine entities to allow JPA queries. If these mappings exist and you can use that in your own application combined with your own JPA stuff. However you have to maintain the JPA mappings yourself which involves a lot of work and we already experiences problems with that in the past, so we basically do **not recommended** it.
 *   Add **redundant information**, an easy, but often sufficient, approach to improve queries, which doesn't need a lot of understanding of the persistence implementation:
     *   Add process variables for all query parameters. In our example that would mean to add the region as its own process variable. This approach is **recommend**.
     *   Add process information to the domain mode. In our example this could mean to add an seperate entity task which is synchronized with the process engine task management. This is possible but requires some work which must be done carefully to make sure that the process engine and your domain objects are always in sync.


## Custom MyBatis Queries

**Precondition:** In order to use your own MyBatis (or all types of SQL) queries your domain data and the process engine data must be stored in the same database. Otherwise you cannot technically construct a single SQL query, which is our goal in terms of performance optimization. If you have separate databases, discuss if you really need them (which is less often the case than you think). If the answer is 'yes' or you even work with entities only over remote service interfaces, you have to "fall back" to the redundant information approach. Maybe you can use your own entities for that redundant information.

**Warning:** Writing your own MyBatis Queries means you rely on the internal entity / database structure of the process engine. This is considered quite stable (since otherwise we have to provide extensive migration scripts), but there is no guarantee. Therefore, please check your MyBatis queries on any version migration you do. This can be skipped if you have a good test coverage from automated unit tests.

The following solution is implemented in the [custom-queries example](https://github.com/camunda/camunda-consulting/tree/master/snippets/custom-queries), where you will find a complete working example. The code snippets in this article are taken from this example.

In order to add your own MyBatis Queries, you have to provide a MyBatis XML configuration file. This file can not only contain SQL commands but also mappings from relational data to Java Objects. The question is how to make MyBatis use our own configuration file, when MyBatis is already set up during the process engine startup? The easiest solution is described here. This approach leverages the existing infrastructure to access MyBatis, including connection and transaction handling, but starts up a completely separate MyBatis Session within the Process Application. This has two big advantages (and not a real disadvantage):

 * No extensions in the engine configuration necessary (this improves maintainability)
 * The MyBatis Session is handled completely within the Process Application, which means that e.g. classloading works out-of-the-box. And this ensures that the configuration doesn't intervene with any other Process Application.

In order to this we start up a very special Process Engine which only does the MyBatis handling, we can insure this by overwriting the init method. And we overwrite a hook which gets the name of the MyBatis configuration file:

```java
public class MyBatisExtendedSessionFactory extends StandaloneProcessEngineConfiguration {

  private String resourceName;

  protected void init() {
    throw new IllegalArgumentException("Normal 'init' on process engine only used for extended MyBatis mappings is not allowed.");
  }

  public void initFromProcessEngineConfiguration(ProcessEngineConfigurationImpl processEngineConfiguration, String resourceName) {
    this.resourceName = resourceName;
    setDataSource(processEngineConfiguration.getDataSource());
    initDataSource();
    initVariableTypes();
    initCommandContextFactory();
    initTransactionFactory();
    initTransactionContextFactory();
    initCommandExecutors();
    initSqlSessionFactory();
    initIncidentHandlers();
    initIdentityProviderSessionFactory();        
    initSessionFactories();
  }

  /**
   * In order to always open a new command context set the property
   * "alwaysOpenNew" to true inside the CommandContextInterceptor.
   *
   * If you execute the custom queries inside the process engine
   * (for example in a service task), you have to do this.
   */
  @Override
  protected Collection<? extends CommandInterceptor> getDefaultCommandInterceptorsTxRequired() {
    List<CommandInterceptor> defaultCommandInterceptorsTxRequired = new ArrayList<CommandInterceptor>();
    defaultCommandInterceptorsTxRequired.add(new LogInterceptor());
    defaultCommandInterceptorsTxRequired.add(new CommandContextInterceptor(commandContextFactory, this, true));
    return defaultCommandInterceptorsTxRequired;
  }

  @Override
  protected InputStream getMyBatisXmlConfigurationSteam() {
    return ReflectUtil.getResourceAsStream(resourceName);
  }
}
```

This allows us to access our own queries (we will show this in a minute) from our MyBatis session by constructing an Command object:

```java
Command<List<TaskDTO>> command = new Command<List<TaskDTO>>() {

  public List<TaskDTO> execute(CommandContext commandContext) {
    // select the first 100 elements for this query
    return (List<TaskDTO>) commandContext.getDbSqlSession().selectList("selectTasksForRegion", "Berlin", 0, 100);
  }

};

MyBatisExtendedSessionFactory myBatisExtendedSessionFactory = new MyBatisExtendedSessionFactory();
myBatisExtendedSessionFactory.initFromProcessEngineConfiguration(processEngineConfiguration, "/ourOwnMappingFile.xml");
myBatisExtendedSessionFactory.getCommandExecutorTxRequired().execute(command);
```

This is already everything you need, see a fully working solution in [MyBatisExtendedSessionFactory.java](https://github.com/camunda/camunda-consulting/blob/master/snippets/custom-queries/src/main/java/org/camunda/demo/custom/query/MyBatisExtendedSessionFactory.java), [MyBatisQueryCommandExecutor.java](https://github.com/camunda/camunda-consulting/blob/master/snippets/custom-queries/src/main/java/org/camunda/demo/custom/query/MyBatisQueryCommandExecutor.java) and the example usage in [TasklistService.java](https://github.com/camunda/camunda-consulting/blob/master/snippets/custom-queries/src/main/java/org/camunda/demo/custom/query/TasklistService.java).

Now let's get back to the example from the beginning. We want to query all tasks of customers for a certain region. First of all we have to write a SQL for this. Let's assume that we have the following Entity stored in the same Data-Source as the fox engine:

```java
@Entity
@Table(name="CUSTOMER")
public class Customer {
  @Id
  @Column(name="ID_")
  private long id;
  @Column(name="REGION_")
  private String region;
  ...
```

Now the SQL has to join the CUSTOMER with the VARIABLES table from the fox engine. Here we do an additional trick as once used for another standard problem: We join in ALL process variables to receive them together with the Tasks in one query. Maybe this is not your use case, but it might show you how powerful this approach can be. The full MyBastis Mapping can be found in [customTaskMappings.xml](https://github.com/camunda/camunda-consulting/blob/master/snippets/custom-queries/src/main/resources/customTaskMappings.xml).

```xml
<select id="selectTasksForRegion" resultMap="customTaskResultMap" parameterType="org.camunda.bpm.engine.impl.db.ListQueryParameterObject">
    ${limitBefore}
    select distinct
      T.ID_ as tID_,
      T.NAME_ as tNAME_,
      T.DESCRIPTION_ as tDESCRIPTION_,
      T.DUE_DATE_ as tDUE_DATE_,
      ...
      CUST.ID_ as CUSTOMER_ID_,
      CUST.NAME_ as CUSTOMER_NAME_,
      CUST.REGION_ as CUSTOMER_REGION_,
      VAR.ID_ as VID_,
      VAR.TYPE_ as VTYPE_,
      VAR.NAME_ as VNAME_
      ...
    from ${prefix}ACT_RU_TASK T
    left outer join (select * from ${prefix}ACT_RU_VARIABLE where NAME_= 'customerId' ) VAR_CUSTOMER on VAR_CUSTOMER.EXECUTION_ID_ = T.EXECUTION_ID_
    left outer join CUSTOMER CUST on CUST.ID_ = VAR_CUSTOMER.LONG_
    right outer join ${prefix}ACT_RU_VARIABLE VAR on VAR.EXECUTION_ID_ = T.EXECUTION_ID_
    <where>
      <if test="parameter != null">
        CUST.REGION_ = #{parameter}
      </if>
    </where>
  ${limitAfter}
</select>
```

We will explain the joins briefly: The first two joins check if there is a process variable named "customerId" and join it to the CUSTOMER table, which allows it to add CUSTOMER columns in the select as well as in the where clause. And the last right outer join joins in all existing process variables. There is one catch in that last statement: We now get one row per process variable, let's assume we have 10 tasks with 10 variables each, then our result set has 100 rows. This is no problem for MyBatis, it can map this to a Collection as we will see in a minute, but in this case the LIMIT statement we use for paging is applied on the overall result set. So if we tell MyBatis to get the first 50 tasks, we only get 5 tasks, because we have 50 rows for this. This is not a general problem of the approach described here but a glitch in the SQL provided, maybe you can think of smarter way to write this?

This brings us to the last piece of code we want to draw your attention on: The Mapping. In order to get the customer data together with the Task information we defined a seperate DTO object (DTO stands for Data Transfer Object, it basically means a Java object used as value container). This DTO holds a List of the process variables as well:

```java
public class TaskDTO {
  private String id;
  private String nameWithoutCascade;
  private String descriptionWithoutCascade;
  private Date dueDateWithoutCascade;
  private Customer customer;
  private List<ProcessVariableDTO> variables = new ArrayList<ProcessVariableDTO>();
  ...
```

Filling these objects with the result set from our Query is now an easy task for MyBatis with this mapping:

```xml
<resultMap id="customTaskResultMap" type="org.camunda.demo.custom.query.TaskDTO">
  <id property="id" column="tID_" />
  <result property="nameWithoutCascade" column="tNAME_" />
  <result property="descriptionWithoutCascade" column="tDESCRIPTION_" />
  <result property="dueDateWithoutCascade" column="tDUE_DATE_" />
  <association property="customer" javaType="com.camunda.fox.quickstart.tasklist.performance.Customer">
   <id property="id" column="CUSTOMER_ID_"/>
   <result property="name" column="CUSTOMER_NAME_"/>
   <result property="region" column="CUSTOMER_REGION_" />
  </association>
  <collection ofType="org.camunda.demo.custom.query.ProcessVariableDTO" property="variables" column="tPROC_INST_ID_" resultMap="customVariableResultMap"/>
</resultMap>
<resultMap id="customVariableResultMap" type="org.camunda.demo.custom.query.ProcessVariableDTO">
  <id property="id" column="VID_" />
  <result property="name" column="VNAME_" />
  <result property="value" column="VTEXT_" />
</resultMap>
```

We hope that this is somehow self explanatory, otherwise best have a look at the [MyBatis XML configuration reference](http://www.mybatis.org/core/sqlmap-xml.html).

This is all you have to do. Please check out the full code in the example, you are able to run it directly on the JBoss distribution. You can easily play around with it to check if it serves your needs or to compare query performance to an implementation you had until now, maybe something similar to the naive implementation we mentioned at the beginning (and be assured: We see that really often out there ;-)).


## Performance Experiences

It really mattered to us to write this article, because we sometimes hear that the process engine performs badly and this is almost every time related to wrong designed queries. One customer had his project status turned to "dark yellow" (which is close to red) because of these performance issues. This solution improved performance by a factor greater than 10 and fixed paging and sorting issues, hence bringing the project back to track. So we think everybody should know about it! 
