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
    Set up
  </dt>
  <dd>
    a Spring Web application project as an Apache Maven project.
  </dd>
  <dt>
    Configure
  </dt>
  <dd>
    the camunda process engine and embed it inside your application.
  </dd>
  <dt>
    Deploy
  </dt>
  <dd>
    your project to a <strong>vanilla Apache Tomcat</strong> server.
  </dd>
  <dt>
    Add Spring Task
  </dt>
  <dd>
    Learn how to use UEL Expressions to resolve Spring Beans from the BPMN 2.0 process.
  </dd>
  <dt>
    Adapt
  </dt>
  <dd>
    your project to use a Shared Process Engine and deploy it to the camunda BPM enhanced Tomcat server.
  </dd>
</dl>

**Target Audience**:
In this tutorial we assume that you are familiar with the basics of Java web application development and the Spring Framework. We also assume that you have installed an eclipse distribution and the camunda Modeler.

{{< get-code repo="camunda-get-started-spring" >}}

# Set up a Java Project

We will start by setting up a Spring web application as an Apache Maven Project inside eclipse. This consists of four steps:

1. Create a new Maven Project in Eclipse
2. Add the camunda & Spring framework dependencies
3. Add the web.xml file for bootstrapping the Spring container
4. Add a Spring application context XML configuration file

In the following sections, we go through this process step by step.

## Create a new Maven Project in Eclipse

First, we set up a new Apache Maven based project in eclipse. Let's call it *loanapproval-spring*. The screenshot to the left illustrates the settings we choose. As we are deploying a web application, make sure to select `Packaging: war`.

{{< img src="../img/spring-framework/eclipse-new-project.png" >}}

{{< note title="Hint" class="info" >}}
If you are unfamiliar with setting up a Maven project, read the [Set up your Project]({{< relref "get-started/bpmn20.md#set-up-your-project" >}}) section of the BPMN 2.0 tutorial.
{{< /note >}}     

When you are done, click Finish. Eclipse sets up a new Maven project. The project appears in the *Project Explorer* view.

## Add camunda BPM & Spring Framework dependencies

The next step consists of setting up the Maven dependencies for the new project. Maven dependencies need to be added to the `pom.xml` file of the project. We add both the camunda BPM and the Spring Framework dependencies:    

```xml
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
```

## Add web.xml file for bootstrapping the Spring container

Next, we add a `web.xml` file for bootstrapping the spring container. In order to do so, first add a folder named `WEB-INF` to the (preexisting) `src/main/webapp` folder of your Maven project. Inside this folder, add a file named `web.xml`:

```xml
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
```

Now you can perform the first build. Select the `pom.xml` in the Package Explorer, perform a right-click and select `Run As / Maven Install`

## Add a Spring application context XML configuration file

Next, we add a Spring ApplicationContext XML file to the same `src/main/webapp/WEB-INF` folder. The file must be named `applicationContext.xml`. We start with an empty file:

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                         http://www.springframework.org/schema/beans/spring-beans.xsd">
</beans>
```

Congratulations, you have completed the project setup. Your project should now look as depicted in the screenshot to the left.

{{< img src="../img/spring-framework/project-layout-after-setup.png" >}}

You can now perform a full Maven build and deploy the project to a vanilla Apache Tomcat server. You should see the following log output:

<pre class="console">
org.apache.catalina.startup.HostConfig deployWAR
INFORMATION: Deploying web application archive C:\demo\apache-tomcat-7.0.50\webapps\loanapproval-spring-0.1.0-SNAPSHOT.war
org.springframework.web.context.ContextLoader initWebApplicationContext
INFORMATION: Root WebApplicationContext: initialization started
org.springframework.context.support.AbstractApplicationContext prepareRefresh
INFORMATION: Refreshing Root WebApplicationContext: startup date [DATE]; root of context hierarchy
org.springframework.beans.factory.xml.XmlBeanDefinitionReader loadBeanDefinitions
INFORMATION: Loading XML bean definitions from ServletContext resource [/WEB-INF/applicationContext.xml]
org.springframework.beans.factory.support.DefaultListableBeanFactory preInstantiateSingletons
INFORMATION: Pre-instantiating singletons in org.springframework.beans.factory.support.DefaultListableBeanFactory@51bb8cae: defining beans []; root of factory hierarchy
org.springframework.web.context.ContextLoader initWebApplicationContext
INFORMATION: Root WebApplicationContext: initialization completed in 187 ms
</pre>
    
This means that you have set up your Spring web application correctly.

{{< get-tag repo="camunda-get-started-spring" tag="Step-1" >}}

# Configure an Embedded Process Engine

Now that you have set up the project with the correct Maven dependencies, we can start configuring the process engine. Add the following Spring beans configuration to the `src/main/webapp/WEB-INF/applicationContext.xml` file:

```xml
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
```

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

{{< get-tag repo="camunda-get-started-spring" tag="Step-2" >}}

# Add a Spring Bean Service Task

Now that we know how to bootstrap the process engine in a Spring Application context, we can add a BPMN 2.0 process
model and interact with the process form inside our Spring beans. In this section we will

1. Model an executable BPMN 2.0 process.
2. Use Spring auto-deployment for BPMN 2.0 processes.
3. Start a process instance from a Spring bean.
4. Invoke a Spring bean from a BPMN 2.0 Service task.


## Model an executable BPMN 2.0 process

We start by modeling an executable process using the camunda Modeler. The process should look as depicted in the screenshot to the left.

{{< img src="../img/spring-framework/process-model.png" >}}

{{< note title="Hint" class="info" >}}
If you are unfamiliar with modeling an executable process, you can read the
[Model a Process]({{< relref "get-started/bpmn20.md#model-a-process" >}}) section of the Developing Process Applications tutorial.
{{< /note >}}
      
When you are done, save the process model.
      
## Use Spring auto-deployment for BPMN 2.0 processes

For the process to be deployed, we use the auto-deployment feature provided by the camunda engine Spring integration. In order to use this feature, modify the definition of the `processEngineConfiguration` bean inside your `src/main/webapp/WEB-INF/applicationContext.xml` file:

```xml
<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
  <property name="processEngineName" value="engine" />
  <property name="dataSource" ref="dataSource" />
  <property name="transactionManager" ref="transactionManager" />
  <property name="databaseSchemaUpdate" value="true" />
  <property name="jobExecutorActivate" value="false" />
  <property name="deploymentResources" value="classpath*:*.bpmn" />
