---

title: 'Logging'
weight: 200

menu:
  main:
    identifier: "user-guide-logging"
    parent: "user-guide"

---

This page provides information about logging in Camunda.

# SLF4J

Most Camunda Modules including the Camunda Engine use [slf4j] as logging "facade". This allows users to direct logging output to the logging "backend" of their choice, such as [logback] or [log4j].

## Adding a Logging Backend for Embedded use

When using the Camunda Maven Modules in a custom application, only the [slf4j] api is pulled in transitively.
If you do not provide any backend, nothing will be actually logged.

See the [SLF4J Documentation](slf4j-backends) for information on how to add a logging backend.

If you do not care for a specific logging backend, the simplest option is to direct logging to Java Util Logging by adding the following
maven dependency:

```xml
<dependency> 
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-jdk14</artifactId>
  <version>1.7.13</version>
</dependency>
```

Dependencies for other backends such as log4j or logback can be found in the [SLF4J Documentation][slf4j-backends].

## Preconfigured Logging with a Shared Process Engine

When installing Camunda as a shared process engine in an Application Server, Camunda logging is pre-configured.

On all application servers except JBoss and Wildfly, logging is pre-configured using the slf4j-jdk14 bridge.
This means that Camunda effectively re-directs all it's logging to Java Util Logging.
Both SLF4J Api and the slf4j-jdk14 bridge are available in shared classpath which means that they are available in the classpath of all applications deployed on these servers.

On JBoss / Wildfly, logging is directed to the JBoss logging infrastructure. SLF4J Api is not available in the classpath of custom applications by default.

# Java Util Logging

Some Camunda modules still use Java Util Logging directly.
The use of Java Util Logging in these modules is considered deprecated and will be gradually migrated to [slf4j] in future releases.

List of modules still using Java Util Logging:

* camunda-ejb-service
* camunda-ejb-client
* camunda-jobexecutor-ra
* camunda-jobexecutor-rar
* camunda-engine-cdi
* camunda-engine-spring
* camunda-engine-rest
* JBoss / Wildfly Subsystems

[slf4j]: http://www.slf4j.org/
[log4j]: http://logging.apache.org/log4j/
[logback]: http://logback.qos.ch/
[slf4j-backends]: http://www.slf4j.org/manual.html#projectDep
