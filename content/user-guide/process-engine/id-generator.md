---

title: 'Id Generators'
weight: 190

menu:
  main:
    identifier: "user-guide-process-engine-id-generator"
    parent: "user-guide-process-engine"

---


All persistent entities managed by the process engine (Process Instances, Tasks, ...) have unique
Ids. These Ids uniquely identify an individual task, process instance, etc. When these entities are
persisted to the database, the ids are used as primary keys in the corresponding database tables.

Out of the box, the process engine provides two Id generator implementations.


# The Database Id Generator

The Database Id Generator is implemented using a sequence Generator on top of the `ACT_GE_PROPERTY`
table.

This id generator is good for debugging and testing since it generates human readable ids.

{{< note title="" class="warning" >}}
  The Database Id Generator should **never** be used in production since it cannot handle high levels of concurrency.
{{< /note >}}


# The UUID Generator

The StrongUuidGenerator uses a UUID generator which uses the [Java UUID Generator (JUG)][1] library
internally.

{{< note title="" class="warning" >}}
  Always use the StrongUuidGenerator for production setups.
{{< /note >}}

In the [Camunda Platform Full Distributions][2], the
StrongUuidGenerator is preconfigured and the default Id Generator used by the process engine.

If you use an embedded process engine configuration and configure the process engine using Spring,
you need to add the following lines to the Spring configuration to enable the
`StrongUuidGenerator`:

```xml
<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.impl.cfg.StandaloneInMemProcessEngineConfiguration">

  [...]

  <property name="idGenerator">
    <bean class="org.camunda.bpm.engine.impl.persistence.StrongUuidGenerator" />
  </property>

</bean>
```

Additionally, you need the following maven dependency:

```xml
<dependency>
  <groupId>com.fasterxml.uuid</groupId>
  <artifactId>java-uuid-generator</artifactId>
  <scope>provided</scope>
  <version>3.1.2</version>
</dependency>
```

[1]: https://mvnrepository.com/artifact/com.fasterxml.uuid/java-uuid-generator
[2]: {{< ref "/introduction/downloading-camunda.md#full-distribution" >}}
