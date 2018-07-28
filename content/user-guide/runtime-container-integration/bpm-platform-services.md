---

title: 'BPM Platform Services'
weight: 10

menu:
  main:
    identifier: "user-guide-runtime-container-integration-services"
    parent: "user-guide-runtime-container-integration"

---

To inspect the current state of configured process engines and deployed process applications, the class `org.camunda.bpm.BpmPlatform` offers access to the `ProcessEngineService` and the `ProcessApplicationService`.


# ProcessEngineService

The {{< javadocref page="?org/camunda/bpm/ProcessEngineService.html" text="ProcessEngineService" >}} can be accessed by calling `BpmPlatform.getProcessEngineService()`. It offers access to the default process engine, as well as any process engine by its name as specified in the process engine configuration. It returns `ProcessEngine` objects from which any services for a specific engine can be accessed.


# ProcessApplicationService

The {{< javadocref page="?org/camunda/bpm/ProcessApplicationService.html" text="ProcessApplicationService" >}} is accessible via `BpmPlatform.getProcessApplicationService()`. It provides details on the process application deployments made on the application server it is running on. That means that it does not provide a global view across all nodes in a cluster.

Given a process application name, a `ProcessApplicationInfo` object can be retrieved that contains details on the deployments made by this process application. These correspond to the process archives declared in [processes.xml]({{< ref "/user-guide/process-applications/the-processes-xml-deployment-descriptor.md" >}}).

Furthermore, application-specific properties can be retrieved such as the servlet context path in case of a servlet process application.