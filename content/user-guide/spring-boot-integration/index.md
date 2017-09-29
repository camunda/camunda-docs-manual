---

title: "Spring Boot Integration"
layout: "section-list"
weight: 55

menu:
  main:
    identifier: "user-guide-spring-boot-integration"
    parent: "user-guide"

---

Camunda Engine can be used in Spring Boot application by using provided Spring Boot starters.
Spring starters allow to enable behavior of your spring-boot application by adding dependencies to the classpath.
 
These starters will pre-configure Camunda process engine, REST API and Web applications, so they can easily be used in a standalone process application.

If you are not familiar with  [Spring Boot](http://projects.spring.io/spring-boot/) read the reference documentation [getting started](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#getting-started) guide.

To enable camunda bpm auto configuration add the following dependency to your ```pom.xml```:

```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter</artifactId>
  <version>2.3.0</version>
</dependency>
```

This will add the camunda engine v.7.8 to your dependencies.

Another starters that can be used are: [`camunda-bpm-spring-boot-starter-rest`](rest-api) and [`camunda-bpm-spring-boot-starter-webapp`](webapps).

# Overriding Camunda Version

If you want to override the version used by default, add `camunda.version` property to your `pom.xml` with the version you want 
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