---

title: 'Job Execution with Managed Resources'
weight: 60

menu:
  main:
    identifier: "user-guide-runtime-container-integration-job--execution-other-jee"
    parent: "user-guide-runtime-container-integration"

---

For [supported environments]({{<relref "../../../introduction/supported-environments.md#container-managed-process-engine-and-camunda-cockpit-tasklist-admin">}}), Camunda 7 provides server modules that integrate the Job Execution with the application server's managed threadpools. If you are using one of those environments, it is recommended to use the integration provided with it. 

The descriptions on this page apply to the use case where there is *no* existing resource-aware implementation provided. In those cases, using managed resources provided by the application server is recommended over using unmanaged resources. In order for the integration to work, a JEE 7+ compliant application server is required. 

# ManagedJobExecutor

Integration into application servers without a resource-aware implementation is offered by a specific type of `JobExecutor` called the `ManagedJobExecutor`. The purpose of the `ManagedJobExecutor` is to ensure that job execution within the process engine is correctly controlled by the application server, by using managed resources (primarily: managed threads).

In order to facilitate the `ManagedJobExecutor`, the engine must be configured to use it. For instance, when bootstrapping the engine from Java code, you would create a new instance of the `ManagedJobExecutor` and provide the resource dependency it has by injecting it from your application server's environment. The `ManagedJobExecutor` can then be set as the `JobExecutor` that the process engine should use.

## Example usage

The following code listing shows the essential configuration performed.

```java

@ApplicationScoped
public class EngineBuilder {

  // Inject the ManagedExecutorService from the application server
  @Resource
  private ManagedExecutorService managedExecutorService;
  
  private ProcessEngine processEngine;
  private ManagedJobExecutor managedJobExecutor;

  @PostConstruct
  public void build() {
  	// Create a new ManagedJobExecutor
  	managedJobExecutor = new ManagedJobExecutor(this.managedExecutorService);

  	// Create a process engine configuration 
    ProcessEngineConfigurationImpl engineConfiguration = ...

    // Other configuration

    // Use the ManagedJobExecutor
    engineConfiguration.setJobExecutor(managedJobExecutor);
    
    // Build the process engine
    processEngine = engineConfiguration.buildProcessEngine();
  }
  
  @PreDestroy
  public void stopEngine() {
    // Ensure the engine and job executor are shutdown as well
    processEngine.close();
    managedJobExecutor.shutdown();
  }
}
```

{{< note title="Unmanaged resources" class="info" >}}
  The example above injects a container managed resource, the `ManagedExecutorService`, into an object for which the lifecycle is **not** controlled by the application server (the `ManagedJobExecutor` which is instantiated with its constructor). This is not a generally recommended practice, because the dependencies that are injected may become unavailable.

  In this use case however, this approach is chosen because the `ManagedJobExecutor` relies on the existence of the `ManagedExecutorService` and this interface was only introduced with JEE7. Earlier versions of JEE could not fulfill this dependency and would fault if the component was activated automatically for all application servers.

  In order to avoid that the job executor is running on unavailable resources, we recommend to shutdown the job executor via its `shutdown()` method when the `ManagedExecutorService` becomes unavailable.
{{< /note >}}
