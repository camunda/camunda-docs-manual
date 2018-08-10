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
  <camunda.version>7.8.0</camunda.version>
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

# Using Enterprise Edition

To use Camunda Spring Boot Starter with Camunda EE you need to:

1. Override the `camunda.version` with the desired EE version:

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

2. Use the EE version of the webapp (`camunda-bpm-spring-boot-starter-webapp-ee` instead of `camunda-bpm-spring-boot-starter-webapp`), see also [Web Applications](webapps/):

```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter-webapp-ee</artifactId>
  <version>{project-version}</version>
</dependency>
```

# Supported deployment scenarios

Following deployment scenarios are supported by Camunda:

* executable JAR with embedded Tomcat and one embedded process engine (plus Webapps when needed)

Many other possible variations might also work, but are not tested by Camunda at the moment.
