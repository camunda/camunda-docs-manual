---

title: 'Get started with Camunda and the Spring Framework'
weight: 30

menu:
  main:
    name: "Spring Framework"
    identifier: "get-started-spring"
    parent: "get-started"
    pre: "Get started with using Camunda BPM in Spring Web applications. Learn how to embed the process engine inside a Spring application, invoke Spring Beans from BPMN 2.0 Service Tasks and deploy to a vanilla Apache Tomcat application server. Stop there or adjust the project to deploy it to a shared process engine on Camunda BPM for Apache Tomcat."

---

This tutorial guides you through your first steps of using camunda BPM in a Spring web application.

<dl class="dl-horizontal">
  <dt>
    <a href ="ref:#tutorial-set-up-your-project">Set up</a>
  </dt>
  <dd>
    a Spring Web application project as an Apache Maven project.
  </dd>
  <dt>
    <a href = "ref:#tutorial-configure-an-embedded-process-engine">Configure</a>
  </dt>
  <dd>
    the camunda process engine and embed it inside your application.
  </dd>
  <dt>
    <a href = "ref:#tutorial-configure-an-embedded-process-engine">Deploy</a>
  </dt>
  <dd>
    your project to a <strong>vanilla Apache Tomcat</strong> server.
  </dd>
  <dt>
    <a href = "ref:#tutorial-add-a-spring-bean-service-task">Add Spring Task</a>
  </dt>
  <dd>
    Learn how to use UEL Expressions to resolve Spring Beans from the BPMN 2.0 process.
  </dd>
  <dt>
    <a href = "ref:#bonus-chapter-use-shared-process-engine-on-apache-tomcat">Adapt</a>
  </dt>
  <dd>
    your project to use a Shared Process Engine and deploy it to the camunda BPM enhanced Tomcat server.
  </dd>
</dl>

<div class="alert alert-info">
  <p>
    <strong>Before you start</strong><br/>
    In this tutorial we assume that you are familiar with the basics of Java web application development and the Spring Framework. We also assume that you have installed an eclipse distribution and the camunda Modeler.
  </p>
</div>

<%- @partial('get-code.html.eco', @, {repo: "camunda-get-started-spring"}) %>

# Configure an Embedded Process Engine

Now that you have set up the project with the correct Maven dependencies, we can start configuring the process engine. Add the following Spring beans configuration to the `src/main/webapp/WEB-INF/applicationContext.xml` file:

<div class="app-source" data-source-code="embeddedEngine.xml" annotate="code-annotations" ></div>

After you added these definitions to the Spring Application context, perform a full Maven build and redeploy the application. In the logfile of the Apache Tomcat server you should be able to see the initialization of the process-engine:

<pre class="console">
org.camunda.bpm.engine.impl.db.sql.DbSqlSession executeSchemaResource
INFORMATION: performing create on engine with resource org/camunda/bpm/engine/db/create/activiti.h2.create.engine.sql
org.camunda.bpm.engine.impl.db.sql.DbSqlSession executeSchemaResource
INFORMATION: performing create on history with resource org/camunda/bpm/engine/db/create/activiti.h2.create.history.sql
org.camunda.bpm.engine.impl.db.sql.DbSqlSession executeSchemaResource
INFORMATION: performing create on identity with resource org/camunda/bpm/engine/db/create/activiti.h2.create.identity.sql
org.camunda.bpm.engine.impl.db.sql.DbSqlSession executeSchemaResource
INFORMATION: performing create on case.engine with resource org/camunda/bpm/engine/db/create/activiti.h2.create.case.engine.sql
org.camunda.bpm.engine.impl.db.sql.DbSqlSession executeSchemaResource
INFORMATION: performing create on case.history with resource org/camunda/bpm/engine/db/create/activiti.h2.create.case.history.sql
org.camunda.bpm.engine.impl.SchemaOperationsProcessEngineBuild checkHistoryLevel
INFORMATION: No historyLevel property found in database.
org.camunda.bpm.engine.impl.SchemaOperationsProcessEngineBuild dbCreateHistoryLevel
Creating historyLevel property in database with value: audit
org.camunda.bpm.engine.impl.ProcessEngineImpl <init>
INFORMATION: ProcessEngine engine created
</pre>

<%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started-spring", tag: "Step-2"}) %>

# Add a Spring Bean Service Task

Now that we know how to bootstrap the process engine in a Spring Application context, we can add a BPMN 2.0 process
model and interact with the process form inside our Spring beans. In this section we will

