---

title: 'The Process Application class'
category: 'Process Applications'

---

You can delegate the bootstrapping of the process engine and process deployment to a process application class. The basic ProcessApplication functionality is provided by the `org.camunda.bpm.application.AbstractProcessApplication` base class. Based on this class there is a set of environment-specific sub classes that realize integration within a specific environment:

* **ServletProcessApplication**: To be used for Process Applications in a Servlet Container like Apache Tomcat.
* **EjbProcessApplication**: To be used in a Java EE application server like JBoss, Glassfish or WebSphere Application Server.
* **EmbeddedProcessApplication**: To be used when embedding the process engine in an ordinary Java SE application.
* **SpringProcessApplication**: To be used for bootstrapping the process application from a Spring Application Context.

In the following section, we walk through the different implementations and discuss where and how they can be used.

## The ServletProcessApplication

<div class="alert alert-warning">
  <p>
    <strong>All Servlet Containers</strong>
  </p>
    <span class="container-tiny tomcat"></span>
    <span class="container-tiny as7"></span>
    <span class="container-tiny glassfish"></span>

  <p>The Servlet Process Application is supported on all containers. Read the <a href="ref:/guides/user-guide/#process-applications-the-process-application-class-using-the-servletprocessapplication-inside-an-ejb--java-ee-container-such-as-glassfish-or-jboss">note about Servlet Process Application and EJB / Java EE containers</a>.</p>
  <p><strong>Packaging</strong>: WAR (or embedded WAR inside EAR)</p>
</div>

The `ServletProcessApplication` class is the base class for developing Process Applications based on the Servlet Specification (Java Web Applications). The servlet process application implements the `javax.servlet.ServletContextListener` interface which allows it to participate in the deployment lifecycle of your Web application

The following is an example of a Servlet Process Application:

    package org.camunda.bpm.example.loanapproval;

    import org.camunda.bpm.application.ProcessApplication;
    import org.camunda.bpm.application.impl.ServletProcessApplication;

    @ProcessApplication("Loan Approval App")
    public class LoanApprovalApplication extends ServletProcessApplication {
      // empty implementation
    }

Notice the `@ProcessApplication` annotation. This annotation fulfills two purposes:

  * **providing the name of the ProcessApplication**: You can provide a custom name for your process application using the annotation: `@ProcessApplication("Loan Approval App")`. If no name is provided, a name is automatically detected. In case of a ServletProcessApplication, the name of the ServletContext is used.
  * **triggering auto-deployment**. In a Servlet 3.0 container, the annotation is sufficient for making sure that the process application is automatically picked up by the servlet container and automatically added as a ServletContextListener to the Servlet Container deployment. This functionality is realized by a `javax.servlet.ServletContainerInitializer` implementation named `org.camunda.bpm.application.impl.ServletProcessApplicationDeployer` which is located in the camunda-engine module. The implementation works for both embedded deployment of the camunda-engine.jar as a web application library in the `WEB-INF/lib` folder of your WAR file or for the deployment of the camunda-engine.jar as a shared library in the shared library (i.e. Apache Tomcat global `lib/` folder) directory of your application server. The Servlet 3.0 Specification foresees both deployment scenarios. In case of embedded deployment, the `ServletProcessApplicationDeployer` is notified once, when the webapplication is deployed. In case of deployment as a shared library, the `ServletProcessApplicationDeployer` is notified for each WAR file containing a class annotated with `@ProcessApplication` (as required by the Servlet 3.0 Specification).

This means that in case you deploy to a Servlet 3.0 compliant container (such as Apache Tomcat 7) annotating your class with `@ProcessApplication` is sufficient.

<div class="alert alert-info">
  <p>
    There is a <a href="ref:#process-applications-maven-project-templates-archetypes"><strong>project template for Maven</strong></a> called <code>camunda-archetype-servlet-war</code>, which gives you a complete running project based on a ServletProcessApplication.
  </p>
</div>

### Deploying to Apache Tomcat 6 or other Pre-Servlet 3.0 Containers

