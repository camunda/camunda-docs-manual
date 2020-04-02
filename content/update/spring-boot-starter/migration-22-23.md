---

title: "Migration from Community Extension v. 2.2.0 to v. 2.3.0"
weight: 10

menu:
  main:
    name: "2.2.0 to 2.3.0"
    identifier: "migration-guide-spring-boot-22-23"
    parent: "migration-guide-spring-boot"

---

# Maven dependencies

The `groupId` for Maven dependencies has changed, it is now `org.camunda.bpm.springboot`. For example:

```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter-webapp</artifactId>
  <version>2.3.0</version>
</dependency>
```

# Enterprise Web Applications

For Enterprise users, the way to use the Spring Boot Starter has changed. Instead of using the `enterprise` Maven profile, you can now include a special starter in your Maven POM file:
 
```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter-webapp-ee</artifactId>
  <version>2.3.0</version>
</dependency>
```

The same as before, you will also need to define the appropriate Camunda BPM version with the `-ee` suffix. See the documentation [here](https://docs.camunda.org/manual/latest/user-guide/spring-boot-integration/#overriding-camunda-version).
 
# Default configuration values changed

Some default configuration values changed. This means that if you relied on the old default values, you should now explicitly declare them in you configuration file:

* The history level is now FULL by default
* The UUID-Generator is used for id generation by default.

Also, the property `camunda.bpm.job-execution.active` was removed. The job executor is activated whenever it is enabled.