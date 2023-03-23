---

title: "CDI and Java EE Integration"
weight: 60

menu:
  main:
    identifier: "user-guide-cdi"
    parent: "user-guide"

---

The `camunda-engine-cdi` and `camunda-engine-cdi-jakarta` modules provide programming model integration with CDI (Context and Dependency Injection).
CDI is the Jakarta EE/Java EE standard for Dependency Injection. The Camunda CDI integration leverages both the configuration of the Camunda engine
and the extensibility of CDI. The most prominent features are:

 * A custom El-Resolver for resolving CDI beans (including EJBs) from the process.
 * Support for `@BusinessProcessScoped` beans (CDI beans, the lifecycle of which are bound to a process instance).
 * Declarative control over a process instance using annotations.
 * The Process Engine is hooked-up to the CDI event bus.
 * Works with Jakarta EE, Java EE, and Java SE.
 * Support for unit testing.

{{< note title="Quarkus Engine Extension" class="info" >}}
Since Quarkus ArC does not aim to fully implement CDI 2.0, you cannot use the full range of features the `camunda-engine-cdi` module provides.
Read about the limitations in the [Quarkus Integration]({{< ref "/user-guide/quarkus-integration/cdi-integration.md#limitations" >}}) guide.
{{< /note >}}

# Maven Dependency

To use the `camunda-engine-cdi` module inside your application, you must include the following Maven dependency:

{{< note title="" class="info" >}}
  Please import the [Camunda BOM](/get-started/apache-maven/) to ensure correct versions for every Camunda project.
{{< /note >}}

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine-cdi</artifactId>
</dependency>
```

For Jakarta EE 9+ containers, use the following dependency instead:

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine-cdi-jakarta</artifactId>
</dependency>
```

{{< note title="" class="info" >}}
  There is a [project template for Maven]({{< ref "/user-guide/process-applications/maven-archetypes.md" >}}) called `camunda-archetype-ejb-war`, which gives you a complete running project, including CDI integration.
{{< /note >}}
