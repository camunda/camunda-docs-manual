---

title: "Process applications"
weight: 50

menu:
  main:
    name: "Process Applications"
    identifier: "user-guide-spring-boot-process-applications"
    parent: "user-guide-spring-boot-integration"

---

By default, the camunda-spring-boot-starter is configured to use the `SpringProcessEngineConfiguration` auto deployment feature.
Since 1.2.0 you also have the possibility to do so via `SpringBootProcessApplication`. This disables the `SpringProcessEngineConfiguration`
auto-deploy feature and instead uses the required `META-INF/processes.xml` as an indicator for resource scanning.
This also allows all `processes.xml` configuration features described [here] ({{<ref "/user-guide/process-applications/the-processes-xml-deployment-descriptor.md">}}).

To use it, just add the `@EnableProcessApplication` annotation to your Spring Boot application class:

```java
@SpringBootApplication
@EnableProcessApplication("myProcessApplicationName")
public class MyApplication {

...

}
```

Some configuration can be done via Spring Boot configuration parameters. Check [the list of currently available parameters]({{<ref "/user-guide/spring-boot-integration/configuration.md#camunda-bpm-application">}}).

## Using Deployment Callbacks

As when using `@EnableProcessApplication` we don't extend the `ProcessApplication` class,
we can't use `@PostDeploy` and `@PreUndeploy` method annotations. Instead these callbacks
are provided via Spring event publishing mechanism. So you can use the following event listeners:

```java
@EventListener
public void onPostDeploy(PostDeployEvent event) {
  ...
}

@EventListener
public void onPreUndeploy(PreUndeployEvent event) {
  ...
}
```