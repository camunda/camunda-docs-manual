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

Within this minor release Spring boot started using Spring boot 2.0.0 release.
This version come with some changes from Spring boot side, for more information please check Spring boot 2.0 [Release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Release-Notes) and [Migration guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Migration-Guide).

# Removed dependencies 

`camunda-bpm-mockito` dependency has been removed from `camunda-bpm-spring-boot-starter-test` project.
As alternative way is to use `camunda-bpm-assert` dependency. You can check the following [pom](https://github.com/camunda/camunda-bpm-examples/blob/master/spring-boot-starter/example-simple/pom.xml) example.

```xml
<dependency>
  <groupId>org.camunda.bpm.extension</groupId>
  <artifactId>camunda-bpm-assert</artifactId>
  <version>1.2</version>
  <scope>test</scope>
</dependency>
```

# Deprecate properties

Since this release `ignoreInvalidFields` and `ignoreUnknownFields` properties will not be taken into account.