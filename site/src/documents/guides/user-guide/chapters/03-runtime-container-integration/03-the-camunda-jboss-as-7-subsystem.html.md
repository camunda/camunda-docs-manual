---

title: 'The camunda JBoss AS 7 Subsystem'
category: 'Runtime Container Integration'

---

<div class="alert alert-info">
  <p>
    <strong>Distribution & Installation Guide</strong>
  </p>
   <p>If you <a href="http://www.camunda.org/download/">download a pre-packaged distribution from camunda.org</a>, the camunda JBoss Subsystem is readily installed into the application server</p>
   <p><a href="ref:/guides/installation-guide/jboss/">Read the installation guide</a> in order to learn how to install the camunda JBoss subsystem into your JBoss Server.</p>
</div>

camunda BPM provides advanced integration for JBoss Application Server 7 in the form of a custom <a href="https://docs.jboss.org/author/display/AS71/Extending+JBoss+AS+7">JBoss AS 7 Subsystem</a>.

The most prominent features are:

* Deploy the process engine as shared jboss module.
* Configure the process engine in standalone.xml / domain.xml and administer it though the JBoss Management System.
* Process Engines are native JBoss Services with service lifecycle and dependencies.
* Automatic deployment of BPMN 2.0 processes (through the Process Application API).
* Use a managed Thread Pool provided by JBoss Threads in combination with the Job Executor.

## Configuring a process engine in standalone.xml / domain.xml

Using the camunda JBoss AS 7 Subsystem, it is possible to configure and manage the process engine through the JBoss Management Model. The most straight forward way is to add the process engine configuration to the `standalone.xml` file of the JBoss Server:

    <subsystem xmlns="urn:org.camunda.bpm.jboss:1.1">
        <process-engines>
            <process-engine name="default" default="true">
                <datasource>java:jboss/datasources/ProcessEngine</datasource>
                <history-level>full</history-level>
                <properties>
                    <property name="jobExecutorAcquisitionName">default</property>
                    <property name="isAutoSchemaUpdate">true</property>
                    <property name="authorizationEnabled">true</property>
                </properties>
            </process-engine>
        </process-engines>
        <job-executor>
            <thread-pool-name>job-executor-tp</thread-pool-name>
            <job-acquisitions>
                <job-acquisition name="default">
                    <acquisition-strategy>SEQUENTIAL</acquisition-strategy>
                    <properties>
                        <property name="lockTimeInMillis">300000</property>
                        <property name="waitTimeInMillis">5000</property>
                        <property name="maxJobsPerAcquisition">3</property>
                    </properties>
                </job-acquisition>
            </job-acquisitions>
        </job-executor>
    </subsystem>

It should be easy to see that the configuration consists of a single process engine which uses the Datasource `java:jboss/datasources/ProcessEngine` and is configured to be the `default` process engine. In addition, the Job Executor currently uses a single Job Acquisition also named default.

If you start up your JBoss AS 7 server with this configuration, it will automatically create the corresponding services and expose them through the management model.

## Providing a custom process engine configuration class

It is possible to provide a custom Process Engine Configuration class on JBoss AS 7. To this extend, provide the fully qualified classname of the class in the `standalone.xml` file:

    <process-engine name="default" default="true">
        <datasource>java:jboss/datasources/ProcessEngine</datasource>
        <configuration>org.my.custom.ProcessEngineConfiguration</configuration>
        <history-level>full</history-level>
        <properties>
            <property name="myCustomProperty">true</property>
            <property name="lockTimeInMillis">300000</property>
            <property name="waitTimeInMillis">5000</property>
        </properties>
    </process-engine>

The class `org.my.custom.ProcessEngineConfiguration` must be a subclass of `org.camunda.bpm.engine.impl.cfg.JtaProcessEngineConfiguration`.

The properties map can be used for invoking primitive valued setters (Integer, String, Boolean) that follow the Java Bean conventions. In the case of the example above, the
class would provide a method named

    public void setMyCustomProperty(boolean boolean) {
      ...
    }

