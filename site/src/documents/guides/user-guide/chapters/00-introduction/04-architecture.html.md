---

title: 'Architecture Overview'
category: 'Introduction'

---


camunda BPM is a Java-based framework. The main components are written in Java and we have a general focus on providing Java developers with the tools they need for designing, implementing and running business processes and workflows on the JVM. Nevertheless, we also want to make the process engine technology available to Non-Java developers. This is why camunda BPM also provides a REST API which allows you to build applications connecting to a remote process engine.

camunda BPM can be used both as a standalone process engine server or embedded inside custom Java applications. The embeddability requirement is at the heart of many architecture decisions within camunda BPM. For instance, we work hard to make the process engine component a lightweight component with as little dependencies on [third-party libraries](ref:#introduction-third-party-libraries) as possible. Furthermore, the embeddability motivates programming model choices such as the capabilities of the process engine to participate in Spring Managed or JTA [transactions and the threading model](ref:#process-engine-transactions-in-processes).


## Process Engine Architecture

<center><img class="img-responsive" src="ref:asset:/assets/img/user-guide/process-engine-architecture.png"></img></center>

* [Process Engine Public API](ref:#process-engine-process-engine-api): Service-oriented API allowing Java applications to interact with the process engine. The different responsibilities of the process engine (ie. Process Repository, Runtime Process Interaction, Task Management, ...) are separated into individual services. The public API features a [command-style access pattern](http://en.wikipedia.org/wiki/Command_pattern): Threads entering the process engine are routed through a Command Interceptor which is used for setting up Thread Context such as Transactions.
* **BPMN 2.0 Core Engine**: this is the core of the process engine. It features a lightweight execution engine for graph structures (PVM - Process Virtual Machine), a BPMN 2.0 parser which transforms BPMN 2.0 Xml files into Java Objects and a set of BPMN Behavior implementations (providing the implementation for BPMN 2.0 constructs such as Gateways or Service Tasks).
* [Job Executor](ref:#process-engine-the-job-executor): the Job Executor is responsible for processing asynchronous background work such as Timers or asynchronous continuations in a process.
* **The Persistence Layer**: the process engine features a persistence layer responsible for persisting process instance state to a relational database. We use the MyBatis mapping engine for object relational mapping.

__Required third-party libraries__

See section on [third-party libraries](ref:#introduction-third-party-libraries).


## camunda BPM platform architecture

camunda BPM platform is a flexible framework which can be deployed in different scenarios. This section provides an overview over the most common deployment scenarios.


### Embedded Process Engine

<center><img class="img-responsive" src="ref:asset:/assets/img/user-guide/embedded-process-engine.png"></img></center>

In this case the process engine is added as an application library to a custom application. This way the process engine can easily be started and stopped with the application lifecycle. It is possible to run multiple embedded process engines on top of a shared database.

### Shared, container-managed Process Engine

<center><img class="img-responsive" src="ref:asset:/assets/img/user-guide/shared-process-engine.png"></img></center>

In this case the process engine is started inside the runtime container (Servlet Container, Application Server, ...). The process engine is provided as a container service and can be shared by all applications deployed inside the container. The concept can be compared to a JMS Message Queue which is provided by the runtime and can be used by all applications. There is a one-to-one mapping between process deployments and applications: the process engine keeps track of the process definitions deployed by an application and delegates execution to the application in question.

### Standalone (Remote) Process Engine Server

<center><img class="img-responsive" src="ref:asset:/assets/img/user-guide/standalone-process-engine.png"></img></center>

In this case the process engine is provided as a network service. Different applications running on the network can interact with the process engine through a remote communication channel. The easiest way for making the process engine accessible remotely is to use the built-in REST api. Different communication channels such as SOAP Webservices or JMS are possible but need to be implemented by users.

## Clustering Model

In order to provide scale-up or fail-over capabilities, the process engine can be distributed to different nodes in a cluster. Each process engine instance must then connect to a shared database.

<center><img class="img-responsive" src="ref:asset:/assets/img/user-guide/clustered-process-engine.png"></img></center>

The individual process engine instances do not maintain session state across transactions. Whenever the process engine runs a transaction, the complete state is flushed out to the shared database. This makes it possible to route subsequent requests which do work in the same process instance to different cluster nodes. This model is very simple and easy to understand and imposes limited restrictions when it comes to deploying a cluster installation. As far as the process engine is concerned there is also no difference between setups for scale-up and setups for fail-over (as the process engine keeps no session state between transactions).

The process engine [job executor](ref:#process-engine-the-job-executor) is also clustered and runs on each node. This way, there is no single point of failure as far as the process engine is concerned. The job executor can run in both [homogeneous and heterogeneous clusters](ref:#process-engine-the-job-executor-cluster-setups).

## Multi-Tenancy Model

To serve multiple, independent parties with one Camunda installation, the process engine supports multi-tenancy. Based on the requirements on how the data of different tenants should be separated, it is possible to configure data isolation on database row level on the one hand, or on database, schema, or table level on the other. Furthermore, Camunda's APIs provide access to processes and related data in a tenant-specific way. See the [multi-tenancy section](ref:#process-engine-multi-tenancy) for details.

## Web Application Architecture

The camunda BPM web applications are based on a RESTful architecture.

Frameworks used:

*   [JAX-RS](https://jax-rs-spec.java.net) based Rest API
*   [AngularJS](http://angularjs.org)
*   [RequireJS](http://requirejs.org)
*   [jQuery](http://jquery.com)
*   [Twitter Bootstrap](http://getbootstrap.com)

Additional custom frameworks developed by camunda hackers:

*   [camunda-bpmn.js](https://github.com/camunda/camunda-bpmn.js): camunda BPMN 2.0 JavaScript libraries
*   [ngDefine](https://github.com/Nikku/requirejs-angular-define): integration of AngularJS into RequireJS powered applications
*   [angular-data-depend](https://github.com/Nikku/angular-data-depend): toolkit for implementing complex, data heavy AngularJS applications


