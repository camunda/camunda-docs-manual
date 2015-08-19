---

title: 'Process Engine Plugins'
weight: 220

menu:
  main:
    identifier: "user-guide-process-engine-plugins"
    parent: "user-guide-process-engine"

---


The process engine configuration can be extended through process engine plugins. A process engine plugin is an extension to the [process engine configuration]({{< relref "user-guide/process-engine/process-engine-bootstrapping.md" >}}).

A plugin must provide an implementation of the {{< javadocref page="?org/camunda/bpm/engine/impl/cfg/ProcessEnginePlugin.html" text="ProcessEnginePlugin" >}} interface.


# Configure Process Engine Plugins

Process engine plugins can be configured

* in the [BPM Platform Deployment Descriptors]({{< relref "reference/deployment-descriptors/index.md" >}}) (bpm-platform.xml/processes.xml),
* in [JBoss Application Server 7/Wildfly 8 configuration file]({{< relref "user-guide/runtime-container-integration/jboss.md" >}}) (standalone.xml/domain.xml),
* using [Spring Beans XML]({{< relref "user-guide/spring-framework-integration/index.md#configure-a-process-engine-plugin-in-spring" >}}),
* programatically.

The following is an example of how to configure a process engine plugin in a bpm-platform.xml file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform xmlns="http://www.camunda.org/schema/1.0/BpmPlatform"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.camunda.org/schema/1.0/BpmPlatform http://www.camunda.org/schema/1.0/BpmPlatform ">

  <job-executor>
    <job-acquisition name="default" />
  </job-executor>

  <process-engine name="default">
    <job-acquisition>default</job-acquisition>
    <configuration>org.camunda.bpm.engine.impl.cfg.JtaProcessEngineConfiguration</configuration>
    <datasource>jdbc/ProcessEngine</datasource>

    <plugins>
      <plugin>
        <class>org.camunda.bpm.engine.MyCustomProcessEnginePlugin</class>
        <properties>
          <property name="boost">10</property>
          <property name="maxPerformance">true</property>
          <property name="actors">akka</property>
        </properties>
      </plugin>
    </plugins>
  </process-engine>

</bpm-platform>
```

A process engine plugin class must be visible to the classloader which loads the process engine classes.


# List of Built-In Process Engine Plugins

The following is a list of built-in process engine plugins:

* [LDAP Identity Service Plugin]({{< relref "user-guide/process-engine/identity-service.md#the-ldap-identity-service" >}})
* [Administrator Authorization Plugin]({{< relref "user-guide/process-engine/authorization-service.md#the-administrator-authorization-plugin" >}})
* [Process Application Event Listener Plugin](ref:#process-applications-process-application-event-listeners)