<div class="alert alert-warning">
  <p>
    <strong>Module dependency of custom configuration class</strong>
  </p>
   <p>If you configure the process engine in `standalone.xml` and provide a custom configuration class packaged inside an own module, the camunda-jboss-subsystem module needs to have a module dependency on the module providing the class.</p>
   <p>If you fail to do this, you will see the following error log:</p>
   <pre class="console">
Caused by: org.camunda.bpm.engine.ProcessEngineException: Could not load 'foo.bar': the class must be visible from the camunda-jboss-subsystem module.
        at org.camunda.bpm.container.impl.jboss.service.MscManagedProcessEngineController.createProcessEngineConfiguration(MscManagedProcessEngineController.java:187) [camunda-jboss-subsystem-7.0.0-alpha8.jar:]
        at org.camunda.bpm.container.impl.jboss.service.MscManagedProcessEngineController.startProcessEngine(MscManagedProcessEngineController.java:138) [camunda-jboss-subsystem-7.0.0-alpha8.jar:]
        at org.camunda.bpm.container.impl.jboss.service.MscManagedProcessEngineController$3.run(MscManagedProcessEngineController.java:126) [camunda-jboss-subsystem-7.0.0-alpha8.jar:]
</pre>

</div>

## Extending a process engine using process engine plugins

It is possible to extend a process engine using the process engine plugins concept.
You specify the process engine plugins in `standalone.xml` / `domain.xml` for each process engine separately like shown below:

    <subsystem xmlns="urn:org.camunda.bpm.jboss:1.1">
        <process-engines>
            <process-engine name="default" default="true">
                <datasource>java:jboss/datasources/ProcessEngine</datasource>
                <history-level>full</history-level>
                <properties>
                    ...
                </properties>
                <plugins>
                    <plugin>
                        <class>org.camunda.bpm.engine.MyCustomProcessEnginePlugin</class>
                        <properties>
                            <property name="boost">10</property>
                            <property name="maxPerformance">true</property>
                            <property name="actors">akka</property>
                        </properties>
                    </plugin>
                </plugins>
            </process-engine>
        </process-engines>
        ...
    </subsystem>

