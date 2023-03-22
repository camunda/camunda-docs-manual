---

title: 'Contextual Programming Model'
weight: 40

menu:
  main:
    identifier: "user-guide-cdi-contextual"
    parent: "user-guide-cdi"

---

In this section we briefly look at the contextual process execution model used by the Camunda CDI extension.

A BPMN business process is typically a long-running interaction, comprised of both user and system tasks.
At runtime, a process is split-up into a set of individual units of work, performed by users and/or application logic.

In Camunda CDI, a process instance can be associated with a CDI scope, the association representing a unit of work.
This is particularly useful if a unit of work is complex, for instance if the implementation of a user task is a complex sequence
of different forms and "non-process-scoped" state needs to be kept during this interaction. In the default configuration,
process instances are associated with the "broadest" active scope, starting with the conversation and falling back to the request
if the conversation context is not active.

# Associate a conversation with a process instance

When resolving `@BusinessProcessScoped` beans or injecting process variables, we rely on an existing association between an active CDI scope and a process instance.
The Camunda CDI integration provides the `org.camunda.bpm.engine.cdi.BusinessProcess` bean for controlling the association, most prominently:

* The `startProcessBy*(...)`-methods, mirroring the respective methods exposed by the `RuntimeService` allowing to start and subsequently associate a business process.
* The `resumeProcessById(String processInstanceId)`, allowing to associate the process instance with the provided Id.
* The `resumeTaskById(String taskId)`, allowing to associate the task with the provided Id (and by extension, the corresponding process instance).

Once a unit of work like a user task is completed, the `completeTask()` method can be called to disassociate the conversation/request from the process instance.
This signals the engine that the current task is completed and makes the process instance proceed.

Note that the `BusinessProcess`-bean is a `@Named` bean, which means that the exposed methods can be invoked using expression language, for example from a JSF page.
The following JSF2 snippet begins a new conversation and associates it with a user task instance, the Id of which is passed as a request parameter (e.g., `pageName.jsf?taskId=XX`):

```xml
<f:metadata>
  <f:viewParam name="taskId" />
  <f:event type="preRenderView" listener="#{businessProcess.startTask(taskId, true)}" />
</f:metadata>
```

# Declaratively controlling the process

Camunda CDI allows declaratively starting process instances and completing tasks using annotations. 
The `@org.camunda.bpm.engine.cdi.annotation.StartProcess` annotation allows to start a process instance either by "key" or by "name". 
Note that the process instance is started after the annotated method returns. Example:

```java
@StartProcess("authorizeBusinessTripRequest")
public String submitRequest(BusinessTripRequest request) {
  // do some work
  return "success";
}
```

Depending on the configuration of the Camunda engine, the code of the annotated method and the starting of the process
instance will be combined in the same transaction. The `@org.camunda.bpm.engine.cdi.annotation.CompleteTask`-annotation
works in the same way:

```java
@CompleteTask(endConversation=false)
public String authorizeBusinessTrip() {
    // do some work
    return "success";
}
```

The `@CompleteTask` annotation offers the possibility to end the current conversation. The default behavior is to end the conversation
after the call to the engine returns. Ending the conversation can be disabled, as shown in the example above.

# Work with @BusinessProcessScoped beans

Using Camunda CDI, the lifecycle of a bean can be bound to a process instance. To this extent, a custom context implementation is provided,
namely the `BusinessProcessContext`. Instances of `BusinessProcessScoped` beans are stored as process variables in the current process instance.
On deployment, beans annotated with `BusinessProcessScoped` are validated for being "passivation capable", which means that they must implement
the `Serializable` interface, and their references (dependencies) must be "passivation capable" as well. You can read more about the
"passivation capable" criteria in the [CDI specification](https://docs.jboss.org/cdi/spec/1.0/html_single/#passivatingscope). 

The following is an example of a "passivation capable" process scoped bean:

```java
@Named
@BusinessProcessScoped
public class BusinessTripRequest implements Serializable {
        private static final long serialVersionUID = 1L;
        private String startDate;
        private String endDate;
        // ...
}
```

Sometimes, we want to work with process scoped beans, in the absence of an association with a process instance,
for example before starting a process. If no process instance is currently active, instances of `BusinessProcessScoped`
beans are temporarily stored in a local scope (i.e., the Conversation or the Request, depending on the context).
If this scope is later associated with a business process instance, the bean instances are flushed to the process instance.
