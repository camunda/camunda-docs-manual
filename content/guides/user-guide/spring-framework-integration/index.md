---

title: "Spring Framework Integration"
weight: 50

menu:
  main:
    identifier: "user-guide-spring-framework-integration"
    parent: "user-guide"

---

The camunda-engine spring framework integration is located inside the `camunda-engine-spring` maven module and can be added to apache maven-based projects through the following dependency:

<%- @partial('camunda-bom.html.eco', @, {}) %>

```xml
<dependency>
  <groupId>org.camunda.bpm</groupId>
  <artifactId>camunda-engine-spring</artifactId>
</dependency>
```

The `camunda-engine-spring` artifact should be added as a library to the process application.