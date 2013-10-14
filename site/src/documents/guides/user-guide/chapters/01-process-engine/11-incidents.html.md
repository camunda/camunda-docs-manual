---

title: 'Incidents'
category: 'Process Engine'

---

Incidents are notable events that happen in the process engine. Such incidents usually indicate some kind of problem related to process execution. Examples of such incidents may be a failed job with elapsed retries (retries = 0), indicating that an execution is stuck and manual administrative action is necessary for repairing the process instance. Or the fact that a process instance has entered an error state which could be modelled as a BPMN Error Boundary event or a User Task explicitly marked as "error state". If such incidents arise, the process engine fires an internal event which can be handled by a configurable incident handler.

In the default configuration, the process engine writes incidents to the process engine database. You may then query the database for different types and kinds of incidents using the `IncidentQuery` exposed by the `RuntimeService`:

    runtimeService.createIncidentQuery()
      .processDefinitionId("someDefinition")
      .list();

Incidents are stored in the AC_RU_INCIDENT database table.

If you want to customize the incident handling behavior, it is possible to replace the default incident handlers in the process engine configuration and provide custom implementations (see below).

## Incident Types

There are different types of incidents. Currently the process engine supports the following incidents:

  * **Failed Job**: this incident is raised when automatic retries for a Job (Timer or Asynchronous continuation) have elapsed. The incident indicates that the corresponding execution is stuck and will not continue automatically. Adminitrative action is necessary.
  The incident is resolved, when the job is executed manually or when the retries for the corresponding job are reset to a value > 0.

## (De-)Activating Incidents

The process engine allows you to configure on an incident type basis whether certain incidents should be raised or not.

The following properties are available in the `org.camunda.bpm.engine.ProcessEngineConfiguration` class:

  * `createIncidentOnFailedJobEnabled`: indicates whether Failed Job incidents should be raised.

## Implementing custom Incident Handlers

Incident Handlers are responsible for handling incidents of a certain type (see Incident Types below).

An Incident Handler implements the following interface:

    public interface IncidentHandler {

      public String getIncidentHandlerType();

      public void handleIncident(String processDefinitionId, String activityId, String executionId, String configuration);

      public void resolveIncident(String processDefinitionId, String activityId, String executionId, String configuration);

    }

The `handleIncident` method is called when a new incident is created. The `resolveIncident` method is called when an incident is resolved. If you want to provide a custom incident handler implementation you can replace one or multiple incident handlers using the following method:

    org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl.setCustomIncidentHandlers(List<IncidentHandler>)

An example of a custom inciddent handler could be a handler which, in addtion to the default behavior also sends an email to an administrator.

