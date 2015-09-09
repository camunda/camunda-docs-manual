---

title: 'BPM Platform Services'
category: 'Runtime Container Integration'

---

To inspect the current state of configured process engines and deployed process applications, the class `org.camunda.bpm.BpmPlatform` offers access to the `ProcessEngineService` and the `ProcessApplicationService`.

## ProcessEngineService

The [ProcessEngineService](ref:/reference/javadoc/org/camunda/bpm/ProcessEngineService.html) can be accessed by calling `BpmPlatform.getProcessEngineService()`. It offers access to the default process engine, as well as any process engine by its name as specified in the process engine configuration. It returns `ProcessEngine` objects from which any services for a specific engine can be accessed.

## ProcessApplicationService

The [ProcessApplicationService]((ref:/reference/javadoc/org/camunda/bpm/ProcessApplicationService.html) is accessible via `BpmPlatform.getProcessApplicationService()`. It provides details on the process application deployments made on the application server it is running on. That means that it does not provide a global view across all nodes in a cluster.

Given a process application name, a `ProcessApplicationInfo` object can be retrieved that contains details on the deployments made by this process application. These correspond to the process archives declared in [processes.xml](ref:#process-applications-the-processesxml-deployment-descriptor).

Furthermore, application-specific properties can be retrieved such as the servlet context path in case of a servlet process application.