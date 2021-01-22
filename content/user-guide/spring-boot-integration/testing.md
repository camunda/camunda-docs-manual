---

title: "Testing Spring Boot Applications"
weight: 70

menu:
  main:
    name: "Testing"
    identifier: "user-guide-spring-boot-testing"
    parent: "user-guide-spring-boot-integration"

---

Spring offers extensive support for automated [testing](https://docs.spring.io/spring/docs/current/spring-framework-reference/testing.html#testing-introduction). 
This is covered through dedicated mocking packages, test runners and annotations.
When testing Spring and Spring Boot applications, a significant amount of time is 
required to load the `ApplicationContext`. That is why Spring caches an `ApplicationContext` 
after a test is finished. This allows for it to be reused in later tests with the same configuration.

## Context Caching with Process Engines

To use `ApplicationContext` caching with the Process Engine requires some additional configuration.
This is because the Process Engine needs a statically defined name (if no name is defined, "default" is used), 
which leads to Spring attempting to create multiple `ApplicationContext`s with Process Engines with the 
same name. This will cause tests to behave incorrectly, or in the worst case, completely fail to load the `ApplicationContext`.

## Using unique Process Engine/Application names

To make context caching work properly with Process Engines and Process Applications,
they need to have unique names for every different test configuration.

When defining a new test configuration, the easiest way to ensure that the new ApplicationContext
uses a new Process Engine (and Process Application) is to enable to following properties
in your `@SpringBootTest` annotation:

```java
@SpringBootTest(
  // ...other parameters...
  properties = {
    "camunda.bpm.generate-unique-process-engine-name=true",
    // this is only needed if a SpringBootProcessApplication 
    // is used for the test
    "camunda.bpm.generate-unique-process-application-name=true",
    "spring.datasource.generate-unique-name=true",
    // additional properties...
  }
)
```

* The `camunda.bpm.generate-unique-process-engine-name=true` property will generate
a unique name for the Process Engine (ex. 'processEngine2Sc4bg2s1g').
* The `camunda.bpm.generate-unique-process-application-name=true` property will generate
a unique name for the Process Application (ex. 'processApplication2Sc4bg2s1g'). This is useful
if you want to deploy and test a Process Application multiple times with multiple configurations.
* The `spring.datasource.generate-unique-name=true` property will generate a new datasource for
each new `ApplicationContext`. Reused (cached) `ApplicationContext`s will use the same datasource.

{{< note title="" class="warning" >}} 
Be aware that the `generate-unique-process-engine-name` and `process-engine-name` properties are mutually exclusive. Setting them both will result in an exception.
{{< /note >}}

If a static accessor needs to be used (e.g. processEngines.getProcessEngine(name)) in a given test, then the following properties can be used:

```java
@SpringBootTest(
  // other parameters
  properties = {
    "camunda.bpm.process-engine-name=foo",
    // this is only needed if a SpringBootProcessApplication 
    // is used for the test
    "camunda.bpm.generate-unique-process-application-name=true",
    "spring.datasource.generate-unique-name=true",
    // additional properties
  }
)
```
Here, the `camunda.bpm.process-engine-name=foo` will set (a unique name) "foo" as the Process Engine name.

## Disabling Telemetry

Telemetry reports are introduced with Camunda Platform 7.14.0. To prevent sending data generated during testing, we encourage you to disable the [telemetry reporter][engine-config-telemetryReporterActivate]. Please read more about the topic in the dedicated page for [Telemetry][telemetry-initial-report].

Example of disabling the reporter in Spring Boot setups:

```
camunda.bpm:
  generic-properties.properties:
    telemetry-reporter-activate: false
```

[engine-config-telemetryReporterActivate]: {{< ref "/reference/deployment-descriptors/tags/process-engine.md#telemetryReporterActivate" >}}
[telemetry-initial-report]: {{< ref "/introduction/telemetry.md#initial-data-report" >}}

## Camunda Assertions

The [Camunda Platform Assertions]({{< ref 
"/user-guide/testing/_index.md#camunda-assertions" >}}) library is 
integrated with the Camunda Spring Boot Starter in
order to make testing processes in your Spring Boot application easier.

### Using Assertions with Context Caching

Out of the box, the Camunda Platform Assertions library tries to use the
default engine or the (single) one that is available. Since when using
Context Caching multiple engines are used in different contexts, binding
the correct Process Engine to the Camunda Assertions library is required
for both caching and assertions to work correctly. This can be done
through the following initialization code in the test class:

```java
  @Autowired
  ProcessEngine processEngine;  

  @Before
  public void setUp() {
    init(processEngine);
  }
```

This needs to be done in addition to the _Unique Process
Engine/Application names_ requirement described in the
[section above](#using-unique-process-engine-application-names).