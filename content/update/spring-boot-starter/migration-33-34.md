---

title: "Migration from Community Extension v. 3.3.0 to v. 3.4.0"
weight: 10

menu:
  main:
    name: "3.3.0 to 3.4.0"
    identifier: "migration-guide-spring-boot-33-34"
    parent: "migration-guide-spring-boot"

---

# Upgrade to Spring boot 2.2.1

The 3.4.0 version of the Camunda Spring Boot Starter minor release comes with an update to Spring
Boot 2.2.1. To see what changes have been introduced from the Spring Boot side, please check the
Spring Boot 2.2 [Release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.2-Release-Notes).

# Spin DataFormat Configuration

From this minor release, the Camunda Spring Boot Starter provides auto-configuration classes for
configuring Spin DataFormats with [Jackson Java 8 modules](https://github.com/FasterXML/jackson-modules-java8).
To trigger the auto-configuration, simply add the necessary dependencies. For example, to provide 
support for Java 8 Date/time types in Spin, add the following dependencies in your Spring Boot
Application's `pom.xml` file:

```xml
<dependencies>
  <dependency>
    <groupId>org.camunda.spin</groupId>
    <artifactId>camunda-spin-dataformat-json-jackson</artifactId>
  </dependency>
  <dependency>
    <groupId>com.fasterxml.jackson.datatype</groupId>
    <artifactId>jackson-datatype-jsr310</artifactId>
  </dependency>
</dependencies>
```

Furthermore, additional `DataFormatConfigurators` can be added through the `META-INT/spring.factories`
file, as an alternative to the standard Java SPI method.
