---

title: 'Incidents'
weight: 210

menu:
  main:
    identifier: "user-guide-process-engine-incidents"
    parent: "user-guide-process-engine"

---


Incidents are notable events that happen in the process engine. Such incidents usually indicate some kind of problem related to process execution. Examples of such incidents may be a failed job with depleted retries (retries = 0), indicating that an execution is stuck and manual administrative action is necessary to repair the process instance. If such incidents arise, the process engine fires an internal event which can be handled by a configurable incident handler.

In the default configuration, the process engine writes incidents to the process engine database. You may then query the database for different types and kinds of incidents using the `IncidentQuery` exposed by the `RuntimeService`:

```java
runtimeService.createIncidentQuery()
  .processDefinitionId("someDefinition")
  .list();
```

Incidents are stored in the ACT_RU_INCIDENT database table.

If you want to customize the incident handling behavior, it is possible to replace the default incident handlers in the process engine configuration and provide custom implementations (see below).


# Incident Types

There are different types of incidents. Currently the process engine supports the following incidents:

* **failedJob**: is raised when automatic retries for a job (timer or asynchronous continuation) have been depleted. The incident indicates that the corresponding execution is stuck and will not continue automatically. Administrative action is necessary. The incident is resolved when the job is manually executed or when the retries for the corresponding job are set to a value > 0.
* **failedExternalTask**: is raised when a worker of an [External Task]({{< relref "user-guide/process-engine/external-tasks.md" >}}) reports a failure and the given retries are set to a value <= 0. The incident indicates that the corresponding external task is stuck and will not be fetched by a worker. Administrative action is necessary to reset the retries.

It is possible to create custom incidents of any type with the Java API.

# Creating and Resolving Custom Incidents

An incident of any type can be created by calling `RuntimeService#createIncident` ...

```java
runtimeService.createIncident("someType", "someExecution", "someConfiguration", "someMessage");
```

... or directly `DelegateExecution#createIncident`.
```java
delegateExecution.createIncident("someType", "someConfiguration", "someMessage");
```

Custom incidents must always be related to an existing Execution.

An incident of any type, except for **failedJob** and **failedExternalTask**, can be resolved by calling `RuntimeService#resolveIncident`.

Incidents can be [created]({{<relref "reference/rest/execution/post-create-incident.md">}}) and [resolved]({{<relref "reference/rest/incident/resolve-incident.md">}}) through the REST API as well.


# (De-)Activate Incidents


The process engine allows you to configure  whether certain incidents should be raised or not, based on the incident type.
The following properties are available in the `org.camunda.bpm.engine.ProcessEngineConfiguration` class:

  * `createIncidentOnFailedJobEnabled`: indicates whether Failed Job incidents should be raised or not.


# Implement Custom Incident Handlers

Incident Handlers are responsible for handling incidents of a certain type (see [Incident Types]({{< relref "#incident-types" >}}) ).

An Incident Handler implements the following interface:

```java
public interface IncidentHandler {

  String getIncidentHandlerType();

  Incident handleIncident(IncidentContext context, String message);

  void resolveIncident(IncidentContext context);

  void deleteIncident(IncidentContext context);

}
```

The `handleIncident` method is called when a new incident is created. The `resolveIncident` method is called when an incident is resolved. If you want to provide a custom incident handler implementation you can replace one or multiple incident handlers using the following method:

```java
org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl.setCustomIncidentHandlers(List<IncidentHandler>)
```

An example of a custom incident handler could be a handler which extends the default behavior by sending an email to an administrator whenever an incident of type ``failedJob`` occurs. However, just adding the custom incident handler overwrites the default behavior with the custom incident handlers behavior. As a consequence, the default incident handler is not executed anymore. If the default behavior should be executed as well, then the custom incident handler also needs to invoke the default incident handler, which includes using internal API.

{{< note title="Use of Internal API" class="warning" >}}

Please be aware that this API is **not** part of the [public API]({{< relref
"introduction/public-api.md" >}}) and may change in later releases.

{{< /note >}}