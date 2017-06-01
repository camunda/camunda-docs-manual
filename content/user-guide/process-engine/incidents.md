---

title: 'Incidents'
weight: 210

menu:
  main:
    identifier: "user-guide-process-engine-incidents"
    parent: "user-guide-process-engine"

---


Incidents are notable events that happen in the process engine. Such incidents usually indicate some kind of problem related to process execution. Examples of such incidents may be a failed job with elapsed retries (retries = 0), indicating that an execution is stuck and manual administrative action is necessary to repair the process instance. If such incidents arise, the process engine fires an internal event which can be handled by a configurable incident handler.

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

  * **Failed Job**: this type of incident is raised when automatic retries for a Job (Timer or Asynchronous continuation) have elapsed. The incident indicates that the corresponding execution is stuck and will not continue automatically. Administrative action is necessary.
  The incident is resolved when the job is manually executed or when the retries for the corresponding job are reset to a value > 0.


# (De-)Activate Incidents

The process engine allows you to configure  whether certain incidents should be raised or not on an incident type base.

The following properties are available in the `org.camunda.bpm.engine.ProcessEngineConfiguration` class:

  * `createIncidentOnFailedJobEnabled`: indicates whether Failed Job incidents should be raised or not.


# Implement Custom Incident Handlers

Incident Handlers are responsible for handling incidents of a certain type (see [Incident Types]({{< relref "#incident-types" >}}) ).

An Incident Handler implements the following interface:

```java
public interface IncidentHandler {

  public String getIncidentHandlerType();

  public void handleIncident(String processDefinitionId, String activityId, String executionId, String configuration);

  public void resolveIncident(String processDefinitionId, String activityId, String executionId, String configuration);
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