In a Pre-Servlet 3.0 container such as Apache Tomcat 6 (or JBoss Application Server 5 for that matter), you need manually register your ProcessApplication class as Servlet Context Listener in the Servlet Container. This can be achieved by adding a listener element to your `WEB-INF/web.xml` file:


    <?xml version="1.0" encoding="UTF-8"?>
    <web-app version="2.5" xmlns="http://java.sun.com/xml/ns/javaee"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://java.sun.com/xml/ns/javaee    http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">

      <listener>
        <listener-class>org.my.project.MyProcessApplication</listener-class>
      </listener>

    </web-app>

<a name="servlet-process-applicarion-inside-ejb-container"></a>

### Using the ServletProcessApplication inside an EJB / Java EE Container such as Glassfish or JBoss

You can use the ServletProcessApplication inside an EJB / Java EE Container such as Glassfish or JBoss. Process application bootstrapping and deployment will work in the same way. However, you will not be able to use all Java EE features at runtime. In contrast to the `EjbProcessApplication` (see next section), the `ServletProcessApplication` does not perform proper Java EE cross-application context switching. When the process engine invokes Java Delegates from your application, only the Context Class Loader of the current Thread is set to the classloader of your application. This does allow the process engine to resolve Java Delegate implementations from your application but the container will not perform an EE context switch to your application. As a consequence, if you use the ServletProcessApplciation inside a Java EE container, you will not be able to use features like:

  * using CDI beans and EJBs as JavaDelegate Implementations in combination with the Job Executor,
  * using @RequestScoped CDI Beans with the Job Executor,
  * looking up JNDI resources from the application's naming scope

If your application does not use such features, it is perfectly fine to use the ServletProcessApplication inside an EE container. In that case you only get servlet specification guarantees.

## The EjbProcessApplication

<div class="alert alert-warning">
  <p>
    <strong>Java EE 6 Container only</strong>
  </p>
  <p>
    <span class="container-tiny as7"></span>
    <span class="container-tiny glassfish"></span>
  </p>
  <p>The EjbProcessApplication is supported in Java EE 6 containers or higher. It is not supported on Servlet Containers like Apache Tomcat. It may be adapted to work inside Java EE 5 Containers.</p>
  <p><strong>Packaging:</strong> JAR, WAR, EAR</p>
</div>

The EjbProcessApplication is the base class for developing Java EE based Process Applications. An Ejb Process Application class itself must be deployed as an EJB.

In order to add an Ejb Process Application to your Java Application, you have two options:

  * **Bundling the camunda-ejb-client**: we provide a generic, reusable EjbProcessApplication implementation (named `org.camunda.bpm.application.impl.ejb.DefaultEjbProcessApplication`) bundled as a maven artifact. The simplest possibility is to add this implementation as a maven dependency to your application.
  * **Writing a custom EjbProcessApplication**: if you want to customize the behavior of the EjbProcessApplication, you can write a custom subclass of the EjbProcessApplication class and add it to your application.

Both options are explained in greater detail below.

### Bundling the camunda-ejb-client Jar

The most convenient option for deploying a process application to an Ejb Container is by adding the following maven dependency to you maven project:

    <dependency>
      <groupId>org.camunda.bpm.javaee</groupId>
      <artifactId>camunda-ejb-client</artifactId>
      <version>${camunda.version}</version>
    </dependency>

The camunda-ejb-client contains a reusable default implementation of the EjbProcessApplication as a Singleton Session Bean with auto-activation.

This deployment option requires that your project is a composite deployment (such as a WAR or EAR) since you need to add a library JAR file. You could of course use something like the maven shade plugin for adding the class contained in the camunda-ejb-client artifact to a JAR-based deployment.

<div class="alert alert-info">
  We always recommend using the camunda-ejb-client over deploying a custom EjbProcessApplication class unless you want to customize the behavior of the EjbProcessApplication.
  There is a <a href="ref:#process-applications-maven-project-templates-archetypes"><strong>project template for Maven</strong></a> called <code>camunda-archetype-ejb-war</code>, which gives you a complete running project based on the camunda-ejb-client.
