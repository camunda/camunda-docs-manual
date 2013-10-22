---

title: 'Overview'
category: 'Process Applications'

---

A Process Application is an ordinary Java Application that uses the camunda process engine for BPM and Worklow functionality. Most such applications will start their own process engine (or use a process engine provided by the runtime container), deploy some BPMN 2.0 process definitions and interact with process instances derived from these process definitions. Since most process applications perform very similar bootstrapping, deployment and runtime tasks, we generalized this functionaly into a Java Class which is named - *Surprise!* - `ProcessApplication`. The concept is similar to the `javax.ws.rs.core.Application` class in JAX-RS: adding the process application class allows you to bootrap and configure the provided services.

Adding a `ProcessApplication` class to your Java Application provides your applications with the following services:

  * **Bootrapping** embedded process engine(s) or looking up container managed process engine(s). You can define multiple process engines in a file named `processes.xml` which is added to your application. The ProcessApplication class makes sure this file is picked up and the defined process engines are started and stopped as the application is deployed / undeployed.
  * **Automatic deployment** of classpath BPMN 2.0 resources. You can define multiple deployments (process archives) in the `processes.xml` file. The process application class makes sure the deployments are performed upon deployment of your application. Scanning your application for process definition resource files (engine in *.bpmn20.xml or *.bpmn) is supported as well.
  * **Resolution of application-local Java Delegate Implementations** and Beans in case of a multi-application deployment. The process application class allows your java application to expose your local Java Delegate implementations or Spring / CDI beans to a shared, container managed process engine. This way you can start a single process engine that dispatches to multiple process applications that can be (re-)deployed independently.

Transforming an existing Java Application into a Process Application is easy and non-intrusive. You simply have to add:

* A Process Application class: The Process Application class constitutes the interface between your application and the process engine. There are different base classes you can extent to reflect different environments (e.g. Servlet vs. EJB Container).
* A processes.xml file to META-INF: The deployment descriptor file allows  to provide a declarative configuration of the deployment(s) this process application makes to the process engine. It can be empty and serve as simple marker file - but it must be present.

<div class="alert alert-info">
  <p>
    <strong>Heads-up!</strong>
    You might want to checkout the <a href="http://www.camunda.org/get-started"><strong>Getting Started Tutorial</strong></a> first as it explaines the creation of a process application step by step or the <a href="ref:#process-applications-maven-project-templates-archetypes"><strong>Project Templates for Maven</strong></a>, which give you a complete running process application out of the box.
  </p>
</div>
