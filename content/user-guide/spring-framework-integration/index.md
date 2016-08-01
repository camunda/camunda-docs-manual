---

title: "Spring Framework Integration"
layout: "section-list"
weight: 50

menu:
  main:
    identifier: "user-guide-spring-framework-integration"
    parent: "user-guide"

---

The camunda-engine Spring framework integration is located inside the `camunda-engine-spring` maven module and can be added to apache maven-based projects through the following dependency:

{{< note title="" class="info" >}}
  Please import the [Camunda BOM](/get-started/apache-maven/) to ensure correct versions for every Camunda project.
{{< /note >}}

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine-spring</artifactId>
</dependency>
```

The `camunda-engine-spring` artifact should be added as a library to the process application.

