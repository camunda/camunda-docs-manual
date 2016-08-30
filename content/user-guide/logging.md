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

Most Camunda modules, including the Camunda Eegine, use [slf4j] as logging "facade". This allows users to direct logging output to the logging "backend" of their choice, such as [logback] or [log4j].

## Preconfigured Logging with a Shared Process Engine

When installing Camunda as a shared process engine in an application server, Camunda logging is pre-configured.

On all application servers except JBoss and Wildfly, logging is pre-configured using the slf4j-jdk14 bridge.
This means that Camunda effectively re-directs all its logging to Java Util Logging.
Both SLF4J API and the slf4j-jdk14 bridge are available in a shared classpath which means that they are available in the classpath of all applications deployed on these servers.

On JBoss/Wildfly, logging is directed to the JBoss logging infrastructure. The SLF4J API is not available in the classpath of custom applications by default.

## Adding a Logging Backend for Embedded Use

When using the Camunda Maven modules in a custom application, only the [slf4j] API is pulled in transitively.
If you do not provide any backend, nothing will actually be logged.

In the following, we provide two alternative examples of how to set up logging. See the [SLF4J Documentation](slf4j-backends) for more detailed information on how to add a logging backend.

### Example Using Java Util Logging

If you do not care for a specific logging backend, the simplest option is to direct logging to Java Util Logging by adding the following
maven dependency:

```xml
<dependency> 
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-jdk14</artifactId>
  <version>1.7.13</version>
</dependency>
```

### Example Using Logback

For a more sophisticated logging setup we recommend using Logback. To do so, the following steps are necessary:

Add the logback dependency

```xml
<dependency>
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-classic</artifactId>
  <version>1.1.2</version>
</dependency>
```

Add a file named `logback.xml`. Example configuration:

```xml
<configuration>

  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <!-- encoders are assigned the type
         ch.qos.logback.classic.encoder.PatternLayoutEncoder by default -->
    <encoder>
      <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
    </encoder>
  </appender>

  <!-- camunda -->
  <logger name="org.camunda" level="info" />

  <!-- common dependencies -->
  <logger name="org.apache.ibatis" level="info" />
  <logger name="javax.activation" level="info" />
  <logger name="org.springframework" level="info" />

  <root level="debug">
    <appender-ref ref="STDOUT" />
  </root>

</configuration>
```

Also make sure to make mybatis use SLF4J as logger by adding

```java
LogFactory.useSlf4jLogging();
```

somewhere in your setup code.

# Logging Categories

## Process Engine

The process engine logs on the following categories

* org.camunda.bpm.engine.test
* org.camunda.bpm.engine.bpmn.parser
* org.camunda.bpm.engine.bpmn.behavior
* org.camunda.bpm.engine.cmmn.transformer
* org.camunda.bpm.engine.cmmn.behavior
* org.camunda.bpm.engine.cmmn.operation
* org.camunda.bpm.engine.cmd
* org.camunda.bpm.engine.persistence
* org.camunda.bpm.engine.tx
* org.camunda.bpm.engine.cfg
* org.camunda.bpm.engine.jobexecutor
* org.camunda.bpm.engine.context
* org.camunda.bpm.engine.core
* org.camunda.bpm.engine.pvm
* org.camunda.bpm.engine.metrics
* org.camunda.bpm.engine.util
* org.camunda.bpm.application
* org.camunda.bpm.container

# Legacy: Java Util Logging

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
* JBoss/Wildfly Subsystems

[slf4j]: http://www.slf4j.org/
[log4j]: http://logging.apache.org/log4j/
[logback]: http://logback.qos.ch/
[slf4j-backends]: http://www.slf4j.org/manual.html#projectDep