</bean>
```

## Start a process instance from a Spring bean

The next step consists of starting a process instance from a Spring Bean. We will simply add a Spring Bean to the application context which injects to the process engine and starts a single process instance from an `afterPropertiesSet()` Method:

```java
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
```

We add the Spring bean to the applicationContext.xml file:

```xml
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
```

## Invoke a Spring bean from a BPMN 2.0 Service task

{{< img src="../img/spring-framework/service-task.png" >}}

Referencing a Spring Bean from a BPMN 2.0 Service Task is simple. As shown in the screenshot to the left, we have to select the service task in the camunda Modeler and provide an expression in the *Expression Delegate* Field. We type `${calculateInterestService}`.

Finally, we add the Java class implementing the `JavaDelegate` interface.

```java
public class CalculateInterestService implements JavaDelegate {

  public void execute(DelegateExecution delegate) throws Exception {

    System.out.println("Spring Bean invoked.");

  }

}
```

And register it as a Spring Bean in the application context.

```java
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
```

If you redeploy the application, you should see the following message in the logfile, meaning that the service task was executed.
  
<pre class="console">
org.camunda.bpm.engine.impl.ProcessEngineImpl <init>
INFORMATION: ProcessEngine engine created
Spring Bean invoked
org.springframework.web.context.ContextLoader initWebApplicationContext
INFORMATION: Root WebApplicationContext: initialization completed in 1960 ms
</pre>

{{< get-tag repo="camunda-get-started-spring" tag="Step-3" >}}

# Done!

This marks the end of this tutorial. You have successfully set up a Spring Application with an embedded process engine. You can deploy this project to virtually any application server.
    
Where to go from here?

* Read the documentation about [Spring integration]({{< relref "user-guide/spring-framework-integration/index.md" >}}) in the camunda BPM platform in the User Guide.
* Explore the [BPMN 2.0 Implementation Reference]({{< relref "reference/bpmn20/index.md" >}}).

# Alternative Configuration: Using shared Process Engine

So far, we explored how to set up an embedded process engine inside a web application using the Spring Framework. You can also use the Spring Framework to develop applications that use a shared process engine. As opposed to the embedded process engine, the shared process engine is controlled independently from an application and is started / stopped by the runtime container (like Apache Tomcat). This allows multiple applications (or a single modular application) to use the same process engine. You can also re-deploy individual applications independently from the process engine.

In order to configure the loanapproval-spring example to work with an embedded process engine, you have to change three things:

First, we need to set the scope of the Maven dependency of the camunda-engine dependency to `provided`. On the camunda BPM platform the process engine library is provided as a shared library and does not need to be bundled with the application:

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine</artifactId>
  <version>${camunda.version}</version>
  <scope>provided</scope>
</dependency>
```

Furthermore, you can delete the dependencies `org.springframework:spring-jdbc` and `com.h2database:h2`.

Second, you need to add a `META-INF/processes.xml` file to your application.

```xml
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
```

And third, the `applicationContext.xml` file is adjusted so that the shared process engine is looked up and a `SpringServletProcessApplication` is bootstrapped:

```xml
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
```

{{< get-tag repo="camunda-get-started-spring" tag="Bonus" >}}

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