</div>


### Deploying a custom EjbProcessApplication class

If you want to customize the behavior of the the EjbProcessApplication class you have the option of writing a custom EjbProcessApplication class. The following is an example of such an implementation:

    @Singleton
    @Startup
    @ConcurrencyManagement(ConcurrencyManagementType.BEAN)
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    @ProcessApplication
    @Local(ProcessApplicationInterface.class)
    public class MyEjbProcessApplication extends EjbProcessApplication {

      @PostConstruct
      public void start() {
        deploy();
      }

      @PreDestroy
      public void stop() {
        undeploy();
      }

    }

### Invocation Semantics of  the EjbProcessApplication

The fact that the EjbProcessApplication exposes itself as a Session Bean Component inside the EJB container determines

 * the invocation semantics when invoking code from the process application and
 * the nature of the `ProcessApplicationReference` held by the process engine.

When the process engine invokes the Ejb Process Application, it gets EJB invocation semantics. For example, if your process application provides a `JavaDelegate` implementation, the process engine will call the EjbProcessApplication's `execute(java.util.concurrent.Callable)` method and from that method invoke `JavaDelegate`. This makes sure that

  * the call is intercepted by the EJB container and "enters" the process application legally.
  * the `JavaDelegate` may take advantage of the EjbProcessApplication's invocation context and resolve resources from the component's environment (such as a `java:comp/BeanManager`).

<pre>
                   Big pile of EJB interceptors
                                |
                                |  +--------------------+
                                |  |Process Application |
                  invoke        v  |                    |
 ProcessEngine ----------------OOOOO--> Java Delegate   |
                                   |                    |
                                   |                    |
                                   +--------------------+
</pre>

