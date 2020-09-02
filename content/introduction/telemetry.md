---

title: 'Telemetry'
weight: 45

menu:
  main:
    identifier: "user-guide-introduction-telemetry"
    parent: "user-guide-introduction"

---


By collecting environment and usage data, we will be able to offer a great and stable user experience when using Camunda. The insights into common environment setups and product usage patterns we can gather will help us to make product development decisions to your benefit. Data collection will be performed only after explicitly enabling a [process engine configuration][engine-config] property which by default is not applied. The configuration can be changed during runtime at any time via Java API or [Rest API][telemetry-config-rest].

The collected data will be sent only once in 24 hours and upon closing of the process engine by scheduling a Java timer task that sends the data via an HTTP request. The process engine work will not be affected in case of a problem during the processing of the data.

## Collected Data

The full list of the collected data can be found below, followed by a real case example. The data can be separated into three groups: general data, meta/environment data, and usage data.

### General data
Contains information about the process engine.

* installation - id that is stored as process engine property
* product name - identifying the usage of the process engine
* product version - identifying the process engine version
* product edition - identifying whether `community` or `enterprise` version is used

### Meta/Environment Data
Contains information about the environmental setup.

* database vendor and version
* application server vendor and version

### Usage data
Contains entries that give insights into which features and components are used in the process engine.

* commands count - the count of executed commands after the last retrieved data

### Example

```
{
    "installation": "8343cc7a-8ad1-42d4-97d2-43452c0bdfa3",
    "product": {
      "name": "Camunda BPM Runtime",
      "version": "7.13.0",
      "edition": "community",
      "internals": {
        "database": {  
          "vendor": "h2",
          "version": "1.4.190 (2015-10-11)"
        },
        "application-server": {
          "vendor": "Wildfly",
          "version": "WildFly Full 19.0.0.Final (WildFly Core 11.0.0.Final) - 2.0.30.Final"
        },
        "commands": {
          "StartProcessInstanceCmd": {"count": 40},
          "FetchExternalTasksCmd":  {"count": 100}
        }
      }
    }
}
```

### Logger

A telemetry logger exists that logs details for the information that is sent or problems when the data is sent when the telemetry is enabled. For further informaion check the [Logging]({{< ref "/user-guide/logging.md" >}}) page in the User Guide.

### Limitations in Collected Information

In certain scenarios, some of the information will not be retrieved due to limitations of the implementation.

The application server information cannot be obtained in an embedded process engine setup where no web applications (e.g. Tasklist, Cockpit, Rest application) are not deployed and used.


## Toggle telemetry

### Process Engine Configuration

Use the `initializeTelemetry` configuration [property][engine-config] to enable the telemetry before starting the process engine. Just add it to you process engine configuration:

```
  <property name="initializeTelemetry">true</property>
```

Later on the telemetry can be enabled/disabled via the engine API.

### Java/Rest API

The configuration of the telemetry can be changed via our API.

To enable/disable telemetry via Java API:

```java
  managementService.toggleTelemetry(true);
```

To achieve the same, you can also use the respective Rest API request. For more information, have a look at the [telemetry][telemetry-config-rest] page in the Rest API documentation.

## Legal Note

Before you install a Camunda BPM Runtime version >= 7.14.0-alpha1 or activate the telemetry functionality, please make sure that you are authorized to take this step, and that the installation or activation of the [telemetry functionality][engine-config] is not in conflict with any internal company policies, compliance guidelines, any contractual or other provisions or obligations of your company.

Camunda cannot be held responsible in the event of unauthorized installation or activation of this function.

## Implementation 

In case you want further details, you can have a look at the implementation of the telemetry topic in [our code](https://github.com/camunda/camunda-bpm-platform/blob/2015f4902853bf688216c9f75e846256d100fe95/engine/src/main/java/org/camunda/bpm/engine/impl/telemetry/reporter/TelemetrySendingTask.java#L69-L98).

[engine-config]: {{< ref "/reference/deployment-descriptors/tags/process-engine.md#initializeTelemetry" >}}
[telemetry-config-rest]: {{< ref "/reference/rest/telemetry/port-telemetry.md" >}}