1. [Model an executable BPMN 2.0 process.](#servicetask/model)
2. [Use Spring auto-deployment for BPMN 2.0 processes.](#servicetask/deploy)
3. [Start a process instance from a Spring bean.](#servicetask/start)
4. [Invoke a Spring bean from a BPMN 2.0 Service task.](#servicetask/invoke)

<section id="servicetask/model">
  <h3>Model an executable BPMN 2.0 process</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/spring-framework/process-model.png"/>
    </div>
    <div class="col-xs-9 col-sm-9 col-md-9">
      <p>
        We start by modeling an executable process using the camunda Modeler. The process should look as depicted in the screenshot to the left.
      </p>
      <div class="alert alert-info">
        If you are unfamiliar with modeling an executable process, you can read the <a href ="ref:/guides/getting-started-guides/developing-process-applications/#tutorial-model-a-process"><em>Model a Process</em></a> section of the <a href="ref:/guides/getting-started-guides/developing-process-applications/">Developing Process Applications</a> tutorial.
      </div>
      <p>
        When you are done, save the process model.
      </p>
    </div>
  </div>
</section>

<section id="servicetask/deploy">
  <h3>Use Spring auto-deployment for BPMN 2.0 processes</h3>
  <div class="row">
    <div class="col-md-12">
      <p>
        For the process to be deployed, we use the auto-deployment feature provided by the camunda engine Spring integration. In order to use this feature, modify the definition of the <code>processEngineConfiguration</code> bean inside your <code>src/main/webapp/WEB-INF/applicationContext.xml</code> file:
      </p>
      <div class="app-source" data-source-code="autodeployment" annotate="code-annotations" ></div>
    </div>
  </div>

  <div class="panel-group" id="accAutoDeployment">
    <div class="panel panel-default">
      <div class="panel-heading">
        <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accAutoDeployment" href="#accAutoDeploymentCollapsed"> <i class="icon-thumbs-up"></i>
          Alternative: Auto-deployment using <code>META-INF/processes.xml</code>
        </a>
      </div>
      <div id="accAutoDeploymentCollapsed" class="panel-collapse collapse">
        <div class="panel-body">
          <p>
            The <code>deploymentResources</code> provide basic auto-deployment features. If you need more control over the deployment process, you can use the processes.xml based deployment options in combination with <code>SpringProcessApplication</code>. This feature works with both the embedded process engine (as used in this tutorial) as well as the shared process engine. In order to use the <code>META-INF/processes.xml</code> based deployment, you must make the following changes in the application context file:
          </p>
          <div class="app-source" data-source-code="applicationContext-withSpringPa" annotate="code-annotations" ></div>
          <p>
            Now you can add a <code>META-INF/processes.xml</code> file:
          </p>
          <div class="app-source" data-source-code="processes.xml" annotate="code-annotations" ></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="servicetask/start">
  <h3>Start a process instance from a Spring bean</h3>
  <div class="row">
    <div class="col-md-12">
      <p>
        The next step consists of starting a process instance from a Spring Bean. We will simply add a Spring Bean to the application context which injects to the process engine and starts a single process instance from an <code>afterPropertiesSet()</code> Method:
      </p>
      <div class="app-source" data-source-code="starter-java" annotate="code-annotations" ></div>
      <p>
        We add the Spring bean to the applicationContext.xml file:
      </p>
      <div class="app-source" data-source-code="starter-xml" annotate="code-annotations" ></div>
    </div>
  </div>
</section>

<section id="servicetask/invoke">
  <h3>Invoke a Spring bean from a BPMN 2.0 Service task</h3>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3">
      <img data-img-thumb src="ref:asset:/assets/img/getting-started/spring-framework/service-task.png"/>
    </div>
    <div class="col-xs-9 col-sm-9 col-md-9">
      <p>
        Referencing a Spring Bean from a BPMN 2.0 Service Task is simple. As shown in the screenshot to the left, we have to select the service task in the camunda Modeler and provide an expression in the <em>Expression Delegate</em> Field. We type <code>${calculateInterestService}</code>.
      </p>
    </div>
  </div>
  <p>Finally, we add the Java class implementing the <code>JavaDelegate</code> interface.</p>
  <div class="app-source" data-source-code="service-java" annotate="code-annotations" ></div>
  <p>And register it as a Spring Bean in the application context.</p>
  <div class="app-source" data-source-code="service-xml" annotate="code-annotations" ></div>
  <p>
    If you redeploy the application, you should see the following message in the logfile, meaning that the service task was executed.
  </p>
  <pre class="console">
org.camunda.bpm.engine.impl.ProcessEngineImpl <init>
INFORMATION: ProcessEngine engine created
Spring Bean invoked
org.springframework.web.context.ContextLoader initWebApplicationContext
INFORMATION: Root WebApplicationContext: initialization completed in 1960 ms
</pre>
</section>

<%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started-spring", tag: "Step-3"}) %>

# Done!

<div class="row">
  <div class="col-md-12">
    <p>
      This marks the end of this tutorial. You have successfully set up a Spring Application with an embedded process engine. You can deploy this project to virtually any application server.
    </p>
    <h3>Where to go from here?</h3>
    <ul>
      <li>
        Read the documentation about <a href ="ref:/guides/user-guide/#spring-framework-integration">Spring integration</a> in the camunda BPM platform in the <a href ="ref:/guides/user-guide/">User Guide</a>.
      </li>
      <li>
        Explore the <a href="http://docs.camunda.org/api-references/bpmn20/">BPMN 2.0 Implementation Reference</a>
      </li>
      <li>
        Read the <a href ="ref:#bonus-chapter">bonus chapter</a> below about how to adapt the configuration of the application to deploy it to the Apache Tomcat application server which is configured for the camunda BPM platform.
      </li>
      <li>
        <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://docs.camunda.org/latest/guides/getting-started-guides/"
           data-text="Whohoo! I just developed a Spring #BPMN Process Application." data-size="large" data-hashtags="camunda">Tweet</a>
      </li>
    </ul>
  </div>
</div>

# Alternative Configuration: Using shared Process Engine

So far, we explored how to set up an embedded process engine inside a web application using the Spring Framework. You can also use the Spring Framework to develop applications that use a shared process engine. As opposed to the embedded process engine, the shared process engine is controlled independently from an application and is started / stopped by the runtime container (like Apache Tomcat). This allows multiple applications (or a single modular application) to use the same process engine. You can also re-deploy individual applications independently from the process engine.

In order to configure the loanapproval-spring example to work with an embedded process engine, you have to change three things:

First, we need to set the scope of the Maven dependency of the camunda-engine dependency to `provided`. On the camunda BPM platform the process engine library is provided as a shared library and does not need to be bundled with the application:

<div class="app-source" data-source-code="provided-engine" annotate="code-annotations" ></div>

Furthermore, you can delete the dependencies `org.springframework:spring-jdbc` and `com.h2database:h2`.

Second, you need to add a `META-INF/processes.xml` file to your application.

<div class="app-source" data-source-code="platform-processes.xml" annotate="code-annotations" ></div>

And third, the `applicationContext.xml` file is adjusted so that the shared process engine is looked up and a `SpringServletProcessApplication` is bootstrapped:

<div class="app-source" data-source-code="managed-engine-lookup" annotate="code-annotations" ></div>

<%- @partial('get-tag.html.eco', @, {repo: "camunda-get-started-spring", tag: "Bonus"}) %>

<section class="placeholder"></section>
<div class="bootstrap-code">
<script type="text/xml" id="pom.xml">
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>org.camunda.bpm.getstarted</groupId>
  <artifactId>loanapproval-spring</artifactId>
  <version>0.1.0-SNAPSHOT</version>
  <packaging>war</packaging>

  <properties>
    <camunda.version>7.3.0</camunda.version>
    <spring.version>3.1.2.RELEASE</spring.version>
  </properties>

  <!-- import camunda BOM to ensure correct versions of camunda projects -->
  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>org.camunda.bpm</groupId>
        <artifactId>camunda-bom</artifactId>
        <version>${camunda.version}</version>
        <scope>import</scope>
        <type>pom</type>
      </dependency>
    </dependencies>
  </dependencyManagement>

  <dependencies>
    <dependency>
      <groupId>org.camunda.bpm</groupId>
      <artifactId>camunda-engine</artifactId>
    </dependency>
    <dependency>
      <groupId>org.camunda.bpm</groupId>
      <artifactId>camunda-engine-spring</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-web</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>${spring.version}</version>
    </dependency>
    <dependency>
      <groupId>com.h2database</groupId>
      <artifactId>h2</artifactId>
      <version>1.3.171</version>
    </dependency>
  </dependencies>

</project>
</script>

<script type="text/xml" id="web.xml">
<web-app xmlns="http://java.sun.com/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
                    http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd" version="3.0">

  <context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>/WEB-INF/applicationContext.xml</param-value>
  </context-param>

  <listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
  </listener>

</web-app>
</script>

<script type="text/xml" id="applicationContext.xml">
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                         http://www.springframework.org/schema/beans/spring-beans.xsd">
</beans>
</script>

<script type="text/xml" id="embeddedEngine.xml">
<bean id="dataSource" class="org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy">
  <property name="targetDataSource">
    <bean class="org.springframework.jdbc.datasource.SimpleDriverDataSource">
      <property name="driverClass" value="org.h2.Driver" />
      <property name="url"
                value="jdbc:h2:mem:process-engine;DB_CLOSE_DELAY=1000" />
      <property name="username" value="sa" />
      <property name="password" value="" />
    </bean>
  </property>
</bean>

<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
  <property name="dataSource" ref="dataSource" />
</bean>

<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
  <property name="processEngineName" value="engine" />
  <property name="dataSource" ref="dataSource" />
  <property name="transactionManager" ref="transactionManager" />
  <property name="databaseSchemaUpdate" value="true" />
  <property name="jobExecutorActivate" value="false" />
</bean>

<bean id="processEngine" class="org.camunda.bpm.engine.spring.ProcessEngineFactoryBean">
  <property name="processEngineConfiguration" ref="processEngineConfiguration" />
</bean>

<bean id="repositoryService" factory-bean="processEngine" factory-method="getRepositoryService" />
<bean id="runtimeService" factory-bean="processEngine" factory-method="getRuntimeService" />
<bean id="taskService" factory-bean="processEngine" factory-method="getTaskService" />
<bean id="historyService" factory-bean="processEngine" factory-method="getHistoryService" />
<bean id="managementService" factory-bean="processEngine" factory-method="getManagementService" />
</script>

<script type="text/xml" id="autodeployment">
<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
  <property name="processEngineName" value="engine" />
  <property name="dataSource" ref="dataSource" />
  <property name="transactionManager" ref="transactionManager" />
  <property name="databaseSchemaUpdate" value="true" />
  <property name="jobExecutorActivate" value="false" />
  <property name="deploymentResources" value="classpath*:*.bpmn" />
</bean>
</script>

<script type="text/xml" id="applicationContext-withSpringPa">
<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
  <property name="processEngineName" value="engine" />
  <property name="dataSource" ref="dataSource" />
  <property name="transactionManager" ref="transactionManager" />
  <property name="databaseSchemaUpdate" value="true" />
  <property name="jobExecutorActivate" value="false" />
</bean>

<bean id="processEngine" class="org.camunda.bpm.engine.spring.container.ManagedProcessEngineFactoryBean">
  <property name="processEngineConfiguration" ref="processEngineConfiguration" />
</bean>

<bean id="repositoryService" factory-bean="processEngine" factory-method="getRepositoryService" />
<bean id="runtimeService" factory-bean="processEngine" factory-method="getRuntimeService" />
<bean id="taskService" factory-bean="processEngine" factory-method="getTaskService" />
<bean id="historyService" factory-bean="processEngine" factory-method="getHistoryService" />
<bean id="managementService" factory-bean="processEngine" factory-method="getManagementService" />

<bean id="processApplication" class="org.camunda.bpm.engine.spring.application.SpringServletProcessApplication" depends-on="processEngine" />
</script>

<script type="text/xml" id="processes.xml">
<?xml version="1.0" encoding="UTF-8" ?>

<process-application
    xmlns="http://www.camunda.org/schema/1.0/ProcessApplication"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <process-archive name="loan-approval">
    <process-engine>engine</process-engine>
    <properties>
      <property name="isDeleteUponUndeploy">false</property>
      <property name="isScanForProcessDefinitions">true</property>
    </properties>
  </process-archive>

</process-application>
</script>

<script type="text/xml" id="starter-java">
public class Starter implements InitializingBean {

  @Autowired
  private RuntimeService runtimeService;

  public void afterPropertiesSet() throws Exception {
    runtimeService.startProcessInstanceByKey("loanApproval");
  }

  public void setRuntimeService(RuntimeService runtimeService) {
    this.runtimeService = runtimeService;
  }
}
</script>

<script type="text/xml" id="starter-xml">
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                         http://www.springframework.org/schema/beans/spring-beans.xsd
                         http://www.springframework.org/schema/context
                         http://www.springframework.org/schema/context/spring-context-2.5.xsd" >

  ...

  <context:annotation-config />

  <bean class="org.camunda.bpm.getstarted.loanapproval.Starter" />

  ...

</beans>
</script>

<script type="text/xml" id="starter-xml">
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                         http://www.springframework.org/schema/beans/spring-beans.xsd
                         http://www.springframework.org/schema/context
                         http://www.springframework.org/schema/context/spring-context-2.5.xsd" >
  ...
  <context:annotation-config />
  <bean class="org.camunda.bpm.getstarted.loanapproval.Starter" />
  ...
</beans>
</script>

<script type="text/xml" id="service-java">
public class CalculateInterestService implements JavaDelegate {

  public void execute(DelegateExecution delegate) throws Exception {

    System.out.println("Spring Bean invoked.");

  }

}
</script>

<script type="text/xml" id="service-xml">
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                         http://www.springframework.org/schema/beans/spring-beans.xsd
                         http://www.springframework.org/schema/context
                         http://www.springframework.org/schema/context/spring-context-2.5.xsd" >
  ...
  <context:annotation-config />

  <bean class="org.camunda.bpm.getstarted.loanapproval.Starter" />
  <bean id="calculateInterestService" class="org.camunda.bpm.getstarted.loanapproval.CalculateInterestService" />
  ...
</beans>
</script>

<script type="text/xml" id="provided-engine">
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine</artifactId>
  <version>${camunda.version}</version>
  <scope>provided</scope>
</dependency>
</script>

<script type="text/xml" id="managed-engine-lookup">
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                         http://www.springframework.org/schema/beans/spring-beans.xsd
                         http://www.springframework.org/schema/context
                         http://www.springframework.org/schema/context/spring-context-2.5.xsd" >

  <!-- bind the process engine service as Spring Bean -->
  <bean name="processEngineService" class="org.camunda.bpm.BpmPlatform" factory-method="getProcessEngineService" />

  <!-- bind the default process engine as Spring Bean -->
  <bean name="processEngine" factory-bean="processEngineService" factory-method="getDefaultProcessEngine" />

  <bean id="repositoryService" factory-bean="processEngine" factory-method="getRepositoryService"/>
  <bean id="runtimeService" factory-bean="processEngine" factory-method="getRuntimeService"/>
  <bean id="taskService" factory-bean="processEngine" factory-method="getTaskService"/>
  <bean id="historyService" factory-bean="processEngine" factory-method="getHistoryService"/>
  <bean id="managementService" factory-bean="processEngine" factory-method="getManagementService"/>

  <!-- bootstrap the process application -->
  <bean id="processApplication" class="org.camunda.bpm.engine.spring.application.SpringServletProcessApplication" />

  <context:annotation-config />

  <bean class="org.camunda.bpm.getstarted.loanapproval.Starter" />
  <bean id="calculateInterestService" class="org.camunda.bpm.getstarted.loanapproval.CalculateInterestService" />

</beans>
</script>

<script type="text/xml" id="platform-processes.xml">
<?xml version="1.0" encoding="UTF-8" ?>

<process-application
    xmlns="http://www.camunda.org/schema/1.0/ProcessApplication"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <process-archive name="loan-approval">
    <process-engine>default</process-engine>
    <properties>
      <property name="isDeleteUponUndeploy">false</property>
      <property name="isScanForProcessDefinitions">true</property>
    </properties>
  </process-archive>

</process-application>
</script>

<script type="text/ng-template" id="code-annotations">
  {
    "pom.xml":
    {
    "camunda-engine": "The process engine is the component responsible for picking up your BPMN 2.0 processes and executing them.",
    "camunda-engine-spring": "Spring framework integration module for the process engine.",
    "spring-web": "The Spring web artifact declaratively pulls in the Spring core libraries.",
    "com.h2database": "We use an embedded H2 database for the process engine",
    "springsource-repo": "Repository for Spring artifacts.",
    "camunda-bpm-nexus" : "camunda nexus providing the Maven artifacts."

    },
    "web.xml":
    {
    "contextConfigLocation": "Location of Spring XML files",
    "ContextLoaderListener": "The listener that kick-starts Spring"
    },
    "embeddedEngine.xml":
    {
    "dataSource": "Configuration of the dataSource to be used by the process engine. In this case we use an in-memory H2 database.",
    "processEngineConfiguration": "The process engine configuration bean allows configuration of the process engine. In this case, the datasource and transaction manager properties are configured.",
    "ProcessEngineFactoryBean": "The Process Engine is created by a factory bean."
    },
    "autodeployment":
    {
    "classpath*:*.bpmn": "picks up all BPMN 2.0 files on the classpath and deploys them to the process engine."
    },
    "applicationContext-withSpringPa":
    {
    "processApplication": "Defining a SpringServletProcessApplication makes sure the META-INF/processes.xml file is picked up.",
    "ManagedProcessEngineFactoryBean": "Alternative Process Engine Factory Bean which registers the process engine with the ProcessEngineService.",
    "\"engine\"": "the name of the process engine. Must be referenced in the META-INF/processes.xml file."
    }
  }
</script>
</div>
