---

title: 'Overview'
category: 'Cdi and Java EE Integration'

---

The camunda-engine-cdi module provides programming model integration with Cdi (Context and Dependency Injection). Cdi is the Java EE 6 standard for Dependency Injection. The camunda-engine-cdi integration leverages both the configuration of the camunda engine and the extensibility of Cdi. The most prominent features are:

 * A custom El-Resolver for resolving Cdi beans (including EJBs) from the process,
 * Support for @BusinessProcessScoped beans (Cdi beans the lifecycle of which is bound to a process instance),
 * Declarative control over a process instance using annotations,
 * The Process Engine is hooked-up to the Cdi event bus,
 * Works with both Java EE and Java SE, works with Spring,
 * Support for unit testing.

## Maven Dependency

In order to use the camunda-engine-cdi module inside your application, you must include the following Maven dependency:

    <dependency>
      <groupId>org.camunda.bpm</groupId>
      <artifactId>camunda-engine-cdi</artifactId>
      <version>7.x</version>
    </dependency>

Replace 'x' with your camunda BPM version.

<div class="alert alert-info">
  There is a <a href="ref:#process-applications-maven-project-templates-archetypes"><strong>project template for Maven</strong></a> called <code>camunda-archetype-ejb-war</code>, which gives you a complete running project including the Cdi integration.
</div>

