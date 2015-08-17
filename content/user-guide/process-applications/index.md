---

title: "Process Applications"
weight: 30

menu:
  main:
    identifier: "user-guide-process-applications"
    parent: "user-guide"

---

A Process Application is an ordinary Java Application that uses the camunda process engine for BPM and Worklow functionality. Most such applications will start their own process engine (or use a process engine provided by the runtime container), deploy some BPMN 2.0 process definitions and interact with process instances derived from these process definitions. Since most process applications perform very similar bootstrapping, deployment and runtime tasks, we generalized this functionality into a Java Class which is named - *Surprise!* - `ProcessApplication`. The concept is similar to the `javax.ws.rs.core.Application` class in JAX-RS: adding the process application class allows you to bootstrap and configure the provided services.

Adding a `ProcessApplication` class to your Java Application provides your applications with the following services:

  * **Bootstrapping** embedded process engine(s) or looking up container managed process engine(s). You can define multiple process engines in a file named `processes.xml` which is added to your application. The ProcessApplication class makes sure this file is picked up and the defined process engines are started and stopped as the application is deployed / undeployed.
  * **Automatic deployment** of classpath BPMN 2.0 resources. You can define multiple deployments (process archives) in the `processes.xml` file. The process application class makes sure the deployments are performed upon deployment of your application. Scanning your application for process definition resource files (engine in *.bpmn20.xml or *.bpmn) is supported as well.
  * **Resolution of application-local Java Delegate Implementations** and Beans in case of a multi-application deployment. The process application class allows your java application to expose your local Java Delegate implementations or Spring / CDI beans to a shared, container managed process engine. This way you can start a single process engine that dispatches to multiple process applications that can be (re-)deployed independently.

Transforming an existing Java Application into a Process Application is easy and non-intrusive. You simply have to add:

* A Process Application class: The Process Application class constitutes the interface between your application and the process engine. There are different base classes you can extend to reflect different environments (e.g. Servlet vs. EJB Container).
* A processes.xml file to META-INF: The deployment descriptor file allows you to provide a declarative configuration of the deployment(s) that this process application makes to the process engine. It can be empty (see the <a href ="ref:#process-applications-the-processesxml-deployment-descriptor-empty-processesxml">empty processes.xml</a> section) and serve as simple marker file. If it is not present then the engine will start up but auto-deployment will not be performed.

{{< note title="" class="info" >}}
  You might want to checkout the [Getting Started Tutorial](http://camunda.org/get-started) first as it explains the creation of a process application step by step or the [Project Templates for Maven]({{< relref "user-guide/process-applications/maven-archetypes.md" >}}), which gives you a complete running process application out of the box.
{{< /note >}}