You have to provide the fully qualified classname between the `<class>` tags. Additional properties can be specified using the `<properties>` element.
The restrictions, which apply for [providing a custom process engine configuration class](#runtime-container-integration-the-camunda-jboss-as-7-subsystem-providing-a-custom-process-engine-configuration-class), are also valid for the process engine plugins:

 * plugin class must be visible in the classpath for the camunda-subsystem.
 * properties map can be used for invoking primitive valued setters (Integer, String, Boolean) that follow the Java Bean conventions.

## Looking up a Process Engine in JNDI

The camunda JBoss subsystem provides the same [JNDI bindings for the ProcessApplicationService and the ProcessEngineService](#runtime-container-integration-jndi-bindings-for-bpm-platform-services) as provided on other containers. In addition, the camunda JBoss subsystem creates JNDI Bindings for all managed process engines, allowing us to look them up directly.

The global JNDI bindings for process engines follow the pattern

    java:global/camunda-bpm-platform/process-engine/$PROCESS_ENGINE_NAME

If a process engine is named "engine1", it will be available using the name `java:global/camunda-bpm-platform/process-engine/engine1`.

Note that when looking up the process engine, using a declarative mechanism (like `@Resource` or referencing the resource in a deployment descriptor) is preferred over a programmatic way. The declarative mechanism makes the application server aware of our dependency on the process engine service and allows it to manage that dependency for us. See also: [Managing Service Dependencies](#runtime-container-integration-the-camunda-jboss-as-7-subsystem-explicit-service-dependencies).

<div class="alert alert-warning">
  <p>
    <strong>Looking up a Process Engine from JNDI using Spring</strong>
  </p>
   <p>On JBoss AS 7, spring users should always [create a resource-ref for the process engine in web.xml](#bpmplatform-container-jboss-services) and then lookup the local name in the `java:comp/env/` namespace. <a href="https://github.com/camunda/camunda-quickstarts/tree/master/deployment/spring-jboss-non-pa">For an example, see this Quickstart</a>.</p>
</div>

## Managing the process engine through the JBoss Management System

In oder to inspect and change the management model, we can use <a href="https://docs.jboss.org/author/display/AS72/Management+Clients">one of the multiple JBoss Management clients available</a>.

### Inspecting the configuration

It is possible to inspect the configuration using the CLI (Command Line Interface, jboss-cli.bat/sh):

<pre class="console">
You are disconnected at the moment. Type 'connect' to connect to the server or 'help' for the list of supported commands.
[disconnected /] connect
[standalone@localhost:9999 /] cd /subsystem=camunda-bpm-platform
[standalone@localhost:9999 subsystem=camunda-bpm-platform] :read-resource(recursive=true)
{
    "outcome" => "success",
    "result" => {
        "job-executor" => {"default" => {
            "thread-pool-name" => "job-executor-tp",
            "job-acquisitions" => {"default" => {
                "acquisition-strategy" => "SEQUENTIAL",
                "name" => "default",
                "properties" => {
                    "lockTimeInMillis" => "300000",
                    "waitTimeInMillis" => "5000",
                    "maxJobsPerAcquisition" => "3"
                }
            }}
        }},
        "process-engines" => {"default" => {
            "configuration" => "org.camunda.bpm.container.impl.jboss.config.ManagedJtaProcessEngineConfiguration",
            "datasource" => "java:jboss/datasources/ProcessEngine",
            "default" => true,
            "history-level" => "full",
            "name" => "default",
            "properties" => {
                "jobExecutorAcquisitionName" => "default",
                "isAutoSchemaUpdate" => "true"
            }
        }}
    }
}
</pre>

### Stopping a Process Engine through the JBoss Management System

Once the process engine is registered in the JBoss Management Model, it is possible to control it thorough the management API. For example, you can stop it through the CLI:

<pre class="console">
[standalone@localhost:9999 subsystem=camunda-bpm-platform] cd process-engines=default
[standalone@localhost:9999 process-engines=default] :remove
{"outcome" => "success"}
</pre>

This removes the process engine and all dependent services. This means that if you remove a process engine the application server will stop all deployed applications which use the process engine.

<div class="alert alert-warning">
  <p>
    <strong>Declaring Service Dependencies</strong>
  </p>
   <p>In order for this to work, but also in order to avoid race conditions at deployment time, it is necessary that each application explicitly declares dependencies on the process engines it is using. <a href="">Learn how to declare dependencies</a></p>
</div>

### Starting a Process Engine through the JBoss Management System

It is also possible to start a new process engine at runtime:
<pre class="console">
[standalone@localhost:9999 subsystem=camunda-bpm-platform] /subsystem=camunda-bpm-platform/process-engines=my-process-engine/:add(name=my-process-engine,datasource=java:jboss/datasources/ExampleDS)
{"outcome" => "success"}
</pre>

One of the nice features of the JBoss AS 7 Management System is that it will

* persist any changes to the model in the underlying configuration file. This means that if you start a process engine using the command line interface, the configuration will be added to `standalone.xml` / `domain.xml` such that it is available when the server is restarted.
* distribute the configuration in the cluster and start / stop the process engine on all servers part of the same domain.

### Using the JBoss JConsole Extensions

In some cases, you may find it more convenient to use the JBoss JConsole extension for starting a process engine.

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/jboss-jconsole.png"></img></center>

The JConsole plugin allows you to inspect the management model graphically and build operations using a wizard. In order to start the JBoss JConsole plugin, start the jconsole.bat/sh file provided in the JBoss distribution. <a href="https://docs.jboss.org/author/display/AS72/JMX+subsystem+configuration">More Information in the JBoss Docs</a>.

## Managing Classpath Dependencies

<div class="alert alert-info">
  <p>
    <strong>Implicit module dependencies</strong>
  </p>
   <p>Classpath dependencies are automatically managed for you if you use the <a href="ref:#process-applications">Process Application API</a>.</p>
</div>

When using the camunda BPM JBoss AS subsystem, the process engine classes are deployed as jboss module. The module is named
`org.camunda.bpm.process-engine` and is deployed in the folder `$JBOSS_HOME/modules/org/camunda/bpm/camunda-engine`.

By default, the Application server will not add this module to the classpath of applicaitons.If an application needs to interact with the process engine, we must declare a module dependency in the application. This can be achieved using either an implicit or an explicit module dependency.

### Implicit module dependencies with the Process Application API

When using the Process Application API (ie. when deploying either a ServletProcessApplication or an EjbProcessApplication), the camunda JBoss Subsystem will detect the `@ProcessApplication` class in the deployment and automatically add a module dependency between the application and the process engine module. As a result, we don't have to declare the dependency ourselves. It is called an <a href="https://docs.jboss.org/author/display/AS72/Implicit+module+dependencies+for+deployments">implicit module dependency</a> because it is not explicitly declared but can be derived by inspecting the application and seeing that it provides a `@ProcessApplication` class.

### Explicit module dependencies

If an application does not use the process application API but still needs the process engine classes to be added to its classpath, an explicit module dependency is required.
JBoss AS 7 has <a href="https://docs.jboss.org/author/display/AS72/Class+Loading+in+AS7">different mechanisms for achieving this</a>. The simplest way is to add a manifest entry to the MANIFEST.MF file of the deployment. The following example illustrates how to generate such a dependency using the maven WAR plugin:

    <build>
       ...
       <plugins>
         <plugin>
           <groupId>org.apache.maven.plugins</groupId>
           <artifactId>maven-war-plugin</artifactId>
           <configuration>
              <archive>
                 <manifestEntries>
                    <Dependencies>org.camunda.bpm.process-engine</Dependencies>
                 </manifestEntries>
              </archive>
           </configuration>
         </plugin>
       </plugins>
    </build>

As a result, the Application Service will add the process engine module to the classpath of the application.

## Managing Service Dependencies

<div class="alert alert-info">
  <p>
    <strong>Implicit service dependencies</strong>
  </p>
   <p>Service dependencies are automatically managed for you if you use the <a href="ref:#process-applications">Process Application API</a>.</p>
</div>

The camunda JBoss subsystem manages process engines as JBoss Services in the JBoss Module Service Container. In order for the Module Service Container to provide the process engine service(s) to the deployed applications, it is important that the dependencies are known. Consider the following example:

<center><img class="img-responsive" src="ref:asset:/guides/user-guide/assets/img/jboss-service-dependencies.png"></img></center>

There are three applications deployed and two process engine services exist. Application 1 and Application 2 are using Process Engine 1 and Application 3 is using Process Engine 2.

### Implicit Service Dependencies

When using the Process Application API (ie. when deploying either a ServletProcessApplication or an EjbProcessApplication), the camunda JBoss Subsystem will detect the `@ProcessApplication` class in the deployment and automatically add a service dependency between the process application component and the process engine module. This makes sure the process engine is available when the process application is deployed.

### Explicit Service Dependencies

If an application does not use the process application API but still needs to interact with a process engine, it is important to declare the dependency on the process engine service explicitly. If we fail to declare the dependency, there is no guarantee that the process engine is available to the application.

* When the application server is started, it will bring up services concurrently. If it is not aware of the dependency between the application and the process engine, the application may start *before* the process engine, potentially resulting in exceptions if the process engine is accessed from some deployment listener (like a servlet context listener or a @PostConstruct callback of an Enterprise Bean).
* If the process engine is stopped while the application is deployed, the application server must stop the application as well.

The simplest way to add an explicit dependency on the process engine is to bind the process engine in application's local naming space. For instance, we can add the following resource reference to the `web.xml` file of a web application:

    <resource-ref>
      <res-ref-name>processEngine/default</res-ref-name>
      <res-type>org.camunda.bpm.engine.ProcessEngine</res-type>
      <mapped-name>java:global/camunda-bpm-platform/process-engine/default</mapped-name>
    </resource-ref>

This way, the global process engine resource `java:global/camunda-bpm-platform/process-engine/default` is available locally under the name `processEngine/default`. Since the application server is aware of this dependency, it will make sure the process engine service exists before starting the application and it will stop the application if the process engine is removed.

The same effect can be achieved using the @Resource Annotation:

    @Stateless
    public class PaComponent {

      @Resource(mappedName="java:global/camunda-bpm-platform/process-engine/default")
      private ProcessEngine processEngine;

      @Produces
      public ProcessEngine getProcessEngine() {
        return processEngine;
      }

    }
