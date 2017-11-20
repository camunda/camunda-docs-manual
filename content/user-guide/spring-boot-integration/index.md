---

title: "Spring Boot Integration"
layout: "section-list"
weight: 55

menu:
  main:
    identifier: "user-guide-spring-boot-integration"
    parent: "user-guide"

---

The Camunda Engine can be used in a Spring Boot application by using provided Spring Boot starters.
Spring boot starters allow to enable behavior of your spring-boot application by adding dependencies to the classpath.
 
These starters will pre-configure the Camunda process engine, REST API and Web applications, so they can easily be used in a standalone process application.

If you are not familiar with [Spring Boot](http://projects.spring.io/spring-boot/), read the [getting started](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#getting-started) guide.

To enable Camunda BPM auto configuration, add the following dependency to your ```pom.xml```:

```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter</artifactId>
  <version>2.3.0</version>
</dependency>
```

This will add the Camunda engine v.7.8 to your dependencies.

Other starters that can be used are: [`camunda-bpm-spring-boot-starter-rest`](rest-api) and [`camunda-bpm-spring-boot-starter-webapp`](webapps).

# Overriding Camunda Version

If you want to override the version used by default, add the `camunda.version` property to your `pom.xml` with the version you want 
to use and add the camunda bom to the dependency management:

```xml
<properties>
  <camunda.version>7.8.0-ee</camunda.version>
</properties>

<dependencyManagement>
  <dependencies>
    <dependency>
      <!-- Import dependency management from camunda -->
      <groupId>org.camunda.bpm</groupId>
      <artifactId>camunda-bom</artifactId>
      <version>${camunda.version}</version>
      <scope>import</scope>
      <type>pom</type>
    </dependency>
  </dependencies>
</dependencyManagement>
```
Please check [version compatibility](version-compatibility/) when selecting Spring Boot Starter and Camunda BPM versions. 

# Enterprise version

To use Camunda Spring Boot Starter in EE context one would need:

1. to override the `camunda.version` with corresponding EE version, as shown above;
2. to use `camunda-bpm-spring-boot-starter-webapp-ee` starter instead of `camunda-bpm-spring-boot-starter-webapp` in order the EE webapps were included
 (also see [Web Applications](webapps/)).
