---

title: "Spring Boot Integration"
weight: 55

menu:
  main:
    identifier: "user-guide-spring-boot-integration"
    parent: "user-guide"

---

The Camunda Engine can be used in a Spring Boot application by using provided Spring Boot starters.
Spring boot starters allow to enable behavior of your spring-boot application by adding dependencies to the classpath.

These starters will pre-configure the Camunda process engine, REST API and Web applications, so they can easily be used in a standalone process application.

If you are not familiar with [Spring Boot](http://projects.spring.io/spring-boot/), read the [getting started](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#getting-started) guide or use the [Camunda 7 Initializr](https://start.camunda.com/).

To enable Camunda 7 auto configuration, add the following dependency to your ```pom.xml```:

```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter</artifactId>
  <version>{{< minor-version >}}.0</version>
</dependency>
```

This will add the Camunda engine v.{{< minor-version >}}.0 to your dependencies.

Other starters that can be used are: 

* [`camunda-bpm-spring-boot-starter-rest`](rest-api)
* [`camunda-bpm-spring-boot-starter-webapp`](webapps)
* [`camunda-bpm-spring-boot-starter-external-task-client`]({{< ref "/user-guide/ext-client/spring-boot-starter.md" >}})

# Using Enterprise Edition

To use Camunda Spring Boot Starter with Camunda EE you need to define the EE version of the webapp (`camunda-bpm-spring-boot-starter-webapp-ee` instead of `camunda-bpm-spring-boot-starter-webapp`), see also [Web Applications](webapps/):

```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter-webapp-ee</artifactId>
  <version>{{< minor-version >}}.0-ee</version>
</dependency>
```

# Requirements

Camunda Spring Boot Starter requires Java 17.

# Supported deployment scenarios

Following deployment scenario is supported by Camunda:

* executable JAR with embedded Tomcat and one embedded process engine (plus Webapps when needed)

There are other possible variations that might also work, but are not tested by Camunda at the moment.
