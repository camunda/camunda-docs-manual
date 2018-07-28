---

title: "REST API"
weight: 30

menu:
  main:
    name: "REST API"
    identifier: "user-guide-spring-boot-rest-api"
    parent: "user-guide-spring-boot-integration"

---

To enable the [REST API]({{< ref "/reference/rest/_index.md">}}) you can use the following starter in your `pom.xml`:

```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter-rest</artifactId>
  <version>{project-version}</version>
</dependency>
```

By default the application path is `rest`, so without any further configuration you can access the api at `http://localhost:8080/rest/engine`.

Because we use jersey, one can use spring boot's [common application properties](http://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html).
For example, to change the application path, use
```properties
spring.jersey.application-path=myapplicationpath
```

To modify the configuration or register additional resources, one can provide a bean which extends from
`org.camunda.bpm.spring.boot.starter.rest.CamundaJerseyResourceConfig`:

```java
@Component
@ApplicationPath("/rest")
public class JerseyConfig extends CamundaJerseyResourceConfig {

  @Override
  protected void registerAdditionalResources() {
    register(...);
  }

}
```