When the EjbProcessApplication registers with a process engine (see `ManagementService#registerProcessApplication(String, ProcessApplicationReference)`, the process application passes a reference to itself to the process engine. This reference allows the process engine to reference the process application. The EjbProcessApplication takes advantage of the Ejb Containers naming context and passes a reference containing the EJBProcessApplication's Component Name to the process engine. Whenever the process engine needs access to process application, the actual component instance is looked up and invoked.

## The EmbeddedProcessApplication

<div class="alert alert-warning">
  <p>
    <strong>All containers</strong>
  </p>
  <p>
    <span class="container-tiny jvm"></span>
    <span class="container-tiny tomcat"></span>
    <span class="container-tiny as7"></span>
    <span class="container-tiny glassfish"></span>
  </p>
  <p>The EmbeddedProcessApplication can only be used with an embedded process engine and does not provide
  auto-activation.</p>
  <p><strong>Packaging:</strong> JAR, WAR, EAR</p>
</div>

The `org.camunda.bpm.application.impl.EmbeddedProcessApplication` can only be used in combination with an embedded process engine. Usage in combination with a Shared Process Engine is not supported as the class performs no process application context switching at runtime.

The Embedded Process Application also does not provide auto-startup. You need to manually call the deploy method of your process application:

    // instantiate the process application
    MyProcessApplication processApplication = new MyProcessApplication();

    // deploy the process application
    processApplication.deploy();

    // interact with the process engine
    ProcessEngine processEngine = BpmPlatform.getDefaultProcessEngine();
    processEngine.getRuntimeService().startProcessInstanceByKey(...);

    // undeploy the process application
    processApplication.undeploy();

Where the class `MyProcessApplication` could look like this:

    @ProcessApplication(
        name="my-app",
        deploymentDescriptors={"path/to/my/processes.xml"}
    )
    public class MyProcessApplication extends EmbeddedProcessApplication {

    }

## The SpringProcessApplication

<div class="alert alert-warning">
  <p>
    <strong>Supported on</strong>
  </p>
  <p>
    <span class="container-tiny jvm"></span>
    <span class="container-tiny tomcat"></span>
    <span class="container-tiny glassfish"></span>
  </p>
  <p>The spring process application is currently <strong>not supported on JBoss AS 7</strong>.</p>
  <p><strong>Packaging:</strong> JAR, WAR, EAR</p>
</div>

The `org.camunda.bpm.engine.spring.application.SpringProcessApplication` class allows bootstrapping a process application through a Spring Application Context. You can either reference the SpringProcessApplication class from an Xml-based application context configuration file or use an annotation-based setup.

If your application is a WebApplication you should use `org.camunda.bpm.engine.spring.application.SpringServletProcessApplication` as it provides support for exposing the servlet context path through the `ProcessApplicationInfo#PROP_SERVLET_CONTEXT_PATH` property.

<div class="alert alert-info">
  <strong>SpringServletProcessApplication</strong>
  <p>We recommend to always use SpringServletProcessApplication unless the deployment is not a web application. Using this class requires the
  <code>org.springframework:spring-web</code> module to be on the classpath.</p>
</div>

### Configuring a Spring Process Application

The following shows an example of how to bootstrap a SpringProcessApplication inside a spring application context Xml file:

    <beans xmlns="http://www.springframework.org/schema/beans"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://www.springframework.org/schema/beans
                               http://www.springframework.org/schema/beans/spring-beans.xsd">

      <bean id="invoicePa" class="org.camunda.bpm.engine.spring.application.SpringServletProcessApplication" />

    </beans>

(Remember that you additionally need a `META-INF/processes.xml` file.

### Process Application Name

The SpringProcessApplication will use the bean name (`id="invoicePa"` in the example above) as auto-detected name for the process application. Make sure to provide a unique process application name here (unique across all process applications deployed on a single application server instance.) As an alternative, you can provide a custom subclass of SpringProcessApplication (or SpringServletProcessApplication) and override the `getName()` method.

### Configuring a Managed Process Engine using Spring

If you use a Spring Process Application, you may want to configure your process engine inside the spring application context Xml file (as opposed to the processes.xml file). In this case, you must use the `org.camunda.bpm.engine.spring.container.ManagedProcessEngineFactoryBean` class for creating the process engine object instance. In addition to creating the process engine object, this implementation registers the process engine with the BPM Platform infrastructure so that the process engine is returned by the `ProcessEngineService`. The following is an example of how to configure a managed process engine using Spring.

    <beans xmlns="http://www.springframework.org/schema/beans"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://www.springframework.org/schema/beans
                               http://www.springframework.org/schema/beans/spring-beans.xsd">

        <bean id="dataSource" class="org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy">
            <property name="targetDataSource">
                <bean class="org.springframework.jdbc.datasource.SimpleDriverDataSource">
                    <property name="driverClass" value="org.h2.Driver"/>
                    <property name="url" value="jdbc:h2:mem:camunda;DB_CLOSE_DELAY=1000"/>
                    <property name="username" value="sa"/>
                    <property name="password" value=""/>
                </bean>
            </property>
        </bean>

        <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
            <property name="dataSource" ref="dataSource"/>
        </bean>

        <bean id="processEngineConfiguration" class="org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration">
            <property name="processEngineName" value="default" />
            <property name="dataSource" ref="dataSource"/>
            <property name="transactionManager" ref="transactionManager"/>
            <property name="databaseSchemaUpdate" value="true"/>
            <property name="jobExecutorActivate" value="false"/>
        </bean>

        <!-- using ManagedProcessEngineFactoryBean allows registering the ProcessEngine with the BpmPlatform -->
        <bean id="processEngine" class="org.camunda.bpm.engine.spring.container.ManagedProcessEngineFactoryBean">
            <property name="processEngineConfiguration" ref="processEngineConfiguration"/>
        </bean>

        <bean id="repositoryService" factory-bean="processEngine" factory-method="getRepositoryService"/>
        <bean id="runtimeService" factory-bean="processEngine" factory-method="getRuntimeService"/>
        <bean id="taskService" factory-bean="processEngine" factory-method="getTaskService"/>
        <bean id="historyService" factory-bean="processEngine" factory-method="getHistoryService"/>
        <bean id="managementService" factory-bean="processEngine" factory-method="getManagementService"/>

    </beans>
