---

title: "Introduction"
weight: 10

menu:
  main:
    identifier: "user-guide-introduction"
    parent: "user-guide"

---


Welcome to the Camunda BPM user guide! Camunda BPM is a Java-based framework for process automation. This document contains information about the features provided by the Camunda BPM platform.

Camunda BPM is built around the process engine component. The following illustration shows the most important components of Camunda BPM along with some typical user roles.

{{< img src="architecture-overview.png" title="Camunda Components and Roles" >}}


# Process Engine & Infrastructure

* [Process Engine]({{< relref "user-guide/process-engine/index.md" >}}) The process engine is a java library responsible for executing BPMN 2.0 processes and workflows. It has a lightweight POJO core and uses a relational database for persistence. ORM mapping is provided by the mybatis mapping framework.
* [Spring Framework Integration]({{< relref "user-guide/spring-framework-integration/index.md" >}})
* [CDI/Java EE Integration]({{< relref "user-guide/cdi-java-ee-integration/index.md" >}})
* [Runtime Container Integration]({{< relref "user-guide/runtime-container-integration/index.md" >}}) (Integration with application server infrastructure.)


# Web Applications

* [REST API]({{< relref "reference/rest/index.md" >}}) The REST API allows you to use the process engine from a remote application or a JavaScript application. (Note: The documentation of the REST API is factored out into an own document.)
* [Camunda Tasklist]({{< relref "user-guide/tasklist/index.md" >}}) A web application for human workflow management and user tasks that allows process participants to inspect their workflow tasks and navigate to task forms in order to work on the tasks and provide data input.
* [Camunda Cockpit]({{< relref "user-guide/cockpit/index.md" >}}) A web application for process monitoring and operations that allows you to search for process instances, inspect their state and repair broken instances.
* [Camunda Admin]({{< relref "user-guide/admin/index.md" >}}) A web application that allows you to manage users, groups and authorizations.
* [Camunda Cycle]({{< relref "user-guide/cycle/index.md" >}}) A web application for synchronizing BPMN 2.0 process models between different modeling tools and modelers.


# Additional Tools

* [Camunda Modeler](http://camunda.org/bpmn/tool/): Eclipse plugin for process modeling.
* [bpmn.io](http://bpmn.io/): BPMN web modeler which is used in our web applications Cockpit and Tasklist for rendering BPMN 2.0 process models in a browser. Although [bpmn.io](http://bpmn.io/) is still under development, its API is rather stable.
