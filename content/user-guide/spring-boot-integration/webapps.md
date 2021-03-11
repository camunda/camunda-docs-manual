---

title: "Web applications"
weight: 40

menu:
  main:
    name: "Web Applications"
    identifier: "user-guide-spring-boot-webapps"
    parent: "user-guide-spring-boot-integration"

---

To enable the [Web Applications]({{<ref "/webapps/_index.md">}}) you can use the following starter in your `pom.xml`:

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

{{< note title="Building custom Rest APIs" class="warning" >}}
  The Camunda Web Applications use a `CSRF Prevention Filter` that expects a `CSRF Token` on any modifying request coming through the `/api/*` url segment in the context path. This means that any Requests mapped to `"/api"` will fail and the current session will be ended if no CSRF Token is present.
{{< /note >}}

The default error handling coming with the Spring Boot ('whitelabel' error page) is enabled in the starter. To switch to the Camunda error pages (`webjar/META-INF/resources/webjars/camunda/error-XYZ-page.html`), please put them to the application folder structure under `/src/main/resources/public/error/XYZ.html`.


## Enterprise webapps

{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of the Camunda Platform, it is not available in the community edition.
{{< /enterprise >}}

To use the enterprise Web applications, include another starter:
```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter-webapp-ee</artifactId>
  <version>${project-version}</version>
</dependency>
```

Also don't forget to define the appropriate Camunda engine version (with "ee" suffix): see [Overriding Camunda version](../#overriding-camunda-version).

If you are using the enterprise edition, you can also use the [`camunda.bpm.license-file`]({{<ref "/user-guide/spring-boot-integration/configuration.md#license-file">}}) property to provide a license file that is inserted on application start. Or copy your license file under the name `camunda-license.txt` to your `src/main/resources`.
