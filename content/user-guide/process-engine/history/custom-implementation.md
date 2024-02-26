---

title: 'Custom implementation'
weight: 40

menu:
  main:
    identifier: "user-guide-process-engine-custom-implementation"
    parent: "user-guide-process-engine-history"

---

## Provide a custom history backend

In order to understand how to provide a custom history backend, it is useful to first look at a more detailed view of the history architecture:

{{< img src="../../img/process-engine-history-architecture.png" title="History Architecture" >}}

Whenever the state of a runtime entity is changed, the core execution component of the process engine fires History Events. In order to make this flexible, the actual creation of the History Events as well as populating the history events with data from the runtime structures is delegated to the History Event Producer. The producer is handed in the runtime data structures (such as an ExecutionEntity or a TaskEntity), creates a new History Event and populates it with data extracted from the runtime structures.

The event is next delivered to the History Event Handler which constitutes the *History Backend*. The drawing above contains a logical component named *event transport*. This is supposed to represent the channel between the process engine core component producing the events and the History Event Handler. In the default implementation, events are delivered to the History Event Handler synchronously and inside the same JVM. It is however conceptually possible to send the event stream to a different JVM (maybe running on a different machine) and making delivery asynchronous. A good fit might be a transactional message Queue (JMS).

Once the event has reached the History Event Handler, it can be processed and stored in some kind of datastore. The default implementation writes events to the History Database so that they can be queried using the History Service.

Exchanging the History Event Handler with a custom implementation allows users to plug in a custom History Backend. To do so, two main steps are required:

* Provide a custom implementation of the {{< javadocref page="org/camunda/bpm/engine/impl/history/handler/HistoryEventHandler.html" text="HistoryEventHandler" >}} interface.
* Wire the custom implementation in the process engine configuration.

{{< note title="Composite History Handling" class="info" >}}
  Note that if you provide a custom implementation of the HistoryEventHandler and wire it to the process engine, you override the default DbHistoryEventHandler. The consequence is that the process engine will stop writing to the history database and you will not be able to use the history service for querying the audit log. If you do not want to replace the default behavior but only provide an additional event handler, you can use the class `org.camunda.bpm.engine.impl.history.handler.CompositeHistoryEventHandler` that dispatches events to a collection of handlers.
{{< /note >}}
{{< note title="Spring Boot" class="info" >}}

Note that providing your custom `HistoryEventHandler` in a Spring Boot Starter environment works slightly differently. By default, the Camunda Spring Boot starter uses a `CompositeHistoryEventHandler` which wraps a list of HistoryEventHandler implementations that you can provide via the `customHistoryEventHandlers` engine configuration property. If you want to override the default `DbHistoryEventHandler`, you have to explicitly set the `enableDefaultDbHistoryEventHandler` engine configuration property to `false`.
{{< /note >}}

## Implement a custom history level

To provide a custom history level the interface `org.camunda.bpm.engine.impl.history.HistoryLevel` has to be implemented. The custom history level implementation
then has to be added to the process engine configuration, either by configuration or a process engine plugin.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

  <bean id="processEngineConfiguration" class="org.camunda.bpm.engine.impl.cfg.StandaloneInMemProcessEngineConfiguration" >

    <property name="customHistoryLevels">
      <list>
        <bean class="org.camunda.bpm.example.CustomHistoryLevel" />
      </list>
    </property>

  </bean>

</beans>
```

The custom history level has to provide a unique id and name for the new history level.

```java
public int getId() {
  return 42;
}

public String getName() {
  return "custom-history";
}
```

If the history level is enabled, the method

```java
boolean isHistoryEventProduced(HistoryEventType eventType, Object entity)
```

is called for every history event to determine if the event should be saved to the history. The event types used in the
engine can be found in `org.camunda.bpm.engine.impl.history.event.HistoryEventTypes` (see [Javadocs][1]).

The second argument is the entity for which the event is triggered, e.g., a process instance, activity
instance or variable instance. If the `entity` is null the engine tests if the history level in general
handles such history events. If the method returns `false`, the engine will not generate
any history events of this type again. This means that if your history level only wants to generate the history
event for some instances of an event it must still return `true` if `entity` is `null`.

Please have a look at this [complete example][2] to get a better overview.

### Removal time inheritance
Historic instances inherit the [removal time]({{< relref "#removal-time" >}}) from the respective historic top-level
instance. If the custom history level is configured in a way, so that the historic top-level instance is not written,
the removal time is not available.

The following historic instances are considered as top-level instances:

* Batch instance
* Root process instance
* Root decision instance

### User operation logs and custom history level

The following implementation is required in order to enable User Operation Logs:

```java
public boolean isHistoryEventProduced(HistoryEventType eventType, Object entity) {
  if (eventType.equals(HistoryEventTypes.USER_OPERATION_LOG)){
    return true;
  }
  ...
}
```




[1]: http://docs.camunda.org/latest/api-references/javadoc/org/camunda/bpm/engine/impl/history/event/HistoryEventTypes.html
[2]: https://github.com/camunda/camunda-bpm-examples/tree/master/process-engine-plugin/custom-history-level