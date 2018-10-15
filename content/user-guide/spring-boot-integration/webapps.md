---

title: "Web applications"
weight: 40

menu:
  main:
    name: "Web Applications"
    identifier: "user-guide-spring-boot-webapps"
    parent: "user-guide-spring-boot-integration"

---

To enable the [Web Applications]({{<relref "webapps/index.md">}}) you can use the following starter in your `pom.xml`:

```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter-webapp</artifactId>
  <version>{project-version}</version>
</dependency>
```

By default, the starter registers a controller to redirect `/` to Camunda's bundled `index.html`.
To disable this, you have to add to your application properties:
```properties
camunda.bpm.webapp.index-redirect-enabled=false
```

### Enterprise webapps
To use the enterprise Web applications, include another starter:
```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter-webapp-ee</artifactId>
  <version>${project-version}</version>
</dependency>
```

Also don't forget to define the appropriate Camunda engine version (with "ee" suffix): see [Overriding Camunda version](../#overriding-camunda-version).

If you are using the enterprise edition, you can also use the [`camunda.bpm.license-file`]({{<relref "user-guide/spring-boot-integration/configuration.md#license-file">}}) property to provide a license file that is inserted on application start. Or copy your license file under the name `camunda-license.txt` to your `src/main/resources`.
