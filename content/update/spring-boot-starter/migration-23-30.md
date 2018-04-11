---

title: "Migration from Community Extension v. 2.3.0 to v. 3.0.0"
weight: 10

menu:
  main:
    name: "2.3.0 to 3.0.0"
    identifier: "migration-guide-spring-boot-23-30"
    parent: "migration-guide-spring-boot"

---

# Upgrade to Spring boot 2.0.0

Within this minor release Camunda Spring Boot Starter started using Spring boot 2.0.0.
This version comes with some changes from Spring boot side, for more information please check Spring boot 2.0 [Release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Release-Notes) and [Migration guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Migration-Guide).

# Removed test dependencies 

`camunda-bpm-mockito` and `camunda-bpm-assert` dependencies were removed from `camunda-bpm-spring-boot-starter-test` project. If you still want to use them, 
you can directly include them to your project POM:

```xml
<dependency>
  <groupId>org.camunda.bpm.extension</groupId>
  <artifactId>camunda-bpm-assert</artifactId>
  <version>1.2</version>
  <scope>test</scope>
</dependency>

<dependency>
  <groupId>org.camunda.bpm.extension.mockito</groupId>
  <artifactId>camunda-bpm-mockito</artifactId>
  <version>3.1.0</version>
  <scope>test</scope>
</dependency>
```

# Deprecate property

Since this release `ignoreInvalidFields` property will not be taken into account.