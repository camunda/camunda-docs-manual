---

title: 'Job Execution in Other JEE Application Servers'
weight: 60

menu:
  main:
    identifier: "user-guide-runtime-container-integration-job--execution-other-jee"
    parent: "user-guide-runtime-container-integration"

---

Job Execution using the application server's managed threadpools is supported in other JEE application servers than the [supported environments]({{<relref "../../../introduction/supported-environments.md#container-managed-process-engine-and-camunda-cockpit-tasklist-admin">}}). If you are using one of the supported environments, it is recommended to use the integration provided with it. 

The descriptions on this page apply to the use case where there is *no* existing resource-aware implementation provided. In those cases, using managed resources provided by the application server is recommended over using unmanaged resources. In order for the integration to work, a JEE 7+ compliant application server is required. 

# ManagedJobExecutor

Integration into the application server is offered by a specific type of `JobExecutor` called the `ManagedJobExecutor`. The function of the `ManagedJobExecutor` is to ensure that job execution within the process engine is correctly controlled by the application server, by using managed resources (primarily: managed threads).

The `ManagedJobExecutor` is not automatically activated, so it requires configuration to use it. For instance, when bootstrapping the engine from Java code, you would create a new instance of the `ManagedJobExecutor` and provide the resource dependency it has after having it injected from your application server's environment. The `ManagedJobExecutor` can then be set as the `JobExecutor` that the process engine should use.

## Example usage

The following code listing shows the essential configuration performed.

```java

@ApplicationScoped
public class EngineBuilder {

  // Inject the ManagedExecutorService from the application server
  @Resource
  private ManagedExecutorService managedExecutorService; 

  @PostConstruct
  public void build() {
  	// Create a new ManagedJobExecutor
  	ManagedJobExecutor managedJobExecutor = new ManagedJobExecutor(this.managedExecutorService);

  	// Create a process engine configuration 
    ProcessEngineConfigurationImpl engineConfiguration = ...

    // Other configuration

    // Use the ManagedJobExecutor
    engineConfiguration.setJobExecutor(managedJobExecutor);
    
    // Build the process engine
    engineConfiguration.buildProcessEngine();
  }   
}
```

{{< note title="Unmanaged resources" class="info" >}}
  The example above injects a container managed resource, the `ManagedExecutorService`, into an object for which the lifecycle is **not** controlled by the application server (the `ManagedJobExecutor` which is instantiated with its constructor). This is not a generally recommended practice, because the dependencies that are injected may become unavailable.

  In this use case however, this approach is chosen because the `ManagedJobExecutor` relies on the existence of the `ManagedExecutorService` and this interface was only introduced with JEE7. Earlier versions of JEE could not fulfill this dependency and would fault if the component was activated automatically for all application servers.
{{< /note >}}
