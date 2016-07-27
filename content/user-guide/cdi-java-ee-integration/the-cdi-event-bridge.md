---

title: 'CDI Event Bridge'
weight: 60

menu:
  main:
    identifier: "user-guide-cdi-event-bridge"
    parent: "user-guide-cdi"

---


The Process engine can be hooked-up to the CDI event-bus. We call this the "CDI Event Bridge". This allows us to be notified of process events using standard CDI event mechanisms. In order to enable CDI event support for an embedded process engine, enable the corresponding parse listener in the configuration:

```xml
<property name="postParseListeners">
  <list>
    <bean class="org.camunda.bpm.engine.cdi.impl.event.CdiEventSupportBpmnParseListener" />
  </list>
</property>
```

Now the engine is configured for publishing events using the CDI event bus.

{{< note title="" class="info" >}}
  The above configuration can be used in combination with an embedded process engine. If you want to use this feature in combination with the shared process engine in a multi application environment, you need to add the CdiEventListener as process application event listener. [See next section]({{< relref "#the-cdi-event-bridge-in-a-process-application" >}}).
{{< /note >}}

The following gives an overview of how process events can be received in CDI beans. In CDI, we can declaratively specify event observers using the @Observes-annotation. Event notification is type-safe. The type of process events is org.camunda.bpm.engine.cdi.BusinessProcessEvent. The following is an example of a simple event observer method:

```java
public void onProcessEvent(@Observes BusinessProcessEvent businessProcessEvent) {
// handle event
}
```

This observer would be notified of all events. If we want to restrict the set of events the observer receives, we can add qualifier annotations:

* `@BusinessProcessDefinition`: restricts the set of events to a certain process definition. Example:

  ```java
  public void onProcessEvent(@Observes @BusinessProcessDefinition("billingProcess") BusinessProcessEvent businessProcessEvent) {
  // handle event
  }
  ```

* `@StartActivity`: restricts the set of events by a certain activity. For example:

  ```java
  public void onActivityEvent(@Observes @StartActivity("shipGoods") BusinessProcessEvent businessProcessEvent) {
  // handle event
  }
  ```

  is invoked whenever an activity with the id "shipGoods" is entered.

* `@EndActivity`: restricts the set of events by a certain activity. The following method is invoked whenever an activity with the id "shipGoods" is left:

  ```java
  public void onActivityEvent(@Observes @EndActivity("shipGoods") BusinessProcessEvent businessProcessEvent) {
  // handle event
  }
  ```

* `@TakeTransition`: restricts the set of events by a certain transition.

* `@CreateTask`: restricts the set of events by a certain task. The following is invoked whenever a task with the definition key (id in BPMN XML) "approveRegistration" is created:

  ```java
  public void onTaskEvent(@Observes @CreateTask("approveRegistration") BusinessProcessEvent businessProcessEvent) {
  // handle event
  }
  ```

* `@AssignTask`: restricts the set of events by a certain task. The following is invoked whenever a task with the definition key (id in BPMN XML) "approveRegistration" is assigned:

  ```java
  public void onTaskEvent(@Observes @AssignTask("approveRegistration") BusinessProcessEvent businessProcessEvent) {
  // handle event
  }
  ```

* `@CompleteTask`: restricts the set of events by a certain task. The following is invoked whenever a task with the definition key (id in BPMN XML) "approveRegistration" is completed:

  ```java
  public void onTaskEvent(@Observes @CompleteTask("approveRegistration") BusinessProcessEvent businessProcessEvent) {
  // handle event
  }
  ```

* `@DeleteTask`: restricts the set of events by a certain task. The following is invoked whenever a task with the definition key (id in BPMN XML) "approveRegistration" is deleted:

  ```java
  public void onTaskEvent(@Observes @DeleteTask("approveRegistration") BusinessProcessEvent businessProcessEvent) {
  // handle event
  }
  ```

The qualifiers named above can be combined freely. For example, in order to receive all events generated when leaving the "shipGoods" activity in the "shipmentProcess", we could write the following observer method:

```java
public void beforeShippingGoods(@Observes @BusinessProcessDefinition("shippingProcess") @EndActivity("shipGoods") BusinessProcessEvent evt) {
  // handle event
}
```

In the default configuration, event listeners are invoked synchronously and in the context of the same transaction. CDI transactional observers (only available in combination with JavaEE / EJB), allow to control when the event is handed to the observer method. Using transactional observers, we can for example assure that an observer is only notified if the transaction in which the event is fired succeeds:

```java
public void onShipmentSuceeded(
  @Observes(during=TransactionPhase.AFTER_SUCCESS) @BusinessProcessDefinition("shippingProcess") @EndActivity("shipGoods") BusinessProcessEvent evt) {

  // send email to customer
}
```

Note: BusinessProcessEvent.getTask will return an instance of DelegateTask (in case the event is a task event). If the listener is invoked after the transaction has completed, the DelegateTask object cannot be used
for modifying variables.

# The CDI Event Bridge in a Process Application

In order to use the CDI Event Bridge in combination with a multi-application deployment and the shared process engine, the {{< javadocref page="?org/camunda/bpm/engine/cdi/impl/event/CdiEventListener" text="CdiEventListener" >}} needs to be added as a [Process Application Execution Event Listener]({{< relref "user-guide/process-applications/process-application-event-listeners.md" >}}).

Example configuration for [Servlet Process Application]({{< relref "user-guide/process-applications/the-process-application-class.md#the-servletprocessapplication" >}}):

```java
@ProcessApplication
public class InvoiceProcessApplication extends ServletProcessApplication {

  protected CdiEventListener cdiEventListener = new CdiEventListener();

  public ExecutionListener getExecutionListener() {
    return cdiEventListener;
  }

  public TaskListener getTaskListener() {
    return cdiEventListener;
  }
}
```

Example configuration for [Ejb Process Application]({{< relref "user-guide/process-applications/the-process-application-class.md#the-ejbprocessapplication" >}}):

```java
@Singleton
@Startup
@ConcurrencyManagement(ConcurrencyManagementType.BEAN)
@TransactionAttribute(TransactionAttributeType.REQUIRED)
@ProcessApplication
@Local(ProcessApplicationInterface.class)
public class MyEjbProcessApplication extends EjbProcessApplication {

  protected CdiEventListener cdiEventListener = new CdiEventListener();

  @PostConstruct
  public void start() {
    deploy();
  }

  @PreDestroy
  public void stop() {
    undeploy();
  }

  public ExecutionListener getExecutionListener() {
    return cdiEventListener;
  }

  public TaskListener getTaskListener() {
    return cdiEventListener;
  }
}
```
